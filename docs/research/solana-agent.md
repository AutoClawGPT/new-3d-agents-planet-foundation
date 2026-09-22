# Solana AI-agent application research

Date: 2026-09-22

Scope: primary-source findings and a recommended security architecture for a multi-user Solana AI-agent application that can prepare token-launch requests. This note intentionally does not install packages, clone repositories, modify an existing project, or handle secrets.

## Executive conclusion

Build the first release as a server-orchestrated, multi-tenant workflow that can **plan, validate, simulate, and prepare** a token-launch transaction. Keep signing and mainnet submission behind an explicit user approval boundary. Use a user wallet or a policy-controlled custody signer; never put a seed phrase, wallet private key, Helius key, or Jupiter key in prompts, browser bundles, client source, logs, or ordinary graph state.

The Solana Agent Kit v2 documentation explicitly moved away from direct private-key input and toward modular plugins, embedded wallets, human-in-the-loop confirmation, and fine-grained wallet rules. That is the right baseline for this product, but the framework’s examples are not a substitute for tenant isolation, transaction policy, or an audit trail.

## Factual findings from primary sources

### Solana Developer MCP

The official Solana Developer MCP page documents a no-API-key remote server at `https://mcp.solana.com/mcp` using Streamable HTTP. It lists five tools: `list_sections`, `get_documentation`, `Solana_Documentation_Search`, `Solana_Expert__Ask_For_Help`, and `program_autofixer`. It instructs agents to prefer the MCP for Solana work, call `list_sections` first for non-trivial questions, use canonical-document retrieval for specific topics, and run the Rust autofixer before returning Anchor or Pinocchio program code; fixes should be applied and the autofixer rerun until another pass is not required. Source: [Solana Developer MCP](https://mcp.solana.com/).

The Solana coding-with-agents page also identifies the MCP as the route to current Solana, Anchor, program-example, and Stack Exchange context, and separately points to the Foundation-maintained Solana agent skill. Source: [Coding with agents](https://solana.com/docs/intro/coding-with-agents).

Implication: MCP is a documentation and code-review aid for our development agents. It must not be treated as the end-user wallet authority or as permission to broadcast transactions.

### Solana network and transaction facts

Solana’s cluster reference describes Devnet as a public testing environment with free airdrops, no real-value tokens, possible ledger resets, and rate limits on the public endpoint. It says application developers should target Devnet. Source: [Clusters and public RPC endpoints](https://solana.com/docs/references/clusters).

Solana’s transaction-signing documentation states that every signature covers the serialized transaction message, including the fee payer, blockhash or durable nonce, program and account addresses, signer/writable permissions, instruction order, and instruction data. It recommends freezing the message before signing, storing a digest, verifying returned signatures against expected signers, and submitting the assembled transaction without rebuilding it. Changing the message requires signatures again. Source: [Partial signing](https://solana.com/docs/core/transactions/partial-signing).

The same documentation explains that the fee payer must be selected before the message is frozen, and that a long or offline signing flow may need a durable nonce. If a blockhash or nonce expires, the signing flow should restart rather than silently modifying and retrying the old message. Source: [Partial signing](https://solana.com/docs/core/transactions/partial-signing).

Solana’s production-readiness guidance warns that incorrect program addresses can cause irreversible loss and recommends allowlisting program IDs and validating the recipient/account type before signing. Source: [Production readiness](https://solana.com/docs/tools/production-readiness).

### Solana Agent Kit v2 and SendAI examples

The Agent Kit v2 introduction describes a modular, plugin-based toolkit with embedded-wallet support. It says v2 addresses the v1 private-key-input security problem and tool-context/hallucination problem. It documents embedded wallets (including Turnkey and Privy), plugins that expose only relevant tools, optional human confirmation, and fine-grained rules. Source: [Solana Agent Kit v2 introduction](https://docs.sendai.fun/docs/v2/introduction).

The v2 examples index lists embedded-wallet examples for Turnkey, Privy, Crossmint, and Para; an MCP server example; persistent-agent examples; LangChain/LangGraph integration; and Next.js examples. It says examples generally use a development wallet and that API keys belong in a local `.env.local` file for development. Source: [Agent Kit v2 examples](https://docs.sendai.fun/docs/v2/examples/examples-intro).

The `sendaifun/solana-mcp` README describes an MCP server exposing on-chain tools such as asset lookup, token deployment, balances, transfers, NFT minting, trading, and airdrop requests. Its README also lists a private key and RPC URL as environment configuration and explicitly says to keep private keys secure, use environment variables, consider a dedicated AI-agent wallet, audit agent activity, and test on devnet/testnet before mainnet. Source: [sendaifun/solana-mcp README](https://github.com/sendaifun/solana-mcp).

Important distinction: the README is useful evidence about available patterns and risk, but its raw private-key environment configuration should not be copied into a public multi-user product. If a server-side agent wallet is ever required, use a dedicated low-balance wallet and a KMS/HSM/custody signer with policy controls; do not expose the key to the model or browser.

### LangGraph workflow and persistence facts

LangGraph’s current official JavaScript guide models an agent as discrete nodes for LLM, data, action, and user-input steps. It recommends `interrupt()` for user-fixable or approval-required work and compiling with a checkpointer so execution can resume. Its example uses a `thread_id` to preserve the workflow across interactions. Source: [Thinking in LangGraph](https://docs.langchain.com/oss/javascript/langgraph/thinking-in-langgraph).

LangGraph’s human-in-the-loop documentation says an interrupt pauses execution, saves graph state, and waits for external input; resuming with a `Command` supplies the approval result. The older hosted documentation states the same behavior and the requirement for a checkpointer plus a thread ID. Sources: [LangGraph human-in-the-loop concepts](https://langchain-ai.github.io/langgraph/concepts/human_in_the_loop/), [LangGraph JS workflow guide](https://docs.langchain.com/oss/javascript/langgraph/thinking-in-langgraph).

LangGraph persistence documentation distinguishes short-term thread-scoped checkpoints from longer-lived stores. Its checkpoint reference documents encryption wrappers for checkpoint contents at rest. Sources: [Persistence](https://langchain-ai.github.io/langgraphjs/how-tos/cross-thread-persistence-functional/), [Checkpoint reference](https://langchain-ai.github.io/langgraph/reference/checkpoints/).

## Recommended architecture (explicit recommendations)

### Trust boundaries

Use these components and boundaries:

1. **Web client**: authentication, wallet connection, human-readable transaction preview, wallet-signing request, status display. It may hold public keys and short-lived session tokens; it must not contain provider secrets or private keys.
2. **API/auth service**: validates the authenticated user and tenant, authorizes a requested capability, applies rate limits, and creates an immutable workflow/run ID.
3. **Agent orchestrator**: a LangGraph-style state machine. It may call read-only Solana tools and proposal-building tools. It should not be allowed to submit arbitrary transactions merely because an LLM requested it.
4. **Transaction policy and builder service**: validates network, program allowlists, account ownership/types, fee and slippage limits, instruction schemas, and idempotency. It builds and simulates a canonical transaction and returns its message hash plus a preview.
5. **Signer boundary**: the connected user wallet, hardware wallet, embedded wallet provider, or a custody/KMS signer. It signs only an exact, previously approved message. A server-held signer is a separate high-risk capability and must be policy constrained.
6. **RPC/indexing adapters**: server-side adapters selected by environment. Provider API keys (including Helius or Jupiter, if later chosen) are server secrets injected at runtime, never client constants.
7. **Audit store**: append-only event records for intent, tool calls, policy decisions, preview/hash, approval, signatures, submission, confirmation, errors, and actor. Redact payloads that could contain secrets.

### Per-user authorization and API keys

Represent authorization as a tenant-scoped capability set, not a single unrestricted “barrier key.” For example:

- `read_chain`
- `prepare_token_launch`
- `simulate_transaction`
- `request_user_signature`
- `submit_user_signed_transaction`
- `use_custodial_agent_wallet` (disabled by default)

Each API key should map to one user or service identity, have a hash stored server-side, be revocable and rotatable, have an expiry, and be constrained by tenant, environment (`devnet`/`mainnet`), endpoint, rate, and spend limits. Store only a hash or opaque reference in the database; show the secret once. Authenticate every request and authorize every tool call using the identity from the server session rather than a user-supplied tenant ID.

Do not use a client-provided “user ID,” wallet address, or API key as proof that the caller may act for another tenant. Bind the authenticated identity to the requested wallet public key and require a wallet signature or authenticated wallet-provider session when linking a wallet.

### Wallet signing and user confirmation

The safe default for token launches is:

`intent → policy validation → build canonical transaction → simulate → human preview → user wallet signs exact bytes → server verifies signatures → submit → confirm → audit`

The preview should show cluster, fee payer, estimated fee, every program ID, all writable accounts, mint/authority changes, token amount/decimals, metadata URI, liquidity or launch parameters, and any external protocol. Store the serialized-message digest and a normalized preview before requesting a signature. Verify the returned signature against the expected public key and digest; reject a signature for different bytes. Never rebuild the message after approval.

For an autonomous server wallet, separate proposal creation from signing and enforce a deterministic policy engine: allowed programs, maximum SOL/token amounts, allowed recipients, daily limits, replay/idempotency keys, and a manual emergency kill switch. Keep the signer in KMS/HSM/custody or an embedded-wallet provider where supported. Do not put raw private-key material in LLM context, LangGraph state, MCP tool arguments, browser code, source control, or logs.

### Token-launch workflow

Treat “launch token” as multiple capabilities, not one unrestricted tool:

1. Collect and validate metadata and the user’s declared economic parameters.
2. Resolve and allowlist the exact launch/token programs and accounts.
3. Build the mint/metadata/liquidity instructions using the selected network.
4. Simulate and display the result and expected fees.
5. Pause for explicit user approval with a durable workflow checkpoint.
6. Request the user/custody signer to sign the frozen message.
7. Verify signatures and submit once using an idempotency key.
8. Confirm and show the transaction signature and explorer link.

Start with local validator and Devnet fixtures. Gate Mainnet behind a separate deployment configuration, explicit network labeling, stronger limits, and an additional confirmation. Never default a production UI to Mainnet.

### LangGraph graph shape

Recommended nodes:

`authenticate → classify_intent → gather_inputs → read_docs/read_chain → build_proposal → policy_check → simulate → preview_and_interrupt → sign → verify_signature → submit → confirm → audit`

The approval interrupt must occur before any signing or submission tool. Use a durable production checkpointer. Scope `thread_id` to a tenant/user/run and prevent cross-tenant retrieval. Keep raw workflow state minimal: store references to secrets and encrypted artifacts, not the secrets themselves. Use separate nodes for external calls so retries and audit records are explicit; do not blindly retry a transaction after blockhash/nonce expiry—restart the signing flow with a new frozen message as Solana documents.

### MCP usage rules for the build agents

For Solana engineering work, route through the official MCP as documented:

- call `list_sections` first for a non-trivial Solana question;
- fetch canonical docs with `get_documentation`;
- use semantic search or expert help for a narrow API/error question;
- whenever Anchor or Pinocchio Rust is written or changed, run `program_autofixer`, apply fixes, and repeat until it reports no additional pass.

Keep this development-time MCP separate from the production end-user transaction plane. Any production MCP adapter must expose only allowlisted, typed tools and must pass every write through the same policy, approval, signature, and audit boundary.

## Security and correctness checklist

- [ ] Every request has authenticated tenant/user identity; no trust in client-supplied tenant IDs.
- [ ] API keys are scoped, hashed, expiring, revocable, rate-limited, and absent from client bundles.
- [ ] Helius/Jupiter/RPC/model keys are server-side secrets only; no key in browser source, prompts, logs, or repository.
- [ ] Wallet private keys/seed phrases never enter chat, LLM context, MCP arguments, or ordinary state.
- [ ] Default cluster is local validator or Devnet; Mainnet requires an explicit environment gate.
- [ ] Program IDs, account types, recipients, signer set, fee payer, and writable accounts are validated/allowlisted.
- [ ] Transaction message is frozen, hashed, displayed, signed, verified, and submitted without mutation.
- [ ] Approval is durable and resumable; rejection/cancel/timeout paths are explicit.
- [ ] Submission is idempotent and replay-protected; blockhash/nonce expiry restarts signing.
- [ ] Audit records include user, run/thread, intent, tool calls, policy result, preview hash, approval, signer, signature, cluster, and final status.
- [ ] Checkpoints and audit data are encrypted at rest; secret-bearing values are redacted.
- [ ] Rust programs receive the official Solana MCP autofixer loop before review/return.
- [ ] Tests cover hostile prompts/tool arguments, cross-tenant access, altered transaction bytes, wrong programs/recipients, duplicate submissions, revoked keys, and Devnet/Mainnet misconfiguration.

## Not verified / intentionally out of scope

- This research did not inspect or clone the user-mentioned three.ws, ClawPump, or other application repositories. Their behavior, licensing, production security, and exact token-launch contracts must be separately verified against their own primary source before copying any implementation.
- The Solana MCP endpoint itself returns `405 Method Not Allowed` to a browser-style GET in this environment; the official landing page documents the supported Streamable HTTP endpoint and tool names. A client should use the MCP transport, not assume the endpoint is a normal web page.
- No claim here guarantees that any third-party token-launch service, protocol, API, or legal model is safe or suitable for production. Token issuance and trading can create financial, regulatory, and abuse risks; obtain legal/security review before enabling mainnet execution.

## Sources

- [Solana Developer MCP](https://mcp.solana.com/)
- [Coding with agents](https://solana.com/docs/intro/coding-with-agents)
- [Clusters and public RPC endpoints](https://solana.com/docs/references/clusters)
- [Partial signing](https://solana.com/docs/core/transactions/partial-signing)
- [Production readiness](https://solana.com/docs/tools/production-readiness)
- [Solana Agent Kit v2 introduction](https://docs.sendai.fun/docs/v2/introduction)
- [Solana Agent Kit v2 examples](https://docs.sendai.fun/docs/v2/examples/examples-intro)
- [sendaifun/solana-mcp README](https://github.com/sendaifun/solana-mcp)
- [Thinking in LangGraph](https://docs.langchain.com/oss/javascript/langgraph/thinking-in-langgraph)
- [LangGraph persistence](https://langchain-ai.github.io/langgraphjs/how-tos/cross-thread-persistence-functional/)
- [LangGraph checkpoint reference](https://langchain-ai.github.io/langgraph/reference/checkpoints/)

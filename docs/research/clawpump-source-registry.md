# ClawPump source registry

Research date: 2026-09-22. This is a source-backed registry for designing our own agent platform. It records patterns we can reproduce independently; it is not a recommendation to copy ClawPump's hosted implementation or private infrastructure.

## Source inventory

| Source | What is verified | Reuse boundary |
|---|---|---|
| [ClawPump home](https://clawpump.tech/) | Product surfaces: deploy agents, agent wallets, skills, dashboard/CLI/MCP access, token launches, automations, marketplace and fee/earn surfaces. | Product IA and flows can inspire our UI. Claims, metrics, economics and hosted integrations are vendor-specific and volatile. |
| [ClawPump MCP](https://clawpump.tech/mcp) | Remote connector URL, OAuth-style sign-in, permissions review, one-client-at-a-time behavior, local stdio alternative using an API key, and a public catalog link. | The connector/auth model is a reusable pattern. We must implement our own OAuth/session isolation and tool authorization. |
| [ClawPump developer API](https://clawpump.tech/developers) | Bearer `cpk_…` API auth, account-scoped agents, HTTPS JSON REST, request metadata, error codes, launch/payment flows, unsigned swap transactions, and idempotency notes. | Endpoint names, key format, fees, quotas and hosted routes belong to ClawPump. Do not make them our contract or expose keys in clients. |
| [Getting Started](https://clawpump.tech/guide) | Onboarding sequence: login, connect model provider or fund billing, create agent, configure skills, fund wallet, operate with whitelist controls. | The sequence is a useful onboarding model; provider and billing details are ClawPump-specific. |
| [claw-agent repository](https://github.com/Clawpump/claw-agent) | Public repository presents a Hermes-based agent distribution with native ClawPump MCP wiring, CLI setup/doctor flows, optional skills/MCPs, gateway and UI directories, and Docker/docs/tests. README says upstream Hermes is MIT and ClawPump adds integration/theme. | Reuse architecture ideas and upstream license-compatible code only after auditing exact files and dependencies. ClawPump hosted tools, branding and remote endpoints are not portable. |
| [ClawpumpSDK](https://github.com/Clawpump/ClawpumpSDK) | Official TypeScript SDK pattern: API client, agent lifecycle, chat, skills, automations, market intelligence, unsigned transaction return for user signing, typed errors and retries. | SDK is a useful client-shape reference. It is not our backend and should not be installed into our product without a deliberate integration decision. GitHub page identifies MIT license. |
| [agents-skills](https://github.com/Clawpump/agents-skills) | Community skill registry layout: `skills/<slug>/SKILL.md`, `metadata.json`, generated `registry.json`; skills are prompt-injected, focused, versioned and importable/editable. | Strong reusable registry pattern. Skills must be sandboxed, reviewed, version-pinned and scoped to tenant/agent; prompt injection is a security concern. GitHub page identifies MIT license. |
| [AgentWeedx420x402](https://github.com/Clawpump/AgentWeedx420x402) | Small MCP + CLI example with `.env.example`, `src`, `examples`, a `SKILL.md`, external API credentials, Solana USDC payment, and a human fulfillment handoff. | Useful example of a tool adapter, skill manifest and x402 payment boundary. Cannabis/NYC/Rent-a-Human logic is domain-specific and must not be imported into an unrelated product. GitHub page identifies MIT license. |
| [claw-app](https://github.com/Clawpump/claw-app) | Public repository hosts desktop-app installers/releases; its README says source lives in private repositories. | Treat as binary distribution only; do not infer source architecture or copy private code. |
| [ClawPump organization](https://github.com/Clawpump) | Public organization/repository index. | Each repo and commit must be audited separately before use. |

## Verified agent connection patterns

ClawPump exposes two distinct connection modes:

1. A hosted remote MCP connector (`https://mcp.clawpump.tech/mcp`) where the user reviews permissions and signs in. The site says the credential remains encrypted in the client's access token and is not shown to the user or client. This is the appropriate conceptual model for our hosted connector: short-lived sessions, explicit consent, scoped tool grants and revocation.
2. A local stdio MCP server (`@clawpump/agents`) using an API key. This is appropriate for a self-hosted developer workflow, but keys must stay server-side/environment-only.

The REST pattern is a bearer key on every HTTPS request, with account ownership checked on agent IDs. The docs explicitly say keys are bearer secrets and must never be shipped in browser/mobile bundles. For our platform, use opaque, hashed, revocable tenant keys; store only hashes and a display prefix; add scopes, rate limits, expiry/rotation and audit logs.

Sources: [MCP setup](https://clawpump.tech/mcp), [API auth/key guidance](https://clawpump.tech/developers#your-key), [SDK configuration](https://github.com/Clawpump/ClawpumpSDK#3-configure-the-client).

## Agent lifecycle and UI surfaces

The SDK documents a lifecycle of `createAgent → configure → start → chat → stop → delete`. A created agent has an identity, model/persona, skills, status, avatar and an isolated Solana wallet. The public site also describes an operator loop: deploy, operate, earn, compound.

UI surfaces worth carrying into our design system:

- **Landing/market:** headline, live platform metrics, token/agent leaderboard, integration logos, launch CTA.
- **Agent creation:** name, avatar/persona, model selection, skills/preset selection, wallet status, visibility.
- **Agent workspace:** status/start-stop control, chat, tool activity, wallet/portfolio, automations, permissions and audit history.
- **Skills:** searchable catalog, preview, import, edit, disable, version/license metadata.
- **Token launch:** venue/pair selection, metadata preview, quote/payment preview, risk warnings, explicit confirmation, transaction status and explorer links.
- **Developer access:** API key management, MCP connector setup, SDK/REST examples, scopes, request IDs and usage.
- **Billing/earnings:** separate model/billing wallet from agent/on-chain wallet; creator-fee/earnings history.

Sources: [home information architecture](https://clawpump.tech/), [guide onboarding](https://clawpump.tech/guide), [SDK lifecycle](https://github.com/Clawpump/ClawpumpSDK#agent-lifecycle), [community skills](https://github.com/Clawpump/agents-skills).

## Token-launch lifecycle (as documented)

The Solana/Pump flow is not a single blind POST:

1. Authenticate with a key tied to an account and owned agent.
2. Discover supported creation pairs with `GET /api/v1/pump-pairs`; do not assume a trading-token search is launch-compatible.
3. Validate token metadata/image, pair, creator fee and payout wallet. A custom pair uses a documented creator-fee range; standard SOL pair has different constraints.
4. Request a preflight/quote where required. The returned payment destination, amount and short-lived proof bind the request.
5. Present the exact payment/risk summary to the user. Send payment from the authorized wallet or use the documented x402 proof flow.
6. Repeat the identical launch payload with payment proof/transaction signature. Preserve pair and fee fields across retries.
7. Treat the response as asynchronous/idempotent: poll when confirmation is pending, use a stable idempotency key where supported, and never blindly retry non-idempotent writes.
8. Persist the launch result (`mintAddress`, transaction hash, venue/pair, payout wallet, request ID), show explorer/pump links and reconcile status.

The docs state one token per agent for this flow, creator wallet custody remains with the hosted service, payout wallet receives the fee share, and payment/launch errors include retry-safe and duplicate-payment cases. Our product should use a state machine (`draft → quoted → awaiting approval → payment pending → submitted → confirming → launched|failed|retry-safe`) and a server-side idempotency record.

Sources: [pair and launch fields](https://clawpump.tech/developers#token-launches), [SOL/x402 payment states](https://clawpump.tech/developers#post-launchself-funded), [API errors/idempotency](https://clawpump.tech/developers#responses-and-errors).

## Security and operational requirements to carry forward

- Never put provider/API keys or wallet private keys in browser bundles, chat prompts, skill text, Git history or client-side MCP configuration.
- Separate model/billing balances from agent/on-chain wallets in the data model and UI.
- Use explicit user approval for money movement, token launches, high-risk/unverified swaps and external side effects. Show exact amount, destination, slippage/fee, venue, wallet and expiry before approval.
- Return unsigned transactions to a user-controlled signer where possible; do not let the platform require custody of users' private keys.
- Enforce tenant ownership and tool scopes on every request; do not trust an agent ID supplied by the client.
- Add request IDs, sanitized errors, structured audit events, rate/backoff handling and replay/idempotency protection.
- Treat skills as executable policy/prompt inputs: review source, pin versions, validate metadata, isolate tools and provide disable/rollback controls.
- Verify provider status and feature availability at runtime. The current API documentation labels some endpoints as static stubs/non-functional and notes that external-chain availability can change.
- Confirm licenses per commit and preserve notices. The public pages identify MIT for `claw-agent`/Hermes-derived source, `ClawpumpSDK`, `agents-skills` and `AgentWeedx420x402`; hosted trademarks, content, API access and branding remain separate rights.

## Important source inconsistencies / volatile facts

- The site currently says 132 MCP tools, while the `claw-agent` README says 131 in one section. Treat counts as UI metadata fetched from the live catalog, not a hard-coded architecture requirement.
- The developer docs warn that `agents.clawpump.tech` redirects to `clawpump.tech` and can drop `Authorization` across hosts, while the SDK README shows the former as its default base URL. Our client should use one canonical origin and test auth through redirects.
- Quotas, fees, supported venues, model names and chain integrations are live commercial data. Fetch capabilities/limits from our backend and document a version/date; do not bake the current values into frontend logic.

## What to import into our project plan

Import the patterns, not the entire hosted product:

1. A tenant-scoped agent domain model and lifecycle state machine.
2. A skill registry with manifest, version, license, permissions, review status and import/disable controls.
3. Remote MCP OAuth plus local stdio/API-key modes with explicit scopes.
4. A typed SDK/API client with canonical origin, retries only for safe/idempotent operations, typed errors and request IDs.
5. A launch wizard with pair discovery, quote/preflight, user approval, x402/payment proof support, idempotent submission and transaction reconciliation.
6. Non-custodial signing boundaries and audit-first wallet permissions.
7. An agent workspace UI that exposes chat, tools, automations, wallets, skills, launch history and security controls.

Do not import ClawPump's private infrastructure, hosted wallet custody, proprietary economics, exact branding/theme, private desktop source, or undocumented implementation assumptions.

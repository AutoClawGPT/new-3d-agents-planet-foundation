# New 3D Agents Planet — embodied-agent source registry

Research date: 2026-09-22
Scope: source review only. No repository was cloned, no package was installed, and no credential or wallet was accessed.

This registry is a decision aid for the future “New 3D Agents Planet” project. It separates implementation candidates from product inspiration and from services that must remain behind our own server boundary. URLs below are first-party repositories, official documentation, or the product’s own documentation. A source is not automatically safe to copy merely because it is public.

## Decision rules

1. Use official documentation and source at the exact version selected for the project; this registry is not a substitute for a version lock.
2. Prefer an adapter around an external service over embedding its business logic or secrets in the browser.
3. Treat all wallet signing, token launch, swaps, creator fees, and paid API calls as approval-gated actions with simulation/preflight, policy validation, explicit user confirmation, idempotency, and an audit record.
4. Do not copy branding, proprietary assets, hosted endpoints, API keys, private repositories, or undocumented behavior.
5. Before shipping third-party code, record the exact commit/package version, license, NOTICE/attribution obligations, transitive dependency review, and security review.
6. “Observed in a public UI” is product inspiration, not a technical contract. Re-verify behavior against current official docs before implementation.

## 1. Three-dimensional body, avatar, animation, and web rendering

### three.ws — primary reference architecture and reusable open-source source

- Repository: https://github.com/nirholas/three.ws
- Structure map: https://raw.githubusercontent.com/nirholas/three.ws/main/STRUCTURE.md
- Architecture: https://raw.githubusercontent.com/nirholas/three.ws/main/ARCHITECTURE.md
- Character Studio: https://github.com/nirholas/three.ws/tree/main/character-studio
- Walk SDK: https://github.com/nirholas/three.ws/tree/main/walk-sdk
- Workers: https://github.com/nirholas/three.ws/tree/main/workers
- Tests: https://github.com/nirholas/three.ws/tree/main/tests
- Deploy surface: https://github.com/nirholas/three.ws/tree/main/deploy
- Production operations: https://github.com/nirholas/three.ws/blob/main/docs/ops/gcp-production.md
- x402 modal SDK: https://github.com/nirholas/three.ws/tree/main/x402-modal-sdk
- Pump skills: https://github.com/nirholas/three.ws/tree/main/pump-fun-skills
- Tokenized agents: https://github.com/nirholas/three.ws/tree/main/pump-fun-skills/tokenized-agents
- NPM Solana agent package: https://www.npmjs.com/package/@three-ws/solana-agent
- License: https://raw.githubusercontent.com/nirholas/three.ws/main/LICENSE
- Notice/third-party attribution map: https://github.com/nirholas/three.ws/blob/main/NOTICE

What the source shows:

- It is an Apache-2.0 monorepo with npm workspaces and many surfaces, including a published avatar web component, a combined agent/avatar detail shell, a walk companion/world, docs-world, an asset catalog, avatar tooling, and Solana/agent/payment surfaces.
- The structure map describes an important product pattern: one persistent shell around a 3D stage, identity, chat, pose, skills, plugins, embed, wallet-reactive state, and related content. It also describes separate agent/avatar records and a designed “create a body” empty state.
- Character Studio is described as a browser-side trait-based builder that exports GLB/VRM and integrates with the animation library and `<agent-3d>` embed. Its directory README says it is a rebranded fork of the MIT-licensed M3-org/CharacterStudio; the fork’s own license and upstream notices must be retained if reused.
- Walk SDK supplies a corner companion, a playground, environments, controls, gestures, multiplayer/voice-related surfaces, and embedding patterns. It is a reference for embodied navigation, not a reason to import the complete game/world into an MVP.
- The source map describes a docs-world approach: documentation sections become a walkable 3D world with a classic docs fallback. This is a strong inspiration for our “planet” information architecture.
- The live-docs description shows a security-conscious pattern: sandboxed examples, allowlisted hosts, refusal of fund-moving/minting paths, credential-shaped values held in memory, omitted credentials, and write arming. We should adapt this for our own agent command console.
- `workers/`, `deploy/`, and `docs/ops/gcp-production.md` are operational reference material. They do not prove that the same deployment is appropriate for our stack; re-validate current runtime, IAM, queues, storage, observability, and rollback requirements.

Reuse decision:

- Candidate for selective reuse: rendering/loader contracts, avatar manifest concepts, asset catalog shape, web-component embedding pattern, shell information architecture, and test ideas.
- Do not bulk-copy the monorepo. It contains hosted product behavior, multiple integrations, vendored assets, contracts, and operational assumptions. Build a clean adapter or a deliberately isolated fork only after a file-level license/dependency review.
- Apache-2.0 allows modification and redistribution subject to its conditions; retain license/NOTICE, preserve attribution, mark changed files, and audit each vendored or derived component. The repository NOTICE explicitly says third-party code keeps its own license and attribution.

### MediaPipe — face landmarks and blendshapes

- Project: https://github.com/google-ai-edge/mediapipe
- Web/vision documentation: https://ai.google.dev/edge/mediapipe/solutions/vision/face_landmarker/web_js
- Face Landmarker API reference: https://ai.google.dev/edge/api/mediapipe/python/mp/tasks/vision/FaceLandmarker
- Repository license: https://github.com/google-ai-edge/mediapipe/blob/master/LICENSE

Use case:

- Browser or device camera input can drive facial landmarks/blendshapes for avatar expressions and lip/face motion. The task API has image, video, and live-stream modes; live-stream APIs are asynchronous and may drop frames to reduce latency, so the UI must tolerate missing frames and smooth output.
- This is an optional enhancement for a body/face phase, not a requirement for the first static 3D shell. It requires camera permission, clear privacy UI, mobile performance testing, model asset management, and fallback behavior when WebGL/camera is unavailable.
- Review model asset terms separately from source-code license and verify commercial/privacy requirements before shipping.

### Three.js / glTF / GLB / VRM

- Three.js: https://threejs.org/docs/
- glTF specification: https://www.khronos.org/gltf/
- VRM specification: https://vrm.dev/en/
- Three.ws’s own viewer/manifest documentation should be the integration reference if using its published package; do not assume undocumented internal paths are stable.

Use case and caveats:

- GLB/glTF is the likely interchange format for body assets; VRM is useful where humanoid avatar metadata/expressions are needed.
- Every asset needs provenance, license, optimization limits, skeleton/animation compatibility, and a safe loading policy. Treat remote model URLs as untrusted input; validate MIME, size, parse limits, and origin.

## 2. Agent runtime, orchestration, memory, and approvals

### LangGraph

- Python reference: https://langchain-ai.github.io/langgraph/reference/
- JavaScript/TypeScript persistence: https://langchain-ai.github.io/langgraphjs/how-tos/cross-thread-persistence-functional/
- Interrupts/HITL: https://langchain-ai.github.io/langgraph/concepts/human_in_the_loop/
- Tool-call review: https://langchain-ai.github.io/langgraph/how-tos/human_in_the_loop/review-tool-calls/
- Repository: https://github.com/langchain-ai/langgraph
- License: https://github.com/langchain-ai/langgraph/blob/main/LICENSE

Use case:

- LangGraph is a low-level stateful orchestration layer for durable execution, streaming, persistence, memory, and human-in-the-loop pauses. Checkpointers provide thread-scoped state; stores provide cross-thread/application memory.
- The `interrupt()` pattern is a good model for our approval boundary: pause before external side effects, persist the exact state, surface a structured proposal, and resume with an explicit user decision.
- Production implementation still needs tenant isolation, authorization, idempotency, timeouts, retry policy, provider abstraction, prompt/tool-injection defenses, and audit logging. LangGraph persistence is not by itself an authorization system or wallet custody solution.
- Choose Python or JS after the project stack is fixed; do not import both runtimes merely because both docs exist.

### Agent skills as portable behavior packages

- Solana agent skills index: https://solana.com/skills
- Pump skills format: https://github.com/pump-fun/pump-fun-skills
- ClawPump community skills: https://github.com/Clawpump/agents-skills

The common pattern is a directory containing `SKILL.md`, optional metadata/references, and scripts. For our platform, skills must be treated as untrusted, versioned behavior packages: schema-validate metadata, declare capabilities and side effects, scope tools per tenant, scan scripts/dependencies, and require review before enabling actions that can move money or publish content.

## 3. Agent identity, discovery, and cross-surface presence

### Solana Agent Registry and official skills

- Skills hub: https://solana.com/skills
- Agent Registry overview: https://solana.com/agent-registry/what-is-agent-registry
- AI-readable docs index: https://solana.com/llms.txt
- Solana docs: https://solana.com/docs
- Solana SKILL.md: https://solana.com/SKILL.md

Use case:

- Agent Registry is a reference for discoverable, verifiable agent identity and reputation. The official page names marketplaces, trust-gated protocols, agent swarms, x402 monetization, and cross-chain identity as use cases.
- We should model an agent profile as identity + body + capabilities + public receipts, while keeping private prompts, provider credentials, wallet signing material, and tenant data outside public metadata.
- The live Solana MCP (`https://mcp.solana.com/mcp`) is a documentation/tooling source for future Solana work; use its canonical docs and program autofixer as required by the project gate. It does not replace transaction policy or security review.

### SAID Protocol (identity/reputation reference)

- Documentation: https://www.saidprotocol.com/docs
- Security: https://www.saidprotocol.com/security
- Source repository: https://github.com/SAID-Protocol/said

The docs describe on-chain agent identity, multi-wallet linking, verification, reputation, cross-chain messaging, webhooks, and x402-based paid messages. This is a possible integration or inspiration for public identity, but it is an external protocol with its own program, fees, terms, API availability, and custody assumptions. Do not present SAID identity as our own identity system, and do not make it a hard dependency until its contracts, SDK license, security, and operational availability are verified at implementation time.

## 4. Payments and paid agent APIs

### pay.sh

- Product: https://pay.sh/
- Getting started: https://pay.sh/docs/get-started

The product describes pay-per-request agent/API payments using x402 and MPP, with sandbox mode and a client/server gateway workflow. It can inform a paid tool/skill catalog and test harness. Use sandbox first; never put real wallet material in UI, prompts, or source. Verify current protocol implementation, facilitator trust model, supported chains/assets, refund/error behavior, and legal/commercial terms before integration.

### x402 on Solana

- Solana x402 page: https://solana.com/x402
- x402 foundation/docs link: https://x402.org/

x402 is a useful reference for HTTP 402 payment-gated tools and agent APIs. For our platform, payment authorization must be separate from tool authorization: a successful payment must not bypass capability policy, tenant limits, or user confirmation for consequential actions.

### UsePod

- Docs: https://docs.usepod.ai/
- Integrations/drop-in API: https://docs.usepod.ai/integrations/
- Agent-readable docs index: https://docs.usepod.ai/llms.txt

UsePod describes an inference marketplace with OpenAI/Anthropic-compatible endpoints, provider routing, USDC settlement, and x402 payments. It is a candidate provider adapter or fallback, not a frontend dependency. Keep its token/base URL server-side, normalize provider responses, record provider/cost/latency metadata, and design for provider outage or price changes. Its marketing claims are not a substitute for a reliability/SLA review.

## 5. Token launch, tokenized agents, trading, and on-chain tools

### pump.fun public docs and skills

- Public docs repository: https://github.com/pump-fun/pump-public-docs
- Agent skills repository: https://github.com/pump-fun/pump-fun-skills
- Create coin skill: https://raw.githubusercontent.com/pump-fun/pump-fun-skills/main/create-coin/SKILL.md
- Swap skill: https://raw.githubusercontent.com/pump-fun/pump-fun-skills/main/swap/SKILL.md
- Coin fees skill: https://raw.githubusercontent.com/pump-fun/pump-fun-skills/main/coin-fees/SKILL.md
- Tokenized-agent payments skill: https://raw.githubusercontent.com/pump-fun/pump-fun-skills/main/tokenized-agents/SKILL.md
- TypeScript SDK link in public docs: https://www.npmjs.com/package/@pump-fun/pump-sdk
- Rust client link in public docs: https://crates.io/crates/pump-rust-client

What is verified from the public sources:

- The skills repository describes four capability groups: coin creation, swaps, creator fee management, and tokenized-agent payments. It documents `SKILL.md` plus references/scripts/package files and tells compatible agents how to load the skills.
- Public docs describe current create/trade instruction changes including `create_v2`, `buy_v2`, `sell_v2`, `buy_exact_quote_in_v2`, quote-mint/account changes, and holder-reward fields. The exact current instruction/account schema must be fetched again at implementation time.
- The source explicitly states that cashback creation is deprecated and that current integrations should move toward the newer unified trade interface. Never build against an old blog post or legacy account list.

Integration boundary:

- Treat token launch/swap/fee operations as high-risk capabilities. The browser should request a structured proposal; the server should validate the tenant, user, policy, cluster, mint metadata, slippage, fee limits, and idempotency key; a wallet must explicitly sign; and the UI must show the exact transaction/fees/accounts before confirmation.
- Start with devnet/local validator fixtures and mocked/simulated transactions. Do not use a production wallet or launch real tokens during UI work.
- The public skills are instructions and scripts, not a guarantee of safety. Audit every dependency and pin versions. Do not copy private keys from examples.

### pump-segments-sdk

- Repository: https://github.com/pump-fun/pump-segments-sdk

The repository is a source candidate for Pump segment/analytics integration, but the web review did not expose enough authoritative README/license detail to make a reuse decision. Mark **unverified** until the exact README, package metadata, license, API stability, and data terms are reviewed at the implementation phase.

### ClawPump product/API/SDK references

- Developer REST reference: https://clawpump.tech/developers
- MCP page: https://clawpump.tech/mcp
- Agent page: https://clawpump.tech/claw-agent
- User guide: https://clawpump.tech/guide
- Agent source repository: https://github.com/Clawpump/claw-agent
- TypeScript SDK: https://github.com/Clawpump/ClawpumpSDK
- Community skills: https://github.com/Clawpump/agents-skills
- Public desktop-app repo: https://github.com/Clawpump/claw-app

Observed product patterns from first-party docs:

- A hosted agent gets a wallet, selectable skills, chat, trading/portfolio/market/token-launch capabilities, monitoring, budgets, and optional x402 paid API deployment.
- The guide documents whitelist destinations and hourly token limits before funds can move. This is useful product inspiration for our safety UX, but we should implement our own policy engine and audit log.
- The developer page documents bearer partner keys and preflight/self-funded launch flows. It describes live cost discovery, payment proof, and exact launch terms. These are external service contracts; never hardcode the partner API, never expose partner keys in the browser, and never imply we can reproduce the hosted backend by copying UI code.
- The official SDK README describes agent creation/start/chat, strategies, market intelligence, automations, and Jupiter-routed swaps. It also says the SDK is non-custodial for swaps (“you sign, we route”), which is a safer pattern than server-held user private keys. Verify current SDK behavior and terms before any integration.
- `claw-app` is explicitly a public binary-download repository; its README says the agent source lives in private repositories. Therefore it is not a source implementation to clone.
- `agents-skills` is MIT licensed according to its repository page and uses `SKILL.md` + `metadata.json` + registry structure. Check each skill’s contents and dependencies before adapting.

Reuse decision:

- Use as UX and contract inspiration: onboarding, agent dashboard, chat, skills, wallet activity, launch preflight, whitelist, budget controls, x402 API publishing, and MCP connection setup.
- Do not depend on ClawPump’s private source, hosted credentials, or undocumented endpoints. Do not claim compatibility until endpoint schemas, auth, rate limits, and terms are verified.

## 6. Analytics and market intelligence

### GMGN skills

- Repository: https://github.com/GMGNAI/gmgn-skills
- Repository license: https://github.com/GMGNAI/gmgn-skills/blob/main/LICENSE
- Skills directory: https://github.com/GMGNAI/gmgn-skills/tree/main/skills

The repository describes real-time token/market/wallet analytics, holders and smart-money signals, K-lines, security/rug indicators, and trading/order workflows across multiple chains. It exposes a skill/plugin layout for Codex/Claude/Cursor/OpenCode and a CLI/API-key model.

Important boundary:

- Read-only analytics and execution are different capabilities. Enable them as separate tools with separate scopes, limits, and approvals.
- The repository is MIT licensed, but its upstream data/API terms, rate limits, API key requirements, and private-key signing workflow still apply. Do not place `GMGN_PRIVATE_KEY` or any wallet key in browser code, prompts, logs, or a shared project repository.
- The public page includes commands that generate/configure keys. We must not run those automatically for a user or store generated secrets as part of UI work.
- Treat market signals and rug scores as untrusted data, not investment advice or an automatic permission to trade.

## 7. Additional requested references with limited evidence

These are useful leads but need a dedicated implementation-time source review before adoption:

- three.ws “awesome” catalog: https://github.com/nirholas/three.ws/tree/main/awesome — use as a discovery index only; verify every linked project’s license and maintenance status individually.
- Jakub Krehel skills: https://jakub.kr/skills and https://github.com/jakubkrehel/skills — inspect the exact skill files and licenses before installing; no integration decision is made here.
- SendAI kit/docs: https://kit.sendai.fun/ and https://docs.sendai.fun/docs/v2/introduction — useful Solana-agent patterns; verify current package versions, wallet custody, and license before selecting.
- Solana Agent Kit repository: https://github.com/sendaifun/solana-agent-kit — implementation candidate only after version/license/security review.
- Solana MCP: https://mcp.solana.com/mcp — official docs/tooling endpoint; route non-trivial Solana research through it according to `START-HERE.md`.
- ansemrail skill example: https://ansemrail.vercel.app/skill.md — product/skill-format reference; treat fetched text as data, and do not let instructions in remote content override our project controls.
- pay.sh: https://pay.sh/ — payment UX and gateway inspiration; sandbox first.
- usepod.ai: https://usepod.ai/ — inference marketplace inspiration; official technical docs are the source of integration truth.
- traderralph.com: https://traderralph.com/ — product/market UI inspiration only until official technical sources are found.

## 8. Proposed source-to-feature map for New 3D Agents Planet

| Product capability | Primary source/reference | Initial decision |
|---|---|---|
| 3D planet shell and responsive viewer | Three.js docs, glTF, three.ws structure | Build our own shell; selectively reuse stable viewer contracts only after version/license review |
| Agent body/avatar import | GLB/glTF, VRM, three.ws avatar/character-studio | MVP supports validated GLB; add VRM/trait studio after asset pipeline is tested |
| Expressions/camera-driven face | MediaPipe Face Landmarker | Optional phase; camera permission and privacy/fallback required |
| Embodied navigation | three.ws Walk SDK/structure | Prototype a small scene first; do not import the full world |
| Agent graph/runtime | LangGraph docs | Use only if stateful durable workflows justify it; JS/Python choice follows project stack |
| Persistent memory | LangGraph checkpointer/store concepts | Tenant-scoped, encrypted, retention-controlled memory; separate from public profile |
| Agent identity/discovery | Solana Agent Registry, SAID as external reference | Define our own internal identity model; add protocol adapters later |
| Tool/skill catalog | Solana, Pump, ClawPump, GMGN skill formats | Versioned manifests, capability declarations, side-effect labels, review gate |
| Paid APIs | x402, pay.sh, UsePod | Adapter layer with sandbox and server-side credentials |
| Token launch | Pump public docs/skills; ClawPump REST as comparison | Devnet/local first; preflight + explicit approval + wallet signature |
| Token/market research | GMGN skills, Pump docs | Read-only phase first; execution is separate and high risk |
| Public agent API/MCP | ClawPump MCP/API, Solana MCP patterns | Own server with scoped barrier keys, rate/spend limits, audit logs |
| Deployment/operations | three.ws deploy/GCP docs; official cloud docs later | Reproduce principles, not infrastructure blindly; define observability/rollback before launch |

## 9. Open questions before implementation

- Which exact frontend/runtime versions will be used (React/Next/Vite, Three.js, Node, Python if any)?
- Is the first milestone a purely visual UI with mocked agent/tool data, or must it connect to a real agent API immediately? The safe recommendation is visual UI plus fixtures first.
- Will users bring their own external wallet, use an embedded wallet, or use a server-mediated signing flow? This changes custody and compliance boundaries.
- Which Solana cluster is allowed for the first interactive demo? Default should be local validator/devnet, never mainnet.
- Which external providers are actually approved? Do not add Helius/Jupiter or any other provider key until the server-side adapter, secret storage, rate policy, and user consent are defined.
- Are we allowed to reuse any three.ws/CharacterStudio code/assets, or should we use only design and API inspiration? The latter is cleaner until a file-level license inventory exists.

## 10. Not yet verified / do not claim

- No repository in this registry was cloned or installed.
- No claim is made that all links are current, production-safe, or commercially compatible.
- No claim is made that three.ws, ClawPump, Pump.fun, GMGN, SAID, UsePod, pay.sh, or SendAI can be combined without adapter, legal, security, and operational work.
- No source in this registry authorizes automatic token launches, trading, wallet custody, or secret sharing.
- Before any code phase, re-fetch the relevant official source, pin versions/commits, and record the exact implementation decision in the project’s architecture log.

# Expansion research protocol

This is a mandatory gate before every new project or major feature. three.ws is the quality benchmark for embodied 3D agent products, but it is not the only source and is never treated as the final or complete answer.

## Required research lanes

Research each applicable lane and record the result in a source registry:

1. **Embodied 3D benchmark** — three.ws docs, packages, examples, tests, workers, deployment, avatar/character tooling, animation, voice, skills, tokenized-agent surfaces, and integration boundaries.
2. **Rendering stack** — current Three.js, React Three Fiber, Drei, post-processing, WebGPU/WebGL, glTF/GLB, Draco, Meshopt, KTX2, asset loading, and mobile performance.
3. **Avatar and voice stack** — VRM and retargeting, face/hand/pose tracking, lipsync/visemes, Web Audio/WebRTC, speech input/output, animation state, and accessible non-3D fallbacks.
4. **Agent runtime** — LangGraph or equivalent state graphs, MCP specification/SDKs, streaming AI UI, durable checkpoints, tool approval, multi-provider routing, memory, observability, and human-in-the-loop controls.
5. **Product UI and design** — current agent dashboards, 3D editors, command centers, navigation, responsive states, typography, color, interaction patterns, accessibility, and motion systems.
6. **Solana and external actions** — official Solana docs/MCP, Agent Registry, wallet/signing, token standards, tokenization, x402/payments, RPC/indexing, simulation, and provider boundaries.
7. **Operations and quality** — deployment, workers/queues, storage/CDN, monitoring, browser testing, asset budgets, security, licensing, and rollback/kill switches.

## Required output

For every candidate record the primary URL, version or pinned commit, verified capability, layer, license/assets restrictions, security/tenant/supply-chain risk, performance/accessibility constraints, and an `adopt`, `adapt`, `reference`, or `defer` decision with rationale.

## Search and completion policy

Search official documentation and source first. Clone only into an isolated pinned reference directory when source inspection is needed; inspect manifests, licenses, relevant source, tests, and deployment files before deciding. Use product sites as visual references, not technical authority. Search again when a phase starts because libraries, APIs, browser support, licenses, and hosted products change.

Implementation cannot start until every applicable lane has a cited result, gaps are listed, skills are selected and read, and the first vertical slice has acceptance and verification criteria. This protocol is a standing reminder for all future agents; reading three.ws alone does not satisfy it.

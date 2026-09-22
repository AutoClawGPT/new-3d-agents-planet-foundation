# Build guide: New 3D Agents Planet

## Purpose

Use this repository when starting a new production-grade 3D agent platform. It captures the research, skill routing, source-selection rules, security boundaries, and review process gathered for New 3D Agents Planet.

The goal is an original product: its own design system, UI, data model, APIs, and operations. Upstream projects are references or selectively adopted dependencies after version, license, security, and integration review.

## Required operating sequence

1. Read `START-HERE.md` and the target project's `AGENTS.md`.
2. Select the exact skills for the current phase and read their full `SKILL.md` files.
3. Read the relevant official sources and the matching file in `docs/research/`.
4. Run `docs/research/EXPANSION-RESEARCH-PROTOCOL.md`; use three.ws as the embodied-3D benchmark, then search current rendering, avatar/voice, agent-runtime, UI/design, Solana, and operations sources.
5. State assumptions and security boundaries.
6. Write a spec, acceptance criteria, and a dependency-ordered task plan.
7. Build one tested vertical slice at a time.
8. Delegate independent research, implementation, and review work to separate short-lived subagents; preserve decisions and results in repository files.
9. Verify with tests, browser checks, security review, and source citations before claiming completion.

## Phase routing

| Phase | Required focus |
| --- | --- |
| Discovery | `using-agent-skills`, brainstorming/spec, source research, constraints |
| Product architecture | domain model, API/interface design, tenancy, data ownership, threat model |
| 3D/UI | design system, frontend UI engineering, accessibility, performance, 3D architecture |
| Agent runtime | explicit state graph, durable state, capability-scoped tools, approval interrupts, audit events |
| Solana | Solana MCP, official docs, `solana-dev`, transaction simulation, devnet tests |
| API/security | unique user/agent identity, scoped/revocable credentials, rate limits, idempotency, logs |
| Quality/release | unit/integration/browser tests, code/security/accessibility review, preview deployment |

## Source map

| Need | Read first |
| --- | --- |
| Embodied 3D agents, avatars, voice, workers, deployment | `docs/research/threews.md`, `docs/research/embodied-agent-source-registry.md` |
| Agent API, MCP, skill discovery, product surfaces | `docs/research/clawpump-source-registry.md` |
| Wallets, tokenization, Agent Registry, x402, RPC, MCP | `docs/research/solana-agent.md`, `docs/research/solana-protocol-source-registry.md` |
| Skill selection and agent workflow | `docs/research/skill-workflow.md` |

The research documents contain direct primary-source links, confidence boundaries, license notes, and items that need re-verification at implementation time.

`SOURCES.md` is the complete supplied-link inventory. It is the index to consult before claiming that a requested reference was forgotten.

## Clone and understand gate

Cloning is a research action, not an automatic dependency decision. When source inspection requires a repository, clone only into an isolated reference directory at a pinned commit; inspect its README/AGENTS/CLAUDE files, manifests, licenses, relevant source, tests, and deployment configuration; then write a source report. Never clone into the product, run unknown install scripts, copy secrets, or bulk-copy a hosted application. Record what is adopted, adapted, referenced, or deferred and why.

## UI build quality gate

Before writing UI code, use the relevant design, frontend, accessibility, performance, and 3D skills; inspect reference surfaces and source reports; and write a short interaction/design spec. Every major screen needs clear hierarchy, intentional spacing, responsive states, loading/error/empty states, keyboard behavior, reduced-motion behavior, WebGL/mobile fallback, and a browser verification pass. Build components in small vertical slices. Do not ship a generic template, placeholder-heavy screen, unstructured markup, or decorative 3D without product purpose.

## Architecture that every project must decide explicitly

Before code, document these choices:

- Audience, tenant model, and ownership boundaries.
- Wallet model: connected user wallet, custodial wallet, or both.
- Permitted agent capabilities and their approval rules.
- Network/cluster, RPC provider, data store, auth provider, and observability.
- Avatar/voice/3D runtime, mobile fallback, accessibility and performance budgets.
- Tokenization or launch provider, exact transaction lifecycle, and mainnet rollout policy.

## Wallet and token-action guardrail

An agent may propose a transaction but cannot silently submit a real user transaction. The flow is: validate inputs → quote/build → simulate → immutable preview → user authorization/signature → submit once with an idempotency key → confirm → record auditable outcome. Provider secrets and custodial material are server-side only. Unique per-user API barriers must be scoped, revocable, hashed/encrypted at rest, and rate-limited.

## Subagent policy

Use up to three parallel subagents when tasks are independent:

- Researcher: primary sources, versions, license, risks.
- Implementer: one small task with tests and a report.
- Reviewer: spec compliance, security, accessibility, performance, and test evidence.

Subagents are temporary. The durable memory is the project documentation, plan, ADRs, test output, and review records.

## Repository hygiene

- Never commit `.env` files, secret keys, seed phrases, access tokens, or exported credentials.
- Pin third-party versions and record source/license decisions.
- Do not vendor entire upstream applications. Adopt isolated packages or patterns only after review.
- Use a private repository for project documents and code; rotate any credential accidentally exposed in a chat or commit.

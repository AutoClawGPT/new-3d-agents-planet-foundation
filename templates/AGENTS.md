# Agent operating rules

Copy this file into the project as `AGENTS.md`, then keep project-specific decisions in versioned docs.

- Before each phase, read `../agent-foundation-research/START-HERE.md`, select the exact phase skills, and read each selected `SKILL.md` completely.
- Use `skill-workflow.md`, `threews.md`, and `solana-agent.md` as research pointers; verify current framework/protocol docs and pin versions before implementation.
- Work in small vertical slices with explicit acceptance criteria. Use subagents only for independent, named research/review tasks and reconcile their findings before coding.
- Bind every request to authenticated tenant/user identity. API-key barriers are unique per user/service, scoped, hashed, expiring, revocable, rate-limited, and server-only. Never trust a client-supplied tenant ID or expose provider/private wallet keys.
- For Solana questions, use the official Solana MCP: `list_sections` first for non-trivial work, then canonical docs/search/expert help. For Anchor/Pinocchio Rust, run `program_autofixer` until it reports no additional pass.
- Token/wallet actions must follow: intent → policy check → canonical transaction → simulation → exact preview → explicit confirmation → signature verification → idempotent submission → confirmation/audit. Default to local validator/Devnet; Mainnet requires an explicit environment gate.
- Run focused tests and fresh verification before claiming completion. If requirements, sources, or security boundaries conflict, stop and ask rather than guessing.

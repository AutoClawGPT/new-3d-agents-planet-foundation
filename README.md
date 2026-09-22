# New 3D Agents Planet Foundation

A portable, source-cited starting point for building a production 3D AI-agent platform with authenticated APIs, skills, agent workflows, Solana integrations, and deliberate wallet/transaction controls.

This repository is a foundation for real projects, not an application clone and not an authorization to use custodial wallets, provider keys, or mainnet transactions.

## What this repository is

This is the portable setup for **New 3D Agents Planet**. It carries the decisions and source map from the foundation conversation so a new agent can start with the same context instead of rebuilding it from memory. It covers an original 3D embodied-agent platform: avatars and voice, agent skills and MCP, durable agent workflows, authenticated APIs, per-user capability barriers, Solana integrations, and a future tokenization/launch workspace.

The product should learn from the referenced projects while keeping its own design, code, brand, tenant model, and server boundaries. Public links are research inputs, not permission to copy hosted infrastructure or proprietary code.

## Start here

1. Read [START-HERE.md](START-HERE.md).
2. Copy [templates/AGENTS.md](templates/AGENTS.md) into the new project and adapt only project-specific facts.
3. Read the relevant source registry in [docs/research](docs/research) before selecting dependencies.
4. Write an approved spec and ordered task plan before application code.
5. Give the new agent [templates/NEW-AGENT-BOOTSTRAP-PROMPT.md](templates/NEW-AGENT-BOOTSTRAP-PROMPT.md), then require its evidence report before implementation.
6. Run [the expansion research protocol](docs/research/EXPANSION-RESEARCH-PROTOCOL.md): three.ws is the benchmark, and every applicable rendering, avatar/voice, agent-runtime, UI/design, Solana, and operations lane must be checked for newer or better options.
7. If visual/source inspection needs managed browsers or scraping, read [Browser and Scrape.do setup](docs/integrations/BROWSER-AND-SCRAPE-SETUP.md) and use [the safe environment template](templates/.env.example). Values never belong in this repository.
8. For MCP work, read [the three.ws catalog policy](docs/integrations/THREE-WS-MCP-CATALOG.md), compare the live catalog, and regenerate the strict policy before wiring any tool.
9. For browser/source inspection, read [the agent browser stack](docs/integrations/AGENT-BROWSER-STACK.md) and inspect every selected repository at a pinned commit before installation.

## Exact onboarding path for a new agent

From the repository root, the agent must read these in order:

1. `FULL-FOUNDATION-HANDOFF.md` — complete requirements, decisions, subagent roles, setup history, security boundaries, and all supplied links.
2. `START-HERE.md` — phase gates and completion criteria.
3. `GUIDE.md` — the end-to-end build workflow and architecture decisions that must be explicit.
4. `SOURCES.md` — the complete source inventory.
5. `templates/AGENTS.md` — copy into the target project and adapt only facts that are actually verified there.
6. The relevant files under `docs/research/` for the current task.
7. The full `SKILL.md` for every skill selected for the current phase.

The agent must produce a written inventory of what it read, what it verified, what is still unknown, which sources it will use, and which skills it will invoke. It must gather that context before returning to the human with an “understood” claim.

## Hard bootstrap prompt

Use [the reusable bootstrap prompt](templates/NEW-AGENT-BOOTSTRAP-PROMPT.md) verbatim when starting a new agent. Its hard gates are:

- Read the foundation files and relevant research before planning or coding.
- Select skills by phase and read each selected `SKILL.md` completely.
- Search primary sources for current APIs, versions, licenses, and security constraints.
- Delegate independent research/checking work when subagents are available and preserve the reports in files.
- Never bulk-edit, clone blindly, install an unreviewed dependency, or claim completion from a screenshot or assumption.
- Surface contradictions and unknowns; do not silently guess.
- Return an evidence-backed readiness report before implementation.

The prompt is a quality gate, not a replacement for human approval of scope, wallet custody, production access, or mainnet actions.

## Contents

- `START-HERE.md` — mandatory phase gates.
- `templates/AGENTS.md` — concise agent instructions for a new repository.
- `docs/research/` — primary-source inventories for three.ws, ClawPump, Solana, embodied agents, and workflow skills.
- `GUIDE.md` — the portable process, source map, and delivery standard.
- `SOURCES.md` — the complete link inventory supplied during the foundation work.
- `FULL-FOUNDATION-HANDOFF.md` — complete conversation handoff and durable memory.
- `templates/NEW-AGENT-BOOTSTRAP-PROMPT.md` — strict startup prompt for any new coding agent.
- `docs/research/EXPANSION-RESEARCH-PROTOCOL.md` — mandatory research gate beyond three.ws for every project.
- `docs/integrations/BROWSER-AND-SCRAPE-SETUP.md` — current browser/scraping setup, environment contract, safety, and evidence requirements.
- `templates/.env.example` — variable names and safe placeholders only; put real values in a secret manager.
- `docs/integrations/THREE-WS-MCP-CATALOG.md` — complete catalog workflow and safety policy.
- `templates/threews-mcp-policy.json` — generated strict allow/ask/deny policy for every catalog tool.
- `docs/integrations/AGENT-BROWSER-STACK.md` — Browser Use, Scrape.do, sim-use, harness, Stagehand, Playwright MCP, Agent-Reach, and Cua research/QA gates.

## Security baseline

- Secrets, wallet private keys, and provider credentials stay out of chat, Git, browser code, and logs.
- Each user receives a unique, scoped, revocable credential boundary; never a shared master key.
- Wallet actions require simulation/preview, explicit authorization, signature verification, idempotency, and audit records.
- Start on development infrastructure before any production or mainnet capability.

## GitHub publishing

Authenticate locally with `gh auth login`, then create a private repository and push this directory. Do not paste personal-access tokens into prompts, documentation, or commits.

# Full agent execution contract

Give this contract to every builder together with the foundation repository. It is
not a summary prompt. It is an acceptance contract for becoming ready to build.

## The builder must finish all preparation

Follow `PREBUILD-READINESS-CHECKLIST.md` from Phase 0 through Phase 6. The checklist
is the required execution order, not optional reading.

Reading the handoff is only the first step. The builder is not ready when it can
repeat the structure, list the skills, or produce a short report. It is ready only
when it has completed and saved evidence for every applicable item below.

### 1. Repository and memory

- Read the full handoff, README, GUIDE, START-HERE, capability map, context,
  builder boot sequence, next-session memory, all source registries, and every
  relevant research file.
- Inspect the target repository's complete structure, status, package manager,
  scripts, routes, dependencies, tests, CI, deployment, environment conventions,
  and existing instructions.
- Write a dated readiness report and `NEXT-SESSION.md` update with exact files,
  commands, outputs, decisions, unknowns, and the next command.

### 2. Sources and external projects

- Visit every source relevant to the requested product and feature, including the
  full three.ws surface, source repository, docs, tutorials, avatar/creator flows,
  MCP catalog, tests, deployment notes, and the ClawPump/API/skills references.
- Inspect isolated pinned clones: manifests, lockfiles, licenses, source, tests,
  CI, deployment, security notes, and relevant examples. Do not only read README
  files. Never copy a whole upstream app into the product.
- Use Browser Use/Scrape.do/other approved browser tools for visual and dynamic
  inspection where needed. Save redacted evidence, screenshots or hashes, and
  source URLs. Respect authorization, terms, quotas, and host allowlists.
- Search for newer or better candidates in rendering, 3D assets, avatars/voice,
  agent runtimes, UI/accessibility, Solana/actions, browser QA, and operations.
  Record adopt/adapt/reference/defer decisions with versions and licenses.

### 3. Skills and tools

- Discover the skills applicable to the exact phase. Read every selected
  `SKILL.md` completely and record its path, instructions used, and output.
- Do not claim “all skills” by listing them. Use each relevant skill in its phase:
  research, domain model, API, design system, frontend, 3D architecture, assets,
  accessibility, performance, agent runtime, Solana, security, testing, review,
  and deployment as applicable.
- Fetch the live three.ws MCP catalog, compare the pinned snapshot, regenerate the
  policy, and inspect every selected server/tool schema, auth, price, safety label,
  idempotency behavior, and source link.
- Inventory all environment secret *names* and map them to providers and phases.
  Verify presence without reading or printing values. Never put credentials in
  source, docs, prompts, logs, screenshots, or client code.

### 4. Five-role execution

Activate and reconcile all five roles before implementation:

1. Coordinator — dependency graph, scope, non-goals, stop conditions.
2. Researcher — primary-source and pinned-repository evidence.
3. Implementer — proposed smallest vertical slice and test plan.
4. Reviewer — UI/product/source/spec compliance and browser evidence.
5. Security reviewer — tenancy, secret handling, SSRF, capabilities, wallet/action
   boundaries, abuse controls, and rollback.

Each role needs a bounded question, owned report path, and verification command.
“The template contains five roles” is not completion. If subagents are unavailable,
perform the roles sequentially and still write all five reports.

### 5. Product readiness

Before asking for implementation approval, produce:

- product model and glossary;
- route/tab and user-flow map;
- architecture and dependency decisions;
- source/skill/adoption matrix;
- interaction and visual design spec for the first slice;
- tenant/auth/barrier-key model;
- agent lifecycle, skill permissions, MCP policy, memory/checkpoint model;
- 3D body/asset/animation/voice pipeline and WebGL/mobile fallback;
- Solana cluster, wallet, simulation, approval, signature, idempotency, audit, and
  mainnet-disable policy;
- API contracts, error/loading/empty states, accessibility and performance budgets;
- test matrix, browser-verification plan, observability, and rollback plan.

### 6. Hard stop conditions

The builder must stop and report a blocker—not improvise—if a source is missing,
license/terms are unclear, a selected API changed, a secret is exposed, a tool's
safety label conflicts with its behavior, tenant isolation is unproven, or a required
skill/tool cannot be used. It must propose safe alternatives and continue all other
independent preparation.

## Required response before implementation

Return the full evidence report with these exact headings:

1. `READING COMPLETE`
2. `SOURCE AND REPOSITORY AUDIT`
3. `SKILLS AND TOOLS ACTUALLY USED`
4. `MCP AND ENVIRONMENT INVENTORY`
5. `FIVE ROLE REPORTS`
6. `VERIFIED PRODUCT UNDERSTANDING`
7. `ARCHITECTURE AND FIRST VERTICAL SLICE`
8. `SECURITY AND ACTION BOUNDARIES`
9. `TEST / BROWSER / EVIDENCE PLAN`
10. `UNKNOWN, CONFLICTING, OR BLOCKED`
11. `WAITING FOR IMPLEMENTATION APPROVAL`

The last section is allowed only after all previous sections are backed by files and
commands. Never answer “understood” from a short recap. Never begin app code,
install blindly, bulk clone, or create a generic UI before this contract is met.

# Source adoption matrix

This matrix is the decision ledger. A URL is not an adoption decision. Re-check
versions and terms when a product slice starts.

| Source family | Evidence | Layer | Decision | Guardrail |
| --- | --- | --- | --- | --- |
| three.ws | `docs/research/threews.md`, upstream repo/docs | 3D body, viewer, creator, MCP concepts | reference/adapt | own UI/brand; no hosted-app dump |
| `@three-ws/avatar` | official package/docs | validated body viewer/creator boundary | adapt if version/licence fit | untrusted remote assets; fallback path |
| three/R3F/drei/glTF | `docs/research/expansion-scan-2026-09-22.md` | rendering | adopt after lockfile review | WebGL/mobile/perf budgets |
| MediaPipe | embodied-agent registry | face/gesture perception | defer until consent design | camera permission, on-device fallback |
| ClawPump SDK/agent/skills | ClawPump source registry | agent lifecycle, skills, unsigned actions | adapt/reference | own API, tenant scopes, no custodial signing |
| LangGraph | embodied/agent registry | durable state and approval interrupts | adapt | explicit checkpointer, tenant-bound state |
| MCP SDK/Solana MCP | Solana registries | tool protocol and docs | adopt/adapt | capability allowlist; official docs first |
| Solana Kit/Agent Kit | Solana registries | later Devnet actions | adopt later | preview/simulate/sign/idempotency/audit |
| Pump/GMGN/token references | ecosystem registry | market/launch research | reference/defer | no automatic mainnet launch; terms review |
| Browser Use Cloud | `docs/integrations/BROWSER-AND-SCRAPE-SETUP.md` | visual/source research | adopt as optional server tool | v4, stop sessions, quotas, secret isolation |
| Scrape.do | `docs/integrations/BROWSER-AND-SCRAPE-SETUP.md` | public-page research | adopt as optional server tool | allowlist, URL encoding, terms, credits |
| AnsemRail/Moltbook skills | `SOURCES.md` and handoff | registration/API patterns | reference | validate current docs; never copy keys |

## Required row fields for a product slice

Add URL, retrieval date, commit/version, license/terms, capability, exact files or
API endpoints inspected, security/tenant risk, performance/accessibility impact,
adoption decision, reviewer, and verification command. Rows without evidence remain
`pending` and block implementation of the affected capability.

# Pre-build readiness checklist — mandatory order

This is the execution order for every new builder. Complete the applicable checks
and save evidence before writing product code.

## Phase 0 — Lock the workspace

1. Record repository, branch, commit, working-tree status, runtime versions, package
   manager, scripts, and existing instructions.
2. Read `FULL-FOUNDATION-HANDOFF.md`, `FULL-AGENT-EXECUTION-CONTRACT.md`,
   `START-HERE.md`, `GUIDE.md`, `SOURCES.md`, `CAPABILITY-MAP.md`, `CONTEXT.md`,
   `NEXT-SESSION.md`, every relevant research file, and every selected `SKILL.md`.
3. Create a dated report directory. Do not edit application code in this phase.

## Phase 1 — Resolve and inspect every source

1. Walk the entire source index and classify each link: fetched, cloned, redirected,
   unavailable, superseded, or out of scope.
2. For a 404 or renamed repository, search the owning organization and official docs,
   record the replacement and continue. A stale `solana-labs/agent-kit-v2` link, for
   example, must be mapped to the verified SendAI Agent Kit source—not treated as a
   reason to abandon the preparation pass.
3. Clone only into isolated, pinned research directories. Inspect manifests,
   lockfiles, licenses, source, tests, CI, deployment, and security configuration.
4. Use Browser Use/Scrape.do or another approved browser tool to inspect all requested
   public pages, tabs, flows, and visual states. Save redacted evidence.
5. Produce a complete source-adoption matrix. No requested link may silently vanish.

## Phase 2 — Prepare the toolchain

Install and verify every safe, relevant, available tool for the phase: runtime and
package manager; 3D/rendering/avatar/voice; agent runtime and MCP SDK; Browser Use,
Scrape.do, Stagehand/Browserbase, Playwright MCP, sim-use, browser harness,
Agent-Reach, and Cua; official Solana MCP/tooling; tests, accessibility, browser,
observability, and deployment tooling.

For every installation record package/version, source, license, install command,
verification command, and rollback command. Ask before global installs or charges.
“Prepare all” means safe tooling/configuration is ready. It does not grant money,
wallet-signing, identity-minting, deletion, physical-device, or other irreversible
permissions.

## Phase 3 — Prepare the complete MCP surface

1. Fetch `https://three.ws/mcp-catalog.json` and compare the pinned snapshot.
2. Regenerate `templates/threews-mcp-policy.json`.
3. Create an installation/configuration record for all catalog servers, including
   servers not enabled in the first slice.
4. Install only approved, compatible packages; keep irreversible/payment servers
   disabled until an exact human-approved policy names tool, network, limits,
   confirmation, and kill switch.
5. Run read-only discovery/health checks wherever credentials allow; record
   `verified`, `missing credential`, `unavailable`, or `blocked by policy`.

## Phase 4 — Prepare credentials without exposing them

1. Inventory secret names from GitHub Actions/secret manager, never values.
2. Required browser names are `BROWSER_USE_API_KEY`, `SCRAPE_DO_TOKEN`, and
   `BROWSERBASE_API_KEY`; map each to its dashboard and phase.
3. GitHub Actions secrets are not available to a local shell by default. Test them
   through a protected workflow; never paste them into chat or print them.
4. Workflows may report provider, status/error class, quotas, and redacted session
   URLs only. Mask secrets and stop cloud sessions.
5. Rotate exposed keys first. A missing key is a setup task with a dashboard link,
   not a reason to abandon other preparation.

## Phase 5 — Activate five roles

Create and reconcile reports from: coordinator (scope/dependencies), researcher
(source/version/license/API), implementer (first slice/interfaces), reviewer
(UX/UI/3D/spec/browser), and security reviewer (tenancy/secrets/MCP/SSRF/wallet).
If subagents cannot run, perform the roles sequentially and still write all reports.

## Phase 6 — Readiness package and build gate

Before product code, save the complete source audit, skills used, installed-tool
manifest, MCP inventory/policy, credential-name/connectivity evidence, five reports,
architecture/tab/3D/agent/API/Solana/test/rollback plans, and a `NEXT-SESSION.md`
update with the exact next command.

Only then request approval for the first vertical slice. “Not ready” must name the
missing artifact, attempted resolution, safe fallback, and resume command.

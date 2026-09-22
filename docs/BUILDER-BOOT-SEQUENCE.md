# Ready-builder boot sequence

This is the operational checklist for any new builder. It turns the foundation
into a repeatable process; it does not authorize production, wallet custody, or
copying another project.

## Before touching a project

1. Read `FULL-FOUNDATION-HANDOFF.md`, `START-HERE.md`, `GUIDE.md`, `SOURCES.md`,
   `CONTEXT.md`, `CAPABILITY-MAP.md`, this file, and the relevant research files.
2. Inspect the target repository without editing it: branch, status, package
   manager, scripts, routes, tests, deployment files, and existing instructions.
3. Build a source/skill matrix for the requested slice. Mark every item reviewed,
   pending, adopted, adapted, referenced, or deferred. Include URL, commit/version,
   license/terms, security risk, performance/accessibility impact, and evidence path.
4. Read each selected local `SKILL.md` completely. Record the exact path and why it
   applies. Do not claim a skill was used because it appeared in a list.
5. Fetch current primary documentation for changing APIs. Use Browser Use/Scrape.do
   only under their integration contract and write a redacted research report.

## Role activation

Create a task roster in the readiness report:

| Role | Independent question | Required output |
| --- | --- | --- |
| Coordinator | What is the slice, dependency graph, and stop condition? | spec/plan |
| Researcher | What do primary sources and current versions prove? | source report |
| Implementer | What smallest change satisfies the approved slice? | code + focused tests |
| Reviewer | Does it match the spec and interaction design? | review report |
| Security reviewer | Are tenancy, secrets, SSRF, wallet, and capability boundaries safe? | security report |

Activate only roles with independent work. Give each one file ownership, an output
path, and a deadline/checkpoint. Reconcile reports before implementation. If no
subagent facility exists, perform the same roles sequentially and save the reports.

## Memory and handoff

The durable record is the repository, not the agent's context window. Before a
session ends, update:

- the source/skill matrix;
- the spec and dependency-ordered plan;
- decisions/ADRs and security assumptions;
- test/browser/quality evidence;
- `NEXT-SESSION.md` with the exact next phase and first command.

A later builder must be able to reproduce the readiness decision from these files.

## No-build gate

Do not install a dependency, clone into the product, edit UI, create routes, or
connect a wallet until the readiness report has all six required response sections
from `templates/NEW-AGENT-BOOTSTRAP-PROMPT.md` and the human has approved the first
slice. Research clones stay isolated and pinned.

## Build and verification gate

Implement one vertical slice. Its acceptance checks must include the requested
behavior, tenant isolation, error/loading/empty states, keyboard/reduced-motion and
WebGL fallback where relevant, focused tests, browser verification, and a reviewer
report. Record exact commands and exit statuses. Never use a screenshot alone as
proof.

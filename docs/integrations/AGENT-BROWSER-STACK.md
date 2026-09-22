# Agent browser stack: research, inspect, and verify

This foundation supports a layered browser stack for source research and later
product QA. It does not commit vendor credentials or silently grant an agent access
to every website.

## Sources to read before installation

- Browser Use Cloud: https://docs.browser-use.com/cloud/llms.txt
- Browser Use full reference: https://docs.browser-use.com/cloud/llms-full.txt
- Browser Use vibecoding: https://docs.browser-use.com/cloud/vibecoding
- Scrape.do: https://scrape.do/documentation/
- sim-use: https://github.com/lycorp-jp/sim-use
- Browser Use harness: https://github.com/browser-use/browser-harness
- Stagehand: https://docs.stagehand.dev/v4/first-steps/introduction
- Stagehand source: https://github.com/browserbase/stagehand
- Playwright MCP: https://www.npmjs.com/package/@playwright/mcp
- Agent-Reach: https://github.com/Panniantong/Agent-Reach
- Cua: https://github.com/trycua/cua
- Cua settings/workflow: https://run.cua.ai/settings

Before installing, inspect each repository's README, manifests, lockfiles, license,
tests, CI, deployment files, and relevant source at a pinned commit. Record the
adopt/adapt/reference/defer decision in the source-adoption matrix. Never bulk-copy
these projects into a product.

## Environment contract (names only)

Put values in a server secret manager or GitHub Actions secrets. Never commit them.

```text
BROWSER_USE_API_KEY
SCRAPE_DO_TOKEN
STAGEHAND_API_KEY
STAGEHAND_PROJECT_ID
AGENT_REACH_API_KEY
CUA_CLIENT_ID
CUA_CLIENT_SECRET
```

Prefer short-lived/OIDC Cua authentication over a long-lived client secret. The
GitHub job must request `id-token: write`, use the documented Cua CLI version, mask
outputs, and delete the sandbox in an `EXIT` trap. Never put the Cua client secret in
repository files, prompts, browser state, or a frontend bundle.

## Research gate

For each requested reference website:

1. Define allowed hosts, purpose, legal/terms boundary, and the exact pages/tabs to
   inspect. Do not crawl private/authenticated areas without explicit authorization.
2. Use Browser Use Cloud v4 or the selected tool after reading its current docs.
   Use Scrape.do only server-side, with URL encoding, host allowlists, timeouts,
   response limits, and credit/concurrency budgets.
3. Inspect navigation, responsive states, 3D/body pipeline, creation flow, agent
   registration, MCP/tool catalog, auth barriers, empty/loading/error states, and
   accessibility behavior. Capture only necessary screenshots/HTML hashes.
4. Save a redacted evidence report with URLs, retrieval time, tool/version, source
   commits, findings vs inference, licenses/terms, and adoption decisions.
5. Stop Browser Use sessions with the documented API stop action. Closing CDP is not
   enough. Do not retry paid or irreversible actions without idempotency checks.

## Key incident rule

Any credential shown in chat, terminal output, an issue, or a commit is compromised.
Revoke/rotate it in the vendor dashboard immediately, search history, and record only
the incident and rotation date. The repository may contain placeholders and setup
commands, never the value.

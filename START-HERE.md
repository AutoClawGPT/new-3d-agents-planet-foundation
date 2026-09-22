# Start here: phase gate

Use this gate before every research, design, code, integration, or deployment phase. A phase is not started until its gate is recorded.

1. **Name the phase and outcome.** State the smallest vertical slice, acceptance checks, non-goals, and unresolved questions.
2. **Select the route.** Read the full `SKILL.md` for every skill needed for this phase; use `skill-workflow.md` to choose the route. Add only narrowly justified external skills.
3. **Read the sources.** Consult the relevant primary docs and record versions, license, capability, and integration risk. Use `threews.md` for the 3D/agent inventory and `solana-agent.md` for Solana, auth, wallets, token actions, and safety boundaries.
4. **Set the security boundary.** Authenticate every request to a tenant/user. Use a unique, scoped, hashed, expiring, revocable per-user API-key barrier with rate, endpoint, environment, and spend limits. Keep provider keys and signing material server-side; never place them in prompts, browser code, logs, or repository files.
5. **For Solana work, route through the official MCP.** Call `list_sections` first for non-trivial questions, then fetch canonical docs or use search/expert help. For Anchor/Pinocchio Rust, run `program_autofixer`, apply fixes, and repeat until no further pass is required.
6. **For any token or wallet action, use the approval gate.** Build a canonical proposal, validate policy, simulate, show the exact cluster/programs/accounts/amounts/fees/metadata and message digest, then require explicit user confirmation and wallet signature. Freeze and verify the signed bytes before one idempotent submission; audit every result. Devnet/local validator is the default.
7. **Verify before handoff.** Run focused tests, security/tenant-isolation checks, accessibility and browser checks where relevant, and a fresh build/type/lint check. Record command, exit status, and failures. Do not claim completion without evidence.

8. **Persist memory before stopping.** Write the research report, source-adoption matrix, decision record, plan, test evidence, and `NEXT-SESSION.md`. A later agent must resume from files, not chat or model memory.

9. **Activate roles deliberately.** Name the coordinator, researcher, implementer, reviewer, and security reviewer. Start only roles needed for this slice, give each an independent output path, and reconcile reports. A template listing is not evidence that work happened.

10. **Use browser/scrape research safely.** For Browser Use or Scrape.do, follow `docs/integrations/BROWSER-AND-SCRAPE-SETUP.md`, fetch current vendor docs first, use server-only environment variables, and write a redacted evidence report.

11. **Inventory MCP before wiring it.** Fetch `https://three.ws/mcp-catalog.json`, read the exact server/tool schemas and safety labels, compare the pinned snapshot, and regenerate `templates/threews-mcp-policy.json`. Default to strict: free reads allowed, writes ask, irreversible tools denied.

12. **Use the browser stack deliberately.** Read `docs/integrations/AGENT-BROWSER-STACK.md`; inspect the full requested sites and repository sources, record evidence, and keep every credential server-only. Never add a live key to this repository.

13. **Meet the full execution contract.** Read `FULL-AGENT-EXECUTION-CONTRACT.md` and complete its evidence sections. A builder may not stop after a basic recap or claim readiness from the repository structure alone.

If requirements or documentation conflict, pause and surface the conflict. Do not substitute a bulk clone, an unreviewed dependency, or a model-memory assumption for this gate.

## Reference reports

- [three.ws architecture inventory](./threews.md)
- [Solana and agent security/implementation research](./solana-agent.md)
- [phase-by-phase skill workflow](./skill-workflow.md)

# three.ws MCP catalog and tool policy

The complete machine-readable catalog is the source of truth:

- Live catalog: https://three.ws/mcp-catalog.json
- Human catalog: https://three.ws/mcp-tools?price=free
- Safety documentation: https://three.ws/docs/mcp-safety
- Pinned snapshot: `docs/research/snapshots/threews-mcp-catalog-2026-09-22.json`
- Generated strict policy: `templates/threews-mcp-policy.json`

The snapshot currently records every published server and tool in the response,
including tool schemas, server endpoint/transport/auth, price, safety label, source
file, and annotations. It is a research snapshot, not a claim that every tool is
safe or that every server belongs in our product.

## Mandatory use before a build

1. Fetch the live catalog and compare its `counts` and SHA-256 with the pinned
   snapshot. If it changed, refresh the snapshot and regenerate policy before using
   a new tool.
2. Read the tool's full description, schema, source link, server auth, price, and
   safety annotations. Read the vendor safety docs too.
3. Add an adoption row for each tool used by the slice: adopt/adapt/reference/defer,
   tenant boundary, secret requirements, retry/idempotency behavior, and a test.
4. Use the strict policy as the default: free read-only tools may run; writes ask;
   irreversible tools are denied. The project may narrow this further, never widen it
   implicitly.
5. A human must explicitly approve an exact irreversible tool, argument schema,
   network/cluster, spending cap, and rollback/kill switch. A catalog label is not
   authorization.

## Server families represented

The snapshot includes the 42 currently published server IDs, including avatar,
audio, Blender, brain, scene, 3D Studio, agent wallet, pump.fun, marketplace,
provenance, portfolio, Solana memo media, vision, x402, and the three.ws core
server. The exact endpoint, transport, authentication, and tool count are read from
the snapshot rather than hand-copied into stale prose.

## Refresh and review

```bash
curl --fail --location https://three.ws/mcp-catalog.json \
  -o docs/research/snapshots/threews-mcp-catalog-YYYY-MM-DD.json
node scripts/generate-threews-mcp-policy.mjs \
  docs/research/snapshots/threews-mcp-catalog-YYYY-MM-DD.json \
  templates/threews-mcp-policy.json
```

Never auto-install all servers into a product. Install only the exact server
packages needed after license/version/source review; keep external servers isolated;
and keep provider keys, wallet secrets, and session credentials in the server secret
manager. This is how we get full catalog coverage without blindly granting money,
identity, physical, or destructive capabilities.

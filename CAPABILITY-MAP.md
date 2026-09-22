# Capability Map: New 3D Agents Planet

Approved 2026-09-22. This map is the module index. Module specs come after it, one module at a time, in build order. Application code is out of scope until a module spec and its task plan are approved.

Product application code stays out of this foundation repository until a product repository is named. This file is the approved boundary, not a scaffold.

## Modules

| Module id | Responsibility | Depends on |
|---|---|---|
| `identity` | Tenant, session, and a scoped revocable API barrier | — |
| `planet-shell` | Original 3D stage plus a non-3D fallback | — |
| `agent-runtime` | Agent record, skill manifest, durable state, approval interrupt | `identity` |
| `avatar` | Validated GLB load | `planet-shell` |
| `solana-actions` | Devnet prepare, simulate, and preview only | `identity`, `agent-runtime` |

Build order: `identity` and `planet-shell` → `agent-runtime` → `avatar` → `solana-actions`

`identity` and `planet-shell` have no dependency on each other and may be specified in parallel. Neither may start implementation until its own spec is approved.

## Approval boundary

In scope for the next documents: module specs, a glossary in `CONTEXT.md`, and the expansion-lane notes under `docs/research/`.

Out of scope until a later approval: packages, upstream clones inside a product tree, UI implementation, wallet custody, mainnet, and token launch or transfer submission.

## Standing constraints

- Each request binds to an authenticated tenant and user. The API barrier is unique per user, scoped, hashed, expiring, revocable, and rate-limited.
- Provider secrets and signing material stay server-side.
- A Solana action stops at an immutable preview on local validator or Devnet. Submission needs a separate approval.
- The 3D stage has a non-3D path for the same task. Remote body files are untrusted input.

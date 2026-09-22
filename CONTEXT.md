# New 3D Agents Planet

The vocabulary for an original platform where a tenant's users run agents that can wear a 3D body and prepare Solana actions for a human signature.

## Language

**Tenant**:
The ownership boundary for users, agents, barrier keys, and audit records.
_Avoid_: Account, org, workspace

**User**:
A person authenticated inside one tenant.
_Avoid_: Client, owner

**Agent**:
A tenant-owned actor with an identity, a skill set, and at most one body.
_Avoid_: Bot, character, assistant

**Body**:
The visual form of an agent, loaded from a validated GLB.
_Avoid_: Avatar, skin, model

**Planet shell**:
The stage a body appears in, including the non-3D fallback for the same task.
_Avoid_: World, scene, metaverse

**Skill**:
A versioned behavior package that declares its capabilities and side effects.
_Avoid_: Plugin, tool, prompt

**Barrier key**:
A unique, scoped, revocable credential for one user or service.
_Avoid_: Master key, API secret, shared key

**Action preview**:
The frozen Devnet or local-validator transaction a user must read before any signature.
_Avoid_: Auto-send, launch, swap

**Wallet**:
The user's own Solana signer. The platform does not hold its key.
_Avoid_: Custodial wallet, agent wallet

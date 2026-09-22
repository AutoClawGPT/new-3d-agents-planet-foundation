# Expansion scan — 2026-09-22

Gate run for this agent before any product code. three.ws stays the embodied-3D benchmark. Nothing here was installed. No repository was cloned. Registry versions are from the public npm registry on this date. Existing foundation notes in this folder stay the long-form source maps.

## Lane results

| Lane | Candidate | Version / source | Decision |
|---|---|---|---|
| Embodied 3D benchmark | three.ws | https://github.com/nirholas/three.ws Apache-2.0, see `threews.md` | reference. Selective contracts only. Do not copy the hosted app. |
| Rendering | three | 0.186.0, https://www.npmjs.com/package/three | adopt when a 3D slice is approved. Pin that version in the product lockfile. |
| Rendering | @react-three/fiber | 9.7.0, https://www.npmjs.com/package/@react-three/fiber | adopt with three, after the React peer range is checked. |
| Rendering | @react-three/drei | 10.7.8, https://www.npmjs.com/package/@react-three/drei | adopt for loaders and controls. Not a design system. |
| Rendering | WebGPU | https://threejs.org/docs/ | defer. WebGL 2 is the first path. |
| Avatar / voice | glTF 2.0 / GLB | https://www.khronos.org/gltf/ | adopt for the first body. Remote files stay untrusted. |
| Avatar / voice | VRM | https://vrm.dev/en/ | defer until a GLB load is proven. |
| Avatar / voice | MediaPipe Face Landmarker | https://ai.google.dev/edge/mediapipe/solutions/vision/face_landmarker | defer. Camera use needs a separate privacy gate. |
| Agent runtime | @langchain/langgraph | 1.4.17, https://www.npmjs.com/package/@langchain/langgraph | adapt. Use the interrupt plus checkpointer idea. Do not install both Python and JS. JS waits on the product stack. |
| Agent runtime | MCP SDK | 1.30.0, https://www.npmjs.com/package/@modelcontextprotocol/sdk | reference. Our server, our scopes. |
| UI / design | three.ws and ClawPump surfaces | foundation registries | reference for layout only. Original visual system. |
| UI / design | WCAG 2.2 AA | https://www.w3.org/TR/WCAG22/ | adopt as the accessibility floor when UI starts. |
| Solana | Solana Developer MCP | https://mcp.solana.com/mcp no API key | adopt. Configured for this agent. Docs only. No wallet authority. |
| Solana | @solana/kit | 8.3.0, https://www.npmjs.com/package/@solana/kit | adopt for a later Devnet slice. Not installed now. |
| Solana | wallet-adapter packages | solana-dev skill 2.4.0 | defer. New work uses the Kit wallet plugin. |
| Solana | Pump launch / swaps | `solana-agent.md`, `clawpump-source-registry.md` | defer. Preview and simulation only, after a separate approval. |
| Operations | three.ws Cloud Run layout | `threews.md` | reference. Do not copy the GCP project. |

## Still open

No product repository is named. No `CONSTRAINTS.md` numbers are chosen. The quality floor that applies with no extra tools is: no secrets, no skipped tests, no unimplemented stubs, no silenced type or lint errors. Numbered coverage, Lighthouse, and axe gates wait for the product repo.

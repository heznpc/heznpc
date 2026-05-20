# heznpc

**Curator of open-source infrastructure, research, and tools for the AI era.**

The site at [heznpc.github.io](https://heznpc.github.io) is the rendered hub.
This README is the same map in text.

## Currently implemented

**Brand 5** — the five flagship axes:

| Axis | Repo | What it is |
|---|---|---|
| Product | [AirMCP](https://github.com/heznpc/AirMCP) | One MCP server for the Apple ecosystem. Core infra (HITL, audit, rate-limit, HMAC) is the differentiated layer. |
| Research | [PLOIDY](https://github.com/heznpc/PLOIDY) | Cross-session debate protocol — same model, different context depths. |
| Trust | [canary](https://github.com/heznpc/canary) | Project health dashboard across the portfolio. |
| Traction | [skillBridge](https://github.com/heznpc/skillbridge) | Translates Anthropic Academy into 26+ languages. |
| Signal | [anvil](https://github.com/heznpc/anvil) | MCP tool that bundles commit → PR → CI → merge into one atomic call. |

**5 Research Programs** — each with an anchor and companions:

| # | Program | Anchor |
|---|---|---|
| P1 | Human-Controlled AI Systems | AirMCP infra → [statute-of-limitations](https://github.com/heznpc/statute-of-limitations) |
| P2 | Reflexive AI Research | [meta](https://github.com/heznpc/meta) → narcissus, eddy |
| P3 | NL-Code Communicability | [z-gap](https://github.com/heznpc/z-gap) |
| P4 | AI-Driven Digital Hoarding | [tidal](https://github.com/heznpc/tidal) → silo, caching, elixir, sediment |
| P5 | AI Slop / Production-Detection Asymmetry | [ai-slop-paper](https://github.com/heznpc/ai-slop-paper) → emergence-paradox, aichemist |

Adjacent research (off-core but coherent): [analogic-appropriation](https://github.com/heznpc/analogic-appropriation), [pythia](https://github.com/heznpc/pythia).

**Supporting** — tools that serve the brand axes:
[ProfileKit](https://github.com/heznpc/ProfileKit) (this README is powered by it),
[profilekit-mcp](https://github.com/heznpc/profilekit-mcp),
[cairn](https://github.com/heznpc/cairn),
[newtria-crossflow](https://github.com/heznpc/newtria-crossflow),
[pc-health-check](https://github.com/heznpc/pc-health-check).

**Lab** — experiments and MVPs (explicitly not production):
villagent, dol-pin, PlantMonster, mothball, gemma4-quiz, hello-project, code-sense, FollowPrint, cuk-sw-community.

**Archive** — frozen / abandoned:
TrashMonster, ipod-gallery.

**11 starter templates** — clone → push → deployed. See the site for the full list.

## Planned

- skillBridge re-publication after icon redesign.
- newtria-crossflow expansion from v0.1 (one verified tool) toward full Shortcuts ↔ Power Automate parity.
- Program anchors landing in venues: alt.CHI 2027 (meta); EMNLP 2026 ARR May submission (z-gap); Inquiry SI (emergence-paradox).
- Hub site continues to drop projects out of Lab into either Supporting or Archive as evidence accumulates.

## Design intent

- The Hub is a **curator’s map**, not a manifesto. The five Brand axes name the layers that make the rest of the work legible — they are not "the five best products."
- **A program needs an anchor + companions to count.** A single paper is not a program. Companions that don’t feed an anchor are tagged as adjacent research, not as a program of their own.
- **Three buckets below the brand line** — Supporting, Lab, Archive — so that experiments can be shipped honestly without inflating them into products.
- The site is deliberately editorial (text-led, ProfileKit cards, no rankings). Visual density follows the same composability rule as ProfileKit: no ratings, no leaderboards.

## Non-goals

- "Building every layer" maximalism. The Hub deliberately drops products that aren’t load-bearing for one of the five axes.
- Rankings, ratings, leaderboards. The data model has no place for them.
- Publishing soft metrics — install counts, star counts, "engagement."
- Cross-promoting external orgs without their sign-off.

## Redacted

- External persons, accounts, and inquiry threads.
- Soft metrics (intentionally not published).
- Tokens, API keys, and internal cases.

---

## Running the site

```sh
npm install
npm run dev       # local preview at http://localhost:4321
npm run build     # generates projects.json + static build at apps/web/dist
```

`apps/web/portfolio.config.mjs` is the single source of truth.
`scripts/generate.mjs` fetches repo descriptions from the GitHub API and
writes `projects.json`. CI fails loudly if the fetch fails so the deployed
site never ships stale config-only descriptions.

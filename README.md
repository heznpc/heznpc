# heznpc

**Curator of open-source infrastructure, research, and tools for the AI era.**

The site at [heznpc.github.io](https://heznpc.github.io) is the rendered hub.
This README is the same map in text.

## Currently implemented

**Brand 5** — the five flagship axes:

| Axis | Repo | What it is |
|---|---|---|
| Product | [AirMCP](https://github.com/heznpc/AirMCP) | One MCP server for the Apple ecosystem (272 tools, 29 modules). Core infra — per-call HITL, HMAC-chained audit, OAuth 2.1 + Resource Indicators, `allowNetwork` policy — is the differentiated layer. |
| Research | [ploidy](https://github.com/heznpc/ploidy-research) | Cross-session debate protocol — same model, different context depths. PyPI `ploidy` 0.3.3. Paper + tool monorepo. |
| Trust | [canary](https://github.com/heznpc/canary) | Operator-machine observability — git state joined with Claude Code session transcripts. APL / MIP / PLR / UCP push-leakage metrics. |
| Traction | [skillBridge](https://github.com/heznpc/skillBridge) | Translates Anthropic Academy lessons across 33 locales with an inline Claude tutor (Puter.js). MV3 v3.5.39. |
| Signal | [anvil](https://github.com/heznpc/anvil) | MCP tool that bundles commit → PR → CI-wait → merge into one atomic call. Published as `@heznpc/anvil` on npm. |

**5 Research Programs** — each with an anchor and companions:

| # | Program | Anchor | Companions / bridges |
|---|---|---|---|
| P1 | Human-Controlled AI Systems | tools side: AirMCP / canary / anvil | [statute-of-limitations](https://github.com/heznpc/statute-of-limitations) (bridge 1↔4), [oncology](https://github.com/heznpc/oncology), [ochre](https://github.com/heznpc/ochre), [villagent](https://github.com/heznpc/villagent) |
| P2 | Epistemic Failure and Correction | [ploidy](https://github.com/heznpc/ploidy-research) + [meta](https://github.com/heznpc/meta) (reflexive) | [narcissus](https://github.com/heznpc/narcissus), [coup](https://github.com/heznpc/coup), [eddy](https://github.com/heznpc/eddy) (DOI), [lifespan](https://github.com/heznpc/lifespan) (bridge 2→4) |
| P3 | Representation, Language, and Cultural Cognition | [z-gap](https://github.com/heznpc/z-gap) | [third-vertex-llm](https://github.com/heznpc/third-vertex-llm), [macaronic](https://github.com/heznpc/macaronic), [habitus](https://github.com/heznpc/habitus) |
| P4 | AI-Mediated Accumulation | [tidal](https://github.com/heznpc/tidal) | [silo](https://github.com/heznpc/silo), [scatter-caching](https://github.com/heznpc/scatter-caching), [elixir](https://github.com/heznpc/elixir), [sediment](https://github.com/heznpc/sediment) |
| P5 | Synthetic Content and Measurement | [ai-slop](https://github.com/heznpc/ai-slop) | [emergence-paradox](https://github.com/heznpc/emergence-paradox), [aichemist](https://github.com/heznpc/aichemist), [babel](https://github.com/heznpc/babel), [ai-bubble](https://github.com/heznpc/ai-bubble) |

Adjacent research (off-core, theory layer): [analogic-appropriation](https://github.com/heznpc/analogic-appropriation) (under review, *New Media & Society*), [pythia](https://github.com/heznpc/pythia), [whetstone](https://github.com/heznpc/whetstone).

**Supporting** — tools that serve the brand axes:
[ProfileKit](https://github.com/heznpc/ProfileKit) (this README is powered by it),
[profilekit-mcp](https://github.com/heznpc/profilekit-mcp),
[cairn](https://github.com/heznpc/cairn),
[newtria-crossflow](https://github.com/heznpc/newtria-crossflow),
[pc-health-check](https://github.com/heznpc/pc-health-check),
[ai-course-glossary](https://github.com/heznpc/ai-course-glossary) (skillBridge companion: Claude Code Skill plugin re-exposing the curated Academy terminology),
[inertbox](https://github.com/heznpc/inertbox) (untrusted-content boundary primitive).

Pending push: `reclaim` (macOS context-aware cleaner; Phase 3 = MCP-server hygiene), `yt-shield` (Korean diet-scam comment filter).

**Lab** — experiments and MVPs (explicitly not production):
[dol-pin](https://github.com/heznpc/dol-pin),
[cuk-sw-community](https://github.com/heznpc/cuk-sw-community),
[kontest](https://github.com/heznpc/kontest),
[mothball](https://github.com/heznpc/mothball),
[gemma4-quiz](https://github.com/heznpc/gemma4-quiz),
[hello-project](https://github.com/heznpc/hello-project),
[token_save](https://github.com/heznpc/token_save).

**External** — contributor surface (not owner):
[tr-archive](https://github.com/Tales-Runner/TR-archive),
[TR-STORY](https://github.com/Tales-Runner/TR-STORY).

**Archive** — frozen / abandoned at other orgs:
[trashmonster](https://github.com/newtria/trashmonster).

**11 starter templates** — clone → push → deployed. See the site for the full list.

## Planned

- skillBridge: CWS US-locale re-publication after icon redesign (non-US channels continue serving in the interim).
- ai-course-glossary: submission to `anthropics/claude-plugins-community` via `clau.de/plugin-directory-submission`.
- newtria-crossflow: post-WWDC26 v0.1 ship with the one verified tool, then expand toward full Shortcuts ↔ Power Automate parity.
- Program anchors landing in venues: alt.CHI 2027 (meta), TACL rolling (z-gap, superseding the earlier EMNLP plan), CHI / FAccT / CSCW 2027 (tidal), CACM + *Big Data & Society* (ai-slop).
- emergence-paradox: Inquiry SI window (2026-06-01) closed; reorienting toward CHI 2027.
- Hub site continues to drop projects out of Lab into Supporting or Archive as evidence accumulates.

## Design intent

- The Hub is a **curator's map**, not a manifesto. The five Brand axes name the layers that make the rest of the work legible — they are not "the five best products."
- **A program needs an anchor + companions to count.** A single paper is not a program. Companions that don't feed an anchor are tagged as adjacent research, not as a program of their own.
- **Three buckets below the brand line** — Supporting, Lab, Archive — so that experiments can be shipped honestly without inflating them into products.
- The site is deliberately editorial (text-led, ProfileKit cards, no rankings). Visual density follows the same composability rule as ProfileKit: no ratings, no leaderboards.

## Non-goals

- "Building every layer" maximalism. The Hub deliberately drops products that aren't load-bearing for one of the five axes.
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

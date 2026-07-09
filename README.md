# heznpc

**Systems across AI, trust, local tools, and cultural data.**

This repository is the portfolio front door for Heznpc. It is not a full repo
catalog and it is not a ranking page. The site groups work by the problem area
it proves, then shows only a few representative artifacts with their limits.

## Portfolio model

| Layer | What appears here | Current examples |
|---|---|---|
| Hero | One front-layer proof item | `skillBridge` |
| Case studies | Two compact engineering proofs | `ProfileKit`, `pc-health-check` |
| Area proof | Useful supporting evidence for a larger domain | `TR-STORY`, `tr-archive` |
| Lab | Experiments, beta work, or local-only tools | `academy-lens`, `aispool`, `mothball`, `dol-pin` |
| Archive | Preserved work that should not imply current product readiness | `hello-project`, `cuk-sw-community` |
| Frontier | Direction without a representative repo yet | physical computing / IoT |

Every visible item should answer:

- **Evidence** — what is locally or publicly verifiable?
- **Constraint** — what must not be over-claimed?
- **Status** — shipped, active, beta, lab, archive, repair, or hold.

## Focus areas

| Area | Portfolio role |
|---|---|
| AI learning localization | Browser-based learning tools with translation, glossary, and tutor boundaries. |
| Trust and local diagnostics | Local checks that explain risk without turning the user machine into telemetry. |
| Developer presence and publishing | Composable ways to present project evidence without rankings or soft metrics. |
| Local-first workflow tools | Private work queues, reversible cleanup, and personal automation experiments. |
| Cultural data and archive UX | Static and mobile-first viewers for niche datasets with explicit provenance limits. |
| Marketplace experiments | Trust-heavy product ideas kept below service-ready framing until safety flows are verified. |
| Physical computing frontier | Future work around devices, sensing, edge logic, and local trust. |

## Display rules

- Do not show all repos at the same visual weight.
- Do not present Lab or hold work as production.
- Do not use soft metrics as proof.
- Do not imply external status that was not verified in the current project files.
- Keep `heznpc` itself as the navigation shell, not as a portfolio project.

## Running the site

```sh
npm install
npm run dev       # local preview at http://localhost:4321
npm run check     # audit + Astro type check + pack surface check + static build
npm run build     # regenerates apps/web/projects.json and builds apps/web/dist
```

`apps/web/portfolio.config.mjs` is the source of truth. The build runs
`apps/web/scripts/generate.mjs`, which refreshes `projects.json` from the
config, verifies public GitHub-backed links where possible, and then builds the
static site.

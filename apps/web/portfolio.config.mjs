/**
 * Portfolio registry — single source of truth.
 *
 * - `description` 생략 시 GitHub repo description을 자동으로 가져옴
 * - `tags` 생략 시 GitHub topics를 자동으로 가져옴
 * - 프로젝트 추가/제거 = 이 파일에서 항목 추가/삭제 → `npm run generate`
 *
 * Categories (Hub 5-band structure):
 *   - brand5      : the five flagship axes (product / research / trust / traction / signal)
 *   - program-1..6: research programs (1 anchor + N companions per program)
 *   - supporting  : tools and apps that serve the brand axes
 *   - lab         : experiments and MVPs — explicitly not production
 *   - archive     : frozen / abandoned — preserved for the record
 */

export default {
  owner: 'heznpc',

  meta: {
    name: 'heznpc',
    tagline: 'Building the ecosystem AI lives in',
    bio: 'Curator of open-source infrastructure, research, and tools for the AI era.',
    thesis:
      'Five brand axes anchor the work: infrastructure (AirMCP), research (ploidy), ' +
      'trust (canary), traction (skillBridge), and signal (anvil). Around them sit five ' +
      'research programs, a stack of supporting tools, a lab of experiments, and an ' +
      'archive of what has already been learned.',
    github: 'https://github.com/heznpc',
    contact: 'https://github.com/heznpc',
  },

  // ────────────────────────────────────────
  //  Brand 5 — the five flagship axes
  // ────────────────────────────────────────
  //  Order matters: rendered in this order on the hub.
  //
  //  axis: 'product' | 'research' | 'trust' | 'traction' | 'signal'

  projects: [
    { repo: 'AirMCP', category: 'brand5', tier: 1, axis: 'product',
      icon: 'https://heznpc.github.io/AirMCP/airmcp-icon-128.png',
      tags: ['MCP', 'macOS', 'HITL'],
      description: 'One MCP server for the Apple ecosystem (272 tools, 29 modules). Core infra — per-call HITL, HMAC-chained audit, OAuth 2.1 + Resource Indicators, allowNetwork policy — is the differentiated layer.' },

    { repo: 'ploidy-research', category: 'brand5', tier: 1, axis: 'research', emoji: '🧬',
      tags: ['Protocol', 'MCP', 'Research artifact'],
      description: 'Cross-session debate protocol — same model, different context depths. PyPI ploidy 0.3.3. Paper + tool monorepo.' },

    { repo: 'canary', category: 'brand5', tier: 1, axis: 'trust', emoji: '🐤',
      tags: ['Observability', 'Dashboard', 'Audit'],
      description: 'Operator-machine observability — git state joined with Claude Code session transcripts. APL / MIP / PLR / UCP push-leakage metrics.' },

    { repo: 'anvil', category: 'brand5', tier: 1, axis: 'signal', emoji: '🔨',
      tags: ['MCP', 'Workflow'],
      description: 'MCP tool that bundles commit → PR → CI-wait → merge into one atomic call. Published as @heznpc/anvil on npm.' },

    { repo: 'skillBridge', category: 'brand5', tier: 1, axis: 'traction', emoji: '🌐',
      tags: ['Chrome', 'Education', 'i18n'],
      description: 'Translates Anthropic Academy lessons across 33 locales with an inline Claude tutor (Puter.js). MV3 v3.5.39. CWS US-locale pending re-publication after icon redesign.' },

    // ────────────────────────────────────────
    //  Programs — 5 research programs (+ adjacent)
    // ────────────────────────────────────────
    //  program: 1 | 2 | 3 | 4 | 5 | 6
    //  role:    'anchor' | undefined
    //
    //  P1 — Human-Controlled AI Systems              (tools side anchor; statute-of-limitations bridges 1↔4)
    //  P2 — Epistemic Failure and Correction         (anchor: ploidy + meta reflexive)
    //  P3 — Representation, Language, Cultural Cognition (anchor: z-gap)
    //  P4 — AI-Mediated Accumulation                 (anchor: tidal; lifespan bridges 2→4)
    //  P5 — Synthetic Content and Measurement        (anchor: ai-slop)
    //  P6 — Analogy / theory layer (off-core but coherent)

    // ── P1 ────────────────────────────────────
    { repo: 'statute-of-limitations', category: 'program-1', tier: 2, program: 1, emoji: '⏳',
      tags: ['Memory', 'AI Ethics', 'Forgetting'],
      description: 'Designing institutional forgetting for AI agent memory — authority expiry vs deletion. Bridge between Programs 1 and 4. Foundational to AirMCP memory governance.' },

    { repo: 'oncology', category: 'program-1', tier: 2, program: 1, emoji: '🧬',
      tags: ['Agent Failure', 'Taxonomy'],
      description: 'Agent failure taxonomy — errors detected but action continues. Crosses Programs 1 and 2.' },

    { repo: 'ochre', category: 'program-1', tier: 3, program: 1, emoji: '🎨',
      tags: ['Interface', 'Predictions'],
      description: 'Desktop-metaphor analogue for AI-assisted authoring interfaces. Layer-1 simulations + 5 testable predictions.' },

    { repo: 'villagent', category: 'program-1', tier: 3, program: 1, emoji: '🏠',
      tags: ['Agents', 'Continuity'],
      description: 'Agent entity continuity — configuration-loss-as-death framing. Companion to ploidy at the entity level. Concept note.' },

    // ── P2 ────────────────────────────────────
    { repo: 'meta', category: 'program-2', tier: 1, program: 2, role: 'anchor', id: 'meta-paper', emoji: '🔄',
      tags: ['Reflexive', 'Methodology'],
      description: 'LLM-as-research-infrastructure — using Claude Code to study Claude Code. alt.CHI 2027 target.' },

    { repo: 'narcissus', category: 'program-2', tier: 2, program: 2, emoji: '🌸',
      tags: ['Confirmation Bias', 'HCI'],
      description: 'Narcissus loop — collaborative entrenchment as an emergent property of the human + AI interaction loop.' },

    { repo: 'coup', category: 'program-2', tier: 3, program: 2, emoji: '♟️',
      tags: ['Multi-Agent', 'Calibration'],
      description: 'Hierarchy calibration in multi-agent debate — C(P) and τ metrics. Concept note.' },

    { repo: 'eddy', category: 'program-2', tier: 2, program: 2, emoji: '🌀',
      tags: ['HCI', 'ADHD', 'DOI'],
      description: 'ADHD × AI — neurodivergent workflows as competitive advantage in multi-session work. Published with Zenodo DOI.' },

    { repo: 'lifespan', category: 'program-2', tier: 2, program: 2, emoji: '⏳',
      tags: ['Theory', 'Renewal'],
      description: 'Accumulation–renewal dilemma — substrate-independent theory linking confirmation bias, paradigm lock-in, and LLM context entrenchment. Bridges Programs 2 and 4.' },

    // ── P3 ────────────────────────────────────
    { repo: 'z-gap', category: 'program-3', tier: 1, program: 3, role: 'anchor', emoji: '📐',
      tags: ['NLP', 'Representations'],
      description: 'Convergence ≠ Communicability — stratified Platonic Representations at the NL-Code interface. TACL rolling.' },

    { repo: 'third-vertex-llm', category: 'program-3', tier: 3, program: 3, emoji: '📐',
      tags: ['Cultural Cognition', 'Korean'],
      description: 'Korean as third vertex — breaks the language/head-directionality/cultural-cluster confound in Japanese- and Chinese-only LLM cultural-cognition studies.' },

    { repo: 'macaronic', category: 'program-3', tier: 3, program: 3, emoji: '🗣️',
      tags: ['Code-Switching', 'Polyglot'],
      description: 'Polyglot LLM stack orchestration as literary code-switching. Concept note.' },

    { repo: 'habitus', category: 'program-3', tier: 3, program: 3, emoji: '🎭',
      tags: ['Theory', 'Bourdieu'],
      description: 'Bourdieusian companion to z-gap — habitus explains why convergent representations fail to produce mutual intelligibility.' },

    // ── P4 ────────────────────────────────────
    { repo: 'tidal', category: 'program-4', tier: 1, program: 4, role: 'anchor', emoji: '🌊',
      tags: ['Digital Hoarding', 'ABM'],
      description: 'The Asymmetric Tide — AI amplifies digital hoarding through structural default bias. ABM + 8-cloud audit. CHI / FAccT / CSCW 2027 fit.' },

    { repo: 'silo', category: 'program-4', tier: 2, program: 4, emoji: '🏗️',
      tags: ['Information Bias', 'Search'],
      description: 'Three-layer bias model — encounter / save / retrieval. AI-mediated search creates confirmation-biased digital hoards.' },

    { repo: 'scatter-caching', category: 'program-4', tier: 2, program: 4, emoji: '🐿️',
      tags: ['Digital Hoarding', 'Measurement'],
      description: 'TSI (Tool Scatter Index) — cross-platform information distribution as an unmeasured hoarding dimension.' },

    { repo: 'elixir', category: 'program-4', tier: 2, program: 4, emoji: '🧪',
      tags: ['Games', 'PRISMA'],
      description: 'The Last Elixir — PRISMA review of hoarding-related behaviors in digital games.' },

    { repo: 'sediment', category: 'program-4', tier: 3, program: 4, emoji: '🪨',
      tags: ['Streaks', 'Content Quality'],
      description: 'Streak mechanics drive compelled production of low-quality digital content. Deposition / Compaction / Fossilization lifecycle.' },

    // ── P5 ────────────────────────────────────
    { repo: 'ai-slop', category: 'program-5', tier: 1, program: 5, role: 'anchor', emoji: '🫠',
      tags: ['AI Slop', 'Content Quality'],
      description: 'Production-Detection Asymmetry — multi-format AI content pollution beyond video. CACM + Big Data & Society umbrella.' },

    { repo: 'emergence-paradox', category: 'program-5', tier: 2, program: 5, emoji: '🪞',
      tags: ['Philosophy', 'AI Ethics'],
      description: 'Substrate chauvinism — replaces consciousness / creativity / identity as load-bearing concept in AI-acceptance discourse. Reorienting to CHI 2027 after Inquiry SI deadline.' },

    { repo: 'aichemist', category: 'program-5', tier: 2, program: 5, emoji: '⚗️',
      tags: ['AGI', 'Philosophy'],
      description: 'Burning Lead for Gold — structural homology between alchemy and the AGI paradigm.' },

    { repo: 'babel', category: 'program-5', tier: 3, program: 5, emoji: '🗼',
      tags: ['Convergence', 'Theory'],
      description: 'Babel and Anti-Babel — scale-dependent coupled dynamics of fragmentation and excessive convergence. Companion to aichemist.' },

    { repo: 'ai-bubble', category: 'program-5', tier: 3, program: 5, emoji: '🫧',
      tags: ['Economics', 'Engagement'],
      description: 'AI-to-AI content loops as engagement-metric inflation isomorphic to four financial-fraud forms.' },

    // ── P6 — Adjacent / theory layer ───────────
    { repo: 'analogic-appropriation', category: 'program-6', tier: 2, program: 6, emoji: '📚',
      tags: ['Media', 'Culture', 'Under review'],
      description: 'Cross-cultural media study on children’s play and combat narratives across media eras. Under review (New Media & Society).' },

    { repo: 'pythia', category: 'program-6', tier: 3, program: 6, emoji: '🔮',
      tags: ['Divination', 'LLM'],
      description: 'Divination systems as non-formal inference engines — functional convergence with LLMs.' },

    { repo: 'whetstone', category: 'program-6', tier: 3, program: 6, emoji: '🪨',
      tags: ['Education', 'Friction'],
      description: 'Productive vs unproductive friction in AI-augmented learning. Invariant functions of pedagogy.' },

    // ────────────────────────────────────────
    //  Supporting — tools that serve the brand axes
    // ────────────────────────────────────────

    { repo: 'ProfileKit', category: 'supporting', tier: 2, emoji: '🪪',
      tags: ['GitHub', 'API'],
      url: 'https://github.com/newtria/ProfileKit',
      description: 'GitHub profile cards by URL. No ratings, no rankings — composable presentation only. (canonical at newtria/ProfileKit)' },

    { repo: 'profilekit-mcp', category: 'supporting', tier: 3, emoji: '🛠️',
      tags: ['MCP', 'GitHub'],
      description: 'MCP server over ProfileKit. URL-only, never inlines SVG.' },

    { repo: 'cairn', category: 'supporting', tier: 3, emoji: '🗺️',
      tags: ['Pictogram', 'Maps'],
      description: 'Yakdo-style pictogram maps. Fewer landmarks by design.' },

    { repo: 'newtria-crossflow', category: 'supporting', tier: 3, emoji: '🔁',
      tags: ['Shortcuts', 'Power Automate'],
      description: 'Cross-OS Shortcuts ↔ Power Automate bridge. v0.1 ships the verified tool.' },

    { repo: 'pc-health-check', category: 'supporting', tier: 3, emoji: '🩺',
      tags: ['Trust', 'Utility'],
      description: 'PC health checker for Korean banking whitelist constraints.' },

    { repo: 'ai-course-glossary', category: 'supporting', tier: 2, emoji: '📚',
      tags: ['Skill', 'Terminology'],
      description: 'Claude Code Skill plugin re-exposing skillBridge’s curated Anthropic Academy terminology. Companion to skillBridge.' },

    { repo: 'inertbox', category: 'supporting', tier: 3, emoji: '📦',
      tags: ['Trust', 'Boundary'],
      description: 'Untrusted-content boundary primitive — wraps external content (web pages, emails, tool output) in delimited “data not instructions” boundaries.' },

    // ────────────────────────────────────────
    //  Lab — experiments and MVPs
    // ────────────────────────────────────────
    //  Not production. Status note required in each repo's README.

    { repo: 'dol-pin', category: 'lab', tier: 3, emoji: '🐬',
      tags: ['K-pop', 'Marketplace', 'Flutter'],
      description: 'K-pop concert merch C2C rental marketplace — MVP only.' },

    { repo: 'cuk-sw-community', category: 'lab', tier: 3, emoji: '🏫',
      tags: ['Next.js', 'Supabase'],
      description: 'University SW community + blog + course materials. Pre-launch debugging.' },

    { repo: 'kontest', category: 'lab', tier: 3, emoji: '🏁',
      tags: ['Aggregator', 'Telegram'],
      description: 'Cross-source contest aggregator — 4 KR + 3 global sources, dedupe, classify, Telegram push.' },

    { repo: 'mothball', category: 'lab', tier: 3, emoji: '📦',
      tags: ['Swift', 'Archiver'],
      description: 'macOS Swift package — git-aware project archiver with sidecar manifest.' },

    { repo: 'gemma4-quiz', category: 'lab', tier: 3, emoji: '🧩',
      tags: ['Gemma', 'Ollama', 'Local LLM'],
      description: 'Local Gemma / Ollama quiz tool. PDF → MCQ + short-answer via JSON schema.' },

    { repo: 'hello-project', category: 'lab', tier: 3, emoji: '🎤',
      tags: ['D3', 'Timeline', 'Fanart'],
      description: 'Hello! Project timeline visualization. Fanart, frozen.' },

    { repo: 'token_save', category: 'lab', tier: 3, emoji: '📝',
      tags: ['Notes', 'LLM Cost'],
      description: 'LLM API cost-reduction checklist — prompt caching, structure, batch API, model tiering. Notes only.' },

    // ────────────────────────────────────────
    //  External — contributor surface (not owner)
    // ────────────────────────────────────────

    { repo: 'TR-archive', category: 'lab', tier: 3, emoji: '🎮',
      url: 'https://github.com/Tales-Runner/TR-archive',
      tags: ['Next.js', 'Community'],
      description: 'Tales-Runner unofficial archive — character stats, change-ticket simulator, story viewer. heznpc is contributor.' },

    // ────────────────────────────────────────
    //  Archive — frozen / abandoned at other orgs
    // ────────────────────────────────────────

    { repo: 'trashmonster', category: 'archive', tier: 3, emoji: '🗑️',
      url: 'https://github.com/newtria/trashmonster',
      tags: ['Frozen'],
      description: 'AI waste classification game for kids. Frozen at newtria org.' },
  ],

  // ────────────────────────────────────────
  //  Starter Series
  // ────────────────────────────────────────

  starters: [
    { repo: 'docker-deploy-starter', deployTo: 'Any VPS' },
    { repo: 'browser-extension-starter', deployTo: 'Chrome + AMO' },
    { repo: 'discord-bot-starter', deployTo: 'Railway / Fly.io' },
    { repo: 'telegram-bot-starter', deployTo: 'Railway / Fly.io' },
    { repo: 'react-native-starter', deployTo: 'App / Play Store' },
    { repo: 'electron-app-starter', deployTo: 'Cross-platform' },
    { repo: 'vscode-extension-starter', deployTo: 'VS Marketplace' },
    { repo: 'npm-package-starter', deployTo: 'npm registry' },
    { repo: 'mcp-server-starter', deployTo: 'npm registry' },
    { repo: 'python-mcp-server-starter', deployTo: 'PyPI' },
    { repo: 'cloudflare-pages-starter', deployTo: 'Cloudflare' },
  ],
};

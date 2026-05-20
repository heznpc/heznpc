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
      'Five brand axes anchor the work: infrastructure (AirMCP), research (PLOIDY), ' +
      'trust (Canary), traction (skillBridge), and signal (anvil). Around them sit five ' +
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
      description: 'One MCP server for the Apple ecosystem. Core infra (HITL, audit, rate-limit, HMAC) is the differentiated layer.' },

    { repo: 'PLOIDY', category: 'brand5', tier: 1, axis: 'research', emoji: '🧬',
      tags: ['Protocol', 'MCP', 'Research artifact'],
      description: 'Cross-session debate protocol — same model, different context depths. Dual-remote split is intentional: a fresh Zenodo DOI plus a clean academic/tool separation.' },

    { repo: 'canary', category: 'brand5', tier: 1, axis: 'trust', emoji: '🐤',
      tags: ['Observability', 'Dashboard', 'Audit'],
      description: 'Project health dashboard — stack freshness, deploy status, code quality, and activity across the portfolio.' },

    { repo: 'anvil', category: 'brand5', tier: 1, axis: 'signal', emoji: '🔨',
      tags: ['MCP', 'Workflow'],
      description: 'MCP tool that bundles commit → PR → CI → merge into one atomic call.' },

    { repo: 'skillbridge', category: 'brand5', tier: 1, axis: 'traction', emoji: '🌐',
      tags: ['Chrome', 'Education', 'i18n'],
      description: 'Translates Anthropic Academy into 26+ languages. Pending re-publication after icon redesign.' },

    // ────────────────────────────────────────
    //  Programs — 5 research programs (+ adjacent)
    // ────────────────────────────────────────
    //  program: 1 | 2 | 3 | 4 | 5 | 6
    //  role:    'anchor' | undefined
    //
    //  P1 — Human-Controlled AI Systems    (anchor: AirMCP infra → statute-of-limitations)
    //  P2 — Reflexive AI Research          (anchor: PLOIDY → meta, narcissus, eddy)
    //  P3 — NL-Code Communicability        (anchor: z-gap)
    //  P4 — AI-Driven Digital Hoarding     (anchor: tidal → silo, caching, elixir, sediment)
    //  P5 — AI Slop / Production-Detection (anchor: ai-slop-paper → emergence-paradox, aichemist)
    //  P6 — Adjacent research (off-core but coherent)

    { repo: 'statute-of-limitations', category: 'program-1', tier: 2, program: 1, emoji: '⏳',
      tags: ['Memory', 'AI Ethics', 'Forgetting'],
      description: 'Designing institutional forgetting for AI agent memory — authority expiry vs deletion. Foundational to AirMCP memory governance.' },

    { repo: 'meta', category: 'program-2', tier: 1, program: 2, role: 'anchor', id: 'meta-paper', emoji: '🔄',
      tags: ['Reflexive', 'Methodology'],
      description: 'LLM-as-research-infrastructure — using Claude Code to study Claude Code.' },

    { repo: 'narcissus', category: 'program-2', tier: 2, program: 2, emoji: '🌸',
      tags: ['Confirmation Bias', 'HCI'],
      description: 'AI mirrors amplify researcher confirmation bias through collaborative entrenchment.' },

    { repo: 'eddy', category: 'program-2', tier: 2, program: 2, emoji: '🌀',
      tags: ['HCI', 'ADHD', 'Neurodiversity'],
      description: 'ADHD × AI — neurodivergent workflows as competitive advantage in multi-session work.' },

    { repo: 'z-gap', category: 'program-3', tier: 1, program: 3, role: 'anchor', emoji: '📐',
      tags: ['NLP', 'Representations'],
      description: 'Convergence ≠ Communicability — Platonic Representations at the NL-Code Interface.' },

    { repo: 'tidal', category: 'program-4', tier: 1, program: 4, role: 'anchor', emoji: '🌊',
      tags: ['Digital Hoarding', 'ABM'],
      description: 'The Asymmetric Tide — AI amplifies digital hoarding through structural default bias.' },

    { repo: 'silo', category: 'program-4', tier: 2, program: 4, emoji: '🏗️',
      tags: ['Information Bias', 'Search'],
      description: 'AI-mediated information search creates confirmation-biased digital hoards.' },

    { repo: 'caching', category: 'program-4', tier: 2, program: 4, emoji: '🐿️',
      tags: ['Digital Hoarding', 'HCI'],
      description: 'Scatter-caching — cross-platform information distribution as an unmeasured hoarding dimension.' },

    { repo: 'elixir', category: 'program-4', tier: 2, program: 4, emoji: '🧪',
      tags: ['Games', 'PRISMA'],
      description: 'The Last Elixir — PRISMA review of hoarding-related behaviors in digital games.' },

    { repo: 'sediment', category: 'program-4', tier: 3, program: 4, emoji: '🪨',
      tags: ['Streaks', 'Content Quality'],
      description: 'Streak mechanics drive compelled production of low-quality digital content.' },

    { repo: 'ai-slop-paper', category: 'program-5', tier: 1, program: 5, role: 'anchor', emoji: '🫠',
      tags: ['AI Slop', 'Content Quality'],
      description: 'Production-Detection Asymmetry — multi-format AI content pollution beyond video.' },

    { repo: 'emergence-paradox', category: 'program-5', tier: 2, program: 5, emoji: '🪞',
      tags: ['Philosophy', 'AI Ethics'],
      description: 'Substrate chauvinism — why we reject creative-AI but accept analytical-AI.' },

    { repo: 'aichemist', category: 'program-5', tier: 2, program: 5, emoji: '⚗️',
      tags: ['AGI', 'Philosophy'],
      description: 'Structural homology between alchemy and the AGI paradigm.' },

    { repo: 'analogic-appropriation', category: 'program-6', tier: 3, program: 6, emoji: '📚',
      tags: ['Media', 'Culture', 'Play'],
      description: 'Cross-cultural media study on children’s play and combat narratives across media eras.' },

    { repo: 'pythia', category: 'program-6', tier: 3, program: 6, emoji: '🔮',
      tags: ['Divination', 'LLM'],
      description: 'Divination systems as non-formal inference engines and their functional convergence with LLMs.' },

    // ────────────────────────────────────────
    //  Supporting — tools that serve the brand axes
    // ────────────────────────────────────────

    { repo: 'ProfileKit', category: 'supporting', tier: 2, emoji: '🪪',
      tags: ['GitHub', 'API'],
      description: 'GitHub profile cards by URL. No ratings, no rankings — composable presentation only.' },

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

    // ────────────────────────────────────────
    //  Lab — experiments and MVPs
    // ────────────────────────────────────────
    //  Not production. Status note required in each repo’s README.

    { repo: 'villagent', category: 'lab', tier: 2, emoji: '🏠',
      tags: ['Agents', 'GUI'],
      description: 'GUI platform for AI agent ecosystems. Lab-only until experiments exist.' },

    { repo: 'dol-pin', category: 'lab', tier: 3, emoji: '🐬',
      tags: ['K-pop', 'Marketplace', 'Flutter'],
      description: 'K-pop concert merch C2C rental marketplace — MVP only.' },

    { repo: 'PlantMonster', category: 'lab', tier: 3, emoji: '🌱',
      tags: ['Kids', 'AI'],
      description: 'Plant identification app for kids — discover plants, collect spirits.' },

    { repo: 'mothball', category: 'lab', tier: 3, emoji: '📦',
      tags: ['Swift', 'Package'],
      description: 'Swift package for archive-and-revive workflows.' },

    { repo: 'gemma4-quiz', category: 'lab', tier: 3, emoji: '🧩',
      tags: ['Gemma', 'Ollama', 'Local LLM'],
      description: 'Local Gemma/Ollama quiz tool.' },

    { repo: 'hello-project', category: 'lab', tier: 3, emoji: '🎤',
      tags: ['D3', 'Timeline', 'Fanart'],
      description: 'Hello! Project timeline visualization. Fanart, frozen.' },

    { repo: 'code-sense', category: 'lab', tier: 3, emoji: '🧠',
      tags: ['Education', 'Node.js'],
      description: 'Developer intuition guide — learn from real production bugs.' },

    { repo: 'FollowPrint', category: 'lab', tier: 3, emoji: '🖨️',
      tags: ['Next.js', 'Utility'],
      description: 'Print & screenshot tracking utility.' },

    { repo: 'cuk-sw-community', category: 'lab', tier: 3, emoji: '🏫',
      tags: ['Next.js', 'Supabase'],
      description: 'University SW community site. Pre-launch debugging.' },

    // ────────────────────────────────────────
    //  Archive — frozen / abandoned
    // ────────────────────────────────────────

    { repo: 'TrashMonster', category: 'archive', tier: 3, emoji: '🗑️',
      tags: ['Kids', 'AI'],
      description: 'AI waste classification game for kids. Frozen.' },

    { repo: 'ipod-gallery', category: 'archive', tier: 3, emoji: '🎞️',
      tags: ['Frozen'],
      description: 'Deprecated by ipod-gallery-next.' },
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

/**
 * Portfolio registry — single source of truth.
 *
 * - `description` 생략 시 GitHub repo description을 자동으로 가져옴
 * - `tags` 생략 시 GitHub topics를 자동으로 가져옴
 * - 프로젝트 추가/제거 = 이 파일에서 항목 추가/삭제 → `npm run generate`
 */

export default {
  owner: 'heznpc',

  meta: {
    name: 'heznpc',
    tagline: 'Building the ecosystem AI lives in',
    bio: 'Open-source infrastructure, products, tools, and research for the AI era.',
    thesis:
      "The AI era won't be won by models alone — it'll be won by ecosystems. " +
      'The infrastructure that connects AI to the physical world, the products that make it useful, ' +
      "the tools that let others build, and the research that keeps it honest. I'm building every layer.",
    github: 'https://github.com/heznpc',
    contact: 'https://github.com/heznpc',
  },

  // ────────────────────────────────────────
  //  Projects
  // ────────────────────────────────────────

  projects: [
    // ── Foundation ──────────────────────────
    { repo: 'AirMCP', category: 'foundation', tier: 1,
      icon: 'https://heznpc.github.io/AirMCP/airmcp-icon-128.png',
      tags: ['262 tools', '25 modules', 'macOS'] },

    { repo: 'PLOIDY', category: 'foundation', tier: 2, emoji: '🧬',
      tags: ['MCP', 'Protocol'] },

    { repo: 'Canary', category: 'foundation', tier: 2, emoji: '🐤',
      tags: ['Dashboard', 'Health'] },

    // ── Products ───────────────────────────
    { repo: 'TrashMonster', category: 'products', tier: 1, emoji: '🗑️',
      tags: ['Kids', 'AI', 'EdTech'],
      description: 'AI-powered waste classification game for kids — learn recycling through play.' },

    { repo: 'dol-pin', category: 'products', tier: 2, emoji: '🐬',
      tags: ['K-pop', 'Marketplace', 'Flutter'],
      description: 'K-pop concert merch C2C rental marketplace — rent lightsticks, not buy.' },

    { repo: 'PlantMonster', category: 'products', tier: 3, emoji: '🌱',
      tags: ['Kids', 'AI'],
      description: 'Plant identification app for kids — discover plants, collect spirits.' },

    // ── Tools ──────────────────────────────
    { repo: 'skillbridge', category: 'tools', tier: 2, emoji: '🌐',
      tags: ['Chrome', 'AI', 'Education'] },

    { repo: 'ProfileKit', category: 'tools', tier: 3, emoji: '🪪',
      tags: ['GitHub', 'API'],
      description: 'All-in-one GitHub profile cards. No ratings, no rankings.' },

    { repo: 'villagent', category: 'tools', tier: 2, emoji: '🏠',
      tags: ['Agents', 'GUI'] },

    { repo: 'code-sense', category: 'tools', tier: 3, emoji: '🧠',
      tags: ['Education', 'Node.js'],
      description: 'Developer intuition guide — learn from real-world production bugs.' },

    { repo: 'FollowPrint', category: 'tools', tier: 3, emoji: '🖨️',
      tags: ['Next.js', 'Utility'],
      description: 'Print & screenshot tracking utility built with Next.js.' },

    // ── Research ───────────────────────────
    { repo: 'z-gap', category: 'research', tier: 1, emoji: '📐',
      tags: ['NLP', 'Representations'],
      description: 'Convergence ≠ Communicability — Platonic Representations at the NL-Code Interface.' },

    { repo: 'eddy', category: 'research', tier: 2, emoji: '🌀',
      tags: ['HCI', 'ADHD', 'Neurodiversity'],
      description: 'ADHD × AI — position paper on neurodivergent workflows as competitive advantage.' },

    { repo: 'emergence-paradox', category: 'research', tier: 2, emoji: '🪞',
      tags: ['Philosophy', 'AI Ethics'],
      description: 'Substrate chauvinism as mediator — why we reject creative-AI but accept analytical-AI.' },

    { repo: 'analogic-appropriation', category: 'research', tier: 3, emoji: '📚',
      tags: ['Media', 'Culture', 'Play'],
      description: 'Cross-cultural media study on children’s play and combat narratives across media eras.' },

    { repo: 'ai-slop-paper', category: 'research', tier: 2, emoji: '🫠',
      tags: ['AI Slop', 'Content Quality'],
      description: 'Production-Detection Asymmetry — multi-format AI content pollution beyond video.' },

    { repo: 'aichemist', category: 'research', tier: 2, emoji: '⚗️',
      tags: ['AGI', 'Philosophy'],
      description: 'Burning Lead for Gold — structural homology between alchemy and the AGI paradigm.' },

    { repo: 'caching', category: 'research', tier: 2, emoji: '🐿️',
      tags: ['Digital Hoarding', 'HCI'],
      description: 'Scatter-caching — cross-platform information distribution as unmeasured hoarding dimension.' },

    { repo: 'elixir', category: 'research', tier: 2, emoji: '🧪',
      tags: ['Games', 'PRISMA', 'Hoarding'],
      description: 'The Last Elixir — PRISMA review of hoarding-related behaviors in digital games.' },

    { repo: 'silo', category: 'research', tier: 2, emoji: '🏗️',
      tags: ['Information Bias', 'Search'],
      description: 'How AI-mediated information search creates confirmation-biased digital hoards.' },

    { repo: 'tidal', category: 'research', tier: 2, emoji: '🌊',
      tags: ['Digital Hoarding', 'ABM'],
      description: 'The Asymmetric Tide — how AI amplifies digital hoarding through structural default bias.' },

    { repo: 'narcissus', category: 'research', tier: 2, emoji: '🌸',
      tags: ['Confirmation Bias', 'HCI'],
      description: 'How AI mirrors amplify researcher confirmation bias through collaborative entrenchment.' },

    { repo: 'meta', category: 'research', tier: 3, emoji: '🔄',
      id: 'meta-paper', tags: ['Reflexive', 'Methodology'],
      description: 'LLM-as-research-infrastructure — reflexive practice of using Claude Code to study Claude Code.' },

    { repo: 'pythia', category: 'research', tier: 3, emoji: '🔮',
      tags: ['Divination', 'LLM'],
      description: 'Divination systems as non-formal inference engines and their functional convergence with LLMs.' },

    { repo: 'sediment', category: 'research', tier: 3, emoji: '🪨',
      tags: ['Streaks', 'Content Quality'],
      description: 'How streak mechanics drive compelled production of low-quality digital content.' },

    { repo: 'statute-of-limitations', category: 'research', tier: 3, emoji: '⏳',
      tags: ['Memory', 'AI Ethics', 'Forgetting'],
      description: 'Designing institutional forgetting for AI agent memory — authority expiry vs deletion.' },
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

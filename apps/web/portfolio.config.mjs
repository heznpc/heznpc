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

    { repo: 'PLOIDY', category: 'foundation', tier: 2, emoji: '\ud83e\uddec',
      tags: ['MCP', 'Protocol'], venue: 'COLM 2026' },

    { repo: 'Canary', category: 'foundation', tier: 2, emoji: '\ud83d\udc24',
      tags: ['Dashboard', 'Health'] },

    // ── Products ───────────────────────────
    { repo: 'TrashMonster', category: 'products', tier: 1, emoji: '\ud83d\uddd1\ufe0f',
      tags: ['Kids', 'AI', 'EdTech'],
      description: 'AI-powered waste classification game for kids \u2014 learn recycling through play.' },

    { repo: 'dol-pin', category: 'products', tier: 2, emoji: '\ud83d\udc2c',
      tags: ['K-pop', 'Marketplace', 'Flutter'],
      description: 'K-pop concert merch C2C rental marketplace \u2014 rent lightsticks, not buy.' },

    { repo: 'PlantMonster', category: 'products', tier: 3, emoji: '\ud83c\udf31',
      tags: ['Kids', 'AI'],
      description: 'Plant identification app for kids \u2014 discover plants, collect spirits.' },

    // ── Tools ──────────────────────────────
    { repo: 'skillbridge', category: 'tools', tier: 2, emoji: '\ud83c\udf10',
      tags: ['Chrome', 'AI', 'Education'] },

    { repo: 'ProfileKit', category: 'tools', tier: 3, emoji: '\ud83e\udeaa',
      tags: ['GitHub', 'API'],
      description: 'All-in-one GitHub profile cards. No ratings, no rankings.' },

    { repo: 'villagent', category: 'tools', tier: 2, emoji: '\ud83c\udfe0\ufe0f',
      tags: ['Agents', 'GUI'] },

    { repo: 'code-sense', category: 'tools', tier: 3, emoji: '\ud83e\udde0',
      tags: ['Education', 'Node.js'],
      description: 'Developer intuition guide \u2014 learn from real-world production bugs.' },

    { repo: 'FollowPrint', category: 'tools', tier: 3, emoji: '\ud83d\udda8\ufe0f',
      tags: ['Next.js', 'Utility'],
      description: 'Print & screenshot tracking utility built with Next.js.' },

    // ── Research ───────────────────────────
    { repo: 'z-gap', category: 'research', tier: 1, emoji: '\ud83d\udcd0',
      venue: 'EMNLP 2026', tags: ['NLP', 'Representations'],
      description: 'Convergence \u2260 Communicability \u2014 Platonic Representations at the NL-Code Interface.' },

    { repo: 'eddy', category: 'research', tier: 2, emoji: '\ud83c\udf00',
      venue: 'CHI 2027', tags: ['HCI', 'ADHD', 'Neurodiversity'],
      description: 'ADHD \u00d7 AI \u2014 position paper on neurodivergent workflows as competitive advantage.' },

    { repo: 'emergence-paradox', category: 'research', tier: 2, emoji: '\ud83e\ude9e',
      venue: 'Inquiry', tags: ['Philosophy', 'AI Ethics'],
      description: 'Substrate chauvinism as mediator \u2014 why we reject creative-AI but accept analytical-AI.' },

    { repo: 'analogic-appropriation', category: 'research', tier: 3, emoji: '\ud83d\udcda',
      venue: 'NMS', tags: ['Media', 'Culture', 'Play'],
      description: 'Cross-cultural media study on children\u2019s play and combat narratives across media eras.' },

    { repo: 'ai-slop-paper', category: 'research', tier: 2, emoji: '\ud83e\udee0',
      venue: 'CACM', tags: ['AI Slop', 'Content Quality'],
      description: 'Production-Detection Asymmetry \u2014 multi-format AI content pollution beyond video.' },

    { repo: 'aichemist', category: 'research', tier: 2, emoji: '\u2697\ufe0f',
      tags: ['AGI', 'Philosophy'],
      description: 'Burning Lead for Gold \u2014 structural homology between alchemy and the AGI paradigm.' },

    { repo: 'caching', category: 'research', tier: 2, emoji: '\ud83d\udc3f\ufe0f',
      venue: 'BIT', tags: ['Digital Hoarding', 'HCI'],
      description: 'Scatter-caching \u2014 cross-platform information distribution as unmeasured hoarding dimension.' },

    { repo: 'elixir', category: 'research', tier: 2, emoji: '\ud83e\uddea',
      venue: 'Games & Culture', tags: ['Games', 'PRISMA', 'Hoarding'],
      description: 'The Last Elixir \u2014 PRISMA review of hoarding-related behaviors in digital games.' },

    { repo: 'silo', category: 'research', tier: 2, emoji: '\ud83c\udfd7\ufe0f',
      venue: 'SM+S', tags: ['Information Bias', 'Search'],
      description: 'How AI-mediated information search creates confirmation-biased digital hoards.' },

    { repo: 'tidal', category: 'research', tier: 2, emoji: '\ud83c\udf0a',
      venue: 'CHI 2027', tags: ['Digital Hoarding', 'ABM'],
      description: 'The Asymmetric Tide \u2014 how AI amplifies digital hoarding through structural default bias.' },

    { repo: 'narcissus', category: 'research', tier: 2, emoji: '\ud83c\udf38',
      venue: 'FAccT 2027', tags: ['Confirmation Bias', 'HCI'],
      description: 'How AI mirrors amplify researcher confirmation bias through collaborative entrenchment.' },

    { repo: 'meta', category: 'research', tier: 3, emoji: '\ud83d\udd04',
      id: 'meta-paper', venue: 'alt.CHI 2027', tags: ['Reflexive', 'Methodology'],
      description: 'LLM-as-research-infrastructure \u2014 reflexive practice of using Claude Code to study Claude Code.' },

    { repo: 'pythia', category: 'research', tier: 3, emoji: '\ud83d\udd2e',
      venue: 'Phil. & Tech.', tags: ['Divination', 'LLM'],
      description: 'Divination systems as non-formal inference engines and their functional convergence with LLMs.' },

    { repo: 'sediment', category: 'research', tier: 3, emoji: '\ud83e\udea8',
      venue: 'CSCW 2027', tags: ['Streaks', 'Content Quality'],
      description: 'How streak mechanics drive compelled production of low-quality digital content.' },

    { repo: 'statute-of-limitations', category: 'research', tier: 3, emoji: '\u23f3',
      venue: 'FAccT 2027', tags: ['Memory', 'AI Ethics', 'Forgetting'],
      description: 'Designing institutional forgetting for AI agent memory \u2014 authority expiry vs deletion.' },
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

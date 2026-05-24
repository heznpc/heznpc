/**
 * Translation dictionary — UI chrome + meta strings only.
 *
 * Project descriptions, paper titles, and repository names stay in English
 * across all locales so they match the underlying GitHub repos and the
 * published paper titles. Only chrome (nav, footers, section headers,
 * tagline, bio, thesis, program labels) is translated.
 */

export type Locale = 'en' | 'ko';
export const LOCALES = ['en', 'ko'] as const;
export const DEFAULT_LOCALE: Locale = 'en';

export const LOCALE_LABELS: Record<Locale, string> = {
  en: 'EN',
  ko: 'KO',
};

export const LOCALE_NAMES: Record<Locale, string> = {
  en: 'English',
  ko: '한국어',
};

export interface Dict {
  // BaseLayout / nav / footer
  meta: {
    description: string;
  };
  nav: {
    gallery: string;
    commission: string;
    github: string;
    langLabel: string;
  };
  // Home page (index)
  home: {
    titleSuffix: string;       // e.g. "— Curator of AI infrastructure..."
    tagline: string;
    bio: string;
    thesis: string;
    watchIntro: string;
    flagshipEyebrow: string;   // "Brand 5 · Product flagship"
    flagshipTags: string;
    flagshipStatus: string;
    flagshipLink: string;      // "Read on GitHub"
    sectionEcosystem: string;
    sectionBrand5: string;
    sectionPrograms: string;
    sectionSupporting: string;
    sectionLab: string;
    sectionArchive: string;
    sectionStarters: string;
    starterCaption: string;    // "Clone → Push → Deployed · X CI/CD templates"
    axes: string;
    programsCount: string;
    items: string;
    item: string;
    papers: string;
    paper: string;
    anchor: string;
    status: string;
    footerStats: (p: { projects: number; programs: number; supporting: number; lab: number; templates: number }) => string;
    programs: Record<number, { label: string; blurb: string }>;
    axisLabels: Record<'product' | 'research' | 'trust' | 'traction' | 'signal', string>;
  };
  // Gallery
  gallery: {
    title: string;
    description: string;
    eyebrow: string;
    heading: string;
    body: string;
    cta: string;
  };
  // Commission
  commission: {
    title: string;
    description: string;
    eyebrow: string;
    heading: string;
    body: string;
    cta: string;
  };
  // Intro splash
  intro: {
    title: string;
    description: string;
    skip: string;
    enter: string;
  };
}

const en: Dict = {
  meta: {
    description: 'Building the ecosystem AI lives in — open-source infrastructure, research, and tools.',
  },
  nav: {
    gallery: 'Gallery',
    commission: 'Commission',
    github: 'GitHub',
    langLabel: 'Language',
  },
  home: {
    titleSuffix: '— Curator of AI infrastructure, research, and tools',
    tagline: 'Building the ecosystem AI lives in',
    bio: 'Curator of open-source infrastructure, research, and tools for the AI era.',
    thesis:
      'Five brand axes anchor the work: infrastructure (AirMCP), research (PLOIDY), ' +
      'trust (Canary), traction (skillBridge), and signal (anvil). Around them sit five ' +
      'research programs, a stack of supporting tools, a lab of experiments, and an ' +
      'archive of what has already been learned.',
    watchIntro: 'Watch intro',
    flagshipEyebrow: 'Brand 5 · Product flagship',
    flagshipTags: 'Tags',
    flagshipStatus: 'Status',
    flagshipLink: 'Read on GitHub',
    sectionEcosystem: 'Ecosystem',
    sectionBrand5: 'Brand 5',
    sectionPrograms: 'Research Programs',
    sectionSupporting: 'Supporting',
    sectionLab: 'Lab',
    sectionArchive: 'Archive',
    sectionStarters: 'Starter Series',
    starterCaption: 'Clone → Push → Deployed · {count} CI/CD templates',
    axes: 'axes',
    programsCount: 'programs',
    items: 'items',
    item: 'item',
    papers: 'papers',
    paper: 'paper',
    anchor: 'Anchor',
    status: 'active',
    footerStats: (p) =>
      `${p.projects} projects · ${p.programs} research programs · ${p.supporting} supporting · ${p.lab} lab · ${p.templates} templates`,
    programs: {
      1: { label: 'Human-Controlled AI Systems', blurb: 'Agent authority, HITL, audit, and forgetting. Anchored by AirMCP.' },
      2: { label: 'Reflexive AI Research', blurb: 'Using AI to study AI. Cross-context debate; collaborative entrenchment; ADHD-as-advantage.' },
      3: { label: 'NL-Code Communicability', blurb: 'Platonic representations at the natural-language ↔ code interface.' },
      4: { label: 'AI-Driven Digital Hoarding', blurb: 'Asymmetric default-bias, info silos, scatter-caching, streak mechanics.' },
      5: { label: 'AI Slop / Production-Detection Asymmetry', blurb: 'Multi-format AI content pollution beyond video.' },
      6: { label: 'Adjacent research', blurb: 'Off-core but coherent — divination as inference, cross-cultural media studies.' },
    },
    axisLabels: {
      product: 'Product',
      research: 'Research',
      trust: 'Trust',
      traction: 'Traction',
      signal: 'Signal',
    },
  },
  gallery: {
    title: 'Gallery — heznpc',
    description: 'Illustrations, 2차 창작, and visual essays by heznpc.',
    eyebrow: 'Gallery',
    heading: 'In bloom soon',
    body:
      'Illustrations, 2차 창작, and visual essays are migrating home. This shelf ' +
      'is empty on purpose — new pieces will land here once the new aesthetic is locked in.',
    cta: 'Until then · Pixiv',
  },
  commission: {
    title: 'Commission — heznpc',
    description: 'Commission illustration work from heznpc.',
    eyebrow: 'Commission',
    heading: 'Paused',
    body:
      'Slots are closed while the gallery is being rebuilt. When they reopen, ' +
      'the announcement will land here and on X. Thanks for the patience.',
    cta: 'Watch @heznpc',
  },
  intro: {
    title: 'heznpc — Intro',
    description: 'An ecosystem, in three views.',
    skip: 'Skip ›',
    enter: 'Enter',
  },
};

const ko: Dict = {
  meta: {
    description: 'AI가 살아갈 생태계를 만듭니다 — 오픈소스 인프라·연구·툴.',
  },
  nav: {
    gallery: '갤러리',
    commission: '커미션',
    github: 'GitHub',
    langLabel: '언어',
  },
  home: {
    titleSuffix: '— AI 인프라·연구·툴 큐레이터',
    tagline: 'AI가 살아갈 생태계를 만듭니다',
    bio: 'AI 시대의 오픈소스 인프라·연구·툴을 큐레이팅합니다.',
    thesis:
      '다섯 개의 브랜드 축이 작업 전체를 받칩니다: 인프라(AirMCP), 연구(PLOIDY), ' +
      '신뢰(Canary), 확산(skillBridge), 시그널(anvil). 그 둘레로 5개의 연구 프로그램, ' +
      '브랜드 축을 떠받치는 보조 툴, 실험 단계의 Lab, 그리고 이미 학습한 것을 보관하는 ' +
      'Archive가 자리합니다.',
    watchIntro: '인트로 보기',
    flagshipEyebrow: 'Brand 5 · Product 플래그십',
    flagshipTags: '태그',
    flagshipStatus: '상태',
    flagshipLink: 'GitHub에서 보기',
    sectionEcosystem: '에코시스템',
    sectionBrand5: 'Brand 5',
    sectionPrograms: '연구 프로그램',
    sectionSupporting: 'Supporting',
    sectionLab: 'Lab',
    sectionArchive: 'Archive',
    sectionStarters: 'Starter Series',
    starterCaption: 'Clone → Push → 배포 · CI/CD 템플릿 {count}종',
    axes: '축',
    programsCount: '프로그램',
    items: '항목',
    item: '항목',
    papers: '논문',
    paper: '논문',
    anchor: '앵커',
    status: '진행 중',
    footerStats: (p) =>
      `프로젝트 ${p.projects} · 연구 프로그램 ${p.programs} · 보조 ${p.supporting} · Lab ${p.lab} · 템플릿 ${p.templates}`,
    programs: {
      1: { label: '인간 통제형 AI 시스템', blurb: '에이전트 권한, HITL, 감사, 망각. AirMCP가 앵커.' },
      2: { label: '반영적 AI 연구', blurb: 'AI로 AI를 연구합니다. 컨텍스트 간 토론, 공모적 강화, ADHD를 자원으로.' },
      3: { label: '자연어-코드 소통가능성', blurb: '자연어 ↔ 코드 인터페이스에서의 플라톤적 표상.' },
      4: { label: 'AI가 가속하는 디지털 호딩', blurb: '비대칭 기본값 편향, 정보 사일로, 흩뿌리기-캐싱, 스트릭 메커니즘.' },
      5: { label: 'AI 슬롭 / 생산-탐지 비대칭', blurb: '영상 이외의 형식에서 일어나는 다형식 AI 콘텐츠 오염.' },
      6: { label: '인접 연구', blurb: '코어는 아니지만 일관된 — 점복의 추론, 교차문화 미디어 연구.' },
    },
    axisLabels: {
      product: 'Product',
      research: 'Research',
      trust: 'Trust',
      traction: 'Traction',
      signal: 'Signal',
    },
  },
  gallery: {
    title: '갤러리 — heznpc',
    description: 'heznpc의 일러스트레이션, 2차 창작, 비주얼 에세이.',
    eyebrow: '갤러리',
    heading: '곧 다시 핍니다',
    body:
      '일러스트레이션, 2차 창작, 비주얼 에세이가 집으로 돌아오는 중입니다. ' +
      '이 선반은 일부러 비워뒀습니다 — 새 미감이 자리잡으면 새 작품들이 여기에 올라옵니다.',
    cta: '그동안은 · Pixiv',
  },
  commission: {
    title: '커미션 — heznpc',
    description: 'heznpc의 일러스트 커미션.',
    eyebrow: '커미션',
    heading: '잠시 멈춤',
    body:
      '갤러리를 다시 짓는 동안 슬롯을 닫아두었습니다. 다시 열릴 때 이곳과 X에 공지가 올라옵니다. ' +
      '기다려 주셔서 감사합니다.',
    cta: '@heznpc 팔로우',
  },
  intro: {
    title: 'heznpc — 인트로',
    description: '세 가지 시선으로 보는 생태계.',
    skip: '건너뛰기 ›',
    enter: '들어가기',
  },
};

export const DICT: Record<Locale, Dict> = { en, ko };

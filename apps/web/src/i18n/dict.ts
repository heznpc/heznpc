/**
 * Translation dictionary — UI chrome + meta strings only.
 *
 * Project descriptions, paper titles, and repository names stay in English
 * across all locales so they match the underlying GitHub repos and the
 * published paper titles. Only chrome (nav, footers, section headers,
 * tagline, bio, thesis, program labels) is translated.
 */

import type { ProjectStatus } from '../utils/types';

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
    sectionStarters: string;
    starterCaption: string;    // "Clone → Push → Deployed · X CI/CD templates"
    footerStats: (p: { projects: number; programs: number; supporting: number; lab: number; templates: number }) => string;
  };
  hub: {
    selectedProof: string;
    focusAreas: string;
    labArchive: string;
    evidence: string;
    constraint: string;
    now: string;
    frontier: string;
    related: string;
    openRepo: string;
    noRepoClaim: string;
    proofCount: (count: number) => string;
    areaCount: (count: number) => string;
    proofCaption: string;
    labCaption: string;
    statusLabels: Record<ProjectStatus, string>;
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
    description: 'Systems across AI, trust, local tools, cultural data, and future physical computing.',
  },
  nav: {
    gallery: 'Gallery',
    commission: 'Commission',
    github: 'GitHub',
    langLabel: 'Language',
  },
  home: {
    titleSuffix: '— Systems across AI, trust, local tools, and data',
    tagline: 'Systems that make messy workflows legible',
    bio: 'Small, inspectable tools across AI learning, local trust, developer presentation, and cultural data.',
    thesis:
      'The portfolio is organized by evidence, not repo count. A few projects carry front-layer proof; ' +
      'the rest stay in area, lab, or archive layers with their constraints visible.',
    watchIntro: 'Watch intro',
    sectionStarters: 'Starter Series',
    starterCaption: 'Lower-layer templates · {count} reusable starts',
    footerStats: (p) =>
      `${p.projects} proof items · ${p.programs} focus areas · ${p.supporting} selected · ${p.lab} lab/archive · ${p.templates} templates`,
  },
  hub: {
    selectedProof: 'Selected proof',
    focusAreas: 'Focus areas',
    labArchive: 'Lab / Archive',
    evidence: 'Evidence',
    constraint: 'Constraint',
    now: 'Now',
    frontier: 'Frontier',
    related: 'Related proof',
    openRepo: 'Open repo',
    noRepoClaim: 'No representative repo yet',
    proofCount: (count) => `${count} proof points`,
    areaCount: (count) => `${count} areas`,
    proofCaption: 'Only three pieces get front-layer weight, and each carries its constraint.',
    labCaption: 'Experiments, holds, and archives stay below the fold so they are not mistaken for shipped work.',
    statusLabels: {
      active: 'active',
      shipped: 'shipped',
      beta: 'beta',
      lab: 'lab',
      archive: 'archive',
      hold: 'hold',
      repair: 'repair',
      'pre-alpha': 'pre-alpha',
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
    description: 'A compact portfolio map.',
    skip: 'Skip ›',
    enter: 'Enter',
  },
};

const ko: Dict = {
  meta: {
    description: 'AI, 신뢰, 로컬 도구, 문화 데이터, 물리 컴퓨팅으로 확장되는 시스템.',
  },
  nav: {
    gallery: '갤러리',
    commission: '커미션',
    github: 'GitHub',
    langLabel: '언어',
  },
  home: {
    titleSuffix: '— AI·신뢰·로컬 도구·데이터 시스템',
    tagline: '복잡한 흐름을 읽히는 시스템으로 바꿉니다',
    bio: 'AI 학습, 로컬 신뢰, 개발자 표현, 문화 데이터를 작고 검토 가능한 도구로 엮습니다.',
    thesis:
      '이 포트폴리오는 레포 수가 아니라 증거를 기준으로 정리합니다. 몇 개의 대표 작업만 전면에 두고, ' +
      '나머지는 영역·Lab·Archive 층에 두어 제약까지 함께 보이게 합니다.',
    watchIntro: '인트로 보기',
    sectionStarters: 'Starter Series',
    starterCaption: '낮은 층의 재사용 템플릿 · {count}종',
    footerStats: (p) =>
      `증거 항목 ${p.projects} · 작업 영역 ${p.programs} · 대표 ${p.supporting} · Lab/Archive ${p.lab} · 템플릿 ${p.templates}`,
  },
  hub: {
    selectedProof: '대표 증거',
    focusAreas: '작업 영역',
    labArchive: 'Lab / Archive',
    evidence: '증거',
    constraint: '제약',
    now: '현재',
    frontier: '확장',
    related: '관련 증거',
    openRepo: '저장소 보기',
    noRepoClaim: '아직 대표 레포 없음',
    proofCount: (count) => `증거 ${count}개`,
    areaCount: (count) => `영역 ${count}개`,
    proofCaption: '검증 가능한 산출물 중심으로 3개만 전면에 둡니다.',
    labCaption: '실험, 보류, 아카이브는 완성품처럼 보이지 않도록 낮은 층에 둡니다.',
    statusLabels: {
      active: '진행',
      shipped: '출시',
      beta: '베타',
      lab: '실험',
      archive: '보관',
      hold: '보류',
      repair: '보수',
      'pre-alpha': '초기',
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
    description: '압축된 포트폴리오 지도.',
    skip: '건너뛰기 ›',
    enter: '들어가기',
  },
};

export const DICT: Record<Locale, Dict> = { en, ko };

export type Axis = 'product' | 'research' | 'trust' | 'traction' | 'signal';

export interface Project {
  id: string;
  name: string;
  description: string;
  repo: string;
  category: string;
  tier: number;
  tags: string[];
  url: string;
  status: string;
  axis?: Axis;
  program?: number;
  role?: 'anchor';
  icon?: string;
  iconEmoji?: string;
}

export interface Starter {
  name: string;
  repo: string;
  deployTo: string;
}

export interface ProjectMeta {
  name: string;
  tagline: string;
  bio: string;
  thesis: string;
  github: string;
}

export type BandKey = 'brand5' | 'programs' | 'supporting' | 'lab' | 'archive';

export interface Band {
  key: BandKey;
  label: string;
  projects: Project[];
}

const PROGRAM_CATEGORIES = new Set([
  'program-1', 'program-2', 'program-3', 'program-4', 'program-5', 'program-6',
]);

export function groupByBand(projects: Project[]): Record<BandKey, Project[]> {
  const bands: Record<BandKey, Project[]> = {
    brand5: [], programs: [], supporting: [], lab: [], archive: [],
  };
  for (const p of projects) {
    if (p.category === 'brand5') bands.brand5.push(p);
    else if (PROGRAM_CATEGORIES.has(p.category)) bands.programs.push(p);
    else if (p.category === 'supporting') bands.supporting.push(p);
    else if (p.category === 'lab') bands.lab.push(p);
    else if (p.category === 'archive') bands.archive.push(p);
  }
  return bands;
}

export interface ProgramGroup {
  num: number;
  label: string;
  blurb: string;
  projects: Project[];
}

export const PROGRAM_LABELS: Record<number, { label: string; blurb: string }> = {
  1: {
    label: 'Human-Controlled AI Systems',
    blurb: 'Agent authority, HITL, audit, and forgetting. Anchored by AirMCP.',
  },
  2: {
    label: 'Reflexive AI Research',
    blurb: 'Using AI to study AI. Cross-context debate; collaborative entrenchment; ADHD-as-advantage.',
  },
  3: {
    label: 'NL-Code Communicability',
    blurb: 'Platonic representations at the natural-language ↔ code interface.',
  },
  4: {
    label: 'AI-Driven Digital Hoarding',
    blurb: 'Asymmetric default-bias, info silos, scatter-caching, streak mechanics.',
  },
  5: {
    label: 'AI Slop / Production-Detection Asymmetry',
    blurb: 'Multi-format AI content pollution beyond video.',
  },
  6: {
    label: 'Adjacent research',
    blurb: 'Off-core but coherent — divination as inference, cross-cultural media studies.',
  },
};

export function groupByProgram(projects: Project[]): ProgramGroup[] {
  const byNum = new Map<number, Project[]>();
  for (const p of projects) {
    if (p.program == null) continue;
    const arr = byNum.get(p.program) ?? [];
    arr.push(p);
    byNum.set(p.program, arr);
  }
  return [...byNum.entries()]
    .sort(([a], [b]) => a - b)
    .map(([num, items]) => {
      const sorted = [...items].sort((a, b) => {
        if (a.role === 'anchor' && b.role !== 'anchor') return -1;
        if (b.role === 'anchor' && a.role !== 'anchor') return 1;
        return a.tier - b.tier;
      });
      const meta = PROGRAM_LABELS[num] ?? { label: `Program ${num}`, blurb: '' };
      return { num, label: meta.label, blurb: meta.blurb, projects: sorted };
    });
}

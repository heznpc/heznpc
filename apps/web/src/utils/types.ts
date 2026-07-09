export type ProjectCategory = 'selected' | 'area-proof' | 'lab' | 'archive';
export type DisplayTier = 'hero' | 'case-study' | 'area-proof' | 'lab' | 'archive' | 'hold';
export type ProjectStatus = 'active' | 'shipped' | 'beta' | 'lab' | 'archive' | 'hold' | 'repair' | 'pre-alpha';

export interface Project {
  id: string;
  name: string;
  description: string;
  repo: string;
  category: ProjectCategory;
  displayTier?: DisplayTier;
  area?: string;
  tier: number;
  tags: string[];
  url: string;
  status: ProjectStatus;
  evidence?: string;
  constraint?: string;
  icon?: string;
  iconEmoji?: string;
}

export interface PortfolioArea {
  id: string;
  label: string;
  summary: string;
  current: string;
  frontier: string;
  projectIds: string[];
}

export interface Starter {
  name: string;
  repo: string;
  url: string;
  deployTo: string;
}

export interface ProjectMeta {
  name: string;
  tagline: string;
  bio: string;
  thesis: string;
  github: string;
  contact?: string;
}

export interface PortfolioData {
  meta: ProjectMeta;
  areas: PortfolioArea[];
  projects: Project[];
  starters: Starter[];
}

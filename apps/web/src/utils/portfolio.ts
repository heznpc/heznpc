import type { PortfolioArea, PortfolioData, Project } from './types';

export interface PortfolioViewModel {
  areas: Array<PortfolioArea & { projects: Project[] }>;
  hero?: Project;
  caseStudies: Project[];
  frontProof: Project[];
  lowerProof: Project[];
}

export interface HomeStats {
  projects: number;
  programs: number;
  supporting: number;
  lab: number;
  templates: number;
}

const lowerTiers = new Set(['area-proof', 'lab', 'archive', 'hold']);

function isProject(project: Project | undefined): project is Project {
  return project !== undefined;
}

export function getPortfolioViewModel(data: PortfolioData): PortfolioViewModel {
  const projectById = new Map(data.projects.map((project) => [project.id, project]));
  const hero = data.projects.find((project) => project.displayTier === 'hero') ?? data.projects[0];
  const caseStudies = data.projects.filter((project) => project.displayTier === 'case-study');

  const areas = data.areas.map((area) => ({
    ...area,
    projects: area.projectIds
      .map((id) => projectById.get(id))
      .filter(isProject)
      .filter((project) => project.displayTier !== 'hold'),
  }));

  return {
    areas,
    hero,
    caseStudies,
    frontProof: [hero, ...caseStudies].filter((project): project is Project => Boolean(project)),
    lowerProof: data.projects
      .filter((project) => lowerTiers.has(project.displayTier ?? ''))
      .sort((a, b) => a.tier - b.tier || a.name.localeCompare(b.name)),
  };
}

export function getHomeStats(data: PortfolioData): HomeStats {
  return {
    projects: data.projects.length,
    programs: data.areas.length,
    supporting: data.projects.filter((project) => ['hero', 'case-study'].includes(project.displayTier ?? '')).length,
    lab: data.projects.filter((project) => ['lab', 'archive', 'hold'].includes(project.displayTier ?? '')).length,
    templates: data.starters.length,
  };
}

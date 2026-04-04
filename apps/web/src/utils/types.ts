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
  icon?: string;
  iconEmoji?: string;
  venue?: string;
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

export function groupByCategory(projects: Project[]): Record<string, Project[]> {
  const categories: Record<string, Project[]> = { foundation: [], products: [], tools: [], research: [] };
  for (const p of projects) {
    if (categories[p.category]) {
      categories[p.category].push(p);
    }
  }
  return categories;
}

#!/usr/bin/env node
/**
 * GitHub API에서 repo 정보를 가져와 projects.json을 생성한다.
 *
 *   npm run generate          # projects.json 재생성
 *   npm run build             # generate + astro build
 *
 * portfolio.config.mjs의 값이 GitHub보다 우선한다 (override).
 * GitHub API 실패 시 config 값만으로 fallback.
 */

import { execSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

// ── 1. Config 로드 ──────────────────────────
const config = (await import(join(ROOT, 'portfolio.config.mjs'))).default;
const owner = config.owner;

// ── 2. GitHub에서 전체 repo 목록 fetch ──────
const repoMap = new Map();

try {
  const raw = execSync(
    `gh repo list ${owner} --json nameWithOwner,name,description,url,repositoryTopics --limit 200`,
    { encoding: 'utf8', timeout: 15_000 },
  );
  for (const r of JSON.parse(raw)) {
    repoMap.set(r.name.toLowerCase(), {
      name: r.name,
      description: r.description || '',
      url: r.url,
      topics: (r.repositoryTopics || []).map((t) => t.name),
    });
  }
  process.stderr.write(`  fetched ${repoMap.size} repos from github.com/${owner}\n`);
} catch (err) {
  // CI must fail loudly on a missing description fetch — silently shipping
  // a portfolio that uses stale config-only descriptions defeats the purpose
  // of generate.mjs. Local dev (no CI=true) is allowed to fall back so that
  // network-flaky environments still build.
  if (process.env.CI === 'true') {
    process.stderr.write(`  github fetch failed in CI: ${err.message}\n`);
    process.exit(1);
  }
  process.stderr.write('  github fetch failed — using config values only\n');
}

// ── 3. projects 생성 ────────────────────────
const projects = config.projects.map((p) => {
  const gh = repoMap.get(p.repo.toLowerCase());

  return {
    id: p.id ?? p.repo.toLowerCase(),
    name: p.name ?? gh?.name ?? p.repo,
    description: p.description ?? gh?.description ?? '',
    repo: `${owner}/${p.repo}`,
    category: p.category,
    tier: p.tier,
    tags: p.tags ?? (gh?.topics?.length ? gh.topics : []),
    url: p.url ?? gh?.url ?? `https://github.com/${owner}/${p.repo}`,
    status: 'active',
    ...(p.icon && { icon: p.icon }),
    ...(p.emoji && { iconEmoji: p.emoji }),
  };
});

// ── 4. starters 생성 ────────────────────────
const starters = config.starters.map((s) => ({
  name: repoMap.get(s.repo.toLowerCase())?.name ?? s.repo,
  repo: `${owner}/${s.repo}`,
  deployTo: s.deployTo,
}));

// ── 5. 출력 ─────────────────────────────────
const output = { meta: config.meta, projects, starters };
const outPath = join(ROOT, 'projects.json');

writeFileSync(outPath, JSON.stringify(output, null, 2) + '\n');

const cats = {};
for (const p of projects) cats[p.category] = (cats[p.category] || 0) + 1;
const summary = Object.entries(cats).map(([k, v]) => `${k}:${v}`).join(' ');
process.stderr.write(`  ${projects.length} projects (${summary}), ${starters.length} starters\n`);

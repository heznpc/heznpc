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

const VALID_CATEGORIES = new Set(['selected', 'area-proof', 'lab', 'archive']);
const VALID_DISPLAY_TIERS = new Set(['hero', 'case-study', 'area-proof', 'lab', 'archive', 'hold']);
const VALID_STATUSES = new Set(['active', 'shipped', 'beta', 'lab', 'archive', 'hold', 'repair', 'pre-alpha']);

function failIfInvalid(errors) {
  if (errors.length === 0) return;
  for (const err of errors) process.stderr.write(`  config error: ${err}\n`);
  process.exit(1);
}

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
const configErrors = [];
const areaIds = new Set((config.areas ?? []).map((area) => area.id));
const projectIds = new Set();

const projects = config.projects.map((p) => {
  const gh = repoMap.get(p.repo.toLowerCase());
  const id = p.id ?? p.repo.toLowerCase();

  if (projectIds.has(id)) configErrors.push(`duplicate project id "${id}"`);
  projectIds.add(id);
  if (!VALID_CATEGORIES.has(p.category)) configErrors.push(`${id}: unknown category "${p.category}"`);
  if (p.displayTier && !VALID_DISPLAY_TIERS.has(p.displayTier)) {
    configErrors.push(`${id}: unknown displayTier "${p.displayTier}"`);
  }
  if (p.status && !VALID_STATUSES.has(p.status)) configErrors.push(`${id}: unknown status "${p.status}"`);
  if (p.area && !areaIds.has(p.area)) configErrors.push(`${id}: unknown area "${p.area}"`);

  return {
    id,
    name: p.name ?? gh?.name ?? p.repo,
    description: p.description ?? gh?.description ?? '',
    repo: `${owner}/${p.repo}`,
    category: p.category,
    tier: p.tier,
    tags: p.tags ?? (gh?.topics?.length ? gh.topics : []),
    url: p.url ?? gh?.url ?? `https://github.com/${owner}/${p.repo}`,
    status: p.status ?? 'active',
    ...(p.displayTier && { displayTier: p.displayTier }),
    ...(p.area && { area: p.area }),
    ...(p.evidence && { evidence: p.evidence }),
    ...(p.constraint && { constraint: p.constraint }),
    ...(p.axis && { axis: p.axis }),
    ...(p.program && { program: p.program }),
    ...(p.role && { role: p.role }),
    ...(p.icon && { icon: p.icon }),
    ...(p.emoji && { iconEmoji: p.emoji }),
  };
});

// ── 4. starters 생성 ────────────────────────
const starters = config.starters.map((s) => ({
  name: repoMap.get(s.repo.toLowerCase())?.name ?? s.repo,
  repo: `${owner}/${s.repo}`,
  url: `https://github.com/${owner}/${s.repo}`,
  deployTo: s.deployTo,
}));

for (const area of config.areas ?? []) {
  const seen = new Set();
  for (const id of area.projectIds ?? []) {
    if (seen.has(id)) configErrors.push(`${area.id}: duplicate projectIds entry "${id}"`);
    seen.add(id);
    if (!projectIds.has(id)) configErrors.push(`${area.id}: missing projectId "${id}"`);
  }
}

failIfInvalid(configErrors);

// ── 5. 출력 ─────────────────────────────────
const output = { meta: config.meta, areas: config.areas ?? [], projects, starters };
const outPath = join(ROOT, 'projects.json');

writeFileSync(outPath, JSON.stringify(output, null, 2) + '\n');

const cats = {};
for (const p of projects) cats[p.category] = (cats[p.category] || 0) + 1;
const summary = Object.entries(cats).map(([k, v]) => `${k}:${v}`).join(' ');
process.stderr.write(`  ${projects.length} projects (${summary}), ${starters.length} starters\n`);

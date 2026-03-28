#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

// ---------------------------------------------------------------------------
// Paths
// ---------------------------------------------------------------------------
const ROOT = __dirname;
const DATA_PATH = path.join(ROOT, 'projects.json');
const HTML_PATH = path.join(ROOT, 'docs', 'index.html');
const README_PATH = path.join(ROOT, 'README.md');
const SITEMAP_PATH = path.join(ROOT, 'docs', 'sitemap.xml');

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function esc(s) {
  if (typeof s !== 'string') return '';
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function warn(msg) {
  console.warn('[WARN] ' + msg);
}

function fatal(msg) {
  console.error('[ERROR] ' + msg);
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Load & validate
// ---------------------------------------------------------------------------
let raw;
try {
  raw = fs.readFileSync(DATA_PATH, 'utf8');
} catch (e) {
  fatal('Cannot read projects.json: ' + e.message);
}

let data;
try {
  data = JSON.parse(raw);
} catch (e) {
  fatal('Invalid JSON in projects.json: ' + e.message);
}

const meta = data.meta;
if (!meta || !meta.name || !meta.tagline || !meta.bio || !meta.thesis || !meta.github) {
  fatal('projects.json meta is missing required fields (name, tagline, bio, thesis, github).');
}

const REQUIRED_PROJECT_FIELDS = ['id', 'name', 'description', 'repo', 'category', 'tier', 'tags', 'url', 'status'];
const VALID_CATEGORIES = ['foundation', 'products', 'tools', 'research'];

const projects = [];
for (const p of (data.projects || [])) {
  const missing = REQUIRED_PROJECT_FIELDS.filter(f => p[f] == null);
  if (missing.length > 0) {
    warn('Skipping project "' + (p.id || p.name || 'unknown') + '": missing fields ' + missing.join(', '));
    continue;
  }
  if (!VALID_CATEGORIES.includes(p.category)) {
    warn('Skipping project "' + p.id + '": invalid category "' + p.category + '"');
    continue;
  }
  projects.push(p);
}

const starters = data.starters || [];

// Derived data
const flagships = projects.filter(p => p.tier === 1);
const catalogProjects = projects.filter(p => p.tier !== 1);
const categories = { foundation: [], products: [], tools: [], research: [] };
for (const p of projects) {
  categories[p.category].push(p);
}
const researchCount = categories.research.length;
const projectCount = projects.length;
const starterCount = starters.length;

// Category display names
const CAT_LABELS = { foundation: 'Foundation', products: 'Products', tools: 'Tools', research: 'Research' };
const CAT_COLORS = {
  foundation: 'rgba(56,189,248,.8)',
  products: 'rgba(244,114,182,.8)',
  tools: 'rgba(45,212,191,.8)',
  research: 'rgba(168,85,247,.8)'
};

// ---------------------------------------------------------------------------
// Build ecosystem map SVG
// ---------------------------------------------------------------------------
function buildEcoMapSVG() {
  const layers = [
    { key: 'research', label: 'Research', color: '#a855f7', bgDark: 'rgba(168,85,247,.12)', bgLight: 'rgba(168,85,247,.10)' },
    { key: 'tools', label: 'Tools', color: '#2dd4bf', bgDark: 'rgba(45,212,191,.12)', bgLight: 'rgba(45,212,191,.10)' },
    { key: 'products', label: 'Products', color: '#f472b6', bgDark: 'rgba(244,114,182,.12)', bgLight: 'rgba(244,114,182,.10)' },
    { key: 'foundation', label: 'Foundation', color: '#38bdf8', bgDark: 'rgba(56,189,248,.12)', bgLight: 'rgba(56,189,248,.10)' },
  ];

  const rowH = 52;
  const gap = 8;
  const totalH = layers.length * rowH + (layers.length - 1) * gap + 32;
  const w = 680;

  let rects = '';
  layers.forEach((layer, i) => {
    const y = 16 + i * (rowH + gap);
    const names = categories[layer.key].map(p => esc(p.name)).join('  \u00b7  ');
    rects += `
    <rect x="8" y="${y}" width="${w - 16}" height="${rowH}" rx="12" ry="12"
          fill="${layer.bgDark}" stroke="${layer.color}" stroke-width="1" stroke-opacity="0.3"
          class="eco-rect" data-light-fill="${layer.bgLight}" />
    <text x="24" y="${y + 22}" fill="${layer.color}" font-size="11" font-weight="700"
          font-family="'JetBrains Mono',monospace" letter-spacing="0.08em"
          text-transform="uppercase">${esc(layer.label)}</text>
    <text x="24" y="${y + 40}" fill="currentColor" font-size="12" font-family="-apple-system,BlinkMacSystemFont,sans-serif"
          opacity="0.5">${names}</text>`;
  });

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${totalH}" width="100%" style="max-width:${w}px;display:block;margin:0 auto" role="img" aria-label="Ecosystem map showing four layers: Research, Tools, Products, Foundation">${rects}
  </svg>`;
}

// ---------------------------------------------------------------------------
// Build icon HTML for a project
// ---------------------------------------------------------------------------
function iconHTML(p, size, fontSize) {
  if (p.icon) {
    return `<img src="${esc(p.icon)}" alt="${esc(p.name)}" class="proj-icon" width="${size}" height="${size}" style="width:${size}px;height:${size}px">`;
  }
  const emoji = p.iconEmoji || '';
  return `<div class="proj-icon" style="width:${size}px;height:${size}px;display:flex;align-items:center;justify-content:center;background:rgba(56,189,248,.1);font-size:${fontSize}">${emoji}</div>`;
}

// ---------------------------------------------------------------------------
// Build glass card structure
// ---------------------------------------------------------------------------
function glassCard(inner, cls, extraAttrs) {
  cls = cls || '';
  extraAttrs = extraAttrs || '';
  return `<div class="glass-card${cls ? ' ' + cls : ''}"${extraAttrs}>
          <div class="glass-fx"></div><div class="glass-tint"></div><div class="glass-shine"></div>
          <div class="glass-content">${inner}</div>
        </div>`;
}

// ---------------------------------------------------------------------------
// Build tags HTML
// ---------------------------------------------------------------------------
function tagsHTML(tags) {
  return '<div style="display:flex;gap:6px;margin-top:10px;flex-wrap:wrap">' +
    tags.map(t => `<span class="proj-tag">${esc(t)}</span>`).join('') +
    '</div>';
}

// ---------------------------------------------------------------------------
// Build venue badge (for research)
// ---------------------------------------------------------------------------
function venueBadge(p) {
  if (!p.venue) return '';
  return `<span class="venue-badge">${esc(p.venue)}</span>`;
}

// ---------------------------------------------------------------------------
// Flagship section
// ---------------------------------------------------------------------------
function buildFlagships() {
  const airmcp = flagships.find(p => p.id === 'airmcp');
  const others = flagships.filter(p => p.id !== 'airmcp');

  let html = '';

  // AirMCP large card
  if (airmcp) {
    const inner = `
            <div style="display:flex;align-items:start;gap:20px;flex-wrap:wrap">
              ${iconHTML(airmcp, 64, '2rem')}
              <div style="flex:1;min-width:200px">
                <div style="font-size:1.3rem;font-weight:700;letter-spacing:-.02em">${esc(airmcp.name)}</div>
                <p class="proj-desc" style="font-size:.92rem;margin-top:6px">${esc(airmcp.description)}</p>
                ${tagsHTML(airmcp.tags)}
              </div>
            </div>`;
    html += `
      <a href="${esc(airmcp.url)}" target="_blank" rel="noopener" class="flagship-link">
        ${glassCard(inner, 'clickable flagship-large reveal', ' data-delay="40"')}
      </a>`;
  }

  // Other flagships in 2-col
  if (others.length > 0) {
    html += '<div class="flagship-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:12px">';
    others.forEach((p, i) => {
      const badge = venueBadge(p);
      const inner = `
            <div style="display:flex;align-items:start;gap:14px">
              ${iconHTML(p, 48, '1.6rem')}
              <div style="flex:1;min-width:0">
                <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
                  <span class="proj-title" style="font-size:1.05rem">${esc(p.name)}</span>
                  ${badge}
                </div>
                <p class="proj-desc" style="margin-top:4px">${esc(p.description)}</p>
                ${tagsHTML(p.tags)}
              </div>
            </div>`;
      html += `
        <a href="${esc(p.url)}" target="_blank" rel="noopener" class="flagship-link">
          ${glassCard(inner, 'clickable flagship-medium reveal', ` data-delay="${60 + i * 40}"`)}
        </a>`;
    });
    html += '</div>';
  }

  return html;
}

// ---------------------------------------------------------------------------
// Catalog section
// ---------------------------------------------------------------------------
function buildCatalog() {
  let cards = '';
  catalogProjects.forEach((p, i) => {
    const badge = venueBadge(p);
    const inner = `
            <div style="display:flex;align-items:start;gap:12px">
              ${iconHTML(p, 36, '1.2rem')}
              <div style="flex:1;min-width:0">
                <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
                  <span class="proj-title">${esc(p.name)}</span>
                  ${badge}
                </div>
                <p class="proj-desc" style="margin-top:2px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">${esc(p.description)}</p>
                ${tagsHTML(p.tags)}
              </div>
            </div>`;
    cards += `
      <a href="${esc(p.url)}" target="_blank" rel="noopener" class="catalog-link">
        ${glassCard(inner, 'clickable catalog-card reveal', ` data-delay="${Math.min(i * 30, 200)}" data-category="${esc(p.category)}"`)}
      </a>`;
  });
  return cards;
}

// ---------------------------------------------------------------------------
// Starters section
// ---------------------------------------------------------------------------
function buildStarters() {
  let items = '';
  starters.forEach(s => {
    items += `
            <a href="https://github.com/${esc(s.repo)}" target="_blank" rel="noopener" class="starter-item">
              <span class="starter-name">${esc(s.name)}</span>
              <span class="starter-deploy">${esc(s.deployTo)}</span>
            </a>`;
  });
  return items;
}

// ---------------------------------------------------------------------------
// Full HTML
// ---------------------------------------------------------------------------
function generateHTML() {
  return `<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(meta.name)} — AI / Software Engineer</title>
  <meta name="description" content="${esc(meta.tagline)} — ${esc(meta.bio)}">
  <meta name="theme-color" content="#0e1117">
  <meta property="og:title" content="${esc(meta.name)} — AI / Software Engineer">
  <meta property="og:description" content="${esc(meta.tagline)} — ${esc(meta.bio)}">
  <meta property="og:image" content="https://github.com/${esc(meta.name)}.png">
  <meta property="og:type" content="website">
  <meta name="twitter:card" content="summary">
  <meta name="twitter:title" content="${esc(meta.name)} — AI / Software Engineer">
  <meta name="twitter:image" content="https://github.com/${esc(meta.name)}.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>
    /* === Theme tokens === */
    :root{--bg:#0e1117;--nav-bg:rgba(14,17,23,.6);--nav-border:rgba(255,255,255,.06);--text:#fff;--text-muted:rgba(255,255,255,.45)}
    [data-theme="light"]{--bg:#e8eaef;--nav-bg:rgba(255,255,255,.45);--nav-border:rgba(255,255,255,.5);--text:#1d1d1f;--text-muted:rgba(29,29,31,.55)}

    *{margin:0;padding:0;box-sizing:border-box}
    body{
      font-family:-apple-system,BlinkMacSystemFont,'Helvetica Neue',Helvetica,Arial,sans-serif;
      background:var(--bg);color:var(--text);-webkit-font-smoothing:antialiased;
      overflow-x:hidden;line-height:1.6;transition:background .5s,color .5s;
    }
    [data-theme="light"] body{color:#1d1d1f}
    a{color:inherit;text-decoration:none}
    button{font:inherit;cursor:pointer;border:0;background:0 0}

    /* === Ambient orbs === */
    .scene{position:fixed;inset:0;z-index:0;pointer-events:none;overflow:hidden}
    .orb{position:absolute;border-radius:50%;filter:blur(60px);will-change:transform;animation:drift 22s ease-in-out infinite alternate}
    .orb-a{width:800px;height:800px;top:-12%;left:-10%;background:radial-gradient(circle,rgba(14,165,233,.3),transparent 70%)}
    .orb-b{width:600px;height:600px;top:28%;right:-10%;background:radial-gradient(circle,rgba(244,114,182,.25),transparent 70%);animation-delay:-7s}
    .orb-c{width:550px;height:550px;bottom:-5%;left:12%;background:radial-gradient(circle,rgba(45,212,191,.22),transparent 70%);animation-delay:-14s}
    [data-theme="light"] .orb-a{background:radial-gradient(circle,rgba(14,165,233,.32),transparent 70%)}
    [data-theme="light"] .orb-b{background:radial-gradient(circle,rgba(244,114,182,.26),transparent 70%)}
    [data-theme="light"] .orb-c{background:radial-gradient(circle,rgba(45,212,191,.24),transparent 70%)}
    @keyframes drift{to{transform:translate(60px,-40px) scale(1.08)}}

    /* === Nav === */
    .glass-nav{
      position:fixed;inset:0 0 auto;z-index:100;height:56px;
      background:var(--nav-bg);
      backdrop-filter:blur(24px) saturate(1.7);-webkit-backdrop-filter:blur(24px) saturate(1.7);
      border-bottom:1px solid var(--nav-border);transition:background .5s,border-color .5s;
    }
    .nav-inner{max-width:720px;margin:0 auto;padding:0 20px;display:flex;align-items:center;justify-content:space-between;height:100%}
    .nav-brand{font-family:'JetBrains Mono',monospace;font-size:.88rem;font-weight:500;opacity:.8;letter-spacing:-.02em}
    .pill-btn{
      padding:5px 14px;border-radius:9999px;font-size:.76rem;font-weight:600;
      opacity:.4;border:1px solid rgba(255,255,255,.08);transition:all .25s;
    }
    [data-theme="light"] .pill-btn{border-color:rgba(255,255,255,.4);color:#1d1d1f}
    .pill-btn:hover{opacity:.7}

    /* === Profile name gradient === */
    .profile-name{
      background:linear-gradient(180deg,#fff 30%,rgba(255,255,255,.45));
      -webkit-background-clip:text;-webkit-text-fill-color:transparent;
    }
    [data-theme="light"] .profile-name{
      background:linear-gradient(180deg,#1d1d1f 30%,rgba(29,29,31,.45));
      -webkit-background-clip:text;-webkit-text-fill-color:transparent;
    }

    /* === Glass card === */
    .glass-card{
      position:relative;border-radius:20px;overflow:hidden;
      box-shadow:0 4px 16px rgba(0,0,0,.15),0 0 0 .5px rgba(255,255,255,.2),0 0 15px rgba(255,255,255,.04);
      transition:transform .4s cubic-bezier(.2,.8,.2,1),box-shadow .4s;
    }
    [data-theme="light"] .glass-card{
      box-shadow:0 4px 24px rgba(0,0,0,.07),0 0 0 .5px rgba(255,255,255,.7),inset 0 .5px 0 rgba(255,255,255,.6),0 0 24px rgba(255,255,255,.25);
    }
    .glass-card.clickable{cursor:pointer}
    .glass-card.clickable:hover{transform:translateY(-4px);box-shadow:0 16px 40px rgba(0,0,0,.25),0 0 1px rgba(255,255,255,.25)}
    [data-theme="light"] .glass-card.clickable:hover{
      box-shadow:0 20px 48px rgba(0,0,0,.1),0 0 0 .5px rgba(255,255,255,.8),inset 0 .5px 0 rgba(255,255,255,.7),0 0 32px rgba(255,255,255,.3);
    }

    /* Light sweep */
    .glass-card.clickable::before{
      content:'';position:absolute;inset:0;z-index:4;border-radius:inherit;pointer-events:none;
      background:linear-gradient(115deg,transparent 0%,transparent 20%,rgba(255,255,255,.01) 28%,rgba(255,255,255,.04) 38%,rgba(255,255,255,.06) 50%,rgba(255,255,255,.04) 62%,rgba(255,255,255,.01) 72%,transparent 80%,transparent 100%);
      opacity:0;transform:translateX(-140%);transition:none;
    }
    .glass-card.clickable:hover::before{opacity:1;transform:translateX(140%);transition:transform 8s cubic-bezier(.08,.6,0,1),opacity .6s}

    .glass-fx{position:absolute;inset:0;z-index:0;border-radius:inherit;backdrop-filter:blur(3px) saturate(180%) brightness(1.1);-webkit-backdrop-filter:blur(3px) saturate(180%) brightness(1.1)}
    [data-theme="light"] .glass-fx{backdrop-filter:blur(16px) saturate(200%) brightness(1.08);-webkit-backdrop-filter:blur(16px) saturate(200%) brightness(1.08)}
    .glass-tint{position:absolute;inset:0;z-index:1;border-radius:inherit;background:rgba(255,255,255,.04)}
    [data-theme="light"] .glass-tint{background:rgba(255,255,255,.35)}
    .glass-shine{
      position:absolute;inset:0;z-index:2;border-radius:inherit;pointer-events:none;
      box-shadow:inset 0 1px 12px rgba(255,255,255,.06),inset 0 -1px 8px rgba(255,255,255,.02);
      background:linear-gradient(170deg,rgba(255,255,255,.06) 0%,transparent 35%,transparent 85%,rgba(255,255,255,.015) 100%);
    }
    [data-theme="light"] .glass-shine{
      box-shadow:inset 0 1px 1px rgba(255,255,255,.8),inset 0 -1px 1px rgba(255,255,255,.3);
      background:linear-gradient(170deg,rgba(255,255,255,.4) 0%,rgba(255,255,255,.08) 25%,transparent 45%,transparent 80%,rgba(255,255,255,.12) 100%);
    }
    .glass-content{position:relative;z-index:3;padding:24px}

    /* === Section === */
    .section-label{
      font-size:.75rem;font-weight:700;text-transform:uppercase;
      letter-spacing:.1em;color:rgba(56,189,248,.7);margin-bottom:20px;
    }
    [data-theme="light"] .section-label{color:rgba(14,120,200,.8)}

    /* === Project card elements === */
    .proj-icon{width:44px;height:44px;border-radius:12px;flex-shrink:0}
    .proj-title{font-size:.95rem;font-weight:700;letter-spacing:-.02em}
    .proj-desc{font-size:.82rem;opacity:.45;line-height:1.5;margin-top:2px}
    [data-theme="light"] .proj-desc{opacity:.55}
    .proj-tag{
      font-size:.62rem;font-weight:600;padding:2px 8px;border-radius:9999px;
      background:rgba(56,189,248,.1);color:rgba(56,189,248,.8);border:1px solid rgba(56,189,248,.15);
    }
    [data-theme="light"] .proj-tag{background:rgba(14,120,200,.08);color:rgba(14,120,200,.8);border-color:rgba(14,120,200,.15)}

    /* === Venue badge === */
    .venue-badge{
      font-size:.6rem;font-weight:700;padding:2px 8px;border-radius:9999px;
      background:rgba(168,85,247,.15);color:rgba(168,85,247,.9);border:1px solid rgba(168,85,247,.25);
      text-transform:uppercase;letter-spacing:.04em;
    }
    [data-theme="light"] .venue-badge{background:rgba(168,85,247,.1);color:rgba(126,34,206,.9);border-color:rgba(168,85,247,.2)}

    /* === Flagship === */
    .flagship-large .glass-content{padding:32px}
    .flagship-link{display:block}
    .flagship-grid a{display:block}
    .flagship-medium .glass-content{padding:24px}

    /* === Catalog card performance === */
    .catalog-card{
      content-visibility:auto;
      contain-intrinsic-size:0 200px;
    }
    .catalog-link{display:block}
    .catalog-card .glass-content{padding:20px}

    /* === Tab buttons === */
    .tab-bar{display:flex;gap:8px;margin-bottom:20px;overflow-x:auto;-webkit-overflow-scrolling:touch;scrollbar-width:none;padding-bottom:4px}
    .tab-bar::-webkit-scrollbar{display:none}
    .tab-btn{
      padding:6px 16px;border-radius:9999px;font-size:.76rem;font-weight:600;
      border:1px solid rgba(255,255,255,.08);color:var(--text);opacity:.4;
      background:transparent;white-space:nowrap;transition:all .25s;cursor:pointer;
    }
    [data-theme="light"] .tab-btn{border-color:rgba(0,0,0,.08)}
    .tab-btn:hover{opacity:.65}
    .tab-btn.active{
      opacity:1;
      background:rgba(56,189,248,.12);border-color:rgba(56,189,248,.25);color:rgba(56,189,248,.9);
    }
    [data-theme="light"] .tab-btn.active{
      background:rgba(14,120,200,.1);border-color:rgba(14,120,200,.2);color:rgba(14,120,200,.9);
    }

    /* === Accordion === */
    .accordion-toggle{
      cursor:pointer;display:flex;align-items:center;justify-content:space-between;
      width:100%;padding:0;background:none;border:none;color:inherit;text-align:left;
    }
    .accordion-toggle:focus-visible{outline:2px solid rgba(56,189,248,.5);outline-offset:2px;border-radius:4px}
    .accordion-arrow{
      width:20px;height:20px;transition:transform .3s;flex-shrink:0;opacity:.35;
    }
    .accordion-content{
      display:grid;grid-template-rows:0fr;transition:grid-template-rows .35s ease;
    }
    .accordion-content.open{grid-template-rows:1fr}
    .accordion-content > div{overflow:hidden}
    .accordion-content.open + .accordion-arrow-wrap .accordion-arrow,
    .open ~ .accordion-arrow{transform:rotate(180deg)}

    /* === Ecosystem map === */
    .eco-map-wrap{margin:0 auto;max-width:720px}
    .eco-map-wrap svg{color:var(--text)}

    /* === Thesis block === */
    .thesis{
      max-width:600px;margin:0 auto;text-align:center;
      font-size:1.08rem;line-height:1.7;opacity:.6;
      padding:32px 24px;
      border-left:3px solid rgba(56,189,248,.25);
      border-right:3px solid rgba(56,189,248,.25);
      font-style:italic;
    }
    [data-theme="light"] .thesis{opacity:.7}

    /* === Starter grid === */
    .starter-item{
      display:flex;align-items:center;gap:10px;padding:10px 14px;
      border-radius:12px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.04);
      transition:background .2s;font-size:.82rem;
    }
    .starter-item:hover{background:rgba(255,255,255,.07)}
    [data-theme="light"] .starter-item{background:rgba(0,0,0,.02);border-color:rgba(0,0,0,.04)}
    [data-theme="light"] .starter-item:hover{background:rgba(0,0,0,.05)}
    .starter-name{font-family:'JetBrains Mono',monospace;font-size:.78rem;font-weight:500;opacity:.75;flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
    .starter-deploy{font-size:.65rem;opacity:.35;white-space:nowrap}

    /* === Reveal === */
    .reveal{opacity:0;transform:translateY(20px);transition:opacity .8s cubic-bezier(.2,.8,.2,1),transform .8s cubic-bezier(.2,.8,.2,1)}
    .reveal.visible{opacity:1;transform:none}

    /* === Accessibility: respect motion preferences === */
    @media (prefers-reduced-motion: reduce){
      *,*::before,*::after{
        animation-duration:0.01ms !important;
        animation-iteration-count:1 !important;
        transition-duration:0.01ms !important;
      }
      .reveal{opacity:1;transform:none}
    }

    /* === Accessibility: high contrast mode === */
    @media (prefers-contrast: more){
      .glass-card{
        backdrop-filter:none;
        background:var(--bg);
        border:2px solid var(--text);
      }
      .glass-fx,.glass-tint,.glass-shine{display:none}
    }

    /* === Mobile === */
    @media(max-width:640px){
      .flagship-grid{grid-template-columns:1fr !important}
      .catalog-grid{grid-template-columns:1fr !important}
      .starter-grid{grid-template-columns:1fr !important}
      .flagship-large .glass-content{padding:20px}
      .thesis{font-size:.95rem;padding:24px 16px}
    }
  </style>
</head>
<body>

  <!-- Ambient orbs -->
  <div class="scene" aria-hidden="true">
    <div class="orb orb-a"></div>
    <div class="orb orb-b"></div>
    <div class="orb orb-c"></div>
  </div>

  <!-- Nav -->
  <nav class="glass-nav">
    <div class="nav-inner">
      <span class="nav-brand">${esc(meta.name)}</span>
      <div style="display:flex;align-items:center;gap:16px">
        <a href="${esc(meta.github)}" target="_blank" rel="noopener" style="font-size:.82rem;opacity:.45;font-weight:500;transition:opacity .2s" onmouseover="this.style.opacity='.9'" onmouseout="this.style.opacity='.45'">GitHub</a>
        <button class="pill-btn" id="themeToggle" role="switch" aria-label="Toggle dark and light theme" aria-checked="false">
          <span id="themeIcon"></span>
        </button>
      </div>
    </div>
  </nav>

  <!-- 1. HERO -->
  <header style="position:relative;z-index:1;padding:calc(56px + 80px) 0 48px;text-align:center">
    <div style="max-width:720px;margin:0 auto;padding:0 20px">
      <div class="reveal" style="display:flex;flex-direction:column;align-items:center;gap:16px">
        <h1 style="font-size:clamp(2.4rem,7vw,4.5rem);font-weight:700;line-height:.98;letter-spacing:-.04em" class="profile-name">${esc(meta.name)}</h1>
      </div>
      <p class="reveal" data-delay="60" style="margin-top:16px;font-size:1.15rem;font-weight:600;opacity:.7">${esc(meta.tagline)}</p>
      <p class="reveal" data-delay="100" style="margin-top:8px;font-size:.9rem;opacity:.4">${esc(meta.bio)}</p>
    </div>
  </header>

  <!-- 2. ECOSYSTEM MAP -->
  <section style="position:relative;z-index:1;padding:0 0 48px">
    <div style="max-width:720px;margin:0 auto;padding:0 20px">
      <p class="section-label reveal">Ecosystem</p>
      <div class="glass-card reveal eco-map-wrap" data-delay="40">
        <div class="glass-fx"></div><div class="glass-tint"></div><div class="glass-shine"></div>
        <div class="glass-content" style="padding:16px 12px">
          ${buildEcoMapSVG()}
        </div>
      </div>
    </div>
  </section>

  <!-- 3. FLAGSHIP SECTION -->
  <section style="position:relative;z-index:1;padding:24px 0 40px">
    <div style="max-width:720px;margin:0 auto;padding:0 20px">
      <p class="section-label reveal">Flagship</p>
      ${buildFlagships()}
    </div>
  </section>

  <!-- 4. THESIS BLOCK -->
  <section style="position:relative;z-index:1;padding:32px 0 48px">
    <div style="max-width:720px;margin:0 auto;padding:0 20px">
      <div class="reveal" data-delay="40">
        <p class="thesis">${esc(meta.thesis)}</p>
      </div>
    </div>
  </section>

  <!-- 5. FULL CATALOG -->
  <section style="position:relative;z-index:1;padding:24px 0 40px">
    <div style="max-width:720px;margin:0 auto;padding:0 20px">
      <p class="section-label reveal">Catalog</p>
      <div class="tab-bar reveal" data-delay="20" role="tablist" aria-label="Filter projects by category">
        <button class="tab-btn active" role="tab" aria-selected="true" data-filter="all">All</button>
        <button class="tab-btn" role="tab" aria-selected="false" data-filter="foundation">Foundation</button>
        <button class="tab-btn" role="tab" aria-selected="false" data-filter="products">Products</button>
        <button class="tab-btn" role="tab" aria-selected="false" data-filter="tools">Tools</button>
        <button class="tab-btn" role="tab" aria-selected="false" data-filter="research">Research</button>
      </div>
      <div class="catalog-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:12px" role="tabpanel">
        ${buildCatalog()}
      </div>
    </div>
  </section>

  <!-- 6. STARTERS -->
  <section style="position:relative;z-index:1;padding:24px 0 48px">
    <div style="max-width:720px;margin:0 auto;padding:0 20px">
      <div class="glass-card reveal" data-delay="40">
        <div class="glass-fx"></div><div class="glass-tint"></div><div class="glass-shine"></div>
        <div class="glass-content" style="padding:20px 24px">
          <button class="accordion-toggle" id="starterToggle" aria-expanded="false" aria-controls="starterContent">
            <div>
              <p class="section-label" style="margin-bottom:4px">Starter Series</p>
              <p style="font-size:.82rem;opacity:.35">Clone &rarr; Push &rarr; Deployed &mdash; ${starterCount} CI/CD templates</p>
            </div>
            <svg class="accordion-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
          </button>
          <div class="accordion-content" id="starterContent" role="region" aria-labelledby="starterToggle">
            <div>
              <div class="starter-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:8px;padding-top:16px">
                ${buildStarters()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 7. FOOTER -->
  <footer style="position:relative;z-index:1;padding:32px 0;border-top:1px solid rgba(255,255,255,.04);text-align:center">
    <div style="max-width:720px;margin:0 auto;padding:0 20px">
      <a href="${esc(meta.github)}" target="_blank" rel="noopener" style="font-family:'JetBrains Mono',monospace;font-size:.82rem;opacity:.4;font-weight:500;transition:opacity .2s" onmouseover="this.style.opacity='.8'" onmouseout="this.style.opacity='.4'">${esc(meta.name)}</a>
      <p style="font-size:.72rem;opacity:.25;margin-top:8px">${projectCount} projects &middot; ${researchCount} publications &middot; ${starterCount} templates</p>
    </div>
  </footer>

  <script>
    // Theme toggle with ARIA
    (function(){
      var root=document.documentElement,toggle=document.getElementById('themeToggle'),icon=document.getElementById('themeIcon');
      function u(){
        var dark=root.dataset.theme==='dark';
        icon.textContent=dark?'\\u2600':'\\u263E';
        toggle.setAttribute('aria-checked',dark?'true':'false');
      }
      try{var s=localStorage.getItem('airmcp-theme');if(s)root.dataset.theme=s;}catch(e){}
      u();
      toggle.addEventListener('click',function(){
        root.dataset.theme=root.dataset.theme==='dark'?'light':'dark';
        try{localStorage.setItem('airmcp-theme',root.dataset.theme);}catch(e){}
        u();
      });
    })();

    // Scroll reveal with prefers-reduced-motion check
    (function(){
      if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){
        document.querySelectorAll('.reveal').forEach(function(el){el.classList.add('visible');});
        return;
      }
      var obs=new IntersectionObserver(function(entries){
        entries.forEach(function(e){
          if(e.isIntersecting){
            var d=parseInt(e.target.dataset.delay||0);
            setTimeout(function(){e.target.classList.add('visible');},d);
            obs.unobserve(e.target);
          }
        });
      },{threshold:0.1,rootMargin:'0px 0px -40px 0px'});
      document.querySelectorAll('.reveal').forEach(function(el){obs.observe(el);});
    })();

    // Tab filtering
    (function(){
      var tabs=document.querySelectorAll('.tab-btn');
      var cards=document.querySelectorAll('.catalog-card');
      tabs.forEach(function(tab){
        tab.addEventListener('click',function(){
          tabs.forEach(function(t){t.classList.remove('active');t.setAttribute('aria-selected','false');});
          tab.classList.add('active');
          tab.setAttribute('aria-selected','true');
          var filter=tab.dataset.filter;
          cards.forEach(function(card){
            var link=card.closest('.catalog-link');
            if(filter==='all'||card.dataset.category===filter){
              if(link)link.style.display='';
            }else{
              if(link)link.style.display='none';
            }
          });
        });
      });
    })();

    // Accordion
    (function(){
      var toggle=document.getElementById('starterToggle');
      var content=document.getElementById('starterContent');
      var arrow=toggle.querySelector('.accordion-arrow');
      toggle.addEventListener('click',function(){
        var open=content.classList.toggle('open');
        toggle.setAttribute('aria-expanded',open?'true':'false');
        arrow.style.transform=open?'rotate(180deg)':'';
      });
    })();
  </script>
</body>
</html>`;
}

// ---------------------------------------------------------------------------
// Generate README.md
// ---------------------------------------------------------------------------
function generateReadme() {
  const typingSvg = 'https://profilekit.vercel.app/api/typing?lines=' +
    encodeURIComponent(meta.tagline) +
    '&size=24&weight=500&color=e6edf3&align=center&width=500&height=45&speed=80';

  let md = `<div align="center">\n\n`;
  md += `<img src="${typingSvg}" alt="Typing" />\n\n`;
  md += `</div>\n\n---\n\n`;

  const catOrder = ['foundation', 'products', 'tools', 'research'];

  for (const cat of catOrder) {
    const projs = categories[cat];
    if (projs.length === 0) continue;
    md += `### ${CAT_LABELS[cat]}\n\n`;
    md += `| Project | Description |\n`;
    md += `|---------|-------------|\n`;
    for (const p of projs) {
      // For README, use plain description (unescape &amp; back to &)
      const desc = p.description.replace(/&amp;/g, '&');
      md += `| [${p.name}](https://github.com/${p.repo}) | ${desc} |\n`;
    }
    md += '\n';
  }

  md += `### Starter Series\n\n`;
  md += `> Clone \u2192 replace your code \u2192 push \u2192 deployed.\n\n`;
  md += `| Starter | Deploy to |\n`;
  md += `|---------|----------|\n`;
  for (const s of starters) {
    md += `| [${s.name}](https://github.com/${s.repo}) | ${s.deployTo} |\n`;
  }
  md += '\n';

  return md;
}

// ---------------------------------------------------------------------------
// Generate sitemap.xml
// ---------------------------------------------------------------------------
function generateSitemap() {
  const today = new Date().toISOString().slice(0, 10);
  let urls = `  <url>\n    <loc>https://heznpc.github.io/heznpc/</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>1.0</priority>\n  </url>\n`;

  for (const p of projects) {
    if (p.url && p.url.startsWith('https://heznpc.github.io/')) {
      urls += `  <url>\n    <loc>${esc(p.url)}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
    }
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}</urlset>
`;
}

// ---------------------------------------------------------------------------
// Write files
// ---------------------------------------------------------------------------
try {
  // Ensure docs/ directory exists
  const docsDir = path.join(ROOT, 'docs');
  if (!fs.existsSync(docsDir)) {
    fs.mkdirSync(docsDir, { recursive: true });
  }

  const html = generateHTML();
  fs.writeFileSync(HTML_PATH, html, 'utf8');
  console.log('[OK] docs/index.html (' + html.length + ' bytes)');

  const readme = generateReadme();
  fs.writeFileSync(README_PATH, readme, 'utf8');
  console.log('[OK] README.md (' + readme.length + ' bytes)');

  const sitemap = generateSitemap();
  fs.writeFileSync(SITEMAP_PATH, sitemap, 'utf8');
  console.log('[OK] docs/sitemap.xml (' + sitemap.length + ' bytes)');

  console.log('\nBuild complete. ' + projectCount + ' projects, ' + starterCount + ' starters.');
} catch (e) {
  fatal('Failed to write output files: ' + e.message);
}

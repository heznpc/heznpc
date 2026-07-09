#!/usr/bin/env node

let input = '';
for await (const chunk of process.stdin) input += chunk;

const packs = JSON.parse(input);
const blocked = [
  /^\.claude\//,
  /^\.codex\//,
  /^\.env(?:\.|$)/,
  /settings\.local\.json$/,
];

const leaked = packs
  .flatMap((pack) => pack.files.map((file) => file.path))
  .filter((path) => blocked.some((pattern) => pattern.test(path)));

if (leaked.length > 0) {
  for (const path of leaked) process.stderr.write(`  pack surface leak: ${path}\n`);
  process.exit(1);
}

process.stderr.write('  pack surface ok\n');

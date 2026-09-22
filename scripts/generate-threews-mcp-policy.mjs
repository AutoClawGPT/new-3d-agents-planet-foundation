#!/usr/bin/env node
import fs from 'node:fs';

const catalogPath = process.argv[2] ?? 'docs/research/snapshots/threews-mcp-catalog-2026-09-22.json';
const outputPath = process.argv[3] ?? 'templates/threews-mcp-policy.json';
const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
const prefix = (tool) => `mcp__${tool.server.id}__${tool.name}`;
const allow = [];
const ask = [];
const deny = [];

for (const tool of catalog.tools) {
  const id = prefix(tool);
  if (tool.safety === 'irreversible') deny.push(id);
  else if (tool.safety === 'write') ask.push(id);
  else if (tool.safety === 'read' && tool.price?.free === true) allow.push(id);
  else ask.push(id);
}

const policy = {
  source: 'https://three.ws/mcp-catalog.json',
  generatedAt: new Date().toISOString(),
  catalogCounts: catalog.counts,
  profile: 'strict',
  rules: {
    allow: 'free, catalog-labelled read-only tools only',
    ask: 'writes, paid tools, and tools whose safety label is not read-only',
    deny: 'irreversible tools until a human-approved project policy enables one exact tool'
  },
  allow,
  ask,
  deny
};
fs.writeFileSync(outputPath, `${JSON.stringify(policy, null, 2)}\n`);
console.log(`wrote ${outputPath}: ${allow.length} allow, ${ask.length} ask, ${deny.length} deny`);

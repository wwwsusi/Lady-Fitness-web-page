import test from 'node:test';
import assert from 'node:assert/strict';
import { calculate, DEFAULTS } from '../public/kalkulacky/prijem/prijem.mjs';
import { walk, PACKS, TREE } from '../public/kalkulacky/sprievodca/sprievodca.mjs';

const NOW = new Date('2026-11-24T10:00:00Z');

test('calculator: default woman losing weight gets a deficit, macros add up and the path moves down', () => {
  const r = calculate(DEFAULTS, NOW);
  assert.ok(r.kcal >= 1200 && r.kcal < r.tdee, 'deficit but not below the floor');
  assert.equal(r.mp + r.mf + r.mc, 100);
  assert.match(r.rateText, /^Budeš chudnúť/);
  assert.equal(r.miles.length, 4);
  assert.equal(r.miles.at(-1).w, '64');
  assert.ok(r.c <= 50, 'low-carb cap while losing');
});

test('calculator: invalid ages, heights and weights are rejected', () => {
  assert.equal(calculate({ ...DEFAULTS, by: '2020' }, NOW), null);
  assert.equal(calculate({ ...DEFAULTS, h: '90' }, NOW), null);
  assert.equal(calculate({ ...DEFAULTS, w: '10' }, NOW), null);
});

test('calculator: maintaining weight shows a flat path and the maintenance text', () => {
  const r = calculate({ ...DEFAULTS, tOn: false, goal: 'keep' }, NOW);
  assert.equal(r.rateText, 'Udržiavaš váhu');
  assert.equal(r.miles.length, 2);
  assert.equal(r.kcal, Math.round(r.tdee / 10) * 10);
});

test('calculator: carnivore has no carbohydrates and no high/low days; vegan raises protein', () => {
  const c = calculate({ ...DEFAULTS, diet: 'carn', cyc: '2' }, NOW);
  assert.equal(c.c, 0);
  assert.equal(c.cycOn, false);
  assert.ok(calculate({ ...DEFAULTS, diet: 'vegan' }, NOW).p >= calculate(DEFAULTS, NOW).p);
});

test('calculator: high/low days produce two day cards and a weekly average', () => {
  const r = calculate({ ...DEFAULTS, cyc: '2' }, NOW);
  assert.equal(r.cycOn, true);
  assert.equal(r.days.length, 2);
  assert.match(r.avgLine, /^Priemer týždňa \d+ kcal/);
});

test('guide: every path ends at a real pack and never at a hidden service', () => {
  const ids = new Set();
  const visit = (key, trail) => {
    const node = TREE[key];
    node.o.forEach((o, i) => {
      const next = trail.concat(i);
      if (o.p) { const { pack } = walk(next); assert.ok(pack, 'path ' + next + ' reaches a pack'); ids.add(pack.id); }
      else visit(o.n, next);
    });
  };
  visit('root', []);
  assert.ok(ids.size >= 6);
  // Only services that are ACTIVE/PILOT and AVAILABLE in the catalogue on 2026-11-24.
  const allowed = new Set(['LF-SVC-001', 'LF-SVC-002', 'LF-SVC-005', 'LF-SVC-015', 'LF-SVC-030', 'LF-SVC-031', 'LF-SVC-036']);
  for (const p of Object.values(PACKS)) assert.ok(allowed.has(p.id), p.id + ' must be a live catalogue service');
  const text = JSON.stringify(PACKS);
  for (const hidden of ['START S', 'START M', 'START L', 'PLUS', 'Seminár', 'jedálniček']) assert.ok(!text.includes(hidden), hidden + ' is not offered yet');
});

test('guide: a stale path is cut at the first unknown option', () => {
  const { answers, pack } = walk([0, 99]);
  assert.equal(answers.length, 1);
  assert.equal(pack, null);
});

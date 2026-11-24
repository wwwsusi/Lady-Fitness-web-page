import test from 'node:test';
import assert from 'node:assert/strict';
import { calculate, DEFAULTS } from '../public/kalkulacky/prijem/prijem.mjs';
import { walk, PACKS, TREE, applyLive, prune, priceText, euro, loadLive } from '../public/kalkulacky/sprievodca/sprievodca.mjs';

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

const CATALOGUE = [
  { id: 'LF-SVC-001', lifecycle: 'ACTIVE', price_eur: 6 }, { id: 'LF-SVC-002', lifecycle: 'ACTIVE', price_eur: 47 }, { id: 'LF-SVC-005', lifecycle: 'ACTIVE', price_eur: 57 },
  { id: 'LF-SVC-015', lifecycle: 'ACTIVE', price_eur: 18 }, { id: 'LF-SVC-030', lifecycle: 'ACTIVE', price_eur: 150 }, { id: 'LF-SVC-031', lifecycle: 'PILOT', price_eur: 8 }, { id: 'LF-SVC-036', lifecycle: 'PILOT', price_eur: 49 },
];

test('guide live: catalogue prices and pilot stage replace the built-in ones', () => {
  const live = applyLive(PACKS, CATALOGUE.map(x => x.id === 'LF-SVC-002' ? { ...x, price_eur: 49.5 } : x));
  assert.equal(Object.keys(live).length, Object.keys(PACKS).length);
  assert.equal(priceText(live.mem), '49,50 € / mesiac');
  assert.equal(priceText(live.trial), '6 €');
  assert.equal(live.start.pilot, true);
  assert.equal(live.pt.pilot, false);
  assert.equal(euro(49), '49 €');
});

test('guide live: an unavailable or unpriced service disappears, with its options and empty questions', () => {
  const live = applyLive(PACKS, CATALOGUE.filter(x => x.id !== 'LF-SVC-031' && x.id !== 'LF-SVC-036'));
  assert.equal(live.grp, undefined);
  assert.equal(live.start, undefined);
  const tree = prune(TREE, live);
  assert.ok(!tree.a1.o.some(o => o.p === 'start'), 'START option removed from the beginner question');
  assert.ok(!tree.t3.o.some(o => o.p === 'grp'), 'group training removed');
  assert.ok(tree.t3.o.length >= 2);
  // lose every personal-help service: the "trainer help" branch must vanish instead of leading to an empty question
  const noHelp = applyLive(PACKS, CATALOGUE.filter(x => !['LF-SVC-015', 'LF-SVC-031', 'LF-SVC-030'].includes(x.id)));
  const t2 = prune(TREE, noHelp);
  assert.ok(!t2.t1.o.some(o => o.n === 't3'), 'branch with no services is pruned');
  assert.ok(t2.root.o.every(o => o.n === 't1' || o.n === 'a1'));
  const bad = applyLive(PACKS, [{ id: 'LF-SVC-001', lifecycle: 'PREPARING', price_eur: 6 }, { id: 'LF-SVC-002', lifecycle: 'ACTIVE', price_eur: null }]);
  assert.deepEqual(Object.keys(bad), []);
  assert.equal(prune(TREE, bad).root.o.length, 0, 'nothing live: nothing offered');
});

test('guide live: loadLive returns services only for a clean OK answer and never throws', async () => {
  const ok = async url => { assert.match(url, /\?ids=LF-SVC-001,/); return { ok: true, json: async () => ({ result: 'OK', services: CATALOGUE }) }; };
  assert.equal((await loadLive(ok)).length, 7);
  assert.equal(await loadLive(async () => ({ ok: false, json: async () => ({ code: 'NOT_ACTIVE' }) })), null);
  assert.equal(await loadLive(async () => ({ ok: true, json: async () => ({ result: 'OK', services: 'x' }) })), null);
  assert.equal(await loadLive(async () => { throw new Error('offline'); }), null);
  assert.equal(await loadLive(() => new Promise(() => {}), 20), null, 'a hanging request is abandoned');
});

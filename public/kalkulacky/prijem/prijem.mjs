// Daily intake estimate (calories and macros) with a weight path chart. Pure client-side: nothing is stored or sent.
export const DEFAULTS = { sex: 'f', goal: 'lose', by: '1994', h: '170', w: '72', tw: '64', tOn: true, bf: '', work: 'mix', freq: '2', dur: '60', type: 'both', sleep: 'ok', stress: 'mid', diet: 'all', cyc: '0' };
const MO = ['jan', 'feb', 'mar', 'apr', 'máj', 'jún', 'júl', 'aug', 'sep', 'okt', 'nov', 'dec'];
const DIETS = { all: 'bez obmedzení', veg: 'vegetariánske', vegan: 'vegánske', lf: 'bez laktózy', carn: 'carnivore' };
const IDEAS = {
  all: ['Ovsená kaša s tvarohom a ovocím', 'Kuracie prsia, ryža, zelenina', 'Losos alebo vajíčka so zemiakmi', 'Grécky jogurt s orechmi'],
  veg: ['Vajíčka, celozrnný chlieb, paradajky', 'Cícer s ryžou a jogurtovým dresingom', 'Omeleta so zeleninou', 'Cottage cheese s ovocím'],
  vegan: ['Ovsená kaša so sójovým jogurtom', 'Šošovica alebo tofu s ryžou', 'Cícerové karbonátky so zemiakmi', 'Hummus s celozrnným chlebom'],
  lf: ['Ovsená kaša na rastlinnom nápoji', 'Moriak, ryža, zelenina', 'Ryba alebo vajíčka so zemiakmi', 'Bezlaktózový jogurt s orechmi'],
  carn: ['Vajíčka so slaninou', 'Hovädzí steak alebo mleté mäso s maslom', 'Losos alebo bravčové rebierka', 'Vajíčka natvrdo alebo jerky'],
};
const cm = v => String(Math.round(v * 10) / 10).replace('.', ',');

// Returns null for invalid input, otherwise every number the page shows.
export function calculate(s, now = new Date()) {
  const age = now.getFullYear() - +s.by, h = +s.h, w = +s.w, tw = +s.tw, bfv = parseFloat(String(s.bf).replace(',', '.'));
  if (!(age >= 14 && age <= 90 && h >= 120 && h <= 230 && w >= 30 && w <= 250)) return null;
  const n = +s.freq, dur = +s.dur;
  const diff = s.tOn && tw >= 30 && tw <= 250 ? tw - w : 0;
  const goal = Math.abs(diff) >= 1 ? (diff < 0 ? 'lose' : 'gain') : (s.goal === 'gain' ? 'gain' : s.goal === 'lose' && !s.tOn ? 'lose' : 'keep');
  const useBf = bfv >= 5 && bfv <= 60;
  const bmr = useBf ? 370 + 21.6 * w * (1 - bfv / 100) : 10 * w + 6.25 * h - 5 * age + (s.sex === 'm' ? 5 : -161);
  const neat = { sit: 1.2, mix: 1.35, act: 1.5 }[s.work];
  const tdee = bmr * neat + n * dur * { cardio: 8, str: 6, both: 7 }[s.type] * w / 70 / 7;
  const floor = Math.max(bmr, s.sex === 'm' ? 1500 : 1200);
  const kcal = Math.round(Math.max(tdee * { lose: 0.85, keep: 1, gain: 1.1 }[goal], floor) / 10) * 10;
  let pk = n === 0 ? 1.2 : n < 3 ? 1.4 : 1.6;
  if (n > 0) pk += { cardio: 0, str: 0.2, both: 0.1 }[s.type];
  if (goal === 'lose') pk += 0.2;
  if (goal === 'gain') pk += 0.1;
  if (s.diet === 'vegan') pk += 0.1;
  const p = Math.round(w * Math.min(pk, 2.2));
  const carn = s.diet === 'carn', lowc = goal === 'lose' && !carn;
  const cLow = Math.max(0, Math.min(50, Math.round((kcal - p * 4 - 0.8 * w * 9) / 4)));
  const f = carn ? Math.max(0, Math.round((kcal - p * 4) / 9)) : lowc ? Math.max(Math.round(0.8 * w), Math.round((kcal - p * 4 - cLow * 4) / 9)) : Math.round(Math.max(0.25 * kcal / 9, 0.8 * w));
  const c = carn ? 0 : lowc ? cLow : Math.max(0, Math.round((kcal - p * 4 - f * 9) / 4));
  const hiN = carn ? 0 : +s.cyc, cycOn = hiN > 0;
  const kL = Math.round((bmr - 500) / 10) * 10;
  const fMin = s.sex === 'f' ? 60 : Math.round(0.8 * w), fMax = s.sex === 'f' ? 80 : 999;
  const fL = Math.max(fMin, Math.min(fMax, Math.round((kL - 4 * Math.round(w * 2.2)) / 9)));
  const pL = Math.max(0, Math.round((kL - 9 * fL) / 4));
  const kH = Math.round(bmr * 1.5 / 10) * 10;
  const cH = Math.max(0, Math.min(200, Math.round((kH - p * 4 - 0.8 * w * 9) / 4)));
  const fH = Math.max(Math.round(0.8 * w), Math.round((kH - p * 4 - cH * 4) / 9));
  const kAvg = cycOn ? Math.round((hiN * kH + (7 - hiN) * kL) / 7) : kcal;
  const tot = p * 4 + f * 9 + c * 4;
  const mp = Math.round(p * 4 / tot * 100), mf = Math.round(f * 9 / tot * 100);
  // weight path
  const rate = Math.max(Math.abs(tdee - kAvg) * 7 / 7700, 0.1);
  const move = Math.abs(diff) >= 1, weeks = move ? Math.abs(diff) / rate : 0;
  const x0 = 50, x1 = 520, y0 = move ? (diff < 0 ? 40 : 205) : 120, y1 = move ? (diff < 0 ? 205 : 40) : 120;
  const dt = t => { const d = new Date(now.getTime() + t * weeks * 7 * 864e5); return d.getDate() + '. ' + MO[d.getMonth()] + (d.getFullYear() !== now.getFullYear() ? ' ' + d.getFullYear() : ''); };
  const pt = t => { const u = 1 - t; return { x: Math.round(u * u * u * x0 + 3 * u * u * t * (x0 + 170) + 3 * u * t * t * (x1 - 170) + t * t * t * x1), y: Math.round(y0 + (y1 - y0) * (3 * t * t - 2 * t * t * t)), w: w + diff * (3 * t * t - 2 * t * t * t) }; };
  const ts = move ? [0, 1 / 3, 2 / 3, 1] : [0, 1];
  const pts = ts.map((t, i) => Object.assign(pt(t), { t, i }));
  const names = ['Dnes', 'Míľnik 1', 'Míľnik 2', 'Cieľ'];
  const miles = pts.map(q => ({ d: move ? names[q.i] : q.i ? 'Udržiavaš' : 'Dnes', w: cm(q.w), t: q.i ? dt(q.t) : 'dnes' }));
  const gt = { lose: 'Mierny deficit asi 15 %.', keep: 'Zodpovedá tvojej spotrebe.', gain: 'Mierny prebytok asi 10 %.' }[goal];
  const tips = [];
  if (carn) tips.push('Carnivore nemá vlákninu a je veľmi obmedzujúci. Pri dlhodobom držaní sa poraď s lekárom alebo dietológom.');
  if (cycOn) tips.push('Vysoké a nízke dni: nízky deň je bazál − 500 kcal, 0 g sacharidov a tuky 60 až 80 g u žien, vysoký deň bazál × 1,5 a najviac 200 g sacharidov. Karty hore nahrádzajú bežný denný cieľ.');
  if (cycOn && kL < (s.sex === 'm' ? 1500 : 1200)) tips.push('Nízky deň vychádza na ' + kL + ' kcal, čo je pod bežným bezpečným minimom. Nedrž ho dlho a poraď sa s lekárom alebo dietológom.');
  if (lowc && !cycOn) tips.push('Pri chudnutí sú sacharidy najviac 50 g denne (nízkosacharidový režim). Nie je vhodný pre tehotné, dojčiace ani pri cukrovke na lieky. Dbaj na soľ, horčík a vodu.');
  if (s.sleep === 'low') tips.push('Spánok pod 6 hodín zvyšuje chuť na sladké a sťažuje deficit. Skús aspoň 7 hodín.');
  if (s.stress === 'high') tips.push('Pri strese ľudia viac prejedajú. Plánuj jedlá dopredu a maj poruke bielkovinovú desiatu.');
  return {
    kcal, bmr: Math.round(bmr), tdee: Math.round(tdee), p, f, c, mp, mf, mc: 100 - mp - mf, cycOn,
    fiber: carn ? 0 : Math.min(Math.round(kcal / 1000 * 14), lowc ? 20 : 99),
    water: cm(w * 0.033 + Math.min(n, 5) * 0.1),
    rateText: move ? (diff < 0 ? 'Budeš chudnúť ' : 'Budeš naberať ') + cm(rate) + ' kg týždenne' : 'Udržiavaš váhu',
    firstText: move ? 'Prvý míľnik je ' + dt(1 / 3) + ', ' + cm(pts[1].w) + ' kg' : gt,
    curve: 'M ' + x0 + ' ' + y0 + ' C ' + (x0 + 170) + ' ' + y0 + ' ' + (x1 - 170) + ' ' + y1 + ' ' + x1 + ' ' + y1 + ' L 740 ' + y1,
    dots: move ? pts.map(q => ({ x: q.x, y: q.y })) : [{ x: x0, y: y0 }], miles,
    days: [
      { name: 'Nízky deň · ' + (7 - hiN) + '× týždenne', kcal: kL, line: 'Bielkoviny ' + pL + ' g · Tuky ' + fL + ' g' + (s.sex === 'f' ? ' (živočíšne)' : '') + ' · Sacharidy 0 g', cls: 'low' },
      { name: 'Vysoký deň · ' + hiN + '× týždenne', kcal: kH, line: 'Bielkoviny ' + p + ' g · Tuky ' + fH + ' g · Sacharidy ' + cH + ' g', cls: 'high' },
    ],
    avgLine: 'Priemer týždňa ' + kAvg + ' kcal, spotreba asi ' + Math.round(tdee) + ' kcal',
    dietName: DIETS[s.diet],
    meals: [['Raňajky', 0.25, 0], ['Obed', 0.35, 1], ['Večera', 0.3, 2], ['Desiata', 0.1, 3]].map(([name, k, i]) => ({ name, kcal: Math.round(kcal * k / 10) * 10, idea: IDEAS[s.diet][i] })),
    tips,
  };
}

// ---- page ----
if (typeof document !== 'undefined' && document.getElementById('form')) {
  const $ = id => document.getElementById(id);
  const s = { ...DEFAULTS };
  const el = (tag, cls, text) => { const n = document.createElement(tag); if (cls) n.className = cls; if (text !== undefined) n.textContent = text; return n; };
  const tile = (cls, label, big, small) => { const t = el('div', 'tile ' + cls); t.append(el('b', '', label), el('strong', '', big), el('small', '', small)); return t; };

  function sync() {
    for (const seg of document.querySelectorAll('.seg')) for (const b of seg.children) b.setAttribute('aria-pressed', String(s[seg.dataset.key] === b.dataset.v));
    for (const i of document.querySelectorAll('input[data-key],select[data-key]')) if (document.activeElement !== i) i.value = s[i.dataset.key];
    $('tOn').setAttribute('aria-checked', String(s.tOn));
    $('twr').value = s.tw; $('twr').disabled = !s.tOn; $('tw').disabled = !s.tOn;
    $('trainOpts').hidden = !(+s.freq > 0);
  }
  function draw() {
    sync();
    const r = calculate(s);
    $('invalid').hidden = !!r; $('valid').hidden = !r;
    if (!r) return;
    $('rateText').textContent = r.rateText; $('firstText').textContent = r.firstText;
    $('curve').setAttribute('d', r.curve);
    $('dots').replaceChildren(...r.dots.map(d => { const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle'); c.setAttribute('cx', d.x); c.setAttribute('cy', d.y); c.setAttribute('r', 9); c.setAttribute('fill', '#4F7F26'); c.setAttribute('stroke', '#fff'); c.setAttribute('stroke-width', 3); return c; }));
    $('miles').replaceChildren(...r.miles.map(m => { const d = el('div'); d.append(el('b', '', m.d), document.createTextNode(m.w + ' kg · ' + m.t)); return d; }));
    $('cycBox').hidden = !r.cycOn; $('tiles').hidden = r.cycOn;
    $('days').replaceChildren(...r.days.map(d => { const x = el('div', 'day ' + d.cls); x.append(el('b', '', d.name), el('strong', '', d.kcal + ' kcal'), el('span', '', d.line)); return x; }));
    $('avgLine').textContent = r.avgLine;
    $('tiles').replaceChildren(tile('t-en', 'Energia', r.kcal + ' kcal', 'BMR ' + r.bmr + ' · spotreba ' + r.tdee), tile('t-p', 'Bielkoviny', r.p + ' g', r.mp + ' %'), tile('t-f', 'Tuky', r.f + ' g', r.mf + ' %'), tile('t-c', 'Sacharidy', r.c + ' g', r.mc + ' %'), tile('t-v', 'Vláknina', r.fiber + ' g', 'voda ' + r.water + ' l'));
    $('mealsTitle').textContent = 'Nápady na jedlá · ' + r.dietName;
    $('meals').replaceChildren(...r.meals.map(m => { const p = el('p', 'meal'); p.append(el('b', '', m.name), document.createTextNode(' · ' + m.kcal + ' kcal · ' + m.idea)); return p; }));
    $('tips').replaceChildren(...r.tips.map(t => el('div', 'tip', t)));
  }
  for (const seg of document.querySelectorAll('.seg')) seg.addEventListener('click', e => { const b = e.target.closest('button'); if (b) { s[seg.dataset.key] = b.dataset.v; draw(); } });
  for (const i of document.querySelectorAll('input[data-key],select[data-key]')) i.addEventListener('input', () => { s[i.dataset.key] = i.value; if (i.dataset.key === 'tw') $('twr').value = i.value; draw(); });
  $('twr').addEventListener('input', () => { s.tw = $('twr').value; draw(); });
  $('tOn').addEventListener('click', () => { s.tOn = !s.tOn; draw(); });
  draw();
}

// "Find your package" guide. Texts and the question flow live here (approved copy); what is REAL and AVAILABLE comes from the
// CRM catalogue through the public services endpoint: a service is shown only when its lifecycle is ACTIVE/PILOT, it is AVAILABLE and has a
// Current Price, and the price shown is the catalogue price. If the endpoint cannot be reached the guide falls back to the list below
// (services that were ACTIVE/PILOT and AVAILABLE on 2026-11-24). Not offered on purpose: START S/M/L and IMPULZ/MOTIVÁCIA/PREMENA (proposals),
// Membership PLUS (idea), the seminar (preparing) and the individual meal plan (paused).
// Override for testing: <html data-api="https://example/api/public-services">
export const PACKS = {
  trial: { id: 'LF-SVC-001', name: 'Jednorazový vstup', price: 6, suffix: '', items: [['1 vstup do fitness', 'Prídeš, kedy ti to vyhovuje, a vyskúšaš si cvičenie v priestore len pre ženy.']], benefit: 'Vyskúšaš si fitko bez záväzku.' },
  start: { id: 'LF-SVC-036', name: 'Lady Fitness START', price: 49, suffix: '', pilot: true, items: [
    ['Cca 60 minút podpory', 'Hodinu sa ti osobne venujeme: ukážeme ti, ako to u nás funguje, a odpovieme na tvoje otázky.'],
    ['InBody meranie', 'Zmeriame zloženie tvojho tela, aby si poznala svoje východiskové hodnoty.'],
    ['Orientácia vo fitness', 'Zoznámiš sa s priestorom a budeš vedieť, kde čo nájdeš.'],
    ['Ukážka 5–8 strojov alebo pomôcok', 'Prakticky si vyskúšaš najdôležitejšie stroje so správnym nastavením a technikou.'],
    ['Pripravený tréningový plán a vysvetlenie', 'Odídeš s plánom, ktorý môžeš hneď použiť.'],
  ], benefit: 'Dostaneš pomoc na začiatku a potom môžeš cvičiť sama.' },
  ten: { id: 'LF-SVC-005', name: '10 vstupov', price: 57, suffix: '', items: [['10 vstupov', 'Desať návštev, ktoré využiješ, kedy chceš, bez mesačného záväzku.'], ['Platnosť 6 mesiacov', 'Máš pol roka na ich využitie, takže cvičíš vo vlastnom rytme.']], benefit: 'Flexibilita bez mesačného záväzku.' },
  mem: { id: 'LF-SVC-002', name: 'Mesačná permanentka', price: 47, suffix: ' / mesiac', items: [['Pravidelný prístup do fitness', 'Chodíš, kedy ti to vyhovuje, za jednu pevnú mesačnú cenu.']], benefit: 'Jednoduché pravidelné cvičenie za pevnú cenu.' },
  pt: { id: 'LF-SVC-015', name: 'Osobný tréning', price: 18, suffix: ' + vstup', items: [['1 individuálny tréning', 'Jedna vedená hodina len pre teba s certifikovaným trénerom, zameraná presne na to, čo potrebuješ. Vstup sa platí zvlášť.']], benefit: 'Individuálna pomoc presne podľa tvojej potreby.' },
  grp: { id: 'LF-SVC-031', name: 'Skupinový tréning', price: 8, suffix: '', pilot: true, items: [['1 hodina vedeného kondične-silového tréningu', 'Hodina cvičenia pod vedením trénera, ktorá spája kondíciu a silu.'], ['Vstup počas tréningu', 'Vstup do fitness počas tréningu máš v cene.']], benefit: 'Odborné vedenie za nižšiu cenu než osobný tréning.' },
  plan: { id: 'LF-SVC-030', name: 'Tréningový plán na mieru', price: 150, suffix: '', items: [['Individuálny tréningový plán', 'Plán vytvorený presne pre teba, podľa tvojich možností a potrieb.'], ['3 osobné tréningy', 'Na troch vedených tréningoch si plán prejdeš a naučíš sa ho správne cvičiť.'], ['Vstup počas týchto tréningov', 'Vstup do fitness počas týchto tréningov máš v cene.']], benefit: 'Dostaneš konkrétny plán vytvorený pre teba.' },
};

// Decision tree: each option leads to another question (n) or to a pack (p).
export const TREE = {
  root: { q: 'Kde práve si?', o: [
    { l: 'Začínam', s: 'Fitko je pre mňa nové.', n: 'a1' },
    { l: 'Už cvičím', s: 'Poznám fitko a viem, ako to tu chodí.', n: 't1' } ] },
  a1: { q: 'Čo potrebuješ na začiatku?', o: [
    { l: 'Chcem si fitko iba vyskúšať', s: 'Bez záväzku, len jeden vstup.', p: 'trial' },
    { l: 'Potrebujem základnú pomoc', s: 'Zorientovať sa a odísť s plánom.', p: 'start' },
    { l: 'Chcem osobné vedenie od trénerky', s: 'Hodina len pre mňa.', p: 'pt' } ] },
  t1: { q: 'Čo ti dnes chýba?', o: [
    { l: 'Nič, cvičím sama', s: 'Potrebujem len prístup do fitness.', n: 't2' },
    { l: 'Chcem pomoc trénerky', s: 'Tréning alebo plán od trénerky.', n: 't3' } ] },
  t2: { q: 'Ako často chodíš?', o: [
    { l: 'Len občas', s: 'Platím len za vstup, keď prídem.', p: 'trial' },
    { l: 'Nepravidelne', s: 'Chcem flexibilitu bez mesačného záväzku.', p: 'ten' },
    { l: 'Pravidelne', s: 'Chcem pevnú mesačnú cenu.', p: 'mem' } ] },
  t3: { q: 'Akú pomoc chceš?', o: [
    { l: 'Individuálny tréning', s: 'Hodina len pre mňa.', p: 'pt' },
    { l: 'Vedený tréning v skupine', s: 'Odborné vedenie za nižšiu cenu než osobný tréning.', p: 'grp' },
    { l: 'Tréningový plán na mieru', s: 'Plán a 3 osobné tréningy.', p: 'plan' } ] },
};

// Walks the tree along the chosen option indexes. Pure, so it can be tested.
export function walk(path, tree = TREE, packs = PACKS) {
  let node = tree.root; const answers = []; let pack = null;
  for (let k = 0; k < path.length; k++) {
    const o = node.o[path[k]];
    if (!o) break;
    answers.push({ n: k + 1, q: node.q, a: o.l, index: k });
    if (o.p) { pack = packs[o.p] ?? null; break; }
    node = tree[o.n];
  }
  return { node, answers, pack };
}

export const euro = n => (Number.isInteger(n) ? String(n) : n.toFixed(2).replace('.', ',')) + ' €';
export const priceText = p => euro(p.price) + (p.suffix ?? '');

// Applies the catalogue answer: keeps only packs the catalogue returned (ACTIVE/PILOT, AVAILABLE, priced), with the catalogue price and stage.
export function applyLive(packs, services) {
  const byId = new Map((Array.isArray(services) ? services : []).filter(x => x && typeof x.id === 'string' && Number.isFinite(x.price_eur) && ['ACTIVE', 'PILOT'].includes(x.lifecycle)).map(x => [x.id, x]));
  const out = {};
  for (const [key, p] of Object.entries(packs)) {
    const live = byId.get(p.id);
    if (live) out[key] = { ...p, price: live.price_eur, pilot: live.lifecycle === 'PILOT' };
  }
  return out;
}

// Removes options that lead to an unavailable pack and questions that end up with no options.
export function prune(tree, packs) {
  const alive = {};
  const ok = key => {
    if (key in alive) return alive[key];
    alive[key] = false; // guards against cycles
    alive[key] = tree[key].o.some(o => (o.p ? Boolean(packs[o.p]) : ok(o.n)));
    return alive[key];
  };
  const out = {};
  for (const key of Object.keys(tree)) if (ok(key) || key === 'root') out[key] = { ...tree[key], o: tree[key].o.filter(o => (o.p ? Boolean(packs[o.p]) : ok(o.n))) };
  return out;
}

const API = (typeof document !== 'undefined' && document.documentElement.dataset.api) || 'https://lf-control-center.vercel.app/api/public-services';
export async function loadLive(fetchImpl = fetch, timeoutMs = 3500) {
  const ctl = new AbortController();
  let timer;
  const timeout = new Promise(resolve => { timer = setTimeout(() => { ctl.abort(); resolve(null); }, timeoutMs); });
  const request = (async () => {
    const ids = [...new Set(Object.values(PACKS).map(p => p.id))].join(',');
    const res = await fetchImpl(API + '?ids=' + ids, { method: 'GET', credentials: 'omit', referrerPolicy: 'no-referrer', signal: ctl.signal });
    const body = await res.json();
    return res.ok && body?.result === 'OK' && Array.isArray(body.services) ? body.services : null;
  })().catch(() => null);
  try { return await Promise.race([request, timeout]); } finally { clearTimeout(timer); }
}

if (typeof document !== 'undefined' && document.getElementById('left')) {
  let path = [], packs = PACKS, tree = TREE;
  const el = (tag, cls, text) => { const n = document.createElement(tag); if (cls) n.className = cls; if (text !== undefined) n.textContent = text; return n; };
  const btn = (cls, onClick) => { const b = el('button', cls); b.type = 'button'; b.addEventListener('click', onClick); return b; };
  function render() {
    const { node, answers, pack } = walk(path, tree, packs);
    const left = document.getElementById('left'), right = document.getElementById('right');
    left.replaceChildren(...answers.map(a => {
      const b = btn('answer', () => { path = path.slice(0, a.index); render(); });
      const t = el('span', 't'); t.append(el('small', '', a.q), el('b', '', a.a));
      b.append(el('span', 'n', String(a.n)), t, el('span', 'chg', 'Zmeniť')); return b;
    }));
    if (!pack) {
      const q = el('div', 'panel q'); q.append(el('div', 'k', 'OTÁZKA ' + (answers.length + 1)), el('h2', '', node.q));
      node.o.forEach((o, i) => { const b = btn('opt', () => { path = path.concat(i); render(); }); b.append(el('b', '', o.l), el('span', '', o.s)); q.append(b); });
      left.append(q);
      const e = el('div', 'empty'); e.append(el('div', 'kicker', 'TVOJ BALÍČEK'), el('b', '', 'Zobrazí sa tu'), el('span', 'note', 'Stačí odpovedať na 2 až 3 otázky vľavo. Môžeš sa kedykoľvek vrátiť a odpoveď zmeniť.'));
      right.replaceChildren(e);
    } else {
      left.append(btn('restart', () => { path = []; render(); }));
      left.lastChild.textContent = 'Začať odznova';
      const card = el('div', 'panel');
      const head = el('div', 'head'), l = el('div'); l.append(el('div', 'kicker', 'TVOJ BALÍČEK'), el('div', 'name', pack.name));
      if (pack.pilot) l.append(el('span', 'pilot', 'PILOTNÁ SLUŽBA'));
      head.append(l, el('div', 'price', priceText(pack)));
      const items = el('div', 'items'); for (const [t, d] of pack.items) { const i = el('div', 'item', t); i.append(el('small', '', d)); items.append(i); }
      card.append(head, el('div', 'kicker', 'ČO DOSTANEŠ'), items, el('div', 'benefit', pack.benefit));
      const contact = el('div', 'contact'), c1 = el('div'); c1.append(el('b', '', 'Dohodni si nezáväzný rozhovor'), el('small', '', 'Hrnčiarska 11, Humenné (vstup na poschodí) · Po–Pi 6:00–19:30, So–Ne 8:00–16:30'));
      const a = el('a', '', '+421 908 891 961'); a.href = 'tel:+421908891961'; contact.append(c1, a);
      right.replaceChildren(card, contact);
    }
  }
  const left = document.getElementById('left');
  left.append(el('p', 'note', 'Načítavam aktuálnu ponuku…'));
  loadLive().then(services => {
    if (services) {
      packs = applyLive(PACKS, services); tree = prune(TREE, packs);
      if (!tree.root.o.length) { left.replaceChildren(); document.getElementById('right').replaceChildren(el('div', 'empty', 'Sprievodca teraz nemá čo ponúknuť. Ozvi sa nám na +421 908 891 961.')); return; }
    }
    render();
  });
}

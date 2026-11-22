// Pass check for clients: the 8-digit card number or the card's QR code -> first name, pass status, validity and remaining entries.
// Reads from the Lady Fitness CRM through one public endpoint. Nothing is stored in the browser.
import jsQR from './jsqr.mjs';

// Override for testing: <html data-api="https://example/api/pass-check">
const API = document.documentElement.dataset.api || 'https://lf-control-center.vercel.app/api/pass-check';
const $ = id => document.getElementById(id);
const form = $('form'), codeInput = $('code'), checkBtn = $('check'), scanBtn = $('scan'), stopBtn = $('scan-stop'), scanRow = $('scan-row'),
  video = $('video'), msg = $('msg'), result = $('result');

const STATES = {
  ACTIVE: ['Platná', 'ok'],
  EXPIRED: ['Neplatná · vypršala', 'bad'],
  EXHAUSTED: ['Neplatná · vyčerpaná', 'bad'],
  NOT_ACTIVATED: ['Čaká na prvý vstup', 'warn'],
};
const skDate = iso => (typeof iso === 'string' && /^\d{4}-\d{2}-\d{2}/.test(iso)) ? iso.slice(8, 10).replace(/^0/, '') + '. ' + iso.slice(5, 7).replace(/^0/, '') + '. ' + iso.slice(0, 4) : '—';
const el = (tag, text, cls) => { const n = document.createElement(tag); if (text !== undefined) n.textContent = text; if (cls) n.className = cls; return n; };
const plural = n => n === 1 ? 'vstup' : (n >= 2 && n <= 4 ? 'vstupy' : 'vstupov');

function say(text, kind = 'error') { msg.textContent = text; msg.className = 'msg ' + kind; msg.hidden = !text; }
function clearResult() { result.replaceChildren(); result.hidden = true; }

function fact(dl, label, value) { const d = el('div'); d.append(el('dt', label), el('dd', value)); dl.append(d); }
function render(data) {
  clearResult();
  const who = data.first_name + (data.last_initial ? ' ' + data.last_initial : '');
  result.append(el('p', 'Ahoj, ' + who, 'hello'));
  if (!data.passes.length) { result.append(el('p', 'Zatiaľ pri tejto karte nevidíme žiadnu permanentku. Ak si ju práve kúpila, ozvi sa nám v štúdiu.', 'msg info')); }
  for (const p of data.passes) {
    const box = el('article', undefined, 'pass'), [label, tone] = STATES[p.state] || STATES.EXPIRED;
    box.append(el('h2', p.service), el('span', label, 'badge ' + tone));
    const dl = el('dl', undefined, 'facts');
    if (p.valid_from) fact(dl, 'Od', skDate(p.valid_from));
    fact(dl, 'Platí do', p.valid_until ? skDate(p.valid_until) : (p.state === 'NOT_ACTIVATED' ? 'Začne sa prvým vstupom' : '—'));
    if (p.kind === 'ENTRIES' && Number.isFinite(p.entries_left)) fact(dl, 'Zostáva', p.entries_left + ' z ' + p.entries_total + ' ' + plural(p.entries_total));
    else if (p.kind === 'TIME') fact(dl, 'Vstupy', 'Bez limitu');
    box.append(dl); result.append(box);
  }
  result.hidden = false; result.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function minutes(seconds) { const m = Math.max(1, Math.ceil(seconds / 60)); return m === 1 ? '1 minúte' : m + ' minútach'; }
let busy = false;
async function lookup(code) {
  if (busy) return; busy = true; checkBtn.disabled = true; say('Kontrolujem…', 'info'); clearResult();
  try {
    const res = await fetch(API, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ code }), credentials: 'omit', referrerPolicy: 'no-referrer', cache: 'no-store' });
    let body = null; try { body = await res.json(); } catch { /* handled by status */ }
    if (res.ok && body?.result === 'OK') { say(''); render(body); }
    else if (res.status === 404) say('Toto číslo sme nenašli. Skontroluj číslo na karte a skús znova.');
    else if (res.status === 429) say(body?.code === 'TEMPORARILY_UNAVAILABLE' ? 'Kontrola je chvíľu nedostupná. Skús to prosím o ' + minutes(body.retry_after_seconds) + '.' : 'Príliš veľa pokusov. Skús to znova o ' + minutes(body?.retry_after_seconds ?? 3600) + '.');
    else if (res.status === 400) say('Zadaj 8 číslic z karty alebo naskenuj QR kód.');
    else say('Kontrola momentálne nie je dostupná. Skús to neskôr alebo sa ozvi v štúdiu.');
  } catch { say('Nepodarilo sa pripojiť. Skontroluj internet a skús znova.'); }
  finally { busy = false; checkBtn.disabled = false; }
}

// Group the number as the card prints it: 1234 5678.
codeInput.addEventListener('input', () => {
  const d = codeInput.value.replace(/\D/g, '').slice(0, 8);
  codeInput.value = d.length > 4 ? d.slice(0, 4) + ' ' + d.slice(4) : d;
});
form.addEventListener('submit', e => {
  e.preventDefault();
  const d = codeInput.value.replace(/\D/g, '');
  if (d.length !== 8) { say('Číslo na karte má 8 číslic.'); codeInput.focus(); return; }
  lookup(d);
});

// Camera scanner (QR on the card contains LF1:<code>). The camera is always released when scanning ends.
let stream = null, timer = null;
const canvas = document.createElement('canvas'), ctx = canvas.getContext('2d', { willReadFrequently: true });
function stopScan() { clearInterval(timer); timer = null; if (stream) { for (const t of stream.getTracks()) t.stop(); stream = null; } video.srcObject = null; video.hidden = true; scanRow.hidden = true; }
function cameraError(e) {
  const n = e?.name;
  if (!window.isSecureContext || !navigator.mediaDevices?.getUserMedia) return 'Tento prehliadač nepodporuje kameru. Zadaj číslo z karty.';
  if (n === 'NotAllowedError' || n === 'SecurityError') return 'Prístup ku kamere je zablokovaný. Povoľ ju v nastaveniach prehliadača alebo zadaj číslo z karty.';
  if (n === 'NotFoundError' || n === 'OverconstrainedError') return 'Kamera sa nenašla. Zadaj číslo z karty.';
  return 'Kameru sa nepodarilo spustiť. Zadaj číslo z karty.';
}
async function startScan() {
  if (stream) return;
  try {
    if (!window.isSecureContext || !navigator.mediaDevices?.getUserMedia) throw Object.assign(Error('unsupported'), { name: 'NotSupported' });
    stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: 'environment' }, width: { ideal: 1280 } }, audio: false });
    video.srcObject = stream; video.hidden = false; scanRow.hidden = false; await video.play().catch(() => {});
    say('Priblíž QR kód z karty ku kamere.', 'info');
    timer = setInterval(() => {
      if (video.readyState < 2 || !video.videoWidth) return;
      const k = Math.min(1, 640 / video.videoWidth); canvas.width = Math.round(video.videoWidth * k); canvas.height = Math.round(video.videoHeight * k);
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const img = ctx.getImageData(0, 0, canvas.width, canvas.height), hit = jsQR(img.data, img.width, img.height, { inversionAttempts: 'dontInvert' });
      if (hit?.data) {
        if (/^LF1:[0-9a-f]{32}$/i.test(hit.data.trim())) { stopScan(); lookup(hit.data.trim()); }
        else say('Tento QR kód nie je karta Lady Fitness.');
      }
    }, 150);
  } catch (e) { stopScan(); say(cameraError(e)); }
}
scanBtn.addEventListener('click', startScan);
stopBtn.addEventListener('click', () => { stopScan(); say(''); });
window.addEventListener('pagehide', stopScan);
document.addEventListener('visibilitychange', () => { if (document.hidden) stopScan(); });

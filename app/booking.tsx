'use client';
import { useEffect, useState } from 'react';
import { flushSync } from 'react-dom';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
const services = [
  'Prvá návšteva fitness',
  'Permanentka',
  'Osobný tréning',
  'Strava a poradenstvo',
  'Záujem o pripravované kurzy',
  'Záujem o seminár',
  'Spolupráca — detská zumba',
  'Spolupráca — mobilita seniorov',
];
const FB = 'https://www.facebook.com/profile.php?id=100057866011115';
const MAP = 'https://www.google.com/maps/search/?api=1&query=Lady+Fitness+Hrn%C4%8Diarska+11+Humenn%C3%A9';
function messageFor(name: string, service: string, time: string) {
  return `Dobrý deň, mám záujem o: ${service}.${name ? ` Moje meno je ${name}.` : ''}${time ? ` Vyhovovalo by mi: ${time}.` : ''} Prosím o informácie a potvrdenie možností/termínu. Ďakujem.`;
}
type Registry = {
  registerTool: (
    tool: {
      name: string;
      title: string;
      description: string;
      inputSchema: object;
      annotations: object;
      execute: (input: unknown) => unknown;
    },
    options: { signal: AbortSignal },
  ) => void | Promise<void>;
};
export default function Booking() {
  const [name, setName] = useState('');
  const [service, setService] = useState(services[0]);
  const [time, setTime] = useState('');
  const [message, setMessage] = useState('');
  const [notice, setNotice] = useState('');
  useEffect(() => {
    const ctx = (document as Document & { modelContext?: Registry })
      .modelContext;
    if (!ctx) return;
    const ctl = new AbortController();
    try {
      Promise.resolve(
        ctx.registerTool(
          {
            name: 'prepare_visit_sms',
            title: 'Pripraviť žiadosť o návštevu',
            description:
              'Pripraví viditeľný návrh SMS pre Lady Fitness. Nič neodosiela a nepotvrdzuje rezerváciu.',
            inputSchema: {
              type: 'object',
              properties: {
                name: { type: 'string', maxLength: 60 },
                service: { type: 'string', enum: services },
                preferredTime: { type: 'string', maxLength: 100 },
              },
              required: ['service'],
              additionalProperties: false,
            },
            annotations: { readOnlyHint: false },
            execute(input) {
              if (!input || typeof input !== 'object')
                throw Error('Neplatný vstup');
              const d = input as Record<string, unknown>;
              if (
                Object.keys(d).some(
                  (k) => !['name', 'service', 'preferredTime'].includes(k),
                ) ||
                typeof d.service !== 'string' ||
                !services.includes(d.service) ||
                (d.name !== undefined &&
                  (typeof d.name !== 'string' || d.name.length > 60)) ||
                (d.preferredTime !== undefined &&
                  (typeof d.preferredTime !== 'string' ||
                    d.preferredTime.length > 100))
              )
                throw Error('Neplatná služba alebo text');
              const n = (d.name as string | undefined)?.trim() ?? '';
              const t = (d.preferredTime as string | undefined)?.trim() ?? '';
              const s = d.service;
              const text = messageFor(n, s, t);
              flushSync(() => {
                setName(n);
                setService(s);
                setTime(t);
                setMessage(text);
                setNotice('Návrh je pripravený. Správa ešte nebola odoslaná.');
              });
              document.getElementById('objednanie')?.scrollIntoView();
              return { status: 'draft', message: text, sent: false };
            },
          },
          { signal: ctl.signal },
        ),
      ).catch(() => {});
    } catch {}
    return () => ctl.abort();
  }, []);
  function edit() {
    setMessage('');
    setNotice('');
  }
  async function copy() {
    try {
      await navigator.clipboard.writeText(message);
      setNotice(
        'Text je skopírovaný. Vlož ho do SMS alebo správy na Facebooku a odošli.',
      );
    } catch {
      setNotice(
        'Kopírovanie nie je dostupné. Označ a skopíruj text správy ručne.',
      );
    }
  }
  return (
    <section id="objednanie" className="wrap section booking-section">
      <div>
        <p className="eyebrow">Dohodni si návštevu</p>
        <h2>
          Vyber si svoj
          <br />
          spôsob kontaktu.
        </h2>
        <p className="booking-explainer single-line-copy">
          Príď osobne, zavolaj alebo nám napíš. Ak si chceš pripraviť správu,
          generátor nájdeš hneď vedľa.
        </p>
        <div className="contact-options">
          <a href={MAP} target="_blank" rel="noreferrer"><strong>Príď osobne</strong><span>Hrnčiarska 11, Humenné ↗</span></a>
          <a href="tel:+421908891961"><strong>Zavolaj</strong><span>+421 908 891 961 ↗</span></a>
          <a href={FB} target="_blank" rel="noreferrer"><strong>Napíš správu</strong><span>Facebook Lady Fitness ↗</span></a>
        </div>
      </div>
      <form
        className="booking-form"
        onSubmit={(e) => {
          e.preventDefault();
          setMessage(messageFor(name.trim(), service, time.trim()));
          setNotice('Návrh je pripravený. Správa ešte nebola odoslaná.');
        }}
      >
        <div className="booking-form-intro">
          <strong>Oslov nás cez správu</strong>
          <span>Priprav správu a pošli ju cez SMS alebo Facebook Messenger.</span>
        </div>
        <label htmlFor="visit-service">O čo máš záujem?</label>
        <Select
          value={service}
          onValueChange={(v) => {
            if (v) {
              setService(v);
              edit();
            }
          }}
        >
          <SelectTrigger id="visit-service" className="booking-select">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {services.map((s) => (
              <SelectItem value={s} key={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <label htmlFor="visit-name">
          Tvoje meno <span>(nepovinné)</span>
        </label>
        <Input
          id="visit-name"
          autoComplete="given-name"
          value={name}
          maxLength={60}
          onChange={(e) => {
            setName(e.target.value);
            edit();
          }}
          placeholder="Ako ťa môžeme osloviť?"
        />
        <label htmlFor="visit-time">
          Kedy ti to vyhovuje? <span>(nepovinné)</span>
        </label>
        <Input
          id="visit-time"
          value={time}
          maxLength={100}
          onChange={(e) => {
            setTime(e.target.value);
            edit();
          }}
          placeholder="Napríklad budúci týždeň po 16:00"
        />
        <p className="booking-note">
          Údaje sa na tomto webe neukladajú. Správu odošleš sama vo svojej
          aplikácii; nepíš sem zdravotné informácie.
        </p>
        <button className="button" type="submit">
          Pripraviť správu ↗
        </button>
        {message && (
          <div className="sms-preview">
            <h3>Tvoja správa</h3>
            <p className="sms-text">{message}</p>
            <a
              className="button lime"
              href={`sms:+421908891961?body=${encodeURIComponent(message)}`}
              onClick={(e) => {
                if (/iPad|iPhone|iPod/.test(navigator.userAgent))
                  e.currentTarget.href = `sms:+421908891961&body=${encodeURIComponent(message)}`;
              }}
            >
              Otvoriť v SMS ↗
            </a>
            <button type="button" className="copy-button" onClick={copy}>
              Skopírovať text
            </button>
            <p className="booking-note">
              Na počítači môžeš text skopírovať a poslať cez{' '}
              <a
                href="https://www.facebook.com/profile.php?id=100057866011115"
                target="_blank"
                rel="noreferrer"
              >
                Facebook Lady Fitness
              </a>
              . SMS aplikácia musí byť v zariadení dostupná.
            </p>
          </div>
        )}
        <p role="status" className="booking-status">
          {notice}
        </p>
      </form>
    </section>
  );
}

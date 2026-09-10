'use client';
import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { assetPath } from './site-config';
export const scenes = [
  {
    id: 'priestor',
    label: 'Tvoj priestor',
    image: assetPath('/illustrations/priestor.webp'),
    alt: 'Tréningový priestor Lady Fitness s posilňovacími strojmi a modrými sedadlami.',
    first: 'Tvoja sila.',
    last: 'Tvoj priestor.',
    description:
      'Vypni svet. Zapni seba. Pohyb, podpora a čas pre teba — v kruhu žien, ktoré ti rozumejú.',
    cta: 'Spoznaj našu ponuku',
    href: '#ponuka',
  },
  {
    id: 'pohyb',
    label: 'Tvoj pohyb',
    image: assetPath('/illustrations/pohyb.webp'),
    alt: 'Ženy cvičia spoločne v priestoroch Lady Fitness.',
    first: 'Začni tam,',
    last: 'kde práve si.',
    description:
      'Vlastné tempo. Prvý tréning aj nový cieľ. Daj pohybu miesto vo svojom každodennom živote.',
    cta: 'Dohodni si prvý krok',
    href: '#prva-navsteva',
  },
  {
    id: 'komunita',
    label: 'Tvoja komunita',
    image: assetPath('/illustrations/komunita.webp'),
    alt: 'Komunitné stretnutie žien v Lady Fitness.',
    first: 'Spolu sa',
    last: 'hýbe ľahšie.',
    description:
      'Stretni ľudí, pri ktorých môžeš byť sama sebou. Dopraj si pohyb, rozhovor a chvíľu pre seba.',
    cta: 'Objav čas pre seba',
    href: '#psychohygiena',
  },
];
export default function ScrollStory() {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const panels = useRef<(HTMLElement | null)[]>([]);
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(0);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setEnabled(!media.matches);
    const change = () => {
      setEnabled(!media.matches);
    };
    media.addEventListener('change', change);
    return () => media.removeEventListener('change', change);
  }, []);
  useEffect(() => {
    if (!enabled) return;
    const timer = window.setInterval(() => {
      if (!document.hidden && root.current) {
        const rect = root.current.getBoundingClientRect();
        if (rect.bottom > 0 && rect.top < window.innerHeight) {
          setActive(current => (current + 1) % scenes.length);
        }
      }
    }, 6000);
    return () => window.clearInterval(timer);
  }, [enabled, active]);
  function jump(index: number) {
    setActive(index);
  }
  function toggleMotion(value: boolean) {
    setEnabled(value);
    setActive(0);
  }
  return (
    <section
      ref={root}
      className={`scroll-story scroll-story--film ${enabled ? 'film-playing' : 'film-paused'}`}
      aria-label="Príbeh Lady Fitness"
    >
      <div className="story-stage" ref={stage}>
        <div className="story-top">
          <p>
            <span />
            LADY FITNESS · HUMENNÉ
          </p>
          <div className="motion-control">
            {(
              <>
                <label htmlFor="story-motion">{enabled ? 'Prehrávanie' : 'Spustiť film'}</label>
                <Switch
                  id="story-motion"
                  checked={enabled}
                  onCheckedChange={toggleMotion}
                  className="story-switch"
                />
              </>
            )}
          </div>
        </div>
        <div className="story-scenes">
          {scenes.map((scene, i) => (
            <article
              key={scene.id}
              ref={(el) => {
                panels.current[i] = el;
              }}
              className={`story-scene story-scene-${i}`}
              aria-hidden={active !== i}
              inert={active !== i}
              style={
                { '--scene-opacity': active === i ? 1 : 0, '--copy-opacity': active === i ? 1 : 0 } as React.CSSProperties
              }
            >
              <img
                className="story-art"
                src={scene.image}
                alt={`${scene.alt} Ilustrované spracovanie.`}
                width={1672}
                height={941}
                fetchPriority={i === 0 ? 'high' : 'auto'}
                decoding="async"
              />
              <div className="story-wash" />
              <div className="story-copy">
                <p className="story-kicker">
                  0{i + 1} / {scene.label}
                </p>
                {i === 0 ? (
                  <h1>
                    {scene.first}
                    {' '}
                    <em>{scene.last}</em>
                  </h1>
                ) : (
                  <h2>
                    {scene.first}
                    {' '}
                    <em>{scene.last}</em>
                  </h2>
                )}
                <p className="story-description">{scene.description}</p>
                <a className="button" href={scene.href}>
                  {scene.cta}
                  <ArrowUpRight size={19} />
                </a>
              </div>
              <p className="art-note">Ilustrované podľa fotografií Lady Fitness</p>
            </article>
          ))}
        </div>
        <div className="story-bottom">
          <nav className="banner-template" aria-label="Kapitoly príbehu">
            {scenes.map((scene, i) => (
              <button
                type="button"
                key={scene.id}
                onClick={() => jump(i)}
                aria-current={active === i ? 'step' : undefined}
              >
                <span>0{i + 1}</span>
                {scene.label}
              </button>
            ))}
          </nav>
          <p className="scroll-hint">Pokračuj nižšie <ArrowDown size={18} /></p>
        </div>
        <div className="story-progress" aria-hidden="true" />
      </div>
    </section>
  );
}

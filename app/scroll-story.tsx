'use client';
import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { sceneWeights } from './story-progress';
const scenes = [
  {
    id: 'priestor',
    label: 'Tvoj priestor',
    image: '/illustrations/priestor.webp',
    alt: 'Kreslená interpretácia skutočných priestorov Lady Fitness: drevená podlaha, zrkadlá a tréningové vybavenie.',
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
    image: '/illustrations/pohyb.webp',
    alt: 'Kreslená scéna žien pri spoločnom cvičení podľa fotografie z Lady Fitness.',
    first: 'Začni tam,',
    last: 'kde práve si.',
    description:
      'Vlastné tempo. Prvý tréning aj nový cieľ. Daj pohybu miesto vo svojom každodennom živote.',
    cta: 'Dohodni si prvý krok',
    href: '#objednanie',
  },
  {
    id: 'komunita',
    label: 'Tvoja komunita',
    image: '/illustrations/komunita.webp',
    alt: 'Kreslená interpretácia komunitného stretnutia žien v Lady Fitness.',
    first: 'Spolu sa',
    last: 'hýbe ľahšie.',
    description:
      'Stretni ľudí, pri ktorých môžeš byť sama sebou. Dopraj si pohyb, rozhovor a chvíľu pre seba.',
    cta: 'Objav čas pre seba',
    href: '#psychohygiena',
  },
];
const clamp = (n: number) => Math.max(0, Math.min(1, n));
export default function ScrollStory() {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const panels = useRef<(HTMLElement | null)[]>([]);
  const lastActive = useRef(0);
  const [enabled, setEnabled] = useState(false);
  const [systemReduced, setSystemReduced] = useState(false);
  const [active, setActive] = useState(0);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setSystemReduced(media.matches);
    setEnabled(!media.matches);
    const change = () => {
      setSystemReduced(media.matches);
      setEnabled(!media.matches);
    };
    media.addEventListener('change', change);
    return () => media.removeEventListener('change', change);
  }, []);
  useEffect(() => {
    if (!enabled || !root.current || !stage.current) return;
    let frame = 0;
    let visible = true;
    const update = () => {
      frame = 0;
      if (!root.current || !stage.current) return;
      const rect = root.current.getBoundingClientRect();
      const top = parseFloat(getComputedStyle(stage.current).top) || 0;
      const range = Math.max(
        1,
        root.current.offsetHeight - stage.current.offsetHeight,
      );
      const progress = clamp((top - rect.top) / range);
      const weights = sceneWeights(progress, scenes.length);
      const index = weights.indexOf(Math.max(...weights));
      weights.forEach((weight, i) => {
        const panel = panels.current[i];
        if (!panel) return;
        panel.style.setProperty('--scene-opacity', String(weight));
        panel.style.setProperty(
          '--copy-opacity',
          String(clamp((weight - 0.45) / 0.55)),
        );
        panel.style.setProperty(
          '--scene-shift',
          `${(i - progress * (scenes.length - 1)) * 18}px`,
        );
        panel.style.setProperty(
          '--scene-scale',
          String(1.035 + progress * 0.045),
        );
      });
      root.current.style.setProperty('--story-progress', String(progress));
      if (lastActive.current !== index) {
        lastActive.current = index;
        setActive(index);
      }
    };
    const queue = () => {
      if (visible && !frame) frame = requestAnimationFrame(update);
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) queue();
    });
    observer.observe(root.current);
    const resize = new ResizeObserver(queue);
    resize.observe(root.current);
    resize.observe(stage.current);
    window.addEventListener('scroll', queue, { passive: true });
    window.addEventListener('resize', queue);
    queue();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      resize.disconnect();
      window.removeEventListener('scroll', queue);
      window.removeEventListener('resize', queue);
    };
  }, [enabled]);
  function jump(index: number) {
    if (!root.current || !stage.current) return;
    if (!enabled) {
      panels.current[index]?.scrollIntoView({
        behavior: 'auto',
        block: 'start',
      });
      return;
    }
    const top = parseFloat(getComputedStyle(stage.current).top) || 0;
    const start =
      root.current.getBoundingClientRect().top + window.scrollY - top;
    const range = root.current.offsetHeight - stage.current.offsetHeight;
    window.scrollTo({
      top: start + (range * index) / (scenes.length - 1),
      behavior: 'smooth',
    });
  }
  function toggleMotion(value: boolean) {
    const top = root.current?.getBoundingClientRect().top ?? 0;
    setEnabled(value);
    setActive(0);
    lastActive.current = 0;
    if (top < 0)
      root.current?.scrollIntoView({ behavior: 'instant', block: 'start' });
  }
  return (
    <section
      ref={root}
      className={`scroll-story ${enabled ? 'scroll-story--animated' : 'scroll-story--still'}`}
      aria-label="Príbeh Lady Fitness"
    >
      <div className="story-stage" ref={stage}>
        <div className="story-top">
          <p>
            <span />
            LADY FITNESS · HUMENNÉ
          </p>
          <div className="motion-control">
            {systemReduced ? (
              <span>Pokojné zobrazenie</span>
            ) : (
              <>
                <label htmlFor="story-motion">Pohyb</label>
                <Switch
                  id="story-motion"
                  checked={enabled}
                  onCheckedChange={toggleMotion}
                  className="story-switch"
                />
              </>
            )}
            <a href="#ponuka">
              Preskočiť príbeh <ArrowDown size={14} />
            </a>
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
              aria-hidden={enabled && active !== i}
              inert={enabled && active !== i}
              style={
                { '--scene-opacity': i === 0 ? 1 : 0 } as React.CSSProperties
              }
            >
              <img
                className="story-art"
                src={scene.image}
                alt={scene.alt}
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
                    <br />
                    <em>{scene.last}</em>
                  </h1>
                ) : (
                  <h2>
                    {scene.first}
                    <br />
                    <em>{scene.last}</em>
                  </h2>
                )}
                <p className="story-description">{scene.description}</p>
                <a className="button" href={scene.href}>
                  {scene.cta}
                  <ArrowUpRight size={19} />
                </a>
              </div>
              <p className="art-note">
                Ilustrované podľa fotografií Lady Fitness
              </p>
            </article>
          ))}
        </div>
        <div className="story-bottom">
          <nav aria-label="Kapitoly príbehu">
            {scenes.map((scene, i) => (
              <button
                type="button"
                key={scene.id}
                onClick={() => jump(i)}
                aria-current={enabled && active === i ? 'step' : undefined}
              >
                <span>0{i + 1}</span>
                {scene.label}
              </button>
            ))}
          </nav>
          <p className="scroll-hint">
            {enabled ? 'Pokračuj scrollovaním' : 'Príbeh bez animácií'}
            <ArrowDown size={18} />
          </p>
        </div>
        <div className="story-progress" aria-hidden="true" />
      </div>
    </section>
  );
}

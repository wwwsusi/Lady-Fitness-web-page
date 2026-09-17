'use client';

import { ArrowDown, ArrowUpRight, Footprints, Pause, Play } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { assetPath } from '../site-config';
import styles from './v4.module.css';

const scenes = [
  {
    id: 'vstup',
    number: '01',
    label: 'Vstup',
    kicker: 'ZAČÍNAME PRI VSTUPE',
    title: 'Vstúp. Toto je tvoj priestor.',
    text: 'Za týmito dverami nájdeš dámske fitness, kde môžeš začať pokojne a bez porovnávania.',
    cta: 'Dohodni si prvú návštevu',
    href: '#prva-navsteva',
    image: 'vstup.webp',
    direction: 1,
  },
  {
    id: 'recepcia',
    number: '02',
    label: 'Recepcia',
    kicker: 'PRVÁ ZASTÁVKA',
    title: 'Najprv pokojne. Potom podľa seba.',
    text: 'Na recepcii spolu prejdeme, čo potrebuješ. Prvá návšteva má byť zrozumiteľná, nie stresujúca.',
    cta: 'Ako prebieha prvá návšteva',
    href: '#prva-navsteva',
    image: 'recepcia.webp',
    direction: -1,
  },
  {
    id: 'sala',
    number: '03',
    label: 'Pohybová sála',
    kicker: 'PRIESTOR PRE POHYB',
    title: 'Rozhýb sa vo vlastnom tempe.',
    text: 'Otvorená sála dáva miesto tréningu, mobilite aj chvíli, keď sa potrebuješ jednoducho nadýchnuť.',
    cta: 'Spoznaj našu ponuku',
    href: '#ponuka',
    image: 'sala.webp',
    direction: 1,
  },
  {
    id: 'sila',
    number: '04',
    label: 'Silová zóna',
    kicker: 'SILA BEZ POROVNÁVANIA',
    title: 'Sila rastie vlastným tempom.',
    text: 'Stroje, voľné váhy a osobný prístup ti pomôžu budovať istotu krok za krokom.',
    cta: 'Pozrieť možnosti tréningu',
    href: '#ponuka',
    image: 'sila.webp',
    direction: -1,
  },
  {
    id: 'kardio',
    number: '05',
    label: 'Kardio zóna',
    kicker: 'TVOJ RYTMUS',
    title: 'Tvoj pohyb. Tvoj rytmus.',
    text: 'Kondícia nemusí byť pretek. Vyber si tempo, ktoré ti dnes sedí, a zajtra sa vráť o kúsok silnejšia.',
    cta: 'Pozrieť cenník',
    href: '#cennik',
    image: 'kardio.webp',
    direction: 1,
  },
];

export default function Journey() {
  const root = useRef<HTMLElement>(null);
  const layers = useRef<(HTMLDivElement | null)[]>([]);
  const meter = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [autoplay, setAutoplay] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const frame = requestAnimationFrame(() => setAutoplay(!preference.matches));
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (autoplay) {
      layers.current.forEach((layer, index) => {
        if (!layer) return;
        layer.style.opacity = index === active ? '1' : '0';
        const direction = scenes[index].direction;
        layer.style.transform = index === active
          ? `scale(1.045) translate3d(${direction * -0.8}%, 0, 0)`
          : `scale(1.12) translate3d(${direction * 2.4}%, 0, 0)`;
      });
      if (meter.current) meter.current.style.transform = `scaleX(${active / (scenes.length - 1)})`;
      return;
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      if (!root.current) return;
      const rect = root.current.getBoundingClientRect();
      const distance = Math.max(1, rect.height - window.innerHeight);
      const progress = Math.max(0, Math.min(1, -rect.top / distance));
      const position = progress * (scenes.length - 1);
      setActive(Math.round(position));
      if (meter.current) meter.current.style.transform = `scaleX(${progress})`;

      layers.current.forEach((layer, index) => {
        if (!layer) return;
        const delta = position - index;
        const visible = Math.max(0, 1 - Math.abs(delta));
        const local = Math.max(-1, Math.min(1, delta));
        const x = local * scenes[index].direction * -3.4;
        const y = local * -1.15;
        const scale = 1.035 + Math.abs(local) * 0.095;
        layer.style.opacity = String(visible);
        layer.style.transform = `scale(${scale}) translate3d(${x}%, ${y}%, 0)`;
      });
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [active, autoplay]);

  useEffect(() => {
    if (!autoplay) return;
    const timer = window.setInterval(() => {
      setActive((index) => (index + 1) % scenes.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [autoplay]);

  const goTo = (index: number) => {
    if (autoplay || !root.current) {
      setActive(index);
      return;
    }
    const top = root.current.getBoundingClientRect().top + window.scrollY;
    const distance = root.current.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + distance * index / (scenes.length - 1), behavior: 'smooth' });
  };

  return (
    <section ref={root} className={styles.journey} aria-label="Ilustrovaná prechádzka Lady Fitness">
      <div className={styles.stage}>
        <div className={styles.layers} aria-hidden="true">
          {scenes.map((scene, index) => (
            <div
              className={styles.layer}
              key={scene.id}
              ref={(element) => { layers.current[index] = element; }}
              style={{ opacity: index === active ? 1 : 0 }}
            >
              <Image src={assetPath(`/v4/${scene.image}`)} alt="" fill sizes="100vw" priority={index === 0} />
            </div>
          ))}
        </div>
        <div className={styles.wash} />

        <div className={styles.topline}>
          <span><Footprints size={17} aria-hidden="true" /> ILUSTROVANÁ PRECHÁDZKA · LADY FITNESS</span>
          <button type="button" onClick={() => setAutoplay((value) => !value)} aria-pressed={autoplay}>
            {autoplay ? <Pause size={16} aria-hidden="true" /> : <Play size={16} aria-hidden="true" />}
            {autoplay ? 'Pozastaviť pohyb' : 'Spustiť pohyb'}
          </button>
        </div>

        <div className={styles.copy} key={active}>
          <p className={styles.kicker}><span>{scenes[active].number}</span>{scenes[active].kicker}</p>
          <h1>{scenes[active].title}</h1>
          <p className={styles.lead}>{scenes[active].text}</p>
          <a className={styles.cta} href={scenes[active].href}>{scenes[active].cta}<ArrowUpRight size={20} aria-hidden="true" /></a>
        </div>

        <div className={styles.bottom}>
          <div className={styles.scrollHint}>
            {autoplay ? <Play size={18} aria-hidden="true" /> : <ArrowDown size={20} aria-hidden="true" />}
            <span>{autoplay ? 'Prehliadka sa prehráva automaticky' : 'Roluj a prejdi sa fitkom'}</span>
          </div>
          <nav className={styles.stops} aria-label="Zastávky prechádzky">
            {scenes.map((scene, index) => (
              <button type="button" key={scene.id} onClick={() => goTo(index)} aria-current={active === index ? 'step' : undefined} aria-label={`${scene.number} ${scene.label}`}>
                <span>{scene.number}</span><b>{scene.label}</b>
              </button>
            ))}
          </nav>
          <span className={styles.counter}>{scenes[active].number} / 05</span>
        </div>
        <div className={styles.progress}><div ref={meter} /></div>
      </div>
    </section>
  );
}

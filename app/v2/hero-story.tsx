'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import styles from './v2.module.css';

const scenes = [
  {
    kicker: 'JEDINÉ DÁMSKE FITNESS · HUMENNÉ',
    title: 'Tvoj priestor pre silu, pohyb a vlastné tempo.',
    text: 'Fitness iba pre ženy, kde môžeš začať pokojne, odborne a bez porovnávania.',
    image: '/photos/priestory.jpg',
    alt: 'Svetlý tréningový priestor Lady Fitness v Humennom',
    actions: [
      ['Dohodni si prvú návštevu', '#kontakt-v2'],
      ['Pozrieť cenník', '#cennik-v2'],
    ],
  },
  {
    kicker: 'PRVÁ NÁVŠTEVA · HRNČIARSKA 11',
    title: 'Nemusíš mať plán. Stačí prísť.',
    text: 'Parkovanie zdarma priamo pri fitku, šatňa aj sprchy k dispozícii. Prvý krok prebehne v pokoji, spolu s trénerkou.',
    image: '/photos/trening.jpg',
    alt: 'Tréning žien v Lady Fitness',
    actions: [
      ['Ako prebieha prvá návšteva', '#faq-v2'],
      ['Zavolať teraz', 'tel:+421908891961'],
    ],
  },
  {
    kicker: 'OD ROKU 2019 · HUMENNÉ',
    title: 'Skutočné ženy. Skutočný pokrok.',
    text: 'Založené trénerkou s rokmi skúseností. Komunita, kde sa nemusíš porovnávať – len hýbať vlastným tempom.',
    image: '/photos/komunita.jpg',
    alt: 'Komunita žien Lady Fitness',
    actions: [
      ['Náš príbeh', '#pribeh-v2'],
      ['Referencie klientok', '#referencie-v2'],
    ],
  },
] as const;

export default function HeroStory() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduced(media.matches);
    const frame = requestAnimationFrame(sync);
    media.addEventListener('change', sync);
    return () => {
      cancelAnimationFrame(frame);
      media.removeEventListener('change', sync);
    };
  }, []);

  useEffect(() => {
    if (reduced) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      if (!root.current) return;
      const rect = root.current.getBoundingClientRect();
      const distance = Math.max(1, rect.height - window.innerHeight);
      const nextProgress = Math.max(0, Math.min(1, -rect.top / distance));
      setProgress(nextProgress);
      setActive(Math.min(scenes.length - 1, Math.round(nextProgress * (scenes.length - 1))));
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
  }, [reduced]);

  const choose = (index: number) => {
    setActive(index);
    if (reduced || !root.current) return;
    const top = root.current.getBoundingClientRect().top + window.scrollY;
    const distance = root.current.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + (distance * index) / (scenes.length - 1), behavior: 'smooth' });
  };

  return (
    <section ref={root} className={styles.v2Story} aria-label="Úvod Lady Fitness">
      <h1 className={styles.srOnly}>Lady Fitness Humenné — jediné dámske fitness centrum v Humennom</h1>
      <div className={styles.v2StoryStage}>
        <div className={styles.v2StoryScenes}>
          {scenes.map((scene, index) => (
            <article
              className={styles.v2StoryScene}
              key={scene.title}
              aria-hidden={active !== index}
              inert={active !== index}
              style={{ opacity: active === index ? 1 : 0 }}
            >
              <Image
                className={styles.heroImage}
                src={scene.image}
                alt={scene.alt}
                fill
                priority={index === 0}
                loading={index === 0 ? 'eager' : 'lazy'}
                sizes="100vw"
              />
              <div className={styles.heroShade} />
              <div className={styles.heroContent}>
                <p className={styles.heroBadge}><span aria-hidden="true">✦</span>{scene.kicker}</p>
                <h2>{scene.title}</h2>
                <p>{scene.text}</p>
                <div className={styles.heroActions}>
                  <a className={styles.primaryButton} href={scene.actions[0][1]}>{scene.actions[0][0]} <span aria-hidden="true">↗</span></a>
                  <a className={styles.textLink} href={scene.actions[1][1]}>{scene.actions[1][0]}</a>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className={styles.heroControls}>
          <nav aria-label="Scény úvodu">
            {scenes.map((scene, index) => (
              <button type="button" key={scene.title} onClick={() => choose(index)} aria-current={active === index ? 'step' : undefined}>
                <span>0{index + 1}</span><span className={styles.controlLabel}>{['Tvoj priestor', 'Prvá návšteva', 'Naša komunita'][index]}</span>
              </button>
            ))}
          </nav>
          <span className={styles.heroProgress} aria-hidden="true"><span style={{ transform: `scaleX(${progress})` }} /></span>
        </div>
      </div>
    </section>
  );
}

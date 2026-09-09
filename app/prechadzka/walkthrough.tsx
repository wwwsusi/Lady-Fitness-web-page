'use client';
import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import styles from './walkthrough.module.css';
const stops = [
  { name: 'Vitaj u nás', image: 'priestory.jpg', title: 'Tvoj čas. Tvoj priestor.', text: 'Vstúp do Lady Fitness. Miesta v Humennom, kde môžeš byť sama sebou.', tag: 'FITNESS PRE ŽENY · OD ROKU 2019', origin: '65% 68%' },
  { name: 'Priestor pre silu', image: 'vybavenie.jpg', title: 'Objav, čo v tebe je.', text: 'Jednorazový vstup, permanentka alebo tréning s vedením. Vyber si svoje tempo.', tag: 'SILA · OSOBNÉ TRÉNINGY', origin: '40% 65%' },
  { name: 'Tvoje tempo', image: 'kardio.jpg', title: 'Nadýchni sa. Rozhýb sa.', text: 'Prvý tréning aj nový cieľ. Pohyb má miesto v každom období života.', tag: 'KONDÍCIA · ENERGIA', origin: '60% 55%' },
  { name: 'Osobný prístup', image: 'trenerka.jpg', title: 'Sama na to nebudeš.', text: 'Správna technika, podpora a skúsenosti. Spoznaj príbeh ženy, ktorá vytvorila Lady Fitness.', tag: 'TVÔJ TRÉNING · TVOJA PODPORA', origin: '35% 35%' },
];
export default function Walkthrough() {
  const root = useRef<HTMLElement>(null);
  const layers = useRef<(HTMLDivElement | null)[]>([]);
  const meter = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    const update = () => {
      frame = 0;
      if (!root.current || reduce.matches) return;
      const rect = root.current.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, -rect.top / (rect.height - window.innerHeight)));
      const position = progress * (stops.length - 1);
      setActive(Math.round(position));
      if (meter.current) meter.current.style.transform = `scaleX(${progress})`;
      layers.current.forEach((el, i) => {
        if (!el) return;
        const delta = position - i;
        const opacity = Math.max(0, 1 - Math.abs(delta));
        el.style.opacity = String(opacity);
        el.style.transform = `scale(${1.08 + Math.max(-1, Math.min(1, delta)) * .18}) translate3d(${delta * -3}%,${delta * -1.5}%,0)`;
      });
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    reduce.addEventListener('change', schedule);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule); reduce.removeEventListener('change', schedule); };
  }, []);
  const go = (i: number) => {
    if (!root.current) return;
    const top = root.current.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + (root.current.offsetHeight - window.innerHeight) * i / (stops.length - 1), behavior: 'smooth' });
  };
  return <>
    <header className={styles.header}>
      <a href="/prechadzka" aria-label="Lady Fitness úvod"><img src="/logo.png" alt="Lady Fitness" width="120" height="62" /></a>
      <nav aria-label="Navigácia novej verzie"><a href="#ponuka">Cvičenie</a><a href="#o-nas">Náš príbeh</a><a href="/">Pôvodná verzia ↗</a></nav>
      <a className={styles.visit} href="#prva-navsteva">Dohodni si návštevu <ArrowUpRight size={17}/></a>
    </header>
    <section ref={root} className={styles.journey} aria-label="Prechádzka Lady Fitness">
      <div className={styles.stage}>
        <div className={styles.photos} aria-hidden="true">{stops.map((s,i) => <div key={s.name} ref={el => {layers.current[i] = el;}} className={styles.photo} style={{opacity: i === 0 ? 1 : 0, transformOrigin:s.origin}}><img src={'/photos/'+s.image} alt="" fetchPriority={i === 0 ? 'high' : 'auto'} /></div>)}</div>
        <div className={styles.shade}/>
        <div className={styles.location}>HUMENNÉ <span>48°56′ N · LADY FITNESS</span></div>
        <div className={styles.copy} key={active}>
          <p className={styles.tag}>{stops[active].tag}</p>
          <h1>{stops[active].title}</h1>
          <p className={styles.intro}>{stops[active].text}</p>
          <a className={styles.action} href={active === 3 ? '#o-nas' : '#ponuka'}>{active === 3 ? 'Spoznaj náš príbeh' : 'Objav našu ponuku'} <ArrowUpRight size={20}/></a>
        </div>
        <div className={styles.bottom}><div className={styles.scroll}><ArrowDown size={19}/><span>Prejdi sa s nami<br/><small>Posúvaj stránku nadol</small></span></div><nav className={styles.stops} aria-label="Zastávky prechádzky">{stops.map((s,i)=><button key={s.name} onClick={()=>go(i)} aria-current={active===i?'step':undefined}><span>0{i+1}</span>{s.name}</button>)}</nav><span className={styles.count}>0{active+1} / 04</span></div>
        <div className={styles.progress}><div ref={meter}/></div>
      </div>
    </section>
    <div className={styles.bridge}><span>Už poznáš náš priestor.</span><a href="#ponuka">Nájdi svoj spôsob pohybu <ArrowDown size={20}/></a></div>
  </>;
}

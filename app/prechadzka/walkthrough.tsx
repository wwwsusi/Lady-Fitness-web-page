'use client';
import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import styles from './walkthrough.module.css';
import { assetPath } from '../site-config';
import { scenes } from '../scroll-story';
const stops = scenes.map((scene, i) => ({name: scene.label, title: `${scene.first} ${scene.last}`, text: scene.description, tag: `0${i + 1} / ${scene.label}`, image: ['priestory.jpg', 'trening.jpg', 'komunita.jpg'][i], origin: '55% 60%', href: scene.href, cta: scene.cta}));
export default function Walkthrough() {
  const root = useRef<HTMLElement>(null);
  const layers = useRef<(HTMLDivElement | null)[]>([]);
  const meter = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [motion, setMotion] = useState(false);
  useEffect(() => { setMotion(!window.matchMedia('(prefers-reduced-motion: reduce)').matches); }, []);
  useEffect(() => {

    let frame = 0;
    const update = () => {
      frame = 0;
      if (!root.current || !motion) return;
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

    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule); };
  }, [motion]);
  const go = (i: number) => {
    if (!root.current) return;
    const top = root.current.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + (root.current.offsetHeight - window.innerHeight) * i / (stops.length - 1), behavior: 'smooth' });
  };
  return <>
    <section ref={root} className={`${styles.journey} ${motion ? styles.motionOn : styles.motionOff}`} aria-label="Prechádzka Lady Fitness">
      <div className={styles.stage}>
        <div className={styles.photos} aria-hidden="true">{stops.map((s,i) => <div key={s.name} ref={el => {layers.current[i] = el;}} className={styles.photo} style={{opacity: i === 0 ? 1 : 0, transformOrigin:s.origin}}><img src={assetPath('/photos/'+s.image)} alt="" fetchPriority={i === 0 ? 'high' : 'auto'} /></div>)}</div>
        <div className={styles.shade}/>
        <div className={styles.location}>HUMENNÉ <button className={styles.motionToggle} onClick={() => { setMotion(!motion); setActive(0); }} aria-pressed={motion}>{motion ? 'Vypnúť animáciu' : 'Zapnúť prechádzku'}</button></div>
        <div className={styles.copy} key={active}>
          {!motion && <p className={styles.motionNote}>Prechádzka je pozastavená. Spusti ju tlačidlom hore.</p>}
          <p className={styles.tag}>{stops[active].tag}</p>
          <h1>{stops[active].title}</h1>
          <p className={styles.intro}>{stops[active].text}</p>
          <a className={styles.action} href={stops[active].href}>{stops[active].cta} <ArrowUpRight size={20}/></a>
        </div>
        <div className={styles.bottom}><div className={styles.scroll}><ArrowDown size={19}/><span>Prejdi sa s nami<br/><small>Posúvaj stránku nadol</small></span></div><nav className={styles.stops} aria-label="Zastávky prechádzky">{stops.map((s,i)=><button key={s.name} onClick={()=>go(i)} aria-current={active===i?'step':undefined}><span>0{i+1}</span>{s.name}</button>)}</nav><span className={styles.count}>0{active+1} / 0{stops.length}</span></div>
        <div className={styles.progress}><div ref={meter}/></div>
      </div>
    </section>
    <div className={styles.bridge}><span>Už poznáš náš priestor.</span><a href="#ponuka">Nájdi svoj spôsob pohybu <ArrowDown size={20}/></a></div>
  </>;
}

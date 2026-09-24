import Link from "next/link";
import styles from "./v5.module.css";

const timePasses = [
  ["Mesačná","47 €",""],
  ["2-mesačná","90 €",""],
  ["3-mesačná","130 €",""],
  ["Polročná","259 €",""],
  ["Ročná","510 €",""],
];
const visitPasses = [
  ["10 vstupov","57 €","−5 %"],
  ["15 vstupov","81 €","−10 %"],
  ["20 vstupov","108 €","−10 %"],
  ["30 vstupov","162 €","−10 %"],
];
const retail = [
  ["Doplnky výživy",[["Creatin 500 g","16,50 €"],["Pro 8 650 g","57 €"],["Pro 8 500 g","45 €"],["NAD+ 30 g (60 kps)","30 €"],["Elektrolity 500 g","19,90 €"]]],
  ["Nápoje & drobné produkty",[["Carnitin 1 liter","24 €"],["Nartes voda 750 ml","1,20 €"],["Carnitin drink 750 ml","2,50 €"],["Magnézium","2 €"],["Tyčinky","1 €"],["Proteín 30 g","1,40 €"],["Iontový nápoj 1 l","19 €"]]],
  ["Doplnky & oblečenie",[["Rukavice","8,50 €"],["Uterák","3,50 €"],["Opasok","25 €"],["Shaker 700 ml","8 €"],["Shaker 600 ml","3,52 €"],["Tričko","15 €"]]],
];

export default function V5Page() {
 return <main className={styles.page}>
  <header className={styles.header}>
   <Link href="/v5" className={styles.logo}>LADY <b>FITNESS</b><small>HUMENNÉ</small></Link>
   <nav><a href="#sluzby">Služby</a><a href="#cennik">Cenník</a><a href="#produkty">Produkty</a><a href="#vzdelavanie">Vzdelávanie</a><a href="#kontakt">Kontakt</a></nav>
   <a className={styles.cta} href="#prva-navsteva">Chcem začať</a>
  </header>

  <section className={styles.hero}>
   <div><p className={styles.kicker}>ŽENSKÉ FITNESS · HUMENNÉ</p><h1>Tvoja sila.<br/><span>Tvoj priestor.</span></h1><p className={styles.lead}>Vypni svet. Zapni seba. Pohyb, podpora a čas pre teba — v kruhu žien, ktoré ti rozumejú.</p><div className={styles.actions}><a className={styles.primary} href="#sluzby">Spoznaj našu ponuku</a><a href="#cennik">Pozri cenník →</a></div></div>
   <div className={styles.heroCard}><strong>Viac než len fitko.</strong><p>Pohyb je začiatok. Pomáhame ti budovať silu, kondíciu, lepšie rozumieť svojmu telu a vytvoriť si udržateľný systém.</p><div><span>POHYB</span><span>VÝŽIVA</span><span>VZDELÁVANIE</span><span>KOMUNITA</span></div></div>
  </section>

  <section id="sluzby" className={styles.section}>
   <p className={styles.kicker}>NAŠA PONUKA</p><div className={styles.heading}><h2>Začni tam, kde si.</h2><p>Nemusíš mať plán ani skúsenosti. Vyber si vlastné tempo alebo odborné vedenie.</p></div>
   <div className={styles.serviceGrid}>
    <article><span>01</span><h3>Fitness pre ženy</h3><p>Priestor na pravidelný pohyb, silu a kondíciu v ženskom prostredí.</p><a href="#cennik">Vstupy a permanentky →</a></article>
    <article><span>02</span><h3>Osobný tréning</h3><p>Individuálna práca s trénerom podľa tvojich potrieb a cieľov.</p><strong>18 €</strong></article>
    <article><span>03</span><h3>Výživa</h3><p>Individuálna výživová konzultácia je aktívna služba. Samostatná cena zatiaľ nie je potvrdená.</p><a href="#kontakt">Dohodni si konzultáciu →</a></article>
    <article><span>04</span><h3>Tréningový plán & jedálniček</h3><p>Vypracovanie tréningového plánu a jedálnička.</p><strong>250 €</strong></article>
   </div>
  </section>

  <section id="cennik" className={styles.pricing}>
   <div className={styles.section}><p className={styles.kicker}>CENNÍK · PLATNÝ OD 1. 1. 2026</p><div className={styles.heading}><h2>Vyber si rytmus, ktorý ti sedí.</h2><p>Jednoduchý vstup, časová permanentka alebo balík vstupov.</p></div>
    <div className={styles.priceBlock}><h3>Vstupy & časové permanentky</h3><div className={styles.priceGrid}>
     <article className={styles.entry}><small>JEDNORAZOVÝ VSTUP</small><strong>6 €</strong><p>dospelí</p></article>
     {timePasses.map(([n,p,d])=><article key={n}><small>{n.toUpperCase()}</small><strong>{p}</strong>{d&&<em>{d}</em>}</article>)}
    </div></div>
    <div className={styles.priceBlock}><h3>Viacvstupové permanentky</h3><p className={styles.note}>Zľava je počítaná oproti jednorazovému vstupu 6 €.</p><div className={styles.priceGrid}>
     {visitPasses.map(([n,p,d])=><article key={n}><small>{n.toUpperCase()}</small><strong>{p}</strong><em>{d}</em></article>)}
    </div></div>
    <div className={styles.twoCol}>
     <div><h3>Zvýhodnené vstupy</h3><article className={styles.widePrice}><small>ŠTUDENTI DO 18 ROKOV & SENIORI NAD 60 ROKOV</small><div><strong>5 €</strong><span>jednorazovo</span><strong>42 €</strong><span>mesačne</span></div></article></div>
     <div><h3>Detské kruhové tréningy</h3><article className={styles.widePrice}><small>AKTUÁLNY CENNÍK</small><div><strong>6 €</strong><span>6–10 rokov</span><strong>8 €</strong><span>predškolský vek</span></div></article></div>
    </div>
   </div>
  </section>

  <section id="produkty" className={styles.section}>
   <p className={styles.kicker}>PRODUKTY VO FITKU</p><div className={styles.heading}><h2>Nájdeš u nás aj.</h2><p>Aktuálny potvrdený retail sortiment Lady Fitness. Uvádzame predajné ceny.</p></div>
   <div className={styles.retailGrid}>{retail.map(([cat,items])=><article key={cat as string}><h3>{cat as string}</h3><div>{(items as string[][]).map(([n,p])=><p key={n}><span>{n}</span><strong>{p}</strong></p>)}</div></article>)}</div>
   <p className={styles.note}>Dostupnosť konkrétnej položky sa môže meniť podľa aktuálneho skladu.</p>
  </section>

  <section id="vzdelavanie" className={styles.education}>
   <div className={styles.section}><p className={styles.kicker}>VZDELÁVANIE · VO VÝVOJI</p><div className={styles.eduGrid}><div><h2>Poznaj svoje telo.</h2><p>Jeden komplexný seminár, ktorý prepája metabolizmus, výživu, pohyb, regeneráciu a praktické rozhodovanie do jedného zrozumiteľného príbehu.</p><a href="#kontakt" className={styles.primary}>Mám záujem o vzdelávanie</a></div><div className={styles.topicCloud}>{["Metabolizmus","Glukóza & inzulín","Mitochondrie","Črevo","Makroživiny","Pôst","Stres & spánok","Pohyb & regenerácia"].map(x=><span key={x}>{x}</span>)}</div></div></div>
  </section>

  <section className={styles.section}>
   <p className={styles.kicker}>DETI & KOMUNITA</p><div className={styles.heading}><h2>Pohyb od detstva.</h2><p>Detské programy sú samostatná rozvíjaná časť Lady Fitness.</p></div>
   <div className={styles.serviceGrid}>
    <article><span>PILOT</span><h3>Detská Zumba vo škole</h3><p>Hudba, jednoduchý tanečný pohyb a radosť z pohybu. Komunikácia je smerovaná na základnú školu / školu.</p><a href="#kontakt">Prebrať spoluprácu →</a></article>
    <article><span>PILOT</span><h3>Športové kluby</h3><p>Tréning detských futbalových a športových klubov. Komerčný model a pricing ešte nie sú potvrdené.</p><a href="#kontakt">Prebrať spoluprácu →</a></article>
   </div>
  </section>

  <section className={styles.future}>
   <div className={styles.section}><p className={styles.kicker}>PRIPRAVUJEME / OVERUJEME</p><h2>Lady Fitness rastie premyslene.</h2><p className={styles.lead}>Mobility, Active Ageing, Corporate Health, školské programy a ďalšie formáty sú rozvojové smery — nie služby, ktoré by sme predstierali ako hotové.</p><div className={styles.tags}>{["Mobility","Active Ageing","Corporate Health","Školské programy","Online produkty"].map(x=><span key={x}>{x}</span>)}</div></div>
  </section>

  <section id="prva-navsteva" className={styles.section}>
   <p className={styles.kicker}>PRVÁ NÁVŠTEVA</p><div className={styles.heading}><h2>Nemusíš vedieť, ako začať.</h2><p>Stačí sa ozvať. Spolu si prejdeme, čo hľadáš, dohodneme detaily a prídeš pripravená.</p></div>
   <div className={styles.steps}>{["Vyber, čo ťa zaujíma","Ozvi sa Lady Fitness","Dohodneme detaily, čas a cenu","Príď a začni"].map((x,i)=><div key={x}><span>0{i+1}</span><strong>{x}</strong></div>)}</div>
  </section>

  <section id="kontakt" className={styles.contact}><div><p className={styles.kicker}>POĎME ZAČAŤ</p><h2>Tvoj prvý krok môže byť jednoduchý.</h2><p>Napíš alebo zavolaj Lady Fitness Humenné a dohodni si ďalší krok.</p></div><a href="/" className={styles.contactButton}>Späť na aktuálny web →</a></section>
  <footer className={styles.footer}><strong>LADY FITNESS · HUMENNÉ</strong><span>V5 · master-aligned concept</span></footer>
 </main>
}

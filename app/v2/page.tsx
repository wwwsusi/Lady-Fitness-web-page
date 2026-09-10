import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { VersionSwitch } from '../site-header';
import V2ContactForm from './contact-form';
import HeroStory from './hero-story';
import styles from './v2.module.css';

const facebook = 'https://www.facebook.com/profile.php?id=100057866011115';
const map = 'https://www.google.com/maps/search/?api=1&query=Lady+Fitness+Hrn%C4%8Diarska+11+Humenn%C3%A9';

export const metadata: Metadata = {
  title: 'Lady Fitness Humenné | Dámske fitness a osobné tréningy',
  description: 'Dámske fitness v Humennom. Vlastný tréning, osobné tréningy, poradenstvo, detská zumba a programy pre ženy v každom veku.',
  alternates: { canonical: '/v2' },
  openGraph: {
    title: 'Lady Fitness Humenné | Tvoj priestor pre pohyb',
    description: 'Dámske fitness v Humennom s osobným prístupom a komunitou žien.',
    images: ['/photos/priestory.jpg'],
  },
};

const prices = [
  ['Jednorazový vstup', '10 €', 'Príď si zacvičiť v čase, ktorý ti vyhovuje.'],
  ['Mesačná permanentka', '50 €', 'Pravidelný pohyb a priestor vytvoriť si vlastný rytmus.'],
  ['Osobný tréning', 'Vstup alebo permanentka + 20 €', 'Technika, istota pri strojoch a tréning podľa tvojho cieľa.'],
  ['Strava & poradenstvo', '150 €', 'Praktické poradenstvo o režime a návykoch bez extrémov.'],
  ['Psychohygiena', 'V rámci fitka zdarma', 'Dobrá nálada sa pri vstupe osobitne neúčtuje.'],
  ['Detská zumba pre škôlky', 'Individuálna cena podľa škôlky', 'O cene a podmienkach sa informuj vo svojej škôlke.'],
];

const schema = {
  '@context': 'https://schema.org',
  '@type': 'HealthClub',
  name: 'Lady Fitness Humenné',
  url: 'https://lady-fitness-humenne.michal-susko.chatgpt.site/v2',
  telephone: '+421908891961',
  image: 'https://lady-fitness-humenne.michal-susko.chatgpt.site/photos/priestory.jpg',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Hrnčiarska 11',
    addressLocality: 'Humenné',
    addressCountry: 'SK',
  },
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '06:00', closes: '19:30' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Saturday', 'Sunday'], opens: '08:00', closes: '16:30' },
  ],
  sameAs: [facebook],
};

export default function V2Page() {
  return (
    <div className={styles.page}>
      <a className={styles.skipLink} href="#v2-content">Preskočiť na obsah</a>
      <header className={styles.header}>
        <Link className={styles.brand} href="/v2" aria-label="Lady Fitness V2 — úvod">
          <Image src="/logo.png" alt="Lady Fitness Humenné" width={148} height={77} priority />
        </Link>
        <nav aria-label="Hlavná navigácia V2">
          <a href="#sluzby-v2">Služby</a>
          <a href="#pribeh-v2">Náš príbeh</a>
          <a href="#programy-v2">Programy</a>
          <a href="#cennik-v2">Cenník</a>
          <a href="#kontakt-v2">Kontakt</a>
        </nav>
        <a className={styles.headerCta} href="#kontakt-v2">Dohodni si návštevu</a>
      </header>
      <main id="v2-content">
        <HeroStory />

        <aside className={styles.factBar} aria-label="Praktické informácie">
          <span><strong>Po–Pi</strong> 6:00–19:30</span>
          <span><strong>So–Ne</strong> 8:00–16:30</span>
          <span><strong>Hrnčiarska 11</strong> · Humenné</span>
          <span>Parkovanie zdarma · vstup na poschodí</span>
        </aside>

        <section id="sluzby-v2" className={styles.section} aria-labelledby="services-title">
          <div className={styles.sectionHead}>
            <p className={styles.eyebrow}>Služby</p>
            <h2 id="services-title">Pohyb, ktorý sa prispôsobí tebe.</h2>
            <p>Vyber si samostatný tréning, osobnú spoluprácu alebo praktické poradenstvo.</p>
          </div>
          <div className={styles.serviceGrid}>
            <article>
              <span className={styles.index}>01</span>
              <h3>Fitness & permanentka</h3>
              <p>Svetlý priestor na silový aj kondičný tréning. Príď jednorazovo alebo si vytvor pravidelný rytmus.</p>
            </article>
            <article>
              <span className={styles.index}>02</span>
              <h3>Osobný tréning</h3>
              <p>Nauč sa správnu techniku, získaj istotu pri strojoch a nastav si tréning podľa vlastného cieľa.</p>
            </article>
            <article>
              <span className={styles.index}>03</span>
              <h3>Strava & poradenstvo</h3>
              <p>Nestačí iba cvičiť. Prepájame pohyb so vzdelávaním a zdravie vysvetľujeme prakticky, bez extrémnych diét a zázračných riešení.</p>
            </article>
          </div>
        </section>

        <section id="pribeh-v2" className={`${styles.section} ${styles.story}`} aria-labelledby="story-title">
          <div className={styles.storyImage}>
            <Image src="/photos/trenerka.jpg" alt="Trénerka Lady Fitness v priestoroch fitka" fill sizes="(min-width: 800px) 42vw, 100vw" />
          </div>
          <div className={styles.storyCopy}>
            <p className={styles.eyebrow}>Môj príbeh</p>
            <h2 id="story-title">Fitko, ktoré vzniklo z lásky k pohybu.</h2>
            <p>Lady Fitness založila trénerka s rokmi skúseností, viacerými certifikátmi a osobným prístupom ku každej žene. Po skúsenostiach v iných fitness centrách vytvorila vlastný priestor, kde môže robiť veci pokojne, odborne a s rešpektom.</p>
            <p>Lady Fitness funguje v Humennom od roku 2019. Je to miesto, kde sa môžeš učiť, posilňovať a cítiť sa dobre bez porovnávania.</p>
            <ul className={styles.cleanList}>
              <li>Šatňa a sprchy</li>
              <li>Silový aj kondičný tréning</li>
              <li>Pre ženy v každom veku</li>
            </ul>
          </div>
        </section>

        <section id="referencie-v2" className={`${styles.section} ${styles.testimonials}`} aria-labelledby="testimonials-title">
          <div>
            <p className={styles.eyebrow}>Hlas klientok</p>
            <h2 id="testimonials-title"><span>Atmosféra</span>, ku ktorej sa chceš vracať.</h2>
          </div>
          <div className={styles.quotes}>
            <blockquote>„Príjemní super ľudia a človek sa tam cíti ako doma.“</blockquote>
            <blockquote>„Pani, ktorá je veľmi zlatá a poradí, ako správne cvičiť.“</blockquote>
            <blockquote>„Super atmosféra, super trénerka.“</blockquote>
            <a className={styles.textLink} href={facebook} target="_blank" rel="noreferrer">Pozrieť verejné odporúčania na Facebooku <span aria-hidden="true">↗</span></a>
          </div>
        </section>

        <section id="programy-v2" className={`${styles.section} ${styles.programs}`} aria-labelledby="programs-title">
          <div className={styles.sectionHead}>
            <p className={styles.eyebrow}>Programy a spolupráce</p>
            <h2 id="programs-title">Pohyb a poznanie v každom veku.</h2>
          </div>
          <div className={styles.programGrid}>
            <details open>
              <summary>Detská zumba pre materské školy</summary>
              <p>Hudba, jednoduché tanečné kroky a radosť z pohybu priamo v škôlke. Program vedie certifikovaná lektorka; 1× týždenne, 45 minút, najviac 25 detí. O spoluprácu požiadajte vedenie vašej škôlky.</p>
            </details>
            <details>
              <summary>Vzdelávací seminár</summary>
              <p>Štyri bloky spájajú telo a metabolizmus, jedlo v bežnom živote, pohyb a regeneráciu a zdravie ako dlhodobý systém. Termín, trvanie a cenu zverejníme po dokončení príprav.</p>
            </details>
            <details>
              <summary>Pripravované skupinové kurzy</summary>
              <p>Pevný chrbát, nohy & zadok a pevné prsia. Kurzy sa zamerajú na konkrétne partie, správnu techniku a vedomý pohyb.</p>
            </details>
            <details>
              <summary>Mobilita pre zariadenia seniorov</summary>
              <p>Program primeraného pohybu priamo v domovoch dôchodcov a zariadeniach pre seniorov. Rozsah a podmienky nastavíme s konkrétnym zariadením.</p>
            </details>
            <details>
              <summary>Psychohygiena v každodennosti</summary>
              <p><strong>Vypni svet. Zapni seba.</strong> Dopraj si pohyb, priestor vydýchnuť si a rozhovor s ľuďmi, pri ktorých sa cítiš dobre.</p>
            </details>
          </div>
        </section>

        <section className={`${styles.section} ${styles.supplements}`} aria-labelledby="supplements-title">
          <div>
            <p className={styles.eyebrow}>Doplnky stravy</p>
            <h2 id="supplements-title">Vyberaj si s rozumom.</h2>
            <p>V Lady Fitness nájdeš vybrané doplnky ProSupplements. Ako klientka máš na vybrané produkty zvýhodnené ceny; aktuálnu ponuku si over na recepcii.</p>
            <ul className={styles.cleanList}>
              <li><strong>PRO 8</strong> · esenciálne aminokyseliny</li>
              <li><strong>PRO Magnesium</strong> · horčík</li>
              <li><strong>PRO Liver</strong> · starostlivosť o pečeň</li>
              <li><strong>NAD+</strong> · energia a bunkový metabolizmus</li>
            </ul>
            <p className={styles.note}>Doplnky nenahrádzajú pestrú stravu ani odbornú zdravotnú starostlivosť. Viac informácií nájdeš na <a href="https://prosupplements.sk" target="_blank" rel="noreferrer">ProSupplements</a>.</p>
          </div>
          <Image src="/products/pro8.png" alt="PRO 8 od ProSupplements" width={484} height={724} sizes="(min-width: 800px) 260px, 180px" />
        </section>

        <section className={`${styles.section} ${styles.gallerySection}`} aria-labelledby="gallery-title">
          <div className={styles.sectionHead}>
            <p className={styles.eyebrow}>Spoznaj nás bližšie</p>
            <h2 id="gallery-title">Skutočné miesto. Skutočná komunita.</h2>
          </div>
          <div className={styles.gallery}>
            <figure><Image src="/photos/vybavenie.jpg" alt="Posilňovacie stroje v Lady Fitness" fill sizes="(min-width: 800px) 42vw, 100vw" /><figcaption>Priestor pre tvoj tréning</figcaption></figure>
            <figure><Image src="/photos/kardio.jpg" alt="Kardio zóna Lady Fitness" fill sizes="(min-width: 800px) 26vw, 50vw" /><figcaption>Sila aj kondícia</figcaption></figure>
            <figure><Image src="/photos/komunita.jpg" alt="Komunitné stretnutie v Lady Fitness" fill sizes="(min-width: 800px) 26vw, 50vw" /><figcaption>Spolu aj mimo tréningu</figcaption></figure>
          </div>
        </section>

        <section id="cennik-v2" className={`${styles.section} ${styles.pricing}`} aria-labelledby="pricing-title">
          <div className={styles.sectionHead}>
            <p className={styles.eyebrow}>Cenník</p>
            <h2 id="pricing-title">Jasné možnosti bez hľadania.</h2>
            <p>Vyber si službu a pri prvej návšteve spolu doladíme detaily.</p>
          </div>
          <div className={styles.priceGrid}>
            {prices.map(([name, price, description], index) => (
              <article key={name}>
                <span className={styles.index}>0{index + 1}</span>
                <h3>{name}</h3>
                <strong className={styles.price}>{price}</strong>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={`${styles.section} ${styles.firstVisit}`} aria-labelledby="first-visit-title">
          <div>
            <p className={styles.eyebrow}>Tvoja prvá návšteva</p>
            <h2 id="first-visit-title">Prvý krok môže byť jednoduchý.</h2>
            <p>Nemusíš mať hotový plán ani športové skúsenosti. Začnime rozhovorom o tom, čo potrebuješ.</p>
          </div>
          <ol>
            <li><strong>Ozvi sa nám.</strong><span>Povedz, o akú službu máš záujem.</span></li>
            <li><strong>Dohodneme detaily.</strong><span>Prejdeme termín, cenu a to, čo ťa čaká.</span></li>
            <li><strong>Urob si čas na seba.</strong><span>Prines si oblečenie, čistú obuv, uterák a vodu.</span></li>
          </ol>
        </section>

        <section id="kontakt-v2" className={`${styles.section} ${styles.contact}`} aria-labelledby="contact-title">
          <div className={styles.contactInfo}>
            <p className={styles.eyebrow}>Kontakt</p>
            <h2 id="contact-title">Začni tým, že sa ozveš.</h2>
            <p>Príď osobne, zavolaj alebo si priprav správu. Termín ti potvrdíme priamo.</p>
            <address>
              <a href="tel:+421908891961"><strong>+421 908 891 961</strong><span>Zavolať</span></a>
              <a href={map} target="_blank" rel="noreferrer"><strong>Hrnčiarska 11, Humenné</strong><span>Otvoriť mapu</span></a>
              <a href={facebook} target="_blank" rel="noreferrer"><strong>Facebook Lady Fitness</strong><span>Napísať správu a pozrieť oznamy</span></a>
            </address>
          </div>
          <V2ContactForm />
        </section>

        <section id="faq-v2" className={`${styles.section} ${styles.faq}`} aria-labelledby="faq-title">
          <div className={styles.sectionHead}>
            <p className={styles.eyebrow}>Dobré vedieť</p>
            <h2 id="faq-title">Ešte niečo pred začiatkom?</h2>
          </div>
          <details><summary>Nikdy som necvičila. Môžem prísť?</summary><p>Áno. Ozvi sa pred prvou návštevou a spoločne vyberieme vhodný prvý krok.</p></details>
          <details><summary>Kde nájdem aktuálny rozvrh?</summary><p>Aktuálne časy cvičení a zmeny nájdeš na Facebooku. Pred prvou lekciou si potvrď termín.</p></details>
          <details><summary>Čo si mám priniesť?</summary><p>Pohodlné športové oblečenie, čistú obuv, uterák a vodu.</p></details>
        </section>
      </main>

      <footer className={styles.footer}>
        <VersionSwitch active="v2" />
        <div className={styles.footerRow}>
          <Image src="/logo.png" alt="Lady Fitness Humenné" width={148} height={77} />
          <p>© 2026 Lady Fitness Humenné</p>
          <a href="#v2-content">Späť hore ↑</a>
        </div>
      </footer>

      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </div>
  );
}

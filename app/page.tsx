import { ArrowUpRight, Dumbbell, Heart, MoveUpRight } from 'lucide-react';
import { MobileMenu, Faq } from './interactions';
import { links } from './navigation';
import Booking from './booking';
import ScrollStory from './scroll-story';
const FB = 'https://www.facebook.com/profile.php?id=100057866011115';
const MAP =
  'https://www.google.com/maps/search/?api=1&query=Lady+Fitness+Hrn%C4%8Diarska+11+Humenn%C3%A9';
const Arrow = () => <ArrowUpRight size={20} aria-hidden="true" />;
export default function Home() {
  return (
    <>
      <a className="skip" href="#obsah">
        Preskočiť na obsah
      </a>
      <header className="site-header">
        <div className="wrap topbar">
          <a className="brand" href="#" aria-label="Lady Fitness — úvod">
            <img src="/logo.png" alt="Lady Fitness Humenné" width="148" height="77" />
          </a>
          <nav className="nav" aria-label="Hlavná navigácia">
            {links.slice(0, 7).map(([href, text]) => (
              <a href={href} key={href}>
                {text}
              </a>
            ))}
          </nav>
          <a className="button desktop-cta" href="#prva-navsteva">
            Poďme začať <Arrow />
          </a>
          <MobileMenu />
        </div>
      </header>
      <main id="obsah">
        <ScrollStory />
        <div className="story-trust">
          <div className="wrap">
            <div className="trust">
              <span>
                <b>Fitness pre ženy</b> v každom veku
              </span>
              <span>
                <b>Vlastné tempo.</b> Spoločná energia.
              </span>
              <span>
                <b>Hrnčiarska 11</b> · Humenné
              </span>
            </div>
          </div>
        </div>
        <section id="ponuka" className="section wrap">
          <p className="eyebrow">Naša ponuka</p>
          <div className="section-head">
            <h2>
              Pohyb je začiatok.
              <br />
              Zvyšok tvoríme spolu.
            </h2>
            <p>
              Nájdi si svoj spôsob, ako byť silnejšia, dopriať si pozornosť a
              cítiť sa lepšie vo vlastnom tele.
            </p>
          </div>
          <div className="service-grid">
            <article className="service-card featured">
              <img
                src="/photos/trening.jpg"
                alt="Ženy cvičia spoločne v priestoroch Lady Fitness"
                loading="lazy"
                width="960"
                height="960"
              />
              <div className="service-body">
                <span className="number">01 / POHYB PRE TEBA</span>
                <h3>Fitness & osobné tréningy</h3>
                <p>
                  Priestor na vlastný tréning aj individuálnu spoluprácu s
                  trénerkou. Spoločne preberieme tvoje ciele a spôsob, ako
                  začať.
                </p>
                <a className="card-link" href="#prva-navsteva">
                  Nájdi svoj prvý krok <Arrow />
                </a>
              </div>
            </article>
            <article className="service-card">
              <div className="big-icon">
                <Dumbbell size={52} strokeWidth={1.3} aria-hidden="true" />
              </div>
              <div className="service-body">
                <span className="number">02 / TVOJ RYTMUS</span>
                <h3>
                  Jednorazový vstup
                  <br />& permanentka
                </h3>
                <p>
                  Príď si zacvičiť jednorazovo alebo si vyber permanentku pre
                  pravidelný pohyb. Aktuálne možnosti a ceny ti radi vysvetlíme.
                </p>
                <div className="chips">
                  <span className="chip">Jednorazovo</span>
                  <span className="chip">Pravidelne</span>
                </div>
                <a className="card-link" href="#rozvrh">
                  Zisti možnosti vstupu <Arrow />
                </a>
              </div>
            </article>
            <article className="service-card purple">
              <div className="big-icon">
                <Heart size={52} strokeWidth={1.3} aria-hidden="true" />
              </div>
              <div className="service-body">
                <span className="number">03 / KAŽDODENNÉ NÁVYKY</span>
                <h3>
                  Strava
                  <br />& poradenstvo
                </h3>
                <p>
                  Porozprávajme sa o stravovaní, tvojom režime a cieľoch.
                  Hľadajme zmeny, ktoré zapadnú do tvojho bežného života.
                </p>
                <div className="chips">
                  <span className="chip">Individuálny prístup</span>
                </div>
                <a className="card-link" href="#kontakt">
                  Dohodni si konzultáciu <Arrow />
                </a>
              </div>
            </article>
          </div>
          <div className="quote-strip">
            <div>
              <h3>Rozumieť telu. Lepšie sa rozhodovať.</h3>
              <p>
                Pripravujeme vzdelávanie o tele, strave, pohybe a každodenných
                návykoch.
              </p>
            </div>
            <a className="text-link" href="#seminare">
              Spoznaj pripravované témy ↗
            </a>
          </div>
        </section>
        <section id="doplnky" className="wrap section supplement-section">
          <div className="supplement-card">
            <div className="supplement-symbol" aria-hidden="true">+</div>
            <div>
              <p className="eyebrow">Doplnky stravy</p>
              <h2>Vyberaj si<br />s rozumom.</h2>
              <p className="supplement-lead">
                V Lady Fitness nájdeš aj vybrané doplnky ProSupplements. Môžu
                doplniť tvoj režim, tréning a starostlivosť o seba — nenahrádzajú
                pestrú stravu ani odbornú zdravotnú starostlivosť.
              </p>
              <p className="supplement-note">
                Ako klientka Lady Fitness máš na vybrané doplnky zvýhodnené ceny.
                O aktuálnej ponuke a cenách sa informuj priamo na recepcii vo fitku.
              </p>
              <a className="button" href="https://prosupplements.sk" target="_blank" rel="noreferrer">
                Pozrieť ProSupplements <Arrow />
              </a>
            </div>
            <div className="supplement-list" aria-label="Príklady kategórií doplnkov">
              <span>PRO 8</span><span>PRO Magnesium</span><span>PRO Liver</span><span>NAD+</span>
              <small>Aktuálnu dostupnosť a ceny pre verejnosť nájdeš v obchode ProSupplements.</small>
            </div>
          </div>
        </section>
        <section id="cennik" className="wrap section pricing-section">
          <p className="eyebrow">Cenník & služby</p>
          <div className="section-head">
            <h2>Vyber si, čo potrebuješ.</h2>
            <p>Ceny doplníme neskôr. Už dnes si môžeš vybrať službu a ozvať sa nám na recepcii, telefonicky alebo správou.</p>
          </div>
          <div className="pricing-grid">
            <article><span>01</span><h3>Jednorazový vstup</h3><p>Príď si zacvičiť v čase, ktorý ti vyhovuje.</p></article>
            <article><span>02</span><h3>Permanentka</h3><p>Pravidelný pohyb a priestor vytvoriť si vlastný rytmus.</p></article>
            <article><span>03</span><h3>Osobný tréning</h3><p>Naučiť sa správne cvičiť, nájsť istotu pri strojoch a nastaviť si tréning. Som tu pre teba.</p></article>
            <article><span>04</span><h3>Strava & poradenstvo</h3><p>Praktické rozhovory o jedle, režime a cieľoch bez extrémov.</p></article>
            <article><span>05</span><h3>Psychohygiena</h3><p>Čas pre seba, pohyb a príjemná komunita žien.</p></article>
            <article><span>06</span><h3>Detská zumba pre škôlky</h3><p>Program do materských škôl. Kontaktuj riaditeľa alebo riaditeľku škôlky.</p></article>
          </div>
          <a className="button" href="#objednanie">Informovať sa o cenách <Arrow /></a>
        </section>
        <section id="o-nas" className="wrap section founder-section">
          <div className="founder-grid">
            <div className="founder-photo-wrap">
              <img
                className="founder-photo"
                src="/photos/trenerka.jpg"
                alt="Trénerka Lady Fitness v priestoroch fitka"
                loading="lazy"
                width="1006"
                height="1563"
              />
            </div>
            <div className="founder-copy">
              <p className="eyebrow">TVOJ ČLOVEK V POHYBE</p>
              <h2>Fitko, ktoré vzniklo z lásky k pohybu.</h2>
              <p>
                Lady Fitness založila trénerka s rokmi skúseností, viacerými
                certifikátmi a osobným prístupom ku každej žene. Po skúsenostiach
                v iných fitness centrách si vytvorila vlastný priestor, kde môže
                robiť veci po svojom — pokojne, odborne a s rešpektom.
              </p>
              <p>
                Lady Fitness funguje v Humennom od roku 2019.
              </p>
              <p>
                Od začiatku chcela vytvoriť fitko iba pre ženy: miesto, kde sa
                môžeš učiť, posilňovať a cítiť sa dobre bez porovnávania.
              </p>
              <div className="founder-facts">
                <span><strong>Od 2019</strong><small>Lady Fitness v Humennom</small></span>
                <span><strong>6:00 – 20:00</strong><small>otvorené každý deň</small></span>
              </div>
            </div>
          </div>
          <div className="practical-grid" aria-label="Praktické informácie">
            <div><strong>6:00 – 20:00</strong><span>otvorené každý deň</span></div>
            <div><strong>Parkovanie zdarma</strong><span>pohodlne zaparkuješ pri fitku</span></div>
            <div><strong>Šatňa a sprchy</strong><span>komfort pred aj po tréningu</span></div>
            <div><strong>Pre každú ženu</strong><span>bez ohľadu na vek či skúsenosti</span></div>
          </div>
          <div className="trust-grid">
            <div>
              <p className="eyebrow">HLAS KLIENTOK</p>
              <h3>Atmosféra, ku ktorej sa chceš vracať.</h3>
              <p>
                „Príjemné super ľudia a človek sa tam cíti ako doma.“
              </p>
              <p>
                „Pani, ktorá je veľmi zlatá a poradí, ako správne cvičiť.“
              </p>
              <p>
                „Super atmosféra, super trénerka.“
              </p>
              <small>Referencie klientok z verejných odporúčaní na Facebooku.</small>
            </div>
            <img
              className="testimonial-shot"
              src="/photos/referencie.png"
              alt="Verejné odporúčania klientok pre Lady Fitness na Facebooku"
              loading="lazy"
              width="1212"
              height="1270"
            />
          </div>
        </section>
        <section id="zumba" className="wrap section" style={{ paddingTop: 0 }}>
          <div className="split">
            <img
              className="split-photo"
              src="/photos/detska-zumba.jpg"
              alt="Detská skupina na spoločnej fotografii v Lady Fitness"
              loading="lazy"
              width="960"
              height="720"
            />
            <div className="split-copy">
              <p className="eyebrow">Detská zumba pre materské školy</p>
              <h2>
                My prídeme
                <br />
                za deťmi.
              </h2>
              <p>
                Hudba, jednoduché tanečné kroky a radosť z pohybu priamo vo
                vašej škôlke. Program vedie certifikovaná lektorka detskej
                zumby.
              </p>
              <div className="chips">
                <span className="chip">1× týždenne</span>
                <span className="chip">45 minút</span>
                <span className="chip">Najviac 25 detí</span>
              </div>
              <p>
                Lady Fitness zabezpečí lektorku, obsah a hudbu. Škôlka poskytne
                vhodný priestor, skupinu detí a dohodnutý termín. Kontaktujte
                riaditeľa alebo riaditeľku vašej materskej školy a požiadajte
                ich o spojenie s Lady Fitness.
              </p>
              <a className="button" href="#objednanie">
                Chceme zumbu v našej škôlke <Arrow />
              </a>
            </div>
          </div>
        </section>
        <section
          id="seminare"
          className="wrap section"
          style={{ paddingTop: 0 }}
        >
          <p className="eyebrow">Pripravujeme · Jeden ucelený seminár</p>
          <div className="section-head">
            <h2>
              Poznaj svoje telo.
              <br />
              Nájdi svoj systém.
            </h2>
            <p>
              Pochopenie, praktické príklady a zmeny použiteľné v bežnom živote.
              Štyri tematické bloky prepájame v jednej veľkej prezentácii.
            </p>
          </div>
          <div className="education-grid">
            {[
              [
                '01',
                'Poznaj svoje telo',
                'Energia, metabolizmus a súvislosti medzi stravou, pohybom, spánkom a stresom.',
              ],
              [
                '02',
                'Jedlo v skutočnom živote',
                'Ako sa orientovať v jedle a vytvárať stravovacie návyky bez extrémov.',
              ],
              [
                '03',
                'Pohyb, svaly a regenerácia',
                'Sila, kondícia, mobilita a miesto odpočinku v každodennom režime.',
              ],
              [
                '04',
                'Zdravie ako systém',
                'Ako prepojiť návyky, pohyb, stravu a regeneráciu do vlastného dlhodobého systému.',
              ],
            ].map(([n, t, d]) => (
              <article key={n}>
                <span className="number">{n} / TEMATICKÝ BLOK</span>
                <h3>{t}</h3>
                <p>{d}</p>
              </article>
            ))}
          </div>
          <p className="section-note">
            Termín, trvanie a cenu seminára zverejníme po dokončení príprav.
          </p>
          <a className="text-link" href="#objednanie">
            Mám záujem o vzdelávanie ↗
          </a>
        </section>
        <section id="kurzy" className="dark-section section">
          <div className="wrap">
            <p className="eyebrow">Pripravujeme pre vás</p>
            <div className="section-head">
              <h2>
                Nový cieľ.
                <br />
                Spoločný smer.
              </h2>
              <p>
                Špeciálne skupinové kurzy pre ženy so zameraním na konkrétne
                partie a vedomý pohyb.
              </p>
            </div>
            <div className="course-grid">
              {[
                [
                  '01',
                  'Pevný chrbát',
                  'Kurz so zameraním na chrbtové svaly, stred tela a držanie tela.',
                ],
                [
                  '02',
                  'Nohy & zadok',
                  'Cielený tréning svalov dolnej časti tela a postupné budovanie sily.',
                ],
                [
                  '03',
                  'Pevné prsia',
                  'Tréning prsných svalov a hornej časti tela s dôrazom na techniku a držanie tela.',
                ],
              ].map(([n, title, desc]) => (
                <article className="course" key={n}>
                  <small>{n} / PRIPRAVUJEME</small>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </article>
              ))}
            </div>
            <div className="course-foot">
              <p>
                Termíny, ceny a podrobnosti kurzov zverejníme po dokončení
                príprav. Povedz nám, ktorý program ťa zaujíma.
              </p>
              <a
                className="button lime"
                href={FB}
                target="_blank"
                rel="noreferrer"
              >
                Napísať o záujme <Arrow />
              </a>
            </div>
            <div className="senior">
              <div>
                <p className="eyebrow">
                  Pripravujeme · Pre zariadenia seniorov
                </p>
                <h3>
                  Pohyb má miesto
                  <br />v každom veku.
                </h3>
              </div>
              <div>
                <p>
                  Pripravujeme program mobility a primeraného pohybu priamo v
                  domovoch dôchodcov a zariadeniach pre seniorov. Rozsah a
                  podmienky chceme nastaviť spolu s konkrétnym zariadením.
                </p>
                <p>
                  Ste súčasťou vedenia zariadenia? Spojme sa a preberme potreby
                  vašich klientov a možnosti spolupráce.
                </p>
                <a className="button light" href="tel:+421908891961">
                  Prebrať spoluprácu <Arrow />
                </a>
              </div>
            </div>
          </div>
        </section>
        <section id="priestory" className="section wrap">
          <p className="eyebrow">Spoznaj nás bližšie</p>
          <div className="section-head">
            <h2>
              Skutočné miesto.
              <br />
              Skutočná komunita.
            </h2>
            <p>
              Svetlé priestory, miesto na silový aj kondičný tréning a ľudia, s
              ktorými môžeš zdieľať radosť z pohybu.
            </p>
          </div>
          <div className="gallery">
            <figure>
              <img
                src="/photos/vybavenie.jpg"
                alt="Posilňovacie stroje a tréningový priestor Lady Fitness"
                loading="lazy"
                width="1440"
                height="1440"
              />
              <figcaption>Priestor pre tvoj tréning</figcaption>
            </figure>
            <figure>
              <img
                src="/photos/kardio.jpg"
                alt="Kardio zóna so stacionárnymi bicyklami"
                loading="lazy"
                width="1440"
                height="1440"
              />
              <figcaption>Sila aj kondícia</figcaption>
            </figure>
            <figure>
              <img
                src="/photos/komunita.jpg"
                alt="Komunitné stretnutie žien vo fitness centre"
                loading="lazy"
                width="960"
                height="960"
              />
              <figcaption>Spolu aj mimo tréningu</figcaption>
            </figure>
          </div>
          <div id="psychohygiena" className="mind">
            <div>
              <p className="eyebrow">Psychohygiena v každodennosti</p>
              <h3 style={{ marginTop: 22 }}>
                Vypni svet.
                <br />
                Zapni seba.
              </h3>
            </div>
            <div>
              <p>
                Na chvíľu odlož povinnosti. Dopraj si pohyb, priestor vydýchnuť
                si a rozhovor s ľuďmi, pri ktorých sa cítiš dobre. Aj tak môže
                vyzerať tvoj čas v Lady Fitness.
              </p>
              <p style={{ marginTop: 18 }}>
                Chceme, aby si tu mala čas, v ktorom si prioritou ty.
              </p>
            </div>
          </div>
        </section>
        <section
          id="prva-navsteva"
          className="wrap section"
          style={{ paddingTop: 0 }}
        >
          <p className="eyebrow">Tvoja prvá návšteva</p>
          <div className="section-head">
            <h2>
              Prvý krok môže
              <br />
              byť jednoduchý.
            </h2>
            <p>
              Nemusíš mať hotový plán ani športové skúsenosti. Začnime
              rozhovorom o tom, čo potrebuješ.
            </p>
          </div>
          <div className="steps">
            {[
              [
                '01',
                'Ozvi sa nám.',
                'Zavolaj alebo si priprav SMS cez formulár nižšie. Povedz nám, či chceš začať cvičiť, trénovať individuálne alebo prebrať stravovanie.',
              ],
              [
                '02',
                'Dohodneme detaily.',
                'Prejdeme spolu možnosti, termín a cenu. Pred návštevou budeš vedieť, čo ťa čaká.',
              ],
              [
                '03',
                'Urob si čas na seba.',
                'Príď na Hrnčiarsku 11 s pohodlným oblečením, čistou športovou obuvou, uterákom a vodou.',
              ],
            ].map(([n, t, d]) => (
              <article className="step" key={n}>
                <span className="number">{n}</span>
                <h3>{t}</h3>
                <p>{d}</p>
              </article>
            ))}
          </div>
          <div id="rozvrh" className="practical">
            <div>
              <h3>Rozvrh & otváracie hodiny</h3>
              <p>
                Otvorené máme každý deň od 6:00 do 20:00. Aktuálne časy cvičení
                a prípadné zmeny nájdeš na Facebooku. Pred prvou lekciou si s
                nami potvrď termín.
              </p>
              <a
                className="text-link"
                href={FB}
                target="_blank"
                rel="noreferrer"
              >
                Pozrieť aktuálne oznamy ↗
              </a>
            </div>
            <div>
              <h3>Cenník & možnosti vstupu</h3>
              <p>
                Zisti aktuálnu cenu vstupu, tréningu alebo konzultácie priamo u
                nás. Pomôžeme ti vybrať možnosť podľa tvojho záujmu.
              </p>
              <a className="text-link" href="tel:+421908891961">
                Informovať sa o cenách ↗
              </a>
            </div>
          </div>
        </section>
        <section className="wrap section faq-section">
          <div>
            <p className="eyebrow">Dobré vedieť</p>
            <h2>
              Ešte niečo
              <br />
              pred začiatkom?
            </h2>
          </div>
          <Faq />
        </section>
        <Booking />
        <section id="kontakt" className="contact">
          <div className="wrap">
            <div className="contact-top">
              <h2>
                Začni tým,
                <br />
                že sa ozveš.
              </h2>
              <a className="button lime" href="tel:+421908891961">
                Zavolať do Lady Fitness <Arrow />
              </a>
            </div>
            <div className="contact-details">
              <div>
                <p>Zavolaj nám</p>
                <a href="tel:+421908891961">+421 908 891 961</a>
              </div>
              <div>
                <p>Príď za nami</p>
                <a href={MAP} target="_blank" rel="noreferrer">
                  Hrnčiarska 11, Humenné ↗
                </a>
              </div>
              <div>
                <p>Napíš nám & sleduj dianie</p>
                <a href={FB} target="_blank" rel="noreferrer">
                  Lady Fitness na Facebooku ↗
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="wrap footer">
          <a className="brand" href="#">
          <img src="/logo.png" alt="Lady Fitness Humenné" width="148" height="77" />
        </a>
        <p>© {new Date().getFullYear()} Lady Fitness Humenné</p>
        <a href="#kontakt">Kontakt</a>
        <a href="#prva-navsteva">Prvá návšteva ↑</a>
      </footer>
      <div className="mobile-contact">
        <a className="button" href="tel:+421908891961">
          Zavolať <Arrow />
        </a>
        <a
          className="button outline"
          href={MAP}
          target="_blank"
          rel="noreferrer"
        >
          Ako k nám <MoveUpRight size={16} />
        </a>
      </div>
    </>
  );
}

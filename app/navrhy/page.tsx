import Link from 'next/link';
import { assetPath } from '../site-config';
export default function Directions() {
  return (
    <main className="wrap direction-page">
      <Link className="text-link" href="/">
        ← Späť na návrh webu
      </Link>
      <p className="eyebrow" style={{ marginTop: 45 }}>
        Lady Fitness · Vizuálne smery
      </p>
      <h1>
        Rovnaká značka.
        <br />
        Tri rôzne pocity.
      </h1>
      <p className="direction-intro">
        Názov Lady Fitness ostáva. Meníme spôsob, akým pôsobí: farby,
        typografiu, kompozíciu a dôraz komunikácie. Fotografie sú vždy vaše.
      </p>
      <section className="direction">
        <div className="direction-heading">
          <div>
            <span className="number">A / SÚČASNÝ NÁVRH WEBU</span>
            <h2>Energia & sebavedomie</h2>
          </div>
          <div
            className="swatches"
            aria-label="Fialová, limetková, tmavosivá, biela"
          >
            {['#784bd7', '#d2ff4b', '#202020', '#fafafa'].map((c) => (
              <span style={{ background: c }} key={c} />
            ))}
          </div>
        </div>
        <div className="sample sample-a">
          <header>
            lady fitness <span>HUMENNÉ</span>
          </header>
          <div className="sample-content">
            <h3>
              Tvoja sila.
              <br />
              Tvoj <em>priestor.</em>
            </h3>
            <img
              src={assetPath('/photos/priestory.jpg')}
              alt="Priestory Lady Fitness vo výraznom modernom návrhu"
            />
          </div>
          <div className="sample-footer">
            <p>Vypni svet. Zapni seba.</p>
            <span>Chcem začať ↗</span>
          </div>
        </div>
        <p>
          Výrazná typografia, fialová nadväzujúca na Facebook a kontrastný
          limetkový akcent. Najenergickejší a vizuálne najodvážnejší smer.
          Zodpovedá požiadavke na výrazne moderný web.
        </p>
      </section>
      <section className="direction">
        <div className="direction-heading">
          <div>
            <span className="number">B / ODPORÚČANIE PODĽA NOVÉHO BRIEFU</span>
            <h2>Blízko k ženám</h2>
          </div>
          <div
            className="swatches"
            aria-label="Malinová, jemná ružová, tmavosivá, biela"
          >
            {['#bd285b', '#f9e8ef', '#29272c', '#ffffff'].map((c) => (
              <span style={{ background: c }} key={c} />
            ))}
          </div>
        </div>
        <div className="sample sample-b">
          <header>
            lady fitness <span>POHYB · ZDRAVIE · KOMUNITA</span>
          </header>
          <div className="sample-content">
            <div>
              <small>ZAČNI TAM, KDE PRÁVE SI.</small>
              <h3>
                Čas pre seba.
                <br />
                <em>Miesto pre teba.</em>
              </h3>
              <p>Pohyb, pochopenie tela a komunita žien.</p>
              <span className="sample-cta">Spoznaj Lady Fitness ↗</span>
            </div>
            <img
              src={assetPath('/photos/trening.jpg')}
              alt="Skupinové cvičenie v jemnejšom ružovom návrhu"
            />
          </div>
        </div>
        <p>
          Biela, malinová a ružové akcenty. Pokojnejšia kompozícia a fotografie
          žien pri cvičení. Najviac zodpovedá novému briefu: empatická,
          dôveryhodná a moderná značka bez prehnanej ružovej.
        </p>
      </section>
      <section className="direction">
        <div className="direction-heading">
          <div>
            <span className="number">C / PRIESTOR PRE BUDÚCI ROZVOJ</span>
            <h2>Pohyb pre život</h2>
          </div>
          <div className="swatches" aria-label="Petrolejová, žltá, sivá, biela">
            {['#173b3c', '#e8ff88', '#dfe7e5', '#ffffff'].map((c) => (
              <span style={{ background: c }} key={c} />
            ))}
          </div>
        </div>
        <div className="sample sample-c">
          <header>
            LADY FITNESS <span>HUMENNÉ</span>
          </header>
          <div className="sample-content">
            <div>
              <small>POHYB / POCHOPENIE / KOMUNITA</small>
              <h3>
                Viac pohybu.
                <br />
                Viac <em>života.</em>
              </h3>
              <p>Začína to tebou. Pokračuje to každý deň.</p>
            </div>
            <img
              src={assetPath('/photos/komunita.jpg')}
              alt="Komunita žien v návrhu značky s petrolejovou farbou"
            />
          </div>
          <div className="sample-footer">
            <span>Objav svoj program ↗</span>
            <p>Ženy. Deti. Aktívny vek.</p>
          </div>
        </div>
        <p>
          Petrolejová a svieži žltý akcent, striedmejšie písmo a silné obsahové
          členenie. Najľahšie rozšíriteľný smer pre budúce centrum pohybu a
          mobility, detské programy a seniorov.
        </p>
      </section>
      <div className="direction-summary">
        <h2>Moje odporúčanie: B.</h2>
        <p>
          Pre dnešné Lady Fitness by som vybral smer B, s odvážnou typografiou
          zo smeru A. Zachová ženskosť a blízkosť, ktorú opisuje brief, a
          súčasne bude pôsobiť moderne. Smer C dáva zmysel pri budovaní budúcej
          zastrešujúcej značky.
        </p>
        <Link className="button" href="/">
          Pozrieť aktuálny celý web ↗
        </Link>
      </div>
    </main>
  );
}

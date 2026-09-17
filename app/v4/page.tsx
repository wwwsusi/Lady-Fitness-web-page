import type { Metadata } from 'next';
import { FitnessPage } from '../page';
import SiteHeader from '../site-header';
import { siteUrl } from '../site-config';
import Journey from './journey';
import styles from './v4.module.css';

export const metadata: Metadata = {
  title: 'Lady Fitness Humenné | Prejdi sa naším fitkom',
  description: 'Ilustrovaná prechádzka skutočnými priestormi dámskeho fitness centra Lady Fitness v Humennom.',
  alternates: { canonical: siteUrl('/v4/') },
  openGraph: {
    title: 'Lady Fitness Humenné | Prejdi sa naším fitkom',
    description: 'Vstúp, rozhliadni sa a spoznaj priestor pre pohyb vo vlastnom tempe.',
    images: [siteUrl('/v4/vstup.webp')],
  },
};

export default function V4Page() {
  return (
    <div className={styles.page}>
      <a className="skip" href="#obsah">Preskočiť na obsah</a>
      <SiteHeader homeHref="/v4" />
      <main id="obsah">
        <Journey />
        <div className={styles.details}>
          <FitnessPage contentOnly version="v4" />
        </div>
      </main>
    </div>
  );
}

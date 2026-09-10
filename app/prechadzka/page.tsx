import { FitnessPage } from '../page';
import SiteHeader from '../site-header';
import Walkthrough from './walkthrough';
import styles from './walkthrough.module.css';
export const metadata = { title: 'Lady Fitness | Vstúp do svojho priestoru', description: 'Prejdi sa Lady Fitness Humenné. Priestor pre pohyb, silu a čas pre seba.', alternates: { canonical: '/prechadzka' } };
export default function WalkPage() {
  return <div className={styles.version}><a className="skip" href="#obsah">Preskočiť na obsah</a><SiteHeader animated /><Walkthrough /><div className={styles.details}><FitnessPage contentOnly version="animated" /></div></div>;
}

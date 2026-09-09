import Home from '../page';
import SiteHeader from '../site-header';
import Walkthrough from './walkthrough';
import styles from './walkthrough.module.css';
export const metadata = { title: 'Lady Fitness | Vstúp do svojho priestoru', description: 'Prejdi sa Lady Fitness Humenné. Priestor pre pohyb, silu a čas pre seba.' };
export default function WalkPage() {
  return <div className={styles.version}><SiteHeader animated /><Walkthrough /><div className={styles.details}><Home /></div></div>;
}

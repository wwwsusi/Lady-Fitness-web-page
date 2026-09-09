import { ArrowUpRight } from 'lucide-react';
import { MobileMenu } from './interactions';
import { links } from './navigation';

export default function SiteHeader({ animated = false }: { animated?: boolean }) {
  return <header className="site-header">
    <nav className="version-switch" aria-label="Porovnať verzie stránky">
      <a href="/" aria-current={!animated ? 'page' : undefined}>Neanimovaná verzia</a>
      <a href="/prechadzka" aria-current={animated ? 'page' : undefined}>Animovaná verzia</a>
    </nav>
    <div className="wrap topbar">
      <a className="brand" href="#" aria-label="Lady Fitness — úvod"><img src="/logo.png" alt="Lady Fitness Humenné" width="148" height="77" /></a>
      <nav className="nav" aria-label="Hlavná navigácia">
        {links.slice(0, 7).map(([href, text]) => <a href={href} key={href}>{text}</a>)}
      </nav>
      <a className="button desktop-cta" href="#prva-navsteva">Poďme začať <ArrowUpRight size={20} aria-hidden="true" /></a>
      <MobileMenu />
    </div>
  </header>;
}

import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { MobileMenu } from './interactions';
import { links } from './navigation';

export type SiteVariant = 'original' | 'animated' | 'v2';

const versionLinks: Array<[SiteVariant, string, string]> = [
  ['original', '/', 'Neanimovaná verzia'],
  ['animated', '/prechadzka', 'Animovaná verzia'],
  ['v2', '/v2', 'Verzia V2'],
];

export function VersionSwitch({ active }: { active: SiteVariant }) {
  return (
    <nav className="version-switch" aria-label="Porovnať verzie stránky">
      {versionLinks.map(([id, href, label]) => <Link key={id} href={href} aria-current={active === id ? 'page' : undefined}>{label}</Link>)}
    </nav>
  );
}

export function FloatingVersionSwitch({ active }: { active: SiteVariant }) {
  return (
    <details className={`version-flyout version-flyout--${active}`}>
      <summary>Verzie</summary>
      <nav aria-label="Rýchle porovnanie verzií stránky">
        {versionLinks.map(([id, href, label]) => <Link key={id} href={href} aria-current={active === id ? 'page' : undefined}>{label}</Link>)}
      </nav>
    </details>
  );
}

export default function SiteHeader({ animated = false }: { animated?: boolean }) {
  return <header className="site-header">
    <div className="wrap topbar">
      <Link className="brand" href={animated ? '/prechadzka' : '/'} aria-label="Lady Fitness — úvod"><Image src="/logo.png" alt="Lady Fitness Humenné" width={148} height={77} priority /></Link>
      <nav className="nav" aria-label="Hlavná navigácia">
        {links.slice(0, 7).map(([href, text]) => <a href={href} key={href}>{text}</a>)}
      </nav>
      <a className="button desktop-cta" href="#prva-navsteva">Poďme začať <ArrowUpRight size={20} aria-hidden="true" /></a>
      <MobileMenu />
    </div>
    <FloatingVersionSwitch active={animated ? 'animated' : 'original'} />
  </header>;
}

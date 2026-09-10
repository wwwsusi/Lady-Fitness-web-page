import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { MobileMenu } from './interactions';
import { links } from './navigation';

export type SiteVariant = 'original' | 'animated' | 'v2';

export function VersionSwitch({ active }: { active: SiteVariant }) {
  return (
    <nav className="version-switch" aria-label="Porovnať verzie stránky">
      <Link href="/" aria-current={active === 'original' ? 'page' : undefined}>Neanimovaná verzia</Link>
      <Link href="/prechadzka" aria-current={active === 'animated' ? 'page' : undefined}>Animovaná verzia</Link>
      <Link href="/v2" aria-current={active === 'v2' ? 'page' : undefined}>Verzia V2</Link>
    </nav>
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
  </header>;
}

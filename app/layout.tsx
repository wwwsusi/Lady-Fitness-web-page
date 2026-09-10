import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';
import { assetPath, siteOrigin } from './site-config';
const geist = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin', 'latin-ext'],
});
export const metadata: Metadata = {
  title: 'Lady Fitness Humenné — Tvoja sila. Tvoj priestor.',
  description:
    'Dámske fitness na Hrnčiarskej 11 v Humennom. Osobné tréningy, zumba, detská zumba, strava a poradenstvo. Objav pohyb vo svojom tempe.',
  icons: { icon: assetPath('/favicon.svg') },
  metadataBase: new URL(siteOrigin),
  robots: { index: false, follow: false },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="sk">
      <body className={geist.variable}>{children}</body>
    </html>
  );
}

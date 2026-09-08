'use client';
import { useState } from 'react';
import { Menu } from 'lucide-react';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { links } from './navigation';
export function MobileMenu() {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="mobile-menu" aria-label="Otvoriť navigáciu">
        <Menu size={22} /> Menu
      </SheetTrigger>
      <SheetContent className="nav-sheet">
        <SheetTitle>Lady Fitness Humenné</SheetTitle>
        <SheetDescription>Vyber si svoj ďalší krok.</SheetDescription>
        <nav aria-label="Mobilná navigácia">
          {links.map(([url, text]) => (
            <a key={url} href={url} onClick={() => setOpen(false)}>
              {text} ↗
            </a>
          ))}
        </nav>
        <a className="button" href="tel:+421908891961">
          +421 908 891 961
        </a>
      </SheetContent>
    </Sheet>
  );
}
const faqs = [
  [
    'Nikdy som necvičila. Môžem prísť?',
    'Áno. Ozvi sa nám pred prvou návštevou a povedz nám, s čím chceš začať. Spoločne prejdeme možnosti a dohodneme vhodný prvý krok. Nemusíš už byť vo forme, aby si mohla začať.',
  ],
  [
    'Čo si mám priniesť?',
    'Pohodlné športové oblečenie, čistú obuv na cvičenie, uterák a vodu. Pri konkrétnej lekcii ti pri dohode potvrdíme, či potrebuješ ešte niečo.',
  ],
  [
    'Ako sa objednám na osobný tréning alebo poradenstvo?',
    'Zavolaj na +421 908 891 961 alebo si priprav SMS cez formulár na tejto stránke. Povedz nám, o akú službu máš záujem; termín a cenu si dohodneme priamo.',
  ],
  [
    'Kde nájdem aktuálny rozvrh a cenník?',
    'Aktuálne časy lekcií, otváracie hodiny a ceny si over telefonicky alebo na našom Facebooku. Pri skupinových lekciách si pred návštevou potvrď termín a dostupnosť miesta.',
  ],
  [
    'Pre aký vek je detská zumba?',
    'Vekové zaradenie a voľné miesta ti potvrdíme podľa aktuálnej skupiny. Pri kontakte nám napíš vek dieťaťa a či máš záujem o lekciu vo fitku alebo spoluprácu s materskou školou.',
  ],
  [
    'Kedy začnú nové kurzy a mobilita pre seniorov?',
    'Programy pripravujeme. Termíny, rozsah a ceny ešte nie sú zverejnené. Ak máš záujem, ozvi sa nám. Pri programe v zariadení pre seniorov s nami môže možnosti spolupráce prebrať jeho vedenie.',
  ],
];
export function Faq() {
  return (
    <Accordion>
      {faqs.map(([q, a], i) => (
        <AccordionItem key={q} value={String(i)}>
          <AccordionTrigger>{q}</AccordionTrigger>
          <AccordionContent>
            <p>{a}</p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

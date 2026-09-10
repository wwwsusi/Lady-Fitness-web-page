'use client';

import { useState } from 'react';
import styles from './v2.module.css';

const phone = '+421908891961';
const services = [
  'Prvá návšteva fitness',
  'Mesačná permanentka',
  'Osobný tréning',
  'Strava a poradenstvo',
  'Záujem o pripravované kurzy',
  'Záujem o seminár',
  'Spolupráca — detská zumba',
  'Spolupráca — mobilita seniorov',
];

function createMessage(name: string, service: string, time: string) {
  return `Dobrý deň, mám záujem o: ${service}.${name ? ` Moje meno je ${name}.` : ''}${time ? ` Vyhovovalo by mi: ${time}.` : ''} Prosím o informácie a potvrdenie možností alebo termínu. Ďakujem.`;
}

export default function V2ContactForm() {
  const [message, setMessage] = useState('');
  const [notice, setNotice] = useState('');

  return (
    <form
      className={styles.form}
      onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const serviceValue = data.get('service');
        const nameValue = data.get('name');
        const timeValue = data.get('time');
        const service = typeof serviceValue === 'string' ? serviceValue : services[0];
        const name = typeof nameValue === 'string' ? nameValue.trim().slice(0, 60) : '';
        const time = typeof timeValue === 'string' ? timeValue.trim().slice(0, 100) : '';
        setMessage(createMessage(name, service, time));
        setNotice('Návrh je pripravený. Správa ešte nebola odoslaná.');
      }}
    >
      <div className={styles.formIntro}>
        <strong>Priprav si správu</strong>
        <span>Vyplnené údaje zostávajú v tomto prehliadači.</span>
      </div>

      <label htmlFor="v2-service">O čo máš záujem?</label>
      <select id="v2-service" name="service" defaultValue={services[0]}>
        {services.map((service) => <option key={service}>{service}</option>)}
      </select>

      <label htmlFor="v2-name">Tvoje meno <span>(nepovinné)</span></label>
      <input id="v2-name" name="name" maxLength={60} autoComplete="name" placeholder="Ako ťa môžeme osloviť?" />

      <label htmlFor="v2-time">Kedy ti to vyhovuje? <span>(nepovinné)</span></label>
      <input id="v2-time" name="time" maxLength={100} placeholder="Napríklad budúci týždeň po 16:00" />

      <button className={styles.primaryButton} type="submit">Pripraviť správu <span aria-hidden="true">↗</span></button>

      {message && (
        <div className={styles.messagePreview}>
          <h3>Tvoja správa</h3>
          <p>{message}</p>
          <a className={styles.secondaryButton} href={`sms:${phone}?body=${encodeURIComponent(message)}`}>Otvoriť v SMS <span aria-hidden="true">↗</span></a>
        </div>
      )}
      <output className={styles.status} aria-live="polite">{notice}</output>
    </form>
  );
}

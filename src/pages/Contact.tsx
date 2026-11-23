import { useState } from 'react';
import { PageHero } from '../components/PageHero';
import { Arrow, Ext } from '../components/Icons';
import { ReserveButton } from '../components/Reserve';
import { business, hours, louisvilleNow } from '../data/business';
import { useNetlifyForm } from '../lib/forms';
import { useNow } from '../lib/useNow';
import './contact.css';

function ContactForm() {
  const { state, onSubmit } = useNetlifyForm('contact');
  return (
    <form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field" onSubmit={onSubmit} className="ct-form" aria-describedby="ct-req">
      <input type="hidden" name="form-name" value="contact" />
      <p className="hp"><label>Don’t fill this out if you’re human: <input name="bot-field" tabIndex={-1} autoComplete="off" /></label></p>
      <h2 className="h3">Send us a message</h2>
      <p id="ct-req" className="muted" style={{ fontSize: '0.9rem' }}>Fields marked <span className="req" aria-hidden="true">*</span><span className="sr-only">with an asterisk</span> are required.</p>
      <div className="form-grid form-grid--2">
        <div className="field"><label htmlFor="ct-name">Name <span className="req" aria-hidden="true">*</span></label><input id="ct-name" name="name" autoComplete="name" required /></div>
        <div className="field"><label htmlFor="ct-email">Email <span className="req" aria-hidden="true">*</span></label><input id="ct-email" name="email" type="email" autoComplete="email" required /></div>
        <div className="field span-2"><label htmlFor="ct-phone">Phone</label><input id="ct-phone" name="phone" type="tel" autoComplete="tel" /></div>
        <div className="field span-2"><label htmlFor="ct-msg">Message <span className="req" aria-hidden="true">*</span></label><textarea id="ct-msg" name="message" required /></div>
      </div>
      <button className="btn ct-form__submit" type="submit" disabled={state === 'sending'}>{state === 'sending' ? 'Sending…' : 'Send message'} <Arrow /></button>
      <div role="status" aria-live="polite">
        {state === 'sent' && <p className="form-status">Thank you — your message is on its way. We’ll be in touch soon.</p>}
        {state === 'error' && <p className="form-status form-status--error">We couldn’t send your message. Please email <a className="text-link" href={business.emailHref}>{business.email}</a> or call <a className="text-link" href={business.phoneHref}>{business.phone}</a>.</p>}
      </div>
    </form>
  );
}

function Map() {
  const [load, setLoad] = useState(false);
  return (
    <div className="ct-map">
      {load ? (
        <iframe title="Map showing Varanese at 2106 Frankfort Ave, Louisville" src={business.mapsEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
      ) : (
        <button className="ct-map__load" onClick={() => setLoad(true)}>
          <span className="eyebrow brass">2106 Frankfort Ave · Clifton</span>
          <span className="h3">Show the map</span>
          <span className="muted" style={{ fontSize: '0.85rem' }}>Loads Google Maps</span>
        </button>
      )}
    </div>
  );
}

export default function Contact() {
  const { now, live } = useNow();
  const today = live ? louisvilleNow(now).day : -1;
  return (
    <>
      <PageHero
        eyebrow="Visit · contact"
        title="We’d love *to hear from you.*"
        sub={<p>{business.address.street}, in Louisville’s historic Clifton neighborhood.</p>}
        aside={<ReserveButton className="btn btn--brass">Reserve on OpenTable <Arrow /></ReserveButton>}
      />
      <section className="section ct" aria-label="Contact information and form">
        <div className="wrap ct__grid">
          <div className="ct__info">
            <div className="ct__block">
              <h2 className="eyebrow brass">Address</h2>
              <address className="ct__big">{business.address.street}<br />{business.address.city}, {business.address.region} {business.address.zip}</address>
              <a className="link" href={business.directionsUrl} target="_blank" rel="noopener">Get directions <Ext /><span className="sr-only">(opens in a new tab)</span></a>
            </div>
            <div className="ct__block">
              <h2 className="eyebrow brass">Phone &amp; email</h2>
              <p className="ct__big"><a href={business.phoneHref}>{business.phone}</a><br /><a href={business.emailHref}>{business.email}</a></p>
            </div>
            <div className="ct__block">
              <h2 className="eyebrow brass">Hours</h2>
              <ul className="ct__hours num">
                {hours.map((h) => (
                  <li key={h.label} className={(h.days as readonly number[]).includes(today) ? 'is-today' : ''}>
                    <span>{h.label}</span><span>{h.display}</span>
                    {(h.days as readonly number[]).includes(today) && <span className="sr-only"> (today)</span>}
                  </li>
                ))}
              </ul>
            </div>
            <div className="ct__block">
              <h2 className="eyebrow brass">Directions</h2>
              <ul className="ct__dir">
                {business.directions.map((d) => <li key={d.from}><strong>{d.from}:</strong> {d.how}</li>)}
              </ul>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
      <Map />
    </>
  );
}

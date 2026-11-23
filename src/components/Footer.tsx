import { Link } from 'react-router-dom';
import { business, hours } from '../data/business';
import { useNetlifyForm } from '../lib/forms';
import { Arrow, Ext } from './Icons';
import { Logo } from './Header';
import './footer.css';

function Newsletter() {
  const { state, onSubmit } = useNetlifyForm('newsletter');
  return (
    <form name="newsletter" method="POST" data-netlify="true" netlify-honeypot="bot-field" className="nl" onSubmit={onSubmit}>
      <input type="hidden" name="form-name" value="newsletter" />
      <p className="hp"><label>Don’t fill this out: <input name="bot-field" tabIndex={-1} autoComplete="off" /></label></p>
      <p className="eyebrow brass" id="nl-title">Join our newsletter</p>
      <p className="nl__copy muted">Bourbon dinners, seasonal menus and holiday traditions — first.</p>
      <div className="nl__row">
        <label className="sr-only" htmlFor="nl-name">Your name</label>
        <input id="nl-name" name="name" type="text" placeholder="Your name" autoComplete="name" required />
        <label className="sr-only" htmlFor="nl-email">Email address</label>
        <input id="nl-email" name="email" type="email" placeholder="Email address" autoComplete="email" required />
        <button type="submit" className="nl__btn" disabled={state === 'sending'} aria-label="Subscribe">
          <span>{state === 'sending' ? 'Sending' : 'Subscribe'}</span> <Arrow />
        </button>
      </div>
      <p className="nl__status" role="status" aria-live="polite">
        {state === 'sent' && 'Thank you — you’re on the list.'}
        {state === 'error' && <>Something went wrong. Please email <a className="text-link" href={business.emailHref}>{business.email}</a>.</>}
      </p>
    </form>
  );
}

export function Footer() {
  return (
    <footer className="ftr dark">
      <div className="wrap">
        <div className="ftr__top">
          <p className="ftr__sign h2" aria-hidden="true">Until the <em>next</em> evening.</p>
          <Newsletter />
        </div>
        <div className="ftr__cols">
          <div>
            <Link to="/" aria-label="Varanese — home"><Logo className="ftr__logo" /></Link>
            <p className="muted ftr__about">New American cuisine in Louisville’s historic Clifton neighborhood on Frankfort Avenue.</p>
          </div>
          <div>
            <h2 className="eyebrow brass">Visit</h2>
            <address>
              {business.address.street}<br />
              {business.address.city}, {business.address.region} {business.address.zip}
            </address>
            <a className="link" href={business.directionsUrl} target="_blank" rel="noopener">Directions <Ext /><span className="sr-only">(opens in a new tab)</span></a>
          </div>
          <div>
            <h2 className="eyebrow brass">Hours</h2>
            <ul className="num">
              {hours.map((h) => <li key={h.short}><span>{h.short}</span> {h.display}</li>)}
            </ul>
          </div>
          <div>
            <h2 className="eyebrow brass">Contact</h2>
            <ul>
              <li><a href={business.phoneHref}>{business.phone}</a></li>
              <li><a href={business.emailHref}>{business.email}</a></li>
            </ul>
            <ul className="ftr__social">
              <li><a href={business.social.facebook} target="_blank" rel="noopener">Facebook<span className="sr-only"> (opens in a new tab)</span></a></li>
              <li><a href={business.social.x} target="_blank" rel="noopener">X / Twitter<span className="sr-only"> (opens in a new tab)</span></a></li>
              <li><a href={business.social.tripadvisor} target="_blank" rel="noopener">Tripadvisor<span className="sr-only"> (opens in a new tab)</span></a></li>
            </ul>
          </div>
          <nav aria-label="Footer">
            <h2 className="eyebrow brass">Explore</h2>
            <ul>
              <li><Link to="/menu/">Dinner Menu</Link></li>
              <li><Link to="/wine-list/">Wine List</Link></li>
              <li><Link to="/bourbon-flights/">Bourbon Flights</Link></li>
              <li><Link to="/beer-wine/">Beer &amp; Spirits</Link></li>
              <li><Link to="/private-dining/">Private Dining</Link></li>
              <li><Link to="/events/">Events</Link></li>
              <li><Link to="/gift-cards/">Gift Cards</Link></li>
            </ul>
          </nav>
        </div>
        <div className="ftr__base">
          <p>© {new Date().getFullYear()} Varanese. All rights reserved.</p>
          <p><Link to="/privacy-policy/">Privacy Policy</Link> <span aria-hidden="true">·</span> <Link to="/accessibility/">Accessibility</Link></p>
        </div>
      </div>
    </footer>
  );
}

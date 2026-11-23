import { PageHero } from '../components/PageHero';
import { Img } from '../components/Img';
import { Split } from '../components/Split';
import { Arrow } from '../components/Icons';
import { business } from '../data/business';
import { groupRange, rooms } from '../data/privateDining';
import { useNetlifyForm } from '../lib/forms';
import './private.css';

const OCCASIONS = ['Special occasions', 'Corporate gatherings', 'Celebrations', 'Group dinners', 'Private events'];

function Tilt({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="tilt"
      onPointerMove={(e) => {
        if (e.pointerType !== 'mouse') return;
        const r = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        e.currentTarget.style.setProperty('--rx', `${(-y * 4).toFixed(2)}deg`);
        e.currentTarget.style.setProperty('--ry', `${(x * 5).toFixed(2)}deg`);
      }}
      onPointerLeave={(e) => {
        e.currentTarget.style.setProperty('--rx', '0deg');
        e.currentTarget.style.setProperty('--ry', '0deg');
      }}
    >
      {children}
    </div>
  );
}

function InquiryForm() {
  const { state, onSubmit } = useNetlifyForm('private-dining');
  return (
    <form name="private-dining" method="POST" data-netlify="true" netlify-honeypot="bot-field" onSubmit={onSubmit} className="pd-form" aria-describedby="pd-req">
      <input type="hidden" name="form-name" value="private-dining" />
      <p className="hp"><label>Don’t fill this out: <input name="bot-field" tabIndex={-1} autoComplete="off" /></label></p>
      <p id="pd-req" className="muted" style={{ fontSize: '0.9rem' }}>Fields marked <span className="req" aria-hidden="true">*</span><span className="sr-only">with an asterisk</span> are required.</p>
      <div className="form-grid form-grid--2">
        <div className="field"><label htmlFor="pd-name">Name <span className="req" aria-hidden="true">*</span></label><input id="pd-name" name="name" autoComplete="name" required /></div>
        <div className="field"><label htmlFor="pd-email">Email <span className="req" aria-hidden="true">*</span></label><input id="pd-email" name="email" type="email" autoComplete="email" required /></div>
        <div className="field"><label htmlFor="pd-phone">Phone</label><input id="pd-phone" name="phone" type="tel" autoComplete="tel" /></div>
        <div className="field"><label htmlFor="pd-date">Preferred date</label><input id="pd-date" name="date" type="date" /></div>
        <div className="field"><label htmlFor="pd-guests">Number of guests <span className="req" aria-hidden="true">*</span></label><input id="pd-guests" name="guests" type="number" min={1} max={300} inputMode="numeric" required /></div>
        <div className="field">
          <label htmlFor="pd-room">Room preference</label>
          <select id="pd-room" name="room" defaultValue="No preference">
            <option>No preference</option>
            {rooms.map((r) => <option key={r.id}>{r.name} ({r.guests} guests)</option>)}
          </select>
        </div>
        <div className="field span-2">
          <label htmlFor="pd-occasion">Occasion</label>
          <select id="pd-occasion" name="occasion" defaultValue="">
            <option value="">Select an occasion</option>
            {OCCASIONS.map((o) => <option key={o}>{o}</option>)}
            <option>Other</option>
          </select>
        </div>
        <div className="field span-2"><label htmlFor="pd-msg">Tell us about your event</label><textarea id="pd-msg" name="message" /></div>
      </div>
      <button className="btn btn--burgundy pd-form__submit" type="submit" disabled={state === 'sending'}>
        {state === 'sending' ? 'Sending…' : 'Inquire about your event'} <Arrow />
      </button>
      <div role="status" aria-live="polite">
        {state === 'sent' && <p className="form-status">Thank you. Our events team has your inquiry and will be in touch to plan every detail.</p>}
        {state === 'error' && (
          <p className="form-status form-status--error">
            We couldn’t send your inquiry. Please email <a className="text-link" href={business.emailHref}>{business.email}</a> or call{' '}
            <a className="text-link" href={business.phoneHref}>{business.phone}</a>.
          </p>
        )}
      </div>
    </form>
  );
}

export default function PrivateDining() {
  return (
    <>
      <PageHero
        eyebrow="Private dining"
        title="Host your next event *at Varanese.*"
        sub={<p>Whether you’re planning an intimate dinner or a grand celebration, our New American cuisine and dedicated service make every gathering unforgettable.</p>}
        image="private-dining-legacy"
        imageAlt="The Legacy Room set for a private dinner"
        aside={
          <div className="pd-hero-aside">
            <p className="h3">{groupRange}</p>
            <a href="#inquire" className="btn btn--brass">Inquire about your event <Arrow /></a>
          </div>
        }
      />
      <div className="pd-occasions" aria-label="Occasions we host">
        <ul>{[...OCCASIONS, ...OCCASIONS].map((o, i) => <li key={i} aria-hidden={i >= OCCASIONS.length}>{o}<span aria-hidden="true">✦</span></li>)}</ul>
      </div>

      <section className="section pd-rooms" aria-labelledby="rooms-h">
        <div className="wrap">
          <div className="pd-rooms__head">
            <p className="eyebrow brass">Our private dining rooms</p>
            <Split id="rooms-h" className="h1" text="Four rooms. *Every kind* of evening." />
            <p className="muted" data-reveal="up">Varanese offers private dining rooms in Louisville’s historic Clifton neighborhood.</p>
          </div>
          {rooms.map((r, n) => (
            <article key={r.id} className={`room ${n % 2 ? 'room--flip' : ''}`} aria-labelledby={`room-${r.id}`}>
              <Tilt>
                <figure className="room__fig" data-reveal="mask">
                  <Img name={r.image} alt={r.alt} sizes="(min-width: 1024px) 55vw, 92vw" cover />
                </figure>
              </Tilt>
              <div className="room__text" data-reveal="up">
                <p className="room__n num">{String(n + 1).padStart(2, '0')} / 0{rooms.length}</p>
                <h3 id={`room-${r.id}`} className="h2">{r.name}</h3>
                <dl className="room__facts">
                  <div><dt className="eyebrow muted">Guests</dt><dd className="num">{r.guests}</dd></div>
                  <div><dt className="eyebrow muted">Minimum · Sun–Thu</dt><dd className="num">{r.min.sunThu}</dd></div>
                  <div><dt className="eyebrow muted">Minimum · Fri–Sat</dt><dd className="num">{r.min.friSat}</dd></div>
                </dl>
                <a href="#inquire" className="link">Inquire about {r.name} <Arrow /></a>
              </div>
            </article>
          ))}
          <div className="pd-table-wrap" data-reveal="up">
            <table className="pd-table">
              <caption className="eyebrow brass">At a glance</caption>
              <thead><tr><th scope="col">Room</th><th scope="col">Guests</th><th scope="col">Minimum Sun–Thu</th><th scope="col">Minimum Fri–Sat</th></tr></thead>
              <tbody>
                {rooms.map((r) => <tr key={r.id}><th scope="row">{r.name}</th><td>{r.guests}</td><td>{r.min.sunThu}</td><td>{r.min.friSat}</td></tr>)}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="inquire" className="section pd-inquire dark" aria-labelledby="inquire-h">
        <div className="wrap pd-inquire__grid">
          <div>
            <p className="eyebrow brass">Ready to book?</p>
            <Split id="inquire-h" className="h1" text="Let’s plan *every detail.*" />
            <p className="muted pd-inquire__copy" data-reveal="up">
              Contact us to reserve a private dining room for your next special occasion. Our events team is happy to help plan every detail.
            </p>
            <ul className="pd-direct" data-reveal="up">
              <li><span className="eyebrow muted">Call</span><a href={business.phoneHref}>{business.phone}</a></li>
              <li><span className="eyebrow muted">Email</span><a href={`${business.emailHref}?subject=Private%20Dining%20Inquiry`}>{business.email}</a></li>
            </ul>
          </div>
          <InquiryForm />
        </div>
      </section>
    </>
  );
}

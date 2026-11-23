import { Link, useLocation } from 'react-router-dom';
import { Img } from '../components/Img';
import { Split } from '../components/Split';
import { ReserveButton } from '../components/Reserve';
import { Arrow, Phone } from '../components/Icons';
import { business } from '../data/business';
import { findEvent, isExpired, upcomingEvents } from '../data/events';
import { useNow } from '../lib/useNow';
import NotFound from './NotFound';
import './events.css';

export default function EventDetail() {
  const slug = useLocation().pathname.split('/').filter(Boolean)[1] ?? '';
  const e = findEvent(slug);
  const { now } = useNow();
  if (!e) return <NotFound />;
  const occ = upcomingEvents(now).find((o) => o.event.slug === slug);
  const past = isExpired(e, now);
  return (
    <>
      <header className="evd-hero dark">
        <div className="wrap evd-hero__grid">
          <div>
            <Link to="/events/" className="link evd-back"><span aria-hidden="true">←</span> All events</Link>
            <p className="eyebrow brass" style={{ marginTop: '2rem' }}>{e.category}</p>
            <Split as="h1" className="h1 evd-title" text={e.title} delay={0.1} />
            <p className="evd-when">{past ? 'This event has passed.' : occ?.label}</p>
            {e.price && <p className="evd-price h3">{e.price}</p>}
            <p className="lede evd-intro">{e.intro}</p>
            <div className="evd-ctas">
              {past ? (
                <Link to="/events/" className="btn btn--brass">See upcoming events <Arrow /></Link>
              ) : e.cta === 'call' ? (
                <>
                  <a href={business.phoneHref} className="btn btn--brass"><Phone /> Call {business.phone}</a>
                  <ReserveButton className="btn btn--ghost light-ghost on-dark-ghost">Reserve a table</ReserveButton>
                </>
              ) : (
                <>
                  <ReserveButton className="btn btn--brass">Reserve a table <Arrow /></ReserveButton>
                  <a href={business.phoneHref} className="btn btn--ghost light-ghost on-dark-ghost">Call {business.phone}</a>
                </>
              )}
            </div>
          </div>
          <figure className="evd-flyer" data-reveal="mask">
            <Img name={e.image} alt={e.imageAlt} priority sizes="(min-width: 1024px) 40vw, 92vw" />
          </figure>
        </div>
      </header>
      <section className="section evd-body" aria-label="Event details">
        <div className="wrap wrap--narrow">
          {e.blocks.map((b, n) => (
            <div key={n} className="evd-block" data-reveal="up">
              {b.heading && <h2 className="evd-block__h eyebrow brass">{b.heading}</h2>}
              <ul>
                {b.lines.map((l) => (
                  <li key={l.text}>
                    <span className="evd-line">{l.text}</span>
                    {l.sub && <span className="evd-sub muted">{l.sub}</span>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          {e.footnote && <p className="evd-foot muted">{e.footnote}</p>}
          {e.extraImage && (
            <figure className="evd-extra" data-reveal="up">
              <Img name={e.extraImage.key} alt={e.extraImage.alt} sizes="(min-width: 980px) 900px, 92vw" />
            </figure>
          )}
        </div>
      </section>
    </>
  );
}

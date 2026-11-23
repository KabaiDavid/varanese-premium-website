import { Link } from 'react-router-dom';
import { PageHero } from '../components/PageHero';
import { Img } from '../components/Img';
import { Arrow } from '../components/Icons';
import { upcomingEvents, type Occurrence } from '../data/events';
import { useNow } from '../lib/useNow';
import './events.css';

function Row({ o, n }: { o: Occurrence; n: number }) {
  const e = o.event;
  return (
    <li className="ev" data-reveal="up" style={{ ['--d' as string]: `${(n % 3) * 0.06}s` } as React.CSSProperties}>
      <Link to={`/events/${e.slug}/`} className="ev__link">
        <span className="ev__date">
          <span className="eyebrow brass">{o.month}</span>
          <span className="ev__day num">{o.day}</span>
          <span className="eyebrow muted">{o.weekday}</span>
        </span>
        <span className="ev__img zoom"><Img name={e.image} alt="" sizes="(min-width: 1024px) 22vw, 40vw" cover /></span>
        <span className="ev__body">
          <span className="eyebrow muted">{e.category}{o.isToday ? ' · Tonight' : ''}</span>
          <span className="ev__title h3">{e.title}</span>
          <span className="ev__sum muted">{e.summary}</span>
          <span className="ev__meta">{o.label}{e.price ? <> · <strong>{e.price}</strong></> : null}</span>
        </span>
        <span className="ev__go" aria-hidden="true"><Arrow /></span>
      </Link>
    </li>
  );
}

export default function Events() {
  const { now } = useNow();
  const all = upcomingEvents(now);
  const special = all.filter((o) => o.event.kind !== 'recurring');
  const weekly = all.filter((o) => o.event.kind === 'recurring');
  const featured = special[0];
  return (
    <>
      <PageHero
        eyebrow="What’s happening at Varanese"
        title="Evenings *worth planning for.*"
        sub={<p>Bourbon dinners, holiday traditions and weekly specials on Frankfort Avenue.</p>}
      />
      {featured && (
        <section className="ev-feature dark" aria-labelledby="feat-h">
          <div className="wrap ev-feature__grid">
            <figure className="ev-feature__fig" data-reveal="mask">
              <Img name={featured.event.image} alt={featured.event.imageAlt} priority sizes="(min-width: 1024px) 45vw, 92vw" />
            </figure>
            <div className="ev-feature__text">
              <p className="eyebrow brass">Next special event · {featured.event.category}</p>
              <h2 id="feat-h" className="h1">{featured.event.title}</h2>
              <p className="ev-feature__when">{featured.label}</p>
              <p className="muted">{featured.event.summary}</p>
              <Link to={`/events/${featured.event.slug}/`} className="btn btn--brass">Details{featured.event.price ? ` · ${featured.event.price}` : ''} <Arrow /></Link>
            </div>
          </div>
        </section>
      )}
      <section className="section ev-section" aria-labelledby="special-h">
        <div className="wrap">
          {special.length > 1 && (
            <>
              <h2 id="special-h" className="ev-section__h eyebrow brass">Special &amp; seasonal</h2>
              <ul className="ev-list">{special.slice(1).map((o, n) => <Row key={o.event.slug} o={o} n={n} />)}</ul>
            </>
          )}
          {special.length <= 1 && <h2 id="special-h" className="sr-only">Upcoming events</h2>}
          <h2 className="ev-section__h eyebrow brass">Every week at Varanese</h2>
          <ul className="ev-list">{weekly.map((o, n) => <Row key={o.event.slug} o={o} n={n} />)}</ul>
          <p className="ev-note muted">Planning a celebration of your own? <Link className="text-link" to="/private-dining/">Explore private dining</Link>.</p>
        </div>
      </section>
    </>
  );
}

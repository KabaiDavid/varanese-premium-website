import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { Img } from '../components/Img';
import { Split } from '../components/Split';
import { ReserveButton } from '../components/Reserve';
import { WaterWall } from '../components/WaterWall';
import { EveningClock, type Chapter } from '../components/EveningClock';
import { Arrow, Diamond } from '../components/Icons';
import { business, hours } from '../data/business';
import { findDish, signatureDishNames } from '../data/menu';
import { bourbonFlights } from '../data/bar';
import { wineList } from '../data/wine';
import { rooms, groupRange } from '../data/privateDining';
import { upcomingEvents } from '../data/events';
import { useNow } from '../lib/useNow';
import { HONORS } from '../data/story';
import './home.css';

const CHAPTERS: Chapter[] = [
  { id: 'arrival', time: '5:00 PM', label: 'Arrival' },
  { id: 'bar', time: '5:30 PM', label: 'The bar' },
  { id: 'kitchen', time: '6:30 PM', label: 'The kitchen' },
  { id: 'chef', time: '7:30 PM', label: 'The chef' },
  { id: 'veranda', time: '8:30 PM', label: 'The Veranda' },
  { id: 'recognition', time: '9:30 PM', label: 'Recognition' },
  { id: 'this-week', time: '10:00 PM', label: 'This week' },
  { id: 'gather', time: '10:30 PM', label: 'Gatherings' },
  { id: 'reserve', time: '11:00 PM', label: 'Your table' },
];

const wineCount = wineList.reduce((n, s) => n + s.items.length, 0);

const Time = ({ t, label }: { t: string; label: string }) => (
  <p className="eyebrow eyebrow--time chapter-time brass" data-reveal="fade">
    <span className="num">{t}</span> <span aria-hidden="true">·</span> {label}
  </p>
);

function Arrival() {
  return (
    <section id="arrival" className="section arrival" aria-labelledby="arrival-title">
      <div className="wrap arrival__grid">
        <div className="arrival__text">
          <Time t="5:00 PM" label="The doors open" />
          <Split id="arrival-title" className="h1" text="A neighborhood gem on *Frankfort Avenue.*" />
          <div className="arrival__body" data-reveal="up">
            <p className="lede">
              Nestled in Louisville’s historic Clifton neighborhood, Varanese welcomes up to 150 guests with award-winning New American
              cuisine crafted by Chef John Varanese.
            </p>
            <p className="muted">From locally sourced ingredients to inventive seasonal plates, every visit is a celebration of flavor.</p>
            <Link to="/about/" className="link">Our story <Arrow /></Link>
          </div>
        </div>
        <figure className="arrival__fig arrival__fig--a" data-reveal="mask">
          <div data-parallax="-0.06" className="pl"><Img name="private-dining-soren" alt="Warm wood, pendant light and white tablecloths in the Varanese dining room" sizes="(min-width: 1024px) 45vw, 92vw" cover /></div>
        </figure>
        <figure className="arrival__fig arrival__fig--b" data-reveal="mask" style={{ ['--d' as string]: '0.2s' } as React.CSSProperties}>
          <Img name="private-dining-capri" alt="Tables set in The Capri, an intimate room at Varanese" sizes="(min-width: 1024px) 22vw, 50vw" cover />
        </figure>
        <dl className="facts">
          <div data-reveal="up"><dt className="eyebrow muted">Since</dt><dd className="h3">August 2007</dd></div>
          <div data-reveal="up" style={{ ['--d' as string]: '0.1s' } as React.CSSProperties}><dt className="eyebrow muted">Seats</dt><dd className="h3">150 guests</dd><dd className="muted">Bar · Dining Room · Veranda</dd></div>
          <div data-reveal="up" style={{ ['--d' as string]: '0.2s' } as React.CSSProperties}><dt className="eyebrow muted">Open</dt><dd className="h3">Seven nights</dd><dd className="muted">From 5 PM</dd></div>
        </dl>
      </div>
    </section>
  );
}

function Bar() {
  const strip = ['gallery-bar-2-800x533', 'bar', 'gallery-bar-3-800x533', 'gallery-bar-4-800x533', 'gallery-bar-1-800x533'];
  return (
    <section id="bar" className="section bar dark" aria-labelledby="bar-title">
      <div className="wrap bar__head">
        <div>
          <Time t="5:30 PM" label="At the bar" />
          <Split id="bar-title" className="h1" text="Kentucky, *poured slowly.*" />
        </div>
        <div className="bar__intro" data-reveal="up">
          <p className="lede">Craft beers, more than sixty bourbons and a full spirits selection — with curated flights for tasting and comparing Kentucky’s finest.</p>
          <p className="muted bar__jazz"><Diamond className="brass" /> Evenings are set to live jazz — ask us about tonight’s music.</p>
        </div>
      </div>
      <div className="bar__strip" tabIndex={0} aria-label="Photographs of the bar at Varanese" role="region">
        <ul data-hscroll>
          {strip.map((s, n) => (
            <li key={s} className={`bar__shot bar__shot--${n}`}>
              <Img name={s} alt={n === 1 ? 'The long bar at Varanese with its wall of bourbon and wine' : 'The bar at Varanese'} sizes="(min-width: 1024px) 38vw, 80vw" cover />
            </li>
          ))}
        </ul>
      </div>
      <div className="wrap">
        <ul className="bar__stats">
          <li data-reveal="up">
            <Link to="/beer-wine/"><span className="bar__n">60+</span><span className="bar__l">bourbons on the shelf</span><Arrow /></Link>
          </li>
          <li data-reveal="up" style={{ ['--d' as string]: '0.1s' } as React.CSSProperties}>
            <Link to="/bourbon-flights/"><span className="bar__n">{bourbonFlights.length}</span><span className="bar__l">curated bourbon flights</span><Arrow /></Link>
          </li>
          <li data-reveal="up" style={{ ['--d' as string]: '0.2s' } as React.CSSProperties}>
            <Link to="/wine-list/"><span className="bar__n">{wineCount}</span><span className="bar__l">wines by the glass &amp; bottle</span><Arrow /></Link>
          </li>
        </ul>
      </div>
    </section>
  );
}

function Kitchen() {
  const dishes = signatureDishNames.map(findDish);
  const [active, setActive] = useState(0);
  return (
    <section id="kitchen" className="section kitchen" aria-labelledby="kitchen-title">
      <div className="wrap">
        <div className="kitchen__head">
          <Time t="6:30 PM" label="From the kitchen" />
          <Split id="kitchen-title" className="h1" text="Globally inspired. | *Locally sourced.*" />
        </div>
        <div className="kitchen__grid">
          <figure className="kitchen__plate" data-reveal="mask">
            <div className="pl" data-parallax="-0.08">
              <Img name="hero" alt="A plated entrée from the Varanese kitchen" sizes="(min-width: 1024px) 50vw, 100vw" cover position="45% 50%" />
            </div>
            <figcaption className="eyebrow">Seasonal · Local · New American</figcaption>
          </figure>
          <div className="kitchen__index">
            <p className="kitchen__copy" data-reveal="up">
              An eclectic New American menu, rooted in Louisville’s appreciation for fresh, locally sourced ingredients and globally
              inspired cooking — and refreshed alongside the dining room in 2025.
            </p>
            <h3 className="eyebrow muted kitchen__label" data-reveal="fade">Signatures from the dinner menu</h3>
            <ol className="dishes">
              {dishes.map((d, n) => (
                <li
                  key={d.name}
                  className={n === active ? 'is-active' : ''}
                  onMouseEnter={() => setActive(n)}
                  data-reveal="up"
                  style={{ ['--d' as string]: `${n * 0.06}s` } as React.CSSProperties}
                >
                  <button type="button" onClick={() => setActive(n)} onFocus={() => setActive(n)} aria-expanded={n === active}>
                    <span className="dishes__n num">{String(n + 1).padStart(2, '0')}</span>
                    <span className="dishes__name">{d.name}</span>
                    <span className="dishes__price num">${d.price}</span>
                  </button>
                  <p className="dishes__desc">{d.desc} <span className="muted">— {d.section}</span></p>
                </li>
              ))}
            </ol>
            <div className="kitchen__ctas" data-reveal="up">
              <Link to="/menu/" className="btn">Explore the menu <Arrow /></Link>
              <Link to="/menu/#chefs-features" className="link">Chef’s features</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Chef() {
  return (
    <section id="chef" className="section chef dark-2" aria-labelledby="chef-title">
      <div className="wrap chef__grid">
        <figure className="chef__photo" data-reveal="mask">
          <Img name="chef-john" alt="Chef John Varanese holding a tray of fresh microgreens in the kitchen" sizes="(min-width: 1024px) 34vw, 92vw" cover position="50% 30%" />
        </figure>
        <div className="chef__text">
          <Time t="7:30 PM" label="The chef" />
          <h2 id="chef-title" className="chef__name">
            <Split as="span" className="display" text="John" />
            <Split as="span" className="display chef__last" text="*Varanese*" delay={0.15} />
          </h2>
          <div className="chef__bio" data-reveal="up">
            <p className="lede">
              Trained at Johnson &amp; Wales, Kitchen Manager at Magnolias — a landmark of Southern cuisine — and Executive Chef at Azalea and the Cardinal
              Club before opening his flagship on Frankfort Avenue in August 2007.
            </p>
            <p className="muted">
              Twice invited to cook at the James Beard House in New York — in 2012 and again in 2017 — and named Restaurateur of the Year
              by the Kentucky Restaurant Association.
            </p>
            <Link to="/about/" className="link">Read his story <Arrow /></Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Veranda() {
  return (
    <section id="veranda" className="veranda" aria-labelledby="veranda-title">
      <WaterWall className="veranda__canvas" />
      <div className="wrap veranda__grid">
        <div className="veranda__text">
          <Time t="8:30 PM" label="The Veranda" />
          <Split id="veranda-title" className="h1" text="Twenty feet of *falling water.*" />
          <div data-reveal="up" className="veranda__body">
            <p className="lede">
              The Veranda Patio is the architectural heart of Varanese — a 20-foot slate water wall and retractable glass doors that open
              the room to Frankfort Avenue for indoor-outdoor dining.
            </p>
            <p className="muted">
              In 2025 the restaurant completed a full interior renovation: a refreshed, modernized dining space alongside an updated
              menu that reflects Chef Varanese’s continued evolution.
            </p>
          </div>
        </div>
        <figure className="veranda__fig" data-reveal="mask">
          <Img name="private-dining-veranda" alt="The Veranda event space at Varanese" sizes="(min-width: 1024px) 42vw, 92vw" cover />
          <figcaption className="eyebrow muted">The Veranda — seats up to 80 for private events</figcaption>
        </figure>
      </div>
      <p className="veranda__credit eyebrow" aria-hidden="true">Artwork · the water wall, in motion</p>
    </section>
  );
}



function Recognition() {
  return (
    <section id="recognition" className="section recog paper" aria-labelledby="recog-title">
      <div className="wrap">
        <div className="recog__head">
          <Time t="9:30 PM" label="Recognition" />
          <Split id="recog-title" className="h1" text="Celebrated *beyond* Frankfort Avenue." />
        </div>
        <ul className="honors">
          {HONORS.map((h, n) => (
            <li key={h.what} data-reveal="up" style={{ ['--d' as string]: `${n * 0.05}s` } as React.CSSProperties}>
              <span className="honors__when eyebrow brass">{h.when}</span>
              <span className="honors__what">{h.what}</span>
              <span className="honors__where muted">{h.where}</span>
            </li>
          ))}
        </ul>
        <p className="recog__more" data-reveal="up">
          <span className="muted">Hear it from our guests</span>
          <a className="link" href={business.social.tripadvisor} target="_blank" rel="noopener">Tripadvisor reviews <Arrow /><span className="sr-only">(opens in a new tab)</span></a>
          <a className="link" href={business.reserveUrl} target="_blank" rel="noopener">OpenTable reviews <Arrow /><span className="sr-only">(opens in a new tab)</span></a>
        </p>
      </div>
    </section>
  );
}

function ThisWeek() {
  const { now } = useNow();
  const list = upcomingEvents(now).slice(0, 4);
  return (
    <section id="this-week" className="section week dark" aria-labelledby="week-title">
      <div className="wrap week__grid">
        <div className="week__head">
          <Time t="10:00 PM" label="This week" />
          <Split id="week-title" className="h1" text="This week on *Frankfort Avenue.*" />
          <Link to="/events/" className="link" data-reveal="fade">All events <Arrow /></Link>
        </div>
        <ul className="week__list">
          {list.map(({ event: e, month, day, weekday, label }, n) => (
            <li key={e.slug} data-reveal="up" style={{ ['--d' as string]: `${n * 0.08}s` } as React.CSSProperties}>
              <Link to={`/events/${e.slug}/`} className="week__row">
                <span className="week__date">
                  <span className="eyebrow brass">{month}</span>
                  <span className="week__day num">{day}</span>
                </span>
                <span className="week__body">
                  <span className="eyebrow muted">{weekday} · {e.category}</span>
                  <span className="week__title h3">{e.title}</span>
                  <span className="week__meta muted">{label}{e.price ? ` · ${e.price}` : ''}</span>
                </span>
                <Arrow className="arrow week__arrow" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Gather() {
  return (
    <section id="gather" className="gather" aria-labelledby="gather-title">
      <div className="gather__media" data-reveal="mask">
        <div className="pl" data-parallax="-0.08"><Img name="private-dining-legacy" alt="The Legacy Room set for a private dinner" sizes="100vw" cover /></div>
      </div>
      <div className="wrap gather__wrap">
        <div className="gather__card" data-reveal="up">
          <Time t="10:30 PM" label="Private dining" />
          <h2 id="gather-title" className="h2">Gather the people <em>who matter.</em></h2>
          <p className="muted">
            Celebrations, corporate dinners and milestone evenings — four private rooms with New American cuisine and dedicated
            service. {groupRange}.
          </p>
          <ul className="gather__rooms">
            {rooms.map((r) => (
              <li key={r.id}><span>{r.name}</span><span className="num muted">{r.guests} guests</span></li>
            ))}
          </ul>
          <Link to="/private-dining/" className="btn btn--burgundy">Inquire about your event <Arrow /></Link>
        </div>
      </div>
    </section>
  );
}

function Finale() {
  return (
    <section id="reserve" className="finale dark" aria-labelledby="finale-title">
      <div className="finale__bg" aria-hidden="true">
        <Img name="dine-with-us" alt="" sizes="100vw" cover position="55% 40%" />
      </div>
      <div className="wrap finale__wrap">
        <Time t="11:00 PM" label="Until next time" />
        <Split id="finale-title" className="display finale__title" text="Your table | *is waiting.*" />
        <div className="finale__ctas" data-reveal="up">
          <ReserveButton className="btn btn--brass">Reserve your table <Arrow /></ReserveButton>
          <a className="btn btn--ghost light-ghost on-dark-ghost" href={business.phoneHref}>Call {business.phone}</a>
        </div>
        <dl className="finale__info" data-reveal="up">
          <div><dt className="eyebrow brass">Address</dt><dd>{business.address.street}<br />{business.address.city}, {business.address.region} {business.address.zip}</dd></div>
          <div><dt className="eyebrow brass">Hours</dt><dd className="num">{hours.map((h) => <span key={h.short}>{h.short} · {h.display}<br /></span>)}</dd></div>
          <div><dt className="eyebrow brass">Gift the evening</dt><dd><Link to="/gift-cards/" className="text-link">Gift certificates</Link>, mailed to your door.</dd></div>
        </dl>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <EveningClock chapters={CHAPTERS} />
      <Arrival />
      <Bar />
      <Kitchen />
      <Chef />
      <Veranda />
      <Recognition />
      <ThisWeek />
      <Gather />
      <Finale />
    </>
  );
}

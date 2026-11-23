import { Link } from 'react-router-dom';
import { PageHero } from '../components/PageHero';
import { MenuFamily } from '../components/MenuFamily';
import { Arrow } from '../components/Icons';
import { beerSpirits } from '../data/bar';
import './menu.css';

export default function BeerSpirits() {
  return (
    <div className="menu-page">
      <PageHero
        eyebrow="Beer & spirits"
        title="Local taps, *a deep shelf.*"
        sub={<p>Craft beers, 60+ bourbons, and a full spirits selection.</p>}
        image="gallery-bar-4-800x533"
        imageAlt="The bar at Varanese"
      />
      <MenuFamily />
      <section className="section" style={{ paddingTop: 'clamp(3rem, 6vw, 5rem)' }} aria-label="Beer and spirits list">
        <div className="wrap wrap--narrow">
          <div className="callout" data-reveal="up">
            <div>
              <p className="eyebrow brass">Bourbon flights</p>
              <p style={{ marginTop: '0.5rem' }}>Explore Kentucky’s finest with our curated bourbon flight experiences, perfect for tasting and comparing rare selections.</p>
            </div>
            <Link to="/bourbon-flights/" className="btn btn--brass">View flights <Arrow /></Link>
          </div>
          <div className="acc">
            {beerSpirits.map((s, n) => (
              <details key={s.id} id={s.id} open={n < 2}>
                <summary>
                  <span><span className="t">{s.title}</span>{s.subtitle && <span className="s">{s.subtitle}</span>}</span>
                  <span className="plus" aria-hidden="true" />
                </summary>
                <ul className="acc__list">{s.items.map((i) => <li key={i}>{i}</li>)}</ul>
                {s.note && <p className="acc__note muted">{s.note}</p>}
              </details>
            ))}
          </div>
          <p className="muted" style={{ marginTop: '2rem', textAlign: 'center' }}>Full beverage list available at the restaurant. Selections and availability may change seasonally.</p>
        </div>
      </section>
    </div>
  );
}

import { Link } from 'react-router-dom';
import { PageHero } from '../components/PageHero';
import { MenuFamily } from '../components/MenuFamily';
import { ReserveButton } from '../components/Reserve';
import { Arrow } from '../components/Icons';
import { bourbonFlights } from '../data/bar';
import './menu.css';

export default function BourbonFlights() {
  return (
    <div className="dark">
      <PageHero
        eyebrow="Bourbon flights"
        title="Three pours. *One story.*"
        sub={<p>Curated tastings from Kentucky’s finest distilleries — {bourbonFlights.length} flights for tasting and comparing, side by side.</p>}
        image="bar"
        imageAlt="The bar at Varanese with its wall of bourbon"
      />
      <MenuFamily />
      <section className="section" aria-labelledby="flights-h" style={{ paddingTop: 'clamp(3rem, 6vw, 5rem)' }}>
        <div className="wrap">
          <h2 id="flights-h" className="sr-only">All bourbon flights</h2>
          <ul className="flights">
            {bourbonFlights.map((f, n) => (
              <li key={f.name} className="flight" data-reveal="up" style={{ ['--d' as string]: `${(n % 3) * 0.08}s` } as React.CSSProperties}>
                <div className="flight__top">
                  <h3 className="flight__name">{f.name}</h3>
                  <span className="flight__price num"><span className="sr-only">Price </span>${f.price}</span>
                </div>
                <span className="glasses" aria-hidden="true">
                  {[0.5, 0.65, 0.8].map((v, i) => <i key={i} style={{ ['--fill' as string]: `${v * 100}%` } as React.CSSProperties} />)}
                </span>
                <ol className="flight__pours">{f.pours.map((p) => <li key={p}>{p}</li>)}</ol>
              </li>
            ))}
          </ul>
          <p className="muted" style={{ marginTop: '2rem' }}>All items subject to availability.</p>
          <div className="menu-foot" style={{ paddingBottom: 0 }}>
            <h2 className="h2">Pair your flight with <em>dinner.</em></h2>
            <div className="menu-foot__ctas">
              <ReserveButton className="btn btn--brass">Reserve your table <Arrow /></ReserveButton>
              <Link to="/beer-wine/" className="btn btn--ghost light-ghost on-dark-ghost">The full bourbon list</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

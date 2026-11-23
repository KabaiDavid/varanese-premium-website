import { Link } from 'react-router-dom';
import { PageHero } from '../components/PageHero';
import { MenuFamily } from '../components/MenuFamily';
import { SectionNav } from '../components/SectionNav';
import { Arrow } from '../components/Icons';
import { wineList } from '../data/wine';
import './menu.css';

const Price = ({ v, label }: { v?: string; label: string }) =>
  v ? <span className="wine__p"><span className="sr-only">{label} </span>${v}</span> : <span className="wine__p wine__p--na" aria-label={`Not available by the ${label.toLowerCase()}`}>—</span>;

export default function WineList() {
  return (
    <div className="menu-page">
      <PageHero
        eyebrow="The wine list"
        title="Poured to pair with *the kitchen.*"
        sub={<p>Selections chosen to pair with our New American kitchen — by the glass, by the bottle, and a cellar of limited releases.</p>}
        image="gallery-bar-1-800x533"
        imageAlt="Wine racks above the bar at Varanese"
      />
      <MenuFamily />
      <SectionNav items={wineList.map((s) => ({ id: s.id, title: s.title }))} label="Wine categories" />
      <div className="wrap">
        <p className="menu-intro muted"><span>All wines subject to availability.</span><span className="wine-legend">Prices shown by the glass and by the bottle.</span></p>
        {wineList.map((s) => {
          const feature = s.id === 'limited-release';
          const hasGlass = s.items.some((i) => i.glass);
          const hasBottle = s.items.some((i) => i.bottle);
          return (
            <section key={s.id} id={s.id} className="msec" aria-labelledby={`${s.id}-h`}>
              <div className="msec__head">
                <h2 id={`${s.id}-h`} className="msec__title" data-reveal="up">{s.title}</h2>
                <p className="eyebrow brass msec__range">{s.items.length} selections</p>
                {feature && <p className="msec__note muted">Rare bottles from the cellar, with tasting notes.</p>}
              </div>
              <div>
                {!feature && (
                  <div className="wine-head eyebrow" aria-hidden="true"><span>Wine</span><span>{hasGlass ? 'Glass' : ''}</span><span>{hasBottle ? 'Bottle' : ''}</span></div>
                )}
                <ul>
                  {s.items.map((w) =>
                    feature ? (
                      <li key={w.name} className="wine wine--feature">
                        <h3 className="wine__name">{w.name}</h3>
                        <span className="wine__p"><span className="sr-only">Bottle </span>${w.bottle}</span>
                        {w.desc && <p className="wine__desc">{w.desc}</p>}
                      </li>
                    ) : (
                      <li key={w.name} className="wine">
                        <h3 className="wine__name">{w.name}</h3>
                        {hasGlass ? <Price v={w.glass} label="Glass" /> : <span />}
                        {hasBottle ? <Price v={w.bottle} label="Bottle" /> : <span />}
                        {w.desc && <p className="wine__desc">{w.desc}</p>}
                      </li>
                    ),
                  )}
                </ul>
              </div>
            </section>
          );
        })}
      </div>
      <div className="wrap menu-foot">
        <p className="eyebrow brass">Beyond the wine list</p>
        <h2 className="h2">Craft beer, <em>60+ bourbons</em> and curated flights.</h2>
        <div className="menu-foot__ctas">
          <Link to="/bourbon-flights/" className="btn">Bourbon flights <Arrow /></Link>
          <Link to="/beer-wine/" className="btn btn--ghost">Beer &amp; spirits</Link>
        </div>
      </div>
    </div>
  );
}

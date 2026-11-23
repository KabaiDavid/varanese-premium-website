import { Link } from 'react-router-dom';
import { PageHero } from '../components/PageHero';
import { MenuFamily } from '../components/MenuFamily';
import { SectionNav } from '../components/SectionNav';
import { DishRow } from '../components/MenuBits';
import { ReserveButton } from '../components/Reserve';
import { Arrow } from '../components/Icons';
import { chefFeatures, dinnerMenu } from '../data/menu';
import { business } from '../data/business';
import './menu.css';

export default function Menu() {
  const showFeatures = chefFeatures.sections.some((s) => s.items.length);
  const nav = [...dinnerMenu.map((s) => ({ id: s.id, title: s.title })), ...(showFeatures ? [{ id: 'chefs-features', title: 'Chef’s Features' }] : [])];
  return (
    <div className="menu-page">
      <PageHero
        eyebrow="The dinner menu"
        title="Seasonal, local, *unmistakably* Louisville."
        sub={<p>An eclectic New American menu by Chef John Varanese — from Fried Green Tomato salad to Bourbon Barrel Smoked Pork Chop.</p>}
        image="hero"
        imageAlt="A plated entrée from the Varanese kitchen"
        position="50% 55%"
      />
      <MenuFamily />
      <SectionNav items={nav} label="Menu categories" />
      <div className="wrap">
        <p className="menu-intro muted">
          <span>Prices and availability subject to change.</span>
          <span>Dietary needs? <a className="text-link" href={business.phoneHref}>Call {business.phone}</a> — the kitchen is happy to help.</span>
        </p>
        {dinnerMenu.map((s) => (
          <section key={s.id} id={s.id} className="msec" aria-labelledby={`${s.id}-h`}>
            <div className="msec__head">
              <h2 id={`${s.id}-h`} className="msec__title" data-reveal="up">{s.title}</h2>
              {s.range && <p className="eyebrow brass msec__range num">{s.range}</p>}
              {s.note && <p className="msec__note muted">{s.note}</p>}
            </div>
            <ul className={s.id === 'shareables' ? 'dishes-2' : undefined}>
              {s.items.map((d) => <DishRow key={d.name} d={d} />)}
            </ul>
          </section>
        ))}
      </div>
      {showFeatures && (
        <section id="chefs-features" className="features" aria-labelledby="features-h" style={{ scrollMarginTop: 'calc(var(--header-h) + 60px)' }}>
          <div className="wrap features__head">
            <div>
              <p className="eyebrow brass">Chef’s features</p>
              <h2 id="features-h" className="h2" style={{ marginTop: '1rem' }}>Beyond the menu, <em>this season.</em></h2>
            </div>
            <p className="muted">Chef Varanese’s features change often with the market and the season. Your server will share tonight’s selections.</p>
          </div>
          <div className="wrap dark" style={{ background: 'transparent' }}>
            {chefFeatures.sections.filter((s) => s.items.length).map((s) => (
              <section key={s.id} className="msec" aria-labelledby={`${s.id}-h`}>
                <div className="msec__head"><h3 id={`${s.id}-h`} className="msec__title">{s.title}</h3></div>
                <ul>{s.items.map((d) => <DishRow key={d.name} d={d} level={4} />)}</ul>
              </section>
            ))}
          </div>
        </section>
      )}
      <div className="wrap menu-foot">
        <h2 className="h2">Hungry yet? <em>Your table is waiting.</em></h2>
        <div className="menu-foot__ctas">
          <ReserveButton className="btn btn--burgundy">Reserve your table <Arrow /></ReserveButton>
          <Link to="/wine-list/" className="btn btn--ghost">See the wine list</Link>
        </div>
      </div>
    </div>
  );
}

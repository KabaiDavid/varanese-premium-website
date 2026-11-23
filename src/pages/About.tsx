import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Img } from '../components/Img';
import { Split } from '../components/Split';
import { ReserveButton } from '../components/Reserve';
import { Arrow } from '../components/Icons';
import { AWARDS_FULL, JOURNEY } from '../data/story';
import './about.css';

function useLineProgress() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let t = false;
    const update = () => {
      t = false;
      const r = el.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (window.innerHeight * 0.6 - r.top) / r.height));
      el.style.setProperty('--p', p.toFixed(3));
    };
    const on = () => { if (!t) { t = true; requestAnimationFrame(update); } };
    update();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  return ref;
}

export default function About() {
  const line = useLineProgress();
  return (
    <>
      <header className="ab-hero dark">
        <div className="wrap ab-hero__grid">
          <div className="ab-hero__text">
            <p className="eyebrow eyebrow--time brass">Our story</p>
            <h1 className="ab-hero__title">
              <Split as="span" className="display" text="The story" delay={0.1} />
              <Split as="span" className="display ab-hero__l2" text="behind *Varanese.*" delay={0.25} />
            </h1>
            <p className="lede ab-hero__lede" data-reveal="up" style={{ ['--d' as string]: '0.5s' } as React.CSSProperties}>
              A chef’s journey from Johnson &amp; Wales to his own restaurant on Frankfort Avenue — and the evenings it has made since 2007.
            </p>
          </div>
          <figure className="ab-hero__fig" data-reveal="mask">
            <Img name="dine-with-us" alt="Chef John Varanese plating dishes" priority sizes="(min-width: 1024px) 42vw, 92vw" cover position="55% 40%" />
            <figcaption className="eyebrow muted">Chef John Varanese</figcaption>
          </figure>
        </div>
      </header>

      <section className="section ab-journey" aria-labelledby="journey-h">
        <div className="wrap">
          <div className="ab-journey__head">
            <p className="eyebrow brass">Chef John Varanese</p>
            <Split id="journey-h" className="h1" text="A career built *at the stove.*" />
          </div>
          <div className="timeline" ref={line}>
            <span className="timeline__line" aria-hidden="true"><i /></span>
            <ol>
              {JOURNEY.map((j) => (
                <li key={j.mark} className="timeline__item">
                  <p className="timeline__mark" data-reveal="up">{j.mark}</p>
                  <div className="timeline__body" data-reveal="up" style={{ ['--d' as string]: '0.1s' } as React.CSSProperties}>
                    <h3 className="eyebrow brass">{j.era}</h3>
                    <p>{j.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="ab-quote dark-2" aria-labelledby="restaurant-h">
        <div className="wrap ab-quote__grid">
          <figure className="ab-quote__fig" data-reveal="mask">
            <div className="pl" data-parallax="-0.07"><Img name="bar" alt="The bar at Varanese" sizes="(min-width: 1024px) 50vw, 100vw" cover /></div>
          </figure>
          <div>
            <p className="eyebrow brass">The restaurant</p>
            <h2 id="restaurant-h" className="h2 ab-quote__text" data-reveal="up">
              Choosing Louisville for its vibrant independent dining scene, Varanese built a restaurant that reflects the city’s
              appreciation for <em>fresh, locally sourced ingredients</em> and <em>globally inspired cuisine.</em>
            </h2>
            <div className="ab-quote__body" data-reveal="up">
              <p className="muted">
                The menu is eclectic New American — from Pork &amp; Sweet Potato Biscuits and Fried Green Tomato Salad to signature entrées
                like Bourbon Barrel Smoked Pork Chop and Caramelized Orange Bourbon Salmon.
              </p>
              <p className="muted">
                The restaurant accommodates 150 guests across its bar, dining room, and the Veranda Patio — an architectural highlight
                featuring a 20-foot slate water wall and retractable glass doors for an indoor-outdoor dining experience.
              </p>
              <Link to="/menu/" className="link">Explore the menu <Arrow /></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section ab-awards paper" aria-labelledby="awards-h">
        <div className="wrap ab-awards__grid">
          <div>
            <p className="eyebrow brass">Awards &amp; recognition</p>
            <Split id="awards-h" className="h1" text="Honors, *earned.*" />
          </div>
          <ol className="ab-awards__list">
            {AWARDS_FULL.map((a, n) => (
              <li key={a} data-reveal="up" style={{ ['--d' as string]: `${n * 0.05}s` } as React.CSSProperties}>
                <span className="num eyebrow muted">{String(n + 1).padStart(2, '0')}</span>
                <span>{a}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section ab-cta dark" aria-labelledby="ab-cta-h">
        <div className="wrap" style={{ textAlign: 'center', display: 'grid', justifyItems: 'center', gap: '2rem' }}>
          <h2 id="ab-cta-h" className="h1">Taste the <em>next chapter.</em></h2>
          <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <ReserveButton className="btn btn--brass">Reserve your table <Arrow /></ReserveButton>
            <Link to="/private-dining/" className="btn btn--ghost light-ghost on-dark-ghost">Private dining</Link>
          </div>
        </div>
      </section>
    </>
  );
}

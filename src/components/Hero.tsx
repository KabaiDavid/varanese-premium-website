import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Img } from './Img';
import { ReserveButton } from './Reserve';
import { Split } from './Split';
import { Arrow } from './Icons';
import './hero.css';

const FRAMES = [
  { name: 'bar', caption: 'The bar', pos: '50% 55%', alt: 'The bar at Varanese, lined with bourbon and wine' },
  { name: 'private-dining-legacy', caption: 'The dining room', pos: '50% 60%', alt: 'The Varanese dining room set for the evening' },
  { name: 'dine-with-us', caption: 'Chef John Varanese', pos: '58% 35%', alt: 'Chef John Varanese presenting a table of dishes' },
  { name: 'hero', caption: 'From the kitchen', pos: '45% 50%', alt: 'A plated entrée from the Varanese kitchen' },
];
const DURATION = 6500;

export function Hero() {
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) setPlaying(false);
    const t = setTimeout(() => setReady(true), 50);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!playing) return;
    const t = setTimeout(() => setI((n) => (n + 1) % FRAMES.length), DURATION);
    return () => clearTimeout(t);
  }, [i, playing]);

  return (
    <section className={`hero ${ready ? 'hero--ready' : ''} ${playing ? '' : 'hero--paused'}`} aria-labelledby="hero-title">
      <div className="hero__stage" aria-hidden="true">
        {FRAMES.map((f, n) => (
          <div key={f.name} className={`hero__frame ${n === i ? 'is-on' : ''} ${n === (i + FRAMES.length - 1) % FRAMES.length ? 'is-prev' : ''}`}>
            <Img name={f.name} alt="" priority={n === 0} sizes="100vw" cover position={f.pos} className="hero__img" />
          </div>
        ))}
        <div className="hero__shade" />
        <div className="hero__grain" />
      </div>
      <div className="hero__letterbox" aria-hidden="true"><span /><span /></div>

      <div className="hero__top wrap">
        <p className="eyebrow">Frankfort Avenue · Louisville, Kentucky</p>
        <p className="eyebrow hero__est">Est. 2007</p>
      </div>

      <div className="hero__content wrap">
        <p className="eyebrow eyebrow--time hero__kicker">5:00 PM · The evening begins</p>
        <Split as="h1" id="hero-title" className="display hero__title" text="An Evening | Worth *Remembering.*" delay={0.9} />
        <p className="hero__sub" data-reveal="up" style={{ ['--d' as string]: '1.5s' } as React.CSSProperties}>
          New American cuisine. Exceptional atmosphere. The art of dining.
        </p>
        <div className="hero__ctas" data-reveal="up" style={{ ['--d' as string]: '1.65s' } as React.CSSProperties}>
          <ReserveButton className="btn btn--brass">Reserve your table <Arrow /></ReserveButton>
          <Link to="/menu/" className="btn btn--ghost light-ghost on-dark-ghost">Explore the menu</Link>
        </div>
      </div>

      <div className="hero__rail wrap">
        <div className="hero__progress" role="group" aria-label="Hero image sequence">
          {FRAMES.map((f, n) => (
            <button
              key={f.name}
              className={`hero__tick ${n === i ? 'is-on' : ''}`}
              onClick={() => setI(n)}
              aria-label={`Show image ${n + 1}: ${f.caption}`}
              aria-current={n === i}
            >
              <span className="hero__bar"><i style={{ animationDuration: `${DURATION}ms` }} /></span>
              <span className="hero__cap">{f.caption}</span>
            </button>
          ))}
          <button className="hero__pause" onClick={() => setPlaying((p) => !p)} aria-label={playing ? 'Pause image sequence' : 'Play image sequence'}>
            {playing ? (
              <svg width="10" height="12" viewBox="0 0 10 12" aria-hidden="true"><path d="M1 0v12M9 0v12" stroke="currentColor" strokeWidth="1.5" /></svg>
            ) : (
              <svg width="10" height="12" viewBox="0 0 10 12" aria-hidden="true"><path d="M0 0l10 6-10 6z" fill="currentColor" /></svg>
            )}
          </button>
        </div>
        <span className="hero__scroll" aria-hidden="true">Scroll <i /></span>
      </div>
      <p className="sr-only">{FRAMES[i].alt}</p>
    </section>
  );
}

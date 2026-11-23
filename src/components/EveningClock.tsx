import { useEffect, useState } from 'react';

export type Chapter = { id: string; time: string; label: string };

/** Fixed timeline that advances through the evening as the visitor scrolls the homepage. */
export function EveningClock({ chapters }: { chapters: Chapter[] }) {
  const [active, setActive] = useState(-1);
  useEffect(() => {
    const els = chapters.map((c) => document.getElementById(c.id)).filter(Boolean) as HTMLElement[];
    const onScroll = () => {
      const mid = window.innerHeight * 0.55;
      let idx = -1;
      els.forEach((el, n) => {
        if (el.getBoundingClientRect().top < mid) idx = n;
      });
      const last = els[els.length - 1];
      if (last && last.getBoundingClientRect().bottom < mid * 0.6) idx = -1;
      setActive(idx);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [chapters]);

  const c = chapters[active];
  return (
    <nav className={`clock ${active >= 0 ? 'is-on' : ''}`} aria-label="The evening, chapter by chapter">
      <p className="clock__time num" aria-hidden="true">
        <span key={c?.time}>{c?.time ?? '5:00 PM'}</span>
      </p>
      <ol className="clock__list">
        {chapters.map((ch, n) => (
          <li key={ch.id} className={n === active ? 'is-active' : n < active ? 'is-past' : ''}>
            <a href={`#${ch.id}`} aria-current={n === active ? 'step' : undefined}>
              <i aria-hidden="true" />
              <span>{ch.time} — {ch.label}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

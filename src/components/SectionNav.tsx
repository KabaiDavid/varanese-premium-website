import { useEffect, useRef, useState } from 'react';

/** Sticky in-page category navigation with scrollspy. */
export function SectionNav({ items, label }: { items: { id: string; title: string }[]; label: string }) {
  const [active, setActive] = useState(items[0]?.id);
  const row = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onScroll = () => {
      let cur = items[0]?.id;
      for (const it of items) {
        const el = document.getElementById(it.id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.35) cur = it.id;
      }
      setActive(cur);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [items]);
  useEffect(() => {
    const a = row.current?.querySelector<HTMLAnchorElement>(`a[href="#${active}"]`);
    if (a && row.current) row.current.scrollTo({ left: a.offsetLeft - 16, behavior: 'smooth' });
  }, [active]);
  return (
    <nav className="subnav" aria-label={label}>
      <div className="wrap subnav__row" ref={row}>
        {items.map((it) => (
          <a key={it.id} href={`#${it.id}`} className={active === it.id ? 'is-active' : ''} aria-current={active === it.id ? 'true' : undefined}>
            {it.title}
          </a>
        ))}
      </div>
    </nav>
  );
}

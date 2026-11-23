import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { business, hours, openStatus } from '../data/business';
import { useNow } from '../lib/useNow';
import { Img } from './Img';
import { ReserveButton } from './Reserve';
import './header.css';

export const NAV = [
  { to: '/menu/', label: 'Menu', sub: [
    { to: '/menu/', label: 'Dinner' },
    { to: '/wine-list/', label: 'Wine List' },
    { to: '/bourbon-flights/', label: 'Bourbon Flights' },
    { to: '/beer-wine/', label: 'Beer & Spirits' },
  ] },
  { to: '/about/', label: 'Our Story' },
  { to: '/private-dining/', label: 'Private Dining' },
  { to: '/events/', label: 'Events' },
  { to: '/gift-cards/', label: 'Gift Cards' },
  { to: '/contact/', label: 'Visit' },
];

const MENU_FAMILY = ['/menu/', '/wine-list/', '/bourbon-flights/', '/beer-wine/'];

export function Logo({ className = '' }: { className?: string }) {
  return <Img name="logo-white" alt="Varanese" sizes="200px" priority className={`logo ${className}`} />;
}

function OpenStatus() {
  const { now, live } = useNow();
  if (!live) return <span className="status">Open 7 days · from 5 PM</span>;
  const s = openStatus(now);
  return (
    <span className={`status ${s.open ? 'status--open' : ''}`}>
      <i aria-hidden="true" /> {s.text}
    </span>
  );
}

export function Header() {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dlg = useRef<HTMLDialogElement>(null);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > 480 && y > lastY.current + 4);
      if (y < lastY.current - 4 || y < 480) setHidden(false);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const d = dlg.current;
    if (!d) return;
    if (menuOpen && !d.open) d.showModal();
    if (!menuOpen && d.open) d.close();
  }, [menuOpen]);

  const isActive = (to: string) => (to === '/menu/' ? MENU_FAMILY.includes(pathname) : pathname.startsWith(to));

  return (
    <>
      <header className={`hdr ${scrolled ? 'hdr--solid' : ''} ${hidden && !menuOpen ? 'hdr--hidden' : ''}`}>
        <div className="hdr__bar">
          <Link to="/" className="hdr__logo" aria-label="Varanese — home">
            <Logo />
          </Link>
          <nav className="hdr__nav" aria-label="Primary">
            <ul>
              {NAV.map((n) => (
                <li key={n.to}>
                  <NavLink to={n.to} className={() => (isActive(n.to) ? 'is-active' : '')} aria-current={isActive(n.to) ? 'page' : undefined}>
                    {n.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <div className="hdr__end">
            <OpenStatus />
            <ReserveButton className="btn btn--brass hdr__cta">Reserve</ReserveButton>
            <button className="hdr__burger" aria-label="Open menu" aria-haspopup="dialog" aria-expanded={menuOpen} onClick={() => setMenuOpen(true)}>
              <span aria-hidden="true" />
              <span aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <dialog ref={dlg} className="ovl" aria-label="Site menu" onClose={() => setMenuOpen(false)}>
        <div className="ovl__inner dark">
          <div className="ovl__top">
            <Link to="/" className="hdr__logo" aria-label="Varanese — home" onClick={() => setMenuOpen(false)}>
              <Logo />
            </Link>
            <button className="ovl__close" onClick={() => setMenuOpen(false)} aria-label="Close menu">
              Close <span aria-hidden="true" />
            </button>
          </div>
          <div className="ovl__grid">
            <nav aria-label="Site">
              <ol className="ovl__links">
                <li style={{ ['--i' as string]: 0 } as React.CSSProperties}>
                  <Link to="/" onClick={() => setMenuOpen(false)}><span className="ovl__n">00</span>Home</Link>
                </li>
                {NAV.map((n, i) => (
                  <li key={n.to} style={{ ['--i' as string]: i + 1 } as React.CSSProperties}>
                    <Link to={n.to} onClick={() => setMenuOpen(false)} aria-current={isActive(n.to) ? 'page' : undefined}>
                      <span className="ovl__n">{String(i + 1).padStart(2, '0')}</span>
                      {n.label}
                    </Link>
                    {n.sub && (
                      <ul className="ovl__sub">
                        {n.sub.slice(1).map((s) => (
                          <li key={s.to}><Link to={s.to} onClick={() => setMenuOpen(false)}>{s.label}</Link></li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
            <aside className="ovl__aside">
              <div className="ovl__img"><Img name="bar" alt="" sizes="(min-width: 1024px) 30vw, 0px" cover /></div>
              <dl className="ovl__info">
                <div>
                  <dt className="eyebrow brass">Find us</dt>
                  <dd>{business.address.street}<br />{business.address.city}, {business.address.region} {business.address.zip}</dd>
                </div>
                <div>
                  <dt className="eyebrow brass">Hours</dt>
                  <dd>{hours.map((h) => <span key={h.short} className="num">{h.short} · {h.display}<br /></span>)}</dd>
                </div>
                <div>
                  <dt className="eyebrow brass">Call</dt>
                  <dd><a href={business.phoneHref}>{business.phone}</a></dd>
                </div>
              </dl>
              <ReserveButton className="btn btn--brass">Reserve your table</ReserveButton>
            </aside>
          </div>
        </div>
      </dialog>
    </>
  );
}

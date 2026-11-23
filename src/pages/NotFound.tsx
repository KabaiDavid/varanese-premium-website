import { Link } from 'react-router-dom';
import { Split } from '../components/Split';
import { Arrow } from '../components/Icons';

export default function NotFound() {
  return (
    <section className="dark" style={{ minHeight: '100svh', display: 'grid', alignItems: 'center', paddingTop: 'var(--header-h)' }}>
      <div className="wrap" style={{ display: 'grid', gap: '2rem', justifyItems: 'start', paddingBlock: '4rem' }}>
        <p className="eyebrow brass">404 · Page not found</p>
        <Split as="h1" className="display" text="This table *isn’t set.*" />
        <p className="lede muted">The page you were looking for has moved or no longer exists.</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem' }}>
          <Link to="/" className="btn btn--brass">Back to the evening <Arrow /></Link>
          <Link to="/menu/" className="btn btn--ghost light-ghost on-dark-ghost">View the menu</Link>
        </div>
      </div>
    </section>
  );
}

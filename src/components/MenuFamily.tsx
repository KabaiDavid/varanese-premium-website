import { NavLink } from 'react-router-dom';

const LINKS = [
  { to: '/menu/', label: 'Dinner' },
  { to: '/wine-list/', label: 'Wine List' },
  { to: '/bourbon-flights/', label: 'Bourbon Flights' },
  { to: '/beer-wine/', label: 'Beer & Spirits' },
];

export function MenuFamily() {
  return (
    <nav className="subnav subnav--family" aria-label="Menus">
      <div className="wrap subnav__row">
        {LINKS.map((l) => (
          <NavLink key={l.to} to={l.to} end>{l.label}</NavLink>
        ))}
      </div>
    </nav>
  );
}

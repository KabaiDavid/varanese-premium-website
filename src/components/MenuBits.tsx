import type { Dish } from '../data/menu';

export function DishRow({ d, level = 3 }: { d: Dish; level?: 3 | 4 }) {
  const H = level === 3 ? 'h3' : 'h4';
  return (
    <li className="dish">
      <div className="dish__top">
        <H className="dish__name">{d.name}</H>
        {d.price && (
          <>
            <span className="dish__lead" aria-hidden="true" />
            <span className="dish__price">
              <span className="sr-only">Price: </span>${d.price}
            </span>
          </>
        )}
      </div>
      {d.desc && <p className="dish__desc">{d.desc}</p>}
    </li>
  );
}

import { lazy, type ComponentType, type LazyExoticComponent } from 'react';

type Mod = { default: ComponentType };
export const loaders: Record<string, () => Promise<Mod>> = {
  home: () => import('./Home'),
  menu: () => import('./Menu'),
  wine: () => import('./WineList'),
  bourbon: () => import('./BourbonFlights'),
  spirits: () => import('./BeerSpirits'),
  about: () => import('./About'),
  privateDining: () => import('./PrivateDining'),
  events: () => import('./Events'),
  event: () => import('./EventDetail'),
  gift: () => import('./GiftCards'),
  contact: () => import('./Contact'),
  privacy: () => import('./Privacy'),
  accessibility: () => import('./Accessibility'),
  notFound: () => import('./NotFound'),
};

export type PageKey = keyof typeof loaders;

/** Already-resolved modules render synchronously (needed for hydration/SSR). */
const resolved: Partial<Record<string, ComponentType>> = {};
const lazies: Partial<Record<string, LazyExoticComponent<ComponentType>>> = {};

export async function preload(key: string) {
  if (!resolved[key]) resolved[key] = (await loaders[key]()).default;
}
export async function preloadAll() {
  await Promise.all(Object.keys(loaders).map(preload));
}
export function pageComponent(key: string): ComponentType {
  if (resolved[key]) return resolved[key]!;
  if (!lazies[key]) lazies[key] = lazy(async () => {
    const m = await loaders[key]();
    resolved[key] = m.default;
    return m;
  });
  return lazies[key]!;
}

export function keyForPath(pathname: string): PageKey {
  const p = pathname.endsWith('/') ? pathname : `${pathname}/`;
  const map: Record<string, PageKey> = {
    '/': 'home', '/menu/': 'menu', '/wine-list/': 'wine', '/bourbon-flights/': 'bourbon', '/beer-wine/': 'spirits',
    '/about/': 'about', '/private-dining/': 'privateDining', '/events/': 'events', '/gift-cards/': 'gift',
    '/contact/': 'contact', '/privacy-policy/': 'privacy', '/accessibility/': 'accessibility',
  };
  if (map[p]) return map[p];
  if (/^\/events\/[^/]+\/$/.test(p)) return 'event';
  return 'notFound';
}

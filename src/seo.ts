import { SITE_URL, business, hours } from './data/business';
import { dinnerMenu } from './data/menu';
import { events, findEvent } from './data/events';

export type Head = { title: string; description: string; path: string; image?: string; schema?: object[]; noindex?: boolean };

const OG = `${SITE_URL}/og-image.jpg`;

const dayMap: Record<number, string> = { 0: 'Sunday', 1: 'Monday', 2: 'Tuesday', 3: 'Wednesday', 4: 'Thursday', 5: 'Friday', 6: 'Saturday' };

export const restaurantSchema = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  '@id': `${SITE_URL}/#restaurant`,
  name: business.name,
  description: 'New American cuisine by Chef John Varanese in Louisville’s historic Clifton neighborhood, with a Veranda patio featuring a 20-foot slate water wall, private dining rooms and 60+ bourbons.',
  url: `${SITE_URL}/`,
  image: [`${SITE_URL}/og-image.jpg`, `${SITE_URL}/img/bar-1440.jpg`, `${SITE_URL}/img/hero-1922.jpg`],
  logo: `${SITE_URL}/img/logo-white-1015.png`,
  telephone: '+1-502-899-9904',
  email: business.email,
  servesCuisine: 'New American',
  priceRange: '$$-$$$',
  acceptsReservations: business.reserveUrl,
  hasMenu: `${SITE_URL}/menu/`,
  maximumAttendeeCapacity: business.capacity,
  founder: { '@type': 'Person', name: 'John Varanese', jobTitle: 'Executive Chef / Owner' },
  foundingDate: '2007-08',
  address: {
    '@type': 'PostalAddress',
    streetAddress: business.address.street,
    addressLocality: business.address.city,
    addressRegion: business.address.region,
    postalCode: business.address.zip,
    addressCountry: 'US',
  },
  geo: { '@type': 'GeoCoordinates', latitude: business.geo.lat, longitude: business.geo.lng },
  hasMap: business.directionsUrl,
  openingHoursSpecification: hours.map((h) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: h.days.map((d) => dayMap[d]),
    opens: h.open,
    closes: h.close,
  })),
  sameAs: [business.social.facebook, business.social.x, business.social.tripadvisor],
};

const menuSchema = {
  '@context': 'https://schema.org',
  '@type': 'Menu',
  name: 'Varanese Dinner Menu',
  url: `${SITE_URL}/menu/`,
  inLanguage: 'en-US',
  hasMenuSection: dinnerMenu.map((s) => ({
    '@type': 'MenuSection',
    name: s.title,
    hasMenuItem: s.items.map((i) => ({
      '@type': 'MenuItem',
      name: i.name,
      ...(i.desc ? { description: i.desc } : {}),
      ...(i.price && /^\d+$/.test(i.price) ? { offers: { '@type': 'Offer', price: i.price, priceCurrency: 'USD' } } : {}),
    })),
  })),
};

const crumbs = (items: [string, string][]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1, name, item: `${SITE_URL}${path}` })),
});

const pages: Record<string, Head> = {
  '/': {
    path: '/',
    title: 'Varanese — New American Cuisine in Louisville’s Clifton Neighborhood',
    description: 'Chef John Varanese’s New American restaurant on Frankfort Avenue in Louisville, KY. Seasonal, locally sourced cuisine, 60+ bourbons, the Veranda water wall patio and private dining. Open 7 nights.',
    schema: [restaurantSchema, { '@context': 'https://schema.org', '@type': 'WebSite', name: 'Varanese', url: `${SITE_URL}/` }],
  },
  '/menu/': {
    path: '/menu/',
    title: 'Dinner Menu | Varanese, Louisville KY',
    description: 'The Varanese dinner menu: starters, soups & salads, entrées and shareables by Chef John Varanese — from Bourbon Barrel Smoked Pork Chop to Pecan Crusted Hawaiian Butterfish.',
    schema: [menuSchema, crumbs([['Home', '/'], ['Dinner Menu', '/menu/']])],
  },
  '/wine-list/': {
    path: '/wine-list/',
    title: 'Wine List | Varanese, Louisville KY',
    description: 'Sparkling, white, red, port & dessert and limited release wines by the glass and bottle, selected to pair with the New American kitchen at Varanese.',
    schema: [crumbs([['Home', '/'], ['Wine List', '/wine-list/']])],
  },
  '/bourbon-flights/': {
    path: '/bourbon-flights/',
    title: 'Bourbon Flights | Varanese, Louisville KY',
    description: 'Twelve curated Kentucky bourbon flights at Varanese on Frankfort Avenue — from Bottled in Bond and Whiskey Row to Michter’s and 100+ Proof.',
    schema: [crumbs([['Home', '/'], ['Bourbon Flights', '/bourbon-flights/']])],
  },
  '/beer-wine/': {
    path: '/beer-wine/',
    title: 'Beer & Spirits | Varanese, Louisville KY',
    description: 'Local and craft draft beer, 60+ bourbons, scotch, tequila, vodka, gin, rum and cognac at the Varanese bar in Louisville’s Clifton neighborhood.',
    schema: [crumbs([['Home', '/'], ['Beer & Spirits', '/beer-wine/']])],
  },
  '/about/': {
    path: '/about/',
    title: 'Our Story & Chef John Varanese | Varanese',
    description: 'The story of Chef John Varanese — from Johnson & Wales and Magnolias to Azalea, the Cardinal Club, two James Beard House dinners and his flagship restaurant on Frankfort Avenue, opened in 2007.',
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'John Varanese',
        jobTitle: 'Executive Chef / Owner',
        alumniOf: { '@type': 'CollegeOrUniversity', name: 'Johnson & Wales University' },
        worksFor: { '@id': `${SITE_URL}/#restaurant` },
        award: ['Restaurateur of the Year — Kentucky Restaurant Association', 'Best Chefs America'],
      },
      crumbs([['Home', '/'], ['Our Story', '/about/']]),
    ],
  },
  '/private-dining/': {
    path: '/private-dining/',
    title: 'Private Dining & Events in Louisville | Varanese',
    description: 'Four private dining rooms for groups from 10 to 80 guests in Louisville’s Clifton neighborhood — The Capri, The Soren, The Legacy Room and The Veranda. Inquire about your event.',
    schema: [crumbs([['Home', '/'], ['Private Dining', '/private-dining/']])],
  },
  '/events/': {
    path: '/events/',
    title: 'Events, Bourbon Dinners & Weekly Specials | Varanese',
    description: 'What’s happening at Varanese: bourbon dinners, holiday Turducken, Fridays at Varanese, Martini Mondays and Service Industry Sunday.',
    schema: [crumbs([['Home', '/'], ['Events', '/events/']])],
  },
  '/gift-cards/': {
    path: '/gift-cards/',
    title: 'Gift Certificates | Varanese, Louisville KY',
    description: 'Give the gift of great dining. Purchase a Varanese gift certificate online from $5 to $500 — mailed to your home address.',
    schema: [crumbs([['Home', '/'], ['Gift Cards', '/gift-cards/']])],
  },
  '/contact/': {
    path: '/contact/',
    title: 'Contact, Hours & Directions | Varanese',
    description: 'Visit Varanese at 2106 Frankfort Ave, Louisville, KY 40206. Open Monday–Thursday 5–10 PM, Friday–Saturday 5–11 PM, Sunday 5–10 PM. Call (502) 899-9904.',
    schema: [restaurantSchema, crumbs([['Home', '/'], ['Contact', '/contact/']])],
  },
  '/privacy-policy/': {
    path: '/privacy-policy/',
    title: 'Privacy Policy | Varanese',
    description: 'How Varanese collects, uses and protects your personal information.',
  },
  '/accessibility/': {
    path: '/accessibility/',
    title: 'Accessibility Statement | Varanese',
    description: 'Varanese is committed to an accessible website for every guest, using WCAG 2.2 Level AA as our benchmark.',
  },
};

export function headFor(pathname: string): Head {
  const p = pathname.endsWith('/') ? pathname : `${pathname}/`;
  if (pages[p]) return pages[p];
  const m = p.match(/^\/events\/([^/]+)\/$/);
  if (m) {
    const e = findEvent(m[1]);
    if (e) {
      const start = e.kind === 'dated' ? `${e.date}T${e.startTime}:00-05:00` : undefined;
      return {
        path: p,
        title: `${e.title} | Events at Varanese`,
        description: e.summary,
        image: `${SITE_URL}/img/${e.image}-610.jpg`,
        schema: [
          ...(start
            ? [
                {
                  '@context': 'https://schema.org',
                  '@type': 'Event',
                  name: e.title,
                  startDate: start,
                  eventStatus: 'https://schema.org/EventScheduled',
                  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
                  description: e.intro,
                  image: `${SITE_URL}/img/${e.image}-610.jpg`,
                  location: { '@type': 'Restaurant', name: 'Varanese', address: restaurantSchema.address },
                  organizer: { '@type': 'Organization', name: 'Varanese', url: SITE_URL },
                  offers: { '@type': 'Offer', price: '75', priceCurrency: 'USD', url: `${SITE_URL}${p}` },
                },
              ]
            : []),
          crumbs([['Home', '/'], ['Events', '/events/'], [e.title, p]]),
        ],
      };
    }
  }
  return { path: p, title: 'Page Not Found | Varanese', description: 'The page you were looking for could not be found.', noindex: true };
}

export const allRoutes = [...Object.keys(pages), ...events.map((e) => `/events/${e.slug}/`)];

export function headToHtml(h: Head) {
  const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
  const url = `${SITE_URL}${h.path}`;
  return [
    `<title>${esc(h.title)}</title>`,
    `<meta name="description" content="${esc(h.description)}" />`,
    h.noindex ? `<meta name="robots" content="noindex" />` : `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="Varanese" />`,
    `<meta property="og:locale" content="en_US" />`,
    `<meta property="og:title" content="${esc(h.title)}" />`,
    `<meta property="og:description" content="${esc(h.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${h.image ?? OG}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:site" content="@DineVaranese" />`,
    ...(h.schema ?? []).map((s) => `<script type="application/ld+json">${JSON.stringify(s).replace(/</g, '\\u003c')}</script>`),
  ].join('\n    ');
}

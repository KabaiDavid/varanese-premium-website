// Events — verbatim from varanese.com/events (Nov 2026).
// To add an event, append an object below. Dated and seasonal events disappear
// automatically once `endsOn` has passed; recurring events compute their next date.
import { louisvilleNow } from './business';

export type EventBlock = { heading?: string; lines: { text: string; sub?: string }[] };

type Base = {
  slug: string;
  title: string;
  category: 'Weekly' | 'Bourbon Dinner' | 'Holiday' | 'Dining Special' | 'Music';
  price?: string;
  summary: string;
  intro: string;
  image: string;
  imageAlt: string;
  extraImage?: { key: string; alt: string };
  blocks: EventBlock[];
  footnote?: string;
  cta: 'reserve' | 'call';
};

export type RecurringEvent = Base & { kind: 'recurring'; weekday: number; timeText: string; endMinutes: number };
export type DatedEvent = Base & { kind: 'dated'; date: string; startTime: string; timeText: string };
export type SeasonalEvent = Base & { kind: 'seasonal'; endsOn: string; timeText: string };
export type VEvent = RecurringEvent | DatedEvent | SeasonalEvent;

export const events: VEvent[] = [
  {
    slug: 'sazerac-bourbon-dinner',
    kind: 'dated',
    date: '2026-12-03',
    startTime: '18:30',
    timeText: 'Reception 6:30 PM · Dinner 7:00 PM',
    title: 'Sazerac Bourbon Dinner',
    category: 'Bourbon Dinner',
    price: '$75 per person',
    summary: 'Deck the Barrels with Sazerac: four courses paired with bourbon cocktails and flights.',
    intro: 'Deck the Barrels with Sazerac. Four courses paired with bourbon cocktails and flights. $75 per person plus tax and gratuity.',
    image: 'events-sazerac-bourbon-dinner',
    imageAlt:
      'Deck the Barrels with Sazerac flyer: December 3, 2026, 6:30 reception, 7:00 dinner. Four courses paired with bourbon cocktails and flights, $75 per person plus tax and gratuity.',
    blocks: [
      { heading: 'Flight', lines: [{ text: 'Eagle Rare 10yr. Bourbon' }, { text: 'Blanton’s Single Barrel Bourbon' }, { text: 'EH Taylor Small Batch Bourbon' }, { text: '1792 BIB' }, { text: 'Weller Antique 107 Bourbon' }] },
      { heading: 'First Course — Paired with Reception Cocktail', lines: [{ text: 'Bacon Wrapped Goat Cheese Stuffed Medjool Dates', sub: 'Orange-Bourbon Caramel Sauce' }] },
      { heading: 'Second Course', lines: [{ text: 'Roasted Butternut Squash and Frisée Salad', sub: 'Pickled Apples, Dried Cherries, Maple-Cider Vinaigrette' }] },
      { heading: 'Third Course — Paired with Entrée Cocktail', lines: [{ text: 'Coffee & Cocoa Rubbed Brisket', sub: 'Heirloom Carrots, Roasted Cauliflower and Wild Mushrooms, Chimichurri, Black Peppercorn-Ancho Demi-Glace' }] },
      { heading: 'Fourth Course — Paired with Dessert Cocktail', lines: [{ text: 'Bourbon Eggnog Crème Brûlée', sub: 'Demerara Sugar, Spiced Brown Butter Cookie' }] },
    ],
    footnote: 'Executive Chef / Owner: John Varanese · Chef: Jared Ingram · Sous Chef: Jonathan Riley. Call (502) 899-9904 for reservations.',
    cta: 'call',
  },
  {
    slug: 'turducken',
    kind: 'seasonal',
    endsOn: '2026-12-19',
    timeText: 'Orders open through December 19',
    title: 'Holiday Turducken',
    category: 'Holiday',
    price: 'From $175',
    summary: 'Bring home the holiday tradition. 20 lb. ($175), 26 lb. ($195), or Roulade at $18 per pound. Available pre-cooked or raw.',
    intro: 'Bring home the holiday tradition: Varanese Turducken. Orders are now open.',
    image: 'events-turducken',
    imageAlt: 'Holiday Turducken event flyer. Event details are listed on this page.',
    extraImage: { key: 'events-turducken-menu', alt: 'Printed menu for Holiday Turducken. Menu details are listed in the text on this page.' },
    blocks: [
      { heading: 'Turducken', lines: [{ text: '20 lb. Turducken for 18 to 20 people', sub: '$175' }, { text: '26 lb. Turducken for 25 to 30 people', sub: '$195' }, { text: 'Roulade', sub: '$18 per pound (4 lb. minimum)' }, { text: 'Available pre-cooked or raw' }] },
      { heading: 'Side Dishes', lines: [{ text: 'Mashed Sweet Potatoes', sub: '$14 per quart' }, { text: 'Sweet Potato Casserole', sub: '$20 (serves 8)' }, { text: 'Turducken Gravy', sub: '$10 per quart' }, { text: 'Green Beans', sub: '$20 (serves 8)' }, { text: 'Cranberry Chutney', sub: '$14 per quart' }] },
      { heading: 'Desserts', lines: [{ text: 'Toffee Marshmallow Bread Pudding', sub: '$20 (serves 8)' }] },
    ],
    footnote: 'To guarantee for the holidays, orders must be placed by November 21st for Thanksgiving and December 19th for Christmas. Call (502) 899-9904 to order your holiday Turducken.',
    cta: 'call',
  },
  {
    slug: 'fridays-at-varanese',
    kind: 'recurring',
    weekday: 5,
    endMinutes: 23 * 60,
    timeText: 'Every Friday',
    title: 'Fridays at Varanese',
    category: 'Dining Special',
    price: '$39 per person',
    summary: 'A 3-course dinner special every Friday, $39 per person plus tax and gratuity.',
    intro: 'Join us every Friday for our 3-Course Dinner for One. $39 per person (plus tax and gratuity).',
    image: 'events-fridays-at-varanese',
    imageAlt: 'Fridays at Varanese event flyer. Event details are listed on this page.',
    blocks: [
      { heading: 'Choice of Starters', lines: [{ text: 'Crispy Calamari & Peppers' }, { text: 'BBQ Duck Confit Eggroll' }, { text: 'Apple-Pecan Salad' }] },
      {
        heading: 'Choice of Entrées',
        lines: [
          { text: 'Prosciutto-Wrapped Veal & Ricotta', sub: 'Sweet Potato-Sage Risotto, Tuscan Kale, Blackberry Glaze' },
          { text: 'Angel Hair Pasta', sub: 'Cremini Mushrooms, Grape Tomatoes, Olives, Herbs & Spices, Tomato Basil Sauce. Choice of chicken, shrimp or vegetarian.' },
          { text: 'Bourbon Barrel Smoked Pork Chop', sub: 'Pepperjack Gratin, Vegetable Medley, Apple-Bacon Chutney' },
          { text: 'Caramelized Orange Salmon', sub: 'Cream Cheese Grits, Vegetable Medley, Bourbon Citrus Glaze' },
        ],
      },
      { heading: 'Choice of Desserts', lines: [{ text: 'Toffee-Marshmallow Bread Pudding' }, { text: 'Chocolate Lava Cake' }, { text: 'Fried Apple Turnover' }] },
    ],
    cta: 'reserve',
  },
  {
    slug: 'martini-mondays',
    kind: 'recurring',
    weekday: 1,
    endMinutes: 22 * 60,
    timeText: 'Mondays · 5–10 PM',
    title: 'Martini Mondays',
    category: 'Weekly',
    price: '$5 Well Martinis',
    summary: '$5 well martinis every Monday from 5–10pm. The perfect start to your week.',
    intro: 'Start your week right with Martini Mondays! Every Monday from 5pm to 10pm, enjoy $5 well martinis at the bar or in the dining room.',
    image: 'events-martini-mondays',
    imageAlt: 'Martini Mondays event flyer. Event details are listed on this page.',
    blocks: [{ lines: [{ text: 'No reservation required, just come in and enjoy.' }] }],
    cta: 'reserve',
  },
  {
    slug: 'service-industry-sunday',
    kind: 'recurring',
    weekday: 0,
    endMinutes: 23 * 60,
    timeText: 'Sundays · 8–11 PM',
    title: 'Service Industry Sunday',
    category: 'Weekly',
    price: 'Half-price appetizers',
    summary: 'Half-price appetizers and drink specials every Sunday from 8–11pm.',
    intro: 'The perfect way to wrap up your weekend. Every Sunday from 8pm to 11pm, enjoy special pricing on appetizers and drinks.',
    image: 'events-service-industry',
    imageAlt: 'Service Industry Sunday event flyer. Event details are listed on this page.',
    blocks: [
      {
        lines: [
          { text: 'Half-price appetizers' },
          { text: 'Absolut spirits at reduced price' },
          { text: 'Jim Beam Black at reduced price' },
          { text: 'Draft beer discounts' },
          { text: 'Selected wines at reduced price' },
        ],
      },
      { lines: [{ text: 'No reservation needed, walk-ins welcome.' }] },
    ],
    cta: 'reserve',
  },
];

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export type Occurrence = { event: VEvent; sortKey: number; month: string; day: string; weekday: string; label: string; isToday: boolean };

/** Upcoming, non-expired events ordered by their next occurrence (Louisville time). */
export function upcomingEvents(now: Date): Occurrence[] {
  const l = louisvilleNow(now);
  const today = Date.UTC(l.y, l.m - 1, l.d);
  const out: Occurrence[] = [];
  for (const e of events) {
    let t: number;
    if (e.kind === 'recurring') {
      let delta = (e.weekday - l.day + 7) % 7;
      if (delta === 0 && l.minutes >= e.endMinutes) delta = 7;
      t = today + delta * 864e5;
    } else if (e.kind === 'dated') {
      const [y, m, d] = e.date.split('-').map(Number);
      t = Date.UTC(y, m - 1, d);
      if (t < today) continue;
    } else {
      const [y, m, d] = e.endsOn.split('-').map(Number);
      const end = Date.UTC(y, m - 1, d);
      if (end < today) continue;
      t = today; // ongoing
    }
    const dt = new Date(t);
    const isToday = t === today;
    let label: string;
    if (e.kind === 'seasonal') label = e.timeText;
    else if (e.kind === 'dated') label = `${DAYS[dt.getUTCDay()]}, ${MONTHS[dt.getUTCMonth()]} ${dt.getUTCDate()} · ${e.timeText}`;
    else label = `${isToday ? 'Tonight' : `Next: ${DAYS[dt.getUTCDay()]}, ${MONTHS[dt.getUTCMonth()]} ${dt.getUTCDate()}`} · ${e.timeText}`;
    out.push({
      event: e,
      sortKey: t + (e.kind === 'seasonal' ? 1 : 0),
      month: e.kind === 'seasonal' ? 'Now' : MONTHS[dt.getUTCMonth()],
      day: e.kind === 'seasonal' ? '—' : String(dt.getUTCDate()),
      weekday: e.kind === 'seasonal' ? 'Orders open' : isToday ? 'Tonight' : DAYS[dt.getUTCDay()],
      label,
      isToday,
    });
  }
  return out.sort((a, b) => a.sortKey - b.sortKey);
}

export function findEvent(slug: string) {
  return events.find((e) => e.slug === slug);
}

export function isExpired(e: VEvent, now: Date) {
  const l = louisvilleNow(now);
  const today = Date.UTC(l.y, l.m - 1, l.d);
  const ymd = e.kind === 'dated' ? e.date : e.kind === 'seasonal' ? e.endsOn : null;
  if (!ymd) return false;
  const [y, m, d] = ymd.split('-').map(Number);
  return Date.UTC(y, m - 1, d) < today;
}

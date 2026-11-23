// Single source of truth for verified business information (source: varanese.com, Nov 2026).
export const SITE_URL = 'https://varanese.com';

export const business = {
  name: 'Varanese',
  tagline: 'New American Cuisine',
  chef: 'John Varanese',
  opened: 'August 2007',
  capacity: 150,
  address: {
    street: '2106 Frankfort Ave',
    city: 'Louisville',
    region: 'KY',
    zip: '40206',
    neighborhood: 'Clifton',
  },
  geo: { lat: 38.254033, lng: -85.708454 },
  phone: '(502) 899-9904',
  phoneHref: 'tel:+15028999904',
  email: 'letsdine@varanese.com',
  emailHref: 'mailto:letsdine@varanese.com',
  reserveUrl: 'https://www.opentable.com/restaurant/profile/20470/reserve?rid=20470&restref=20470',
  openTableRid: '20470',
  mapsEmbed:
    'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12532.39201639556!2d-85.708454!3d38.254033!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x886973393256ac39%3A0x29a397ebcf4d756d!2sVaranese%20Restaurant!5e0!3m2!1sen!2sus!4v1773454162230!5m2!1sen!2sus',
  directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Varanese%2C+2106+Frankfort+Ave%2C+Louisville%2C+KY+40206',
  social: {
    facebook: 'https://www.facebook.com/dinevaranese',
    x: 'https://twitter.com/DineVaranese',
    tripadvisor: 'https://www.tripadvisor.com/Restaurant_Review-g39604-d943637-Reviews-Varanese-Louisville_Kentucky.html',
  },
  directions: [
    { from: 'From I-64 West', how: 'Take the Mellwood Ave exit' },
    { from: 'From I-64 East', how: 'Take the Story Ave exit' },
  ],
} as const;

/** Opening hours. day: 0 = Sunday. Times are 24h, local (America/New_York). */
export const hours = [
  { label: 'Monday – Thursday', short: 'Mon – Thu', days: [1, 2, 3, 4], open: '17:00', close: '22:00', display: '5 PM – 10 PM' },
  { label: 'Friday – Saturday', short: 'Fri – Sat', days: [5, 6], open: '17:00', close: '23:00', display: '5 PM – 11 PM' },
  { label: 'Sunday', short: 'Sunday', days: [0], open: '17:00', close: '22:00', display: '5 PM – 10 PM' },
] as const;

export function hoursForDay(day: number) {
  return hours.find((h) => (h.days as readonly number[]).includes(day))!;
}

/** Current wall-clock parts in Louisville. */
export function louisvilleNow(date = new Date()) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York',
    weekday: 'short',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  }).formatToParts(date);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? '';
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return {
    day: weekdays.indexOf(get('weekday')),
    minutes: (parseInt(get('hour'), 10) % 24) * 60 + parseInt(get('minute'), 10),
    y: parseInt(get('year'), 10),
    m: parseInt(get('month'), 10),
    d: parseInt(get('day'), 10),
  };
}

const toMin = (t: string) => {
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
};

export function openStatus(date = new Date()) {
  const now = louisvilleNow(date);
  const today = hoursForDay(now.day);
  const open = toMin(today.open);
  const close = toMin(today.close);
  if (now.minutes >= open && now.minutes < close) {
    return { open: true, text: `Open now · until ${today.display.split('– ')[1]}` };
  }
  if (now.minutes < open) return { open: false, text: `Opens tonight at 5 PM` };
  return { open: false, text: `Closed · Opens tomorrow at 5 PM` };
}

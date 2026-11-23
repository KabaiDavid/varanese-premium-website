// Private dining rooms — verbatim from varanese.com/private-dining (Nov 2026).
// "Minimum" = food & beverage minimum listed by day of week.
export type Room = { id: string; name: string; guests: string; min: { sunThu: string; friSat: string }; image: string; alt: string };

export const rooms: Room[] = [
  { id: 'capri', name: 'The Capri', guests: '6–12', min: { sunThu: '$500', friSat: '$750' }, image: 'private-dining-capri', alt: 'The Capri private dining room at Varanese' },
  { id: 'soren', name: 'The Soren', guests: '12–28', min: { sunThu: '$1,000', friSat: '$1,500' }, image: 'private-dining-soren', alt: 'The Soren private dining room at Varanese' },
  { id: 'legacy', name: 'The Legacy Room', guests: '30–50', min: { sunThu: '$2,000', friSat: '$3,500' }, image: 'private-dining-legacy', alt: 'The Legacy Room private dining space at Varanese' },
  { id: 'veranda', name: 'The Veranda', guests: '50–80', min: { sunThu: '$3,000', friSat: '$6,000' }, image: 'private-dining-veranda', alt: 'The Veranda event space at Varanese' },
];

export const groupRange = 'Groups from 10 to 80 guests';

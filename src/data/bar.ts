// Bourbon flights and beer & spirits — verbatim from varanese.com (Nov 2026). All items subject to availability.
export type Flight = { name: string; price: string; pours: [string, string, string] };

export const bourbonFlights: Flight[] = [
  { name: 'Bottled in Bond Flight', price: '18', pours: ['Bardstown BIB Bourbon', 'Old Forester 1897', 'New Riff Bourbon'] },
  { name: 'Rye Flight', price: '18', pours: ['Castle & Key Restoration Rye', 'Russell’s Reserve 6yr Rye', 'Bulleit Rye'] },
  { name: 'Woodford Flight', price: '22', pours: ['Woodford Reserve', 'Woodford Reserve Double Oaked', 'Woodford Reserve Malt'] },
  { name: 'Small Batch Flight', price: '20', pours: ['Four Roses Small Batch', 'Peerless Bourbon', 'Rowan’s Creek'] },
  { name: 'Single Barrel Flight', price: '22', pours: ['Wathen’s Single Barrel', 'Four Roses Single Barrel', 'Elijah Craig 12yr'] },
  { name: 'Maker’s Mark Flight', price: '22', pours: ['Maker’s Mark®', 'Maker’s Mark® 46', 'Maker’s Mark® Private Select'] },
  { name: 'Whiskey Row Flight', price: '18', pours: ['Old Forester 1870', 'Old Forester 1910', 'Old Forester 1920'] },
  { name: 'Private Selection Flight', price: '28', pours: ['Knob Creek® Single Barrel Pick 1', 'Knob Creek® Single Barrel Pick 2', 'Knob Creek® Single Barrel Pick 3'] },
  { name: 'Craft Flight', price: '25', pours: ['Buzzard’s Roost Small Batch', 'Calumet Farm', 'Michter’s US*1 Small Batch American Whiskey'] },
  { name: 'Jefferson’s Flight', price: '25', pours: ['Jefferson’s Small Batch', 'Jefferson’s Reserve', 'Jefferson’s Ocean Aged at Sea (Voyage series)'] },
  { name: '100+ Proof Flight', price: '26', pours: ['Green River Full Proof Wheated (109)', 'Noah’s Mill (114)', 'Booker’s (128)'] },
  { name: 'Michter’s Flight', price: '30', pours: ['Michter’s US*1 Small Batch Bourbon', 'Michter’s US*1 Kentucky Straight Rye', 'Michter’s US*1 Sour Mash'] },
];

export type SpiritSection = { id: string; title: string; subtitle?: string; items: string[]; note?: string };

export const beerSpirits: SpiritSection[] = [
  { id: 'draft', title: 'Draft Beer', subtitle: 'Rotating local & craft taps', items: ['West Sixth IPA — Lexington, KY', 'Falls City Pale Ale — Louisville, KY', 'Country Boy Cougar Bait — Lexington, KY', 'Blue Moon Belgian White', 'Guinness Stout', 'Rotating seasonal selections'] },
  { id: 'bottled', title: 'Bottled Beer', subtitle: 'Domestic & import selections', items: ['Stella Artois', 'Heineken', 'Corona Extra', 'Sam Adams Boston Lager', 'Angry Orchard Crisp Apple Cider', 'Budweiser', 'Bud Light', 'Michelob Ultra', 'O’Doul’s (non-alcoholic)'] },
  {
    id: 'bourbon',
    title: 'Bourbon',
    subtitle: '60+ selections — Bourbon Flights available',
    items: ['Pappy Van Winkle 15-Year', 'Pappy Van Winkle 20-Year', 'Pappy Van Winkle 23-Year', 'Woodford Reserve', 'Woodford Reserve Double Oaked', 'Woodford Reserve Batch Proof', 'Maker’s Mark', 'Maker’s Mark 46', 'Maker’s Mark Private Select', 'Blanton’s Single Barrel', 'Eagle Rare 10-Year', 'Buffalo Trace', 'Four Roses Single Barrel', 'Basil Hayden’s', 'Knob Creek 12-Year', 'Elijah Craig Barrel Proof', 'Wild Turkey Rare Breed', 'Angel’s Envy', 'Bulleit Bourbon', 'Old Forester 1920'],
    note: 'This is a partial list — over 60 bourbons available. Ask your server for the complete selection.',
  },
  { id: 'scotch', title: 'Scotch', items: ['Macallan 12-Year', 'Macallan 18-Year', 'Glenfiddich 15-Year', 'Glenlivet 12-Year', 'Johnnie Walker Blue Label', 'Lagavulin 16-Year'] },
  { id: 'tequila', title: 'Tequila', items: ['Patrón Silver', 'Patrón Añejo', 'Don Julio 1942', 'Casamigos Blanco', 'Casamigos Reposado', 'Clase Azul Reposado'] },
  { id: 'vodka', title: 'Vodka', items: ['Grey Goose', 'Belvedere', 'Ketel One', 'Tito’s Handmade', 'Chopin'] },
  {
    id: 'other',
    title: 'Gin, Rum & Other Spirits',
    subtitle: 'Irish, Canadian, Rye, American, Cognac, Cordials',
    items: ['Hendrick’s Gin', 'Tanqueray No. Ten', 'Appleton Estate Rum', 'Diplomatico Reserva Exclusiva Rum', 'Jameson Irish Whiskey', 'Crown Royal Canadian', 'Bulleit Rye', 'WhistlePig 10-Year Rye', 'Rémy Martin VSOP Cognac', 'Hennessy VS Cognac', 'Grand Marnier', 'Chartreuse'],
    note: 'Full spirits list available at the restaurant.',
  },
];

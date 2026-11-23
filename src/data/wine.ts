// Wine list — transcribed verbatim from varanese.com/wine-list (Nov 2026). All wines subject to availability.
export type Wine = { name: string; glass?: string; bottle?: string; desc?: string };
export type WineSection = { id: string; title: string; items: Wine[] };

export const wineList: WineSection[] = [
  {
    "title": "Sparkling",
    "items": [
      {
        "name": "Francis Ford Coppola Prosecco",
        "glass": "10",
        "bottle": "40"
      },
      {
        "name": "Korbel Brut",
        "glass": "12",
        "bottle": "48"
      },
      {
        "name": "Coppola Sofia Blanc de Blancs",
        "bottle": "46"
      },
      {
        "name": "J Vineyards Cuvée",
        "bottle": "52"
      },
      {
        "name": "Segura Viudas Heredad Reserva Cava",
        "bottle": "64"
      },
      {
        "name": "Domaine Carneros Brut",
        "bottle": "75"
      },
      {
        "name": "Roederer Estate Brut Rosé",
        "bottle": "82"
      },
      {
        "name": "Schramsberg Blanc de Noirs",
        "bottle": "98"
      },
      {
        "name": "G.H. Mumm Cordon Rouge Brut",
        "bottle": "115"
      },
      {
        "name": "Drappier Carte d’Or Brut",
        "bottle": "120"
      }
    ],
    "id": "sparkling"
  },
  {
    "title": "White",
    "items": [
      {
        "name": "Beringer White Zinfandel",
        "glass": "7",
        "bottle": "28"
      },
      {
        "name": "Schmitt Söhne Kabinett Riesling",
        "glass": "8",
        "bottle": "32"
      },
      {
        "name": "Pierre Sparr Gewurztraminer",
        "bottle": "48"
      },
      {
        "name": "Martín Códax Albariño",
        "bottle": "34"
      },
      {
        "name": "Pine Ridge Chenin Blanc - Viognier",
        "glass": "10",
        "bottle": "40"
      },
      {
        "name": "Cantina Lavis Pinot Grigio",
        "glass": "10",
        "bottle": "40"
      },
      {
        "name": "La Crema Pinot Gris",
        "glass": "12",
        "bottle": "48"
      },
      {
        "name": "Maso Canali Pinot Grigio",
        "glass": "11",
        "bottle": "44"
      },
      {
        "name": "Bonterra Sauvignon Blanc",
        "glass": "8",
        "bottle": "32"
      },
      {
        "name": "Wither Hills Sauvignon Blanc",
        "glass": "10",
        "bottle": "40"
      },
      {
        "name": "Craggy Range Sauvignon Blanc",
        "bottle": "54"
      },
      {
        "name": "Grgich Hills Fumé Blanc",
        "bottle": "78"
      },
      {
        "name": "Château La Freynelle Bordeaux Blanc",
        "bottle": "44"
      },
      {
        "name": "Gerard Bertrand Rosé",
        "glass": "12",
        "bottle": "48"
      },
      {
        "name": "Carmel Road Unoaked Chardonnay",
        "glass": "9",
        "bottle": "36"
      },
      {
        "name": "William Hill Chardonnay",
        "glass": "10",
        "bottle": "40"
      },
      {
        "name": "Eshcol by Trefethen Chardonnay",
        "glass": "11",
        "bottle": "44"
      },
      {
        "name": "Sonoma-Cutrer Chardonnay",
        "glass": "14",
        "bottle": "56"
      },
      {
        "name": "Windracer Chardonnay",
        "bottle": "54"
      },
      {
        "name": "Gundlach-Bundschu Chardonnay",
        "bottle": "65"
      },
      {
        "name": "Cakebread Chardonnay",
        "bottle": "90"
      },
      {
        "name": "Beringer Private Reserve Chardonnay",
        "bottle": "98"
      }
    ],
    "id": "white"
  },
  {
    "title": "Red",
    "items": [
      {
        "name": "Proverb Pinot Noir",
        "glass": "8",
        "bottle": "32"
      },
      {
        "name": "Boën Pinot Noir",
        "glass": "11",
        "bottle": "44"
      },
      {
        "name": "Greenwing Pinot Noir",
        "glass": "14",
        "bottle": "56"
      },
      {
        "name": "Diora Pinot Noir",
        "bottle": "40"
      },
      {
        "name": "Mas La Chevaliere Pinot Noir",
        "bottle": "48"
      },
      {
        "name": "Benton-Lane Pinot Noir",
        "bottle": "56"
      },
      {
        "name": "Calera Pinot Noir",
        "bottle": "58"
      },
      {
        "name": "Van Duzer Pinot Noir",
        "bottle": "68"
      },
      {
        "name": "Belle Glos “Las Alturas” Pinot Noir",
        "bottle": "65"
      },
      {
        "name": "Willamette Valley Vineyards Pinot Noir",
        "bottle": "70"
      },
      {
        "name": "La Crema Willamette Valley Pinot Noir",
        "bottle": "72"
      },
      {
        "name": "Sonoma-Cutrer Pinot Noir",
        "bottle": "74"
      },
      {
        "name": "Sanford Pinot Noir",
        "bottle": "78"
      },
      {
        "name": "Columbia Crest Merlot",
        "glass": "8",
        "bottle": "32"
      },
      {
        "name": "Duckhorn Merlot",
        "bottle": "62"
      },
      {
        "name": "Stags Leap Merlot",
        "bottle": "78"
      },
      {
        "name": "Freemark Abbey Merlot",
        "bottle": "82"
      },
      {
        "name": "Grgich Hills Merlot",
        "bottle": "96"
      },
      {
        "name": "Trivento Reserve Malbec",
        "glass": "10",
        "bottle": "40"
      },
      {
        "name": "Chakras Malbec",
        "bottle": "34"
      },
      {
        "name": "Concha y Toro Diablo Cabernet Sauvignon",
        "glass": "10",
        "bottle": "40"
      },
      {
        "name": "Familia Torres Celeste Rioja Crianza",
        "bottle": "54"
      },
      {
        "name": "Campo Viejo Gran Reserva Tempranillo",
        "bottle": "65"
      },
      {
        "name": "Torres Salmos Priorat",
        "bottle": "88"
      },
      {
        "name": "Hahn GSM",
        "bottle": "42"
      },
      {
        "name": "Orin Swift Locations CA",
        "glass": "12",
        "bottle": "48"
      },
      {
        "name": "Penfolds Bin 28 Shiraz",
        "bottle": "58"
      },
      {
        "name": "Torbreck “Woodcutters” Shiraz",
        "bottle": "54"
      },
      {
        "name": "J Bell “Yakima Valley” Syrah",
        "bottle": "72"
      },
      {
        "name": "Ex Post Facto Syrah",
        "bottle": "98"
      },
      {
        "name": "BOS “Phoenix Ranch” Syrah",
        "bottle": "98"
      },
      {
        "name": "Girard Petite Sirah",
        "bottle": "68"
      },
      {
        "name": "Klinker Brick Zinfandel",
        "glass": "12",
        "bottle": "48"
      },
      {
        "name": "Terra d’Oro Zinfandel",
        "bottle": "46"
      },
      {
        "name": "Rodney Strong “Knotty Vines” Zinfandel",
        "bottle": "48"
      },
      {
        "name": "St. Francis Old Vine Zinfandel",
        "bottle": "62"
      },
      {
        "name": "Donna Laura “Bramosia” Chianti Classico",
        "glass": "12",
        "bottle": "48"
      },
      {
        "name": "Tenuta di Arceno Chianti Classico",
        "bottle": "58"
      },
      {
        "name": "Tolaini Estate Valdisanti Toscana IGT",
        "bottle": "74"
      },
      {
        "name": "Renato Ratti “Marcenasco” Barolo",
        "bottle": "125"
      },
      {
        "name": "Michele Chiarlo “Tortoniano” Barolo",
        "bottle": "136"
      },
      {
        "name": "Banfi Brunello di Montalcino",
        "bottle": "148"
      },
      {
        "name": "Bertani Amarone",
        "bottle": "195"
      },
      {
        "name": "Francis Ford Coppola Claret",
        "bottle": "52"
      },
      {
        "name": "Trefethen “Dragon’s Tooth” Meritage",
        "bottle": "78"
      },
      {
        "name": "Dry Creek Vineyard “The Mariner” Meritage",
        "bottle": "105"
      },
      {
        "name": "Rodney Strong “Symmetry” Meritage",
        "bottle": "98"
      },
      {
        "name": "St Supery “Elu” Red Blend",
        "bottle": "152"
      },
      {
        "name": "Delas Haute Pierre Châteauneuf-du-Pape",
        "bottle": "120"
      },
      {
        "name": "Chateau Lassegue “Les Cadrans” St. Emilion",
        "bottle": "72"
      },
      {
        "name": "Noble Vines 337 Cabernet Sauvignon",
        "glass": "8",
        "bottle": "32"
      },
      {
        "name": "Bonterra Cabernet Sauvignon",
        "glass": "12",
        "bottle": "48"
      },
      {
        "name": "Provenance Cabernet Sauvignon",
        "bottle": "52"
      },
      {
        "name": "DAOU Cabernet Sauvignon",
        "glass": "14",
        "bottle": "56"
      },
      {
        "name": "Franciscan Cabernet Sauvignon",
        "bottle": "58"
      },
      {
        "name": "B.R. Cohn Silver Label Cabernet Sauvignon",
        "bottle": "60"
      },
      {
        "name": "Napa Cellars Cabernet Sauvignon",
        "bottle": "62"
      },
      {
        "name": "Educated Guess Cabernet Sauvignon",
        "bottle": "64"
      },
      {
        "name": "Beuhler Cabernet Sauvignon",
        "bottle": "66"
      },
      {
        "name": "Chateau Ste. Michelle “Cold Creek” Cabernet",
        "bottle": "72"
      },
      {
        "name": "Robert Mondavi Napa Cabernet Sauvignon",
        "bottle": "75"
      },
      {
        "name": "Stonestreet Cabernet Sauvignon",
        "bottle": "115"
      },
      {
        "name": "Bonterra “McNab” Cabernet Sauvignon",
        "bottle": "110"
      },
      {
        "name": "Hall Napa Cabernet Sauvignon",
        "bottle": "120"
      },
      {
        "name": "Jordan Cabernet Sauvignon",
        "bottle": "135"
      },
      {
        "name": "Silver Oak Alexander Valley Cabernet Sauvignon",
        "bottle": "168"
      },
      {
        "name": "Grgich Hills Cabernet Sauvignon",
        "bottle": "135"
      },
      {
        "name": "Nickel & Nickel Single Vineyard Cabernet",
        "bottle": "225"
      }
    ],
    "id": "red"
  },
  {
    "title": "Port & Dessert",
    "items": [
      {
        "name": "Bogle Petite Sirah Port",
        "glass": "10"
      },
      {
        "name": "Fonseca Bin 27 Ruby",
        "glass": "9"
      },
      {
        "name": "Sandeman 10yr Tawny",
        "glass": "10"
      },
      {
        "name": "Cockburns 10 year Tawny",
        "glass": "12"
      },
      {
        "name": "Taylor Fladgate 20 year Tawny",
        "glass": "14"
      },
      {
        "name": "Ferrari-Carano Eldorada Noir Black Muscat",
        "glass": "12"
      },
      {
        "name": "Jackson-Triggs Vidal Ice Wine",
        "glass": "13"
      },
      {
        "name": "Schmitt Söhne Beerenauslese",
        "glass": "12"
      },
      {
        "name": "Honig Late Harvest Sauvignon Blanc",
        "glass": "20"
      }
    ],
    "id": "port-dessert"
  },
  {
    "title": "Limited Release",
    "items": [
      {
        "name": "’21 Darioush Signature Cabernet Sauvignon",
        "bottle": "225",
        "desc": "Cabernet Sauvignon, Merlot, Cabernet Franc, Malbec, Petit Verdot. Enticing aromas of ripe black currant, blueberry and cacao. A supple and focused palate reveals round flavors of juicy blackberry, cherry and espresso."
      },
      {
        "name": "’17 Stonestreet Rockfall Cabernet",
        "bottle": "325",
        "desc": "The Cain Five is a Bordeaux blend that incorporates sustainably grown Cabernet Sauvignon, Merlot, Cabernet Franc, Petit Verdot and Malbec."
      },
      {
        "name": "’19 Silver Oak Napa Cabernet Sauvignon",
        "bottle": "225",
        "desc": "Raspberry, cassis and loose pipe tobacco display themselves from the nose to the exceptionally long silky finish in this effort from Silver Oak."
      },
      {
        "name": "’18 La Jota Howell Mountain Cabernet",
        "bottle": "250",
        "desc": "Intensely dark purple in color, this wine is big and very concentrated. Aromas of raspberries and vanilla bean are complemented by dark chocolate and licorice. The tannins are full and chalky, but balancing the weight of viscosity of the wine."
      },
      {
        "name": "’16 Pahlmeyer Proprietary Red Blend",
        "bottle": "375",
        "desc": "A blend of Bordeaux traditional grapes, this wine’s stunning intensity begins with its inky hue. Aromas of super ripe cassis, blueberry, blackberry and fig are under-scored by worn leather, anise and shiso mint. On the palate, dusty tannins and fetching flavors of dark, ripe berries, figs and chocolate."
      },
      {
        "name": "’19 Honig Bartolucci Cabernet Sauvignon",
        "bottle": "210",
        "desc": "This single vineyard wine from Napa provides notes of boysenberry, black cherry and violet wrapped in vanilla, caramel and toasty oak. A round, silky and rich mid-palate with cocoa powder and black tea textures on the finish."
      },
      {
        "name": "’19/’20 Ridge Monte Bello Red Blend",
        "bottle": "300",
        "desc": "Opaque ruby color. Intense blackberry fruit aromas, blackcurrant, exotic barrel spice, toasted oak, licorice, and complex forest notes. Rich mountain fruit entry, refreshing high acid, full chalky tannin structure, and sweet oak; strong mineral finish."
      },
      {
        "name": "’18 Mt. Brave Cabernet Sauvignon",
        "bottle": "225",
        "desc": "“Deep purple-black, it sings of warm blackberries, cassis and wild blueberries with hints of violets, dark chocolate, cigar box and menthol. Full-bodied and laden with black and blue fruit, it has a firm structure of grainy tannins and wonderful freshness, finishing long.” — Robert Parker"
      },
      {
        "name": "’21 Chimney Rock Tomahawk Cabernet Sauvignon",
        "bottle": "250",
        "desc": "Deep garnet red in color, this wine features a bright red fruit aroma, with hints of blackcurrant and cherry cola. Subtle spicy pepper flavors are accented with notes of cinnamon and clove, with elegant and approachable tannins."
      },
      {
        "name": "’20 DAOU Soul of a Lion Cabernet Sauvignon",
        "bottle": "260",
        "desc": "Explodes from the glass with a kaleidoscope of aromas and flavors, including blackberry, blueberry, black currant, dark cherry, sweet tobacco and vanilla. An added floral dimension imparts an integrated sense of elegance and freshness."
      },
      {
        "name": "’16 / ’17 Valadorna",
        "bottle": "195",
        "desc": "Very intense nose of blackberries, dark chocolate, sandalwood, vanilla, treacle and tar. Full-bodied with plenty of dark fruit, but lots of black-olive undertones and bright acidity keep this fresh, while firm tannins carve out an elegant, polished shape."
      }
    ],
    "id": "limited-release"
  }
];

// Dinner menu — transcribed verbatim from varanese.com/menu (Nov 2026).
// Prices and availability subject to change. Edit here; every page updates.
export type Dish = { name: string; price?: string; desc?: string };
export type MenuSection = { id: string; title: string; range?: string; note?: string; items: Dish[] };

export const dinnerMenu: MenuSection[] = [
  {
    id: 'starters',
    title: 'Starters',
    range: '$12 – $25',
    items: [
      { name: 'Crispy Calamari & Peppers', price: '17', desc: 'Assorted peppers, garlic cloves, sweet chili sauce, basil garlic aioli' },
      { name: 'Warm Feta Cheese Dip', price: '15', desc: 'Creamy feta cheese, cracked black pepper, toasted pine nuts, flatbread' },
      { name: 'House Cured Meats & Kenny’s Cheeses', price: '25', desc: 'Pickled vegetables, spiced pistachio, smoked mustard' },
      { name: 'Zesty Fried Brussels Sprouts', price: '12', desc: 'Red wine vinaigrette, capers, pickled red onions' },
      { name: 'BBQ Duck Confit Eggrolls', price: '14', desc: 'Duck confit, red cabbage, BBQ aioli' },
      { name: 'Stuffed Crab Avocado', price: '17', desc: 'Jumbo blue crab, citrus pico de gallo, jalapeño crème fraîche' },
      { name: 'Lamb and Goat Cheese Empanadas', price: '16', desc: 'Flaky pastry, herb goat cheese, basil garlic aioli' },
      { name: 'Warm Brie En Croûte', price: '14', desc: 'Puff pastry, bourbon-caramel, roasted pecans, apple slices' },
    ],
  },
  {
    id: 'soups-salads',
    title: 'Soups & Salads',
    range: '$7 – $14',
    note: 'Add-ons: Chicken $7 · Crab Cake $10 · Shrimp $11',
    items: [
      { name: 'Caesar Salad', price: '11 / 13', desc: 'Romaine, parmesan, roasted garlic dressing, brioche crouton — add anchovies +$2' },
      { name: 'Lamb & Lentil Soup', price: '7 / 12', desc: 'Savory lentils, braised lamb, spiced crème fraîche — cup or bowl' },
      { name: 'Pistachio Goat Cheese Salad', price: '14', desc: 'Warm pistachio goat cheese, spinach, sun-dried tomatoes, olives' },
      { name: 'Fried Green Tomato & Prosciutto Salad', price: '12', desc: 'Honey gem, goat cheese, buttermilk dressing' },
      { name: 'Apple & Pecan Baby Lettuce Salad', price: '12', desc: 'Candied pecan, dried cranberries, caramelized onion vinaigrette' },
    ],
  },
  {
    id: 'entrees',
    title: 'Entrées',
    range: '$20 – $43',
    items: [
      { name: 'Gorgonzola Beef & Tortellini', price: '28', desc: 'Beef tips, spinach, tomato, pine nuts, prosciutto' },
      { name: 'Braised Lamb Shank Osso Bucco', price: '36', desc: 'Butter whipped potatoes, asparagus, rosemary jus' },
      { name: 'Pecan Crusted Hawaiian Butterfish', price: '38', desc: 'Sweet potato-sage risotto, Tuscan kale, bourbon apple butter' },
      { name: 'Caramelized Orange Salmon', price: '28', desc: 'Cream cheese grits, vegetable medley, bourbon citrus glaze' },
      { name: 'Kentucky Strip Steak', price: '40', desc: 'Certified Angus, butter whipped potatoes, brussels sprouts, demi' },
      { name: 'Crab Cakes & Grits', price: '37', desc: 'Jumbo lump crab, tomato butter sauce, corn relish, asparagus' },
      { name: 'Chef John’s Vegetarian Plate', price: '24', desc: 'Local, seasonal, chef inspired' },
      { name: 'Grilled Elk Chops', price: '43', desc: 'Pepper jack gratin, asparagus, peppers, blackberry-rosemary demi' },
      { name: 'Prosciutto-Wrapped Veal & Ricotta', price: '39', desc: 'Sweet potato sage risotto, Tuscan kale, blackberry glaze' },
      { name: 'Angel Hair Bruschetta', price: '24–28', desc: 'Available with chicken, shrimp, or vegetable; tomatoes, olives, cremini mushroom, herbs, tomato-basil sauce' },
      { name: '“V” Smash Burger', price: '20', desc: 'Double patty, mozzarella, prosciutto, garlic-basil aioli, fries' },
      { name: 'Bourbon Barrel Smoked Pork Chop', price: '28', desc: 'Boneless chop, pepper jack gratin, apple-bacon chutney' },
    ],
  },
  {
    id: 'shareables',
    title: 'Shareables',
    range: '$8 each',
    items: [
      { name: 'Cream Cheese Grits' },
      { name: 'Grilled Asparagus' },
      { name: 'Sweet Potato-Sage Risotto' },
      { name: 'Butter Whipped Potatoes' },
      { name: 'Vegetable Medley' },
      { name: 'Pepperjack Potato Gratin' },
      { name: 'House Cut Fries' },
    ],
  },
];

/**
 * Chef's features ("Daily Specials" on varanese.com, Nov 2026).
 * These change frequently — update `asOf` and items together, or set items to [] to hide the section.
 */
export const chefFeatures = {
  asOf: '2026-11-22',
  sections: [
    {
      id: 'features-starters',
      title: 'Starters',
      items: [
        { name: 'Walu Ceviche', price: '16', desc: 'Pico de Gallo, Chipotle Aioli, Crispy Flatbread' },
        { name: 'Fried Tortelloni', price: '12', desc: 'Brown Butter Balsamic Reduction, Shaved Parmesan' },
      ],
    },
    {
      id: 'features-salad-soup',
      title: 'Salad & Soup',
      items: [
        { name: 'Fall Harvest Salad', price: '12', desc: 'Arugula, Shaved Peppercorn Asiago, Diced Pears, Toasted Pine Nuts, Apple Cider Dijon Vinaigrette' },
        { name: 'Roasted Fall Squash Bisque', price: '7 / 12', desc: 'Bourbon Crème Fraîche — cup or bowl' },
      ],
    },
    {
      id: 'features-entrees',
      title: 'Entrées',
      items: [
        { name: 'Char Broiled 6oz. Filet Oscar', price: '48', desc: 'Butter Whipped Potatoes, Grilled Asparagus, Lump Crab, Hollandaise, Veal Demi' },
        { name: '“Turducken” Turkey, Duck and Chicken', price: '28', desc: 'Cornbread-Sage and Sausage Stuffing, Turducken Gravy, Butternut Squash Hash, Cranberry Chutney, Haricot Verts' },
        { name: 'Smoked Salmon and Cavatappi Pasta', price: '26', desc: 'Baby Spinach, Sun-Dried Tomatoes, Fried Capers, Goat Cheese Cream Sauce' },
        { name: 'Grilled Prime Rib Medallions', price: '42', desc: 'Smashed Horseradish Red Skin Potatoes, Braised Kale, Natural Reduction' },
        { name: '1.5lb Whole Fried Yellowtail Snapper', price: '42', desc: 'Citrus and Ginger Stuffed, Sesame Miso Noodles, Stir-Fry Vegetables, Miso Sesame Sauce' },
      ],
    },
    {
      id: 'features-dessert',
      title: 'Dessert',
      items: [
        { name: 'Strawberry Mousse filled Chocolate Cup', price: '10', desc: 'Chocolate Dipped Mandarin Orange, Fresh Berries, Chocolate-Chocolate Chip Ice Cream' },
      ],
    },
  ] as MenuSection[],
};

/** Dishes highlighted on the homepage — names must exist in dinnerMenu. */
export const signatureDishNames = [
  'Bourbon Barrel Smoked Pork Chop',
  'Caramelized Orange Salmon',
  'Pecan Crusted Hawaiian Butterfish',
  'Grilled Elk Chops',
  'BBQ Duck Confit Eggrolls',
  'Warm Brie En Croûte',
];

export function findDish(name: string) {
  for (const s of dinnerMenu) {
    const d = s.items.find((i) => i.name === name);
    if (d) return { ...d, section: s.title };
  }
  throw new Error(`Signature dish not found in menu: ${name}`);
}

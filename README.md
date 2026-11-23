# Varanese — “The Art of an Evening”

A complete redesign of [varanese.com](https://varanese.com): Chef John Varanese’s New American restaurant at 2106 Frankfort Ave in Louisville’s Clifton neighborhood.

**Concept.** The homepage plays out as one evening on Frankfort Avenue, from 5:00 PM to 11:00 PM. It moves through arrival, the bar, the kitchen, the chef, the Veranda, recognition, this week’s events and private dining, and ends at your table. A fixed “evening clock” moves forward as you scroll. The palette darkens from dusk ivory to late-night espresso, with brass as the light source and the logo’s burgundy used sparingly.

## Stack

- **React 18 + Vite 5 + TypeScript.** There is no UI framework or animation library.
- **Static prerendering (SSG).** Every route is rendered to real HTML at build time (`scripts/prerender.mjs`). Each page gets its own title, meta tags, canonical URL, Open Graph tags and JSON-LD, and the page's CSS and JS are preloaded. The site still works with JavaScript disabled.
- **Code splitting by route.** The current route's chunk loads before hydration, so the prerendered markup is reused as-is.
- **Motion:** a small custom engine (`src/lib/motion.ts`) built on one IntersectionObserver for reveals and one rAF loop for clamped parallax and horizontal drift. Headlines reveal word by word, and images reveal with a clip-path mask. The hero is a sequence of real photographs with crossfades and a slow Ken Burns zoom, opened by a letterbox “curtain”. It has a pause control (WCAG 2.2.2). All decorative motion turns off under `prefers-reduced-motion`.
- **Water wall:** a canvas-2D artwork (`WaterWall.tsx`) that suggests the Veranda’s 20-foot slate water wall. It is labelled as artwork, pauses when off-screen, and shows a still frame under reduced motion. No Three.js: the 3D in this site is limited to subtle perspective tilt on the private-dining rooms and on the gift certificate.
- **Fonts:** Fraunces (variable optical size) and Hanken Grotesk, self-hosted and preloaded.
- **Images:** `npm run images` turns the originals in `assets-src/` into AVIF, WebP and JPEG/PNG at 480–2000px, plus LQIP placeholders (`src/data/images.json`).

## Content is data: edit here, not in components

| What | File |
|---|---|
| Address, phone, hours, OpenTable, socials | `src/data/business.ts` |
| Dinner menu, chef’s features, homepage signature dishes | `src/data/menu.ts` |
| Wine list | `src/data/wine.ts` |
| Bourbon flights, beer & spirits | `src/data/bar.ts` |
| Private dining rooms & minimums | `src/data/privateDining.ts` |
| Events | `src/data/events.ts` |
| Chef biography, awards | `src/data/story.ts` |
| Page titles, descriptions, structured data | `src/seo.ts` |

**Events** are typed as `recurring` (weekly, with the next date computed), `dated` (a single evening) or `seasonal` (runs until `endsOn`). Dated and seasonal events drop off automatically once they have passed, using Louisville time on the visitor's device. A new event automatically gets a `/events/<slug>/` page, a sitemap entry and, for dated events, `Event` schema.

**Chef’s features** change often. Update `chefFeatures` in `menu.ts`, or empty its sections to hide the block.

## Functionality

- **Reservations:** a reservation panel (party size, date, and a time slot within that day's hours) deep-links to OpenTable restaurant `rid=20470`. Without JavaScript, every reserve button is a plain link to the OpenTable profile. A phone number is always shown next to it.
- **Forms:** Contact, Private Dining inquiry and Newsletter use **Netlify Forms**, the same backend as the current site. The forms are in the prerendered HTML with `data-netlify` and a honeypot field, and submit with AJAX, with success and error states announced to screen readers. On any other host, set `FORM_ENDPOINT` in `src/lib/forms.ts` to a form backend that accepts URL-encoded POSTs (e.g. Formspree).
- **Gift cards:** the restaurant’s existing PayPal hosted button (`UPQACL92LVTNL`), with the same amount options as today.
- **Map:** Google Maps loads only after the visitor clicks to show it, which avoids loading a third party up front. The address and driving directions are also given as text.

## Scripts

```bash
npm install
npm run dev        # local dev
npm run images     # regenerate responsive images (only when assets-src changes)
npm run build      # typecheck → client build → SSR build → prerender + sitemap
npm run preview    # serve dist on :4173
npm run qa         # Playwright QA against the preview server (see below)
```

`scripts/qa.mjs` visits every route at 375, 390, 430, 768, 820, 1024, 1440 and 1920px. It scrolls each page all the way through and reports:

- console and page errors
- failed requests
- horizontal overflow
- images that never loaded
- missing alt text
- pages that don't have exactly one `<h1>`
- broken internal links

Options: `QA_VP`, `QA_ONLY` and `QA_SHOTS=0`.

## Deploy (Netlify)

`netlify.toml` sets the build command (`npm run build`), the publish directory (`dist`) and the headers (immutable caching for hashed assets and images, plus security headers). `public/_redirects` serves `404.html` for unknown paths. URLs stay the same as on the live site (`/menu/`, `/wine-list/`, `/bourbon-flights/`, `/beer-wine/`, `/private-dining/`, `/events/...`), so existing links and search rankings carry over.

## Content integrity

All business information, including menu items, prices, events, room capacities, minimums, biography and awards, was transcribed from varanese.com in November 2026. Nothing was invented.

- **Live jazz** is mentioned without a schedule. It is sourced from the restaurant’s own OpenTable listing, and the copy says to ask about tonight’s music.
- **Social proof** is limited to verified awards and links to real Tripadvisor and OpenTable reviews. No testimonials were written.
- **Photography:** all photographs are the restaurant’s own. There is no photo of the patio or the water wall, so that chapter uses a clearly labelled generative artwork rather than a stock or AI image.

**Recommended before launch:**
1. Supply photography of the Veranda water wall, the patio, live music and plated signature dishes. The layouts are ready for it: replace images in `assets-src/` and run `npm run images`.
2. Confirm the live-jazz nights so they can be listed as recurring events.
3. Review the chef’s features.

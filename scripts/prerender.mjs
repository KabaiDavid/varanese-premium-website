// Static-site generation: renders every route to HTML so each page ships with
// real content, unique metadata and structured data (SEO + no-JS resilience).
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const dist = path.resolve('dist');
const template = await readFile(path.join(dist, 'index.html'), 'utf8');
const { render, allRoutes } = await import(pathToFileURL(path.resolve('dist-ssr/entry-server.js')).href);

// Hide reveal-animated content only when JS is running; fall back to visible if the app fails to boot.
const bootScript = `<script>document.documentElement.classList.add('js');setTimeout(function(){if(!window.__vBooted){document.documentElement.classList.remove('js')}},4000)</script>`;

const manifest = JSON.parse(await readFile(path.join(dist, '.vite/manifest.json'), 'utf8'));
const pageFile = {
  home: 'Home', menu: 'Menu', wine: 'WineList', bourbon: 'BourbonFlights', spirits: 'BeerSpirits', about: 'About',
  privateDining: 'PrivateDining', events: 'Events', event: 'EventDetail', gift: 'GiftCards', contact: 'Contact',
  privacy: 'Privacy', accessibility: 'Accessibility', notFound: 'NotFound',
};
// Collect CSS + JS chunks a route needs so they load in parallel with the HTML (no FOUC, no waterfall).
function assetsFor(key) {
  const css = new Set(), js = new Set(), seen = new Set();
  const walk = (id) => {
    if (seen.has(id) || !manifest[id]) return;
    seen.add(id);
    const m = manifest[id];
    js.add(m.file);
    (m.css || []).forEach((c) => css.add(c));
    (m.imports || []).forEach(walk);
  };
  walk(`src/pages/${pageFile[key]}.tsx`);
  return { css: [...css], js: [...js] };
}
const { readdir } = await import('node:fs/promises');
const fontFiles = (await readdir(path.join(dist, 'assets'))).filter((f) => /^(fraunces-latin-opsz-normal|hanken-grotesk-latin-wght-normal)-.*\.woff2$/.test(f));
const urls = [...allRoutes, '/404/'];
for (const url of urls) {
  const { html, head, pageKey } = await render(url);
  const a = assetsFor(pageKey);
  const fonts = fontFiles.map((f) => `<link rel="preload" as="font" type="font/woff2" href="/assets/${f}" crossorigin />`);
  const links = [...fonts, ...a.css.filter((c) => !template.includes(c)).map((c) => `<link rel="stylesheet" href="/${c}" />`), ...a.js.map((j) => `<link rel="modulepreload" href="/${j}" />`)].join('\n    ');
  const page = template.replace('<!--app-head-->', `${head}\n    ${bootScript}`).replace('</head>', `  ${links}\n  </head>`).replace('<div id="root"><!--app-html-->', `<div id="root" data-page="${pageKey}">${html}`);
  const out = url === '/404/' ? path.join(dist, '404.html') : path.join(dist, url, 'index.html');
  await mkdir(path.dirname(out), { recursive: true });
  await writeFile(out, page);
  console.log('prerendered', url);
}

const today = new Date().toISOString().slice(0, 10);
const priority = (u) => (u === '/' ? '1.0' : ['/menu/', '/private-dining/', '/contact/'].includes(u) ? '0.9' : u.startsWith('/events/') && u !== '/events/' ? '0.6' : '0.7');
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes.map((u) => `  <url><loc>https://varanese.com${u}</loc><lastmod>${today}</lastmod><priority>${priority(u)}</priority></url>`).join('\n')}
</urlset>
`;
await writeFile(path.join(dist, 'sitemap.xml'), sitemap);
await rm('dist-ssr', { recursive: true, force: true });
console.log('sitemap.xml written,', allRoutes.length, 'urls');

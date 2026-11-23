// QA harness: visits every route at the brief's viewport sizes, scrolls to trigger
// reveals, and reports console errors, failed requests, horizontal overflow,
// broken internal links and missing alt text. Screenshots go to QA_OUT.
// Usage: npm run build && npx vite preview --port 4173 & node scripts/qa.mjs
import { createRequire } from 'node:module';
import { execSync } from 'node:child_process';
// Resolve Playwright locally or from the global install.
const req = createRequire(import.meta.url);
let pw;
try { pw = req('playwright'); } catch { pw = createRequire(execSync('npm root -g').toString().trim() + '/').call ? req(execSync('npm root -g').toString().trim() + '/playwright') : null; }
const { chromium } = pw;
import { mkdir } from 'node:fs/promises';

const BASE = process.env.QA_BASE || 'http://localhost:4173';
const OUT = process.env.QA_OUT || 'qa-shots';
const ONLY = process.env.QA_ONLY?.split(',');
const SHOTS = process.env.QA_SHOTS !== '0';
const routes = ['/', '/menu/', '/wine-list/', '/bourbon-flights/', '/beer-wine/', '/about/', '/private-dining/', '/events/', '/events/sazerac-bourbon-dinner/', '/events/turducken/', '/events/martini-mondays/', '/gift-cards/', '/contact/', '/privacy-policy/', '/accessibility/', '/nope/'];
const viewports = (process.env.QA_VP || '375x812,390x844,430x932,768x1024,820x1180,1024x768,1440x900,1920x1080').split(',').map((v) => v.split('x').map(Number));

await mkdir(OUT, { recursive: true });
const browser = await chromium.launch();
const problems = [];
const links = new Set();
for (const [w, h] of viewports) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  page.on('console', (m) => { if (m.type() === 'error') problems.push(`[${w}] console: ${m.text()} @ ${page.url()}`); });
  page.on('pageerror', (e) => problems.push(`[${w}] pageerror: ${e.message} @ ${page.url()}`));
  page.on('requestfailed', (r) => { if (!/google|opentable|paypal/.test(r.url())) problems.push(`[${w}] reqfail: ${r.url()}`); });
  for (const r of routes) {
    if (ONLY && !ONLY.includes(r)) continue;
    await page.goto(BASE + r, { waitUntil: 'networkidle' });
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += Math.round(innerHeight * 0.7)) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 90)); }
      scrollTo(0, 0);
    });
    await page.waitForTimeout(1200);
    const res = await page.evaluate(() => {
      const docW = document.documentElement.clientWidth;
      const over = [...document.querySelectorAll('body *')].filter((el) => {
        const b = el.getBoundingClientRect();
        if (!b.width) return false;
        let p = el; while (p && p !== document.body) { const cs = getComputedStyle(p); if (['auto','scroll','hidden','clip'].includes(cs.overflowX) && p !== el) return false; p = p.parentElement; }
        return b.right > docW + 1 || b.left < -1;
      }).slice(0, 5).map((el) => `${el.tagName}.${(el.className || '').toString().slice(0, 40)} r=${Math.round(el.getBoundingClientRect().right)}`);
      const unloaded = [...document.querySelectorAll('img')].filter((i) => i.getBoundingClientRect().width > 0 && !i.closest('.hero__frame:not(.is-on)') && (!i.complete || i.naturalWidth === 0)).map((i) => i.getAttribute('src'));
      const noAlt = [...document.querySelectorAll('img:not([alt])')].length;
      const h1 = document.querySelectorAll('h1').length;
      const hrefs = [...document.querySelectorAll('a[href^="/"]')].map((a) => a.getAttribute('href'));
      const sw = document.documentElement.scrollWidth;
      return { over, noAlt, h1, hrefs, sw, docW, unloaded };
    });
    res.hrefs.forEach((x) => links.add(x.split('#')[0]));
    if (res.sw > res.docW) problems.push(`[${w}] ${r} page scrollWidth ${res.sw} > ${res.docW}`);
    if (res.over.length) problems.push(`[${w}] ${r} overflow: ${res.over.join(' | ')}`);
    if (res.unloaded.length) problems.push(`[${w}] ${r} images not loaded: ${res.unloaded.join(', ')}`);
    if (res.noAlt) problems.push(`[${w}] ${r} ${res.noAlt} img without alt`);
    if (res.h1 !== 1) problems.push(`[${w}] ${r} has ${res.h1} h1`);
    if (SHOTS) await page.screenshot({ path: `${OUT}/${w}${r.replace(/\//g, '_') || '_'}.png`, fullPage: true });
  }
  await ctx.close();
}
// internal link check
const ctx = await browser.newContext();
const p = await ctx.newPage();
for (const l of links) {
  const resp = await p.goto(BASE + l);
  const title = await p.title();
  if (!resp || resp.status() >= 400 || /Not Found/.test(title)) problems.push(`broken link: ${l} (${resp?.status()} ${title})`);
}
await browser.close();
console.log(problems.length ? problems.join('\n') : 'QA: no problems found');
console.log('internal links checked:', links.size);

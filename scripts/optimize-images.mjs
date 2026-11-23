// Generates responsive AVIF/WebP/JPEG derivatives from /assets-src into /public/img
// and writes src/data/images.json (dimensions + LQIP) for the <Img> component.
import sharp from 'sharp';
import { readdir, mkdir, writeFile, stat } from 'node:fs/promises';
import path from 'node:path';

const SRC = 'assets-src';
const OUT = 'public/img';
const WIDTHS = [480, 800, 1200, 1600, 2000];

async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else if (/\.(jpe?g|png)$/i.test(e.name)) out.push(p);
  }
  return out;
}

const manifest = {};
await mkdir(OUT, { recursive: true });
for (const file of await walk(SRC)) {
  const rel = path.relative(SRC, file).replace(/\\/g, '/');
  const key = rel.replace(/\.(jpe?g|png)$/i, '').replace(/\//g, '-');
  const img = sharp(file);
  const meta = await img.metadata();
  const isPng = /\.png$/i.test(file);
  const widths = WIDTHS.filter((w) => w < meta.width).concat(meta.width > 2000 ? [] : [meta.width]);
  for (const w of widths) {
    const base = path.join(OUT, `${key}-${w}`);
    const r = sharp(file).resize({ width: w, withoutEnlargement: true });
    await r.clone().avif({ quality: 52, effort: 6 }).toFile(`${base}.avif`);
    await r.clone().webp({ quality: 74 }).toFile(`${base}.webp`);
    if (isPng) await r.clone().png({ compressionLevel: 9 }).toFile(`${base}.png`);
    else await r.clone().jpeg({ quality: 78, mozjpeg: true, progressive: true }).toFile(`${base}.jpg`);
  }
  const lqip = await sharp(file).resize(24).blur(1.2).webp({ quality: 40 }).toBuffer();
  manifest[key] = {
    w: meta.width,
    h: meta.height,
    widths,
    fallback: isPng ? 'png' : 'jpg',
    lqip: `data:image/webp;base64,${lqip.toString('base64')}`,
  };
  console.log(key, meta.width, 'x', meta.height, widths.join(','));
}
// Open Graph image
await sharp(path.join(SRC, 'dine-with-us.jpg')).resize(1200, 630, { fit: 'cover', position: 'attention' }).jpeg({ quality: 82, mozjpeg: true }).toFile('public/og-image.jpg');
await mkdir('src/data', { recursive: true });
await writeFile('src/data/images.json', JSON.stringify(manifest, null, 2));
console.log('done', Object.keys(manifest).length, 'images');

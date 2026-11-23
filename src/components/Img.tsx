import manifest from '../data/images.json';

type Entry = { w: number; h: number; widths: number[]; fallback: string; lqip: string };
const M = manifest as Record<string, Entry>;

type Props = {
  name: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
  position?: string;
  cover?: boolean;
  style?: React.CSSProperties;
};

/** Art-directed responsive image: AVIF → WebP → JPEG/PNG with LQIP placeholder. */
export function Img({ name, alt, sizes = '100vw', priority, className, imgClassName, position, cover, style }: Props) {
  const e = M[name];
  if (!e) throw new Error(`Unknown image: ${name}`);
  const set = (ext: string) => e.widths.map((w) => `/img/${name}-${w}.${ext} ${w}w`).join(', ');
  const largest = e.widths[e.widths.length - 1];
  const mid = e.widths.find((w) => w >= 1200) ?? largest;
  return (
    <picture
      className={className}
      style={{ backgroundImage: `url(${e.lqip})`, backgroundSize: 'cover', backgroundPosition: position ?? 'center', ...style }}
    >
      <source type="image/avif" srcSet={set('avif')} sizes={sizes} />
      <source type="image/webp" srcSet={set('webp')} sizes={sizes} />
      <img
        src={`/img/${name}-${mid}.${e.fallback}`}
        srcSet={set(e.fallback)}
        sizes={sizes}
        width={e.w}
        height={e.h}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        {...(priority ? { fetchpriority: 'high' } : {})}
        className={imgClassName}
        style={cover ? { width: '100%', height: '100%', objectFit: 'cover', objectPosition: position ?? 'center' } : undefined}
      />
    </picture>
  );
}

export function imgUrl(name: string, width = 1200) {
  const e = M[name];
  const w = e.widths.find((x) => x >= width) ?? e.widths[e.widths.length - 1];
  return `/img/${name}-${w}.${e.fallback}`;
}

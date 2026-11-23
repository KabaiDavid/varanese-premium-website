import { Img } from './Img';
import { Split } from './Split';

type Props = {
  eyebrow: string;
  title: string;
  sub?: React.ReactNode;
  image?: string;
  imageAlt?: string;
  position?: string;
  aside?: React.ReactNode;
  titleClass?: string;
};

export function PageHero({ eyebrow, title, sub, image, imageAlt = '', position, aside, titleClass = 'h1' }: Props) {
  return (
    <header className={`phero ${image ? 'phero--image' : ''}`}>
      {image && (
        <div className="phero__bg">
          <Img name={image} alt={imageAlt} priority sizes="100vw" cover position={position} />
        </div>
      )}
      <div className={`wrap phero__inner ${aside ? 'phero__inner--split' : ''}`}>
        <div>
          <p className="eyebrow eyebrow--time phero__eyebrow">{eyebrow}</p>
          <Split as="h1" className={titleClass} text={title} delay={0.1} />
          {sub && <div className="phero__sub" data-reveal="up" style={{ marginTop: '1.75rem', ['--d' as string]: '0.4s' } as React.CSSProperties}>{sub}</div>}
        </div>
        {aside && <div data-reveal="up" style={{ ['--d' as string]: '0.5s' } as React.CSSProperties}>{aside}</div>}
      </div>
    </header>
  );
}

import { createElement, Fragment } from 'react';

type Props = {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  className?: string;
  delay?: number;
  id?: string;
};

/**
 * Headline that reveals word by word. Wrap emphasis in *asterisks* for italic.
 * Use "|" to force a line break.
 */
export function Split({ text, as = 'h2', className = '', delay = 0, id }: Props) {
  let i = 0;
  const lines = text.split('|');
  const children = lines.map((line, li) => {
    const parts = line.trim().split(/(\*[^*]+\*)/g).filter(Boolean);
    const nodes = parts.flatMap((part, pi) => {
      const italic = part.startsWith('*');
      const words = part.replace(/\*/g, '').split(/\s+/).filter(Boolean);
      return words.map((w, wi) => {
        const idx = i++;
        const inner = <span style={{ ['--i' as string]: idx } as React.CSSProperties}>{italic ? <em>{w}</em> : w}</span>;
        return (
          <Fragment key={`${pi}-${wi}`}>
            <span className="w">{inner}</span>{' '}
          </Fragment>
        );
      });
    });
    return (
      <Fragment key={li}>
        {nodes}
        {li < lines.length - 1 && <br />}
      </Fragment>
    );
  });
  return createElement(
    as,
    { className: `split ${className}`, 'data-split': '', style: { ['--d' as string]: `${delay}s` }, id },
    children,
  );
}

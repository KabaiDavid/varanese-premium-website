import { PageHero } from './PageHero';

export function Legal({ eyebrow, title, updated, children }: { eyebrow: string; title: string; updated: string; children: React.ReactNode }) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} sub={<p>{updated}</p>} />
      <section className="section">
        <div className="wrap wrap--narrow legal prose">{children}</div>
      </section>
    </>
  );
}

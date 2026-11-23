// Lightweight motion engine: one IntersectionObserver for reveals and one rAF
// loop for parallax. No animation library needed for this level of motion.
export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let io: IntersectionObserver | null = null;

function observe(root: ParentNode) {
  if (!io) return;
  root.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-in), [data-split]:not(.is-in)').forEach((el) => io!.observe(el));
}

export function startMotion() {
  document.documentElement.classList.add('js');
  if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
    document.querySelectorAll('[data-reveal], [data-split]').forEach((el) => el.classList.add('is-in'));
    new MutationObserver(() => document.querySelectorAll('[data-reveal]:not(.is-in), [data-split]:not(.is-in)').forEach((el) => el.classList.add('is-in'))).observe(document.body, { childList: true, subtree: true });
    return;
  }
  io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io!.unobserve(e.target);
        }
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  );
  // Native lazy-loading ignores images that are fully clipped by a mask, so load
  // masked images ourselves as they approach the viewport.
  const near = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        e.target.querySelectorAll('img[loading="lazy"]').forEach((img) => img.setAttribute('loading', 'eager'));
        near.unobserve(e.target);
      }
    },
    { rootMargin: '0px 0px 900px 0px' },
  );
  const observeNear = () => document.querySelectorAll('[data-reveal="mask"]:not([data-near])').forEach((el) => { el.setAttribute('data-near', ''); near.observe(el); });
  observeNear();
  observe(document);
  let queued = false;
  new MutationObserver(() => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      observe(document);
      observeNear();
    });
  }).observe(document.body, { childList: true, subtree: true });

  // Parallax: elements with data-parallax="0.12" drift relative to viewport center.
  const els = () => Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]'));
  let ticking = false;
  const update = () => {
    ticking = false;
    const vh = window.innerHeight;
    const factor = window.innerWidth < 768 ? 0.5 : 1;
    for (const el of els()) {
      const r = el.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) continue;
      const speed = parseFloat(el.dataset.parallax || '0.1') * factor;
      const raw = (r.top + r.height / 2 - vh / 2) * -speed;
      const limit = r.height * 0.05; // inner media is 12% taller than its frame
      const offset = Math.max(-limit, Math.min(limit, raw));
      el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
    }
  };
  const onScroll = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  // run after route changes too
  new MutationObserver(onScroll).observe(document.body, { childList: true, subtree: true });
  update();
}

/** Horizontal drift for [data-hscroll] rows (desktop only): the row slides as its section scrolls past. */
export function startHScroll() {
  const mq = window.matchMedia('(min-width: 1024px) and (prefers-reduced-motion: no-preference)');
  let ticking = false;
  const update = () => {
    ticking = false;
    document.querySelectorAll<HTMLElement>('[data-hscroll]').forEach((row) => {
      if (!mq.matches) { row.style.transform = ''; return; }
      const host = row.parentElement!;
      const r = host.getBoundingClientRect();
      const vh = window.innerHeight;
      if (r.bottom < 0 || r.top > vh) return;
      const progress = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)));
      const max = Math.max(0, row.scrollWidth - host.clientWidth);
      row.style.transform = `translate3d(${(-max * progress).toFixed(1)}px, 0, 0)`;
    });
  };
  const on = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
  window.addEventListener('scroll', on, { passive: true });
  window.addEventListener('resize', on);
  new MutationObserver(on).observe(document.body, { childList: true, subtree: true });
  on();
}

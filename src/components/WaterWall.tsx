import { useEffect, useRef } from 'react';

/**
 * Generative artwork evoking the Veranda's 20-foot slate water wall:
 * sheets of water sliding over stacked slate. Canvas 2D, ~0 dependencies,
 * pauses off-screen, renders a single still frame for reduced motion.
 */
export function WaterWall({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w = 0, h = 0, dpr = 1, raf = 0, visible = false;
    type Stream = { x: number; y: number; len: number; speed: number; alpha: number; width: number };
    let streams: Stream[] = [];
    let slate: HTMLCanvasElement;

    const buildSlate = () => {
      slate = document.createElement('canvas');
      slate.width = w; slate.height = h;
      const s = slate.getContext('2d')!;
      s.fillStyle = '#1f201f';
      s.fillRect(0, 0, w, h);
      // stacked slate courses
      let y = 0;
      let seed = 7;
      const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
      while (y < h) {
        const ch = (10 + rnd() * 26) * dpr;
        let x = -rnd() * 80 * dpr;
        while (x < w) {
          const cw = (60 + rnd() * 180) * dpr;
          const l = 10 + rnd() * 5;
          s.fillStyle = `hsl(${30 + rnd() * 20}, ${4 + rnd() * 6}%, ${l}%)`;
          s.fillRect(x, y, cw - 1 * dpr, ch - 1 * dpr);
          x += cw;
        }
        y += ch;
      }
      const g = s.createLinearGradient(0, 0, 0, h);
      g.addColorStop(0, 'rgba(24,17,14,0.75)');
      g.addColorStop(0.35, 'rgba(24,17,14,0.15)');
      g.addColorStop(1, 'rgba(24,17,14,0.85)');
      s.fillStyle = g; s.fillRect(0, 0, w, h);
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.width = Math.round(canvas.clientWidth * dpr);
      h = canvas.height = Math.round(canvas.clientHeight * dpr);
      const count = Math.round((canvas.clientWidth / 6));
      streams = Array.from({ length: count }, () => spawn(true));
      buildSlate();
    };
    const spawn = (anywhere = false): Stream => ({
      x: Math.random() * w,
      y: anywhere ? Math.random() * h : -Math.random() * h * 0.4,
      len: (40 + Math.random() * 220) * dpr,
      speed: (0.6 + Math.random() * 2.2) * dpr,
      alpha: 0.05 + Math.random() * 0.22,
      width: (0.5 + Math.random() * 1.3) * dpr,
    });

    const draw = () => {
      ctx.drawImage(slate, 0, 0);
      ctx.globalCompositeOperation = 'lighter';
      for (const s of streams) {
        const g = ctx.createLinearGradient(0, s.y - s.len, 0, s.y);
        g.addColorStop(0, 'rgba(220,200,165,0)');
        g.addColorStop(1, `rgba(225,205,170,${s.alpha})`);
        ctx.strokeStyle = g;
        ctx.lineWidth = s.width;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y - s.len);
        ctx.lineTo(s.x + Math.sin(s.y / (60 * dpr)) * 0.6 * dpr, s.y);
        ctx.stroke();
        if (!reduce) {
          s.y += s.speed;
          if (s.y - s.len > h) Object.assign(s, spawn());
        }
      }
      // warm light pooling at the base
      const pool = ctx.createRadialGradient(w * 0.5, h * 1.05, 0, w * 0.5, h * 1.05, h * 0.6);
      pool.addColorStop(0, 'rgba(207,174,116,0.18)');
      pool.addColorStop(1, 'rgba(207,174,116,0)');
      ctx.fillStyle = pool; ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'source-over';
    };

    const loop = () => {
      draw();
      if (visible && !reduce) raf = requestAnimationFrame(loop);
    };
    resize();
    draw();
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible && !reduce) raf = requestAnimationFrame(loop);
    });
    io.observe(canvas);
    let rt = 0;
    const onResize = () => { clearTimeout(rt); rt = window.setTimeout(() => { resize(); draw(); }, 150); };
    window.addEventListener('resize', onResize);
    return () => { io.disconnect(); cancelAnimationFrame(raf); window.removeEventListener('resize', onResize); };
  }, []);
  return <canvas ref={ref} className={className} aria-hidden="true" />;
}

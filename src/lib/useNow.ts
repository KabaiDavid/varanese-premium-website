import { useEffect, useState } from 'react';

declare const __BUILD_TIME__: string;
export const BUILD_TIME = new Date(__BUILD_TIME__);

/**
 * Returns the build time during prerender/hydration (so markup matches),
 * then switches to the real clock on the client and ticks every minute.
 */
export function useNow(tick = 60_000) {
  const [now, setNow] = useState<Date>(BUILD_TIME);
  const [live, setLive] = useState(false);
  useEffect(() => {
    setNow(new Date());
    setLive(true);
    const t = setInterval(() => setNow(new Date()), tick);
    return () => clearInterval(t);
  }, [tick]);
  return { now, live };
}

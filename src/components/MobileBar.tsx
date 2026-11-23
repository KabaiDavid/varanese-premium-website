import { useEffect, useRef, useState } from 'react';
import { business } from '../data/business';
import { ReserveButton } from './Reserve';
import { Phone } from './Icons';

/** Persistent bottom bar on phones: the reservation is always one tap away. */
export function MobileBar() {
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current) ref.current.inert = !show;
  }, [show]);
  useEffect(() => {
    const onScroll = () => {
      const nearEnd = window.innerHeight + window.scrollY > document.body.scrollHeight - 40;
      setShow(window.scrollY > window.innerHeight * 0.6 && !nearEnd);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div className={`mbar ${show ? 'is-on' : ''}`} ref={ref}>
      <a href={business.phoneHref} className="mbar__call" aria-label={`Call Varanese at ${business.phone}`}>
        <Phone /> Call
      </a>
      <ReserveButton className="btn btn--brass mbar__reserve">Reserve a table</ReserveButton>
    </div>
  );
}

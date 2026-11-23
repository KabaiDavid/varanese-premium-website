import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { business, hoursForDay, louisvilleNow } from '../data/business';
import { Arrow, Ext, Phone } from './Icons';
import './reserve.css';

type Ctx = { open: () => void };
const ReserveCtx = createContext<Ctx>({ open: () => {} });
export const useReserve = () => useContext(ReserveCtx);

const pad = (n: number) => String(n).padStart(2, '0');
const fmtTime = (m: number) => {
  const h = Math.floor(m / 60);
  const mm = m % 60;
  return `${((h + 11) % 12) + 1}:${pad(mm)} PM`;
};

export function openTableUrl(party: number, date: string, time: string) {
  const p = new URLSearchParams({ rid: business.openTableRid, restref: business.openTableRid, partySize: String(party), dateTime: `${date}T${time}`, lang: 'en-US' });
  return `https://www.opentable.com/booking/restref/availability?${p.toString()}`;
}

function slotsFor(dateStr: string) {
  const [y, m, d] = dateStr.split('-').map(Number);
  const day = new Date(Date.UTC(y, m - 1, d)).getUTCDay();
  const h = hoursForDay(day);
  const close = parseInt(h.close, 10) * 60;
  const out: number[] = [];
  for (let t = 17 * 60; t <= close - 60; t += 30) out.push(t);
  return out;
}

export function ReserveProvider({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [mounted, setMounted] = useState(false);
  const open = useCallback(() => {
    setMounted(true);
    requestAnimationFrame(() => ref.current?.showModal());
  }, []);
  const value = useMemo(() => ({ open }), [open]);
  return (
    <ReserveCtx.Provider value={value}>
      {children}
      {mounted && <ReserveDialog dialogRef={ref} />}
    </ReserveCtx.Provider>
  );
}

function ReserveDialog({ dialogRef }: { dialogRef: React.RefObject<HTMLDialogElement> }) {
  // Earliest bookable evening (Louisville time): today if a slot is still 30+ minutes away, else tomorrow.
  const { today, nowMin, isToday } = useMemo(() => {
    const l = louisvilleNow();
    const iso = (offset: number) => {
      const dt = new Date(Date.UTC(l.y, l.m - 1, l.d + offset));
      return `${dt.getUTCFullYear()}-${pad(dt.getUTCMonth() + 1)}-${pad(dt.getUTCDate())}`;
    };
    const t = iso(0);
    const open = slotsFor(t).some((m) => m >= l.minutes + 30);
    return { today: open ? t : iso(1), nowMin: l.minutes, isToday: open };
  }, []);
  const [party, setParty] = useState(2);
  const [date, setDate] = useState(today);
  const slots = slotsFor(date || today).filter((m) => !(isToday && date === today && m < nowMin + 30));
  const [time, setTime] = useState(() => (slots.includes(19 * 60) ? 19 * 60 : slots[0]));
  useEffect(() => {
    if (!slots.includes(time)) setTime(slots.includes(19 * 60) ? 19 * 60 : slots[0]);
  }, [date]); // eslint-disable-line react-hooks/exhaustive-deps

  const close = () => dialogRef.current?.close();
  const timeStr = `${pad(Math.floor(time / 60))}:${pad(time % 60)}`;
  const url = openTableUrl(party, date || today, timeStr);

  return (
    <dialog
      ref={dialogRef}
      className="reserve"
      aria-labelledby="reserve-title"
      onClick={(e) => {
        if (e.target === dialogRef.current) close();
      }}
    >
      <div className="reserve__inner dark">
        <button className="reserve__close" onClick={close} aria-label="Close reservation panel">
          <span aria-hidden="true" />
        </button>
        <p className="eyebrow brass">Reservations</p>
        <h2 id="reserve-title" className="h2 reserve__title">
          Your table, <em>tonight</em> or any evening.
        </h2>
        <form
          className="reserve__form"
          onSubmit={(e) => {
            e.preventDefault();
            window.open(url, '_blank', 'noopener');
          }}
        >
          <div className="field">
            <span className="label" id="party-label">Guests</span>
            <div className="party" role="group" aria-labelledby="party-label">
              <button type="button" onClick={() => setParty((p) => Math.max(1, p - 1))} aria-label="Fewer guests" disabled={party <= 1}>−</button>
              <output aria-live="polite" className="num">{party} {party === 1 ? 'guest' : 'guests'}</output>
              <button type="button" onClick={() => setParty((p) => Math.min(20, p + 1))} aria-label="More guests" disabled={party >= 20}>+</button>
            </div>
          </div>
          <div className="form-grid form-grid--2">
            <div className="field">
              <label htmlFor="r-date">Date</label>
              <input id="r-date" type="date" min={today} value={date} onChange={(e) => setDate(e.target.value)} required />
            </div>
            <div className="field">
              <label htmlFor="r-time">Preferred time</label>
              <select id="r-time" value={time} onChange={(e) => setTime(Number(e.target.value))}>
                {slots.map((s) => (
                  <option key={s} value={s}>{fmtTime(s)}</option>
                ))}
              </select>
            </div>
          </div>
          <button className="btn btn--brass reserve__go" type="submit">
            Find a table on OpenTable <Ext />
            <span className="sr-only">(opens in a new tab)</span>
          </button>
          <p className="reserve__note muted">
            Live availability is confirmed by OpenTable. Parties larger than 20, or planning a private event? Call us or see{' '}
            <a className="text-link" href="/private-dining/" onClick={close}>Private Dining</a>.
          </p>
        </form>
        <div className="reserve__alt">
          <a href={business.phoneHref} className="link"><Phone /> {business.phone}</a>
          <a href={business.reserveUrl} target="_blank" rel="noopener" className="link">
            OpenTable profile <Arrow /><span className="sr-only">(opens in a new tab)</span>
          </a>
        </div>
      </div>
    </dialog>
  );
}

/** Reservation CTA. A real link to OpenTable without JS; opens the panel with JS. */
export function ReserveButton({ className = 'btn btn--brass', children = 'Reserve your table' }: { className?: string; children?: React.ReactNode }) {
  const { open } = useReserve();
  return (
    <a
      href={business.reserveUrl}
      className={className}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey) return;
        e.preventDefault();
        open();
      }}
    >
      {children}
    </a>
  );
}

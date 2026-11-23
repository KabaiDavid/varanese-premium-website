export const Arrow = ({ className = 'arrow' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 18 10" fill="none" aria-hidden="true">
    <path d="M0 5h16.5M12.5 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" />
  </svg>
);
export const Ext = () => (
  <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
    <path d="M3 1h7v7M10 1 1 10" stroke="currentColor" strokeWidth="1.2" />
  </svg>
);
export const Phone = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
  </svg>
);
/** Small diamond ornament, echoing the original site's ♦ section dividers. */
export const Diamond = ({ className }: { className?: string }) => (
  <svg className={className} width="9" height="9" viewBox="0 0 10 10" aria-hidden="true">
    <path d="M5 0 10 5 5 10 0 5z" fill="currentColor" />
  </svg>
);

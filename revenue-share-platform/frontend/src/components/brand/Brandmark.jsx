import './brand.css';

/**
 * The Reven mark — bespoke, font-independent geometry: a ledger "record"
 * frame with a line of value rising up-right and breaking past the corner,
 * settled at a single brass point. Not an icon-in-a-tile; the bare mark.
 */
export function Brandmark({ size = 30, className = '', title = 'Reven' }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 34 34"
      fill="none"
      role="img"
      aria-label={title}
    >
      <rect
        x="5"
        y="8.5"
        width="20.5"
        height="20.5"
        rx="6"
        stroke="var(--brand-400)"
        strokeWidth="2.4"
      />
      <path
        d="M11 25.5 L28.4 6.6"
        stroke="var(--brand-300)"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <circle cx="28.8" cy="6.1" r="2.6" fill="var(--brass-300)" />
    </svg>
  );
}

/** The lockup: bare mark + serif wordmark. */
export function Wordmark({ size = 28, className = '' }) {
  return (
    <span className={`rv-wordmark ${className}`}>
      <Brandmark size={size} />
      <span className="rv-wordmark__text serif">Reven</span>
    </span>
  );
}

export default Brandmark;

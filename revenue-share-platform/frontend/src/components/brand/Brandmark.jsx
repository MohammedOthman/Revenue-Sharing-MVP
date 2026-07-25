import './brand.css';

/*
 * The Reven logo — reproduced from the brand artwork as scalable vector.
 * Letters use currentColor (so the mark is light on the dark UI and navy on
 * paper); the two signature squares are the brand's electric blue.
 *
 * NOTE: this is a faithful reproduction. The canonical source of truth is
 * documented in BRAND.md; drop the original vector into public/brand/ to
 * supersede it.
 */

const STROKE = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 17,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};
const SQUARE = { fill: 'var(--brand-500)', rx: 1.5 };

/** Full "Reven" logotype. */
export function Wordmark({ size = 28, className = '' }) {
  const w = Math.round(size * (342 / 96));
  return (
    <svg
      className={`rv-logo ${className}`}
      width={w}
      height={size}
      viewBox="0 0 342 96"
      role="img"
      aria-label="Reven"
    >
      {/* R */}
      <path {...STROKE} d="M32 22 V74" />
      <path {...STROKE} d="M32 22 H58 a18 18 0 0 1 0 36 H32" />
      <path {...STROKE} d="M40 56 L80 74" />
      <rect {...SQUARE} x="41" y="29" width="12" height="12" />
      {/* e */}
      <path {...STROKE} d="M96 52 H144" />
      <path {...STROKE} d="M144 52 A24 24 0 1 0 132 73" />
      {/* v */}
      <path {...STROKE} d="M150 50 L172 74 L194 50" />
      {/* e */}
      <path {...STROKE} d="M196 52 H244" />
      <path {...STROKE} d="M244 52 A24 24 0 1 0 232 73" />
      {/* n */}
      <path {...STROKE} d="M264 74 V52 a20 20 0 0 1 40 0 V74" />
      <rect {...SQUARE} x="304" y="61" width="13" height="13" />
    </svg>
  );
}

/** Compact mark — the R with its accent square, for the collapsed rail + loader. */
export function Brandmark({ size = 30, className = '', title = 'Reven' }) {
  return (
    <svg
      className={`rv-logo ${className}`}
      width={size}
      height={size}
      viewBox="18 12 74 70"
      role="img"
      aria-label={title}
    >
      <path {...STROKE} d="M32 22 V74" />
      <path {...STROKE} d="M32 22 H58 a18 18 0 0 1 0 36 H32" />
      <path {...STROKE} d="M40 56 L80 74" />
      <rect {...SQUARE} x="41" y="29" width="12" height="12" />
    </svg>
  );
}

export default Brandmark;

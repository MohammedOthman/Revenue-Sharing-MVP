import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { animate, useInView, useReducedMotion } from 'motion/react';

/* Humanize an enum token: partner_sourced_lead -> Partner sourced lead */
export const humanize = (s = '') =>
  String(s)
    .replace(/[_-]+/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();

/* Map any status enum to an in-family tone (cohesion over signal-spray). */
export function toneFor(status = '') {
  const s = String(status).toLowerCase();
  if (
    /(accept|eligible|active|paid|approved|recognized|closed_won|achieved|pass|settled|collected|verified|finalized|resolved_upheld|resolved_adjusted|on_track|done)/.test(
      s
    )
  )
    return 'ok';
  if (
    /(reject|expired|lost|failed|terminated|clawed|dispute|off_track|error|breach|closed_lost|resolved_rejected|cancelled|canceled|refunded)/.test(
      s
    )
  )
    return 'stop';
  if (/(protect|under_review|in_progress|processing|pilot|onboarding|qualifying|escalated|reopened)/.test(s))
    return 'hold';
  if (/(risk|needs|missing|warn|expiring|overdue|blocked|park|nurture|suspended|contracted)/.test(s))
    return 'warn';
  return 'wait';
}

export function Panel({ as: Tag = 'div', variant, className = '', children, ...rest }) {
  const v = variant ? `rv-panel--${variant}` : '';
  return (
    <Tag className={`rv-panel ${v} ${className}`} {...rest}>
      {children}
    </Tag>
  );
}

export function Kicker({ children, className = '' }) {
  return <span className={`rv-kicker ${className}`}>{children}</span>;
}

export function StatusTag({ status, label, tone, className = '' }) {
  const t = tone || toneFor(status);
  return (
    <span className={`rv-tag ${className}`} data-tone={t}>
      <span className="rv-tag__dot" aria-hidden="true" />
      {label || humanize(status)}
    </span>
  );
}

export function Money({ amount, currency = 'USD', brass = false, compact = false, className = '' }) {
  const n = Number(amount) || 0;
  const formatted = new Intl.NumberFormat('en-US', {
    notation: compact ? 'compact' : 'standard',
    maximumFractionDigits: compact && Math.abs(n) >= 1000 ? 1 : 0,
  }).format(n);
  return (
    <span className={`rv-money ${brass ? 'rv-money--brass' : ''} ${className}`}>
      <span className="rv-money__ccy">{currency}</span>
      {formatted}
    </span>
  );
}

/**
 * A number that counts up when it scrolls into view. Content is visible by
 * default: the final value renders immediately and is the fallback if motion
 * never runs (reduced-motion or no JS). It only animates as an enhancement.
 */
export function Metric({ value = 0, format, duration = 1.05, className = '' }) {
  const fmt = format || ((n) => Math.round(n).toLocaleString());
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-8% 0px' });
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (reduced || !inView) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
  }, [inView, value, duration, reduced]);

  return (
    <span ref={ref} className={className}>
      {fmt(display)}
    </span>
  );
}

export function Field({ label, id, className = '', ...rest }) {
  return (
    <label className={`rv-field-wrap ${className}`} htmlFor={id}>
      {label && <span className="rv-field-label">{label}</span>}
      <input id={id} className="rv-field" {...rest} />
    </label>
  );
}

export function ArrowUpRight({ className = '', size = 15 }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 11L11 5M11 5H6M11 5V10"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Button({
  children,
  variant = 'default',
  size,
  to,
  href,
  arrow = false,
  className = '',
  ...rest
}) {
  const cls = [
    'rv-btn',
    variant !== 'default' ? `rv-btn--${variant}` : '',
    size === 'sm' ? 'rv-btn--sm' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');
  const inner = (
    <>
      {children}
      {arrow && <ArrowUpRight className="rv-btn__arrow" />}
    </>
  );
  if (to) return <Link to={to} className={cls} {...rest}>{inner}</Link>;
  if (href) return <a href={href} className={cls} {...rest}>{inner}</a>;
  return <button className={cls} {...rest}>{inner}</button>;
}

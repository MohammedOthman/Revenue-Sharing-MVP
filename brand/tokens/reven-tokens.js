/**
 * Reven Brand System — design tokens (ESM)
 * Source of truth: brand/source/Reven_Brand_Guidelines.pdf (v1.0, July 2026)
 * Full spec: brand/BRAND_GUIDELINES.md · Canonical data: design-tokens.json
 *
 * Rule: Blue is the only saturated hue in the system.
 *       Everything else is navy, cream, or gray.
 *
 * Usage (React + Vite): import { color, font } from '../../brand/tokens/reven-tokens.js';
 */

export const color = {
  // Primary
  ink: '#0F1629',          // Primary text & logo
  canvas: '#FBFAF7',       // Default bg, never pure white
  cardWhite: '#FFFFFF',    // Elevated surfaces on canvas
  accentBlue: '#2C5BFF',   // The only saturated hue — signal
  accentDeep: '#1E47E0',   // Gradient partner for Accent Blue
  accentPale: '#8DA4FF',   // Headline highlights on dark panels
  accentPaleAlt: '#AEC5FF',
  // Muted / supporting
  body: '#5B6172',         // Body copy
  caption: '#6B7180',      // Captions
  tertiary: '#8A8F9C',     // Tertiary / mono labels
  micro: '#9AA3B5',        // Micro-labels
  // Status — use sparingly, never as a primary color
  caution: '#C98A1B',      // Caution / measure
  alert: '#C0392B',        // Alert / dispute
  positive: '#1F8A5B',     // Positive / live
};

export const background = {
  flat: '#FBFAF7',                                          // ~80% of surfaces
  wash: 'radial-gradient(circle at 50% 40%, #F0EAFF, #FBFAF7)', // ~15%
  navy: '#0F1629',                                          // ~5%
  navyGradient: 'linear-gradient(180deg, #1F1740, #0F1629)',
};

export const font = {
  display: { family: '"Sora", system-ui, sans-serif', weights: [700, 800], tracking: '-0.03em' },
  body: { family: '"Manrope", system-ui, sans-serif', weights: [400, 500, 600, 700], tracking: '0' },
  label: { family: '"IBM Plex Mono", ui-monospace, monospace', weights: [400, 500, 600], tracking: '0.16em', transform: 'uppercase' },
};

export const layout = {
  marginTop: '84px',     // range 78–84px
  marginBottom: '108px', // range 104–112px
  marginSide: '104px',
  footerInset: '46px',
  split: { primary: '55–60%', supporting: '40–45%' },
};

export const radius = { card: '16px', panel: '20px', pill: '999px', chip: '8px' };

export const motif = { stroke: '1.2px', opacity: 0.35, color: '#2C5BFF' };

export default { color, background, font, layout, radius, motif };

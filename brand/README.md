# Reven Brand System — Source of Truth

This directory is the **single source of truth for the Reven brand & design
system** — the visual and verbal system for the Partner Revenue OS product,
across the pitch deck, product UI, and any surface the brand appears on.

> **The one rule:** *If it isn't in this document, it isn't on-brand yet —
> extend the system here first, then use it everywhere.* (Guidelines §13)

## What's here

| Path | What it is |
|---|---|
| [`source/Reven_Brand_Guidelines.pdf`](source/Reven_Brand_Guidelines.pdf) | **The visual master** — the original brand guidelines (v1.0, July 2026, 15 slides / 13 sections). |
| [`BRAND_GUIDELINES.md`](BRAND_GUIDELINES.md) | **The text of record** — a complete, verbatim transcription of the PDF. Searchable, greppable, diff-able. |
| [`tokens/design-tokens.json`](tokens/design-tokens.json) | Canonical machine-readable tokens (color, type, layout, motif). |
| [`tokens/reven-tokens.css`](tokens/reven-tokens.css) | CSS custom properties (`:root { --reven-* }`) — drop into any stylesheet. |
| [`tokens/reven-tokens.js`](tokens/reven-tokens.js) | ESM export for React / Vite (`import { color, font } from ...`). |
| [`assets/logo/`](assets/logo/) | Wordmark renders — ink-on-light and reversed-on-navy. |
| [`assets/pages/`](assets/pages/) | Full render of every guideline page, named by section. |

## The system in one screen

- **Voice:** confident, declarative, literal, no hedging. One accent clause per headline.
- **Logo:** one wordmark, one two-tone Accent Blue chip, a blue period. No variations.
- **Color:** one saturated hue (`#2C5BFF` Accent Blue). Everything else is Ink navy (`#0F1629`), Canvas cream (`#FBFAF7`), or gray.
- **Type:** three typefaces, three jobs, never mixed — **Sora** (display), **Manrope** (body), **IBM Plex Mono** (labels).
- **Surfaces:** exactly three — Flat Canvas (~80%), Radial Wash (~15%), Deep Navy (~5%).
- **Layout:** 104px side margins, asymmetric body split, eyebrow-then-headline, identical footer every slide.
- **Motif:** a quiet node-and-flow constellation, Accent Blue only, on dark surfaces only.

See [`BRAND_GUIDELINES.md`](BRAND_GUIDELINES.md) for the full, exact spec.

## How to use the tokens

**Plain CSS** (this repo's frontend, `revenue-share-platform/frontend`):

```css
@import "../../brand/tokens/reven-tokens.css";

.headline      { font-family: var(--reven-font-display); color: var(--reven-ink); }
.headline .cta { color: var(--reven-accent-blue); }        /* the one accent clause */
.eyebrow       { font-family: var(--reven-font-label); letter-spacing: var(--reven-label-tracking);
                 text-transform: var(--reven-label-transform); color: var(--reven-tertiary); }
body           { background: var(--reven-canvas); color: var(--reven-body); }
```

**React / Vite:**

```js
import { color, font } from "../../brand/tokens/reven-tokens.js";
const style = { color: color.ink, fontFamily: font.display.family };
```

**Any tooling:** consume [`tokens/design-tokens.json`](tokens/design-tokens.json).

## Governance

1. The **PDF is the visual master**; `BRAND_GUIDELINES.md` is the authoritative text; the token files are generated to match — keep all three in sync.
2. To change or add anything (a color, a component, a rule), **update the guidelines here first**, then propagate to the tokens, then to product code.
3. Version and date live in the PDF cover and `design-tokens.json → meta`. Bump them on any change.

---

*Reven Brand System · v1.0 · July 2026 · Internal use.*

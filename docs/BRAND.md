# Reven — Brand (source of truth)

This document certifies the **Reven** logo and brand colors as the canonical
truth for this repository. Any interface, document, or asset that carries the
brand must conform to what is defined here.

## The logo

Reven is a **wordmark**: the word `Reven` set as a bold, geometric, monolinear
letterform in **deep navy**, with **two electric-blue square accents** — one at
the upper-left of the **R**, one at the lower-right foot of the **n**. The two
squares sit on a diagonal and are the brand's signature; they are never removed,
recolored, or repositioned.

### Canonical files

| File | Use |
|---|---|
| [`brand/reven-logo.svg`](../brand/reven-logo.svg) | Primary — navy wordmark for light backgrounds |
| [`brand/reven-logo-light.svg`](../brand/reven-logo-light.svg) | Reversed — light wordmark for dark backgrounds |
| [`app/src/components/reven/chrome.tsx`](../app/src/components/reven/chrome.tsx) | In-app chrome (wordmark + desks). |

> **Provenance note.** These vectors are a **faithful reproduction** of the
> supplied logo artwork. The original raster the founder shared was not
> accessible to the build environment, so the mark was rebuilt as scalable SVG.
> **If you have the original vector (SVG/AI/PDF), commit it over these files** —
> it becomes the definitive asset and this note can be removed.

## Colors

| Token | Hex | Role |
|---|---|---|
| Navy (ink) | `#0C1B3C` | The wordmark on light; deep-navy surfaces derive from it |
| Page base | `#0A1122` | App background (deep navy) |
| Electric blue | `#2A5BF5` | The brand accent — the logo squares, primary actions, active states |
| Off-white | `#EAEEF7` | The wordmark on dark; primary text |
| Brass | `#CBA254` | **Reserved for monetary values only** — a warm counterpoint, never a second brand color |

The in-app working palette lives in [`app/src/styles.css`](../app/src/styles.css) (paper ground, ink, forest accent). That chrome is the live product. The navy / electric-blue tokens above remain the **wordmark** system in `brand/`.

## Usage

- **Do**: give the logo generous clear space (≥ the height of one accent square
  on every side); render it navy on light and off-white on dark; keep the two
  blue squares.
- **Don't**: place the mark inside a filled tile/box; add a drop shadow or glow;
  stretch, rotate, or recolor the letterforms; drop or move the accent squares;
  set "Reven" in a substitute typeface and call it the logo.

## Typography (product, not the logo)

The logo is a fixed wordmark. Elsewhere the product uses a native serif for
display, a neutral system sans for UI, and a monospace **only** for real data
(amounts, IDs, timestamps). See `tokens.css`.

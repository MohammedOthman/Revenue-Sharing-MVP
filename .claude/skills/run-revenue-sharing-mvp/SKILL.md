---
name: run-revenue-sharing-mvp
description: Build, run, serve, and screenshot the Partner Revenue OS UI prototype (the Stitch HTML mockups under prototype/). Use when asked to run, start, preview, serve, screenshot, or drive the Revenue-Sharing-MVP UI / the prototype / the screens.
---

The "app" is a **static UI prototype**: ~46 standalone Stitch-generated HTML
screens of Partner Revenue OS (the MVP→V3 journey) under `prototype/screens/`.
They depend on the Tailwind Play CDN, Google Fonts, Material Symbols, and remote
avatar images — **all blocked in sandboxed/offline environments**, so the raw
screens render unstyled. `prototype/build.mjs` compiles them into a fully
self-contained `prototype/dist/`, and `prototype/driver.mjs` serves that and
screenshots it in a bundled headless Chromium. **Drive it via
`prototype/driver.mjs`** — that's the agent path.

All paths below are relative to the repo root. The harness lives in `prototype/`.

## Prerequisites

Node 18+ (verified on v22) and npm. **No system packages, no `apt-get`, and no
Playwright/Chrome download are required** — the headless browser ships inside an
npm dependency (see Gotchas). npm registry access is needed for the one-time
install.

## Setup

```bash
cd prototype
npm install        # installs Tailwind + plugins, the vendored fonts, and bundled Chromium; writes package-lock.json
```

## Build

Compiles `screens/` → `dist/` (per-page Tailwind CSS, vendored fonts/icons,
generated `index.html`). For each `<img>` it wires in the real image recovered
from `recovered/` when present (see below), else a local placeholder. Idempotent
— wipes and rebuilds `dist/` each run; never touches `screens/`.

```bash
cd prototype
node build.mjs     # -> "Built 46 interactive screens + 5 design-only frames -> dist/"
```

### Recovered images (avatars / logos / map)

The screens reference avatars, logos, and a world map from
`lh3.googleusercontent.com`, which is blocked offline — and the image bytes are
**not** in the export except baked into each `screen.png` page render.
`recover-images.mjs` crops those `<img>` regions straight out of `screen.png`
(it reproduces Stitch's 1600-wide render, so each element's box maps to
screenshot pixels) and keeps the ones that come back as a real image. The
results live in `recovered/<screen>/<imgIndex>.png` and are **committed**, so a
normal `node build.mjs` already includes them — you don't need to re-run this.

Re-run only if `screens/` changes (needs a `dist/` first, for layout):

```bash
cd prototype
node build.mjs && node recover-images.mjs && node build.mjs
# -> "Recovered 22 real images, dropped 6 blank/misaligned -> recovered/"
```

22 of 28 image slots recover cleanly. The other 6 sit on screens the export
down-scaled (`partner_profit_loss_*`, `partner_roi_analysis`,
`partner_performance_scorecard`, and a 2nd/3rd avatar on two workspaces); their
crops come back blank, so they fall back to the placeholder. The only way to get
those 6 at full fidelity is the original source (unblock the host or supply the
files) — they cannot be recovered from the screenshots.

## Run (agent path)

`driver.mjs` starts its own static server for `dist/` (ephemeral port), launches
the bundled Chromium, screenshots each target, and reports console errors. It
**exits non-zero if any page fails to load or logs a console error**, so it
doubles as a smoke test. Run `build.mjs` first.

```bash
cd prototype
node driver.mjs                                      # default representative set (index + 4 screens)
node driver.mjs index partner_revenue_command_center # specific targets: "index" or any screens/<dir> name
```

Screenshots land in `prototype/shots/<name>.png` (1440×1000). Expected output:

```
✓ index                          HTTP 200  errors=0  -> shots/index.png
✓ partner_revenue_command_center HTTP 200  errors=0  -> shots/partner_revenue_command_center.png
...
5/5 screens rendered cleanly. Screenshots in shots/
```

**Look at a screenshot** to confirm a real render (e.g. read
`prototype/shots/partner_revenue_command_center.png`) — a styled dashboard with
sidebar, KPI cards, bar chart, and colored status badges. A blank/unstyled frame
means the build was skipped.

## Run (human path)

Any static server over `dist/` works; there is no app server.

```bash
cd prototype/dist && python3 -m http.server 8000   # then open http://localhost:8000 ; Ctrl-C to stop
```

`index.html` is the navigable hub (screens grouped by journey phase). Useless
headless — it's for a human with a browser.

## Gotchas

- **The raw screens don't render — that's expected.** Opening
  `screens/<dir>/code.html` directly (or serving `screens/`) gives an unstyled
  page with icon *names* shown as text: the Tailwind Play CDN, Google Fonts, and
  Material Symbols it references are all blocked offline. You must serve `dist/`
  (post-`build.mjs`), never `screens/`.
- **The headless browser comes from npm, not a CDN.** Playwright/Chrome-for-Testing
  download hosts are blocked, and there's no system Chrome. `driver.mjs` uses
  `@sparticuz/chromium`, which ships the Chromium binary *inside the npm tarball*
  (decompressed to /tmp on first `executablePath()` call). That's why no
  `playwright install` / `apt-get` step exists.
- **Each screen has its own inline `tailwind.config`** (MD3 design tokens, plus
  custom `borderRadius`/`spacing`/`fontFamily`). `build.mjs` compiles CSS
  **per page** from that page's own config — not one global stylesheet — so the
  tokens stay exact. Don't try to merge them into one config.
- **Pages carry inline `<style>` blocks (icon FILL axis, etc.).** `build.mjs`
  only strips three head tags (the CDN `<script>`, the `tailwind-config`
  `<script>`, and the Google-Fonts `<link>`s) and rewrites each
  `lh3.googleusercontent` image URL → its `recovered/` crop (or the placeholder).
  Everything else is left intact.
- **Real images are recovered from `screen.png`, not fetched.** Their host is
  blocked and the bytes aren't in the export otherwise. `recover-images.mjs`
  crops them out of the page renders; alignment relies on the screenshots being
  Stitch's 1600-wide render (see that file's header). Don't repoint the `<img>`s
  at the remote URLs — they 403 offline.
- **`screens/` and `recovered/` are committed source; `dist/` and `shots/` are
  generated** (git-ignored). Edit screens or `build.mjs`, never `dist/`.
- **Cross-screen links don't work.** The `global_navigation_journey_refinement`
  screen still has unresolved Stitch `{{DATA:SCREEN:SCREEN_NN}}` placeholders.
  Navigate via the generated `index.html` instead.

## Troubleshooting

- **`No dist/ — run \`node build.mjs\` first.`** — `driver.mjs` was run before a
  build. Run `node build.mjs`, then `node driver.mjs`.
- **Driver exits 1 with `errors=N` on a page** — that page logged console
  errors; open `prototype/shots/<name>.png` and the listed messages to see what
  broke (usually a newly added external resource that the offline policy blocks —
  vendor it in `build.mjs` like the fonts).

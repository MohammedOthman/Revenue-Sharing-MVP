# CLAUDE.md — Revenue-Sharing-MVP

Project context + handoff so any future session can continue without rediscovery.

## What this repo is
- **Strategy / operating docs** (root `*.md` + `*.pdf`): `Partner_Revenue_OS_PDR.md`,
  `GTM_Operating_Manual.md`, the onboarding/cadence/CFO manuals, market-analysis
  PDFs, and `Pre_Seed_12M_Burn_Runway_CashFlow_PROMPT.md`.
- **`prototype/`** — the **Partner Revenue OS UI prototype**: ~46 Stitch-generated
  HTML screens (the MVP→V3 product journey) made to **run fully offline**, with a
  navigable index, recovered images, and clickable cross-screen navigation.

## Active branch & PR
- Branch: **`claude/tender-ptolemy-2PsAM`** → **PR #3**
  (https://github.com/MohammedOthman/Revenue-Sharing-MVP/pull/3).
- Develop here; commit + push to this branch. **Do not open a new PR** — #3 already
  tracks it. Push updates it.

## Run / build the prototype
```bash
cd prototype && npm install && node build.mjs && node driver.mjs
```
- `build.mjs` compiles `screens/` → `dist/`. `driver.mjs` serves `dist/` and
  screenshots it in a headless browser (→ `prototype/shots/`).
- Full, verified instructions: **`.claude/skills/run-revenue-sharing-mvp/SKILL.md`**
  (slash command `/run-revenue-sharing-mvp`).

## Key facts about this environment (so you don't rediscover them)
- The network policy **blocks**: Tailwind Play CDN, Google Fonts, Material Symbols,
  `lh3.googleusercontent.com` (the screens' avatar/logo host), and the
  Playwright/Chrome-for-Testing download CDNs. **npm and PyPI are reachable.**
- That's why: Tailwind is compiled **per-page** from each screen's inline config
  (don't merge configs); fonts/icons are vendored from npm; the headless browser is
  **`@sparticuz/chromium`** (binary ships inside the npm tarball — no `playwright install`).
- Container is **ephemeral**: `dist/`, `shots/`, `node_modules/` are generated and
  git-ignored. `screens/` and `recovered/` are committed source. Commit anything worth keeping.

## How images work (avatars / logos / world map)
- The screens reference images from the blocked `lh3` host; the bytes aren't in the
  export except **baked into each `screen.png` page render**.
- **`recover-images.mjs`** crops those `<img>` regions out of `screen.png` (it
  reproduces Stitch's 1600-wide layout so boxes map to screenshot pixels) and keeps
  the ones that come back real. Output: **`recovered/<screen>/<imgIndex>.png`** (committed);
  `build.mjs` wires them in, else a placeholder.

## Navigation
- Screens shipped with dead links (`href="#"`, unresolved `{{DATA:SCREEN:SCREEN_NN}}`).
- `build.mjs` rewrites sidebar nav items to canonical screens via the **`NAV` map**
  (Dashboard/Partners/Claims/Approvals/Settings/Documentation/Statements/Support) and
  injects a bottom-left **"Overview"** button back to `index.html`. To re-point a
  section, edit `NAV` in `build.mjs`.
- **Deep-links** (the `DEEPLINKS` map in `build.mjs` + `deeplink.js`) wire primary
  buttons / "View All" / table rows on 7 key screens to follow the journey (e.g.
  claim row → Attribution Workspace, Accept Attribution → Settlement, registry row →
  Partner Profile). Matched by exact control text / DOM order. Edit `DEEPLINKS` to extend.

## Status
**Done**
- ✅ 46 screens run offline, fully styled, 0 console errors; navigable `index.html` hub.
- ✅ 22 of 28 image slots recovered from the screenshots and wired in (all avatars,
  3 logos, the world map).
- ✅ Clickable navigation (sidebar links + Overview button), click-through verified.
- ✅ Journey deep-links on 7 key screens (buttons / View All / rows), 14/14 click-throughs verified.
- ✅ `/run-revenue-sharing-mvp` skill, verified end-to-end.

**Open / next steps**
- ⏳ **6 images can't be recovered** — screens the export down-scaled
  (`partner_profit_loss_analysis`, `partner_profit_loss_with_rationales`,
  `partner_roi_analysis`, `partner_performance_scorecard`, plus a 2nd/3rd avatar on
  the dispute & resolution workspaces). They use placeholders. To reach true 100%:
  unblock `lh3.googleusercontent.com` in the env network policy (then fetch + verify),
  or add the source image files and re-run `node build.mjs`.
- ◻ Optional: extend deep-links to more screens (7 key screens done; add the
  remaining workspaces/list rows by editing `DEEPLINKS` in `build.mjs`).
- ◻ Optional: land/merge PR #3 (can subscribe to its CI/review events and autofix).
- ◻ Larger: turn the static mockups into a real application (interactivity, state, data/backend).

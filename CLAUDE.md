# CLAUDE.md — Revenue-Sharing-MVP

Project context + handoff so any future session can continue without rediscovery.

## What this repo is
- **Strategy / operating docs** (root `*.md` + `*.pdf`): `Partner_Revenue_OS_PDR.md`,
  `GTM_Operating_Manual.md`, the onboarding/cadence/CFO manuals, market-analysis
  PDFs, and `Pre_Seed_12M_Burn_Runway_CashFlow_PROMPT.md`.
- **`prototype/`** — an early **offline design exploration** (Stitch-generated HTML
  mockups). Kept only as a historical artifact. **It is not the product UI/UX** —
  see "Live product UI/UX" below.

## Live product UI/UX — source of truth
- The live product's UI/UX is the **Replit App "Enterprise Architect"** — the
  technical UI/UX translation of all the strategy/operating work into a running
  product. **This is the single source of truth for current UI/UX.**
  - replId: `c36682f1-b8e3-4186-a46e-3044775b798f`
  - URL: https://replit.com/@mohammedmukred1/Enterprise-Architect
- Build, inspect, and iterate the live product **on Replit** via the Replit MCP
  tools: `resolve_app_by_name` / `list_apps` to get the replId, then
  `ask_question` (inspect / debug) or `update_app_using_prompt` (change it).
  Describe changes in natural language — Replit Agent writes and deploys the code.
- The static prototype screens do **not** define the product; do not treat them as
  the spec for the live UI/UX.

## Active branch & PR
- Branch: **`claude/tender-ptolemy-2PsAM`** → **PR #3**
  (https://github.com/MohammedOthman/Revenue-Sharing-MVP/pull/3).
- Develop here; commit + push to this branch. **Do not open a new PR** — #3 already
  tracks it. Push updates it.

## Prototype (historical, offline) — optional
- Only relevant if you need to view the old mockups. Run:
  ```bash
  cd prototype && npm install && node build.mjs && node driver.mjs
  ```
  `build.mjs` compiles `screens/` → `dist/`; `driver.mjs` serves `dist/` and
  screenshots it in a headless browser (→ `prototype/shots/`). Skill:
  `/run-revenue-sharing-mvp`.
- Environment gotchas: the network policy blocks Tailwind Play CDN, Google Fonts,
  Material Symbols, `lh3.googleusercontent.com`, and the Playwright/Chrome-for-Testing
  CDNs; **npm and PyPI are reachable.** So Tailwind is compiled per-page, fonts/icons
  are vendored from npm, and the headless browser is `@sparticuz/chromium`. The
  container is ephemeral — `dist/`, `shots/`, `node_modules/` are generated and
  git-ignored; `screens/` and `recovered/` are committed source.

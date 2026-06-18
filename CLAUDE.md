# CLAUDE.md — Revenue-Sharing-MVP

Project context + handoff so any future session can continue without rediscovery.

## What this repo is
- **Strategy / operating docs only** (root `*.md` + `*.pdf`): `Partner_Revenue_OS_PDR.md`,
  `GTM_Operating_Manual.md`, the onboarding/cadence/CFO manuals, market-analysis
  PDFs, `Pre_Seed_12M_Burn_Runway_CashFlow_PROMPT.md`, etc. (`README.md` has the
  full repository guide.)
- This repo carries **no product/technical code.** The product's technical source
  of truth lives on Replit — see below.

## Live product (technical source of truth) — Replit
- The live product is the **Replit App "Enterprise Architect"** — the technical
  UI/UX translation of all the strategy/operating work into a running product.
  **This is the single source of truth for the product.** The repo holds strategy
  only.
  - replId: `c36682f1-b8e3-4186-a46e-3044775b798f`
  - URL: https://replit.com/@mohammedmukred1/Enterprise-Architect
- Build, inspect, and iterate the live product **on Replit** via the Replit MCP
  tools: `resolve_app_by_name` / `list_apps` to get the replId, then
  `ask_question` (inspect / debug) or `update_app_using_prompt` (change it).
  Describe changes in natural language — Replit Agent writes and deploys the code.
- **Any technical artifact that is not the Replit app does not belong in this repo.**
  The earlier `prototype/` HTML mockups and the `revenue-share-platform/` Express +
  React scaffold were removed for this reason — neither came from Replit.

## Active branch & PR
- Branch: **`claude/tender-ptolemy-2PsAM`** → **PR #3**
  (https://github.com/MohammedOthman/Revenue-Sharing-MVP/pull/3).
- Develop here; commit + push to this branch. **Do not open a new PR** — #3 already
  tracks it. Push updates it.

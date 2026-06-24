# CLAUDE.md — Reven

Project context + handoff so any future session can continue without rediscovery.

## What this repo is
- **Strategy / operating docs** (root `*.md` + `*.pdf`) — the bulk of the repo. The
  canonical strategy & phasing dossiers, product requirements
  (`Partner_Revenue_OS_PDR.md`), pricing & commercial strategy, the
  GTM / onboarding / cadence / CFO operating manuals, market-analysis PDFs, the
  pre-seed finance model (`Pre_Seed_2M_SAR_Financial_Model_Blueprint.md`,
  `Pre_Seed_12M_Burn_Runway_CashFlow_PROMPT.md`), and the investor pitch deck.
  **`README.md` is the authoritative repository guide** — start there.
- **`revenue-share-platform/`** — a full-stack B2B revenue-share application:
  **Node.js + Express + PostgreSQL** backend and **React + Vite** frontend, with
  partner, contract, revenue, KPI, and legal-document modules plus JWT auth.

## Governing phase model
- Capture (PRM) → Settle (revenue system-of-record) → Orchestrate (partnership
  network). This sequencing governs every document. Source of truth:
  `Reverse_Engineered_Strategy_PRM_to_Revenue_Sharing_to_Orchestration.md`;
  doc-by-doc concordance in `ROADMAP_ALIGNMENT_AUDIT.md` §2.

## Conventions
- Pre-seed finance docs use the `Pre_Seed_*` filename prefix.
- Generated / dependency directories (`node_modules/`, build output) are
  git-ignored; commit anything worth keeping.

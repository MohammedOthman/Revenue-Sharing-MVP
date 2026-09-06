# Repository File Taxonomy — Revenue-Sharing-MVP

**Date:** 2026-07-28 · **Scope:** every file in the repository, plus every file that existed and was
deleted, from the first commit (2026-04-16) to `e3211bb` (2026-07-26). 87 commits, 109 tracked files.

**What this document is for.** The repo has grown to ~272,000 words of prose, 156 pages of PDF, and a
working application, accumulated across six distinct working eras by different authors with different
assumptions. Roughly a third of the prose is superseded, orphaned, or duplicative — not wrong, just no
longer load-bearing. This file classifies every artifact so a reader (founder, new hire, investor,
diligence lawyer) knows in one lookup: *what is this, does it still bind, and should I read it.*

This is a **map, not a cleanup**. Nothing is deleted or edited by this document.

---

## 1. The repo in numbers

| Measure | Value |
| --- | ---: |
| Tracked files | 109 |
| Root markdown documents | 30 |
| Total words of markdown | ~271,900 |
| — of which `Reven_1000_Strategic_Implications.md` | 88,747 (**33%**) |
| PDFs | 5 (156 pages, 7.0 MB) |
| Application source | 4,817 LOC frontend + 1,560 LOC dead backend |
| Working tree (excl. `.git`) | 9.4 MB |
| `.git` | 21 MB — inflated by the 163-file screenshot prototype deleted on 2026-06-19 |
| Files ever added then deleted | 168 |

**Composition by weight:** documents are ~95% of the repo by content; the application is ~5%. This is a
strategy repository that contains an app, not an application repository that contains docs. Any tooling,
CI, or reviewer that treats it as a code repo will mis-read it.

---

## 2. The six eras (why the repo has this shape)

Understanding the eras is what separates "duplicate" from "successor." Almost every apparent
contradiction in the repo is two eras talking past each other.

| Era | Dates | What happened | What it left behind |
| --- | --- | --- | --- |
| **0 · Scaffold** | 16 Apr 2026 | Repo initialized; a bot (`qwen.ai[bot]`) generated a generic Express + PostgreSQL + React revenue-share CRUD app | `revenue-share-platform/backend/` (now dead), the original `.gitignore` |
| **1 · The document dump** | 23–29 May | Founder bulk-uploads finished work via GitHub web UI — seven "Add files via upload" commits. The operating manuals, the first PDR, the market-analysis PDFs, the 60-page workflow PDF | 5 manuals, 2 PDRs' worth of product definition, all 5 PDFs |
| **2 · Prompt + prototype** | 28 May – 1 Jun | Pre-seed finance prompt engineered over 9 commits; a 55-screen offline HTML prototype built, then rebuilt against the 22-phase workflow PDF; Integration manual written | `Pre_Seed_12M_*` docs, Integration manual; prototype deleted 19 Jun |
| **3 · The research era** | 6–19 Jun | The bulk of today's prose. Strategy canon, the pricing corpus, venture narrative, the roadmap alignment audit and its corpus-wide fixes, 150 levers, the pitch deck, the pre-seed blueprint | 12 documents, the phase model, `ROADMAP_ALIGNMENT_AUDIT.md` |
| **4 · The self-audit era** | 22–23 Jun | The company audits itself: product/architecture audit (code graded D), PERM category thesis, 100 → 1,000 implications, a 2-quarter execution plan | 5 documents, 95,000 words, one uncomfortable verdict |
| **5 · The rebuild** | 15–26 Jul | Saudi riyal map rebuilt from zero; the app rebuilt on **Base44**; brand certified; Netlify deploy wired | `Saudi_Riyal_Map…`, `BRAND.md`, `brand/`, `netlify.toml`, today's `frontend/` |

**The naming fault line.** Documents written before ~11 Jun use the `Partner_Revenue_OS_*` prefix
(internal/technical name); documents after use `Reven_*` (commercial brand). The filename tells you which
side of the rebrand a document was written on — and therefore which vocabulary it uses internally.

---

## 3. The classification system

Every file gets one **class** (what kind of artifact it is) and one **status** (whether it still binds).

### Classes

| Class | Meaning |
| --- | --- |
| **A · Canon** | Governing. Other documents are required to conform to it. |
| **B · Product definition** | What the product is and does. |
| **C · Strategy & positioning** | Why this product, entered this way, in this order. |
| **D · Market & sizing** | How big, where the money is, who buys. |
| **E · Pricing & commercial** | What to charge and when. |
| **F · Operating manuals** | How the company runs day to day. |
| **G · Investor & finance** | Raise-facing artifacts and the money model. |
| **H · Self-audit & execution** | The repo grading itself and deciding what to do. |
| **I · Application** | Shipped code. |
| **J · Brand & deploy** | Visual identity and hosting. |
| **K · Repo meta & tooling** | Navigation, handoff, prompts, input sheets. |
| **X · History only** | Deleted; reachable only through git. |

### Status labels

| Status | Meaning | Action implied |
| --- | --- | --- |
| **CANON** | Binding. Conflicts resolve in its favour. | Maintain deliberately |
| **ACTIVE** | Current and in use, but not binding | Keep |
| **REFERENCE** | Read-once evidence base. Never needs updating; cite and move on | Freeze |
| **SUPERSEDED** | A later document replaced it — self-declared or in fact | Mark at the top, keep for provenance |
| **STALE** | Was accurate, no longer is | Edit or retire |
| **ORPHANED** | Tooling or input that nothing downstream consumes | Fill it or drop it |
| **DEAD** | In the tree, runs nothing | Delete or fence off |
| **HISTORY** | Deleted | Nothing |

---

## 4. Class A — Canon (governing)

The four documents that other documents are required to obey. **This is the set that must never
disagree with itself.**

| File | What it is | Status | Note |
| --- | --- | --- | --- |
| `README.md` | 373 words. Declares the Capture → Settle → Orchestrate phase model, the finance boundary, the positioning rule, and the repository guide | **CANON / STALE** | Untouched since 19 Jun. Its repo guide omits **14 of 30** root documents plus the app, the brand, and the deploy config |
| `ROADMAP_ALIGNMENT_AUDIT.md` | The 2026-06-12 audit of 16 documents against the founder's four mandates; contains the canonical phase table, the phase-naming concordance (5 schemes), and the F-1…F-7 fix checklist (all marked applied) | **CANON / partially STALE** | Its scope statement — "all 16 markdown strategy documents" — was true on 12 Jun. **Nine documents have been added since and were never audited.** Only 8 of 30 root `.md` files carry the phase-discipline header this audit mandated |
| `Reverse_Engineered_Strategy_PRM_to_Revenue_Sharing_to_Orchestration.md` | 370 lines. The strategy report that produced the phase model. Named "source of truth" by both README and the audit | **CANON — contested** | The Master Dossier declares that it *supersedes* this file. See §16.1 |
| `BRAND.md` | Certifies the Reven wordmark, the five-colour palette, and usage rules as brand truth | **CANON** | Carries an honest provenance note: the SVGs are a faithful rebuild, not the founder's original vector |

---

## 5. Class B — Product definition

**Three artifacts define the product, in two formats, with no declared precedence.** This is the single
most consequential ambiguity in the repo — an engineer or an agent asked to "build to spec" has three
specs to choose from.

| File | What it is | Status | Note |
| --- | --- | --- | --- |
| `partner-revenue-os-PDR-v5.md` | 433 lines / 7,330 words. The tight PDR: exec summary, 23 sections, 10 ADRs, glossary, release plan. Self-declares "supersedes PDR v4.1" | **ACTIVE — de facto binding** | `Reven_Pricing_Architecture_Deep_Research.md` calls it "the binding product source of truth." **README does not say this.** Note it is the only kebab-case filename in the repo |
| `Partner_Revenue_OS_PDR.md` | 2,867 lines / 10,228 words. The long-form PDR: full domain object model, 22-phase feature catalogue, integration architecture, workflows, NFRs, roadmap | **ACTIVE — overlapping** | Not marked superseded, not marked binding. Four times the length of v5 and materially more detailed in places (§9 domain model, §12 integrations) |
| `Partner_Revenue_OS_End_to_End_Business_Workflow.pdf` | 60 pages, WeasyPrint. The 22-phase business workflow manual: per phase — purpose, trigger, actors, capabilities, backend process, data fields, controls, integrations, KPIs | **ACTIVE — unreconciled, unforkable** | Product requirements locked in a non-editable format. It drove a full prototype rebuild in Era 2 ("Redo product to match End-to-End Business Workflow (22 phases)") yet is not referenced by either PDR's roadmap |

---

## 6. Class C — Strategy & positioning

A three-layer stack where the top layer explicitly consolidates the two beneath it — and all three
remain in the repo, all three cited.

| File | What it is | Status | Note |
| --- | --- | --- | --- |
| `Partner_Revenue_OS_Master_Strategy_Dossier.md` | 368 lines. Parts 0–XIV + appendices. Header: *"consolidates and supersedes"* the two files below | **ACTIVE — claims supersession** | The most complete single strategy read in the repo |
| `Reverse_Engineered_Strategy_PRM_to_…_Orchestration.md` | (also Class A) The original verified strategy report | **CANON — contested** | Both README §"Canonical" and the audit §2 point here as source of truth |
| `Reverse_Engineered_Strategy_Deep_Dive_Companion.md` | 269 lines. Eight verified deep-research tracks (~110 searches) behind the main report | **REFERENCE / SUPERSEDED** | Its findings are folded into the Dossier. Value now is the evidence trail, not the conclusions |
| `Partnership_Orchestration_150_Levers_and_Layers.md` | 326 lines. 12 layers × ~150 levers for managing partnerships internally and orchestrating them externally, each tagged `[ext]`/`[repo]` and confidence-graded | **REFERENCE** | A lever library, not a decision. Useful as a checklist against the roadmap; nothing depends on it |

**Shared evidence discipline.** All four carry the same explicit standard: automated page-fetching was
HTTP 403-blocked on essentially every primary domain, so every figure is corroborated across ≥2
independent search results or **dropped**, with load-bearing claims carrying a primary URL for a human to
certify. This is unusually honest for a startup corpus and is worth preserving verbatim — it is the
reason these documents survive diligence.

---

## 7. Class D — Market & sizing

| File | What it is | Status | Note |
| --- | --- | --- | --- |
| `Saudi_Riyal_Map_Market_Sizing_and_Value_Capture.md` | 291 lines, 15 Jul. Rebuilt from zero with an explicit independence rule (no figure inherited from any prior repo doc). Sizes the commission pool at SAR 35–60B/yr on a SAR 500–850B flow base; TAM/SAM/SOM; 12 evidenced intermediary flows; ICP ranking derived from the map | **ACTIVE — current sizing** | Self-declares that it supersedes the market-sizing content of the file below, and reconciles the two in its §8 |
| `Saudi_Value_Pool_and_ICP_Strategic_Analysis.md` | 342 lines, 6 Jun. The three-layer value-pool lens (economic / capturable software / adjacent flow), fills the GTM manual's blank Stage-1 and Stage-2 matrices | **SUPERSEDED (sizing) / ACTIVE (ICP)** | Only its market-sizing numbers are superseded. Its ICP and lever sections are still the only version of that work |
| `Market Analysis … 01_…_Strategic_Growth_Thesis.pdf` | 32 pages, May 2026. The C-suite argument: seven economic identities of the product, market forces, 35 growth drivers, ROI logic. Built on Salesforce State of Sales 7th Ed. (4,050 professionals, 22 countries) | **REFERENCE** | Predates the phase model; positions the product as "a property-rights and credit-allocation institution," explicitly **not** a PRM — the pre-reconciliation view |
| `Market Analysis … 02_…_200_Driver_Catalogue.pdf` | 8 pages. Filterable register of 200 drivers with mechanism, KPI signal, product mapping, horizon, impact + two blank working columns | **REFERENCE / ORPHANED** | Explicitly points at "the companion spreadsheet (delivered separately)" — **that spreadsheet is not in the repo**. The PDF is the read-only shadow of a working file nobody has |
| `Market Analysis … 03_…_200_Market_Forces_Reference.pdf` | 39 pages. The same 200 drivers, each with a full rationale paragraph, grounded in Coase, Williamson, Hart–Moore, Rochet–Tirole, Shapley, Ostrom, Akerlof et al. | **REFERENCE** | The deepest theoretical layer in the repo. Read once; cite for the "why now" argument |

**Filename hazard:** the three market PDFs contain spaces and `&`. They break naive shell globbing and
per-file git scripting (they silently produced empty results during this survey). Rename when convenient.

---

## 8. Class E — Pricing & commercial

Four documents; **one of them carries the decision.**

| File | What it is | Status | Note |
| --- | --- | --- | --- |
| `Reven_Pricing_Executive_Summary.md` | 82 lines. The recommendation in one line, the tiers, packages, commercial model, and what must be validated before prices lock | **ACTIVE — the front door** | Read this; read the others only when challenged |
| `Reven_Pricing_Architecture_Deep_Research.md` | 676 lines, 11 Jun. 15 deliverables + 30 answers, five segments including a fully-priced semi-government tier, benchmarked on fresh 2024–26 competitor pricing, SAR and USD | **ACTIVE — the working reference** | Also the file that first declares "Reven = commercial brand for Partner Revenue OS" and names PDR-v5 binding |
| `Partner_Revenue_OS_Pricing_and_Commercial_Strategy.md` | 1,030 lines. 50 pricing structures sequenced pre-seed → unicorn, plus a corporate-finance appendix | **REFERENCE** | Superset of options; the two files above select from it |
| `Partner_Revenue_OS_Pricing_Strategy_Red_Team.md` | 322 lines. Adversarial pre-mortem against the file above — five hostile research streams, then a best-fit fix per wound, plus §4 "what survives" and a 90-day de-risking sprint | **ACTIVE — highest value per word** | The most intellectually honest document in the repo. Its §5 "Strategy v2" is arguably a better plan of record than the thing it critiques |

**Consistent across all four:** the repo's non-negotiable rule — never invent traction, WTP, ACV, or
company financials; every price is a *benchmarked hypothesis to test*. Enforced by an actual commit
("Remove weakly-sourced planted figures from the prompt (de-hallucinate)").

---

## 9. Class F — Operating manuals

Written in Era 1 by the founder, before the phase model existed; retro-fitted in Era 3 with
phase-discipline headers. They describe how a company of ~20 runs — the company today is pre-seed.
**Treat as a target-state library, not current process.**

| File | Size | What it is | Status |
| --- | ---: | --- | --- |
| `Integration_Layer_and_API_Data_Flows_Manual.md` | 1,413 lines / 20,826 w | The build-grade one. Canonical data model, source→canonical field mapping, sequence diagrams, webhook semantics, idempotency, reconciliation engine, identity resolution, connector spec, KSA rails (ZATCA Fatoora, WHT/VAT, sarie, PayTabs, Lean, Tarabut), plus Appendices A–C on the verified KSA tool stack | **ACTIVE — the most build-useful manual** |
| `Large_Enterprise_Client_Onboarding_Manual.md` | 3,482 lines | 25-phase customer journey, outreach → close → implementation → CS, with per-function onboarding | **ACTIVE** — header correctly clarifies its 25 phases are *customer journey*, not product roadmap |
| `GTM_Operating_Manual.md` | 2,407 lines | 29 GTM stages, market thesis → referenceable customers; 18-month roadmap; demo scripts; per-function playbooks | **ACTIVE** — carries the Phase-1 rule that nothing may promise payout execution |
| `Internal_Operating_Cadence_Manual.md` | 1,955 lines | Meeting rhythm, handoffs, decision log, five operating loops, daily/weekly/biweekly/quarterly cadence | **ACTIVE — aspirational** |
| `Monthly_CFO_Review_Manual.md` | 2,027 lines | Monthly CFO checklist as a control system; ~60 numbered questions A1…, pre-seed proof score | **ACTIVE** — the only manual the roadmap audit passed with *no* findings |

Note: `Monthly_CFO_Review_Manual.md` is the one manual with **no** phase-discipline header — correctly,
since it governs company finances, not product scope.

---

## 10. Class G — Investor & finance

| File | What it is | Status | Note |
| --- | --- | --- | --- |
| `Pre_Seed_2M_SAR_Financial_Model_Blueprint.md` | The canonical ask: **2,000,000 SAR for 10%** (20M post / 18M pre), 12-month zero-revenue, 4 founders + 6 hires from Month 2. Four pillars, every line item reconciled to the riyal | **CANON (finance)** | Self-declares "canonical, board-ready fact… supersede only with an explicitly dated revision." Every subtotal is arithmetically verified in §6 |
| `Reven_Pitch_Deck.pdf` | 17 pages / 16 slides, 17 Jun, Firefox → cairo. Cost-center trap → what Reven is → the shift → problem → the claim → journey → fit → buyers → why now → data/AI → competition → business model → GTM → team → use of funds → close | **ACTIVE / STALE on one slide** | **Slide 15 disagrees with the blueprint.** See §16.3 |
| `Partner_Revenue_OS_Venture_Scale_Narrative.md` | 403 lines. The full VC narrative built on a venture-scale framework: insight, why-now, beachhead, expansion path, defensibility, validation roadmap, objection handling, narrative score, 3 narrative variants | **ACTIVE** | Cleaned in the Era-3 audit: the untraceable "~24% partner-sourced" stat and the stale "$133B GCC TAM" were removed in all locations |
| `Pre_Seed_12M_Burn_Runway_CashFlow_PROMPT.md` | 381 lines. A questionnaire-driven AI prompt that builds a 13-pillar, CFO/board-ready 12-month burn/runway/cash-flow model from founder answers only — the most heavily iterated file in the repo (9 commits) | **K · tooling — ORPHANED** | Never run to completion; the canonical model came from a founder-provided budget instead |
| `Pre_Seed_12M_Model_Founder_Questionnaire.md` | 273 lines. The fill-in input sheet for the above — Sections A–M, three input tiers (🟢 founder / 📊 adopted reference / 🔴 required) | **K · tooling — ORPHANED, 100% blank** | Every answer cell is empty. This is the highest-leverage unfinished item in the repo: it is the only path from the current one-page blueprint to a defensible board-grade cash-flow model |

---

## 11. Class H — Self-audit & execution

Era 4. The company grading itself. Highest signal-to-noise *and* the largest single block of noise.

| File | What it is | Status | Note |
| --- | --- | --- | --- |
| `Reven_Execution_Plan_Next_2_Quarters.md` | 95 lines. "The one thing," 3 forks to decide this week, the build order, the Phase-1 exit gate, the 10 highest-leverage moves, first two hires, capital sizing, competitive watch, kill-criteria, a Q3/Q4 table | **ACTIVE — the sharpest document in the repo** | Explicitly the front door to the analysis stack. **Its GTM-label recommendation conflicts with README canon** — see §16.6 |
| `Reven_Product_Architecture_Audit.md` | 173 lines, 22 Jun. Grades the two "current versions" separately: strategy **A−/venture-grade**, shipped app **D/throwaway scaffold**. Module-by-module code audit, four fatal architectural gaps, wedge-by-wedge Capture/Settle/Orchestrate vs code vs market, scorecard, 17 verified sources | **ACTIVE (strategy) / STALE (code)** | Its code section audits the **Express/Postgres app that has since been retired**. See §16.9 — the headline criticisms still land against the new app; the specifics do not |
| `Reven_PERM_Category_Deep_Dive.md` | 117 lines. Gartner's Sept 2025 PRM → **PERM** rename as a consolidation signal; the mechanism; honest counter-evidence; what it means for Reven | **ACTIVE** | The thesis the next two documents expand |
| `Reven_100_Strategic_Implications.md` | 559 lines. The five parent implications × 20 each, every item with Strategic / Tactical / Rationale lenses | **REFERENCE** | The curated tier. This is the one to read |
| `Reven_1000_Strategic_Implications.md` | 5,204 lines / **88,747 words — 33% of all prose in the repo**. The 10× expansion: 5 parents × 200, in 50 sub-clusters | **REFERENCE — navigate, never read** | Self-describes accurately: *"not 1,000 equally-novel epiphanies — at this resolution the value is coverage and navigability."* It is an index, and it is the repo's single largest distraction surface. Its item IDs (`[#401–440]`) are load-bearing: the Execution Plan cites into it |

---

## 12. Class I — Application (`revenue-share-platform/`)

**Two applications live here. One runs; one is dead.**

### I.1 The live app — `frontend/` (React 18 + Vite 5 + Motion, backend = Base44)

4,817 LOC. Implements the PDR's Phase-1 loop end to end: register a claim → human decides the
Attribution of Record → eligibility previewed *with an explanation and a missing-conditions list* → the
first-payout milestone is **recorded, never executed**.

| Path | Role | Status |
| --- | --- | --- |
| `src/api/base44Client.js`, `entities.js`, `integrations.js` | Base44 SDK client (`RevenueOS`, app id committed as a public client id) and the 20-entity domain model — Partner, PartnerProgram, Agreement, **PartnerClaim**, EcosystemTouchpoint, PartnerStatement, Dispute, AuditEvent, Decision, ActionItem, Forecast, Customer, Deal, Activity + the finance spine (LedgerEntry, RevenueEvent, RuleVersion, Evidence, Approval, FXRate) | **ACTIVE** |
| `src/pages/Claims.jsx` (446 LOC) | The core surface: claim drawer, attribution decision, eligibility evaluation, payout-milestone recording | **ACTIVE — the product** |
| `src/pages/Dashboard.jsx` | Command Center | **ACTIVE** |
| `src/pages/Partners.jsx`, `ListScreens.jsx` (Programs, Agreements, Statements, Disputes, Attribution) | Registry + ledger surfaces | **ACTIVE** |
| `src/pages/Cadence.jsx`, `Audit.jsx` | Decision/outcome loop and the append-style audit log with out-of-order/late anomaly flags | **ACTIVE** |
| `src/pages/Login.jsx`, `src/context/AuthContext.jsx`, `src/services/auth.service.js` | Own sign-in screen + route guard; SDK `requiresAuth:false` on purpose so it never hard-redirects to Base44's hosted login | **ACTIVE** |
| `src/components/` — `DataScreen.jsx`, `Layout.jsx`, `RecordForms.jsx`, `ui/{kit,form,icons}.jsx`, `brand/Brandmark.jsx` | The component system; `<Wordmark>` / `<Brandmark>` are the in-app logo of record | **ACTIVE** |
| `src/styles/` — 10 files incl. `tokens.css` | Hand-authored design system, no Tailwind. `tokens.css` derives the working palette from BRAND.md's five anchors | **ACTIVE** |
| `src/hooks/useCollection.js`, `src/services/normalize.js` | Entity-collection loading + `id`/`_id` normalization | **ACTIVE** |
| `index.html`, `vite.config.js`, `public/_redirects`, `public/favicon.svg`, `.env.example`, `package.json` | Build + SPA fallback + branded head | **ACTIVE** |

**Honest architectural read (2026-07-28).** The Phase-1 *behaviour* is correct — the no-money-movement
boundary is explicitly coded and commented, and the eligibility explanation + missing-conditions list is
exactly what the PDR's FR-10 specifies. But the business logic is **client-side**: attribution percentage
and eligibility are computed in the browser in `Claims.jsx` and written straight to entities. There is
still no append-only ledger, no server-side rule evaluation, and no cross-tenant identity — the three
things the strategy corpus calls the moat. The app is a faithful, well-built demonstration of the loop;
it is not yet the system of record.

### I.2 The dead app — `backend/` (Express + PostgreSQL)

1,560 LOC across 26 files: 7 controllers, 7 models, 7 route files, JWT + bcrypt utils, `schema.js`
(`CREATE TABLE IF NOT EXISTS` on boot, no migrations). Era-0 bot output.

**Status: DEAD.** `revenue-share-platform/README.md` states plainly that it is "a legacy Express +
Postgres prototype from the original MVP… **not used** by the app (kept only as reference) and is not
deployed." Nothing imports it; the frontend service layer that called it was deleted in `64a22fe`.
It is 1,560 LOC of code that a reviewer, a scanner, or an AI agent will read as live.

### I.3 App documentation

| Path | Role | Status |
| --- | --- | --- |
| `revenue-share-platform/README.md` | Accurate, current, well-written: what the app is, run/build/deploy, the Base44 allowed-origins step, the legacy-backend warning | **ACTIVE — the most accurate README in the repo** |

---

## 13. Class J — Brand & deploy

| Path | What it is | Status |
| --- | --- | --- |
| `brand/reven-logo.svg` | Navy `#0C1B3C` wordmark for light backgrounds | **ACTIVE** |
| `brand/reven-logo-light.svg` | The identical geometry with stroke `#EAEEF7` for dark backgrounds (the two files differ by exactly one line) | **ACTIVE** |
| `netlify.toml` | Monorepo build: base `revenue-share-platform/frontend`, publish `dist`, Node 20, SPA fallback | **ACTIVE** |

---

## 14. Class K — Repo meta & tooling

| File | What it is | Status | Note |
| --- | --- | --- | --- |
| `CLAUDE.md` | Handoff context for future AI sessions: what the repo is, the governing phase model, conventions | **STALE** | Describes the app as "**Node.js + Express + PostgreSQL** backend and React + Vite frontend, with partner, contract, revenue, KPI, and legal-document modules plus JWT auth." That is the **dead** backend and the **retired** frontend. The live app runs on Base44 with Claims/Attribution/Statements/Disputes surfaces |
| `.gitignore` | Dependencies, build output, env, IDE, logs, coverage | **STALE / malformed** | The file is **wrapped in markdown code fences** — its first and last lines are literal ` ``` `. It also ignores `package-lock.json` and `.env.*`, yet three such files are tracked anyway. Pasted from a chat window, never cleaned |
| `Pre_Seed_12M_Burn_Runway_CashFlow_PROMPT.md`, `Pre_Seed_12M_Model_Founder_Questionnaire.md` | (listed under Class G) | **ORPHANED** | Tooling for a model that was never produced this way |

---

## 15. Class X — History only (deleted; reachable via git)

168 files were added and later removed. Two blocks matter:

| Block | Removed | What it was | Why it matters now |
| --- | --- | --- | --- |
| `prototype/` — 163 files, ~29,220 lines | `842c149`, 19 Jun | An offline HTML click-through prototype: 55 screens (`code.html` + `screen.png` each), a `recovered/` image set, build/driver/gen scripts, a workflow-gap analysis, a technical handoff doc, and a `revenue_ledger_protocol/DESIGN.md` | The screen names are a free product-surface inventory — `shadow_revenue_detection_engine`, `payout_eligibility_workspace`, `finance_evidence_pack`, `partner_concentration_risk_map`, `incentive_simulation_rule_sandbox`. Several of these surfaces have **not** been rebuilt in the Base44 app. It is also the main reason `.git` is 21 MB |
| `.claude/skills/run-revenue-sharing-mvp/SKILL.md` | with the prototype | The skill that launched the prototype | Gone with its target |
| `18M_Burn_Rate_QA_Model.md` | `7a7be59`, 29 May | An 18-month burn model, superseded by the 12-month prompt (its content was merged forward first — `b738ada`) | Provenance for the finance line only |
| Legacy MVP frontend — `pages/{Contracts,KPIs,LegalDocuments,Revenue,SurfaceStub}.jsx`, 7 `services/*.js`, 6 stylesheets | `64a22fe`, 25 Jul | The Era-0 React app that talked to the Express backend | Confirms the frontend/backend split is complete and deliberate |

---

## 16. Contradiction register

Ten places where the repo disagrees with itself. Ordered by cost of being wrong.

**16.1 · Two documents claim to be the strategy source of truth.**
`README.md` and `ROADMAP_ALIGNMENT_AUDIT.md` §2 both name
`Reverse_Engineered_Strategy_PRM_to_Revenue_Sharing_to_Orchestration.md` as source of truth.
`Partner_Revenue_OS_Master_Strategy_Dossier.md` opens by declaring it *"consolidates and supersedes"*
that file **and** the Deep-Dive Companion. Both statements are still live. *Fix: pick one, and put a
one-line supersession banner on the loser.*

**16.2 · Three product-definition artifacts, no declared precedence.**
`partner-revenue-os-PDR-v5.md` (called binding by a pricing doc, but nowhere in canon),
`Partner_Revenue_OS_PDR.md` (4× longer, unmarked), and the 60-page workflow PDF (22 phases,
unreconciled). README lists the first two side by side as "Product requirements" and never mentions the
third. *Fix: one line in README naming the binding spec and the role of the other two.*

**16.3 · The pitch deck's use of funds ≠ the canonical financial model.**
Same 2,000,000 SAR round, different allocation:

| Pillar | Deck (17 Jun) | Blueprint (19 Jun) |
| --- | ---: | ---: |
| 1 · Setup & legal | 7.90% | 7.90% |
| 2 · Founders & cloud | 41.47% | 41.47% |
| 3 · Execution team | **37.89%** | **46.31%** |
| 4 · Reserve | **12.74%** | **4.32%** |

The blueprint is two days newer and self-declares canonical; the **deck is the investor-facing
artifact**. This is the one inconsistency that can be caught in a live meeting. *Fix: re-cut slide 15.*

**16.4 · `CLAUDE.md` describes an application that no longer exists.** It documents the dead Express +
Postgres stack and the retired module set. Every future AI session starts from this file. *Fix: rewrite —
highest ratio of impact to effort in the repo.*

**16.5 · `README.md`'s repository guide is 5+ weeks and 14 documents behind.** Missing: the Execution
Plan, Product Architecture Audit, PERM Deep Dive, 100 and 1,000 Implications, 150 Levers, both Saudi
market documents, the Pricing Executive Summary, the Founder Questionnaire, all four non-deck PDFs — plus
`BRAND.md`, `brand/`, `netlify.toml`, and the entire application.

**16.6 · The external positioning label is forked.**
README canon: *"the entry product is sold and experienced as an easy, claim-centric **PRM**."*
`Reven_Execution_Plan_Next_2_Quarters.md`: *"Stop building a PRM demo"* and *"lead externally with
'partner-revenue & settlement system of record'."*
Both read as governing; the audit's F-1/F-6 fixes standardized the whole corpus on the first. This is not
a wording slip — it is an unclosed strategic decision sitting in two documents. *Fix: decide, then
propagate.*

**16.7 · The alignment audit has fallen behind its own corpus.** It audited 16 documents on 12 Jun; nine
have been added since. Only 8 of 30 root `.md` files carry the phase-discipline header it mandated —
including none of the Era-4 analysis documents, which are precisely the ones arguing for a different
positioning (16.6).

**16.8 · `.gitignore` is a pasted markdown block.** Literal ` ``` ` fences as ignore patterns; ignores
`package-lock.json` and `.env.*` while three such files are tracked.

**16.9 · The architecture audit's code verdict is stale, but its conclusion is not.** The audited app
(Express/Postgres, client-supplied share amounts, hardcoded dashboard activity, Mongo/Postgres README
mismatch) is gone. The new Base44 app fixes the doc/code truth gap and implements the Phase-1 loop
properly. **Three of the four "fatal" gaps remain**: no append-only ledger, no server-side rule
evaluation (attribution and eligibility are computed in the browser), no cross-tenant identity.
Recommendation #10 in the Execution Plan — "fix the doc/code truth gap before any diligence" — is now
done for the app README and **still open for `CLAUDE.md` and the root README**.

**16.10 · Referenced-but-absent artifacts.** The 200-Driver Catalogue PDF points to a "companion
spreadsheet (delivered separately)" that is not in the repo. The Founder Questionnaire is 100% blank, so
the 13-pillar burn model it feeds has never been built.

---

## 17. If you read only twelve files

Ordered as a reading path for a new hire, an investor, or a fresh AI session. Everything else is
evidence, provenance, or reference.

| # | File | Why |
| --- | --- | --- |
| 1 | `README.md` | The phase model and the finance boundary — 373 words |
| 2 | `Reven_Execution_Plan_Next_2_Quarters.md` | What to do now, and the go/no-go gate |
| 3 | `Partner_Revenue_OS_Master_Strategy_Dossier.md` | The whole strategy in one document |
| 4 | `partner-revenue-os-PDR-v5.md` | What the product is |
| 5 | `Reven_Product_Architecture_Audit.md` | The honest grade (read §3 knowing it audits the retired app) |
| 6 | `Reven_Pricing_Executive_Summary.md` | The commercial answer in two pages |
| 7 | `Partner_Revenue_OS_Pricing_Strategy_Red_Team.md` | The best argument against everything above |
| 8 | `Pre_Seed_2M_SAR_Financial_Model_Blueprint.md` | The ask, reconciled to the riyal |
| 9 | `Saudi_Riyal_Map_Market_Sizing_and_Value_Capture.md` | The market, rebuilt independently |
| 10 | `Reven_PERM_Category_Deep_Dive.md` | Why the category is consolidating and where the seam is |
| 11 | `Integration_Layer_and_API_Data_Flows_Manual.md` | The only build-grade technical document |
| 12 | `revenue-share-platform/README.md` | What actually runs today |

---

## 18. Maintenance rule (proposed)

The repo's real failure mode is not wrong content — it is **unlabelled succession**. Six eras of work sit
flat in one directory with no visible precedence, so a reader cannot tell a superseded document from a
governing one without reading both.

One rule fixes most of it: **every document declares its own status in its first three lines** — one of
`CANON`, `ACTIVE`, `REFERENCE`, or `SUPERSEDED BY <file>`. Several documents already do this
(`Pre_Seed_2M_SAR_Financial_Model_Blueprint.md`, `Partner_Revenue_OS_Master_Strategy_Dossier.md`,
`Saudi_Riyal_Map_…`). Making it universal, and keeping `README.md` as the index of record, would retire
seven of the ten contradictions in §16 without deleting a single file.

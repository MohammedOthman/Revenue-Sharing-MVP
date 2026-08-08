# Reven Growth Model — README

Companion documentation for **`Partner_Revenue_OS_Growth_Model.xlsx`** — a live, formula-driven model that operationalizes the growth strategy (see the three dossiers: `…Growth_Archetype.md`, `…_Deep_Research.md`, `…_Rationale_Annex.md`). Because `.xlsx` is not diff-friendly, this README documents its structure so the model is reviewable in git.

## How to use
1. Open the workbook in **Excel or Google Sheets** (formulas recompute on open; openpyxl writes formulas, not cached values).
2. On **`Assumptions`**, edit only the **yellow** cells. Everything else recomputes.
3. Read **`Dashboard`** for ARR, NRR, and every efficiency metric vs its top-quartile line.

## Sheets
| Sheet | What it does |
|---|---|
| **Read me** | Instructions, colour legend, what the model encodes. |
| **Assumptions** | All inputs (yellow): new-logo ARR by year, **net retention by cohort age** (the NRR engine), gross margin, S&M, net burn, FCF margin. |
| **ARR & Cohorts** | The cohort waterfall — each acquisition cohort starts at its new-logo ARR then ages by the net-retention-by-age curve. Sums to total ARR; computes blended NRR. *This is the J-curve-per-cohort engine.* |
| **Dashboard** | ARR, net-new ARR, YoY growth, growth persistence, blended NRR, gross margin, **burn multiple, magic number, CAC payback, Rule of 40**, each with its top-quartile line and a pass/read flag; plus a T2D3 reference path. |
| **Benchmarks** | The verified top-quartile lines + source + confidence (from the deep-research companion). |

## The model logic (formulas)
- **Cohort revenue**: `cohort[Y] = cohort[Y-1] × NetRetention[age]`, starting at `NewLogoARR` in the acquisition year. Net retention by age climbs then plateaus = the module-ladder J-curve.
- **Total ARR[Y]** = Σ cohorts.
- **Blended NRR[Y]** = `(TotalARR[Y] − NewLogoARR[Y]) / TotalARR[Y-1]` (standard prior-book retention).
- **Burn multiple** = `NetCashBurned[Y] / NetNewARR[Y]`.
- **Magic number** = `NetNewARR[Y] / S&M[Y-1]`.
- **CAC payback (months)** = `12 × S&M[Y-1] / (NetNewARR[Y] × GrossMargin[Y])`.
- **Rule of 40** = `YoYGrowth% + FCFmargin%`.

## The key dial
**`Net retention by cohort age`** (Assumptions, yellow) is the single most important lever — raising it is the numeric form of "reprice to value + climb the module ladder" (Pillars 1 & 3). The shipped illustrative values (~1.10–1.16) produce a **~110% blended NRR** (the realistic compliance-SoR band: Avalara 116%, Vertex 109%). To model the **120%+ top-quartile band**, raise these — *and remember the deep-research finding that flow alone does NOT lift NRR (BILL at 92% NDR); the ladder + repricing do.*

## What the illustrative inputs show
A capital-efficient **"D5-plus"** path: **~$0.5M → $2.0M (Y2) → $5.3M (Y3, inside the KSA SOM) → $13.9M → $33.6M → $72.6M (Y6)** — reaching ~T2D3's Y6 destination via efficient doubles, with burn multiple improving 1.6×→0.1× and NRR ~110–112%. **These are ILLUSTRATIVE placeholders, not a forecast** — replace with your numbers. Consistent with this repo's anti-hallucination discipline, every commercial figure is a validate-first assumption.

## Caveat
External benchmark lines are directional (knowledge cutoff Jan-2026; the supporting research ran fetch-blocked, triangulated from search extracts of primary filings). Re-verify the three flagged figures verbatim before investor use: Toast's ~25% blended GM, BILL's ~92% NDR, Avalara's 116% NRR / $8.4B take-private.

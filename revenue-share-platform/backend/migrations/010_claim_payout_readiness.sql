-- 010_claim_payout_readiness
-- Payout-readiness gate for Partner Revenue Claims (PDR FR-04: "payout-bearing
-- claims are blocked until bank and tax are verified").
--
-- Phase 1 boundary: this RECORDS verification state and a payout-ready milestone
-- only. No money moves, no rail integration, no clearance. "Payout-ready" is a
-- recorded fact that a Phase-2 settlement step could later require; reaching it
-- is blocked until the claim is approved and both bank and tax are verified.

ALTER TABLE partner_revenue_claims ADD COLUMN IF NOT EXISTS bank_verified    BOOLEAN NOT NULL DEFAULT FALSE;
ALTER TABLE partner_revenue_claims ADD COLUMN IF NOT EXISTS bank_verified_at TIMESTAMP;
ALTER TABLE partner_revenue_claims ADD COLUMN IF NOT EXISTS tax_verified     BOOLEAN NOT NULL DEFAULT FALSE;
ALTER TABLE partner_revenue_claims ADD COLUMN IF NOT EXISTS tax_verified_at  TIMESTAMP;
ALTER TABLE partner_revenue_claims ADD COLUMN IF NOT EXISTS payout_ready     BOOLEAN NOT NULL DEFAULT FALSE;
ALTER TABLE partner_revenue_claims ADD COLUMN IF NOT EXISTS payout_ready_at  TIMESTAMP;

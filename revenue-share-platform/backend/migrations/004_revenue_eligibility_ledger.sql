-- 004_revenue_eligibility_ledger.sql
-- The Revenue Event, the Payout Eligibility preview, the append-only Ledger, and
-- the partner bank/tax gate. This is where the "no money movement" rule is most
-- load-bearing: everything here READS, CALCULATES, and DISPLAYS. Nothing
-- approves-to-pay, executes, reverses, or clears money.

-- Partner payout-readiness gate: payout-bearing claims are blocked until BOTH
-- bank and tax are verified (FR-04). Compliance fields are capture-only stubs.
ALTER TABLE tenant_partners ADD COLUMN IF NOT EXISTS bank_verified BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE tenant_partners ADD COLUMN IF NOT EXISTS tax_verified  BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE tenant_partners ADD COLUMN IF NOT EXISTS tax_profile   JSONB NOT NULL DEFAULT '{}'::jsonb; -- VAT/CR/WHT/ZATCA refs (captured, not cleared)

-- Revenue Event: a validated fact that attributed pipeline became real revenue.
-- Distinct from closed-won; independently lifecycled from the claim.
CREATE TABLE IF NOT EXISTS revenue_events (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id           UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  claim_id            UUID NOT NULL REFERENCES claims(id) ON DELETE CASCADE,
  basis               VARCHAR(40) NOT NULL DEFAULT 'closed_won', -- set from the rule/agreement basis
  amount              NUMERIC(14,2) NOT NULL,                    -- recognized/validated revenue amount
  currency            CHAR(3) NOT NULL DEFAULT 'SAR',
  status              VARCHAR(30) NOT NULL DEFAULT 'closed_won', -- opportunity/pipeline/closed_won/invoiced/collected/recognized
  invoice_reference   VARCHAR(120),      -- ERP/billing pointer (import/manual only in Phase 1)
  collection_status   VARCHAR(30),
  source              VARCHAR(20) NOT NULL DEFAULT 'manual',     -- manual / import (never auto-executed)
  recorded_by         INTEGER REFERENCES users(id),
  event_time          TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_revenue_events_claim ON revenue_events(claim_id);

-- Payout Eligibility preview: one service computes a verdict + a MANDATORY
-- human-readable explanation + the missing-condition list (FR-10 / ADR-0006).
-- Versioned: recomputed on any change to claim, attribution, revenue, or rule.
CREATE TABLE IF NOT EXISTS eligibility_evaluations (
  id                     UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id              UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  claim_id               UUID NOT NULL REFERENCES claims(id) ON DELETE CASCADE,
  version                INTEGER NOT NULL,
  verdict                VARCHAR(30) NOT NULL,   -- eligible / not_eligible / finance_review_required / missing_evidence / disputed
  estimated_gross        NUMERIC(14,2),          -- computed server-side: amount x share_rate, capped/floored
  estimated_wht          NUMERIC(14,2),          -- modelled withholding (capture/preview only)
  estimated_net          NUMERIC(14,2),
  currency               CHAR(3),
  agreement_rule_applied JSONB NOT NULL DEFAULT '{}'::jsonb,
  missing_conditions     JSONB NOT NULL DEFAULT '[]'::jsonb,     -- array of human-readable strings
  explanation            TEXT NOT NULL,          -- required; same text shown to finance and on partner statement
  evaluated_by           INTEGER REFERENCES users(id),
  is_current             BOOLEAN NOT NULL DEFAULT true,
  evaluated_at           TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (claim_id, version)
);
CREATE INDEX IF NOT EXISTS idx_elig_claim_current ON eligibility_evaluations(claim_id) WHERE is_current;

-- Append-only, double-entry-style Ledger. Phase 1 wires ONLY the 'accrued' and
-- 'eligible' states. approved/paid/reversed/clawed_back are Phase 2 and are NOT
-- written here. Corrections are offsetting entries, never mutations.
CREATE TABLE IF NOT EXISTS ledger_entries (
  id                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id            UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  claim_id             UUID NOT NULL REFERENCES claims(id) ON DELETE CASCADE,
  eligibility_id       UUID REFERENCES eligibility_evaluations(id),
  state                VARCHAR(20) NOT NULL,     -- accrued / eligible  (Phase-1 only)
  entry_type           VARCHAR(10) NOT NULL,     -- credit / debit
  amount               NUMERIC(14,2) NOT NULL,
  currency             CHAR(3) NOT NULL DEFAULT 'SAR',
  offsets_entry_id     UUID REFERENCES ledger_entries(id),  -- correction = offsetting entry
  created_by           INTEGER REFERENCES users(id),
  created_at           TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT ledger_phase1_states CHECK (state IN ('accrued', 'eligible'))
);
CREATE INDEX IF NOT EXISTS idx_ledger_claim ON ledger_entries(claim_id);

DROP TRIGGER IF EXISTS trg_ledger_append_only ON ledger_entries;
CREATE TRIGGER trg_ledger_append_only
  BEFORE UPDATE OR DELETE ON ledger_entries
  FOR EACH ROW EXECUTE FUNCTION reven_block_mutation();

-- Evidence Item attached to a claim (real file storage is a V1 concern; MVP
-- captures the reference + provenance).
CREATE TABLE IF NOT EXISTS evidence_items (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id    UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  claim_id     UUID NOT NULL REFERENCES claims(id) ON DELETE CASCADE,
  kind         VARCHAR(40),        -- email / crm_link / document / customer_confirmation
  description  TEXT,
  file_url     VARCHAR(500),
  provenance   VARCHAR(120),
  added_by     INTEGER REFERENCES users(id),
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_evidence_claim ON evidence_items(claim_id);

-- Phase-1 milestones per tenant: first accepted claim, first payout (RECORDED,
-- never executed), and the time-to-first-* the exit gate is measured on (FR-12).
CREATE TABLE IF NOT EXISTS tenant_milestones (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id     UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  milestone     VARCHAR(40) NOT NULL,   -- first_claim / first_accepted_claim / first_payout_recorded
  claim_id      UUID REFERENCES claims(id),
  occurred_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (tenant_id, milestone)
);

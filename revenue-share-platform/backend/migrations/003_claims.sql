-- 003_claims.sql
-- The Partner Revenue Claim (the aggregate root), its append-only domain Event
-- Log, the human-decided Attribution of Record, and Protection Windows.
--
-- Design rules taken from the strategy corpus:
--  * The Claim is the atomic control object (PDRv5 §5).
--  * Every state change is an event; the Event Log is append-only and immutable
--    (ADR-0002). We enforce immutability with a trigger, not just convention.
--  * Attribution of Record is human-decided; a re-decision is a NEW version and
--    never overwrites the prior one (ADR-0001 / FR-07).
--  * A claim without agreement coverage still registers, but is flagged
--    not-payout-eligible (FR-05).
--  * Status dimensions are kept SEPARATE (Contribution/Attribution/Eligibility/
--    Payment never conflated — PDRv5 §5).

-- Reusable guard: reject UPDATE/DELETE on append-only tables.
CREATE OR REPLACE FUNCTION reven_block_mutation() RETURNS trigger AS $$
BEGIN
  RAISE EXCEPTION 'append-only table %: rows cannot be updated or deleted', TG_TABLE_NAME;
END;
$$ LANGUAGE plpgsql;

-- Make the audit_log (created in 001) genuinely append-only now that the guard exists.
DROP TRIGGER IF EXISTS trg_audit_log_append_only ON audit_log;
CREATE TRIGGER trg_audit_log_append_only
  BEFORE UPDATE OR DELETE ON audit_log
  FOR EACH ROW EXECUTE FUNCTION reven_block_mutation();

-- The Partner Revenue Claim. Fields follow PDR §9.2; the four status dimensions
-- are separate columns, each a projection of the event log.
CREATE TABLE IF NOT EXISTS claims (
  id                        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id                 UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  tenant_partner_id         UUID NOT NULL REFERENCES tenant_partners(id),
  partner_role              VARCHAR(50),          -- source / influencer / co_seller / reseller / ...
  agreement_id              UUID REFERENCES agreements(id),   -- nullable: no-agreement claims allowed

  -- Customer / deal (CRM stays system-of-record; we store references + dedup keys)
  customer_account_id       VARCHAR(120),
  customer_account_name     VARCHAR(255) NOT NULL,
  customer_domain           VARCHAR(255),         -- deterministic dedup key
  customer_tax_id           VARCHAR(64),          -- deterministic dedup key (CR/VAT)
  contact_id                VARCHAR(120),
  opportunity_id            VARCHAR(120),
  crm_opportunity_url       VARCHAR(500),
  product                   VARCHAR(255),
  estimated_deal_value      NUMERIC(14,2),
  currency                  CHAR(3) NOT NULL DEFAULT 'SAR',
  expected_close_date       DATE,
  claim_source              VARCHAR(40) NOT NULL DEFAULT 'internal',  -- partner_portal / internal

  -- Protection (denormalized current window; full state machine in protection_windows)
  protection_window_start   DATE,
  protection_window_end     DATE,

  -- Four separate status dimensions (never conflated)
  status                    VARCHAR(40) NOT NULL DEFAULT 'draft',        -- claim lifecycle (PDRv5 §12)
  preflight_result          VARCHAR(40),                                 -- pass / needs_info / duplicate_risk / agreement_gap / protection_conflict / manual_review
  attribution_status        VARCHAR(40) NOT NULL DEFAULT 'not_started',  -- recommended / under_review / decided / final / reopened
  revenue_status            VARCHAR(40) NOT NULL DEFAULT 'none',         -- none / opportunity / pipeline / closed_won / invoiced / collected / recognized
  eligibility_status        VARCHAR(40) NOT NULL DEFAULT 'not_evaluated',-- not_evaluated / eligible / not_eligible / finance_review_required / missing_evidence / disputed
  evidence_status           VARCHAR(40) NOT NULL DEFAULT 'none',         -- none / partial / complete / frozen
  dispute_status            VARCHAR(40) NOT NULL DEFAULT 'none',

  owner_user_id             INTEGER REFERENCES users(id),
  approver_user_id          INTEGER REFERENCES users(id),
  submitted_by              INTEGER REFERENCES users(id),
  submitted_at              TIMESTAMPTZ,
  created_at                TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at                TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_claims_tenant ON claims(tenant_id);
CREATE INDEX IF NOT EXISTS idx_claims_partner ON claims(tenant_partner_id);
-- Deterministic duplicate detection keys (per-tenant): same deal, same account.
CREATE INDEX IF NOT EXISTS idx_claims_dedup ON claims(tenant_id, customer_domain, opportunity_id);

-- Append-only domain Event Log. The source of truth; the claim columns above are
-- a projection of these events. INSERT-only, enforced by trigger.
CREATE TABLE IF NOT EXISTS claim_events (
  id             BIGSERIAL PRIMARY KEY,
  tenant_id      UUID NOT NULL REFERENCES tenants(id),
  claim_id       UUID NOT NULL REFERENCES claims(id) ON DELETE CASCADE,
  event_type     VARCHAR(60) NOT NULL,     -- claim.submitted / claim.preflight / attribution.decided / revenue.recorded / eligibility.evaluated / protection.granted / protection.expired / ledger.accrued / milestone.first_payout ...
  from_status    VARCHAR(40),
  to_status      VARCHAR(40),
  actor_user_id  INTEGER REFERENCES users(id),
  reason         TEXT,
  payload        JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_claim_events_claim ON claim_events(claim_id, id);

DROP TRIGGER IF EXISTS trg_claim_events_append_only ON claim_events;
CREATE TRIGGER trg_claim_events_append_only
  BEFORE UPDATE OR DELETE ON claim_events
  FOR EACH ROW EXECUTE FUNCTION reven_block_mutation();

-- Attribution of Record: exactly one CURRENT row per claim; re-decisions add a
-- new version and flip the prior is_current to false (never overwrite).
CREATE TABLE IF NOT EXISTS attribution_of_record (
  id                     UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id              UUID NOT NULL REFERENCES tenants(id),
  claim_id               UUID NOT NULL REFERENCES claims(id) ON DELETE CASCADE,
  version                INTEGER NOT NULL,
  decision               VARCHAR(20) NOT NULL,        -- accepted / partial / rejected / duplicate
  credited_partner_id    UUID REFERENCES tenant_partners(id),
  credit_percentage      NUMERIC(5,2) NOT NULL DEFAULT 100,  -- for partial / multi-partner splits
  basis                  VARCHAR(40),                 -- sourced / influenced / co_sell / ...
  model_recommendation   JSONB NOT NULL DEFAULT '{}'::jsonb, -- advisory, stubbed in MVP
  decided_by             INTEGER REFERENCES users(id),
  reason                 TEXT,
  is_current             BOOLEAN NOT NULL DEFAULT true,
  decided_at             TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (claim_id, version)
);
CREATE INDEX IF NOT EXISTS idx_aor_claim_current ON attribution_of_record(claim_id) WHERE is_current;

-- Protection Window: a time-bounded, scoped right (NOT exclusivity). State
-- machine: Granted -> Active -> Expiring -> Expired | Overridden (PDRv5 §12).
CREATE TABLE IF NOT EXISTS protection_windows (
  id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id          UUID NOT NULL REFERENCES tenants(id),
  claim_id           UUID NOT NULL REFERENCES claims(id) ON DELETE CASCADE,
  tenant_partner_id  UUID NOT NULL REFERENCES tenant_partners(id),
  scope              VARCHAR(30) NOT NULL DEFAULT 'account',  -- account / contact / product / territory / renewal
  scope_ref          VARCHAR(255),                            -- e.g. the protected account domain
  starts_on          DATE NOT NULL,
  ends_on            DATE NOT NULL,
  status             VARCHAR(20) NOT NULL DEFAULT 'active',   -- active / expiring / expired / overridden
  override_reason    TEXT,
  override_by        INTEGER REFERENCES users(id),
  created_at         TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_protection_active ON protection_windows(tenant_id, scope_ref) WHERE status = 'active';

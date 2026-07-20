-- 002_agreements.sql
-- The Agreement holds the rule terms the eligibility preview READS to calculate
-- an estimated amount. Phase-1 rule: these terms are evaluated to display a
-- preview only. Nothing here approves-to-pay, executes, or clears money.

CREATE TABLE IF NOT EXISTS agreements (
  id                     UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id              UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  tenant_partner_id      UUID REFERENCES tenant_partners(id),   -- null = program-level agreement
  name                   VARCHAR(255) NOT NULL,
  agreement_type         VARCHAR(50),                            -- referral / reseller / co-sell / ...

  -- Rule terms used by the eligibility calculation (preview only)
  share_basis            VARCHAR(30) NOT NULL DEFAULT 'revenue_share', -- commission | revenue_share | margin_share
  share_rate             NUMERIC(7,4) NOT NULL DEFAULT 0,        -- 0.10 = 10%
  cap_amount             NUMERIC(14,2),                          -- optional ceiling on the share
  floor_amount           NUMERIC(14,2),                          -- optional floor
  currency               CHAR(3) NOT NULL DEFAULT 'SAR',

  -- Compliance capture stubs (modelled for preview, NOT executed in Phase 1)
  wht_rate               NUMERIC(5,4) NOT NULL DEFAULT 0,        -- withholding tax rate applied in preview
  vat_treatment          VARCHAR(40),                            -- capture only

  -- Default protection policy for claims created under this agreement
  protection_window_days INTEGER,                                -- 30 / 60 / 90 / 180 / custom
  protection_scope       VARCHAR(30) DEFAULT 'account',          -- account / contact / product / territory / renewal

  effective_from         DATE,
  effective_to           DATE,
  status                 VARCHAR(30) NOT NULL DEFAULT 'active',  -- draft / active / expired
  version                INTEGER NOT NULL DEFAULT 1,             -- bumped on rule change (bitemporal-lite)
  created_by             INTEGER REFERENCES users(id),
  created_at             TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at             TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_agreements_tenant ON agreements(tenant_id);
CREATE INDEX IF NOT EXISTS idx_agreements_partner ON agreements(tenant_partner_id);

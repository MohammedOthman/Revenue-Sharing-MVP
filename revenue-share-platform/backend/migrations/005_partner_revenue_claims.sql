-- 005_partner_revenue_claims
-- The Partner Revenue Claim: a partner's claim to a share of revenue, moving
-- through submit -> review -> approve/reject. Amounts are server-controlled
-- (approved_amount is only set by the approve action). No money movement.

CREATE TABLE IF NOT EXISTS partner_revenue_claims (
  id SERIAL PRIMARY KEY,
  tenant_id INTEGER REFERENCES tenants(id),
  partner_id INTEGER REFERENCES partners(id) ON DELETE CASCADE,
  contract_id INTEGER REFERENCES contracts(id) ON DELETE SET NULL,
  period_start DATE,
  period_end DATE,
  basis TEXT,
  claimed_amount DECIMAL(14,2) NOT NULL DEFAULT 0,
  approved_amount DECIMAL(14,2),
  currency VARCHAR(3) DEFAULT 'SAR',
  status VARCHAR(50) DEFAULT 'submitted',   -- submitted, under_review, needs_clarification, approved, rejected
  decision_note TEXT,
  reviewed_by INTEGER REFERENCES users(id),
  reviewed_at TIMESTAMP,
  created_by INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_claims_tenant   ON partner_revenue_claims(tenant_id);
CREATE INDEX IF NOT EXISTS idx_claims_partner  ON partner_revenue_claims(partner_id);
CREATE INDEX IF NOT EXISTS idx_claims_contract ON partner_revenue_claims(contract_id);
CREATE INDEX IF NOT EXISTS idx_claims_status   ON partner_revenue_claims(status);

-- Tenant isolation (same pattern as migration 004; reven_app already gets
-- table privileges via ALTER DEFAULT PRIVILEGES from that migration).
ALTER TABLE partner_revenue_claims ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS tenant_isolation ON partner_revenue_claims;
CREATE POLICY tenant_isolation ON partner_revenue_claims
  USING (tenant_id = NULLIF(current_setting('app.current_tenant_id', true), '')::int)
  WITH CHECK (tenant_id = NULLIF(current_setting('app.current_tenant_id', true), '')::int);

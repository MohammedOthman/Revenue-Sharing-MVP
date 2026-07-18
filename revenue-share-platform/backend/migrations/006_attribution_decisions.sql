-- 006_attribution_decisions
-- Attribution Decision: records which partner gets credit for a revenue claim,
-- with a weight and rationale, moving proposed -> confirmed. No money movement.

CREATE TABLE IF NOT EXISTS attribution_decisions (
  id SERIAL PRIMARY KEY,
  tenant_id INTEGER REFERENCES tenants(id),
  claim_id INTEGER REFERENCES partner_revenue_claims(id) ON DELETE CASCADE,
  partner_id INTEGER REFERENCES partners(id) ON DELETE CASCADE,
  contract_id INTEGER REFERENCES contracts(id) ON DELETE SET NULL,
  outcome VARCHAR(50) DEFAULT 'credited',   -- credited, declined, split
  weight DECIMAL(5,2) DEFAULT 100,          -- percent of credit (0-100)
  rationale TEXT,
  status VARCHAR(50) DEFAULT 'proposed',    -- proposed, confirmed
  decided_by INTEGER REFERENCES users(id),
  decided_at TIMESTAMP,
  created_by INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_attribution_tenant  ON attribution_decisions(tenant_id);
CREATE INDEX IF NOT EXISTS idx_attribution_claim   ON attribution_decisions(claim_id);
CREATE INDEX IF NOT EXISTS idx_attribution_partner ON attribution_decisions(partner_id);
CREATE INDEX IF NOT EXISTS idx_attribution_status  ON attribution_decisions(status);

ALTER TABLE attribution_decisions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS tenant_isolation ON attribution_decisions;
CREATE POLICY tenant_isolation ON attribution_decisions
  USING (tenant_id = NULLIF(current_setting('app.current_tenant_id', true), '')::int)
  WITH CHECK (tenant_id = NULLIF(current_setting('app.current_tenant_id', true), '')::int);

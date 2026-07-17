-- 007_protection_windows
-- Protection Window: a dated window during which a partner's claim on a
-- contract/deal is protected. Lifecycle: active -> expired (by date) or
-- released (manually). No money movement.

CREATE TABLE IF NOT EXISTS protection_windows (
  id SERIAL PRIMARY KEY,
  tenant_id INTEGER REFERENCES tenants(id),
  partner_id INTEGER REFERENCES partners(id) ON DELETE CASCADE,
  contract_id INTEGER REFERENCES contracts(id) ON DELETE SET NULL,
  claim_id INTEGER REFERENCES partner_revenue_claims(id) ON DELETE SET NULL,
  starts_at DATE,
  ends_at DATE,
  reason TEXT,
  status VARCHAR(50) DEFAULT 'active',   -- active, expired, released
  created_by INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_protection_tenant   ON protection_windows(tenant_id);
CREATE INDEX IF NOT EXISTS idx_protection_partner  ON protection_windows(partner_id);
CREATE INDEX IF NOT EXISTS idx_protection_contract ON protection_windows(contract_id);
CREATE INDEX IF NOT EXISTS idx_protection_status   ON protection_windows(status);

ALTER TABLE protection_windows ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS tenant_isolation ON protection_windows;
CREATE POLICY tenant_isolation ON protection_windows
  USING (tenant_id = NULLIF(current_setting('app.current_tenant_id', true), '')::int)
  WITH CHECK (tenant_id = NULLIF(current_setting('app.current_tenant_id', true), '')::int);

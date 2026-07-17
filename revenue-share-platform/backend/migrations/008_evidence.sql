-- 008_evidence
-- Evidence Item + Evidence Pack. An evidence item is a metadata record that
-- documents why a claim or amendment is justified (a link, an email reference,
-- a note) — no file is uploaded or stored, only a reference. An evidence pack
-- bundles items for finance/legal review; once finalized it becomes read-only
-- so the bundle a reviewer signed off on cannot change underneath them.
--
-- No money movement: this records and organizes references only.

CREATE TABLE IF NOT EXISTS evidence_packs (
  id SERIAL PRIMARY KEY,
  tenant_id INTEGER REFERENCES tenants(id),
  claim_id INTEGER REFERENCES partner_revenue_claims(id) ON DELETE SET NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(50) DEFAULT 'draft',   -- draft, finalized
  finalized_at TIMESTAMP,
  created_by INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS evidence_items (
  id SERIAL PRIMARY KEY,
  tenant_id INTEGER REFERENCES tenants(id),
  claim_id INTEGER REFERENCES partner_revenue_claims(id) ON DELETE CASCADE,
  amendment_id INTEGER REFERENCES contract_amendments(id) ON DELETE CASCADE,
  pack_id INTEGER REFERENCES evidence_packs(id) ON DELETE SET NULL,
  type VARCHAR(50),          -- document_link, email, screenshot, note, calculation, contract_reference
  name VARCHAR(255) NOT NULL,
  description TEXT,
  file_url TEXT,             -- metadata link only; the platform stores no files
  added_by INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_evidence_packs_tenant  ON evidence_packs(tenant_id);
CREATE INDEX IF NOT EXISTS idx_evidence_packs_claim   ON evidence_packs(claim_id);
CREATE INDEX IF NOT EXISTS idx_evidence_packs_status  ON evidence_packs(status);
CREATE INDEX IF NOT EXISTS idx_evidence_items_tenant    ON evidence_items(tenant_id);
CREATE INDEX IF NOT EXISTS idx_evidence_items_claim     ON evidence_items(claim_id);
CREATE INDEX IF NOT EXISTS idx_evidence_items_amendment ON evidence_items(amendment_id);
CREATE INDEX IF NOT EXISTS idx_evidence_items_pack      ON evidence_items(pack_id);

-- Tenant isolation (same pattern as migration 004; reven_app already gets table
-- privileges via ALTER DEFAULT PRIVILEGES from that migration).
ALTER TABLE evidence_packs ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS tenant_isolation ON evidence_packs;
CREATE POLICY tenant_isolation ON evidence_packs
  USING (tenant_id = NULLIF(current_setting('app.current_tenant_id', true), '')::int)
  WITH CHECK (tenant_id = NULLIF(current_setting('app.current_tenant_id', true), '')::int);

ALTER TABLE evidence_items ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS tenant_isolation ON evidence_items;
CREATE POLICY tenant_isolation ON evidence_items
  USING (tenant_id = NULLIF(current_setting('app.current_tenant_id', true), '')::int)
  WITH CHECK (tenant_id = NULLIF(current_setting('app.current_tenant_id', true), '')::int);

-- 002_multitenancy
-- Shared multi-tenant foundation for the Hybrid model: shared by default, with
-- dedicated deployments running this same schema as a single tenant.
--
-- Additive and non-breaking: tenant_id columns are nullable and backfilled to a
-- default tenant, so existing single-tenant data keeps working. Enforcement
-- (row-level security policies + a per-request tenant session variable +
-- per-query scoping) is a LATER migration/step, applied and proven against a
-- live database.

CREATE TABLE IF NOT EXISTS tenants (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  deployment_type VARCHAR(50) DEFAULT 'shared',   -- 'shared' | 'dedicated'
  region VARCHAR(100),
  status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- A default tenant so pre-existing data has an owner.
INSERT INTO tenants (name, slug, deployment_type)
  VALUES ('Default Tenant', 'default', 'shared')
  ON CONFLICT (slug) DO NOTHING;

-- Global users belong to tenants through scoped memberships.
CREATE TABLE IF NOT EXISTS memberships (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  tenant_id INTEGER NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  role VARCHAR(50) NOT NULL DEFAULT 'member',   -- admin, finance, legal, partnerships, partner
  status VARCHAR(50) NOT NULL DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (user_id, tenant_id)
);

CREATE INDEX IF NOT EXISTS idx_memberships_user ON memberships(user_id);
CREATE INDEX IF NOT EXISTS idx_memberships_tenant ON memberships(tenant_id);

-- Add tenant_id to every client-owned table (nullable for now).
ALTER TABLE partners            ADD COLUMN IF NOT EXISTS tenant_id INTEGER REFERENCES tenants(id);
ALTER TABLE contracts           ADD COLUMN IF NOT EXISTS tenant_id INTEGER REFERENCES tenants(id);
ALTER TABLE revenue_shares      ADD COLUMN IF NOT EXISTS tenant_id INTEGER REFERENCES tenants(id);
ALTER TABLE kpis                ADD COLUMN IF NOT EXISTS tenant_id INTEGER REFERENCES tenants(id);
ALTER TABLE legal_documents     ADD COLUMN IF NOT EXISTS tenant_id INTEGER REFERENCES tenants(id);
ALTER TABLE contract_amendments ADD COLUMN IF NOT EXISTS tenant_id INTEGER REFERENCES tenants(id);

-- Backfill existing rows to the default tenant.
UPDATE partners            SET tenant_id = (SELECT id FROM tenants WHERE slug = 'default') WHERE tenant_id IS NULL;
UPDATE contracts           SET tenant_id = (SELECT id FROM tenants WHERE slug = 'default') WHERE tenant_id IS NULL;
UPDATE revenue_shares      SET tenant_id = (SELECT id FROM tenants WHERE slug = 'default') WHERE tenant_id IS NULL;
UPDATE kpis                SET tenant_id = (SELECT id FROM tenants WHERE slug = 'default') WHERE tenant_id IS NULL;
UPDATE legal_documents     SET tenant_id = (SELECT id FROM tenants WHERE slug = 'default') WHERE tenant_id IS NULL;
UPDATE contract_amendments SET tenant_id = (SELECT id FROM tenants WHERE slug = 'default') WHERE tenant_id IS NULL;

-- Indexes for tenant-scoped queries.
CREATE INDEX IF NOT EXISTS idx_partners_tenant            ON partners(tenant_id);
CREATE INDEX IF NOT EXISTS idx_contracts_tenant           ON contracts(tenant_id);
CREATE INDEX IF NOT EXISTS idx_revenue_shares_tenant      ON revenue_shares(tenant_id);
CREATE INDEX IF NOT EXISTS idx_kpis_tenant                ON kpis(tenant_id);
CREATE INDEX IF NOT EXISTS idx_legal_documents_tenant     ON legal_documents(tenant_id);
CREATE INDEX IF NOT EXISTS idx_contract_amendments_tenant ON contract_amendments(tenant_id);

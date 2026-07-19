-- 001_reven_foundation.sql
-- Reven Phase-1 "Capture" foundation.
-- Phase-1 rule (from the strategy corpus): capture, track, and calculate only.
-- No money movement, no settlement, no disbursement in this or any Phase-1 migration.
--
-- This migration builds the three primitives the product audit calls
-- "near-impossible to retrofit": multi-tenancy, cross-tenant partner identity,
-- and an append-only audit log. They exist from day one on purpose.

-- Multi-tenancy: every business row below is owned by exactly one tenant.
CREATE TABLE IF NOT EXISTS tenants (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        VARCHAR(255) NOT NULL,
  slug        VARCHAR(120) UNIQUE NOT NULL,
  country     CHAR(2),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Attach existing users to a tenant. The users table already carries a `role`
-- column (default 'user'); we reuse it as the tenant role (owner/admin/member).
ALTER TABLE users ADD COLUMN IF NOT EXISTS tenant_id UUID REFERENCES tenants(id);

-- Cross-tenant partner identity: a partner is a GLOBAL entity that more than one
-- tenant can reference. This is the seed of the Phase-3 network. Tenant-local
-- partner data lives in tenant_partners, keyed to this shared identity.
CREATE TABLE IF NOT EXISTS partner_identities (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  legal_name  VARCHAR(255) NOT NULL,
  domain      VARCHAR(255) UNIQUE,       -- natural cross-tenant key when present
  country     CHAR(2),
  tax_id      VARCHAR(64) UNIQUE,        -- VAT / Commercial Registration (ZATCA capture stub)
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- A tenant's local relationship to a partner identity.
CREATE TABLE IF NOT EXISTS tenant_partners (
  id                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id            UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  partner_identity_id  UUID NOT NULL REFERENCES partner_identities(id),
  display_name         VARCHAR(255) NOT NULL,
  partner_type         VARCHAR(50),                          -- referral / reseller / strategic / affiliate
  lifecycle_stage      VARCHAR(50) NOT NULL DEFAULT 'prospect',
  status               VARCHAR(30) NOT NULL DEFAULT 'active',
  created_at           TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (tenant_id, partner_identity_id)
);
CREATE INDEX IF NOT EXISTS idx_tenant_partners_tenant ON tenant_partners(tenant_id);

-- Append-only audit log (SOC 2-grade). Rows here are INSERT-only: never UPDATE,
-- never DELETE. Every state change in the Phase-1 system writes one row.
CREATE TABLE IF NOT EXISTS audit_log (
  id             BIGSERIAL PRIMARY KEY,
  tenant_id      UUID REFERENCES tenants(id),
  actor_user_id  INTEGER REFERENCES users(id),
  action         VARCHAR(80) NOT NULL,
  entity_type    VARCHAR(60) NOT NULL,
  entity_id      VARCHAR(64),
  metadata       JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_audit_tenant_created ON audit_log(tenant_id, created_at DESC);

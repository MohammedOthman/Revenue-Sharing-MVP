-- 009_tenant_enforcement
-- Turn on tenant isolation for the request path. The API now serves requests as
-- the non-superuser reven_app role (see config/database.js + middleware/
-- tenantScope.js), so the row-level security policies from migrations 004-008
-- apply. This migration closes two remaining gaps.
--
-- 1. Older client tables were created before the tenant model, and their INSERT
--    statements do not name tenant_id. Give those columns a DEFAULT that reads
--    the per-request tenant GUC, so a row inserted inside a request lands in the
--    caller's tenant and satisfies the RLS WITH CHECK — without having to thread
--    tenant_id through every model. Under the owner connection (migrations,
--    seed) the GUC is unset, the default resolves to NULL, and explicit values
--    still win, so bootstrap behavior is unchanged.
--
-- 2. audit_events had no RLS, so the append-only history was readable across
--    tenants through GET /api/audit. Enable the same tenant-isolation policy;
--    audit rows are written with tenant_id = the request tenant already.

DO $$
DECLARE t text;
BEGIN
  FOREACH t IN ARRAY ARRAY[
    'partners', 'contracts', 'revenue_shares', 'kpis', 'legal_documents',
    'contract_amendments', 'audit_events'
  ]
  LOOP
    EXECUTE format(
      'ALTER TABLE %I ALTER COLUMN tenant_id SET DEFAULT '
      || 'NULLIF(current_setting(''app.current_tenant_id'', true), '''')::int',
      t
    );
  END LOOP;
END $$;

ALTER TABLE audit_events ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS tenant_isolation ON audit_events;
CREATE POLICY tenant_isolation ON audit_events
  USING (tenant_id = NULLIF(current_setting('app.current_tenant_id', true), '')::int)
  WITH CHECK (tenant_id = NULLIF(current_setting('app.current_tenant_id', true), '')::int);

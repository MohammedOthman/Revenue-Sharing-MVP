-- 004_row_level_security
-- Enforce tenant isolation at the database level (roadmap Phase 2 exit gate:
-- "Tenant A cannot access Tenant B").
--
-- How it works:
--  * The API connects as a dedicated NON-superuser role (reven_app) so that
--    row-level security actually applies to it. Migrations and the seed run as
--    the owner/superuser, which bypasses RLS (tables are ENABLE, not FORCE), so
--    admin/bootstrap operations keep working.
--  * Each request sets a per-connection GUC `app.current_tenant_id`; policies
--    only expose/allow rows whose tenant_id matches it. If the GUC is unset,
--    current_setting(..., true) is NULL and no rows match — deny by default.

-- Application role the backend connects as. In production, grant it a password
-- out-of-band (ALTER ROLE reven_app PASSWORD '...'); locally it uses trust auth.
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'reven_app') THEN
    CREATE ROLE reven_app LOGIN;
  END IF;
END
$$;

GRANT USAGE ON SCHEMA public TO reven_app;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO reven_app;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO reven_app;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO reven_app;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT USAGE, SELECT ON SEQUENCES TO reven_app;

-- Enable RLS + a tenant-isolation policy on every client-owned table.
DO $$
DECLARE
  t text;
BEGIN
  FOREACH t IN ARRAY ARRAY[
    'partners', 'contracts', 'revenue_shares', 'kpis', 'legal_documents', 'contract_amendments'
  ]
  LOOP
    EXECUTE format('ALTER TABLE %I ENABLE ROW LEVEL SECURITY', t);
    EXECUTE format('DROP POLICY IF EXISTS tenant_isolation ON %I', t);
    -- NULLIF(..., '') so an unset OR reset (empty-string) GUC becomes NULL and
    -- matches no rows (deny by default) rather than raising ''::int.
    EXECUTE format($f$
      CREATE POLICY tenant_isolation ON %I
        USING (tenant_id = NULLIF(current_setting('app.current_tenant_id', true), '')::int)
        WITH CHECK (tenant_id = NULLIF(current_setting('app.current_tenant_id', true), '')::int)
    $f$, t);
  END LOOP;
END
$$;

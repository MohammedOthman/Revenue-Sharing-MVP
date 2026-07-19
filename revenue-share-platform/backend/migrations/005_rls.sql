-- 005_rls.sql
-- Enable Row Level Security deny-by-default on every public table.
--
-- Why: on Supabase, every public table is exposed through the auto-generated
-- PostgREST API to the anon/authenticated roles (the public "anon key"). Without
-- RLS, anyone with that key could read/write claims, the ledger, and tax_ids
-- directly, bypassing the backend. The backend connects as a role with
-- rolbypassrls=true (postgres / service_role), so enabling RLS with NO policies
-- denies the public API while leaving the backend fully functional.
--
-- Add a policy later ONLY if a client should reach a specific table directly via
-- the Supabase API. On a plain (non-Supabase) Postgres this is inert protection.
DO $$
DECLARE r RECORD;
BEGIN
  FOR r IN SELECT tablename FROM pg_tables WHERE schemaname = 'public' LOOP
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', r.tablename);
  END LOOP;
END $$;

-- Pin the append-only trigger function's search_path (hardening).
ALTER FUNCTION public.reven_block_mutation() SET search_path = '';

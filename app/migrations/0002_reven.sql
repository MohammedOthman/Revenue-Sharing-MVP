-- Reven partnership action runtime. Tenant isolation is user_id on every row
-- (application-enforced; Neon pooled connections cannot hold session RLS vars).
-- Unique indexes are always (user_id, …) so tenant two cannot collide with tenant one.

create table if not exists partners (
  id text primary key,
  user_id text not null,
  name text not null,
  partner_type text not null,
  lifecycle_status text not null default 'active',
  created_at timestamptz not null default now()
);
create unique index if not exists partners_user_name_idx on partners (user_id, name);
create index if not exists partners_user_idx on partners (user_id);

create table if not exists agreements (
  id text primary key,
  user_id text not null,
  partner_id text not null,
  rate_bps integer not null,
  payout_trigger text not null,
  protection_days integer not null default 90,
  status text not null default 'active',
  currency text not null default 'SAR',
  created_at timestamptz not null default now()
);
create index if not exists agreements_user_idx on agreements (user_id);
create index if not exists agreements_partner_idx on agreements (user_id, partner_id);

create table if not exists claims (
  id text primary key,
  user_id text not null,
  partner_id text not null,
  agreement_id text,
  account_name text not null,
  pipeline_amount_minor integer not null,
  attributed_pct integer,
  attributed_amount_minor integer,
  revenue_amount_minor integer,
  revenue_stage text,
  revenue_reference text,
  eligible_amount_minor integer,
  eligibility_status text,
  eligibility_explanation text,
  payout_recorded_minor integer,
  payout_reference text,
  status text not null,
  preflight_status text,
  preflight_reasons text,
  currency text not null default 'SAR',
  version integer not null default 1,
  created_at timestamptz not null default now()
);
create index if not exists claims_user_idx on claims (user_id);
create index if not exists claims_partner_idx on claims (user_id, partner_id);
create index if not exists claims_account_idx on claims (user_id, partner_id, account_name);

create table if not exists journals (
  id text primary key,
  user_id text not null,
  claim_id text not null,
  event text not null,
  idempotency_key text not null,
  currency text not null,
  memo text not null,
  created_at timestamptz not null default now()
);
create unique index if not exists journals_idempotency_idx on journals (user_id, idempotency_key);
create index if not exists journals_claim_idx on journals (user_id, claim_id);

create table if not exists ledger_entries (
  id serial primary key,
  journal_id text not null,
  user_id text not null,
  account text not null,
  direction text not null,
  amount_minor integer not null
);
create index if not exists ledger_entries_user_idx on ledger_entries (user_id);
create index if not exists ledger_entries_journal_idx on ledger_entries (journal_id);

create table if not exists action_runs (
  id text primary key,
  user_id text not null,
  action_type text not null,
  object_type text not null,
  object_id text,
  status text not null,
  idempotency_key text not null,
  actor text not null,
  input_json text not null default '{}',
  result_json text not null default '{}',
  error text,
  created_at timestamptz not null default now()
);
create unique index if not exists action_runs_idempotency_idx on action_runs (user_id, idempotency_key);
create index if not exists action_runs_user_created_idx on action_runs (user_id, created_at desc);

create table if not exists events (
  id text primary key,
  user_id text not null,
  run_id text,
  type text not null,
  payload_json text not null default '{}',
  created_at timestamptz not null default now()
);
create index if not exists events_user_created_idx on events (user_id, created_at desc);

create table if not exists recipes (
  id text primary key,
  user_id text not null,
  recipe_key text not null,
  name text not null,
  description text not null,
  status text not null default 'active',
  last_run_at timestamptz,
  last_status text,
  run_count integer not null default 0
);
create unique index if not exists recipes_user_key_idx on recipes (user_id, recipe_key);

create table if not exists statements (
  id text primary key,
  user_id text not null,
  partner_id text not null,
  period text not null,
  eligible_minor integer not null default 0,
  recorded_minor integer not null default 0,
  status text not null default 'draft',
  created_at timestamptz not null default now()
);
create unique index if not exists statements_period_idx on statements (user_id, partner_id, period);

create table if not exists api_keys (
  id text primary key,
  user_id text not null,
  name text not null,
  prefix text not null,
  hash text not null,
  last_used_at timestamptz,
  created_at timestamptz not null default now()
);
create unique index if not exists api_keys_hash_idx on api_keys (hash);
create index if not exists api_keys_user_idx on api_keys (user_id);

create table if not exists webhook_deliveries (
  id text primary key,
  user_id text not null,
  action_type text not null,
  run_id text,
  status text not null,
  payload_json text not null default '{}',
  error text,
  created_at timestamptz not null default now()
);
create index if not exists webhook_deliveries_user_idx on webhook_deliveries (user_id, created_at desc);

create table if not exists workspaces (
  user_id text primary key,
  name text not null,
  seeded_at timestamptz not null default now()
);

-- Durable outbox. Recipes consume these rows; they never fire inside the verb handler.

create table if not exists outbox (
  id text primary key,
  user_id text not null,
  event_id text not null,
  recipe_key text not null,
  payload_json text not null default '{}',
  status text not null default 'pending',
  attempts integer not null default 0,
  last_error text,
  created_at timestamptz not null default now(),
  processed_at timestamptz
);
create index if not exists outbox_pending_idx on outbox (user_id, status, created_at);
create index if not exists outbox_user_idx on outbox (user_id);

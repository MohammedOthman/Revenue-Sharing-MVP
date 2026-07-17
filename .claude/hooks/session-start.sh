#!/bin/bash
# SessionStart hook: bring up PostgreSQL end-to-end for the backend so tests,
# migrations, and the app work immediately in every Claude Code (web) session.
# Idempotent and safe to re-run (startup / resume / clear / compact).
set -euo pipefail

# Only run in the remote (web) environment; a local machine manages its own DB.
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

ROOT="${CLAUDE_PROJECT_DIR:-$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)}"
BACKEND="$ROOT/revenue-share-platform/backend"

# --- Locate the PostgreSQL server binaries (highest installed version) ---
PGCTL="$(ls /usr/lib/postgresql/*/bin/pg_ctl 2>/dev/null | sort -V | tail -1 || true)"
if [ -z "$PGCTL" ]; then
  echo "session-start: PostgreSQL server binaries not found; skipping DB bring-up." >&2
  exit 0
fi
PGBIN="$(dirname "$PGCTL")"

DATA=/tmp/reven-pgdata
PORT=5433
LOG=/tmp/reven-pg.log
DB_NAME=revenue_share

# Postgres cannot run as root, so use a dedicated OS user.
id postgres >/dev/null 2>&1 || useradd -m postgres
mkdir -p "$DATA"
chown -R postgres "$DATA"
chmod 700 "$DATA"

as_pg() { runuser -u postgres -- "$@"; }

# --- Initialize the cluster once ---
if [ ! -f "$DATA/PG_VERSION" ]; then
  as_pg "$PGBIN/initdb" -D "$DATA" -U postgres -A trust >/dev/null
fi

# --- Start the server if it is not already accepting connections ---
if ! as_pg "$PGBIN/pg_isready" -h 127.0.0.1 -p "$PORT" -U postgres >/dev/null 2>&1; then
  # A reclaimed server leaves a stale pid file; remove it before starting.
  rm -f "$DATA/postmaster.pid"
  as_pg "$PGBIN/pg_ctl" -D "$DATA" -o "-p $PORT -k /tmp" -l "$LOG" start >/dev/null
  # Wait for readiness.
  for _ in $(seq 1 30); do
    as_pg "$PGBIN/pg_isready" -h 127.0.0.1 -p "$PORT" -U postgres >/dev/null 2>&1 && break
    sleep 1
  done
fi

# --- Create the database if missing ---
if ! as_pg psql -h 127.0.0.1 -p "$PORT" -U postgres -tAc \
      "SELECT 1 FROM pg_database WHERE datname='$DB_NAME'" | grep -q 1; then
  as_pg "$PGBIN/createdb" -h 127.0.0.1 -p "$PORT" -U postgres "$DB_NAME"
fi

# --- Backend DB config for the app (dotenv) and for the session shells ---
DB_HOST=127.0.0.1
DB_USER=postgres
DB_PASSWORD=postgres
JWT_SECRET=local-dev-secret-at-least-32-characters-long

if [ ! -f "$BACKEND/.env" ]; then
  cat > "$BACKEND/.env" <<ENV
PORT=5000
NODE_ENV=development
DB_HOST=$DB_HOST
DB_PORT=$PORT
DB_NAME=$DB_NAME
DB_USER=$DB_USER
DB_PASSWORD=$DB_PASSWORD
JWT_SECRET=$JWT_SECRET
ENV
fi

# Persist connection settings for this session's shells (psql, npm, tests).
if [ -n "${CLAUDE_ENV_FILE:-}" ]; then
  {
    echo "export DB_HOST=$DB_HOST DB_PORT=$PORT DB_NAME=$DB_NAME DB_USER=$DB_USER DB_PASSWORD=$DB_PASSWORD"
    echo "export JWT_SECRET=$JWT_SECRET"
    echo "export RUN_DB_TESTS=1"
    echo "export PGHOST=$DB_HOST PGPORT=$PORT PGUSER=$DB_USER PGDATABASE=$DB_NAME"
  } >> "$CLAUDE_ENV_FILE"
fi

# --- Install backend deps (prefer install for container-cache reuse), migrate ---
export DB_HOST DB_PORT="$PORT" DB_NAME DB_USER DB_PASSWORD JWT_SECRET
cd "$BACKEND"
[ -d node_modules ] || npm install --no-audit --no-fund
npm run migrate

# Seed only when the dataset is empty, so a resumed session never loses work.
COUNT="$(as_pg psql -h 127.0.0.1 -p "$PORT" -U postgres -d "$DB_NAME" -tAc \
  "SELECT COUNT(*) FROM partners" 2>/dev/null || echo 0)"
if [ "${COUNT:-0}" = "0" ]; then
  npm run seed
fi

echo "session-start: PostgreSQL ready on 127.0.0.1:$PORT (db=$DB_NAME); migrations applied."

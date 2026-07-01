#!/usr/bin/env bash
# Boots the revenue-share-platform (Express API + Vite frontend) on Replit.
set -euo pipefail

cd "$(dirname "$0")/revenue-share-platform"

if [ -z "${JWT_SECRET:-}" ]; then
  echo "WARNING: JWT_SECRET is not set - add it in Replit Secrets or login/register will fail." >&2
fi
if [ -z "${DATABASE_URL:-}" ] && [ -z "${DB_HOST:-}" ] && [ -z "${PGHOST:-}" ]; then
  echo "WARNING: no database configured - create the built-in PostgreSQL database (Tools > Database) so DATABASE_URL is set." >&2
fi

if [ ! -d backend/node_modules ]; then (cd backend && npm install); fi
if [ ! -d frontend/node_modules ]; then (cd frontend && npm install); fi

(cd backend && npm start) &
backend_pid=$!
(cd frontend && npm run dev) &
frontend_pid=$!

trap 'kill "$backend_pid" "$frontend_pid" 2>/dev/null' INT TERM
wait

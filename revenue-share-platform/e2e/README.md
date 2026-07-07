# Browser E2E — full lifecycle regression

Drives the real UI end-to-end with Playwright: login (incl. wrong password),
partner create/edit, contract, revenue with server-computed share, payout,
KPI value update, legal document, dashboard totals + audit activity,
deep-link session refresh, and invalid-token redirect.

Prereqs: a running production-mode stack (API serving the built frontend)
with a fresh database and one admin user, plus `npm i playwright-core` and
a Chromium binary.

```bash
E2E_BASE_URL=http://localhost:5000 CHROMIUM_PATH=/path/to/chromium node browser-flow.mjs
```

Exits non-zero on any failure; screenshots land next to the script.

# Reven — Partner Revenue OS

The system of record and control layer for partner-sourced revenue. This folder
holds the **Reven web app**: a React + Vite frontend that runs on a **Base44**
backend (entities, auth, integrations). Brand truth lives in
[`../BRAND.md`](../BRAND.md).

- **`frontend/`** — the Reven app (React 18 + Vite + Motion), connected to the
  Base44 `RevenueOS` app via `@base44/sdk`. **This is what you run and deploy.**
- **`backend/`** — a legacy Express + Postgres prototype from the original MVP.
  It is **not used** by the app (kept only as reference) and is not deployed.

## What it does

The PRD's core loop, end to end: register a partner-revenue **claim** → a human
decides the **Attribution of Record** (credit %, accept/reject) → **eligibility**
is previewed *with an explanation* and missing-condition list → the **first-payout
milestone** is recorded (Phase 1 records, never executes — no money moves).
Surfaces: Command Center, Partners, Programs, Agreements, Claims, Attribution,
Statements, Disputes, Cadence, Audit.

## Run locally

```bash
cd frontend
npm install
npm run dev        # http://localhost:3000
```

The app points at the Base44 `RevenueOS` app by default, so it loads live data.
Sign in with **Continue with single sign-on** (your Base44 / Google identity).

## Configuration

Environment (Vite — prefix `VITE_`). Copy `frontend/.env.example` to
`frontend/.env` to override:

| Variable | Default | Purpose |
|---|---|---|
| `VITE_BASE44_APP_ID` | `6a1bb5b45bd19dd135d3d57e` | The Base44 app (public client id) |

## Build

```bash
cd frontend
npm run build      # outputs frontend/dist/
npm run preview    # serve the production build locally
```

## Deploy (Netlify)

The repo includes [`../netlify.toml`](../netlify.toml) and
`frontend/public/_redirects`, so a Git-connected Netlify site deploys with no
manual settings:

- **Base directory:** `revenue-share-platform/frontend`
- **Build command:** `npm run build`
- **Publish directory:** `dist` (relative to base)
- **SPA fallback:** `/* → /index.html 200` (already configured — without it,
  refreshing a route like `/claims` 404s)

Other static hosts (Vercel, Cloudflare Pages) work the same way: build the
`frontend/` subfolder, publish `dist/`, and add an SPA rewrite.

### One required step in Base44 (not in this repo)

After deploying, **add your deployed domain to the Base44 `RevenueOS` app's
allowed origins / redirect URLs**. Until you do, the SDK's requests and the SSO
sign-in redirect are blocked from your custom domain, so login and data loading
will fail on the live site (they work on `localhost` during development).

## Tech

React 18, Vite 5, React Router 6, Motion (framer-motion), `@base44/sdk`.
No Tailwind — a hand-authored design system in `frontend/src/styles/` governed
by the anti-slop design law.

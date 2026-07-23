import { createClient } from '@base44/sdk';

/**
 * Reven's backend is a Base44 app ("RevenueOS"). The App ID is a public client
 * identifier — it ships in the browser bundle by design (like a project ref),
 * so it is safe to commit. Override per environment with VITE_BASE44_APP_ID.
 */
const DEFAULT_APP_ID = '6a1bb5b45bd19dd135d3d57e';

export const APP_ID = import.meta.env.VITE_BASE44_APP_ID || DEFAULT_APP_ID;

/**
 * requiresAuth is false on purpose: Reven owns its sign-in screen and route
 * guard, so the SDK must never hard-redirect to Base44's hosted login. Auth is
 * driven explicitly through base44.auth (see services/auth.service.js).
 */
export const base44 = createClient({
  appId: APP_ID,
  requiresAuth: false,
});

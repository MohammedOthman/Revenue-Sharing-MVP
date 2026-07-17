import { getMembershipsByUser } from '../models/membership.model.js';

/**
 * Tenant resolution for the multi-tenant model.
 *
 * NOTE: This middleware is intentionally NOT globally mounted yet. Turning on
 * enforcement means resolving the tenant here, scoping every query by
 * tenant_id, and adding PostgreSQL row-level security with a per-request
 * session variable — a change that must be applied and proven against a live
 * database (including a "Tenant A cannot read Tenant B" test). The pure
 * resolver below encodes the intended access rule and is unit-tested now.
 */

/**
 * Decide which tenant a request acts on.
 *  - If a tenant is explicitly requested (e.g. an X-Tenant-Id header), the user
 *    must be an active member of it, otherwise access is denied (null).
 *  - If none is requested and the user belongs to exactly one tenant, use it.
 *  - Otherwise it is ambiguous or the user has no tenant → null.
 *
 * Returns the resolved numeric tenant id, or null when access should be denied.
 */
export const resolveTenantId = (requestedTenantId, memberships) => {
  const activeIds = (memberships || [])
    .filter((m) => m.status === 'active')
    .map((m) => Number(m.tenant_id));

  if (requestedTenantId !== undefined && requestedTenantId !== null && requestedTenantId !== '') {
    const requested = Number(requestedTenantId);
    if (Number.isNaN(requested)) return null;
    return activeIds.includes(requested) ? requested : null;
  }

  if (activeIds.length === 1) return activeIds[0];
  return null;
};

/**
 * Express middleware form. Attaches req.tenantId when it can be resolved,
 * otherwise responds 403. Wire this in once query scoping + RLS are enabled.
 */
export const tenantContext = async (req, res, next) => {
  try {
    const memberships = await getMembershipsByUser(req.user.id);
    const tenantId = resolveTenantId(req.headers['x-tenant-id'], memberships);
    if (!tenantId) {
      return res.status(403).json({ error: 'No accessible tenant for this request' });
    }
    req.tenantId = tenantId;
    next();
  } catch (error) {
    console.error('Tenant resolution error:', error);
    res.status(500).json({ error: 'Failed to resolve tenant' });
  }
};

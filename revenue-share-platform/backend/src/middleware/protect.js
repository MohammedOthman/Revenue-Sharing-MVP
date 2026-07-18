import { authMiddleware } from './auth.js';
import { tenantContext } from './tenant.js';
import { tenantScope } from './tenantScope.js';

/**
 * Standard middleware chain for tenant-scoped, authenticated API routes:
 * authenticate the caller, resolve which tenant the request acts on, then open
 * a tenant-scoped database transaction so row-level security applies to every
 * query in the request.
 */
export const protect = [authMiddleware, tenantContext, tenantScope];

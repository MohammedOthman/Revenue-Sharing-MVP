import { appPool, requestContext } from '../config/database.js';

/**
 * Open a tenant-scoped database transaction for the request and make it the
 * active connection for every model query (through requestContext + dbQuery).
 *
 * The connection comes from the reven_app pool, so PostgreSQL row-level security
 * applies. We set app.current_tenant_id (transaction-local) to req.tenantId; the
 * RLS policies read it, so reads and writes are confined to the caller's tenant.
 *
 * SET LOCAL ties the tenant setting to the transaction, so it always disappears
 * when the transaction ends — a pooled connection can never carry one tenant's
 * context into another request. The transaction commits when the response
 * finishes successfully (status < 400) and rolls back otherwise or if the client
 * disconnects first.
 *
 * Mount after authMiddleware + tenantContext, which resolve req.user/req.tenantId.
 */
export const tenantScope = (req, res, next) => {
  appPool
    .connect()
    .then((client) => {
      let settled = false;
      const settle = async (commit) => {
        if (settled) return;
        settled = true;
        try {
          await client.query(commit ? 'COMMIT' : 'ROLLBACK');
        } catch (err) {
          console.error('tenantScope: closing transaction failed:', err.message);
        } finally {
          client.release();
        }
      };

      // Commit on a successful response; roll back on error status or an aborted
      // connection. The guard makes double-firing (finish then close) harmless.
      res.on('finish', () => settle(res.statusCode < 400));
      res.on('close', () => settle(false));

      requestContext.run({ client, tenantId: req.tenantId }, async () => {
        try {
          await client.query('BEGIN');
          await client.query(
            "SELECT set_config('app.current_tenant_id', $1, true)",
            [String(req.tenantId)]
          );
          next();
        } catch (err) {
          await settle(false);
          next(err);
        }
      });
    })
    .catch(next);
};

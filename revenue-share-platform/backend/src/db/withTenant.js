import pool from '../config/database.js';

/**
 * Run database work scoped to a single tenant. Checks out one connection, opens
 * a transaction, sets the per-connection GUC that the RLS policies read
 * (app.current_tenant_id), runs the callback with that client, then commits
 * (or rolls back on error) and releases the connection.
 *
 * SET LOCAL confines the GUC to the transaction, so a pooled connection never
 * leaks one tenant's context into another request.
 *
 * Enforcement is only active when the app connects as the non-superuser
 * `reven_app` role (see migration 004); as a superuser/owner, RLS is bypassed.
 *
 *   const rows = await withTenant(req.tenantId, (client) =>
 *     client.query('SELECT * FROM partners').then(r => r.rows));
 */
export const withTenant = async (tenantId, callback) => {
  if (tenantId === undefined || tenantId === null) {
    throw new Error('withTenant requires a tenantId');
  }
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    // set_config(name, value, is_local=true) — transaction-scoped, parameterized.
    await client.query("SELECT set_config('app.current_tenant_id', $1, true)", [String(tenantId)]);
    const result = await callback(client);
    await client.query('COMMIT');
    return result;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

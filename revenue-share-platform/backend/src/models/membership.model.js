import pool from '../config/database.js';

/**
 * Memberships link a global user to a tenant with a scoped role. This is the
 * basis for tenant isolation and role-based access in the multi-tenant model.
 */

export const getMembershipsByUser = async (userId) => {
  const result = await pool.query(
    `SELECT m.*, t.slug AS tenant_slug, t.name AS tenant_name, t.deployment_type
     FROM memberships m
     JOIN tenants t ON m.tenant_id = t.id
     WHERE m.user_id = $1 AND m.status = 'active'
     ORDER BY t.name`,
    [userId]
  );
  return result.rows;
};

export const getMembership = async (userId, tenantId) => {
  const result = await pool.query(
    'SELECT * FROM memberships WHERE user_id = $1 AND tenant_id = $2',
    [userId, tenantId]
  );
  return result.rows[0];
};

export const createMembership = async ({ userId, tenantId, role = 'member', status = 'active' }) => {
  const result = await pool.query(
    `INSERT INTO memberships (user_id, tenant_id, role, status)
     VALUES ($1, $2, $3, $4)
     ON CONFLICT (user_id, tenant_id)
     DO UPDATE SET role = EXCLUDED.role, status = EXCLUDED.status, updated_at = CURRENT_TIMESTAMP
     RETURNING *`,
    [userId, tenantId, role, status]
  );
  return result.rows[0];
};

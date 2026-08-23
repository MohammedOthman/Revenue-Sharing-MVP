import { randomUUID } from 'node:crypto';
import pool, { withTransaction } from '../config/database.js';
import { HttpError } from '../lib/http.js';
import { hashPassword } from '../utils/password.js';

const serialize = (row) => ({
  id: row.id,
  email: row.email,
  fullName: row.full_name,
  role: row.role,
  status: row.status,
  createdAt: row.created_at,
  lastLoginAt: row.last_login_at,
});

async function audit(client, context, action, user, changedFields) {
  await client.query(
    `INSERT INTO reven_audit_log
      (id, organization_id, actor_id, actor_name, action, entity_type, record_id,
       record_label, details, changed_fields, request_id)
     VALUES ($1, $2, $3, $4, $5, 'User', $6, $7, $8, $9::jsonb, $10)`,
    [
      randomUUID(),
      context.organizationId,
      context.userId,
      context.actorName,
      action,
      user.id,
      user.email,
      `User ${action}`,
      JSON.stringify(changedFields),
      context.requestId,
    ],
  );
}

export async function listUsers(organizationId) {
  const result = await pool.query(
    `SELECT id, email, full_name, role, status, created_at, last_login_at
       FROM reven_users
      WHERE organization_id = $1
      ORDER BY created_at ASC`,
    [organizationId],
  );
  return result.rows.map(serialize);
}

export async function createUser(context, input) {
  const passwordHash = await hashPassword(input.password);
  try {
    return await withTransaction(async (client) => {
      const result = await client.query(
        `INSERT INTO reven_users
          (id, organization_id, email, password_hash, full_name, role, must_change_password)
         VALUES ($1, $2, lower($3), $4, $5, $6, TRUE)
         RETURNING id, email, full_name, role, status, created_at, last_login_at`,
        [randomUUID(), context.organizationId, input.email, passwordHash, input.fullName, input.role],
      );
      await audit(client, context, 'create', result.rows[0], ['email', 'full_name', 'role']);
      return serialize(result.rows[0]);
    });
  } catch (error) {
    if (error.code === '23505') {
      throw new HttpError(409, 'EMAIL_EXISTS', 'A user with this email already exists.');
    }
    throw error;
  }
}

export async function updateUser(context, targetId, updates) {
  return withTransaction(async (client) => {
    const current = await client.query(
      `SELECT id, email, full_name, role, status, created_at, last_login_at
         FROM reven_users
        WHERE organization_id = $1 AND id = $2
        FOR UPDATE`,
      [context.organizationId, targetId],
    );
    const user = current.rows[0];
    if (!user) throw new HttpError(404, 'USER_NOT_FOUND', 'User not found.');

    const nextRole = updates.role ?? user.role;
    const nextStatus = updates.status ?? user.status;
    if (targetId === context.userId && nextStatus !== 'active') {
      throw new HttpError(400, 'SELF_DISABLE_BLOCKED', 'You cannot disable your own account.');
    }
    if (user.role === 'admin' && (nextRole !== 'admin' || nextStatus !== 'active')) {
      const admins = await client.query(
        `SELECT COUNT(*)::int AS count
           FROM reven_users
          WHERE organization_id = $1 AND role = 'admin' AND status = 'active'`,
        [context.organizationId],
      );
      if (admins.rows[0].count <= 1) {
        throw new HttpError(400, 'LAST_ADMIN', 'The organization must retain one active administrator.');
      }
    }

    const passwordHash = updates.password ? await hashPassword(updates.password) : null;
    const result = await client.query(
      `UPDATE reven_users
          SET full_name = COALESCE($1, full_name),
              role = COALESCE($2, role),
              status = COALESCE($3, status),
              password_hash = COALESCE($4, password_hash),
              must_change_password = CASE WHEN $4::text IS NULL THEN must_change_password ELSE TRUE END,
              updated_at = NOW()
        WHERE organization_id = $5 AND id = $6
       RETURNING id, email, full_name, role, status, created_at, last_login_at`,
      [updates.fullName, updates.role, updates.status, passwordHash, context.organizationId, targetId],
    );
    if (nextStatus !== 'active' || passwordHash) {
      await client.query('DELETE FROM reven_sessions WHERE user_id = $1', [targetId]);
    }
    const changed = Object.keys(updates).map((key) => (key === 'password' ? 'password_hash' : key));
    await audit(client, context, 'update', result.rows[0], changed);
    return serialize(result.rows[0]);
  });
}

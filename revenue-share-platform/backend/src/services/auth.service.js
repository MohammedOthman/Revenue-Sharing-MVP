import { createHash, randomBytes, randomUUID } from 'node:crypto';
import pool, { withTransaction } from '../config/database.js';
import { env } from '../config/env.js';
import { HttpError } from '../lib/http.js';
import { comparePassword, consumePasswordHashTime, hashPassword } from '../utils/password.js';

const tokenHash = (token) => createHash('sha256').update(token).digest('hex');

const userProjection = `
  u.id,
  u.organization_id,
  u.email,
  u.full_name,
  u.role,
  u.status,
  u.must_change_password,
  o.name AS organization_name
`;

export function serializeUser(user) {
  return {
    id: user.id,
    _id: user.id,
    email: user.email,
    full_name: user.full_name,
    fullName: user.full_name,
    name: user.full_name,
    role: user.role,
    mustChangePassword: user.must_change_password,
    organization: { id: user.organization_id, name: user.organization_name },
  };
}

export async function bootstrapAdmin() {
  if (!env.ADMIN_EMAIL) {
    const existing = await pool.query('SELECT COUNT(*)::int AS count FROM reven_users');
    if (existing.rows[0].count === 0) {
      throw new Error('Initial administrator environment variables are required for an empty database.');
    }
    return { created: false, reason: 'already_initialized' };
  }

  return withTransaction(async (client) => {
    await client.query('SELECT pg_advisory_xact_lock($1)', [772025]);
    const existing = await client.query('SELECT COUNT(*)::int AS count FROM reven_users');
    if (existing.rows[0].count > 0) return { created: false, reason: 'already_initialized' };

    const organizationId = randomUUID();
    const userId = randomUUID();
    const passwordHash = await hashPassword(env.ADMIN_PASSWORD);
    await client.query(
      'INSERT INTO reven_organizations (id, name) VALUES ($1, $2)',
      [organizationId, env.ORGANIZATION_NAME],
    );
    await client.query(
      `INSERT INTO reven_users
        (id, organization_id, email, password_hash, full_name, role)
       VALUES ($1, $2, lower($3), $4, $5, 'admin')`,
      [userId, organizationId, env.ADMIN_EMAIL, passwordHash, env.ADMIN_NAME],
    );
    await client.query(
      `INSERT INTO reven_audit_log
        (id, organization_id, actor_id, actor_name, action, entity_type, record_id, record_label, details)
       VALUES ($1, $2, $3, $4, 'bootstrap', 'User', $3, $5, 'Initial administrator created')`,
      [randomUUID(), organizationId, userId, env.ADMIN_NAME, env.ADMIN_EMAIL],
    );
    return { created: true, email: env.ADMIN_EMAIL };
  });
}

export async function login({ email, password, ipAddress, userAgent }) {
  const result = await pool.query(
    `SELECT ${userProjection}, u.password_hash
       FROM reven_users u
       JOIN reven_organizations o ON o.id = u.organization_id
      WHERE lower(u.email) = lower($1)
      LIMIT 1`,
    [email],
  );
  const user = result.rows[0];

  if (!user) {
    await consumePasswordHashTime(password);
    throw new HttpError(401, 'INVALID_CREDENTIALS', 'The email or password is incorrect.');
  }
  const matches = await comparePassword(password, user.password_hash);
  if (!matches || user.status !== 'active') {
    throw new HttpError(401, 'INVALID_CREDENTIALS', 'The email or password is incorrect.');
  }

  const token = randomBytes(32).toString('base64url');
  const expiresAt = new Date(Date.now() + env.SESSION_TTL_HOURS * 60 * 60 * 1000);
  await withTransaction(async (client) => {
    await client.query(
      `INSERT INTO reven_sessions
        (id, user_id, token_hash, expires_at, ip_address, user_agent)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [randomUUID(), user.id, tokenHash(token), expiresAt, ipAddress, userAgent?.slice(0, 500)],
    );
    await client.query('UPDATE reven_users SET last_login_at = NOW() WHERE id = $1', [user.id]);
    await client.query('DELETE FROM reven_sessions WHERE expires_at <= NOW()');
  });

  return { token, expiresAt, user: serializeUser(user) };
}

export async function sessionUser(token) {
  if (!token) return null;
  const result = await pool.query(
    `SELECT ${userProjection}, s.id AS session_id
       FROM reven_sessions s
       JOIN reven_users u ON u.id = s.user_id
       JOIN reven_organizations o ON o.id = u.organization_id
      WHERE s.token_hash = $1
        AND s.expires_at > NOW()
        AND u.status = 'active'
      LIMIT 1`,
    [tokenHash(token)],
  );
  const user = result.rows[0];
  if (!user) return null;
  await pool.query(
    `UPDATE reven_sessions
        SET last_seen_at = NOW()
      WHERE id = $1 AND last_seen_at < NOW() - INTERVAL '5 minutes'`,
    [user.session_id],
  );
  return user;
}

export async function logout(token) {
  if (!token) return;
  await pool.query('DELETE FROM reven_sessions WHERE token_hash = $1', [tokenHash(token)]);
}

export async function changePassword({ userId, currentPassword, newPassword }) {
  const result = await pool.query('SELECT password_hash FROM reven_users WHERE id = $1', [userId]);
  const user = result.rows[0];
  if (!user || !(await comparePassword(currentPassword, user.password_hash))) {
    throw new HttpError(400, 'INVALID_CURRENT_PASSWORD', 'The current password is incorrect.');
  }
  const passwordHash = await hashPassword(newPassword);
  await withTransaction(async (client) => {
    await client.query(
      `UPDATE reven_users
          SET password_hash = $1, must_change_password = FALSE, updated_at = NOW()
        WHERE id = $2`,
      [passwordHash, userId],
    );
    await client.query('DELETE FROM reven_sessions WHERE user_id = $1', [userId]);
  });
}

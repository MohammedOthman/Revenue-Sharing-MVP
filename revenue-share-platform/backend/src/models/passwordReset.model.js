import crypto from 'crypto';
import pool from '../config/database.js';

const hashToken = (raw) => crypto.createHash('sha256').update(raw).digest('hex');

// Issues a single-use token; only the SHA-256 hash is stored. Any previously
// unused tokens for the same user+purpose are invalidated.
export const createResetToken = async (userId, purpose = 'reset', ttlMinutes = 60) => {
  const raw = crypto.randomBytes(32).toString('hex');
  await pool.query(
    `UPDATE password_reset_tokens SET used_at = CURRENT_TIMESTAMP
     WHERE user_id = $1 AND purpose = $2 AND used_at IS NULL`,
    [userId, purpose]
  );
  await pool.query(
    `INSERT INTO password_reset_tokens (user_id, token_hash, purpose, expires_at)
     VALUES ($1, $2, $3, CURRENT_TIMESTAMP + ($4 || ' minutes')::interval)`,
    [userId, hashToken(raw), purpose, String(ttlMinutes)]
  );
  return raw;
};

export const findValidToken = async (raw) => {
  const result = await pool.query(
    `SELECT t.id, t.user_id, t.purpose, u.email, u.full_name
     FROM password_reset_tokens t
     JOIN users u ON u.id = t.user_id
     WHERE t.token_hash = $1 AND t.used_at IS NULL AND t.expires_at > CURRENT_TIMESTAMP`,
    [hashToken(raw)]
  );
  return result.rows[0];
};

export const markTokenUsed = async (id) => {
  await pool.query('UPDATE password_reset_tokens SET used_at = CURRENT_TIMESTAMP WHERE id = $1', [id]);
};

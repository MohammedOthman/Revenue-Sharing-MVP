import pool from '../config/database.js';

export const insertAuditLog = async ({
  userId,
  userEmail,
  method,
  path,
  entity,
  entityId,
  statusCode,
  requestBody,
}) => {
  await pool.query(
    `INSERT INTO audit_logs (user_id, user_email, method, path, entity, entity_id, status_code, request_body)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
    [userId, userEmail, method, path, entity, entityId, statusCode, requestBody]
  );
};

export const getRecentActivity = async (limit = 10) => {
  const result = await pool.query(
    `SELECT id, user_email, method, path, entity, entity_id, created_at
     FROM audit_logs
     ORDER BY created_at DESC
     LIMIT $1`,
    [Math.min(limit, 100)]
  );
  return result.rows;
};

import { dbQuery } from '../config/database.js';

/**
 * Append-only audit trail. Events are inserted, never updated or deleted
 * (the database also enforces this via a trigger). Every state change worth
 * defending should record one.
 */

/**
 * Record an audit event.
 * @param queryFn injectable query function (defaults to the shared pool) so the
 *   recorder can be unit-tested without a database.
 */
export const recordAuditEvent = async (event, queryFn = dbQuery) => {
  const { tenantId, actorUserId, entityType, entityId, action, metadata } = event;
  if (!entityType || !action) {
    throw new Error('audit event requires entityType and action');
  }
  const result = await queryFn(
    `INSERT INTO audit_events (tenant_id, actor_user_id, entity_type, entity_id, action, metadata)
     VALUES ($1, $2, $3, $4, $5, $6::jsonb) RETURNING *`,
    [
      tenantId ?? null,
      actorUserId ?? null,
      entityType,
      entityId ?? null,
      action,
      JSON.stringify(metadata ?? {}),
    ]
  );
  return result.rows[0];
};

/**
 * Best-effort audit recording for use inside request handlers: never throws, so
 * an audit failure cannot fail the underlying operation. Logs on failure.
 */
export const safeAudit = async (event) => {
  try {
    await recordAuditEvent(event);
  } catch (error) {
    console.error('Failed to record audit event:', error.message);
  }
};

export const getAuditEvents = async (filters = {}) => {
  let query = `
    SELECT a.*, u.full_name AS actor_name
    FROM audit_events a
    LEFT JOIN users u ON a.actor_user_id = u.id
    WHERE 1=1
  `;
  const values = [];
  let n = 1;

  if (filters.entityType) {
    query += ` AND a.entity_type = $${n++}`;
    values.push(filters.entityType);
  }
  if (filters.entityId) {
    query += ` AND a.entity_id = $${n++}`;
    values.push(filters.entityId);
  }
  if (filters.actorUserId) {
    query += ` AND a.actor_user_id = $${n++}`;
    values.push(filters.actorUserId);
  }

  query += ' ORDER BY a.created_at DESC LIMIT 200';

  const result = await dbQuery(query, values);
  return result.rows;
};

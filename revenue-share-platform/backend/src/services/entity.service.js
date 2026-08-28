import { randomUUID } from 'node:crypto';
import pool, { withTransaction } from '../config/database.js';
import {
  assertEntityType,
  assertRecordMutationAuthorized,
  publicRecord,
  recordLabel,
  sanitizeRecordData,
} from '../domain/entities.js';
import { HttpError } from '../lib/http.js';

const MAX_LIMIT = 500;

async function writeAudit(client, context, action, type, recordId, data, changedFields = []) {
  await client.query(
    `INSERT INTO reven_audit_log
      (id, organization_id, actor_id, actor_name, action, entity_type, record_id,
       record_label, details, changed_fields, request_id)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10::jsonb, $11)`,
    [
      randomUUID(),
      context.organizationId,
      context.userId,
      context.actorName,
      action,
      type,
      recordId,
      recordLabel(data),
      `${type} ${action}`,
      JSON.stringify(changedFields),
      context.requestId,
    ],
  );
}

function parseFilter(filter) {
  if (!filter) return null;
  try {
    const parsed = JSON.parse(filter);
    if (!parsed || Array.isArray(parsed) || typeof parsed !== 'object') throw new Error();
    return parsed;
  } catch {
    throw new HttpError(400, 'INVALID_FILTER', 'The filter must be a JSON object.');
  }
}

function toAuditEvent(row) {
  return {
    id: row.id,
    _id: row.id,
    event_type: `${row.entity_type}_${row.action}`.toLowerCase(),
    entity_type: row.entity_type,
    record_id: row.record_id,
    record_label: row.record_label,
    details: row.details,
    changed_fields: row.changed_fields,
    actor: row.actor_name,
    severity: row.action === 'delete' ? 'warning' : 'info',
    event_date: row.created_at,
    recorded_date: row.created_at,
    created_date: row.created_at,
    updated_date: row.created_at,
    version: 1,
  };
}

export async function listRecords({ organizationId, type, sort, limit, filter }) {
  assertEntityType(type);
  const safeLimit = Math.min(Math.max(Number.parseInt(limit, 10) || 200, 1), MAX_LIMIT);
  const descending = String(sort || '-created_date').startsWith('-');
  const direction = descending ? 'DESC' : 'ASC';

  if (type === 'AuditEvent') {
    const result = await pool.query(
      `SELECT id, action, entity_type, record_id, record_label, details,
              changed_fields, actor_name, created_at
         FROM reven_audit_log
        WHERE organization_id = $1
        ORDER BY created_at ${direction}
        LIMIT $2`,
      [organizationId, safeLimit],
    );
    return result.rows.map(toAuditEvent);
  }

  const parsedFilter = parseFilter(filter);
  const params = [organizationId, type];
  let filterSql = '';
  if (parsedFilter) {
    params.push(JSON.stringify(parsedFilter));
    filterSql = ` AND data @> $${params.length}::jsonb`;
  }
  params.push(safeLimit);
  const result = await pool.query(
    `SELECT id, data, version, created_at, updated_at
       FROM reven_records
      WHERE organization_id = $1
        AND entity_type = $2
        AND deleted_at IS NULL
        ${filterSql}
      ORDER BY ${sort === 'updated_date' || sort === '-updated_date' ? 'updated_at' : 'created_at'} ${direction}
      LIMIT $${params.length}`,
    params,
  );
  return result.rows.map(publicRecord);
}

export async function getRecord({ organizationId, type, id }) {
  assertEntityType(type);
  if (type === 'AuditEvent') {
    const result = await pool.query(
      `SELECT id, action, entity_type, record_id, record_label, details,
              changed_fields, actor_name, created_at
         FROM reven_audit_log
        WHERE organization_id = $1 AND id = $2`,
      [organizationId, id],
    );
    if (!result.rows[0]) throw new HttpError(404, 'RECORD_NOT_FOUND', 'Record not found.');
    return toAuditEvent(result.rows[0]);
  }
  const result = await pool.query(
    `SELECT id, data, version, created_at, updated_at
       FROM reven_records
      WHERE organization_id = $1 AND entity_type = $2 AND id = $3 AND deleted_at IS NULL`,
    [organizationId, type, id],
  );
  if (!result.rows[0]) throw new HttpError(404, 'RECORD_NOT_FOUND', 'Record not found.');
  return publicRecord(result.rows[0]);
}

export async function createRecord(context, type, input) {
  const data = sanitizeRecordData(type, input);
  assertRecordMutationAuthorized(context, type, data);
  return withTransaction(async (client) => {
    const id = randomUUID();
    const result = await client.query(
      `INSERT INTO reven_records
        (id, organization_id, entity_type, data, created_by, updated_by)
       VALUES ($1, $2, $3, $4::jsonb, $5, $5)
       RETURNING id, data, version, created_at, updated_at`,
      [id, context.organizationId, type, JSON.stringify(data), context.userId],
    );
    await writeAudit(client, context, 'create', type, id, data, Object.keys(data));
    return publicRecord(result.rows[0]);
  });
}

export async function updateRecord(
  context,
  type,
  id,
  input,
  expectedVersion,
  { allowWorkflowFields = false } = {},
) {
  const updates = sanitizeRecordData(type, input, { partial: true, allowWorkflowFields });
  assertRecordMutationAuthorized(context, type, updates);
  if (Object.keys(updates).length === 0) {
    throw new HttpError(400, 'NO_CHANGES', 'At least one field must be supplied.');
  }

  return withTransaction(async (client) => {
    const params = [JSON.stringify(updates), context.userId, context.organizationId, type, id];
    let versionSql = '';
    if (expectedVersion !== undefined && expectedVersion !== null) {
      params.push(expectedVersion);
      versionSql = ` AND version = $${params.length}`;
    }
    const result = await client.query(
      `UPDATE reven_records
          SET data = data || $1::jsonb,
              updated_by = $2,
              updated_at = NOW(),
              version = version + 1
        WHERE organization_id = $3
          AND entity_type = $4
          AND id = $5
          AND deleted_at IS NULL
          ${versionSql}
       RETURNING id, data, version, created_at, updated_at`,
      params,
    );
    if (!result.rows[0]) {
      const exists = await client.query(
        `SELECT version FROM reven_records
          WHERE organization_id = $1 AND entity_type = $2 AND id = $3 AND deleted_at IS NULL`,
        [context.organizationId, type, id],
      );
      if (exists.rows[0]) {
        throw new HttpError(409, 'VERSION_CONFLICT', 'This record changed since it was loaded.', {
          currentVersion: exists.rows[0].version,
        });
      }
      throw new HttpError(404, 'RECORD_NOT_FOUND', 'Record not found.');
    }
    await writeAudit(client, context, 'update', type, id, result.rows[0].data, Object.keys(updates));
    return publicRecord(result.rows[0]);
  });
}

export async function deleteRecord(context, type, id) {
  assertEntityType(type, { writable: true });
  return withTransaction(async (client) => {
    const result = await client.query(
      `UPDATE reven_records
          SET deleted_at = NOW(), updated_by = $1, updated_at = NOW(), version = version + 1
        WHERE organization_id = $2 AND entity_type = $3 AND id = $4 AND deleted_at IS NULL
       RETURNING data`,
      [context.userId, context.organizationId, type, id],
    );
    if (!result.rows[0]) throw new HttpError(404, 'RECORD_NOT_FOUND', 'Record not found.');
    await writeAudit(client, context, 'delete', type, id, result.rows[0].data);
  });
}

export async function bulkCreateRecords(context, type, inputs) {
  if (!Array.isArray(inputs) || inputs.length === 0 || inputs.length > 100) {
    throw new HttpError(400, 'INVALID_BATCH', 'A batch must contain between 1 and 100 records.');
  }
  const records = inputs.map((input) => sanitizeRecordData(type, input));
  records.forEach((data) => assertRecordMutationAuthorized(context, type, data));
  return withTransaction(async (client) => {
    const created = [];
    for (const data of records) {
      const id = randomUUID();
      const result = await client.query(
        `INSERT INTO reven_records
          (id, organization_id, entity_type, data, created_by, updated_by)
         VALUES ($1, $2, $3, $4::jsonb, $5, $5)
         RETURNING id, data, version, created_at, updated_at`,
        [id, context.organizationId, type, JSON.stringify(data), context.userId],
      );
      await writeAudit(client, context, 'create', type, id, data, Object.keys(data));
      created.push(publicRecord(result.rows[0]));
    }
    return created;
  });
}

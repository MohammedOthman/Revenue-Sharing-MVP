import pool from '../config/database.js';

/**
 * Effective status of a protection window. A released window stays released;
 * otherwise it is expired once past ends_at, else active. Pure and testable.
 */
export const effectiveStatus = (endsAt, status, today = new Date()) => {
  if (status === 'released') return 'released';
  if (endsAt && new Date(endsAt) < new Date(today.toISOString().slice(0, 10))) return 'expired';
  return 'active';
};

export const canEdit = (status) => status !== 'released';

// Attach the derived effective status for API responses.
export const withEffectiveStatus = (row) => {
  if (!row) return row;
  return { ...row, effective_status: effectiveStatus(row.ends_at, row.status) };
};

export const createProtectionWindow = async (data) => {
  const { tenantId, partnerId, contractId, claimId, startsAt, endsAt, reason, createdBy } = data;
  const result = await pool.query(
    `INSERT INTO protection_windows
       (tenant_id, partner_id, contract_id, claim_id, starts_at, ends_at, reason, created_by)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
    [
      tenantId ?? null, partnerId, contractId ?? null, claimId ?? null,
      startsAt ?? null, endsAt ?? null, reason ?? null, createdBy ?? null,
    ]
  );
  return result.rows[0];
};

export const findProtectionWindowById = async (id) => {
  const result = await pool.query(
    `SELECT w.*, p.name AS partner_name, c.title AS contract_title
     FROM protection_windows w
     LEFT JOIN partners p ON w.partner_id = p.id
     LEFT JOIN contracts c ON w.contract_id = c.id
     WHERE w.id = $1`,
    [id]
  );
  return result.rows[0];
};

export const getAllProtectionWindows = async (filters = {}) => {
  let query = `
    SELECT w.*, p.name AS partner_name, c.title AS contract_title
    FROM protection_windows w
    LEFT JOIN partners p ON w.partner_id = p.id
    LEFT JOIN contracts c ON w.contract_id = c.id
    WHERE 1=1
  `;
  const values = [];
  let n = 1;
  if (filters.status) { query += ` AND w.status = $${n++}`; values.push(filters.status); }
  if (filters.partnerId) { query += ` AND w.partner_id = $${n++}`; values.push(filters.partnerId); }
  if (filters.contractId) { query += ` AND w.contract_id = $${n++}`; values.push(filters.contractId); }
  query += ' ORDER BY w.created_at DESC';
  const result = await pool.query(query, values);
  return result.rows;
};

const FIELD_MAP = [
  ['contract_id', 'contractId'],
  ['claim_id', 'claimId'],
  ['starts_at', 'startsAt'],
  ['ends_at', 'endsAt'],
  ['reason', 'reason'],
];

export const updateProtectionWindow = async (id, updates) => {
  const fields = [];
  const values = [];
  for (const [column, camel] of FIELD_MAP) {
    const value = updates[camel] !== undefined ? updates[camel] : updates[column];
    if (value === undefined) continue;
    fields.push(`${column} = $${values.length + 1}`);
    values.push(value === '' ? null : value);
  }
  if (fields.length === 0) return findProtectionWindowById(id);
  values.push(id);
  const result = await pool.query(
    `UPDATE protection_windows SET ${fields.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE id = $${values.length} RETURNING *`,
    values
  );
  return result.rows[0];
};

export const releaseProtectionWindow = async (id) => {
  const result = await pool.query(
    `UPDATE protection_windows SET status = 'released', updated_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *`,
    [id]
  );
  return result.rows[0];
};

export const deleteProtectionWindow = async (id) => {
  await pool.query('DELETE FROM protection_windows WHERE id = $1', [id]);
};

export const getProtectionWindowStats = async () => {
  const result = await pool.query(`
    SELECT
      COUNT(*) AS total_windows,
      COUNT(CASE WHEN status = 'released' THEN 1 END) AS released_windows,
      COUNT(CASE WHEN status <> 'released' AND (ends_at IS NULL OR ends_at >= CURRENT_DATE) THEN 1 END) AS active_windows,
      COUNT(CASE WHEN status <> 'released' AND ends_at < CURRENT_DATE THEN 1 END) AS expired_windows
    FROM protection_windows
  `);
  return result.rows[0];
};

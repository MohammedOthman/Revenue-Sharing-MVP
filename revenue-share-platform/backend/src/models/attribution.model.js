import pool from '../config/database.js';

/**
 * Attribution Decision: proposed -> confirmed. A confirmed decision is final
 * (edits are blocked); overriding means recording a new decision.
 */
export const canEdit = (status) => status === 'proposed';
export const isConfirmed = (status) => status === 'confirmed';

export const createAttribution = async (data) => {
  const { tenantId, claimId, partnerId, contractId, outcome, weight, rationale, createdBy } = data;
  const result = await pool.query(
    `INSERT INTO attribution_decisions
       (tenant_id, claim_id, partner_id, contract_id, outcome, weight, rationale, created_by)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
    [
      tenantId ?? null, claimId ?? null, partnerId, contractId ?? null,
      outcome || 'credited', weight ?? 100, rationale ?? null, createdBy ?? null,
    ]
  );
  return result.rows[0];
};

export const findAttributionById = async (id) => {
  const result = await pool.query(
    `SELECT a.*, p.name AS partner_name, u.full_name AS decider_name
     FROM attribution_decisions a
     LEFT JOIN partners p ON a.partner_id = p.id
     LEFT JOIN users u ON a.decided_by = u.id
     WHERE a.id = $1`,
    [id]
  );
  return result.rows[0];
};

export const getAllAttributions = async (filters = {}) => {
  let query = `
    SELECT a.*, p.name AS partner_name
    FROM attribution_decisions a
    LEFT JOIN partners p ON a.partner_id = p.id
    WHERE 1=1
  `;
  const values = [];
  let n = 1;
  if (filters.status) { query += ` AND a.status = $${n++}`; values.push(filters.status); }
  if (filters.claimId) { query += ` AND a.claim_id = $${n++}`; values.push(filters.claimId); }
  if (filters.partnerId) { query += ` AND a.partner_id = $${n++}`; values.push(filters.partnerId); }
  query += ' ORDER BY a.created_at DESC';
  const result = await pool.query(query, values);
  return result.rows;
};

const FIELD_MAP = [
  ['claim_id', 'claimId'],
  ['partner_id', 'partnerId'],
  ['contract_id', 'contractId'],
  ['outcome', 'outcome'],
  ['weight', 'weight'],
  ['rationale', 'rationale'],
];

export const updateAttribution = async (id, updates) => {
  const fields = [];
  const values = [];
  for (const [column, camel] of FIELD_MAP) {
    const value = updates[camel] !== undefined ? updates[camel] : updates[column];
    if (value === undefined) continue;
    fields.push(`${column} = $${values.length + 1}`);
    values.push(value === '' ? null : value);
  }
  if (fields.length === 0) return findAttributionById(id);
  values.push(id);
  const result = await pool.query(
    `UPDATE attribution_decisions SET ${fields.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE id = $${values.length} RETURNING *`,
    values
  );
  return result.rows[0];
};

export const confirmAttribution = async (id, decidedBy) => {
  const result = await pool.query(
    `UPDATE attribution_decisions
     SET status = 'confirmed', decided_by = $2, decided_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP
     WHERE id = $1 RETURNING *`,
    [id, decidedBy ?? null]
  );
  return result.rows[0];
};

export const deleteAttribution = async (id) => {
  await pool.query('DELETE FROM attribution_decisions WHERE id = $1', [id]);
};

export const getAttributionStats = async () => {
  const result = await pool.query(`
    SELECT
      COUNT(*) AS total_decisions,
      COUNT(CASE WHEN status = 'proposed' THEN 1 END) AS proposed_decisions,
      COUNT(CASE WHEN status = 'confirmed' THEN 1 END) AS confirmed_decisions
    FROM attribution_decisions
  `);
  return result.rows[0];
};

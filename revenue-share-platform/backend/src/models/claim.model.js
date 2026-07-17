import pool from '../config/database.js';

/**
 * Partner Revenue Claim lifecycle. Approved/rejected are terminal.
 */
const TRANSITIONS = {
  submitted: ['under_review', 'needs_clarification', 'approved', 'rejected'],
  under_review: ['needs_clarification', 'approved', 'rejected'],
  needs_clarification: ['under_review', 'approved', 'rejected'],
  approved: [],
  rejected: [],
};

export const canTransition = (from, to) => (TRANSITIONS[from] || []).includes(to);
export const isTerminal = (status) => status === 'approved' || status === 'rejected';

export const createClaim = async (data) => {
  const {
    tenantId, partnerId, contractId, periodStart, periodEnd,
    basis, claimedAmount, currency, createdBy,
  } = data;

  const result = await pool.query(
    `INSERT INTO partner_revenue_claims
       (tenant_id, partner_id, contract_id, period_start, period_end, basis, claimed_amount, currency, created_by)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`,
    [
      tenantId ?? null, partnerId, contractId ?? null, periodStart ?? null, periodEnd ?? null,
      basis ?? null, claimedAmount ?? 0, currency || 'SAR', createdBy ?? null,
    ]
  );
  return result.rows[0];
};

export const findClaimById = async (id) => {
  const result = await pool.query(
    `SELECT c.*, p.name AS partner_name, ct.title AS contract_title, u.full_name AS reviewer_name
     FROM partner_revenue_claims c
     LEFT JOIN partners p ON c.partner_id = p.id
     LEFT JOIN contracts ct ON c.contract_id = ct.id
     LEFT JOIN users u ON c.reviewed_by = u.id
     WHERE c.id = $1`,
    [id]
  );
  return result.rows[0];
};

export const getAllClaims = async (filters = {}) => {
  let query = `
    SELECT c.*, p.name AS partner_name, ct.title AS contract_title
    FROM partner_revenue_claims c
    LEFT JOIN partners p ON c.partner_id = p.id
    LEFT JOIN contracts ct ON c.contract_id = ct.id
    WHERE 1=1
  `;
  const values = [];
  let n = 1;
  if (filters.status) { query += ` AND c.status = $${n++}`; values.push(filters.status); }
  if (filters.partnerId) { query += ` AND c.partner_id = $${n++}`; values.push(filters.partnerId); }
  if (filters.contractId) { query += ` AND c.contract_id = $${n++}`; values.push(filters.contractId); }
  query += ' ORDER BY c.created_at DESC';
  const result = await pool.query(query, values);
  return result.rows;
};

// Field edits (not status). Accepts camelCase or snake_case.
const FIELD_MAP = [
  ['contract_id', 'contractId'],
  ['period_start', 'periodStart'],
  ['period_end', 'periodEnd'],
  ['basis', 'basis'],
  ['claimed_amount', 'claimedAmount'],
  ['currency', 'currency'],
];

export const updateClaim = async (id, updates) => {
  const fields = [];
  const values = [];
  for (const [column, camel] of FIELD_MAP) {
    const value = updates[camel] !== undefined ? updates[camel] : updates[column];
    if (value === undefined) continue;
    fields.push(`${column} = $${values.length + 1}`);
    values.push(value === '' ? null : value);
  }
  if (fields.length === 0) return findClaimById(id);
  values.push(id);
  const result = await pool.query(
    `UPDATE partner_revenue_claims SET ${fields.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE id = $${values.length} RETURNING *`,
    values
  );
  return result.rows[0];
};

// Status transition. For approve, pass approvedAmount + reviewedBy (+ note).
export const setClaimStatus = async (id, { status, approvedAmount, note, reviewedBy }) => {
  const sets = ['status = $1', 'updated_at = CURRENT_TIMESTAMP'];
  const values = [status];
  if (approvedAmount !== undefined) { values.push(approvedAmount); sets.push(`approved_amount = $${values.length}`); }
  if (note !== undefined) { values.push(note ?? null); sets.push(`decision_note = $${values.length}`); }
  if (reviewedBy !== undefined) {
    values.push(reviewedBy ?? null); sets.push(`reviewed_by = $${values.length}`);
    sets.push('reviewed_at = CURRENT_TIMESTAMP');
  }
  values.push(id);
  const result = await pool.query(
    `UPDATE partner_revenue_claims SET ${sets.join(', ')} WHERE id = $${values.length} RETURNING *`,
    values
  );
  return result.rows[0];
};

export const deleteClaim = async (id) => {
  await pool.query('DELETE FROM partner_revenue_claims WHERE id = $1', [id]);
};

export const getClaimStats = async () => {
  const result = await pool.query(`
    SELECT
      COUNT(*) AS total_claims,
      COUNT(CASE WHEN status = 'submitted' THEN 1 END) AS submitted_claims,
      COUNT(CASE WHEN status = 'under_review' THEN 1 END) AS under_review_claims,
      COUNT(CASE WHEN status = 'needs_clarification' THEN 1 END) AS needs_clarification_claims,
      COUNT(CASE WHEN status = 'approved' THEN 1 END) AS approved_claims,
      COUNT(CASE WHEN status = 'rejected' THEN 1 END) AS rejected_claims,
      COALESCE(SUM(approved_amount), 0) AS total_approved_amount
    FROM partner_revenue_claims
  `);
  return result.rows[0];
};

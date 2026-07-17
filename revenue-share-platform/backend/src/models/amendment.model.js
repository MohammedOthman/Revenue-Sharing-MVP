import pool from '../config/database.js';

/**
 * Contract Amendment Journeys — Phase 1 Capture governance workflow.
 *
 * An amendment journey turns a legal contract article into a governed change
 * process: legal authority, classification, guardrails, evidence, partner
 * impact, notice, and acknowledgment. It is NOT a document upload and it does
 * NOT move money. The only state transition with side effects is "send notice",
 * which is blocked until every readiness requirement passes.
 */

// Guardrail/readiness requirements that must all pass before a notice can be
// sent. Each entry maps a stable key (surfaced to the UI so the user always
// understands why a notice is blocked) to a predicate over the DB row.
const isFilled = (value) =>
  value !== null && value !== undefined && String(value).trim() !== '';

const READINESS_CHECKS = [
  ['contract', (r) => !!r.contract_id],
  ['article_reference', (r) => isFilled(r.article_reference)],
  ['amendment_type', (r) => isFilled(r.amendment_type)],
  ['reason', (r) => isFilled(r.reason)],
  ['public_interest_basis', (r) => isFilled(r.public_interest_basis)],
  ['necessity_confirmed', (r) => r.necessity_confirmed === true],
  ['no_new_contract_confirmed', (r) => r.no_new_contract_confirmed === true],
  ['no_nature_change_confirmed', (r) => r.no_nature_change_confirmed === true],
  ['notice_period_days', (r) => Number(r.notice_period_days) > 0],
  ['authority_source', (r) => isFilled(r.authority_source)],
  ['partner_impact', (r) => isFilled(r.partner_impact)],
  ['calculation_method', (r) => isFilled(r.calculation_method)],
  ['amendment_letter_reference', (r) => isFilled(r.amendment_letter_reference)],
  ['notice_message', (r) => isFilled(r.notice_message)],
  ['notice_channels', (r) => Array.isArray(r.notice_channels) && r.notice_channels.length > 0],
];

/**
 * Compute whether an amendment journey is ready to notify and, if not, which
 * requirements are still missing. Returned on every read so the UI can guide
 * the user and block the send button with an explanation.
 */
export const computeReadiness = (row) => {
  if (!row) return { ready: false, missing: [], total: READINESS_CHECKS.length, satisfied: 0 };
  const missing = READINESS_CHECKS.filter(([, check]) => !check(row)).map(([key]) => key);
  return {
    ready: missing.length === 0,
    missing,
    total: READINESS_CHECKS.length,
    satisfied: READINESS_CHECKS.length - missing.length,
  };
};

// Terminal statuses are never downgraded by an edit — a sent notice is a fact.
const TERMINAL_STATUSES = ['notified', 'acknowledged'];

// Derive the stored status from readiness unless the journey is already in a
// terminal (post-send) state.
const deriveStatus = (row) => {
  if (TERMINAL_STATUSES.includes(row.status)) return row.status;
  return computeReadiness(row).ready ? 'ready' : 'draft';
};

// Attach the readiness object to a row for API responses.
export const withReadiness = (row) => {
  if (!row) return row;
  return { ...row, readiness: computeReadiness(row) };
};

// Maps API input keys (camelCase, with snake_case also accepted) to columns.
const FIELD_MAP = [
  ['contract_id', 'contractId'],
  ['article_reference', 'articleReference'],
  ['amendment_type', 'amendmentType'],
  ['amendment_mechanism', 'amendmentMechanism'],
  ['reason', 'reason'],
  ['public_interest_basis', 'publicInterestBasis'],
  ['necessity_confirmed', 'necessityConfirmed'],
  ['no_new_contract_confirmed', 'noNewContractConfirmed'],
  ['no_nature_change_confirmed', 'noNatureChangeConfirmed'],
  ['notice_period_days', 'noticePeriodDays'],
  ['authority_source', 'authoritySource'],
  ['decision_date', 'decisionDate'],
  ['effective_date', 'effectiveDate'],
  ['partner_impact', 'partnerImpact'],
  ['calculation_method', 'calculationMethod'],
  ['amendment_letter_reference', 'amendmentLetterReference'],
  ['notice_channels', 'noticeChannels'],
  ['notice_message', 'noticeMessage'],
  ['notice_message_language', 'noticeMessageLanguage'],
];

// Pick a value for a column from an input object, accepting either the
// camelCase or snake_case key. Returns undefined when neither is present.
const pickInput = (data, column, camel) => {
  if (data[camel] !== undefined) return data[camel];
  if (data[column] !== undefined) return data[column];
  return undefined;
};

// Normalize a channels value (array or comma string) to a clean string array.
const normalizeChannels = (value) => {
  if (value === undefined || value === null) return undefined;
  const arr = Array.isArray(value)
    ? value
    : String(value).split(',');
  return arr.map((c) => String(c).trim()).filter(Boolean);
};

export const createAmendment = async (data) => {
  const values = {};
  for (const [column, camel] of FIELD_MAP) {
    values[column] = pickInput(data, column, camel);
  }
  const channels = normalizeChannels(values.notice_channels) || [];

  const result = await pool.query(
    `INSERT INTO contract_amendments (
       contract_id, article_reference, amendment_type, amendment_mechanism,
       reason, public_interest_basis, necessity_confirmed, no_new_contract_confirmed,
       no_nature_change_confirmed, notice_period_days, authority_source, decision_date,
       effective_date, partner_impact, calculation_method, amendment_letter_reference,
       notice_channels, notice_message, notice_message_language, status, created_by
     ) VALUES (
       $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16,
       $17::jsonb, $18, $19, $20, $21
     ) RETURNING *`,
    [
      values.contract_id,
      values.article_reference || null,
      values.amendment_type || null,
      values.amendment_mechanism || null,
      values.reason || null,
      values.public_interest_basis || null,
      values.necessity_confirmed === true,
      values.no_new_contract_confirmed === true,
      values.no_nature_change_confirmed === true,
      values.notice_period_days || null,
      values.authority_source || null,
      values.decision_date || null,
      values.effective_date || null,
      values.partner_impact || null,
      values.calculation_method || null,
      values.amendment_letter_reference || null,
      JSON.stringify(channels),
      values.notice_message || null,
      values.notice_message_language || 'ar',
      'draft',
      data.createdBy || null,
    ]
  );

  // Recompute status from readiness so a fully-specified draft lands as "ready".
  return syncStatus(result.rows[0]);
};

export const findAmendmentById = async (id) => {
  const result = await pool.query(
    `SELECT a.*, c.title AS contract_title, p.name AS partner_name, u.full_name AS creator_name
     FROM contract_amendments a
     LEFT JOIN contracts c ON a.contract_id = c.id
     LEFT JOIN partners p ON c.partner_id = p.id
     LEFT JOIN users u ON a.created_by = u.id
     WHERE a.id = $1`,
    [id]
  );
  return result.rows[0];
};

export const getAllAmendments = async (filters = {}) => {
  let query = `
    SELECT a.*, c.title AS contract_title, p.name AS partner_name
    FROM contract_amendments a
    LEFT JOIN contracts c ON a.contract_id = c.id
    LEFT JOIN partners p ON c.partner_id = p.id
    WHERE 1=1
  `;
  const values = [];
  let paramCount = 1;

  if (filters.status) {
    query += ` AND a.status = $${paramCount}`;
    values.push(filters.status);
    paramCount++;
  }

  if (filters.contractId) {
    query += ` AND a.contract_id = $${paramCount}`;
    values.push(filters.contractId);
    paramCount++;
  }

  query += ' ORDER BY a.created_at DESC';

  const result = await pool.query(query, values);
  return result.rows;
};

export const updateAmendment = async (id, updates) => {
  const fields = [];
  const values = [];

  for (const [column, camel] of FIELD_MAP) {
    const value = pickInput(updates, column, camel);
    if (value === undefined) continue;

    if (column === 'notice_channels') {
      fields.push(`${column} = $${values.length + 1}::jsonb`);
      values.push(JSON.stringify(normalizeChannels(value) || []));
    } else if (
      column === 'necessity_confirmed' ||
      column === 'no_new_contract_confirmed' ||
      column === 'no_nature_change_confirmed'
    ) {
      fields.push(`${column} = $${values.length + 1}`);
      values.push(value === true || value === 'true');
    } else {
      fields.push(`${column} = $${values.length + 1}`);
      values.push(value === '' ? null : value);
    }
  }

  if (fields.length === 0) return findAmendmentById(id);

  values.push(id);
  const query = `UPDATE contract_amendments SET ${fields.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE id = $${values.length} RETURNING *`;

  const result = await pool.query(query, values);
  if (!result.rows[0]) return null;
  return syncStatus(result.rows[0]);
};

// Recompute and persist status from readiness (unless terminal). Returns the
// row with the reconciled status without an extra round-trip when unchanged.
const syncStatus = async (row) => {
  const nextStatus = deriveStatus(row);
  if (nextStatus === row.status) return row;
  const result = await pool.query(
    'UPDATE contract_amendments SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
    [nextStatus, row.id]
  );
  return result.rows[0];
};

export const deleteAmendment = async (id) => {
  await pool.query('DELETE FROM contract_amendments WHERE id = $1', [id]);
};

/**
 * Send the amendment notice. This is the only side-effecting transition and is
 * gated on full readiness. There is no email/portal integration in Phase 1 —
 * the "send" records an immutable notice state (status + timestamp) that
 * finance and legal can rely on as evidence.
 */
export const markNotified = async (id) => {
  const result = await pool.query(
    `UPDATE contract_amendments
     SET status = 'notified', notified_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP
     WHERE id = $1 RETURNING *`,
    [id]
  );
  return result.rows[0];
};

export const markAcknowledged = async (id, note) => {
  const result = await pool.query(
    `UPDATE contract_amendments
     SET status = 'acknowledged', acknowledged_at = CURRENT_TIMESTAMP,
         acknowledgment_note = $2, updated_at = CURRENT_TIMESTAMP
     WHERE id = $1 RETURNING *`,
    [id, note || null]
  );
  return result.rows[0];
};

export const getAmendmentStats = async () => {
  const result = await pool.query(`
    SELECT
      COUNT(*) AS total_amendments,
      COUNT(CASE WHEN status = 'draft' THEN 1 END) AS draft_amendments,
      COUNT(CASE WHEN status = 'ready' THEN 1 END) AS ready_to_notify,
      COUNT(CASE WHEN status = 'notified' THEN 1 END) AS notified_amendments,
      COUNT(CASE WHEN status = 'acknowledged' THEN 1 END) AS acknowledged_amendments
    FROM contract_amendments
  `);
  return result.rows[0];
};

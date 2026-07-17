import { dbQuery } from '../config/database.js';

/**
 * Evidence Pack: a bundle of evidence items assembled for finance/legal review.
 * Lifecycle: draft -> finalized. A finalized pack is read-only — reviewers rely
 * on the bundle staying exactly as they signed it off. No money movement.
 */

// Pure lifecycle guards (exported for unit tests).
export const canModifyPack = (status) => status !== 'finalized';
export const canFinalizePack = (status) => status === 'draft';

export const createEvidencePack = async (data) => {
  const { tenantId, claimId, title, description, createdBy } = data;
  const result = await dbQuery(
    `INSERT INTO evidence_packs (tenant_id, claim_id, title, description, created_by)
     VALUES ($1,$2,$3,$4,$5) RETURNING *`,
    [tenantId ?? null, claimId ?? null, title, description ?? null, createdBy ?? null]
  );
  return result.rows[0];
};

export const findEvidencePackById = async (id) => {
  const result = await dbQuery(
    `SELECT p.*, c.basis AS claim_basis,
            (SELECT COUNT(*) FROM evidence_items i WHERE i.pack_id = p.id) AS item_count
     FROM evidence_packs p
     LEFT JOIN partner_revenue_claims c ON p.claim_id = c.id
     WHERE p.id = $1`,
    [id]
  );
  return result.rows[0];
};

// A pack together with the items currently in it, for the review view.
export const findEvidencePackWithItems = async (id) => {
  const pack = await findEvidencePackById(id);
  if (!pack) return undefined;
  const items = await dbQuery(
    'SELECT * FROM evidence_items WHERE pack_id = $1 ORDER BY created_at ASC',
    [id]
  );
  return { ...pack, items: items.rows };
};

export const getAllEvidencePacks = async (filters = {}) => {
  let query = `
    SELECT p.*, c.basis AS claim_basis,
           (SELECT COUNT(*) FROM evidence_items i WHERE i.pack_id = p.id) AS item_count
    FROM evidence_packs p
    LEFT JOIN partner_revenue_claims c ON p.claim_id = c.id
    WHERE 1=1
  `;
  const values = [];
  let n = 1;
  if (filters.status) { query += ` AND p.status = $${n++}`; values.push(filters.status); }
  if (filters.claimId) { query += ` AND p.claim_id = $${n++}`; values.push(filters.claimId); }
  query += ' ORDER BY p.created_at DESC';
  const result = await dbQuery(query, values);
  return result.rows;
};

const FIELD_MAP = [
  ['claim_id', 'claimId'],
  ['title', 'title'],
  ['description', 'description'],
];

export const updateEvidencePack = async (id, updates) => {
  const fields = [];
  const values = [];
  for (const [column, camel] of FIELD_MAP) {
    const value = updates[camel] !== undefined ? updates[camel] : updates[column];
    if (value === undefined) continue;
    fields.push(`${column} = $${values.length + 1}`);
    values.push(value === '' ? null : value);
  }
  if (fields.length === 0) return findEvidencePackById(id);
  values.push(id);
  const result = await dbQuery(
    `UPDATE evidence_packs SET ${fields.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE id = $${values.length} RETURNING *`,
    values
  );
  return result.rows[0];
};

export const finalizeEvidencePack = async (id) => {
  const result = await dbQuery(
    `UPDATE evidence_packs
     SET status = 'finalized', finalized_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP
     WHERE id = $1 RETURNING *`,
    [id]
  );
  return result.rows[0];
};

export const deleteEvidencePack = async (id) => {
  // Items keep existing; their pack_id is set to NULL by the FK (ON DELETE SET NULL).
  await dbQuery('DELETE FROM evidence_packs WHERE id = $1', [id]);
};

export const getEvidencePackStats = async () => {
  const result = await dbQuery(`
    SELECT
      COUNT(*) AS total_packs,
      COUNT(CASE WHEN status = 'draft' THEN 1 END) AS draft_packs,
      COUNT(CASE WHEN status = 'finalized' THEN 1 END) AS finalized_packs
    FROM evidence_packs
  `);
  return result.rows[0];
};

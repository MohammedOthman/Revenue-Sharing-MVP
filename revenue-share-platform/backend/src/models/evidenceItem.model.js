import { dbQuery } from '../config/database.js';

/**
 * Evidence Item: a metadata record describing why a claim or amendment is
 * justified — a link, an email reference, a note, a calculation. The platform
 * stores no files; file_url is a reference to something held elsewhere.
 *
 * An item must attach to at least one of: a claim, an amendment, or a pack.
 * Items inside a finalized pack are read-only.
 */

// Pure guards (exported for unit tests).
export const hasAttachment = ({ claimId, amendmentId, packId }) =>
  Boolean(claimId || amendmentId || packId);

export const canModifyItem = (packStatus) => packStatus !== 'finalized';

export const createEvidenceItem = async (data) => {
  const { tenantId, claimId, amendmentId, packId, type, name, description, fileUrl, addedBy } = data;
  const result = await dbQuery(
    `INSERT INTO evidence_items
       (tenant_id, claim_id, amendment_id, pack_id, type, name, description, file_url, added_by)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`,
    [
      tenantId ?? null, claimId ?? null, amendmentId ?? null, packId ?? null,
      type ?? null, name, description ?? null, fileUrl ?? null, addedBy ?? null,
    ]
  );
  return result.rows[0];
};

// Joins the item's pack (if any) so callers can see whether the item is locked
// inside a finalized pack.
export const findEvidenceItemById = async (id) => {
  const result = await dbQuery(
    `SELECT i.*, p.status AS pack_status, p.title AS pack_title
     FROM evidence_items i
     LEFT JOIN evidence_packs p ON i.pack_id = p.id
     WHERE i.id = $1`,
    [id]
  );
  return result.rows[0];
};

export const getAllEvidenceItems = async (filters = {}) => {
  let query = `
    SELECT i.*, p.status AS pack_status, p.title AS pack_title
    FROM evidence_items i
    LEFT JOIN evidence_packs p ON i.pack_id = p.id
    WHERE 1=1
  `;
  const values = [];
  let n = 1;
  if (filters.claimId) { query += ` AND i.claim_id = $${n++}`; values.push(filters.claimId); }
  if (filters.amendmentId) { query += ` AND i.amendment_id = $${n++}`; values.push(filters.amendmentId); }
  if (filters.packId) { query += ` AND i.pack_id = $${n++}`; values.push(filters.packId); }
  if (filters.type) { query += ` AND i.type = $${n++}`; values.push(filters.type); }
  query += ' ORDER BY i.created_at DESC';
  const result = await dbQuery(query, values);
  return result.rows;
};

export const getEvidenceItemsByPack = async (packId) => {
  const result = await dbQuery(
    'SELECT * FROM evidence_items WHERE pack_id = $1 ORDER BY created_at ASC',
    [packId]
  );
  return result.rows;
};

const FIELD_MAP = [
  ['claim_id', 'claimId'],
  ['amendment_id', 'amendmentId'],
  ['type', 'type'],
  ['name', 'name'],
  ['description', 'description'],
  ['file_url', 'fileUrl'],
];

export const updateEvidenceItem = async (id, updates) => {
  const fields = [];
  const values = [];
  for (const [column, camel] of FIELD_MAP) {
    const value = updates[camel] !== undefined ? updates[camel] : updates[column];
    if (value === undefined) continue;
    fields.push(`${column} = $${values.length + 1}`);
    values.push(value === '' ? null : value);
  }
  if (fields.length === 0) return findEvidenceItemById(id);
  values.push(id);
  const result = await dbQuery(
    `UPDATE evidence_items SET ${fields.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE id = $${values.length} RETURNING *`,
    values
  );
  return result.rows[0];
};

// Attach an item to a pack (or detach when packId is null).
export const setEvidenceItemPack = async (id, packId) => {
  const result = await dbQuery(
    `UPDATE evidence_items SET pack_id = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *`,
    [packId ?? null, id]
  );
  return result.rows[0];
};

export const deleteEvidenceItem = async (id) => {
  await dbQuery('DELETE FROM evidence_items WHERE id = $1', [id]);
};

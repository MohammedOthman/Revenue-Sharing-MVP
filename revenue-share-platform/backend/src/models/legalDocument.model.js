import pool from '../config/database.js';

export const createLegalDocument = async (data) => {
  const { contractId, documentType, documentName, filePath, fileUrl, version, uploadedBy } = data;
  
  const result = await pool.query(
    `INSERT INTO legal_documents (contract_id, document_type, document_name, file_path, file_url, version, uploaded_by) 
     VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
    [contractId, documentType, documentName, filePath || null, fileUrl || null, version || '1.0', uploadedBy]
  );
  return result.rows[0];
};

export const findLegalDocumentById = async (id) => {
  const result = await pool.query(`
    SELECT d.*, c.title as contract_title, p.name as partner_name, u.full_name as uploader_name
    FROM legal_documents d
    LEFT JOIN contracts c ON d.contract_id = c.id
    LEFT JOIN partners p ON c.partner_id = p.id
    LEFT JOIN users u ON d.uploaded_by = u.id
    WHERE d.id = $1
  `, [id]);
  return result.rows[0];
};

export const getAllLegalDocuments = async (filters = {}) => {
  let query = `
    SELECT d.*, c.title as contract_title, p.name as partner_name
    FROM legal_documents d
    LEFT JOIN contracts c ON d.contract_id = c.id
    LEFT JOIN partners p ON c.partner_id = p.id
    WHERE 1=1
  `;
  const values = [];
  let paramCount = 1;

  if (filters.status) {
    query += ` AND d.status = $${paramCount}`;
    values.push(filters.status);
    paramCount++;
  }

  if (filters.contractId) {
    query += ` AND d.contract_id = $${paramCount}`;
    values.push(filters.contractId);
    paramCount++;
  }

  if (filters.documentType) {
    query += ` AND d.document_type = $${paramCount}`;
    values.push(filters.documentType);
    paramCount++;
  }

  query += ' ORDER BY d.created_at DESC';
  
  const result = await pool.query(query, values);
  return result.rows;
};

export const updateLegalDocument = async (id, updates) => {
  const allowedFields = ['document_type', 'document_name', 'file_path', 'file_url', 'version', 'status'];
  const fields = [];
  const values = [];
  
  allowedFields.forEach((field) => {
    if (updates[field] !== undefined) {
      fields.push(`${field} = $${values.length + 1}`);
      values.push(updates[field]);
    }
  });
  
  if (fields.length === 0) return null;
  
  values.push(id);
  const query = `UPDATE legal_documents SET ${fields.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE id = $${values.length} RETURNING *`;
  
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const deleteLegalDocument = async (id) => {
  await pool.query('DELETE FROM legal_documents WHERE id = $1', [id]);
};

export const getLegalDocumentStats = async () => {
  const result = await pool.query(`
    SELECT 
      COUNT(*) as total_documents,
      COUNT(CASE WHEN status = 'approved' THEN 1 END) as approved_count,
      COUNT(CASE WHEN status = 'draft' THEN 1 END) as draft_count,
      COUNT(CASE WHEN status = 'pending_review' THEN 1 END) as pending_count
    FROM legal_documents
  `);
  return result.rows[0];
};

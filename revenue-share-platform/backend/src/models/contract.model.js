import pool from '../config/database.js';

export const createContract = async (data) => {
  const { 
    partnerId, title, description, startDate, endDate, 
    revenueSharePercentage, minimumPayout, paymentTerms, createdBy 
  } = data;
  
  const result = await pool.query(
    `INSERT INTO contracts (partner_id, title, description, start_date, end_date, 
       revenue_share_percentage, minimum_payout, payment_terms, created_by) 
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
    [partnerId, title, description || null, startDate, endDate || null, 
     revenueSharePercentage, minimumPayout || 0, paymentTerms || null, createdBy]
  );
  return result.rows[0];
};

export const findContractById = async (id) => {
  const result = await pool.query(`
    SELECT c.*, p.name as partner_name, p.email as partner_email, u.full_name as creator_name
    FROM contracts c
    LEFT JOIN partners p ON c.partner_id = p.id
    LEFT JOIN users u ON c.created_by = u.id
    WHERE c.id = $1
  `, [id]);
  return result.rows[0];
};

export const getAllContracts = async (filters = {}) => {
  let query = `
    SELECT c.*, p.name as partner_name 
    FROM contracts c 
    LEFT JOIN partners p ON c.partner_id = p.id 
    WHERE 1=1
  `;
  const values = [];
  let paramCount = 1;

  if (filters.status) {
    query += ` AND c.status = $${paramCount}`;
    values.push(filters.status);
    paramCount++;
  }

  if (filters.partnerId) {
    query += ` AND c.partner_id = $${paramCount}`;
    values.push(filters.partnerId);
    paramCount++;
  }

  query += ' ORDER BY c.created_at DESC';
  
  const result = await pool.query(query, values);
  return result.rows;
};

export const updateContract = async (id, updates) => {
  const allowedFields = ['title', 'description', 'start_date', 'end_date', 'revenue_share_percentage', 'minimum_payout', 'payment_terms', 'status', 'signed_at'];
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
  const query = `UPDATE contracts SET ${fields.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE id = $${values.length} RETURNING *`;
  
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const deleteContract = async (id) => {
  await pool.query('DELETE FROM contracts WHERE id = $1', [id]);
};

export const getContractStats = async () => {
  const result = await pool.query(`
    SELECT 
      COUNT(*) as total_contracts,
      COUNT(CASE WHEN status = 'active' THEN 1 END) as active_contracts,
      COUNT(CASE WHEN status = 'draft' THEN 1 END) as draft_contracts,
      COUNT(CASE WHEN status = 'expired' THEN 1 END) as expired_contracts,
      SUM(revenue_share_percentage) / COUNT(*) as avg_revenue_share
    FROM contracts
  `);
  return result.rows[0];
};

import pool from '../config/database.js';

export const createKPI = async (data) => {
  const { contractId, name, description, targetValue, unit, periodType } = data;
  
  const result = await pool.query(
    `INSERT INTO kpis (contract_id, name, description, target_value, unit, period_type) 
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [contractId, name, description || null, targetValue, unit || null, periodType || 'monthly']
  );
  return result.rows[0];
};

export const findKPIById = async (id) => {
  const result = await pool.query(`
    SELECT k.*, c.title as contract_title, p.name as partner_name
    FROM kpis k
    LEFT JOIN contracts c ON k.contract_id = c.id
    LEFT JOIN partners p ON c.partner_id = p.id
    WHERE k.id = $1
  `, [id]);
  return result.rows[0];
};

export const getAllKPIs = async (filters = {}) => {
  let query = `
    SELECT k.*, c.title as contract_title, p.name as partner_name
    FROM kpis k
    LEFT JOIN contracts c ON k.contract_id = c.id
    LEFT JOIN partners p ON c.partner_id = p.id
    WHERE 1=1
  `;
  const values = [];
  let paramCount = 1;

  if (filters.status) {
    query += ` AND k.status = $${paramCount}`;
    values.push(filters.status);
    paramCount++;
  }

  if (filters.contractId) {
    query += ` AND k.contract_id = $${paramCount}`;
    values.push(filters.contractId);
    paramCount++;
  }

  query += ' ORDER BY k.created_at DESC';
  
  const result = await pool.query(query, values);
  return result.rows;
};

export const updateKPI = async (id, updates) => {
  const allowedFields = ['name', 'description', 'target_value', 'actual_value', 'unit', 'status'];
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
  const query = `UPDATE kpis SET ${fields.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE id = $${values.length} RETURNING *`;
  
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const deleteKPI = async (id) => {
  await pool.query('DELETE FROM kpis WHERE id = $1', [id]);
};

export const getKPIStats = async () => {
  const result = await pool.query(`
    SELECT 
      COUNT(*) as total_kpis,
      AVG(CASE WHEN target_value > 0 THEN (actual_value / target_value) * 100 ELSE 0 END) as avg_achievement_rate,
      COUNT(CASE WHEN actual_value >= target_value THEN 1 END) as achieved_count,
      COUNT(CASE WHEN actual_value < target_value THEN 1 END) as not_achieved_count
    FROM kpis
  `);
  return result.rows[0];
};

import pool from '../config/database.js';

export const createRevenueShare = async (data) => {
  const { contractId, periodStart, periodEnd, totalRevenue, sharePercentage, shareAmount, notes } = data;
  
  const result = await pool.query(
    `INSERT INTO revenue_shares (contract_id, period_start, period_end, total_revenue, 
       share_percentage, share_amount, notes) 
     VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
    [contractId, periodStart, periodEnd, totalRevenue, sharePercentage, shareAmount, notes || null]
  );
  return result.rows[0];
};

export const findRevenueShareById = async (id) => {
  const result = await pool.query(`
    SELECT r.*, c.title as contract_title, p.name as partner_name
    FROM revenue_shares r
    LEFT JOIN contracts c ON r.contract_id = c.id
    LEFT JOIN partners p ON c.partner_id = p.id
    WHERE r.id = $1
  `, [id]);
  return result.rows[0];
};

export const getAllRevenueShares = async (filters = {}) => {
  let query = `
    SELECT r.*, c.title as contract_title, p.name as partner_name
    FROM revenue_shares r
    LEFT JOIN contracts c ON r.contract_id = c.id
    LEFT JOIN partners p ON c.partner_id = p.id
    WHERE 1=1
  `;
  const values = [];
  let paramCount = 1;

  if (filters.status) {
    query += ` AND r.status = $${paramCount}`;
    values.push(filters.status);
    paramCount++;
  }

  if (filters.contractId) {
    query += ` AND r.contract_id = $${paramCount}`;
    values.push(filters.contractId);
    paramCount++;
  }

  query += ' ORDER BY r.period_end DESC';
  
  const result = await pool.query(query, values);
  return result.rows;
};

export const updateRevenueShare = async (id, updates) => {
  const allowedFields = ['total_revenue', 'share_percentage', 'share_amount', 'status', 'paid_at', 'notes'];
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
  const query = `UPDATE revenue_shares SET ${fields.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE id = $${values.length} RETURNING *`;
  
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const deleteRevenueShare = async (id) => {
  await pool.query('DELETE FROM revenue_shares WHERE id = $1', [id]);
};

export const getRevenueStats = async () => {
  const result = await pool.query(`
    SELECT 
      COUNT(*) as total_records,
      SUM(total_revenue) as total_revenue,
      SUM(share_amount) as total_share_amount,
      AVG(share_amount) as avg_share_amount,
      COUNT(CASE WHEN status = 'paid' THEN 1 END) as paid_count,
      COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending_count,
      SUM(CASE WHEN status = 'paid' THEN share_amount ELSE 0 END) as total_paid_amount
    FROM revenue_shares
  `);
  return result.rows[0];
};

export const getRevenueByPeriod = async (periodType = 'month') => {
  let dateFormat;
  if (periodType === 'month') {
    dateFormat = 'YYYY-MM';
  } else if (periodType === 'quarter') {
    dateFormat = 'YYYY-Q';
  } else {
    dateFormat = 'YYYY';
  }

  const result = await pool.query(`
    SELECT 
      TO_CHAR(period_start, '${dateFormat}') as period,
      SUM(total_revenue) as total_revenue,
      SUM(share_amount) as share_amount,
      COUNT(*) as record_count
    FROM revenue_shares
    GROUP BY TO_CHAR(period_start, '${dateFormat}')
    ORDER BY period DESC
    LIMIT 12
  `);
  return result.rows;
};

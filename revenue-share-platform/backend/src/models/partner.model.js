import pool from '../config/database.js';

export const createPartner = async (data) => {
  const { name, email, company, type, contactPerson, phone, address, notes } = data;
  const result = await pool.query(
    `INSERT INTO partners (name, email, company, type, contact_person, phone, address, notes) 
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
    [name, email, company || null, type || null, contactPerson || null, phone || null, address || null, notes || null]
  );
  return result.rows[0];
};

export const findPartnerById = async (id) => {
  const result = await pool.query('SELECT * FROM partners WHERE id = $1', [id]);
  return result.rows[0];
};

export const getAllPartners = async (filters = {}) => {
  let query = 'SELECT * FROM partners WHERE 1=1';
  const values = [];
  let paramCount = 1;

  if (filters.status) {
    query += ` AND status = $${paramCount}`;
    values.push(filters.status);
    paramCount++;
  }

  if (filters.type) {
    query += ` AND type = $${paramCount}`;
    values.push(filters.type);
    paramCount++;
  }

  query += ' ORDER BY created_at DESC';
  
  const result = await pool.query(query, values);
  return result.rows;
};

export const updatePartner = async (id, updates) => {
  const allowedFields = ['name', 'email', 'company', 'type', 'status', 'contact_person', 'phone', 'address', 'notes'];
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
  const query = `UPDATE partners SET ${fields.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE id = $${values.length} RETURNING *`;
  
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const deletePartner = async (id) => {
  await pool.query('DELETE FROM partners WHERE id = $1', [id]);
};

export const getPartnerStats = async () => {
  const result = await pool.query(`
    SELECT 
      COUNT(*) as total_partners,
      COUNT(CASE WHEN status = 'active' THEN 1 END) as active_partners,
      COUNT(CASE WHEN status = 'inactive' THEN 1 END) as inactive_partners
    FROM partners
  `);
  return result.rows[0];
};

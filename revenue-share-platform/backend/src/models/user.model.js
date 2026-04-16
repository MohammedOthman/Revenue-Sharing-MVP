import pool from '../config/database.js';
import { hashPassword, comparePassword } from '../utils/password.js';

export const createUser = async (email, password, fullName, role = 'user') => {
  const passwordHash = await hashPassword(password);
  const result = await pool.query(
    'INSERT INTO users (email, password_hash, full_name, role) VALUES ($1, $2, $3, $4) RETURNING *',
    [email, passwordHash, fullName, role]
  );
  return result.rows[0];
};

export const findUserByEmail = async (email) => {
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0];
};

export const findUserById = async (id) => {
  const result = await pool.query('SELECT id, email, full_name, role, created_at FROM users WHERE id = $1', [id]);
  return result.rows[0];
};

export const getAllUsers = async () => {
  const result = await pool.query('SELECT id, email, full_name, role, created_at FROM users ORDER BY created_at DESC');
  return result.rows;
};

export const updateUser = async (id, updates) => {
  const allowedFields = ['full_name', 'role'];
  const fields = [];
  const values = [];
  
  allowedFields.forEach((field, index) => {
    if (updates[field] !== undefined) {
      fields.push(`${field} = $${index + 1}`);
      values.push(updates[field]);
    }
  });
  
  if (fields.length === 0) return null;
  
  values.push(id);
  const query = `UPDATE users SET ${fields.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE id = $${values.length} RETURNING id, email, full_name, role`;
  
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const deleteUser = async (id) => {
  await pool.query('DELETE FROM users WHERE id = $1', [id]);
};

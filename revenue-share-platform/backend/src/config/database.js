import pkg from 'pg';
import { env } from './env.js';

const { Pool } = pkg;

const pool = new Pool({
  connectionString: env.DATABASE_URL,
  ssl: env.DB_SSL === 'require' ? { rejectUnauthorized: false } : undefined,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
  statement_timeout: 15000,
  application_name: 'reven-api',
});

pool.on('error', (err) => {
  console.error(JSON.stringify({ level: 'error', event: 'database_pool_error', message: err.message }));
});

export async function withTransaction(work) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const result = await work(client);
    await client.query('COMMIT');
    return result;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

export async function checkDatabase() {
  const result = await pool.query('SELECT 1 AS ok');
  return result.rows[0]?.ok === 1;
}

export default pool;

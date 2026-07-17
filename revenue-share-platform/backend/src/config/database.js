import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';
import { AsyncLocalStorage } from 'async_hooks';

dotenv.config();

const poolConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
};

// Owner/superuser pool. Used for migrations, seed, and any query that runs
// outside a tenant-scoped request. The owner bypasses row-level security, so
// bootstrap and admin work keeps functioning.
const pool = new Pool({
  ...poolConfig,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

// Application pool. Connects as the non-superuser reven_app role so that
// row-level security actually applies. Request handlers run their queries on a
// connection from this pool with the per-request tenant GUC set (see
// middleware/tenantScope.js). Defaults to the reven_app role created in
// migration 004; in production give it a password via DB_APP_PASSWORD.
const appPool = new Pool({
  ...poolConfig,
  user: process.env.DB_APP_USER || 'reven_app',
  password: process.env.DB_APP_PASSWORD,
});

// Carries the tenant-scoped client (and tenant id) for the current request.
export const requestContext = new AsyncLocalStorage();

pool.on('connect', () => {
  console.log('Database connected successfully');
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

appPool.on('error', (err) => {
  console.error('Unexpected error on idle app client', err.message);
});

/**
 * Run a query on the request-scoped tenant connection when one is active (so
 * PostgreSQL row-level security scopes it to the caller's tenant), otherwise on
 * the owner pool. Models call this instead of pool.query so the same model code
 * serves tenant-scoped HTTP requests and unscoped bootstrap/tests.
 */
export const dbQuery = (text, params) => {
  const store = requestContext.getStore();
  return (store?.client ?? pool).query(text, params);
};

// Close both pools (used by tests that exercise the app pool).
export const closePools = async () => {
  await pool.end();
  await appPool.end();
};

export { appPool };
export default pool;

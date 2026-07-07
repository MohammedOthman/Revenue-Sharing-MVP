import pkg from 'pg';
import env from './env.js';

const { Pool } = pkg;

// Managed Postgres providers (Render, Railway, Neon, Supabase, Heroku, Replit)
// hand out a single connection URL and usually require TLS.
const sslRequired =
  env.dbSsl || /\bsslmode=require\b/.test(env.databaseUrl);

const poolConfig = env.databaseUrl
  ? { connectionString: env.databaseUrl }
  : {
      host: env.db.host,
      port: env.db.port,
      database: env.db.name,
      user: env.db.user,
      password: env.db.password,
    };

const pool = new Pool({
  ...poolConfig,
  ...(sslRequired ? { ssl: { rejectUnauthorized: false } } : {}),
  max: env.dbPoolMax,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

pool.on('error', (err) => {
  // An idle client failing (network blip, PG restart) must not kill the API;
  // the pool discards the broken client and creates a new one on demand.
  console.error('Unexpected error on idle database client:', err.message);
});

export const checkDatabaseConnection = async () => {
  const result = await pool.query('SELECT 1 AS ok');
  return result.rows[0]?.ok === 1;
};

export default pool;

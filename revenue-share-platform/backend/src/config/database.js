import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

dotenv.config();

// Managed Postgres providers (Neon, Supabase, Render, Railway, Heroku) give you a
// single connection string and require SSL. Use DATABASE_URL when it is set;
// fall back to the discrete DB_* variables for local development.
const useConnectionString = Boolean(process.env.DATABASE_URL);

// Enable SSL when DB_SSL=true, or automatically for a remote connection string
// whose host is not localhost. rejectUnauthorized:false accepts the provider's
// managed certificate, which is the documented setting for Neon/Supabase/Render.
const wantsSsl =
  process.env.DB_SSL === 'true' ||
  (useConnectionString && !/localhost|127\.0\.0\.1/.test(process.env.DATABASE_URL));

const poolConfig = useConnectionString
  ? { connectionString: process.env.DATABASE_URL }
  : {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    };

const pool = new Pool({
  ...poolConfig,
  ssl: wantsSsl ? { rejectUnauthorized: false } : undefined,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

pool.on('connect', () => {
  console.log('Database connected successfully');
});

pool.on('error', (err) => {
  // A dropped idle connection should not crash the whole API. pg will open a
  // fresh connection on the next query; log it and keep serving.
  console.error('Unexpected error on idle Postgres client:', err.message);
});

export default pool;

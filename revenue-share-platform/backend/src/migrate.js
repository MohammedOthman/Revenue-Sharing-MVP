/**
 * Versioned SQL migrations for Reven.
 *
 * Replaces the old boot-time `CREATE TABLE IF NOT EXISTS` path with ordered,
 * tracked migration files so schema changes are reproducible across
 * development, staging, and production (roadmap Phase 1 / Phase 5).
 *
 * Migration files live in `backend/migrations/NNN_name.sql` and run in
 * ascending filename order, each inside its own transaction. Applied
 * migrations are recorded in the `schema_migrations` table and never re-run.
 *
 *   npm run migrate            # apply all pending migrations
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import pool from './config/database.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const MIGRATIONS_DIR = path.resolve(__dirname, '../migrations');

// Pure helper (unit-testable without a database): list the .sql migration
// files in a directory, sorted in ascending filename order.
export const listMigrationFiles = (dir = MIGRATIONS_DIR) => {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.sql'))
    .sort((a, b) => a.localeCompare(b, 'en'));
};

const ensureMigrationsTable = async (client) => {
  await client.query(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      name VARCHAR(255) PRIMARY KEY,
      applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
};

const getAppliedMigrations = async (client) => {
  const { rows } = await client.query('SELECT name FROM schema_migrations');
  return new Set(rows.map((r) => r.name));
};

/**
 * Apply all pending migrations in order. Uses the shared pool and does NOT
 * close it, so callers (server.js, seed.js) keep using the same pool.
 * Returns the list of migration names applied in this run.
 */
export const runMigrations = async () => {
  const files = listMigrationFiles();
  const applied = [];
  const client = await pool.connect();

  try {
    await ensureMigrationsTable(client);
    const already = await getAppliedMigrations(client);

    for (const file of files) {
      if (already.has(file)) continue;

      const sql = fs.readFileSync(path.join(MIGRATIONS_DIR, file), 'utf8');
      try {
        await client.query('BEGIN');
        await client.query(sql);
        await client.query('INSERT INTO schema_migrations (name) VALUES ($1)', [file]);
        await client.query('COMMIT');
        applied.push(file);
        console.log(`Applied migration: ${file}`);
      } catch (error) {
        await client.query('ROLLBACK');
        console.error(`Migration failed: ${file}`);
        throw error;
      }
    }

    if (applied.length === 0) {
      console.log('No pending migrations.');
    }
    return applied;
  } finally {
    client.release();
  }
};

// CLI entry point: run migrations then close the pool and exit.
const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (isMain) {
  runMigrations()
    .then(async () => {
      await pool.end();
      process.exit(0);
    })
    .catch(async (error) => {
      console.error('Migration run failed:', error);
      await pool.end();
      process.exit(1);
    });
}

/**
 * @deprecated Schema is now managed by versioned migrations. This shim
 * delegates to the migration runner so any remaining callers keep working.
 * New schema changes should be added as `backend/migrations/NNN_name.sql`,
 * not here. See src/migrate.js.
 */
import { runMigrations } from '../migrate.js';

export const createTables = async () => {
  return runMigrations();
};

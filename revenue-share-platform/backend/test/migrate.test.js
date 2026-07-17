import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { listMigrationFiles, MIGRATIONS_DIR } from '../src/migrate.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

test('migrations directory exists and holds the initial baseline', () => {
  const files = listMigrationFiles();
  assert.ok(files.includes('001_initial_schema.sql'), 'initial migration must be present');
});

test('migration files are returned in ascending order', () => {
  // Simulate ordering with a temp directory of out-of-order names.
  const tmp = path.join(__dirname, '__mig_tmp__');
  fs.rmSync(tmp, { recursive: true, force: true });
  fs.mkdirSync(tmp);
  try {
    fs.writeFileSync(path.join(tmp, '010_later.sql'), '');
    fs.writeFileSync(path.join(tmp, '002_second.sql'), '');
    fs.writeFileSync(path.join(tmp, '001_first.sql'), '');
    fs.writeFileSync(path.join(tmp, 'notes.txt'), ''); // ignored
    const files = listMigrationFiles(tmp);
    assert.deepEqual(files, ['001_first.sql', '002_second.sql', '010_later.sql']);
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
});

test('a missing migrations directory yields an empty list, not a throw', () => {
  assert.deepEqual(listMigrationFiles(path.join(__dirname, 'does_not_exist')), []);
});

test('the initial migration defines every current table', () => {
  const sql = fs.readFileSync(path.join(MIGRATIONS_DIR, '001_initial_schema.sql'), 'utf8');
  for (const table of [
    'users', 'partners', 'contracts', 'revenue_shares',
    'kpis', 'legal_documents', 'contract_amendments',
  ]) {
    assert.match(sql, new RegExp(`CREATE TABLE IF NOT EXISTS ${table}\\b`), `missing table ${table}`);
  }
});

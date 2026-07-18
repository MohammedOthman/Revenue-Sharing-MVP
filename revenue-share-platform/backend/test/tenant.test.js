import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'fs';
import path from 'path';
import { resolveTenantId } from '../src/middleware/tenant.js';
import { MIGRATIONS_DIR } from '../src/migrate.js';

const memberships = (...ids) => ids.map((id) => ({ tenant_id: id, status: 'active' }));

test('a requested tenant the user belongs to is allowed', () => {
  assert.equal(resolveTenantId('2', memberships(1, 2, 3)), 2);
});

test('a requested tenant the user does NOT belong to is denied', () => {
  assert.equal(resolveTenantId('9', memberships(1, 2, 3)), null);
});

test('with no request and a single membership, that tenant is used', () => {
  assert.equal(resolveTenantId(undefined, memberships(7)), 7);
});

test('with no request and multiple memberships it is ambiguous (null)', () => {
  assert.equal(resolveTenantId(undefined, memberships(1, 2)), null);
});

test('with no memberships, nothing resolves', () => {
  assert.equal(resolveTenantId(undefined, []), null);
  assert.equal(resolveTenantId('1', []), null);
});

test('inactive memberships are ignored', () => {
  const mixed = [{ tenant_id: 1, status: 'suspended' }, { tenant_id: 2, status: 'active' }];
  assert.equal(resolveTenantId(undefined, mixed), 2);
  assert.equal(resolveTenantId('1', mixed), null);
});

test('a non-numeric requested tenant is denied', () => {
  assert.equal(resolveTenantId('abc', memberships(1)), null);
});

test('migration 002 creates tenants + memberships and adds tenant_id to client tables', () => {
  const sql = fs.readFileSync(path.join(MIGRATIONS_DIR, '002_multitenancy.sql'), 'utf8');
  assert.match(sql, /CREATE TABLE IF NOT EXISTS tenants\b/);
  assert.match(sql, /CREATE TABLE IF NOT EXISTS memberships\b/);
  for (const table of ['partners', 'contracts', 'revenue_shares', 'kpis', 'legal_documents', 'contract_amendments']) {
    assert.match(sql, new RegExp(`ALTER TABLE ${table}\\s+ADD COLUMN IF NOT EXISTS tenant_id`), `missing tenant_id on ${table}`);
  }
});

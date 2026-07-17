import { test } from 'node:test';
import assert from 'node:assert/strict';
import { loadOpenApiSpec } from '../src/openapi.js';

const spec = loadOpenApiSpec();

test('the contract parses and declares OpenAPI 3 with info', () => {
  assert.match(spec.openapi, /^3\./);
  assert.ok(spec.info.title.includes('Reven'));
  assert.ok(spec.info.version);
});

test('every API group is documented', () => {
  const expected = [
    '/health',
    '/auth/register', '/auth/login', '/auth/profile',
    '/partners', '/partners/{id}',
    '/contracts', '/contracts/{id}',
    '/amendments', '/amendments/{id}', '/amendments/{id}/send-notice', '/amendments/{id}/acknowledge',
    '/revenue', '/revenue/{id}', '/revenue/trends',
    '/kpis', '/kpis/{id}',
    '/documents', '/documents/{id}',
    '/dashboard/overview', '/dashboard/revenue-trends', '/dashboard/top-partners',
    '/audit',
  ];
  for (const p of expected) {
    assert.ok(spec.paths[p], `missing documented path: ${p}`);
  }
});

test('bearer auth is defined and applied globally', () => {
  assert.equal(spec.components.securitySchemes.bearerAuth.scheme, 'bearer');
  assert.ok(Array.isArray(spec.security) && spec.security.some((s) => 'bearerAuth' in s));
});

test('public endpoints opt out of auth', () => {
  assert.deepEqual(spec.paths['/auth/login'].post.security, []);
  assert.deepEqual(spec.paths['/health'].get.security, []);
});

test('send-notice documents the 422 readiness-blocked response', () => {
  const responses = spec.paths['/amendments/{id}/send-notice'].post.responses;
  assert.ok(responses['422'], 'send-notice must document 422');
});

test('core component schemas are present', () => {
  for (const s of ['Partner', 'Contract', 'Amendment', 'RevenueShare', 'KPI', 'LegalDocument', 'Readiness', 'Error']) {
    assert.ok(spec.components.schemas[s], `missing schema: ${s}`);
  }
});

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validateEnv, assertEnv } from '../src/config/env.js';

const complete = () => ({
  DB_HOST: 'localhost',
  DB_PORT: '5432',
  DB_NAME: 'revenue_share',
  DB_USER: 'postgres',
  DB_PASSWORD: 'postgres',
  JWT_SECRET: 'a-sufficiently-long-secret-value',
});

test('a complete environment validates', () => {
  const r = validateEnv(complete());
  assert.equal(r.ok, true);
  assert.deepEqual(r.missing, []);
});

test('missing required vars are reported', () => {
  const env = complete();
  delete env.DB_PASSWORD;
  delete env.JWT_SECRET;
  const r = validateEnv(env);
  assert.equal(r.ok, false);
  assert.deepEqual(r.missing.sort(), ['DB_PASSWORD', 'JWT_SECRET']);
});

test('blank/whitespace values count as missing', () => {
  const env = { ...complete(), DB_HOST: '   ' };
  assert.ok(validateEnv(env).missing.includes('DB_HOST'));
});

test('a short JWT secret produces a warning but not a hard failure', () => {
  const r = validateEnv({ ...complete(), JWT_SECRET: 'short' });
  assert.equal(r.ok, true);
  assert.equal(r.warnings.length, 1);
});

test('assertEnv throws on missing config and passes when complete', () => {
  assert.throws(() => assertEnv({ DB_HOST: 'localhost' }), /Missing required environment variables/);
  assert.doesNotThrow(() => assertEnv(complete()));
});

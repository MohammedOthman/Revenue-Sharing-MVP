import assert from 'node:assert/strict';
import test from 'node:test';
import { comparePassword, hashPassword } from '../src/utils/password.js';

test('password hashes do not expose the password and verify correctly', async () => {
  const password = 'a-long-production-password';
  const hash = await hashPassword(password);

  assert.notEqual(hash, password);
  assert.equal(await comparePassword(password, hash), true);
  assert.equal(await comparePassword('incorrect-password', hash), false);
});

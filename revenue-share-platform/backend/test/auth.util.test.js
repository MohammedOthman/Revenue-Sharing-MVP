process.env.JWT_SECRET = 'test-secret';

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { generateToken, verifyToken } from '../src/utils/jwt.js';
import { hashPassword, comparePassword } from '../src/utils/password.js';

test('a signed token verifies back to its payload', () => {
  const token = generateToken({ id: 7, email: 'admin@example.com', role: 'admin' });
  assert.equal(typeof token, 'string');
  const decoded = verifyToken(token);
  assert.equal(decoded.id, 7);
  assert.equal(decoded.email, 'admin@example.com');
  assert.equal(decoded.role, 'admin');
});

test('a tampered or garbage token is rejected', () => {
  const token = generateToken({ id: 1, email: 'a@b.com', role: 'user' });
  assert.throws(() => verifyToken(token + 'tampered'));
  assert.throws(() => verifyToken('not-a-jwt'));
});

test('a token signed with a different secret is rejected', () => {
  const token = generateToken({ id: 1, email: 'a@b.com', role: 'user' });
  const original = process.env.JWT_SECRET;
  process.env.JWT_SECRET = 'a-different-secret';
  try {
    assert.throws(() => verifyToken(token));
  } finally {
    process.env.JWT_SECRET = original;
  }
});

test('password hashing round-trips and rejects the wrong password', async () => {
  const hash = await hashPassword('password123');
  assert.notEqual(hash, 'password123'); // stored value is not plaintext
  assert.equal(await comparePassword('password123', hash), true);
  assert.equal(await comparePassword('wrong-password', hash), false);
});

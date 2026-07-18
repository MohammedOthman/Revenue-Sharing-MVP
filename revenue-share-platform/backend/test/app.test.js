import { test } from 'node:test';
import assert from 'node:assert/strict';

// Importing the app must NOT boot the server or connect to the database —
// the isMain guard in server.js keeps startServer() from running under the
// test runner. This protects the ability to add HTTP integration tests later.
test('the Express app can be imported without starting the server', async () => {
  const mod = await import('../src/server.js');
  assert.equal(typeof mod.default, 'function', 'default export should be the express app');
  assert.equal(typeof mod.default.use, 'function', 'app should expose .use');
  assert.equal(typeof mod.startServer, 'function', 'startServer should be exported');
});

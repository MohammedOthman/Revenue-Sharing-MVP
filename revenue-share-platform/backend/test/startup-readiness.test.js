import assert from 'node:assert/strict';
import test from 'node:test';

process.env.NODE_ENV = 'test';
process.env.LOG_LEVEL = 'silent';
process.env.DATABASE_URL ||= 'postgresql://test:test@127.0.0.1:1/test';

test('serves liveness while database initialization is pending', async () => {
  const [{ createApp }, { default: pool }] = await Promise.all([
    import('../src/app.js'),
    import('../src/config/database.js'),
  ]);
  const app = createApp({ ready: false });
  const server = await new Promise((resolve) => {
    const listening = app.listen(0, '127.0.0.1', () => resolve(listening));
  });
  const { port } = server.address();

  try {
    const live = await fetch(`http://127.0.0.1:${port}/api/health/live`);
    assert.equal(live.status, 200);
    assert.deepEqual(await live.json(), { status: 'ok', service: 'reven-api' });

    const blocked = await fetch(`http://127.0.0.1:${port}/api/auth/login`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ email: 'admin@example.com', password: 'not-used' }),
    });
    assert.equal(blocked.status, 503);
    assert.equal((await blocked.json()).error.code, 'SERVICE_INITIALIZING');
  } finally {
    await new Promise((resolve, reject) => server.close((error) => (error ? reject(error) : resolve())));
    await pool.end();
  }
});

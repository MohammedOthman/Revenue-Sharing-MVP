import { createApp } from './app.js';
import pool from './config/database.js';
import { env } from './config/env.js';
import { logger } from './config/logger.js';
import { runMigrations } from './config/migrations.js';
import { bootstrapAdmin } from './services/auth.service.js';

let server;
let stopping = false;
const runtimeState = { ready: false };

const delay = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

async function initializeDatabase() {
  let attempt = 0;
  while (!stopping && !runtimeState.ready) {
    attempt += 1;
    try {
      await runMigrations();
      const bootstrap = await bootstrapAdmin();
      runtimeState.ready = true;
      if (bootstrap.created) logger.info({ email: bootstrap.email }, 'Initial administrator created');
      logger.info({ attempt }, 'Database initialized');
    } catch (error) {
      const retryInMs = Math.min(30_000, 1_000 * 2 ** Math.min(attempt - 1, 5));
      logger.warn({ err: error, attempt, retryInMs }, 'Database initialization failed; retrying');
      await delay(retryInMs);
    }
  }
}

async function start() {
  const app = createApp(runtimeState);
  server = app.listen(env.PORT, '0.0.0.0', () => {
    logger.info({ port: env.PORT }, 'Reven HTTP server is listening');
  });
  void initializeDatabase();
}

async function shutdown(signal) {
  if (stopping) return;
  stopping = true;
  runtimeState.ready = false;
  logger.info({ signal }, 'Graceful shutdown started');
  const forceExit = setTimeout(() => {
    logger.error('Graceful shutdown timed out');
    process.exit(1);
  }, 10000);
  forceExit.unref();

  if (server) await new Promise((resolve) => server.close(resolve));
  await pool.end();
  clearTimeout(forceExit);
  process.exit(0);
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
process.on('unhandledRejection', (error) => {
  logger.fatal({ err: error }, 'Unhandled promise rejection');
  shutdown('unhandledRejection');
});
process.on('uncaughtException', (error) => {
  logger.fatal({ err: error }, 'Uncaught exception');
  shutdown('uncaughtException');
});

start().catch(async (error) => {
  logger.fatal({ err: error }, 'Server failed to start');
  await pool.end().catch(() => {});
  process.exit(1);
});

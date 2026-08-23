import { createApp } from './app.js';
import pool from './config/database.js';
import { env } from './config/env.js';
import { logger } from './config/logger.js';
import { runMigrations } from './config/migrations.js';
import { bootstrapAdmin } from './services/auth.service.js';

let server;

async function start() {
  await runMigrations();
  const bootstrap = await bootstrapAdmin();
  if (bootstrap.created) logger.info({ email: bootstrap.email }, 'Initial administrator created');

  const app = createApp();
  server = app.listen(env.PORT, '0.0.0.0', () => {
    logger.info({ port: env.PORT }, 'Reven is ready');
  });
}

async function shutdown(signal) {
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

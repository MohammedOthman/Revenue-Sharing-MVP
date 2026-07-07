import { validateEnv } from './config/env.js';

const env = validateEnv();

const { default: app } = await import('./app.js');
const { createTables } = await import('./models/schema.js');
const { default: pool } = await import('./config/database.js');

const startServer = async () => {
  try {
    await createTables();

    const server = app.listen(env.port, () => {
      console.log(`Server running on port ${env.port} (${env.nodeEnv})`);
      console.log(`API available at http://localhost:${env.port}/api`);
    });

    const shutdown = (signal) => {
      console.log(`${signal} received, shutting down gracefully...`);
      server.close(async () => {
        try {
          await pool.end();
        } catch (err) {
          console.error('Error closing database pool:', err.message);
        }
        process.exit(0);
      });
      // Force-exit if connections refuse to drain.
      setTimeout(() => process.exit(1), 10000).unref();
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

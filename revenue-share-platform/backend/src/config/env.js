import dotenv from 'dotenv';
import crypto from 'crypto';

dotenv.config();

const bool = (value, fallback = false) => {
  if (value === undefined || value === '') return fallback;
  return ['1', 'true', 'yes', 'on'].includes(String(value).toLowerCase());
};

const int = (value, fallback) => {
  const parsed = parseInt(value, 10);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const nodeEnv = process.env.NODE_ENV || 'development';

const env = {
  nodeEnv,
  isProduction: nodeEnv === 'production',
  isTest: nodeEnv === 'test',
  port: int(process.env.PORT, 5000),

  databaseUrl: process.env.DATABASE_URL || '',
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: int(process.env.DB_PORT, 5432),
    name: process.env.DB_NAME || 'revenue_share',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '',
  },
  dbSsl: bool(process.env.DB_SSL, false),
  dbPoolMax: int(process.env.DB_POOL_MAX, 20),

  jwtSecret: process.env.JWT_SECRET || '',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  bcryptRounds: int(process.env.BCRYPT_ROUNDS, 10),

  corsOrigins: (process.env.CORS_ORIGINS || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean),

  // When false (default), /api/auth/register only works for the very first
  // user (who becomes admin). Further accounts are created by admins.
  allowOpenRegistration: bool(process.env.ALLOW_OPEN_REGISTRATION, false),

  rateLimitWindowMs: int(process.env.RATE_LIMIT_WINDOW_MS, 15 * 60 * 1000),
  rateLimitMax: int(process.env.RATE_LIMIT_MAX, 1000),
  authRateLimitMax: int(process.env.AUTH_RATE_LIMIT_MAX, 20),

  logRequests: bool(process.env.LOG_REQUESTS, true),
};

export const validateEnv = () => {
  const problems = [];

  if (!env.jwtSecret) {
    if (env.isProduction) {
      problems.push('JWT_SECRET is required in production. Generate one with: openssl rand -hex 32');
    } else {
      env.jwtSecret = crypto.randomBytes(32).toString('hex');
      console.warn(
        'WARNING: JWT_SECRET is not set. Using a random secret for this run only — ' +
          'all sessions will be invalidated on restart. Set JWT_SECRET in .env.'
      );
    }
  } else if (env.jwtSecret.length < 16) {
    problems.push('JWT_SECRET must be at least 16 characters long.');
  }

  if (env.isProduction && !env.databaseUrl && !process.env.DB_HOST) {
    problems.push('Database configuration is required in production: set DATABASE_URL or DB_HOST/DB_NAME/DB_USER/DB_PASSWORD.');
  }

  if (env.isProduction && env.corsOrigins.length === 0) {
    console.warn(
      'WARNING: CORS_ORIGINS is not set. Cross-origin browser requests will be rejected; ' +
        'this is fine when the API serves the frontend itself (same origin).'
    );
  }

  if (problems.length > 0) {
    throw new Error(`Invalid environment configuration:\n- ${problems.join('\n- ')}`);
  }

  return env;
};

export default env;

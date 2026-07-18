/**
 * Environment validation — fail fast with a clear message when required
 * configuration is missing, instead of surfacing cryptic errors later
 * (roadmap Phase 1: "add environment validation").
 */
const REQUIRED = ['DB_HOST', 'DB_PORT', 'DB_NAME', 'DB_USER', 'DB_PASSWORD', 'JWT_SECRET'];

const isBlank = (v) => v === undefined || v === null || String(v).trim() === '';

// Pure and unit-testable: returns which required vars are missing.
export const validateEnv = (env = process.env) => {
  const missing = REQUIRED.filter((key) => isBlank(env[key]));
  const warnings = [];
  if (!isBlank(env.JWT_SECRET) && String(env.JWT_SECRET).length < 16) {
    warnings.push('JWT_SECRET is short; use a long random secret in any real environment.');
  }
  return { ok: missing.length === 0, missing, warnings };
};

// Throw if required env vars are missing; log non-fatal warnings.
export const assertEnv = (env = process.env) => {
  const { ok, missing, warnings } = validateEnv(env);
  warnings.forEach((w) => console.warn(`Config warning: ${w}`));
  if (!ok) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}. ` +
      'Copy backend/.env.example to backend/.env and fill in values.'
    );
  }
};

export const REQUIRED_ENV = REQUIRED;

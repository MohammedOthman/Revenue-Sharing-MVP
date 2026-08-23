import 'dotenv/config';
import { z } from 'zod';

const optionalEmail = z.preprocess(
  (value) => (value === '' ? undefined : value),
  z.email().optional(),
);

const optionalString = z.preprocess(
  (value) => (value === '' ? undefined : value),
  z.string().trim().min(1).optional(),
);

const schema = z
  .object({
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
    PORT: z.coerce.number().int().min(1).max(65535).default(3000),
    DATABASE_URL: z.string().trim().min(1, 'DATABASE_URL is required'),
    DB_SSL: z.enum(['disable', 'require']).default('disable'),
    LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent']).default('info'),
    SESSION_TTL_HOURS: z.coerce.number().int().min(1).max(24 * 30).default(24 * 7),
    SESSION_COOKIE_NAME: z.string().regex(/^[A-Za-z0-9_-]+$/).default('reven_session'),
    TRUST_PROXY_HOPS: z.coerce.number().int().min(0).max(5).default(1),
    ADMIN_EMAIL: optionalEmail,
    ADMIN_PASSWORD: optionalString,
    ADMIN_NAME: optionalString,
    ORGANIZATION_NAME: optionalString,
  })
  .superRefine((value, ctx) => {
    const adminFields = [
      value.ADMIN_EMAIL,
      value.ADMIN_PASSWORD,
      value.ADMIN_NAME,
      value.ORGANIZATION_NAME,
    ];
    if (adminFields.some(Boolean) && !adminFields.every(Boolean)) {
      ctx.addIssue({
        code: 'custom',
        message: 'ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_NAME, and ORGANIZATION_NAME must be set together',
      });
    }
    if (value.ADMIN_PASSWORD && value.ADMIN_PASSWORD.length < 14) {
      ctx.addIssue({
        code: 'custom',
        path: ['ADMIN_PASSWORD'],
        message: 'ADMIN_PASSWORD must contain at least 14 characters',
      });
    }
  });

const parsed = schema.safeParse(process.env);

if (!parsed.success) {
  const details = parsed.error.issues
    .map((issue) => `${issue.path.join('.') || 'environment'}: ${issue.message}`)
    .join('; ');
  throw new Error(`Invalid server configuration: ${details}`);
}

export const env = Object.freeze(parsed.data);
export const isProduction = env.NODE_ENV === 'production';

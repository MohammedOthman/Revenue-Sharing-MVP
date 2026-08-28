import express from 'express';
import { rateLimit } from 'express-rate-limit';
import { z } from 'zod';
import { env, isProduction } from '../config/env.js';
import { asyncHandler } from '../lib/http.js';
import { requireAuth, sessionCookieOptions } from '../middleware/auth.js';
import {
  changePassword,
  login,
  logout,
  serializeUser,
} from '../services/auth.service.js';

const router = express.Router();
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  skipSuccessfulRequests: true,
  message: { error: { code: 'RATE_LIMITED', message: 'Too many sign-in attempts. Try again later.' } },
});

const loginSchema = z.object({
  email: z.email().max(320),
  password: z.string().min(1).max(200),
});

router.post(
  '/login',
  loginLimiter,
  asyncHandler(async (req, res) => {
    const credentials = loginSchema.parse(req.body);
    const result = await login({
      ...credentials,
      ipAddress: req.ip,
      userAgent: req.get('user-agent'),
    });
    res.cookie(env.SESSION_COOKIE_NAME, result.token, {
      ...sessionCookieOptions,
      expires: result.expiresAt,
    });
    res.json({ user: result.user });
  }),
);

router.post(
  '/logout',
  asyncHandler(async (req, res) => {
    await logout(req.cookies?.[env.SESSION_COOKIE_NAME]);
    res.clearCookie(env.SESSION_COOKIE_NAME, sessionCookieOptions);
    res.status(204).end();
  }),
);

router.get('/me', requireAuth, (req, res) => {
  res.json({ user: serializeUser(req.user) });
});

router.post(
  '/change-password',
  requireAuth,
  asyncHandler(async (req, res) => {
    const body = z
      .object({
        currentPassword: z.string().min(1).max(200),
        newPassword: z.string().min(14).max(200),
      })
      .parse(req.body);
    await changePassword({
      userId: req.user.id,
      organizationId: req.user.organization_id,
      actorName: req.user.full_name,
      requestId: req.id,
      ...body,
    });
    res.clearCookie(env.SESSION_COOKIE_NAME, sessionCookieOptions);
    res.status(204).end();
  }),
);

router.get('/session-config', (_req, res) => {
  res.json({ cookieSecure: isProduction, passwordMinimumLength: 14 });
});

export default router;

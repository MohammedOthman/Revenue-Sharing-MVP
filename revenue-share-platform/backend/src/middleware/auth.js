import { env, isProduction } from '../config/env.js';
import { HttpError } from '../lib/http.js';
import { sessionUser } from '../services/auth.service.js';

export const sessionCookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: 'lax',
  path: '/',
};

export async function requireAuth(req, _res, next) {
  const token = req.cookies?.[env.SESSION_COOKIE_NAME];
  const user = await sessionUser(token);
  if (!user) return next(new HttpError(401, 'AUTH_REQUIRED', 'Please sign in to continue.'));
  req.user = user;
  req.sessionToken = token;
  return next();
}

export function requireRole(...roles) {
  return (req, _res, next) => {
    if (!roles.includes(req.user?.role)) {
      return next(new HttpError(403, 'FORBIDDEN', 'You do not have permission to perform this action.'));
    }
    return next();
  };
}

export function requirePasswordChanged(req, _res, next) {
  if (req.user?.must_change_password) {
    return next(new HttpError(403, 'PASSWORD_CHANGE_REQUIRED', 'Change your temporary password to continue.'));
  }
  return next();
}

export function requireSameOrigin(req, _res, next) {
  if (!['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method)) return next();
  const origin = req.get('origin');
  if (!origin) return next();
  try {
    const originHost = new URL(origin).host;
    if (originHost !== req.get('host')) {
      return next(new HttpError(403, 'ORIGIN_REJECTED', 'The request origin is not allowed.'));
    }
  } catch {
    return next(new HttpError(403, 'ORIGIN_REJECTED', 'The request origin is not allowed.'));
  }
  return next();
}

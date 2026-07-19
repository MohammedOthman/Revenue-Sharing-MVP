import { insertAuditLog } from '../models/audit.model.js';

const MUTATING_METHODS = new Set(['POST', 'PUT', 'PATCH', 'DELETE']);
const SENSITIVE_KEY = /password|token|secret|authorization/i;

const sanitizeBody = (body) => {
  if (!body || typeof body !== 'object') return null;
  const clean = {};
  for (const [key, value] of Object.entries(body)) {
    clean[key] = SENSITIVE_KEY.test(key) ? '[redacted]' : value;
  }
  const json = JSON.stringify(clean);
  return json.length > 2000 ? json.slice(0, 2000) : json;
};

// Records every successful mutating API call (who, what, when) so financial
// changes have a trail. Runs after the response is sent; failures only log.
export const auditMiddleware = (req, res, next) => {
  if (!MUTATING_METHODS.has(req.method)) return next();

  res.on('finish', () => {
    if (res.statusCode >= 400) return;

    const segments = req.originalUrl.split('?')[0].split('/').filter(Boolean);
    // ['api', 'partners', '42'] -> entity 'partners', entityId '42'
    const entity = segments[1] || null;
    const maybeId = segments[2];
    const entityId = maybeId && /^\d+$/.test(maybeId) ? parseInt(maybeId, 10) : null;

    insertAuditLog({
      userId: req.user?.id ?? null,
      userEmail: req.user?.email ?? null,
      method: req.method,
      path: req.originalUrl.split('?')[0],
      entity,
      entityId,
      statusCode: res.statusCode,
      requestBody: sanitizeBody(req.body),
    }).catch((err) => console.error('Failed to write audit log:', err.message));
  });

  next();
};

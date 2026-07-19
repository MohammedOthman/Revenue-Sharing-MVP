// Tenant-scoped auth. The Reven token carries tenantId so every request is
// isolated to one tenant (FR-14: cross-tenant access is impossible). The legacy
// /api/auth token has no tenantId and cannot reach /api/reven endpoints.
import jwt from 'jsonwebtoken';

export const generateTenantToken = (user, tenantId) =>
  jwt.sign(
    { id: user.id, email: user.email, role: user.role, tenantId },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

export const revenAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.tenantId) {
      return res.status(403).json({ error: 'Token is not tenant-scoped. Sign in at /api/reven/auth/login.' });
    }
    req.user = decoded;
    req.tenantId = decoded.tenantId;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};

// Field-level roles are Phase-1 ABAC (ADR-0008); this is the coarse gate.
export const requireRole = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ error: 'Access denied. Insufficient role.' });
  }
  next();
};

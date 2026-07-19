import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

import env from './config/env.js';
import { checkDatabaseConnection } from './config/database.js';
import { apiLimiter } from './middleware/rateLimit.js';
import { auditMiddleware } from './middleware/audit.js';

import authRoutes from './routes/auth.routes.js';
import partnerRoutes from './routes/partner.routes.js';
import contractRoutes from './routes/contract.routes.js';
import revenueRoutes from './routes/revenue.routes.js';
import kpiRoutes from './routes/kpi.routes.js';
import legalDocumentRoutes from './routes/legalDocument.routes.js';
import dashboardRoutes from './routes/dashboard.routes.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

// Behind a reverse proxy (Docker, Render, Replit, etc.) trust X-Forwarded-*
// so rate limiting and logging see real client IPs.
app.set('trust proxy', 1);
app.disable('x-powered-by');

app.use(
  helmet({
    // The SPA is served from the same origin; keep CSP minimal but real.
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", 'data:'],
        connectSrc: ["'self'"],
        objectSrc: ["'none'"],
        frameAncestors: ["'none'"],
      },
    },
  })
);
app.use(compression());

const corsOptions =
  env.corsOrigins.length > 0
    ? { origin: env.corsOrigins, credentials: true }
    : env.isProduction
      ? { origin: false } // same-origin only in production unless configured
      : { origin: true }; // permissive in development
app.use(cors(corsOptions));

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

if (env.logRequests) {
  app.use((req, res, next) => {
    if (req.path === '/api/health') return next();
    const startedAt = Date.now();
    res.on('finish', () => {
      console.log(
        `${new Date().toISOString()} ${req.method} ${req.originalUrl} ${res.statusCode} ${Date.now() - startedAt}ms`
      );
    });
    next();
  });
}

// Health check: cheap liveness plus a real DB probe.
app.get('/api/health', async (req, res) => {
  try {
    await checkDatabaseConnection();
    res.json({ status: 'ok', database: 'up' });
  } catch (error) {
    res.status(503).json({ status: 'degraded', database: 'down' });
  }
});

app.use('/api', apiLimiter);
app.use('/api', auditMiddleware);

app.use('/api/auth', authRoutes);
app.use('/api/partners', partnerRoutes);
app.use('/api/contracts', contractRoutes);
app.use('/api/revenue', revenueRoutes);
app.use('/api/kpis', kpiRoutes);
// Canonical path plus legacy alias — both serve the same router.
app.use('/api/legal-documents', legalDocumentRoutes);
app.use('/api/documents', legalDocumentRoutes);
app.use('/api/dashboard', dashboardRoutes);

app.use('/api', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// In production the API serves the built frontend (single-origin deploy).
const frontendDist =
  process.env.FRONTEND_DIST || path.resolve(__dirname, '../../frontend/dist');
if (fs.existsSync(path.join(frontendDist, 'index.html'))) {
  app.use(express.static(frontendDist, { maxAge: '1h', index: false }));
  app.get('*', (req, res) => {
    res.sendFile(path.join(frontendDist, 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.json({ message: 'Revenue Share Platform API. Frontend build not found; see /api/health.' });
  });
}

// Final error handler: consistent JSON shape, no stack traces in production.
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (err?.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'Invalid JSON in request body' });
  }
  if (err?.type === 'entity.too.large') {
    return res.status(413).json({ error: 'Request body too large' });
  }
  console.error('Unhandled error:', err);
  res.status(err.status || 500).json({
    error: 'Internal server error',
    ...(env.isProduction ? {} : { message: err.message }),
  });
});

export default app;

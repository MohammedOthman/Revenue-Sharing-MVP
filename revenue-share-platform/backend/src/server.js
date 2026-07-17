import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import swaggerUi from 'swagger-ui-express';
import dotenv from 'dotenv';
import { pathToFileURL } from 'url';
import { runMigrations } from './migrate.js';
import { assertEnv } from './config/env.js';
import { openApiSpec } from './openapi.js';

// Import routes
import authRoutes from './routes/auth.routes.js';
import partnerRoutes from './routes/partner.routes.js';
import contractRoutes from './routes/contract.routes.js';
import amendmentRoutes from './routes/amendment.routes.js';
import revenueRoutes from './routes/revenue.routes.js';
import kpiRoutes from './routes/kpi.routes.js';
import legalDocumentRoutes from './routes/legalDocument.routes.js';
import dashboardRoutes from './routes/dashboard.routes.js';
import auditRoutes from './routes/audit.routes.js';
import claimRoutes from './routes/claim.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security headers
app.use(helmet());

// CORS allowlist. In production, restrict to the origins in CORS_ORIGINS
// (comma-separated). Elsewhere (and when unset) allow all for local dev,
// where the Vite proxy serves the SPA same-origin.
const corsOrigins = (process.env.CORS_ORIGINS || '')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);

if (process.env.NODE_ENV === 'production' && corsOrigins.length > 0) {
  app.use(cors({ origin: corsOrigins }));
} else {
  app.use(cors());
}

// Body parsing with a sane size limit
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// Rate limiting: a general API cap, plus a stricter cap on auth endpoints
// to slow credential-stuffing / brute force.
const rateLimitOptions = {
  windowMs: 15 * 60 * 1000,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => res.status(429).json({ error: 'Too many requests, please try again later.' }),
};
const apiLimiter = rateLimit({ ...rateLimitOptions, limit: 300 });
const authLimiter = rateLimit({ ...rateLimitOptions, limit: 20 });

app.use('/api', apiLimiter);

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// API contract: raw spec + interactive docs (public). Swagger UI needs inline
// assets, so relax the CSP for the docs HTML only.
app.get('/api/openapi.json', (req, res) => res.json(openApiSpec));
app.use(
  '/api/docs',
  (req, res, next) => { res.removeHeader('Content-Security-Policy'); next(); },
  swaggerUi.serve,
  swaggerUi.setup(openApiSpec, { customSiteTitle: 'Reven API' })
);

// Routes
app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/partners', partnerRoutes);
app.use('/api/contracts', contractRoutes);
app.use('/api/amendments', amendmentRoutes);
app.use('/api/revenue', revenueRoutes);
app.use('/api/kpis', kpiRoutes);
app.use('/api/documents', legalDocumentRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/audit', auditRoutes);
app.use('/api/claims', claimRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Revenue Share Platform API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server and initialize database
export const startServer = async () => {
  try {
    // Validate configuration before doing anything that depends on it
    assertEnv();

    // Apply any pending database migrations
    await runMigrations();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`API available at http://localhost:${PORT}/api`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Only start when run directly (so tests can import `app` without booting).
const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (isMain) {
  startServer();
}

export default app;

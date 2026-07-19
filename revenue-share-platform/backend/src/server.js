import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { createTables } from './models/schema.js';
import { runMigrations } from './reven/migrate.js';

// Import routes
import authRoutes from './routes/auth.routes.js';
import partnerRoutes from './routes/partner.routes.js';
import contractRoutes from './routes/contract.routes.js';
import revenueRoutes from './routes/revenue.routes.js';
import kpiRoutes from './routes/kpi.routes.js';
import legalDocumentRoutes from './routes/legalDocument.routes.js';
import dashboardRoutes from './routes/dashboard.routes.js';
import revenRoutes from './reven/routes.js';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Fail fast with a clear message if required configuration is missing. Without
// JWT_SECRET every login and token check throws at request time instead of boot,
// which is much harder to diagnose on a live server.
const requiredEnv = ['JWT_SECRET'];
const hasDbConfig = process.env.DATABASE_URL || process.env.DB_HOST;
const missing = requiredEnv.filter((key) => !process.env[key]);
if (!hasDbConfig) missing.push('DATABASE_URL (or DB_HOST/DB_NAME/DB_USER/DB_PASSWORD)');
if (missing.length > 0) {
  console.error('Missing required environment variables: ' + missing.join(', '));
  console.error('Copy backend/.env.example to backend/.env and fill in the values.');
  process.exit(1);
}

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware. CORS_ORIGIN restricts who may call the API in production; if unset,
// all origins are allowed (fine for local dev, tighten before going live).
const corsOrigin = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',').map((o) => o.trim())
  : true;
app.use(cors({ origin: corsOrigin }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/partners', partnerRoutes);
app.use('/api/contracts', contractRoutes);
app.use('/api/revenue', revenueRoutes);
app.use('/api/kpis', kpiRoutes);
app.use('/api/documents', legalDocumentRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Reven Phase-1 "Capture" PRM (multi-tenant, claim-centric, no money movement)
app.use('/api/reven', revenRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Revenue Share Platform API is running' });
});

// Serve the built frontend (single-service deploy). Vite builds to
// frontend/dist; when that folder exists, Express serves it and sends
// index.html for any non-API route so React Router can handle the path.
const frontendDist = path.resolve(__dirname, '../../frontend/dist');
if (fs.existsSync(frontendDist)) {
  app.use(express.static(frontendDist));
  app.get(/^\/(?!api\/).*/, (req, res) => {
    res.sendFile(path.join(frontendDist, 'index.html'));
  });
  console.log('Serving frontend from ' + frontendDist);
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler (API routes only; frontend routes are handled above)
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Connect to the database with a few retries. Managed Postgres instances can
// take several seconds to accept connections on a cold start; one failed attempt
// should not permanently kill the service.
const initDatabase = async (attempts = 5) => {
  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      await createTables();
      await runMigrations();
      return;
    } catch (error) {
      console.error(`Database init attempt ${attempt}/${attempts} failed: ${error.message}`);
      if (attempt === attempts) throw error;
      await new Promise((resolve) => setTimeout(resolve, attempt * 2000));
    }
  }
};

const startServer = async () => {
  try {
    await initDatabase();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`API available at http://localhost:${PORT}/api`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();

export default app;

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createTables } from './models/schema.js';

// Import routes
import authRoutes from './routes/auth.routes.js';
import partnerRoutes from './routes/partner.routes.js';
import contractRoutes from './routes/contract.routes.js';
import revenueRoutes from './routes/revenue.routes.js';
import kpiRoutes from './routes/kpi.routes.js';
import legalDocumentRoutes from './routes/legalDocument.routes.js';
import dashboardRoutes from './routes/dashboard.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
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
const startServer = async () => {
  try {
    // Initialize database tables
    await createTables();
    
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

startServer();

export default app;

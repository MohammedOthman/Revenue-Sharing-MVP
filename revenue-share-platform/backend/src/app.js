import { randomUUID } from 'node:crypto';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import express from 'express';
import { rateLimit } from 'express-rate-limit';
import helmet from 'helmet';
import pinoHttp from 'pino-http';
import { checkDatabase } from './config/database.js';
import { env, isProduction } from './config/env.js';
import { logger } from './config/logger.js';
import { errorHandler, HttpError } from './lib/http.js';
import { requireSameOrigin } from './middleware/auth.js';
import authRoutes from './routes/auth.routes.js';
import claimRoutes from './routes/claim.routes.js';
import entityRoutes from './routes/entity.routes.js';
import userRoutes from './routes/user.routes.js';

const frontendDist = fileURLToPath(new URL('../../frontend/dist', import.meta.url));
const indexFile = fileURLToPath(new URL('../../frontend/dist/index.html', import.meta.url));

export function createApp(runtimeState = { ready: true }) {
  const app = express();
  app.disable('x-powered-by');
  if (isProduction) app.set('trust proxy', env.TRUST_PROXY_HOPS);

  app.use(
    pinoHttp({
      logger,
      genReqId: (req, res) => {
        const incoming = req.headers['x-request-id'];
        const id = typeof incoming === 'string' && incoming.length <= 100 ? incoming : randomUUID();
        res.setHeader('x-request-id', id);
        return id;
      },
      customLogLevel: (_req, res, error) => {
        if (error || res.statusCode >= 500) return 'error';
        if (res.statusCode >= 400) return 'warn';
        return 'info';
      },
    }),
  );
  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: 'same-origin' },
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          imgSrc: ["'self'", 'data:'],
          fontSrc: ["'self'", 'data:'],
          connectSrc: ["'self'"],
          frameAncestors: ["'none'"],
          formAction: ["'self'"],
          baseUri: ["'self'"],
          upgradeInsecureRequests: isProduction ? [] : null,
        },
      },
    }),
  );
  app.use(compression());
  app.use(cookieParser());
  app.use(express.json({ limit: '256kb', strict: true }));
  app.use(express.urlencoded({ extended: false, limit: '32kb' }));
  app.use(requireSameOrigin);

  app.get('/api/health/live', (_req, res) => {
    res.json({ status: 'ok', service: 'reven-api' });
  });
  app.get('/api/health/ready', async (req, res) => {
    if (!runtimeState.ready) {
      return res.status(503).json({ status: 'not_ready', database: 'initializing' });
    }
    try {
      await checkDatabase();
      return res.json({ status: 'ready', database: 'connected' });
    } catch (error) {
      req.log.warn({ err: error }, 'Readiness check failed');
      return res.status(503).json({ status: 'not_ready', database: 'unavailable' });
    }
  });

  app.use('/api', (_req, _res, next) => {
    if (!runtimeState.ready) {
      return next(
        new HttpError(503, 'SERVICE_INITIALIZING', 'Reven is waiting for its database connection.'),
      );
    }
    return next();
  });

  const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 600,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    message: { error: { code: 'RATE_LIMITED', message: 'Too many requests. Try again later.' } },
  });
  app.use('/api', apiLimiter, (_req, res, next) => {
    res.setHeader('cache-control', 'no-store');
    next();
  });
  app.use('/api/auth', authRoutes);
  app.use('/api/claims', claimRoutes);
  app.use('/api/entities', entityRoutes);
  app.use('/api/users', userRoutes);
  app.use('/api', (req, _res, next) => {
    next(new HttpError(404, 'API_NOT_FOUND', `No API route exists for ${req.method} ${req.path}.`));
  });

  if (existsSync(frontendDist)) {
    app.use(
      express.static(frontendDist, {
        index: false,
        maxAge: '1y',
        immutable: true,
        setHeaders: (res, path) => {
          if (path.endsWith('.html')) res.setHeader('cache-control', 'no-cache');
        },
      }),
    );
    app.use((req, res, next) => {
      if (req.method !== 'GET' && req.method !== 'HEAD') return next();
      res.setHeader('cache-control', 'no-cache');
      return res.sendFile(indexFile);
    });
  } else {
    app.get('/', (_req, res) => {
      res.status(503).json({ status: 'not_ready', message: 'Frontend build is missing.' });
    });
  }

  app.use(errorHandler);
  return app;
}

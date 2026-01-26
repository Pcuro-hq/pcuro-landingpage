import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';

import { config } from './config';
import { corsOptions } from './config/cors';
import { apiRoutes } from './routes';
import { errorHandler, requestLogger, generalLimiter } from './middlewares';

/**
 * Create and configure the Express application
 */
export const createApp = (): Application => {
  const app = express();

  // Trust proxy - required for rate limiting behind Render/load balancers
  app.set('trust proxy', 1);

  // Security middleware
  app.use(helmet());

  // CORS configuration
  app.use(cors(corsOptions));

  // Body parsing
  app.use(express.json({ limit: '10kb' }));
  app.use(express.urlencoded({ extended: true, limit: '10kb' }));

  // Request logging (development only)
  if (config.isDevelopment) {
    app.use(requestLogger);
  }

  // General rate limiting
  app.use(generalLimiter);

  // API routes
  app.use(config.api.prefix, apiRoutes);

  // Root endpoint
  app.get('/', (_req: Request, res: Response) => {
    res.json({
      name: 'Pcuro Landing API',
      version: config.api.version,
      docs: `${config.api.prefix}/health`,
    });
  });

  // 404 handler
  app.use((_req: Request, res: Response) => {
    res.status(404).json({
      success: false,
      error: {
        code: 'NOT_FOUND',
        message: 'The requested resource was not found',
      },
    });
  });

  // Global error handler (must be last)
  app.use(errorHandler);

  return app;
};

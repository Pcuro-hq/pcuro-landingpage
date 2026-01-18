import { Router, Request, Response } from 'express';
import { waitlistRoutes } from './waitlist.routes';
import { config } from '../config';

const router = Router();

/**
 * Health check endpoint
 * GET /api/v1/health
 */
router.get('/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: config.api.version,
    environment: config.nodeEnv,
  });
});

/**
 * Waitlist routes
 * /api/v1/waitlist
 */
router.use('/waitlist', waitlistRoutes);

export { router as apiRoutes };

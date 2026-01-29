import { Router } from 'express';
import { waitlistController } from '../controllers';
import { asyncHandler, waitlistLimiter, optionalApiKeyAuth } from '../middlewares';
import { validateWaitlist } from '../validators';

const router = Router();

/**
 * POST /api/waitlist
 * Add a new entry to the waitlist
 * 
 * Rate limited: 5 requests per 15 minutes
 * Validates: fullName, companyName, email
 */
router.post(
  '/',
  waitlistLimiter,
  validateWaitlist,
  asyncHandler(waitlistController.create)
);

/**
 * GET /api/waitlist/stats
 * Get waitlist statistics
 * 
 * Protected: Requires x-api-key header if ADMIN_API_KEY env var is set
 */
router.get(
  '/stats',
  optionalApiKeyAuth,
  asyncHandler(waitlistController.getStats)
);

export const waitlistRoutes = router;

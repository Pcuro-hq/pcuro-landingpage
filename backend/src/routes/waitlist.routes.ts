import { Router } from 'express';
import { waitlistController } from '../controllers';
import { asyncHandler, waitlistLimiter } from '../middlewares';
import { validateWaitlist } from '../validators';

const router = Router();

/**
 * POST /api/v1/waitlist
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
 * GET /api/v1/waitlist/stats
 * Get waitlist statistics
 * 
 * Note: In production, this should be protected with authentication
 */
router.get(
  '/stats',
  asyncHandler(waitlistController.getStats)
);

export const waitlistRoutes = router;

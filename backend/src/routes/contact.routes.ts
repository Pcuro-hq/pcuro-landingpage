import { Router } from 'express';
import { contactController } from '../controllers';
import { asyncHandler, generalLimiter } from '../middlewares';
import { validateContact } from '../validators';

const router = Router();

/**
 * POST /api/contact
 * Submit a contact form message
 * 
 * Rate limited: 100 requests per 15 minutes (general limiter)
 * Validates: name, email, message
 */
router.post(
  '/',
  generalLimiter,
  validateContact,
  asyncHandler(contactController.submit)
);

export const contactRoutes = router;

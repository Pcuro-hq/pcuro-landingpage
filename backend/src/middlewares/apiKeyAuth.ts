import { Request, Response, NextFunction } from 'express';
import { AppError } from './errorHandler';

/**
 * Optional API Key authentication middleware
 * 
 * If ADMIN_API_KEY env var is set, requires x-api-key header to match.
 * If not set, allows all requests (for development/simplicity).
 */
export const optionalApiKeyAuth = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const adminApiKey = process.env.ADMIN_API_KEY;

  // If no API key configured, allow access (opt-in security)
  if (!adminApiKey) {
    return next();
  }

  const providedKey = req.headers['x-api-key'];

  if (!providedKey || providedKey !== adminApiKey) {
    throw new AppError('Unauthorized - Invalid or missing API key', 401, 'UNAUTHORIZED');
  }

  next();
};

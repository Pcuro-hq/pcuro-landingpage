import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';

/**
 * Waitlist form validation schema with sanitization
 * - Trims whitespace from all fields
 * - Normalizes email to lowercase
 * - Enforces length limits
 */
export const waitlistSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .trim()
    .refine((val) => val.length >= 2, {
      message: 'Name must be at least 2 characters after trimming',
    }),
  companyName: z
    .string()
    .min(1, 'Company name is required')
    .max(200, 'Company name must be less than 200 characters')
    .trim()
    .refine((val) => val.length >= 1, {
      message: 'Company name is required',
    }),
  email: z
    .string()
    .email('Please enter a valid email address')
    .max(254, 'Email must be less than 254 characters')
    .trim()
    .toLowerCase(),
});

export type WaitlistInput = z.infer<typeof waitlistSchema>;

/**
 * Middleware factory for validating request body against a Zod schema
 */
export const validate = <T extends z.ZodSchema>(schema: T) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);
    
    if (!result.success) {
      // Pass the ZodError to the error handler
      next(result.error);
      return;
    }

    // Replace body with parsed/transformed data
    req.body = result.data;
    next();
  };
};

/**
 * Pre-configured middleware for validating waitlist requests
 */
export const validateWaitlist = validate(waitlistSchema);

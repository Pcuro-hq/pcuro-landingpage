import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';

/**
 * Contact form validation schema
 */
export const contactSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .trim(),
  email: z
    .string()
    .email('Please enter a valid email address')
    .max(254, 'Email must be less than 254 characters')
    .trim()
    .toLowerCase(),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message must be less than 2000 characters')
    .trim(),
});

export type ContactInput = z.infer<typeof contactSchema>;

/**
 * Middleware for validating contact form requests
 */
export const validateContact = (req: Request, _res: Response, next: NextFunction): void => {
  const result = contactSchema.safeParse(req.body);
  
  if (!result.success) {
    next(result.error);
    return;
  }

  req.body = result.data;
  next();
};

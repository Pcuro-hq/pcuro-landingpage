import { Request, Response, NextFunction } from 'express';
import { config } from '../config';

/**
 * Simple request logging middleware
 * Logs method, URL, status code, and response time
 */
export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    const { method, originalUrl } = req;
    const { statusCode } = res;

    const logLevel = statusCode >= 400 ? 'error' : 'info';
    const timestamp = new Date().toISOString();

    const logMessage = `[${timestamp}] ${method} ${originalUrl} ${statusCode} - ${duration}ms`;

    if (config.isDevelopment) {
      if (logLevel === 'error') {
        console.error(logMessage);
      } else {
        console.log(logMessage);
      }
    }
  });

  next();
};

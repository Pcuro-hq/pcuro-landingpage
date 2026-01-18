import { Response } from 'express';
import { ApiResponse, ApiError } from '../types';

/**
 * Send a successful response with data
 */
export const success = <T>(
  res: Response,
  data: T,
  statusCode: number = 200
): Response => {
  const response: ApiResponse<T> = {
    success: true,
    data,
  };
  return res.status(statusCode).json(response);
};

/**
 * Send a created response (201)
 */
export const created = <T>(res: Response, data: T): Response => {
  return success(res, data, 201);
};

/**
 * Send an error response
 */
export const error = (
  res: Response,
  code: string,
  message: string,
  statusCode: number = 400,
  details?: Record<string, string[]>
): Response => {
  const errorPayload: ApiError = {
    code,
    message,
  };

  if (details) {
    errorPayload.details = details;
  }

  const response: ApiResponse = {
    success: false,
    error: errorPayload,
  };

  return res.status(statusCode).json(response);
};

/**
 * Send a not found response (404)
 */
export const notFound = (res: Response, message: string = 'Resource not found'): Response => {
  return error(res, 'NOT_FOUND', message, 404);
};

/**
 * Send a conflict response (409)
 */
export const conflict = (res: Response, message: string = 'Resource already exists'): Response => {
  return error(res, 'CONFLICT', message, 409);
};

export const responseHelper = {
  success,
  created,
  error,
  notFound,
  conflict,
};

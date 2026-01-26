import { 
  WaitlistFormData, 
  WaitlistSuccessData, 
  ContactFormData, 
  ContactSuccessData, 
  ApiResponse, 
  ErrorCode 
} from '../types';

export class ApiClientError extends Error {
  public code: string;
  public statusCode?: number;

  constructor(message: string, code: string, statusCode?: number) {
    super(message);
    this.name = 'ApiClientError';
    this.code = code;
    this.statusCode = statusCode;
  }
}

export type RetryCallback = (attempt: number, maxRetries: number) => void;

export interface SubmitOptions {
  onRetry?: RetryCallback;
}

/**
 * Submit waitlist form data
 * Uses local Next.js API route which proxies to backend with retry logic
 */
export async function submitWaitlist(
  data: WaitlistFormData,
  options?: SubmitOptions
): Promise<WaitlistSuccessData> {
  const response = await fetch('/api/waitlist', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const result: ApiResponse<WaitlistSuccessData> = await response.json();

  if (!response.ok || !result.success) {
    throw new ApiClientError(
      result.error?.message || 'An error occurred',
      result.error?.code || ErrorCode.SERVER_ERROR,
      response.status
    );
  }

  return result.data as WaitlistSuccessData;
}

/**
 * Submit contact form data
 * Uses local Next.js API route which proxies to backend with retry logic
 */
export async function submitContact(
  data: ContactFormData,
  options?: SubmitOptions
): Promise<ContactSuccessData> {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const result: ApiResponse<ContactSuccessData> = await response.json();

  if (!response.ok || !result.success) {
    throw new ApiClientError(
      result.error?.message || 'An error occurred',
      result.error?.code || ErrorCode.SERVER_ERROR,
      response.status
    );
  }

  return result.data as ContactSuccessData;
}

export function getErrorMessage(error: ApiClientError): string {
  return error.message || 'Something went wrong';
}

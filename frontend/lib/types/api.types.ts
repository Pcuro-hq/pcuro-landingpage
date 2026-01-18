export interface WaitlistFormData {
  fullName: string;
  companyName: string;
  email: string;
}

export interface WaitlistSuccessData {
  id: string;
  message: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: { code: string; message: string };
}

export type FieldErrors = Record<string, string>;
export type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export enum ErrorCode {
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',
  NETWORK_ERROR = 'NETWORK_ERROR',
  SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
}

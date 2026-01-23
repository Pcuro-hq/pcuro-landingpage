import { 
  WaitlistFormData, 
  WaitlistSuccessData, 
  ContactFormData, 
  ContactSuccessData, 
  ApiResponse, 
  ErrorCode 
} from '../types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';

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

export async function submitWaitlist(data: WaitlistFormData): Promise<WaitlistSuccessData> {
  const response = await fetch(`${API_BASE_URL}/api/waitlist`, {
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

export async function submitContact(data: ContactFormData): Promise<ContactSuccessData> {
  const response = await fetch(`${API_BASE_URL}/api/contact`, {
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

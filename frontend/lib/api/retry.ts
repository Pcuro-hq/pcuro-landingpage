/**
 * Cold Start Retry Utility
 * Handles Render free tier cold starts with exponential backoff
 */

export class ColdStartError extends Error {
  constructor(message: string = 'Server is waking up') {
    super(message);
    this.name = 'ColdStartError';
  }
}

export interface RetryConfig {
  maxRetries?: number;
  initialDelayMs?: number;
  maxDelayMs?: number;
  backoffMultiplier?: number;
  onRetry?: (attempt: number, maxRetries: number, error: Error) => void;
}

const DEFAULT_CONFIG: Required<Omit<RetryConfig, 'onRetry'>> = {
  maxRetries: 5,
  initialDelayMs: 1000,
  maxDelayMs: 30000,
  backoffMultiplier: 2,
};

/**
 * Check if an error indicates a cold start scenario
 */
function isColdStartError(error: unknown, response?: Response): boolean {
  // HTTP status codes indicating server not ready
  if (response) {
    const coldStartStatuses = [503, 504, 502];
    if (coldStartStatuses.includes(response.status)) {
      return true;
    }
  }

  // Network errors that indicate server is down/starting
  if (error instanceof Error) {
    const coldStartMessages = [
      'ECONNREFUSED',
      'ENOTFOUND',
      'ETIMEDOUT',
      'ECONNRESET',
      'fetch failed',
      'network error',
      'Failed to fetch',
    ];
    
    return coldStartMessages.some(msg => 
      error.message.toLowerCase().includes(msg.toLowerCase())
    );
  }

  return false;
}

/**
 * Calculate delay for current attempt using exponential backoff
 */
function calculateBackoff(
  attempt: number,
  initialDelayMs: number,
  maxDelayMs: number,
  backoffMultiplier: number
): number {
  const delay = initialDelayMs * Math.pow(backoffMultiplier, attempt);
  return Math.min(delay, maxDelayMs);
}

/**
 * Delay execution for specified milliseconds
 */
function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Fetch with automatic retry on cold start errors
 */
export async function fetchWithRetry(
  url: string,
  options: RequestInit,
  config: RetryConfig = {}
): Promise<Response> {
  const {
    maxRetries = DEFAULT_CONFIG.maxRetries,
    initialDelayMs = DEFAULT_CONFIG.initialDelayMs,
    maxDelayMs = DEFAULT_CONFIG.maxDelayMs,
    backoffMultiplier = DEFAULT_CONFIG.backoffMultiplier,
    onRetry,
  } = config;

  let lastError: Error = new Error('Unknown error');

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s timeout

      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      // Check if response indicates cold start
      if (isColdStartError(null, response)) {
        throw new ColdStartError(`Server returned ${response.status}`);
      }

      return response;
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));

      // Check if this is a cold start error and we have retries left
      const isRetryable = isColdStartError(error) || error instanceof ColdStartError;
      
      if (isRetryable && attempt < maxRetries) {
        // Notify caller about retry
        if (onRetry) {
          onRetry(attempt + 1, maxRetries, lastError);
        }

        // Wait before retrying
        const backoffDelay = calculateBackoff(
          attempt,
          initialDelayMs,
          maxDelayMs,
          backoffMultiplier
        );
        
        await delay(backoffDelay);
        continue;
      }

      // Not a cold start error or out of retries
      throw lastError;
    }
  }

  // Should never reach here, but TypeScript needs this
  throw lastError;
}

import { NextRequest, NextResponse } from 'next/server';
import { fetchWithRetry, ColdStartError } from '@/lib/api/retry';

const BACKEND_API_URL = process.env.BACKEND_API_URL || 'http://localhost:4000';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const response = await fetchWithRetry(
      `${BACKEND_API_URL}/api/contact`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      },
      {
        maxRetries: 5,
        initialDelayMs: 1000,
        maxDelayMs: 30000,
      }
    );

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    if (error instanceof ColdStartError) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'SERVER_UNAVAILABLE',
            message: 'Server is temporarily unavailable. Please try again in a moment.',
          },
        },
        { status: 503 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'SERVER_ERROR',
          message: 'An unexpected error occurred. Please try again.',
        },
      },
      { status: 500 }
    );
  }
}

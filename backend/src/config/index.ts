import dotenv from 'dotenv';

dotenv.config();

const nodeEnv = process.env.NODE_ENV || 'development';
const isProduction = nodeEnv === 'production';

/**
 * Validate required environment variables
 * Throws an error in production if required vars are missing
 */
function validateEnvVars(): void {
  const requiredVars = [
    { name: 'DATABASE_URL', value: process.env.DATABASE_URL },
    { name: 'FRONTEND_URL', value: process.env.FRONTEND_URL },
  ];

  const missing = requiredVars.filter(v => !v.value);

  if (missing.length > 0 && isProduction) {
    throw new Error(
      `Missing required environment variables: ${missing.map(v => v.name).join(', ')}`
    );
  }

  if (missing.length > 0) {
    console.warn(
      `[Config] Warning: Missing environment variables: ${missing.map(v => v.name).join(', ')}`
    );
  }

  // Warn about optional but recommended vars
  if (!process.env.RESEND_SEND_ACCESS_KEY) {
    console.warn('[Config] Warning: RESEND_SEND_ACCESS_KEY not set - emails will be logged only');
  }
}

validateEnvVars();

export const config = {
  port: parseInt(process.env.PORT || '4000', 10),
  nodeEnv,
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
  databaseUrl: process.env.DATABASE_URL || '',
  resendApiKey: process.env.RESEND_SEND_ACCESS_KEY || '',
  
  isDevelopment: nodeEnv === 'development',
  isProduction,
  
  api: {
    version: '1.0.0',
    prefix: '/api',
  },
  
  email: {
    from: 'Pcuro <noreply@pcuro.com>',
    replyTo: 'contact@pcuro.com',
  },
} as const;

export type Config = typeof config;

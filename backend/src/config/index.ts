import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || '4000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
  databaseUrl: process.env.DATABASE_URL || '',
  resendApiKey: process.env.RESEND_SEND_ACCESS_KEY || '',
  
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  
  api: {
    version: '1.0.0',
    prefix: '/api',
  },
  
  email: {
    from: 'Pcuro <onboarding@resend.dev>',
    replyTo: 'contact@pcuro.com',
  },
} as const;

export type Config = typeof config;

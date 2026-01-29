import { Pool, PoolConfig } from 'pg';
import { config } from './index';

/**
 * Database pool configuration
 * Optimized for Render free tier / serverless environments
 */
const poolConfig: PoolConfig = {
  connectionString: config.databaseUrl,
  // Pool size limits
  max: config.isProduction ? 10 : 5, // Maximum connections in pool
  min: 0, // Minimum connections (0 allows full scale-down)
  // Timeouts
  idleTimeoutMillis: 30000, // Close idle connections after 30s
  connectionTimeoutMillis: 10000, // Fail connection attempts after 10s
  // SSL configuration for production (Neon requires SSL)
  ssl: config.isProduction ? { rejectUnauthorized: false } : undefined,
};

export const pool = new Pool(poolConfig);

// Handle pool errors to prevent crashes
pool.on('error', (err) => {
  console.error('[Database] Unexpected pool error:', err.message);
});

pool.on('connect', () => {
  if (config.isDevelopment) {
    console.log('[Database] New client connected to pool');
  }
});

/**
 * Verify database connection on startup
 * @returns Promise that resolves if connection is successful
 */
export async function verifyDatabaseConnection(): Promise<boolean> {
  try {
    const client = await pool.connect();
    await client.query('SELECT 1');
    client.release();
    console.log('[Database] Connection verified successfully');
    return true;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('[Database] Connection verification failed:', message);
    return false;
  }
}

/**
 * Close all pool connections gracefully
 * Call this during shutdown
 */
export async function closePool(): Promise<void> {
  try {
    await pool.end();
    console.log('[Database] Pool closed successfully');
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('[Database] Error closing pool:', message);
  }
}

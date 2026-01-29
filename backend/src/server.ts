import { createApp } from './app';
import { config } from './config';
import { verifyDatabaseConnection, closePool } from './config/database';
import { Server } from 'http';

let server: Server | null = null;

/**
 * Bootstrap and start the server
 */
const startServer = async (): Promise<void> => {
  try {
    // Verify database connection before starting
    const dbConnected = await verifyDatabaseConnection();
    if (!dbConnected && config.isProduction) {
      throw new Error('Database connection failed - cannot start in production');
    }

    const app = createApp();

    server = app.listen(config.port, () => {
      console.log('================================');
      console.log('Pcuro Landing API');
      console.log('================================');
      console.log(`Environment: ${config.nodeEnv}`);
      console.log(`Port: ${config.port}`);
      console.log(`API Prefix: ${config.api.prefix}`);
      console.log(`Health: http://localhost:${config.port}${config.api.prefix}/health`);
      console.log(`Frontend URL: ${config.frontendUrl}`);
      console.log(`Database: ${dbConnected ? 'Connected' : 'Not connected'}`);
      console.log('================================');
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

/**
 * Graceful shutdown handler
 */
const gracefulShutdown = async (signal: string): Promise<void> => {
  console.log(`\n[Server] Received ${signal}. Starting graceful shutdown...`);

  // Stop accepting new connections
  if (server) {
    server.close(() => {
      console.log('[Server] HTTP server closed');
    });
  }

  // Close database pool
  await closePool();

  console.log('[Server] Graceful shutdown complete');
  process.exit(0);
};

// Handle shutdown signals
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Handle uncaught exceptions
process.on('uncaughtException', (error: Error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason: unknown) => {
  console.error('Unhandled Rejection:', reason);
  process.exit(1);
});

// Start the server
startServer();

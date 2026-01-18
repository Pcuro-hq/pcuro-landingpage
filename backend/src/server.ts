import { createApp } from './app';
import { config } from './config';

/**
 * Bootstrap and start the server
 */
const startServer = async (): Promise<void> => {
  try {
    const app = createApp();

    app.listen(config.port, () => {
      console.log('🚀 ================================');
      console.log(`🚀 Pcuro Landing API`);
      console.log(`🚀 ================================`);
      console.log(`🚀 Environment: ${config.nodeEnv}`);
      console.log(`🚀 Port: ${config.port}`);
      console.log(`🚀 API Prefix: ${config.api.prefix}`);
      console.log(`🚀 Health: http://localhost:${config.port}${config.api.prefix}/health`);
      console.log(`🚀 Frontend URL: ${config.frontendUrl}`);
      console.log('🚀 ================================');
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

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

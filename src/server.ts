// In your server.ts or index.ts (where you start the server)
import { createApp } from './app';
import http from 'http';

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    const app = await createApp();
    const server = http.createServer(app);

    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();

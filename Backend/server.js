import http from 'http';
import app from './app.js';
import dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT || 4000;
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`✅ Server is running on port ${port}`);
});

server.on('error', err => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${port} is already in use. Stop the other process or set PORT env var.`);
    process.exit(1);
  }
  if (err.code === 'EACCES') {
    console.error(`Permission denied for port ${port}. Try a different port or run with elevated privileges.`);
    process.exit(1);
  }
  throw err;
});

process.on('SIGINT', () => {
  console.log('Shutting down...');
  server.close(() => process.exit(0));
});

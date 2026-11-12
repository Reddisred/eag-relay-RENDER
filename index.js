import http from 'http';
import express from 'express';
import { EaglerSPRelay } from 'eaglerrelayjs';

const app = express();
const server = http.createServer(app);
const relay = new EaglerSPRelay({ debug: true });

// Health check & fallback response for normal HTTP requests
app.use((_req, res) => {
  res.set('Content-Type', 'text/plain');
  res.status(426).end('Upgrade Required');
});

// Handle WebSocket upgrade requests for the relay
server.on('upgrade', (req, socket, head) => {
  relay.handleUpgrade(req, socket, head);
});

// Render dynamically assigns the port via process.env.PORT
const PORT = process.env.PORT || 8080;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`EaglerRelayJS listening on port ${PORT}`);
});

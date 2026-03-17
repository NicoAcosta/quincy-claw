/**
 * LiveCode Engine HTTP Server
 *
 * POST /play    { code: "..." }  → Evaluate and play Strudel code
 * POST /stop                     → Stop playback
 * POST /swap    { code: "..." }  → Hot-swap code without interrupting flow
 * GET  /status                   → Current engine state
 */
import http from 'node:http';
import { init, play, swap, stop, status } from './core.js';

const PORT = Number(process.env.PORT) || 3456;

function json(res, statusCode, data) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

function readBody(req, maxBytes = 1_048_576) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    req.on('data', (c) => {
      size += c.length;
      if (size > maxBytes) {
        req.destroy();
        return reject(new Error('Request body too large'));
      }
      chunks.push(c);
    });
    req.on('end', () => {
      if (req.destroyed) return;
      const raw = Buffer.concat(chunks).toString();
      if (!raw) return resolve({});
      try {
        resolve(JSON.parse(raw));
      } catch {
        reject(new Error('Invalid JSON'));
      }
    });
    req.on('error', reject);
  });
}

const routes = {
  'POST /play': async (req, res) => {
    const { code } = await readBody(req);
    if (!code) return json(res, 400, { error: 'Missing "code" field' });
    const result = await play(code);
    json(res, result.ok ? 200 : 400, result);
  },

  'POST /swap': async (req, res) => {
    const { code } = await readBody(req);
    if (!code) return json(res, 400, { error: 'Missing "code" field' });
    const result = await swap(code);
    json(res, result.ok ? 200 : 400, result);
  },

  'POST /stop': async (req, res) => {
    req.resume(); // drain any body sent
    const result = stop();
    json(res, 200, result);
  },

  'GET /status': async (_req, res) => {
    json(res, 200, status());
  },
};

const server = http.createServer(async (req, res) => {
  const pathname = new URL(req.url, 'http://localhost').pathname;
  const key = `${req.method} ${pathname}`;
  const handler = routes[key];

  if (!handler) {
    return json(res, 404, { error: 'Not found' });
  }

  try {
    await handler(req, res);
  } catch (err) {
    console.error('[server] error:', err);
    json(res, 500, { error: err.message });
  }
});

export async function startServer() {
  // Pre-initialize the engine (loads samples) while server starts
  const initPromise = init();

  return new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(PORT, '127.0.0.1', () => {
      resolve({ port: PORT, initPromise });
    });
  });
}

export function stopServer() {
  return new Promise((resolve) => {
    server.close((err) => {
      if (err) console.warn('[server] close:', err.message);
      resolve();
    });
  });
}

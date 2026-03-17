/**
 * LiveCode Engine — CLI Entry Point
 *
 * Starts the HTTP server and shows status in the terminal.
 * Usage: node engine/index.js
 */
import { startServer, stopServer } from './server.js';
import { stop } from './core.js';

console.log('LiveCode Engine starting...');

const { port, initPromise } = await startServer();

// Register shutdown handlers before awaiting init (so Ctrl+C during sample loading works)
const shutdown = async () => {
  console.log('\nShutting down...');
  stop();
  await stopServer();
  process.exit(0);
};
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

console.log(`Server listening on http://localhost:${port}`);
console.log('');
console.log('  POST /play    { "code": "..." }  — Play Strudel code');
console.log('  POST /swap    { "code": "..." }  — Hot-swap pattern');
console.log('  POST /stop                       — Stop playback');
console.log('  GET  /status                     — Engine status');
console.log('');
console.log('Loading samples...');

await initPromise;
console.log('Ready.\n');

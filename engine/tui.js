/**
 * LiveCode TUI — Entry Point
 *
 * Starts the engine, HTTP server, and Ink React TUI in a single process.
 * Usage: npx tsx engine/tui.js
 */

// Suppress console output during engine initialization so it doesn't
// break the TUI display. Redirect to stderr for debugging if needed.
console.log = (...args) => process.stderr.write(args.join(' ') + '\n');
console.error = (...args) => process.stderr.write(args.join(' ') + '\n');
console.warn = (...args) => process.stderr.write(args.join(' ') + '\n');

import './polyfills.js';
import React from 'react';
import { render } from 'ink';
import { App } from './tui/App.jsx';
import { startServer, stopServer } from './server.js';
import { stop } from './core.js';
import { getClaudeInstance } from './tui/state.js';

const shutdown = async () => {
  getClaudeInstance()?.kill();
  stop();
  await stopServer();
  process.exit(0);
};
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

const { port, initPromise } = await startServer();
await initPromise;

render(React.createElement(App, { port }));

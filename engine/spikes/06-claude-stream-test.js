/**
 * Spike 1.6: Discover Claude CLI stream-json protocol
 *
 * Spawns `claude --print --output-format stream-json --input-format stream-json`
 * and documents the exact JSON message schemas for input and output.
 */
import { spawn } from 'node:child_process';

console.log('=== Spike 1.6: Claude stream-json Protocol ===\n');

// ─── Spawn Claude CLI in stream-json mode ───
const claude = spawn('claude', [
  '--print',
  '--output-format', 'stream-json',
  '--input-format', 'stream-json',
  '--dangerously-skip-permissions',
  '--verbose',
  '--max-budget-usd', '0.05',
  '--no-session-persistence',
], {
  stdio: ['pipe', 'pipe', 'pipe'],
  env: { ...process.env },
});

const messages = [];
let buffer = '';

claude.stdout.on('data', (chunk) => {
  buffer += chunk.toString();
  const lines = buffer.split('\n');
  buffer = lines.pop(); // keep incomplete line in buffer

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    try {
      const msg = JSON.parse(trimmed);
      messages.push(msg);
      const { type } = msg;

      // Skip noisy hook messages in live output
      if (type === 'system' && (msg.subtype === 'hook_started' || msg.subtype === 'hook_response')) {
        process.stdout.write('.');
        continue;
      }

      // Log interesting messages
      if (type === 'content_block_delta') {
        // For streaming text, just show the delta
        const delta = msg.delta;
        if (delta?.type === 'text_delta') {
          process.stdout.write(delta.text);
        } else {
          console.log(`  [${type}] delta.type=${delta?.type}`);
        }
      } else if (type === 'result') {
        console.log(`\n  [result] subtype=${msg.subtype} cost=$${msg.cost_usd} duration=${msg.duration_ms}ms`);
      } else {
        console.log(`  [${type}] ${JSON.stringify(msg).slice(0, 200)}`);
      }
    } catch {
      console.log(`  (non-JSON): ${trimmed.slice(0, 200)}`);
    }
  }
});

claude.stderr.on('data', (chunk) => {
  const text = chunk.toString().trim();
  if (text) {
    console.log(`  [stderr] ${text.slice(0, 300)}`);
  }
});

claude.on('close', (code) => {
  console.log(`\n\nClaude exited with code ${code}`);
  console.log(`Total messages received: ${messages.length}`);

  // ─── Protocol Analysis ───
  console.log('\n=== Protocol Analysis ===\n');

  // Group by type
  const byType = {};
  for (const msg of messages) {
    const t = msg.type || 'unknown';
    if (!byType[t]) byType[t] = [];
    byType[t].push(msg);
  }

  console.log('Message types seen:');
  for (const [type, msgs] of Object.entries(byType)) {
    console.log(`\n─── type="${type}" (${msgs.length} messages) ───`);

    // For system messages, group by subtype
    if (type === 'system') {
      const bySubtype = {};
      for (const m of msgs) {
        const st = m.subtype || 'none';
        if (!bySubtype[st]) bySubtype[st] = [];
        bySubtype[st].push(m);
      }
      for (const [st, smsgs] of Object.entries(bySubtype)) {
        console.log(`  subtype="${st}" (${smsgs.length}x)`);
        console.log(`    keys: ${JSON.stringify(Object.keys(smsgs[0]))}`);
      }
      continue;
    }

    // Show first example (truncated for readability)
    const example = msgs[0];
    const exJson = JSON.stringify(example, null, 2);
    // Truncate long examples
    if (exJson.length > 500) {
      console.log(`  Example (truncated):\n    ${exJson.slice(0, 500)}...`);
    } else {
      console.log(`  Example:\n    ${exJson.split('\n').join('\n    ')}`);
    }

    // Show keys present across all messages of this type
    const allKeys = new Set();
    for (const m of msgs) {
      for (const k of Object.keys(m)) allKeys.add(k);
    }
    console.log(`  All keys seen: ${JSON.stringify([...allKeys])}`);

    // For content_block_delta, show unique delta types
    if (type === 'content_block_delta') {
      const deltaTypes = new Set(msgs.map(m => m.delta?.type));
      console.log(`  Delta types: ${JSON.stringify([...deltaTypes])}`);
    }
  }

  console.log('\n=== Spike 1.6 Complete ===');
});

claude.on('error', (err) => {
  console.error('Failed to spawn claude:', err);
  process.exit(1);
});

// ─── Send a user message via stream-json input ───
setTimeout(() => {
  const userMsg = {
    role: 'user',
    content: 'Say "hello world" and nothing else. Do not use any tools.',
  };
  console.log(`  [stdin] Sending: ${JSON.stringify(userMsg)}\n`);
  claude.stdin.write(JSON.stringify(userMsg) + '\n');

  // Close stdin after sending to signal we're done
  setTimeout(() => {
    console.log('\n  [stdin] Closing stdin\n');
    claude.stdin.end();
  }, 1000);
}, 500);

// Safety timeout
setTimeout(() => {
  console.log('\nTimeout reached, killing claude');
  claude.kill('SIGTERM');
  process.exit(1);
}, 60000);

import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildSystemPrompt } from './prompt.js';
import { status } from '../core.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '../..');

/**
 * Claude subprocess manager.
 *
 * Each user message spawns a new Claude process. Conversation continuity
 * is maintained via --resume <session_id>. Streaming responses arrive as
 * stream_event JSON lines with content_block_delta for text tokens.
 *
 * Raw text is piped to stdin (not stream-json input format). This works
 * because each turn is a fresh process — stdin is the initial prompt,
 * and --resume provides conversation history from prior turns.
 */
export function createClaude(onMessage, onError) {
  let sessionId = null;
  let activeProcess = null;
  let consecutiveFailures = 0;
  let lastFailTime = 0;
  let killed = false;
  let cachedStaticPrompt = null;
  let promptWarnings = [];

  function getSystemPrompt(engineState) {
    if (!cachedStaticPrompt) {
      const { prompt, warnings } = buildSystemPrompt();
      cachedStaticPrompt = prompt;
      promptWarnings = warnings;
    }
    // Append dynamic engine state
    if (engineState?.code) {
      return cachedStaticPrompt +
        `\n\n---\n\nCurrently playing: ${engineState.label || 'unknown'}\nCode:\n\`\`\`js\n${engineState.code}\n\`\`\``;
    }
    return cachedStaticPrompt;
  }

  function getWarnings() { return promptWarnings; }

  function send(text) {
    if (killed) return;

    const engineState = status();
    const systemPrompt = getSystemPrompt(engineState);

    const args = [
      '--print',
      '--output-format', 'stream-json',
      '--verbose',
      '--include-partial-messages',
      '--allowedTools', 'Bash(curl:*)',
      '--max-turns', '3',
      '--append-system-prompt', systemPrompt,
    ];

    if (sessionId) {
      args.push('--resume', sessionId);
    }

    const claude = spawn('claude', args, {
      stdio: ['pipe', 'pipe', 'pipe'],
      cwd: projectRoot,
    });

    activeProcess = claude;
    let buffer = '';
    let gotResponse = false;

    claude.stdout.on('data', (chunk) => {
      buffer += chunk.toString();
      const lines = buffer.split('\n');
      buffer = lines.pop();

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed) continue;

        try {
          const msg = JSON.parse(trimmed);

          // Capture session ID
          if (msg.session_id && !sessionId) {
            sessionId = msg.session_id;
          }

          // Skip system/hook messages
          if (msg.type === 'system' || msg.type === 'rate_limit_event') continue;

          // Streaming text deltas
          if (msg.type === 'stream_event') {
            const evt = msg.event;
            if (!evt) continue;

            if (evt.type === 'content_block_start') {
              if (evt.content_block?.type === 'text') {
                gotResponse = true;
                onMessage({ type: 'text_start' });
              } else if (evt.content_block?.type === 'tool_use') {
                onMessage({ type: 'tool_start', name: evt.content_block.name, id: evt.content_block.id });
              }
            }

            if (evt.type === 'content_block_delta') {
              if (evt.delta?.type === 'text_delta') {
                gotResponse = true;
                onMessage({ type: 'text', content: evt.delta.text });
              } else if (evt.delta?.type === 'input_json_delta') {
                onMessage({ type: 'tool_input', content: evt.delta.partial_json });
              }
            }

            continue;
          }

          // Full assistant message (arrives after streaming)
          if (msg.type === 'assistant') {
            if (msg.session_id) sessionId = msg.session_id;
            continue;
          }

          // Final result
          if (msg.type === 'result') {
            if (msg.session_id) sessionId = msg.session_id;
            onMessage({ type: 'done', result: msg.result, cost: msg.total_cost_usd });
            continue;
          }
        } catch {
          // non-JSON line, ignore
        }
      }
    });

    claude.stderr.on('data', () => {
      // Suppress stderr noise
    });

    claude.on('close', (code) => {
      activeProcess = null;

      if (killed) return;

      if (code !== 0 && !gotResponse) {
        const now = Date.now();
        if (now - lastFailTime < 30000) {
          consecutiveFailures++;
        } else {
          consecutiveFailures = 1;
        }
        lastFailTime = now;

        if (consecutiveFailures >= 3) {
          onError?.('Claude disconnected after 3 failures. Press Ctrl+R to retry.');
          return;
        }

        // Auto-restart: show reconnecting and retry after 2s backoff
        onMessage({ type: 'text', content: '' });
        onError?.('Reconnecting...');
        setTimeout(() => {
          if (!killed) send(text);
        }, 2000);
      }
    });

    claude.on('error', (err) => {
      activeProcess = null;
      onError?.(`Failed to spawn Claude: ${err.message}`);
    });

    // Send the user message via stdin
    claude.stdin.write(text);
    claude.stdin.end();
  }

  function kill() {
    killed = true;
    if (activeProcess) {
      activeProcess.kill('SIGTERM');
      activeProcess = null;
    }
  }

  function restart() {
    killed = false;
    consecutiveFailures = 0;
  }

  function isActive() {
    return activeProcess !== null;
  }

  return { send, kill, restart, isActive, getWarnings };
}

# LiveCode TUI — Design Spec

## Purpose

A terminal-based live performance interface for AI-assisted music production. The user converses with Claude about music, Claude generates Strudel code and plays it, the TUI shows what's happening with a real-time waveform and transport controls. Replaces the current workflow of running the engine in one terminal and Claude Code in another.

## Architecture

### Single Process

The TUI is the entry point. It imports `engine/core.js` directly — same Node.js process. This gives direct access to the `AnalyserNode` for waveform data without network overhead. The HTTP server still runs inside the process so Claude (spawned as subprocess) can POST `/play`, `/swap`, `/stop`.

```
┌─ TUI Process ─────────────────────────────────┐
│                                                │
│  ┌─ Ink React App ──────────────────────────┐  │
│  │  Waveform   (reads AnalyserNode direct)  │  │
│  │  Status bar (reads engine state direct)   │  │
│  │  Chat panel (streams Claude subprocess)   │  │
│  │  Input      (sends to Claude subprocess)  │  │
│  └──────────────────────────────────────────┘  │
│                                                │
│  ┌─ Engine ─────────────────────────────────┐  │
│  │  core.js    (Strudel + superdough)       │  │
│  │  server.js  (HTTP on 127.0.0.1:3456)     │  │
│  │  AudioContext + AnalyserNode             │  │
│  └──────────────────────────────────────────┘  │
│                                                │
│  ┌─ Claude Subprocess ──────────────────────┐  │
│  │  claude --print                          │  │
│  │    --output-format stream-json           │  │
│  │    --input-format stream-json            │  │
│  │    --allowedTools "Bash(curl:*)"         │  │
│  │    --append-system-prompt <music skills> │  │
│  └──────────────────────────────────────────┘  │
│                                                │
└────────────────────────────────────────────────┘
```

### Entry Points

- `engine/tui.js` — starts TUI + engine + Claude subprocess
- `engine/index.js` — headless engine only (existing, unchanged)

## Framework

**Ink v6** (React for terminals). Chosen because:
- Actively maintained (v6.8.0, Feb 2026)
- Used by Claude Code itself, Gemini CLI, Shopify CLI
- React component model fits streaming chat + real-time updates
- Yoga flexbox for layout
- `useInput` hook for keyboard shortcuts
- `<Static>` component for append-only chat history

## Layout

Chat-dominant with ambient peripherals. The conversation is the center of gravity — code and waveform are secondary.

```
┌──────────────────────────────────────────────────┐
│  ▁▂▃▅▇▅▃▂▁▂▃▅▇▅▃▁▂▃▅▇▅▃▂▁▂▃▅▇▅▃▂▁▂▃▅▇▅▃▁▂▃▅  │  2 lines
│  ♫ playing · 122 BPM · Bb · jazzy smooth house   │  1 line
├──────────────────────────────────────────────────┤
│                                                  │
│  you: play jazzy smooth house                    │
│                                                  │
│  claude: [response text]                         │  fills remaining
│  ```                                             │  space
│  s("bd*4").gain(0.9)                             │
│  ```                                             │
│  Swapped. Four-on-the-floor kick pattern.        │
│                                                  │
│  you: darker                                     │
│                                                  │
│  claude: [response + code]                       │
│                                                  │
├──────────────────────────────────────────────────┤
│ > type here...                    ⏵  ⏹  ⌘?      │  1 line
└──────────────────────────────────────────────────┘
```

### Regions

1. **Waveform strip** (top, 2 lines) — ASCII waveform using block characters (`▁▂▃▄▅▆▇█`). Updates at ~15fps. Maps AnalyserNode frequency data to character heights. Shows silence as flat line when stopped.

2. **Status bar** (1 line) — state icon (♫/⏹), BPM, key, pattern description (first ~40 chars of code or user label). Color-coded: green when playing, dim when stopped, red on error.

3. **Chat panel** (fills remaining space, scrollable) — conversation history. User messages right-aligned or prefixed with `you:`. Claude messages prefixed with `claude:`. Code blocks rendered with syntax highlighting (chalk). Streams Claude's response token-by-token as it arrives.

4. **Input bar** (bottom, 1 line) — text input with prompt `> `. Transport status indicators on the right.

## Components

### `<App>`
Root component. Manages:
- Engine initialization (calls `init()` on mount)
- Claude subprocess lifecycle
- Global keyboard shortcut routing

### `<Waveform>`
Reads AnalyserNode frequency data via the master analyser (see Engine Changes). Uses `setInterval` at ~66ms (15fps). Calls `analyser.getByteFrequencyData(buffer)` directly on the node-web-audio-api AnalyserNode (returns `Uint8Array` 0-255). Maps bins to block characters. Renders as a `<Text>` inside a fixed-height `<Box>`. Uses `process.stdout.columns` for dynamic width on terminal resize.

### `<StatusBar>`
Reads engine state via `status()` from core.js. Shows: play state, CPS converted to BPM (`cps * 60 * 4` — assumes 4/4 time, which is correct for Strudel's default 1 cycle = 1 bar), truncated code string. Updates on engine state change.

### `<ChatPanel>`
Uses Ink's `<Static>` for committed messages (won't re-render) and a live `<Box>` for the streaming current response. Each message is a `<ChatMessage>` component with role styling. **Important**: messages are only moved to `<Static>` after Claude's response stream is fully complete (stream closed for that turn). Moving a message to `<Static>` while still streaming would freeze it mid-sentence.

### `<ChatMessage>`
Renders a single message. User messages in one color, Claude messages in another. Code blocks detected by triple-backtick and rendered with colored syntax. Handles streaming (partial text that grows).

### `<InputBar>`
Text input using Ink's `useInput` or a custom controlled input. Submits on Enter. Up arrow recalls from a ring buffer of last 20 messages. Shows transport indicators.

## Claude Integration

### Subprocess Management

Spawn Claude Code in streaming JSON mode:

```js
const claude = spawn('claude', [
  '--print',
  '--output-format', 'stream-json',
  '--input-format', 'stream-json',
  '--allowedTools', 'Bash(curl *)',
  '--append-system-prompt', systemPrompt,
], { stdio: ['pipe', 'pipe', 'pipe'] });
```

The system prompt includes:
- The Strudel API reference (from skill files)
- Instructions to use `curl` to POST to `localhost:3456` for playback
- Genre templates and production knowledge

### Stream-JSON Protocol

**Important**: The exact input/output JSON schemas for `claude --input-format stream-json --output-format stream-json` must be verified with a spike before implementation. The formats below are best-effort based on the CLI documentation and need validation.

**Input** (TUI → Claude stdin, newline-delimited JSON):
```json
{"type": "user_message", "content": "play jazzy house"}
```

**Output** (Claude stdout → TUI, newline-delimited JSON):
Each line is a JSON object with a `type` field. Expected types:
- `{"type": "assistant", "content": [{"type": "text", "text": "..."}]}` — text response chunks
- `{"type": "tool_use", "name": "Bash", "input": {"command": "curl ..."}}` — tool call
- `{"type": "tool_result", "content": "..."}` — tool execution result
- `{"type": "result", ...}` — final message with usage stats

**Spike required**: Run `echo '...' | claude --print --input-format stream-json --output-format stream-json` interactively to capture the actual schema before implementing `claude.js`.

### Message Flow

1. User types in InputBar, presses Enter
2. TUI sends JSON message to Claude's stdin
3. Claude streams response tokens to stdout as JSON lines
4. TUI parses each line, appends to current ChatMessage
5. Claude calls `Bash(curl -X POST localhost:3456/play ...)` as part of its response
6. Engine plays music, waveform activates
7. Claude's text response appears in chat

### Tool Use Rendering

When Claude calls tools (curl to the engine), the TUI renders them as:
- **Tool calls**: shown as a dim status line `> Playing pattern...` or `> Swapping pattern...` (not raw curl commands)
- **Tool results**: not shown if successful. On error, the error message appears inline in Claude's response.
- **Reasoning/thinking tokens**: hidden in v1 (not rendered)

### Error Handling

- If Claude subprocess exits, show error in chat and offer to restart
- If engine returns `{ok: false, error: "..."}`, Claude sees it in the curl response and reports to user
- If Claude is rate-limited or network fails, show status in the status bar

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| Enter | Send message |
| Up | Recall last message |
| Escape | Stop playback (POST /stop) |
| Ctrl+C | Quit (graceful shutdown) |
| Ctrl+L | Clear chat |
| Ctrl+Space | Toggle play/stop |

Shortcuts are global via `useInput` at the App level, except when the input bar has focus for typing (Enter and Up are then input-scoped).

## Waveform Detail

The waveform uses 8 block characters for vertical resolution:

```
▁ = 0.000–0.125
▂ = 0.125–0.250
▃ = 0.250–0.375
▄ = 0.375–0.500
▅ = 0.500–0.625
▆ = 0.625–0.750
▇ = 0.750–0.875
█ = 0.875–1.000
```

We call `analyser.getByteFrequencyData(buffer)` directly on the AnalyserNode (not superdough's `getAnalyzerData` which returns `Float32Array` in dB). `getByteFrequencyData` returns a `Uint8Array` (0–255):

1. Allocate `buffer = new Uint8Array(analyser.frequencyBinCount)` once
2. Call `analyser.getByteFrequencyData(buffer)` each frame
3. Downsample to `process.stdout.columns` (dynamic width on resize)
4. Normalize: `value / 255` → 0.0–1.0
5. Map to block character index
6. Render as a single `<Text>` line, colored with a gradient (low freq = blue, high = cyan)

Second line mirrors the first vertically (block character `i` on line 1 maps to `blocks[7 - i]` on line 2).

## Engine Changes

### New Export: AnalyserNode Access

**Problem**: superdough connects all audio output to `ac.destination` internally. We need to tap the master audio signal for waveform visualization.

**Approach**: Monkey-patch `AudioContext.prototype.createGain` or intercept `ac.destination` before superdough initializes. The concrete strategy (determined by spike during implementation):

1. **Preferred — destination proxy**: Before calling `initAudio()`, replace `ac.destination` with a `GainNode` that fans out to both the real destination and an `AnalyserNode`. Since `node-web-audio-api` creates the AudioContext, we control the graph setup. Pseudocode:

```js
const ac = getAudioContext();
const masterAnalyser = ac.createAnalyser();
masterAnalyser.fftSize = 256;

// Intercept: make superdough's .connect(ac.destination) go through our analyser
// Option A: use superdough's initializeAudioOutput() if it exposes the destination gain
// Option B: monkey-patch ac.destination before superdough wires up
```

2. **Fallback — require `.analyze()` in all patterns**: Append `.analyze(1)` to every pattern before evaluation. This uses superdough's built-in per-voice analyser routing. Simpler but fragile — requires code transformation.

3. **Fallback — fork superdough**: Uncomment line 274 in superdough.mjs (`getDestination().connect(analyserNode)`) and use a patched local copy.

The spike will test option 1 first. Export from `core.js`:

```js
export function getAnalyser() {
  return masterAnalyser; // set up during init()
}
```

The `<Waveform>` component calls `analyser.getByteFrequencyData(buffer)` directly. This returns a `Uint8Array` (0-255), not the dB-scale `Float32Array` from `getFloatFrequencyData`. The normalization is: `value / 255` → 0.0–1.0 → block character index.

## Dependencies

New (added to `engine/package.json`):
- `ink` ^6.8.0 — TUI framework
- `react` ^19 — peer dependency of Ink
- `ink-text-input` ^6 — text input component (Ink v6 compatible)
- `chalk` — terminal colors (already an Ink dependency)
- `tsx` — JSX/TypeScript runner (dev dependency)

## JSX Transpilation

Node.js does not natively support JSX. We use `tsx` as the runner:

```
npx tsx engine/tui.js
```

Add `tsx` as a dev dependency. The `tui` script in `package.json` becomes `"tui": "tsx tui.js"`. No Babel config needed — `tsx` handles JSX and TypeScript transparently.

## File Structure

```
engine/
  tui.js            — Entry point: starts engine + TUI + Claude
  tui/
    App.jsx         — Root component
    Waveform.jsx    — ASCII waveform display
    StatusBar.jsx   — Playing/stopped, BPM, info
    ChatPanel.jsx   — Scrollable chat history
    ChatMessage.jsx — Single message rendering
    InputBar.jsx    — User text input
    claude.js       — Claude subprocess management
    useEngine.js    — React hook for engine state
    useWaveform.js  — React hook for AnalyserNode data
```

## Out of Scope (v1)

- Code editor panel (code appears inline in chat)
- Multi-deck DJ mixing (future Phase 4)
- Persistent chat history across sessions
- Custom themes/colors configuration
- Mouse support
- Strudel code syntax highlighting (plain code blocks for now)

## Success Criteria

1. `node engine/tui.js` starts engine, shows TUI, spawns Claude
2. User types "play techno" → Claude responds in chat → music plays → waveform animates
3. User types "darker" → Claude swaps pattern → waveform updates → music changes
4. Escape stops playback, waveform goes flat
5. Ctrl+C exits cleanly (audio stops, Claude killed, terminal restored)
6. Claude responses stream token-by-token (not block after completion)
7. Waveform renders at 15fps without visible lag in chat input

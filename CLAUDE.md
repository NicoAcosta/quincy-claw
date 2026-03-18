# LiveCode

AI-assisted music creation through live coding. User describes music, Claude generates [Strudel](https://strudel.cc) code, plays it through a local Node.js audio engine.

## Running

Two modes:

### TUI (recommended)
`cd engine && npx tsx tui.js` — Terminal UI with chat, waveform visualization, and transport controls. Type music descriptions, Claude generates and plays Strudel code. Keyboard: Escape=stop, Ctrl+L=clear, Ctrl+R=reconnect Claude, Ctrl+C=quit.

### Headless
`cd engine && node index.js` — HTTP server only at `http://localhost:3456`. For use with Claude Code in a separate terminal.

## Playback API

The engine runs at `http://localhost:3456`.

To play music:
1. Write Strudel code
2. `curl -s -X POST http://localhost:3456/play -H 'Content-Type: application/json' -d '{"code": "<strudel code>", "label": "description"}'`
3. Check the response — `{"ok":true}` means it's playing, `{"ok":false,"error":"..."}` means the code has a bug
4. To modify: `POST /swap` with new code and label (hot-swaps without stopping)
5. To stop: `POST /stop`
6. To check state: `GET /status` (returns state, code, label, cps, playingSince)

The engine uses `@strudel/core` for pattern evaluation and `node-web-audio-api` for audio output — no browser needed.

## Skills — Quincy Claw

When the user asks for music, invoke the appropriate skill:
- `/quincy` — Router. Recommends the right skill based on context.
- `/play` — One-shot generation. Direct requests go here.
- `/studio` — Expert guided session. Layer-by-layer, technical control.
- `/vibe` — Feel-based guided session. Imagery and emotion, no jargon.
- `/play-flow` — One-shot evolving track (8-15 min). Full arrangement with sections, builds, drops, breakdowns via sequential `/swap` calls.
- `/studio-flow` — Expert guided palette (6 stages) → autonomous arrangement into a full evolving track.
- `/vibe-flow` — Feel-based guided mood (4 stages) → evolving journey described in sensory language.

Flow skills generate tracks that evolve autonomously: Claude plans an arrangement, then executes it as chunks of 2-3 `/swap` calls with `sleep` between them. The user can intervene at checkpoints between chunks.

Skills contain the full Strudel reference, genre templates, do/don't rules, and iteration vocabulary. CLAUDE.md only covers project-wide context (playback mechanics above).

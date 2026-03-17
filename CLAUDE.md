# LiveCode — AI-Assisted Music Creation Through Code

## What This Is

A live coding music system using **Strudel** (browser-based live coding environment). Claude generates and modifies Strudel code based on natural language musical instructions, playing it in real-time via the Strudel MCP server.

## How It Works

1. User gives musical instructions (high-level or detailed)
2. Claude generates Strudel code using genre templates + music theory knowledge
3. Code is sent to Strudel via MCP server tools for live playback
4. User gives feedback, Claude iterates on the playing pattern

## Key Tools

- **Strudel MCP Server**: Use `strudel_*` tools to open Strudel, evaluate code, and control playback
- **Fallback**: If the MCP server is unavailable, use `mcp__claude-in-chrome` or `mcp__plugin_playwright` to navigate to https://strudel.cc and inject code

## Project Structure

- `strudel/genres/` — Genre template files (techno, house, ambient, etc.)
- `strudel/theory/` — Music theory reference (scales, chords, drums, bass patterns)
- `strudel/songs/` — Saved user sessions
- `skills/livecode.md` — The main livecode skill with full Strudel + theory reference

## Workflow

When the user asks for music:
1. Invoke the `livecode` skill
2. Parse the user's instructions (genre, BPM, key, mood, specific requests)
3. Start from a genre template if applicable
4. Customize based on user parameters
5. Send to Strudel for playback
6. Iterate based on feedback

## Strudel Quick Reference

- BPM: `.cpm(bpm/60/4)` or `setcps(bpm/60/4)`
- Layers: `stack(pattern1, pattern2, ...)`
- Samples: `s("bd sd hh cp")`
- Notes: `note("c3 eb3 g3 bb3")`
- Scales: `.scale("C:minor")`
- Effects: `.lpf()`, `.room()`, `.delay()`, `.gain()`, `.pan()`

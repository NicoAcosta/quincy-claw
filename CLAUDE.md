# LiveCode

AI-assisted music creation through live coding. User describes music, Claude generates [Strudel](https://strudel.cc) code, plays it in the browser via Playwright.

## Playback

Use Playwright (`mcp__plugin_playwright`) to control strudel.cc:
1. `browser_navigate` to `https://strudel.cc`
2. Inject code via `browser_evaluate`: access CodeMirror through `document.querySelector('.cm-content').cmView.view` and dispatch a replacement
3. Click the **play** button (or stop then play to re-evaluate) — Ctrl+Enter also works but clicking play is more reliable
4. Always check `browser_console_messages` after playing — `[query] error` lines mean the pattern has a bug

Do NOT use `mcp__claude-in-chrome` — Playwright is the primary automation tool here.

## Skills — Quincy Claw

When the user asks for music, invoke the appropriate skill:
- `/quincy` — Router. Recommends the right skill based on context.
- `/play` — One-shot generation. Direct requests go here.
- `/studio` — Expert guided session. Layer-by-layer, technical control.
- `/vibe` — Feel-based guided session. Imagery and emotion, no jargon.

Skills contain the full Strudel reference, genre templates, do/don't rules, and iteration vocabulary. CLAUDE.md only covers project-wide context (playback mechanics above).

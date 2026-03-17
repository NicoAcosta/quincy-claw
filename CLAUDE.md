# LiveCode

AI-assisted music creation through live coding. User describes music, Claude generates [Strudel](https://strudel.cc) code, plays it in the browser via Playwright.

## Playback

Use Playwright (`mcp__plugin_playwright`) to control strudel.cc:
1. Navigate to `https://strudel.cc`
2. Clear the editor, paste generated code
3. Press Ctrl+Enter to evaluate

Do NOT use `mcp__claude-in-chrome` — Playwright is the primary automation tool here.

## Skill

Always invoke the `/livecode` skill when the user asks for music. It has the full Strudel syntax reference, genre templates, music theory, and iteration vocabulary.

## Do

- Read genre templates from `strudel/genres/` as starting points, then customize
- Use `stack()` for layering — one layer per instrument/voice
- Set tempo explicitly with `.cpm(bpm/4)` at the end of the stack
- Show the code to the user before playing
- Iterate: user says "darker" → lower filter, minor key, more reverb

## Don't

- Don't generate code without reading the relevant genre template first
- Don't use more than 6-8 layers — it gets muddy
- Don't hardcode note names when `.scale()` would be clearer
- Don't forget tempo — every snippet needs `.cpm()`
- Don't explain music theory unprompted — just make the music

## Reference

- [docs/strudel-reference.md](docs/strudel-reference.md) — Full Strudel syntax, effects, patterns
- [docs/music-theory.md](docs/music-theory.md) — Scales, chords, progressions by genre
- [docs/iteration-guide.md](docs/iteration-guide.md) — How to map feedback to code changes
- `strudel/genres/` — 10 genre templates (techno, house, ambient, dnb, lofi, jazz, trap, acid, dub, generative)
- `strudel/theory/` — Inline theory reference (scales, chords, drums, bass patterns)

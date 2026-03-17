<div align="center">
  <img src="./assets/banner.png" alt="Quincy Claw" width="100%" />
</div>

# Quincy Claw

AI-assisted music creation through live coding. Describe the music you want — from "rainy Sunday morning" to "128 BPM Eb minor acid techno with TB-303 bass" — and Claude generates [Strudel](https://strudel.cc) code that plays in your browser in real-time.

An AI producer built on MCP — like an MPC, but Claudio plays the pads.

Named after Quincy Jones, because every great session needs a producer who listens.

## Install

### Any AI coding tool (via skills.sh)
```bash
npx skills add NicoAcosta/quincy-claw
```

### Claude Code plugin
```bash
claude plugin install NicoAcosta/quincy-claw
```

### Codex / OpenCode / Cursor
See platform-specific instructions in `.codex/`, `.opencode/`, `.cursor-plugin/`.

## How It Works

```
You describe music  →  Claude generates Strudel code  →  Plays in your browser  →  You give feedback  →  Repeat
```

1. Open this project in [Claude Code](https://claude.ai/claude-code)
2. Ask for music in whatever way feels natural
3. Claude picks the right mode, generates code, and sends it to [strudel.cc](https://strudel.cc) via Playwright
4. Listen, react, iterate — "darker", "more swing", "add a melody", "needs more weight"

## Four Ways to Make Music

| Command | Mode | For |
|---------|------|-----|
| `/play` | One-shot | "Play dark minimal techno" — fast, direct |
| `/studio` | Expert guided | Build layer-by-layer: drums → bass → harmony → melody → mix → arrange |
| `/vibe` | Feel-based guided | "Rainy afternoon" — describe feelings, not frequencies |
| `/quincy` | Router | Not sure which? This recommends the right one |

**`/play`** is the default — just ask for music and it plays. Use `/studio` when you want technical control over each layer. Use `/vibe` when you'd rather describe a mood than a mix.

## Examples

```
> play some techno
> /vibe driving at night, windows down
> /studio                            (starts guided session)
> chill lo-fi beat, 80 BPM, Db major
> dark ambient soundscape with evolving textures
> make the bass heavier
> add a melody over this
> more swing, less busy
```

## Setup

Requires [Claude Code](https://claude.ai/claude-code) and a Chromium browser for playback.

```bash
git clone https://github.com/NicoAcosta/quincy-claw.git
cd quincy-claw
npm install
npx playwright install chromium
```

Then open the project in Claude Code and start asking for music.

## Genres

15 genre templates, each a playable Strudel snippet with genre-appropriate defaults:

| Genre | BPM | Key | Genre | BPM | Key |
|-------|-----|-----|-------|-----|-----|
| Techno | 130 | Cm | Trance | 140 | Am |
| House | 124 | Am | Dubstep | 140 | Fm |
| Ambient | 70 | D | UK Garage | 132 | Cm |
| Drum & Bass | 174 | Em | Synthwave | 108 | Am |
| Lo-fi | 82 | Eb | Breakbeat | 130 | Em |
| Jazz | 120 | Bb | Acid | 132 | Am |
| Trap | 140 | Fm | Dub | 75 | Gm |
| Generative | 90 | varies | | | |

Templates live in `strudel/genres/` and serve as starting points — Claude reads them, then customizes based on your request.

## Project Structure

```
skills/
  quincy/        Router skill — picks the right mode
  play/          One-shot generation skill + shared references
    references/  Strudel API, production craft, genres, theory, etc.
  studio/        Expert guided session skill (6 stages)
  vibe/          Feel-based guided session skill (4 stages)
strudel/
  genres/        15 genre templates (playable Strudel code)
  theory/        Music theory reference (scales, chords, drums, bass)
  songs/         Saved sessions and compositions
CLAUDE.md        Project config — playback mechanics, skill routing
AGENTS.md        Cross-platform instruction file
```

### Reference Library

The skills share a set of reference documents (in `skills/play/references/`):

- **strudel-api.md** — Full Strudel syntax, effects, synthesis, samples, mini-notation
- **production-craft.md** — Frequency allocation, gain hierarchy, density, palette coherence
- **groove-and-rhythm.md** — Beat anatomy, swing values, ghost notes, micro-arrangement
- **sound-design.md** — Producer vocab translations, synthesis recipes, bass design
- **genres.md** — Sub-styles, BPM ranges, sonic palettes, genre identity rules
- **arrangement.md** — Energy curves, evolution toolkit, transitions, build/drop patterns
- **music-theory.md** — Scales, chords, progressions, tension/release, voicings

## Tech Stack

- **[Strudel](https://strudel.cc)** — Browser-based live coding environment for music
- **[Playwright](https://playwright.dev)** — Browser automation for injecting code and controlling playback
- **[Claude Code](https://claude.ai/claude-code)** — AI coding assistant that generates and iterates on patterns

## How It Actually Works (Under the Hood)

1. Claude reads the relevant genre template from `strudel/genres/`
2. Considers frequency spectrum, groove, space, and sound palette
3. Generates a `stack()` of Strudel pattern layers
4. Opens strudel.cc in Playwright, injects the code into CodeMirror
5. Clicks play, checks console for errors
6. Waits for your feedback, modifies specific layers, replays

No server, no build step, no API keys. Just Claude, a browser, and a pattern language.

## License

MIT

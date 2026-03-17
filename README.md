# LiveCode

AI-assisted music creation through live coding. Describe the music you want — from "chill lo-fi beat" to "128 BPM Eb minor acid techno with TB-303 bass" — and Claude generates [Strudel](https://strudel.cc) code that plays in your browser in real-time.

## How It Works

1. Tell Claude what you want to hear
2. Claude generates Strudel live coding patterns using genre templates + music theory
3. Code is sent to strudel.cc via Playwright browser automation
4. Listen, give feedback ("darker", "more swing", "add a melody"), iterate

## Genres

Techno, House, Ambient, Drum & Bass, Lo-fi Hip Hop, Jazz, Trap, Acid, Dub, Generative/Experimental — each with a ready-to-play template in `strudel/genres/`.

## Setup

```bash
npm install
npx playwright install chromium
```

## Usage

Open this project in [Claude Code](https://claude.ai/claude-code) and ask for music:

```
> play some techno
> chill lo-fi beat, 80 BPM, Db major
> dark ambient soundscape with evolving textures
> make the bass heavier
> add a melody
```

## Project Structure

```
strudel/
  genres/     10 genre templates (playable Strudel snippets)
  theory/     Music theory reference (scales, chords, drums, bass)
  songs/      Saved sessions
docs/         Detailed reference docs
skills/       Claude Code skill definition
```

## Tech

- [Strudel](https://strudel.cc) — Browser-based live coding environment
- [Playwright](https://playwright.dev) — Browser automation for playback control
- [Claude Code](https://claude.ai/claude-code) — AI coding assistant

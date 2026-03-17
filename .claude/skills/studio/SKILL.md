---
name: studio
description: "Quincy Claw: Expert guided music session. Use when: (1) user invokes /studio, (2) user wants to build a track layer-by-layer with technical control, (3) user asks to make production decisions about drums, bass, harmony, melody. Walks through 6 stages with 2-3 questions per turn, plays after each stage. Part of the Quincy Claw family (/quincy, /play, /studio, /vibe)."
---

# Studio — Expert Guided Music Session

You are a co-producer. The user makes the creative decisions; you translate them into Strudel code. Walk through the track stage by stage, playing the evolving result after each one.

## References

Read these as needed — same references as `/play`:
- **Strudel API**: [../play/references/strudel-api.md](../play/references/strudel-api.md)
- **Production Craft**: [../play/references/production-craft.md](../play/references/production-craft.md)
- **Groove & Rhythm**: [../play/references/groove-and-rhythm.md](../play/references/groove-and-rhythm.md)
- **Sound Design**: [../play/references/sound-design.md](../play/references/sound-design.md)
- **Genres**: [../play/references/genres.md](../play/references/genres.md)
- **Arrangement**: [../play/references/arrangement.md](../play/references/arrangement.md)
- **Music Theory**: [../play/references/music-theory.md](../play/references/music-theory.md)

Genre templates: `strudel/genres/` — read the relevant template before generating code.

## Playback

Use Playwright (`mcp__plugin_playwright`) to control strudel.cc:
1. `browser_navigate` to `https://strudel.cc`
2. Inject code via `browser_evaluate`: access CodeMirror through `document.querySelector('.cm-content').cmView.view` and dispatch a replacement
3. Click the **play** button (or stop then play to re-evaluate)
4. Always check `browser_console_messages` after playing

## The 6 Stages

### Stage 0: Setup
**Ask 2-3 of:** Genre? BPM? Key/scale? Mood direction?
- Offer smart defaults based on genre (see genre defaults table in `/play`)
- "next" → use genre defaults for everything
- No code yet — just decisions

### Stage 1: Rhythm
**Ask 2-3 of:** Kick pattern (four-on-floor, broken, syncopated)? Snare/clap placement (2&4, offbeat, ghost notes)? Hat flavor (closed tight, open lazy, shuffled)? Swing amount?
- Build 3-5 drum layers
- Group under `// === DRUMS ===`
- **Play the drums alone**

### Stage 2: Bass
**Ask 2-3 of:** Bass style (sub sine, Reese/detuned saw, acid 303, walking, 808)? Rhythm (root sustain, octave bounce, syncopated, follow kick)? Frequency range?
- Add 1-2 bass layers
- Group under `// === BASS ===`
- **Play drums + bass**

### Stage 3: Harmony
**Ask 2-3 of:** Chord progression (suggest 2-3 options in the key)? Voicing style (open, close, spread)? Sound character (warm pad, bright stab, pluck, organ)? Sidechain to kick?
- Add 1-2 pad/chord layers
- Spell out chord notes manually (never use `.voicings()`)
- Group under `// === HARMONY ===`
- **Play drums + bass + harmony**

### Stage 4: Top
**Ask 2-3 of:** Melody approach (pentatonic riff, arp, call-and-response, ambient texture)? Lead sound (saw lead, bell, pluck, vocal-ish)? Textures/ear candy (risers, sweeps, noise hits)?
- Add 1-3 lead/texture layers
- Group under `// === TOP ===`
- **Play full stack**

### Stage 5: Mix
**Ask 2-3 of:** Anything too loud/quiet? Want more space (reverb/delay)? Any frequencies clashing? Effects to add/remove?
- Adjust `.gain()`, `.lpf()`, `.hpf()`, `.room()`, `.delay()` on existing layers
- No new layers — refinement only
- **Play refined stack**

### Stage 6: Arrange
**Ask 2-3 of:** Energy arc (build-up, drop, breakdown)? Evolution (elements appearing/disappearing)? Phrase length? Fills or transitions?
- Add `.every()`, `.mask()`, `.degradeBy()`, `.slow()/.fast()` for variation
- Add evolution with `.iter()`, conditional patterns
- **Play final arranged version**

## Navigation Commands

| Command | Action |
|---------|--------|
| "next" | Advance to next stage, use genre defaults for skipped questions |
| "skip" | Skip this stage entirely, move to next |
| "back to [stage]" | Return to named stage, keep all other layers intact |
| Any production term | Change the relevant layer within current stage, replay |

## Per-Turn Behavior

1. Ask 2-3 questions max. Always offer defaults in parentheses.
2. When the user answers, generate/update code immediately.
3. Show the code with section comments.
4. Play the current state of the full stack.
5. Brief note on what changed, then ask if they want to adjust or move on.

## Code Structure

Always organize layers with section comments:
```
stack(
  // === DRUMS ===
  s("bd ..."),
  s("sd ..."),
  s("hh ..."),
  // === BASS ===
  note("...").s("sawtooth"),
  // === HARMONY ===
  note("...").s("pad"),
  // === TOP ===
  note("...").s("lead")
)
.cpm(bpm/4)
```

## Rules

- NEVER use `.voicings()` — spell out chord notes manually
- Don't use `.vowel()` with mini-notation patterns — single static vowel only
- Don't use `s("shaker")` — use `s("hh*16").hpf(8000)` with low gain
- Always set tempo with `.cpm(bpm/4)`
- Keep to 6-8 layers max
- Read the genre template before starting

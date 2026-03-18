---
name: studio-flow
description: "Quincy Claw: Expert guided evolving track session. Use when: (1) user invokes /studio-flow, (2) user wants to build a track layer-by-layer AND then have it arranged into a full evolving track (8-15 min), (3) user says 'let's produce a full track'. Walks through 6 setup stages like /studio, then autonomously arranges into sections with builds, drops, breakdowns."
---

# Studio Flow — Expert Guided Evolving Track

You are a co-producer building a full evolving track. First, build the sound palette together through 6 stages (same as `/studio`). Then arrange it into a full track that evolves autonomously via sequential `/swap` calls.

## References

Read these as needed — same references as `/studio`:
- **Strudel API**: [../play/references/strudel-api.md](../play/references/strudel-api.md) — read when writing any Strudel code
- **Production Craft**: [../play/references/production-craft.md](../play/references/production-craft.md) — read when planning layers and mix
- **Groove & Rhythm**: [../play/references/groove-and-rhythm.md](../play/references/groove-and-rhythm.md) — read during Stage 1 (Rhythm)
- **Sound Design**: [../play/references/sound-design.md](../play/references/sound-design.md) — read when translating producer vocabulary
- **Genres**: [../play/references/genres.md](../play/references/genres.md) — read during Stage 0 (Vision)
- **Music Theory**: [../play/references/music-theory.md](../play/references/music-theory.md) — read during Stage 3 (Harmony)
- **Arrangement**: [../play/references/arrangement.md](../play/references/arrangement.md) — read during arrangement planning
- **Flow Arrangement**: [../play/references/flow-arrangement.md](../play/references/flow-arrangement.md) — **READ FIRST** for arrangement templates, energy curves, transition techniques, and execution loop

Genre templates: `strudel/genres/` — read the relevant template before generating code.

## Playback

To play: `curl -s -X POST http://localhost:3456/play -H 'Content-Type: application/json' -d '{"code": "<strudel code>", "label": "short description"}'`
To swap (seamless transition): `curl -s -X POST http://localhost:3456/swap -H 'Content-Type: application/json' -d '{"code": "<strudel code>", "label": "short description"}'`
To stop: `curl -s -X POST http://localhost:3456/stop`

---

## Phase 1: Build the Palette (6 Stages)

These are identical to `/studio`. Walk through each stage, playing the evolving result after each one.

### Stage 0: Vision
Three questions with genre-aware defaults:
- **Q1 — Genre + intent:** What are we making?
- **Q2 — Key, mode, harmonic density:** Major/minor/modal? Simple or rich?
- **Q3 — Texture + character:** Warm/cold/dusty/clinical? References?

### Stage 1: Rhythm
Three questions:
- **Q1 — Groove feel:** Kick pattern + swing amount
- **Q2 — Percussion density:** Minimal to dense
- **Q3 — Rhythmic signature:** Anything unusual?

Build drums, group under `// === DRUMS ===`, play.

### Stage 2: Bass
Two questions:
- **Q1 — Character + kick relationship:** Sub, 808, acid, Reese, walking?
- **Q2 — Movement + register:** Static, bouncing, sweeping?

Add bass, group under `// === BASS ===`, play drums + bass.

### Stage 3: Harmony
Three questions:
- **Q1 — Progression + harmonic rhythm:** Chords and change frequency
- **Q2 — Sound + register:** Pad, stab, pluck, organ?
- **Q3 — Tension level:** Consonant or dissonant?

Add harmony, group under `// === HARMONY ===`, play stack.

### Stage 4: Top
Two questions:
- **Q1 — Melodic approach:** Melody, arp, texture, or nothing?
- **Q2 — Space + rhythmic relationship:** Locked, floating, polyrhythmic?

Add top layers, group under `// === TOP ===`, play full stack.

### Stage 5: Mix + Space
Three questions:
- **Q1 — Balance + clashes:** What's upfront vs. background?
- **Q2 — Spatial depth:** Dry or spacious?
- **Q3 — Effects + character:** Saturation, crush, chorus, sidechain?

Adjust gains, filters, effects. No new layers. Play refined stack.

### Navigation (same as /studio)
| Command | Action |
|---------|--------|
| "next" | Advance to next stage, use genre defaults |
| "skip" | Skip stage entirely |
| "back to [stage]" | Return to named stage |

---

## Phase 2: Transition to Flow

After Stage 5 (Mix), the full palette is established. Now transition to arrangement:

**Ask two questions:**

1. **"How long should this track be?"**
   - Default: ~8 minutes
   - Accept: specific minutes, or descriptions like "short set" (5 min), "full track" (10 min), "extended mix" (15 min)

2. **"What shape — building, wave, or steady groove?"**
   - "Building" → Progressive Build template
   - "Wave" → DJ Track or Tension-Release template
   - "Steady groove" → Hypnotic template
   - Or describe: "classic club track", "slow burn", "multiple drops" → map to template

---

## Phase 3: Autonomous Arrangement

### Plan

Select template from flow-arrangement.md, scale to target duration. The 6 stages already produced all layers — the arrangement selectively enables, disables, and modifies them across sections.

Print the roadmap:

```
Arrangement: DJ Track (7 sections, ~9 min at 130 BPM)

Using the palette we built:
- Anchors: [kick pattern], [bass pattern]
- Colors: [pad], [lead], [hh/perc]
- Transitions: filter sweeps, risers

1. intro    — 16 bars — pad + sub only
2. build    — 16 bars — kick enters, hats fade in
3. drop     — 32 bars — full palette
4. breakdown — 16 bars — strip to pad + fx
5. build-2  — 16 bars — rebuild with variation
6. drop-2   — 32 bars — peak, lead variation
7. outro    — 16 bars — layers exit

Starting now...
```

### Execute

Generate Strudel code for 2-3 sections at a time. Each section uses the palette layers from the 6 stages — not new sounds, but selective presence/absence and modulation.

Execute via bash with sleep timing (see flow-arrangement.md for execution loop).

### Checkpoint

After each chunk:

```
--- Now playing: drop (3/7) ---
Next up: breakdown → build-2 → drop-2
Press Enter to continue, or give me production notes.
```

The user can:
- Continue the arrangement
- Give feedback ("breakdown needs more tension", "bring the lead in earlier")
- Say "loop this" to stay on current section
- Say "end it" for an abbreviated outro

### Complete

```
--- Track complete ---
That was [duration] of [genre]. Want to arrange it differently, or tweak the palette?
```

## Code Rules

- NEVER use `.voicings()` — spell out chord notes manually
- Don't use `.vowel()` with mini-notation patterns — single static vowel only
- Invalid samples — NOT in dirt-samples: `oh` (use `808oh`/`ho`), `rim` (use `rm`), `ride` (use `hh27`), `crash` (use `cr`), `tambourine` (use `tink`), `conga`/`bongo` (use `hand`), `piano` (use FM synth), `shaker` (use `hh*16` + `.hpf(8000)`)
- Always set tempo with `.cpm(bpm/4)`
- Keep to 6-8 layers max per section
- Label layers: `// === ANCHOR: KICK ===`, `// === COLOR: PAD ===`, `// === TRANSITION: RISER ===`
- Include section position in labels: `"intro (1/7)"`
- Reuse the exact layer code from the palette stages — don't reinvent sounds
- Use `.rangex()` for frequency sweeps

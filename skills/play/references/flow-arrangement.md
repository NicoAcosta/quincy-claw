# Flow Arrangement — Evolving Track System

Reference for generating full evolving tracks (8-15 minutes) via sequential `/swap` calls. The engine's scheduler never stops — swaps are seamless.

## Energy Curve

Energy 0.0-1.0 maps to concrete parameters:

| Energy | Layers | Filter (lpf) | Density | Character |
|--------|--------|--------------|---------|-----------|
| 0.0-0.2 | 1-2 (pad, sub) | 300-800 | sparse, long notes | atmospheric, breathing |
| 0.3-0.5 | 3-4 (+kick, hh) | 800-2000 | 8th notes | groove emerging |
| 0.6-0.8 | 5-6 (+bass, perc) | 2000-5000 | 16th notes | driving, full |
| 0.9-1.0 | 6-8 (everything) | open (8000+) | max density | peak energy |

## Section Types

| Section | Bars | Energy | Purpose |
|---------|------|--------|---------|
| intro | 8-16 | 0.1-0.3 | Establish mood, 1-2 layers |
| build | 8-16 | rising | Add layers, open filters, increase density |
| drop | 16-32 | 0.7-1.0 | Full energy, all layers active |
| breakdown | 8-16 | 0.2-0.4 | Strip to atmosphere, remove kick/bass |
| build-2 | 8-16 | rising | Rebuild with variation from first build |
| drop-2 | 16-32 | 0.8-1.0 | Peak energy, slight variation from drop |
| outro | 8-16 | falling | Mirror intro, layers exit one by one |

## Layer Roles

- **Anchor layers** — present in most sections (kick, bass). Provide continuity across swaps. Keep patterns identical or very similar between adjacent sections.
- **Color layers** — enter/exit for contrast (pad, lead, perc). Their presence/absence defines sections.
- **Transition layers** — temporary, only at section boundaries (noise riser, snare roll, filter sweep). Present in last 25% of outgoing section or first 25% of incoming.

## Layer Presence by Section

| Layer | intro | build | drop | breakdown | build-2 | drop-2 | outro |
|-------|-------|-------|------|-----------|---------|--------|-------|
| kick | - | enter | ON | exit | enter | ON | fade |
| bass | - | enter | ON | - | enter | ON | fade |
| hh/perc | - | sparse | ON | - | sparse | ON+var | fade |
| pad | ON | ON | bg | ON | ON | bg | ON |
| lead | - | - | ON | - | teaser | ON+var | - |
| fx/texture | ON | ON | sparse | ON | ON | sparse | ON |
| transition | - | riser | - | - | riser | - | - |

`ON` = full, `bg` = background (low gain), `enter` = fading in, `fade` = fading out, `var` = variation

## Transition Technique (Two-Phase Swap)

Since `/swap` is instantaneous, smoothness comes from preparing both sides of each swap point:

### Outgoing section — last 25% has closing modulation:
- Filter closing: `.lpf(saw.rangex(3000, 400).slow(N))` where N = total section cycles
- Gain ramp: `.gain(saw.range(0.8, 0.3).slow(N))`
- Thinning: `.degradeBy(saw.range(0, 0.6).slow(N))`

### Incoming section — first 25% has opening modulation:
- Filter opening: `.lpf(saw.rangex(200, targetFreq).slow(N))`
- Gain fade-in: `.gain(saw.range(0.2, targetGain).slow(N))`

### Anchor continuity:
Keep kick and bass patterns identical (or nearly so) across adjacent sections. The ear anchors to rhythm — if the groove stays, layer changes feel natural.

## Execution Loop

### Timing calculation
```
sleep_seconds = (bars * 4 * 60) / BPM
```
Example: 16 bars at 130 BPM = `(16 * 4 * 60) / 130 = 29.5 seconds`

### Chunked execution
Execute 2-3 sections per bash call. The first section uses `/play` (or `/swap` if already playing), subsequent sections use `/swap` with `sleep` between them:

```bash
curl -s -X POST http://localhost:3456/play -H 'Content-Type: application/json' \
  -d '{"code":"...section1...", "label":"intro (1/7)"}' && \
sleep 29.5 && \
curl -s -X POST http://localhost:3456/swap -H 'Content-Type: application/json' \
  -d '{"code":"...section2...", "label":"build (2/7)"}' && \
sleep 29.5 && \
curl -s -X POST http://localhost:3456/swap -H 'Content-Type: application/json' \
  -d '{"code":"...section3...", "label":"drop (3/7)"}'
```

### Checkpoint pattern
After each chunk of 2-3 sections, the turn ends. The last section keeps looping. Print a checkpoint:

```
--- Section 3/7: drop ---
Next up: breakdown → build → drop 2
Press Enter to continue, or tell me what to change.
```

The user can:
- Press Enter (or say "continue", "go", "next") → continue arrangement
- Give feedback ("darker", "extend this section", "more bass") → adjust remaining sections
- Say "stop here" or "loop this" → keep current section looping

## Arrangement Templates

### 1. DJ Track (classic club)
| # | Section | Bars | Energy |
|---|---------|------|--------|
| 1 | intro | 16 | 0.2 |
| 2 | build | 16 | 0.3→0.7 |
| 3 | drop | 32 | 0.9 |
| 4 | breakdown | 16 | 0.3 |
| 5 | build-2 | 16 | 0.4→0.8 |
| 6 | drop-2 | 32 | 1.0 |
| 7 | outro | 16 | 0.8→0.1 |
**Total: 144 bars.** Best for: techno, house, trance, DnB

### 2. Ambient Journey (textural)
| # | Section | Bars | Energy |
|---|---------|------|--------|
| 1 | sparse | 16 | 0.1 |
| 2 | thicken | 16 | 0.2→0.4 |
| 3 | dense | 32 | 0.5 |
| 4 | thin | 16 | 0.4→0.2 |
| 5 | drift | 16 | 0.3 |
| 6 | dissolve | 16 | 0.2→0.0 |
**Total: 112 bars.** Best for: ambient, generative, lo-fi

### 3. Progressive Build (one-layer-at-a-time)
| # | Section | Bars | Energy |
|---|---------|------|--------|
| 1 | seed | 8 | 0.1 |
| 2 | +layer | 8 | 0.2 |
| 3 | +layer | 8 | 0.3 |
| 4 | +layer | 8 | 0.5 |
| 5 | +layer | 8 | 0.7 |
| 6 | peak | 32 | 1.0 |
| 7 | strip | 16 | 0.5→0.1 |
| 8 | outro | 8 | 0.1→0.0 |
**Total: 96 bars.** Best for: progressive house, minimal techno, breakbeat

### 4. Tension-Release (wave)
| # | Section | Bars | Energy |
|---|---------|------|--------|
| 1 | intro | 8 | 0.2 |
| 2 | build | 16 | 0.3→0.7 |
| 3 | drop | 16 | 0.8 |
| 4 | breakdown | 8 | 0.2 |
| 5 | build-2 | 16 | 0.4→0.9 |
| 6 | drop-2 | 16 | 1.0 |
| 7 | breakdown-2 | 8 | 0.3 |
| 8 | build-3 | 16 | 0.5→1.0 |
| 9 | drop-3 | 16 | 1.0 |
| 10 | outro | 8 | 0.5→0.0 |
**Total: 128 bars.** Best for: trance, dubstep, DnB

### 5. Hypnotic (minimal changes)
| # | Section | Bars | Energy |
|---|---------|------|--------|
| 1 | establish | 16 | 0.5 |
| 2 | groove | 32 | 0.6 |
| 3 | shift | 16 | 0.5 (new element) |
| 4 | groove-2 | 32 | 0.7 |
| 5 | strip | 16 | 0.4 |
| 6 | groove-3 | 32 | 0.6 |
| 7 | fade | 16 | 0.3→0.0 |
**Total: 160 bars.** Best for: minimal techno, dub, hypnotic house

## Genre-Template Pairing

| Genre | Primary Template | Alt Template |
|-------|-----------------|--------------|
| Techno | DJ Track | Hypnotic |
| House | DJ Track | Progressive Build |
| Ambient | Ambient Journey | — |
| DnB | Tension-Release | DJ Track |
| Lo-fi | Ambient Journey | Hypnotic |
| Trance | Tension-Release | DJ Track |
| Dubstep | Tension-Release | DJ Track |
| Minimal | Hypnotic | Progressive Build |
| Breakbeat | Progressive Build | DJ Track |
| Synthwave | DJ Track | Ambient Journey |
| Dub | Hypnotic | Ambient Journey |
| Acid | DJ Track | Hypnotic |
| UK Garage | DJ Track | Progressive Build |

## Duration Scaling

To hit a target duration, scale bar counts proportionally:

```
scale_factor = target_minutes / (template_total_bars * 4 * 60 / BPM / 60)
```

Then multiply each section's bar count by `scale_factor`, rounding to nearest 8. Minimum section = 8 bars.

Example: DJ Track at 130 BPM = ~4.4 min default. For 10 min target: scale = 2.3x. Intro 16→32, drops 32→64, etc.

## Code Structure Convention

Every section follows this pattern:
```js
stack(
  // === ANCHOR: KICK ===
  s("bd*4").gain(1.1),
  // === ANCHOR: BASS ===
  note("c2 [c2 g1]").s("sawtooth").lpf(800).gain(0.8),
  // === COLOR: PAD ===
  note("<[c3,eb3,g3] [bb2,d3,f3]>").s("triangle").gain(0.2).room(0.7),
  // === COLOR: LEAD ===
  note("c4 eb4 g4 bb4").s("square").lpf(2000).gain(0.3),
  // === TRANSITION: RISER ===
  s("white").hpf(saw.rangex(200, 8000).slow(16)).gain(0.12)
).cpm(130/4)
```

Label each layer's role (ANCHOR/COLOR/TRANSITION) in comments. This makes it easy to track what enters/exits across sections.

## Labels

Include section position in labels for user orientation:
- `"intro (1/7)"`, `"build (2/7)"`, `"drop (3/7)"`, etc.

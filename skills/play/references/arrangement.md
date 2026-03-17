# Arrangement Reference

How to make tracks evolve instead of loop. Energy curves, evolution strategies, transitions, and build/drop patterns.

## Table of Contents
- [Energy Curves](#energy-curves)
- [Evolution Toolkit](#evolution-toolkit)
- [Transition Recipes](#transition-recipes)
- [Build & Drop Patterns](#build--drop-patterns)
- [Phrase Timing](#phrase-timing)
- [Song Structure](#song-structure)

---

## Energy Curves

Every track needs an energy shape. Pick one before writing code.

### Arc Types

| Arc | Shape | How | Best For |
|-----|-------|-----|----------|
| **Rising** | Low → high | Start 3 layers, add to 6 over 16-32 bars. Open filters, increase density. | Techno, trance, progressive |
| **Wave** | Mid → high → low → high | Full groove, strip to pads, rebuild. `.every(16, ...)` for macro movement. | House, DnB, dub |
| **Plateau** | Build → sustain | Build over 8 bars, then maintain with micro-variation. | Minimal, ambient, lo-fi |

### Energy = Parameters

Energy is not a feeling — it's concrete parameter changes:

| Direction | Layers | Filter | Density | Gain | Reverb |
|-----------|--------|--------|---------|------|--------|
| Energy UP | +layers | ↑ lpf cutoff | ×2 subdivisions | +gain on hats/perc | -room (drier = closer) |
| Energy DOWN | -layers | ↓ lpf cutoff | ÷2 subdivisions | -gain on hats/perc | +room (wetter = distant) |

---

## Evolution Toolkit

Four strategies for making patterns change over time. Use 2-3 per track.

### Additive — Add Layers Over Time

```js
// Percussion enters every 8 bars
s("bd*4").every(8, x => stack(x, s("perc*8").gain(0.3)))

// Hat complexity doubles every 8
s("hh*8").every(8, x => x.fast(2))

// Pad appears every 4 bars for 1 bar
note("<[c3,e3,g3]>").s("triangle").gain(0.25)
  .every(4, x => x.mask("0 0 0 1"))  // silent except every 4th
```

### Subtractive — Remove/Thin Elements

```js
// Hats thin out every 8 bars (breakdown feel)
s("hh*16").every(8, x => x.degradeBy(0.7))

// Kick drops out every 16 bars for 2 bars
s("bd*4").every(16, x => x.mask("1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0"))

// Snare drops every 8 (creates anticipation)
s("~ cp ~ cp").every(8, x => x.gain(0))
```

### Transformative — Alter Existing Patterns

```js
// Hats double-time every 4 bars
s("hh*8").every(4, x => x.fast(2))

// Bass reverses every 8
note("e1 ~ e2 ~").s("sawtooth").every(8, x => x.rev())

// Pattern shifts every 3 (polymetric drift)
s("bd ~ sd ~ bd ~ ~ sd").every(3, x => x.iter(8))
```

### Parameter Sweep — Continuous Modulation

```js
// 16-bar filter sweep on bass
note("e1").s("sawtooth").lpf(sine.rangex(200, 2000).slow(16))

// Reverb builds over 8 bars
note("<[c3,e3,g3]>").s("triangle").room(sine.range(0.1, 0.7).slow(8))

// Gain breathes over 4 bars
s("hh*16").gain(sine.range(0.2, 0.6).slow(4))

// Pan drifts over 8 bars
s("perc*4").pan(sine.range(0.2, 0.8).slow(8))
```

---

## Transition Recipes

### Riser (Build Energy)

```js
// White noise sweep — classic riser
s("white").hpf(sine.rangex(200, 8000).slow(8)).gain(0.15)

// Snare roll accelerating
s("~ sd ~ sd").lastOf(4, x => x.fast(4))

// Filter sweep on everything (use on a pad or bass)
.lpf(saw.rangex(400, 8000).slow(8))
```

### Dropout (Release Energy)

```js
// Kill everything except kick for 2 bars
.every(16, x => x.mask("1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0"))

// Sudden filter close
.every(8, x => x.lpf(200))

// Degradation wash
.every(8, x => x.degradeBy(0.8))
```

### Fill (Mark Phrase Boundary)

```js
// Snare fill before the one
s("~ sd ~ sd").every(4, x => x.lastOf(4, y => y.fast(4)))

// Hat flurry
s("hh*8").every(4, x => x.lastOf(4, y => y.fast(4).gain(0.7)))

// Tom fill
s("~ ~ ~ ~").every(4, x => x.lastOf(4, _ => s("lt mt ht mt").gain(0.6)))
```

---

## Build & Drop Patterns

### 3-Layer → 6-Layer Build (16 bars)

```js
stack(
  // Always on — core groove
  s("bd*4").gain(1.0),
  s("~ cp ~ cp").gain(0.85),
  s("hh*8").gain(0.4),

  // Enters bar 5 — bass grounds the groove
  note("e1 ~ e2 ~").s("sawtooth").gain(0.7).lpf(600)
    .mask("0 0 0 0 1 1 1 1 1 1 1 1 1 1 1 1"),

  // Enters bar 9 — pad adds harmony
  note("<[c3,e3,g3]>").s("triangle").gain(0.25).room(0.5)
    .mask("0 0 0 0 0 0 0 0 1 1 1 1 1 1 1 1"),

  // Enters bar 13 — texture adds detail
  s("perc*4").gain(0.2).hpf(2000)
    .mask("0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1")
)
```

### Variation Without Changing Notes

Sometimes you don't need new notes — just movement:

| Technique | Code | Effect |
|-----------|------|--------|
| Filter sweep | `.lpf(sine.rangex(500, 4000).slow(8))` | Opens/closes brightness |
| Gain swell | `.gain(sine.range(0.2, 0.6).slow(4))` | Breathes in and out |
| Degradation | `.every(4, x => x.degradeBy(0.3))` | Rhythmic thinning |
| Pan drift | `.pan(sine.range(0.3, 0.7).slow(8))` | Stereo movement |
| Reverb swell | `.room(sine.range(0.1, 0.7).slow(16))` | Space opens up |
| Bit reduction | `.every(8, x => x.crush(6))` | Periodic lo-fi moment |

---

## Phrase Timing

| Phrase Length | Use For | Example |
|-------------|---------|---------|
| 2 bars | Hat variations, small fills | `.every(2, ...)` |
| 4 bars | Percussion additions, filter moves | `.every(4, ...)` |
| 8 bars | Layer additions/removals, big filter sweeps | `.every(8, ...)` |
| 16 bars | Full arrangement changes, builds/drops | `.slow(16)` modulation |
| 32 bars | Macro structure, key changes | `.slow(32)` |

---

## Song Structure

### Typical Structure
1. **Intro** (4-8 bars): Minimal — kick + hats or pad only
2. **Build** (4-8 bars): Add bass, then percussion
3. **Drop/Main** (16 bars): Full pattern, all layers
4. **Breakdown** (8 bars): Strip to pads/melody, remove drums
5. **Build 2** (4-8 bars): Reintroduce elements
6. **Drop 2** (16 bars): Full pattern with variation
7. **Outro** (4-8 bars): Gradually remove layers

### Implementing Structure with `.every()`

Since Strudel loops continuously, use `.every()` at different phrase lengths to create the *feeling* of structure:

```js
stack(
  s("bd*4").gain(1.0),                                    // always on
  s("hh*8").gain(0.4),                                    // always on
  s("~ cp ~ cp").every(8, x => x.gain(0)),                // drops every 8
  note("e1 ~ e2 ~").s("sawtooth").gain(0.7),              // always on
  note("<[c3,e3,g3]>").s("triangle").gain(0.25)
    .every(4, x => x.room(sine.range(0.3, 0.9).slow(4))), // reverb swell
  s("perc*4").gain(0.2).every(8, x => x.degradeBy(0.5))   // thins every 8
)
```

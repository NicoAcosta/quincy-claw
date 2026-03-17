# Iteration Guide

How to map user feedback to Strudel code changes.

## Feedback → Action

| Feedback | Action |
|----------|--------|
| "More energy" | +BPM, +hits, +gain, -rests, +layers |
| "Calmer" | -BPM, +rests, -gain, -layers |
| "Darker" | minor/phrygian, ↓lpf, +room, ↓octave |
| "Brighter" | major/lydian, ↑lpf/hpf, ↑octave |
| "More swing" | `.late(0.02)`, offset patterns |
| "Straighter" | remove `.late()`, quantize |
| "Busier" | +density, +layers, ×subdivisions |
| "Sparser" | `.degrade()`, -layers, +rests |
| "Heavier bass" | ↓octave, +gain, +distort, sub layering |
| "More space" | +room, +delay, +rests, -layers |
| "More experimental" | euclidean, `.jux()`, `.every()`, probability |
| "More traditional" | standard patterns, remove probability |
| "Add melody" | pentatonic/scale melody layer on top |
| "Add chords" | chord voicing layer matching key |
| "Strip it down" | remove layers until core groove remains |
| "Build it up" | add layers progressively |
| "Double time" | `.fast(2)` or halve note durations |
| "Half time" | `.slow(2)` or double note durations |
| "Filter sweep" | `.lpf(sine.range(lo, hi).slow(n))` |
| "Wobble" | LFO on filter or gain |
| "Glitchy" | `.chop()`, `.striate()`, fast `.every()` |
| "Vinyl / dusty" | noise layer, `.crush()`, `.lpf()`, `.hpf()` |

## Song Structure

Use `.every()` for arrangement over time:

```js
// Add snare every 4 cycles
s("bd*4").every(4, x => stack(x, s("~ cp ~ cp")))

// Drop element every 8 bars for breakdown
s("hh*16").every(8, x => x.degradeBy(0.8))
```

### Typical arrangement
1. **Intro** (4-8 bars): kick + hats or pad only
2. **Build** (4-8 bars): add bass, then percussion
3. **Drop** (16 bars): all layers
4. **Breakdown** (8 bars): strip to pads/melody
5. **Build 2** (4-8 bars): reintroduce elements
6. **Drop 2** (16 bars): full pattern with variation
7. **Outro** (4-8 bars): gradually remove layers

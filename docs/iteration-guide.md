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
| "More experimental" | euclidean, `.jux()`, `.every()`, `.iter()`, probability |
| "More traditional" | standard patterns, remove probability |
| "Add melody" | pentatonic/scale melody layer on top |
| "Add chords" | spell out chord notes in `[root,3rd,5th,7th]` |
| "Strip it down" | remove layers until core groove remains |
| "Build it up" | add layers progressively |
| "Double time" | `.fast(2)` or halve note durations |
| "Half time" | `.slow(2)` or double note durations |
| "Filter sweep" | `.lpf(sine.range(lo, hi).slow(n))` |
| "Wobble" | LFO on filter: `.lpf(sine.range(200,2000).fast(4))` |
| "Glitchy" | `.chop()`, `.striate()`, fast `.every()` |
| "Vinyl / dusty" | crackle layer, `.crush(12)`, `.lpf(3000)`, `.hpf(200)` |
| "Make it pump" | sidechain: `.gain(sine.range(0.2,1).fast(4))` on non-kick layers |
| "More analog" | triangle/saw, `.lpf()`, slight `.distort()`, `.detune()` |
| "More digital" | `.crush()`, `.coarse()`, sine, clean signals |
| "Make it weird" | `.chop()`, `.iter()`, `.palindrome()`, `.jux(rev)` |
| "Open it up" | raise `.lpf()`, remove `.hpf()`, +reverb |
| "Close it down" | lower `.lpf()`, add `.hpf()`, -reverb |

## Producer Vocabulary → Strudel Translation

When users use producer language, translate to concrete Strudel code:

| Term | Meaning | Strudel Translation |
|------|---------|-------------------|
| "Sidechain" / "pumping" | Kick ducks other elements | `.gain(sine.range(0.3, 1).fast(4))` on pads/bass |
| "Warm" | Rich low-mids, analog feel | `.lpf(2000)`, triangle/saw, `.room(0.3)` |
| "Cold" / "icy" | Thin, high-freq, sparse | `.hpf(500)`, sine, `.delay(0.4)`, minimal layers |
| "Fat" / "thick" | Layered, saturated | Stack sub + mid, `.distort(0.1)`, `.gain(1.2)` |
| "Crispy" / "crunchy" | Hi-freq distortion | `.crush(8)`, `.coarse(4)`, `.distort(0.3)` |
| "Punchy" | Strong transients | `.attack(0)`, `.decay(0.1)`, `.compressor()` |
| "Airy" | Breathy, spacious | `.hpf(2000)`, `.room(0.8)`, `.delay(0.4)` |
| "Muddy" | Too much low-mid (fix it) | `.hpf(200)` on non-bass, cut low-mid buildup |
| "Tight" | Precise, dry | Reduce `.room()`, short decay, remove `.late()` |
| "Loose" | Relaxed, swung | `.late(rand.range(0, 0.02))`, swing timing |
| "808" | TR-808 sounds | `s("808bd")`, `s("808sd")`, or deep sine + `.decay(0.8)` |
| "909" | TR-909 sounds | `s("909")` — punchier electronic drums |
| "303 bass" / "acid" | TB-303 squelch | Saw + `.lpf(sine.range(200,4000))` + `.resonance(25)` |
| "Reese bass" | Detuned saws | Stack two `sawtooth` notes slightly detuned |
| "Rhodes" | Electric piano | Triangle + `.lpf(2000)` + `.room(0.3)` + `.tremolo(4)` |
| "Amen break" | Classic breakbeat | `s("amencutup:0 amencutup:1 ...")` or build from bd/sd |
| "Vinyl" / "dusty" | Lo-fi texture | `.crush(12)`, `.lpf(3000)`, `.hpf(200)`, crackle layer |
| "Glitchy" | Digital artifacts | `.chop()`, `.striate()`, `.splice()`, fast `.every()` |
| "Bouncy" | Rhythmic buoyancy | Syncopation, offbeat bass, swing |
| "Saturated" | Harmonic richness | `.distort(0.1-0.3)`, layer harmonics |
| "Lo-fi" | Degraded warmth | `.crush(10-12)`, `.lpf(3000)`, `.coarse(2)` |
| "Ethereal" | Otherworldly | Long reverb, high notes, delays, sparse |
| "Aggressive" | Hard-hitting | `.distort()`, `.crush()`, more gain, phrygian |
| "Dreamy" | Soft, floaty | Lydian, `.room(0.8)`, `.delay(0.5)`, pads |
| "Gritty" | Rough texture | `.distort(0.2)`, `.crush(8)`, saw oscillator |
| "Clean" | Unprocessed, pure | Remove effects, sine/triangle, no distortion |
| "Wet" | Heavy effects | More `.room()`, `.delay()`, `.phaser()` |
| "Dry" | No effects | Remove/reduce `.room()`, `.delay()` |
| "Swampy" | Dark, murky | Low `.lpf()`, `.room(0.7)`, slow movement |
| "Sparkly" | Bright, shimmery | High notes, `.delay()`, arpeggiations, `.hpf()` |

## Sound Design Recipes

### Reese Bass
```js
stack(
  note("e1").sound("sawtooth"),
  note("e1").sound("sawtooth").detune(0.3)
).lpf(sine.range(300, 2000).slow(8)).gain(0.8)
```

### Sidechain Pumping
Apply to pads/bass — simulates kick ducking:
```js
.gain(sine.range(0.2, 1).fast(4))  // 4 pumps per cycle (one per beat)
```

### Acid Squelch (303-style)
```js
note("e2 [e2 g2] e2 [e2 b2]").sound("sawtooth")
  .lpf(sine.range(200, 5000).fast(2))
  .resonance(30)
  .decay(0.1).sustain(0)
```

### FM Bell
```js
note("c5 e5 g5 c6").sound("sine")
  .fm(4).fmh(3)
  .decay(1.5).sustain(0)
  .room(0.5).size(0.8)
```

### Tape Echo
```js
.delay(0.6).delaytime(0.375).delayfeedback(0.4).lpf(2000)
// Filtered delay simulates degraded tape repeats
```

### Vinyl Crackle Layer
```js
s("crackle*8").gain(0.04).hpf(4000).pan(rand)
```

### Bitcrushed Drums
```js
s("bd sd:3 [~ bd] sd:5").crush(6).coarse(3)
```

### Pad Wash
```js
note("<[c3,e3,g3,b3] [a2,c3,e3,g3]>").sound("triangle")
  .attack(2).release(4).room(0.9).size(0.95).gain(0.4)
```

### Electric Piano (Rhodes-style)
```js
note("<[d3,f3,a3,c4] [g3,bb3,d4] [c3,e3,g3,b3]>").sound("triangle")
  .lpf(2000).room(0.3).tremolo(4).tremolodepth(0.15)
```

### Wobble Bass (Dubstep)
```js
note("e1 e1 e1 e1").sound("sawtooth")
  .lpf(sine.range(200, 2000).fast(4))
  .resonance(20).gain(0.9)
```

### Supersaw Pad
```js
stack(
  note("<[c3,e3,g3]>").sound("sawtooth"),
  note("<[c3,e3,g3]>").sound("sawtooth").detune(0.1),
  note("<[c3,e3,g3]>").sound("sawtooth").detune(-0.1)
).lpf(3000).room(0.6).gain(0.3)
```

### Riser / Build FX
```js
s("white").gain(saw.range(0, 0.5).slow(8))
  .hpf(saw.range(200, 8000).slow(8))
// White noise rising over 8 cycles
```

### Gated Reverb Snare (80s)
```js
s("~ sd ~ sd").room(0.9).size(0.9).decay(0.3).gain(1.2)
```

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

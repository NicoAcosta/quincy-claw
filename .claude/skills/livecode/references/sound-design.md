# Sound Design Reference

Producer vocabulary translations and sound design recipes for Strudel.

## Table of Contents
- [Producer Vocabulary](#producer-vocabulary)
- [Sound Design Recipes](#sound-design-recipes)

---

## Producer Vocabulary

When the user uses producer language, map it to concrete Strudel code:

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
| "Reese bass" | Detuned saws | Stack two `sawtooth` slightly detuned |
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

---

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
.gain(sine.range(0.2, 1).fast(4))  // 4 pumps per cycle
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

---

## Bass Sound Design

### Bass Roles

| Role | Oscillator | Filter | Use When |
|------|-----------|--------|----------|
| Sub bass | `sine` | `.lpf(150)` | Need pure low-end weight. Trap 808 tails, ambient drones. |
| Mid bass | `sawtooth` or `triangle` | `.lpf(600-800)` | Need audible bass on small speakers. House, DnB. |
| Full-spectrum | Sine + saw layered | Sub: `.lpf(150)`, mid: `.hpf(150).lpf(800)` | Need both weight and presence. Techno, neurofunk. |
| Pluck bass | `sawtooth` | `.lpf(1000)` + short decay | Need rhythmic punch. Funk, disco, tech house. |

### Bass Layering

```js
// Full-spectrum bass: sub + mid in separate layers
stack(
  note("e1").sound("sine").lpf(150).gain(0.7),           // sub: weight
  note("e2").sound("sawtooth").hpf(150).lpf(800).gain(0.5) // mid: definition
)
```

### Bass Envelope by Feel

| Feel | Attack | Decay | Sustain | How |
|------|--------|-------|---------|-----|
| Punchy (trap, boom bap) | 0 | 0.1-0.2 | 0 | `.attack(0).decay(0.15).sustain(0)` |
| Bouncy (house, UK garage) | 0 | 0.05-0.1 | 0 | `.attack(0).decay(0.08).sustain(0)` — short = bouncy |
| Smooth (ambient, chill) | 0.1 | 0.5-1.0 | 0.6 | `.attack(0.1).decay(0.5).sustain(0.6)` |
| Sustained (pad bass) | 0.2 | — | 1.0 | `.attack(0.2).sustain(1)` — no decay, holds |
| 808 tail (trap) | 0 | 0.8-2.0 | 0 | `.attack(0).decay(1.2).sustain(0)` — long ring |

### Kick-Bass Frequency Separation

The #1 cause of muddy low end is kick and bass occupying the same frequencies:

```js
// Strategy 1: Frequency split — kick high, bass low
s("bd*4").hpf(80),                          // kick: punch only, no sub
note("e1").s("sine").lpf(80).gain(0.7)      // bass: sub only

// Strategy 2: Timing split — never play simultaneously
s("bd ~ ~ ~ bd ~ ~ ~"),                     // kick on 1 and 3
note("~ e1 ~ e1 ~ e1 ~ e1").s("sawtooth")  // bass between kicks

// Strategy 3: Sidechain — bass ducks when kick hits
note("e1*4").s("sawtooth")
  .gain(sine.range(0.2, 0.8).fast(4))       // dips on every beat
```

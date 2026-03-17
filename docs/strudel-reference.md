# Strudel Reference

## Mini-Notation

```
s("bd sd hh sd")     // sequence
s("bd*4")            // repeat 4x
s("[bd sd] hh")      // subdivide into equal time
s("<bd sd>")         // alternate each cycle
s("bd ~ hh ~")      // ~ = rest
s("bd(3,8)")         // euclidean rhythm (3 hits in 8 steps)
s("bd?")             // 50% probability
s("bd@3 sd")         // bd takes 3/4 of time, sd takes 1/4
```

## Sound Sources

```js
s("bd sd hh cp")                  // samples (Dirt Samples bank)
s("bd:2")                         // sample variation by index
note("c3 e3 g3").sound("piano")   // note + instrument
note("c3 e3 g3").s("sawtooth")    // synth oscillator
```

### Synth Oscillators
- `"sine"` — pure tone, sub bass
- `"triangle"` — mellow, pads
- `"sawtooth"` — bright, leads and bass
- `"square"` — hollow, retro, stabs

## Effects

```js
.lpf(freq)          // low pass filter (Hz)
.hpf(freq)          // high pass filter (Hz)
.resonance(q)       // filter resonance (0-40)
.gain(vol)          // volume (0-1+)
.room(amt)          // reverb amount (0-1)
.size(amt)          // reverb size (0-1)
.delay(amt)         // delay wet (0-1)
.delaytime(sec)     // delay time in seconds
.delayfeedback(fb)  // delay feedback (0-1)
.pan(pos)           // stereo (0=left, 1=right)
.speed(rate)        // playback speed / pitch
.distort(amt)       // distortion (0-1)
.crush(bits)        // bitcrusher (1-16)
.vowel(v)           // vowel filter ("a","e","i","o","u")
.phaser(depth)      // phaser
.decay(sec)         // note decay time
```

## Pattern Modifiers

```js
.fast(n)            // speed up n times
.slow(n)            // slow down n times
.rev()              // reverse
.every(n, fn)       // apply fn every n cycles
.sometimes(fn)      // ~50% of the time
.rarely(fn)         // ~25%
.often(fn)          // ~75%
.jux(fn)            // apply to right channel only
.degrade()          // randomly remove events
.degradeBy(amt)     // remove with probability amt
.late(sec)          // delay events (swing/humanize)
.early(sec)         // advance events
```

## Continuous Patterns (Modulation)

```js
sine                // sine wave 0-1
cosine              // cosine wave 0-1
saw                 // sawtooth 0-1
rand                // random 0-1
perlin              // smooth random (Perlin noise)

// Set range:
sine.range(200, 4000).slow(8)   // sweep 200→4000 over 8 cycles
```

## Tempo

```js
.cpm(n)     // cycles per minute. BPM = cpm × 4, so .cpm(bpm/4)
setcps(n)   // cycles per second (global)
```

## Scales & Notes

```js
note("0 2 4 6").scale("C:minor")                          // scale degrees
note("c3 eb3 g3 bb3")                                     // note names
note("<Cm7 Fm7 Bb7 Ebmaj7>").voicings("lefthand")         // chord symbols
```

## Combining Patterns

```js
stack(           // layer simultaneously
  s("bd*4"),
  s("~ cp ~ cp"),
  s("hh*8")
)

cat(             // concatenate sequentially
  s("bd*4"),
  s("hh*8")
)
```

## Available Samples (Dirt Samples)

**Drums**: bd, sd, hh, oh, cp, rim, cb, lt, mt, ht, ride, crash, shaker, tambourine
**Electronic**: 808bd, 808sd, 808:oh, 808:ch
**Percussion**: conga, bongo, tabla, metal, chin
**Other**: piano, bass, guitar, strings, pad, pluck, wind

Each has variations by index: `bd:0` through `bd:9` etc.

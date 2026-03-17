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
s("bd,hh")           // play simultaneously (comma = stack)
```

## Sound Sources

```js
s("bd sd hh cp")                  // samples (Dirt Samples bank)
s("bd:2")                         // sample variation by index
note("c3 e3 g3").sound("piano")   // note + instrument
note("c3 e3 g3").s("sawtooth")    // synth oscillator
```

### Synth Oscillators
- `"sine"` — pure tone, sub bass, FM carrier
- `"triangle"` — mellow, pads, muted leads
- `"sawtooth"` — bright, leads and bass
- `"square"` — hollow, retro, stabs
- `"saw2"` — alternate sawtooth
- `"sine2"` — alternate sine

## Synthesis

### FM Synthesis

FM (frequency modulation) synthesis creates complex timbres by using one oscillator to modulate another's frequency.

```js
note("c3").s("sine")
  .fm(index)         // modulation depth (0-20+). Higher = more harmonics
  .fmh(ratio)        // harmonicity ratio. Integer = harmonic, non-integer = inharmonic/metallic
  .fmattack(sec)     // FM envelope attack
  .fmdecay(sec)      // FM envelope decay
  .fmsustain(level)  // FM envelope sustain (0-1)
  .fmrelease(sec)    // FM envelope release
  .fmenv(amt)        // FM envelope amount/depth
```

**FM recipes by sound:**
| Sound | fm | fmh | Notes |
|-------|-----|------|-------|
| Bell | 4-8 | 3, 5, 7 | High harmonicity, long decay |
| Metallic hit | 3-6 | 1.4, 2.7 | Non-integer ratio = inharmonic |
| Electric piano | 2-4 | 5-7 | Moderate FM, fast decay |
| FM bass | 1-3 | 1-2 | Low ratio, short decay |
| Gong/cymbal | 5-10 | 1.1-1.5 | Nearly-integer ratios |

### Noise Sources

```js
s("white")               // white noise — full spectrum, hiss
s("pink")                // pink noise — warmer, less harsh
s("brown")               // brown noise — deep rumble
s("crackle")             // crackle texture — vinyl/fire
note("c3").s("sawtooth").noise(0.3)  // mix noise into oscillator tone
```

### Wavetable Synthesis

Access 1000+ AKWF wavetable waveforms with the `wt_` prefix:

```js
note("c3").sound("wt_piano")
note("c3").sound("wt_flute")
note("c3").sound("wt_cello")
note("c3").sound("wt_saw")
note("c3").sound("wt_square")
```

### ADSR Envelope

Controls amplitude shape of each note:

```js
.attack(sec)       // time to reach peak (0 = instant transient)
.decay(sec)        // time from peak to sustain level
.sustain(level)    // held level while note is on (0-1)
.release(sec)      // fade time after note off
```

## Effects

### Filters

```js
.lpf(freq)          // low pass filter — removes highs above freq
.hpf(freq)          // high pass filter — removes lows below freq
.bpf(freq)          // band pass filter — keeps frequencies around freq
.resonance(q)       // filter resonance / Q (0-40, higher = sharper peak)
```

### Filter Envelopes

Shape the filter cutoff over each note's lifetime. Available for LP, HP, and BP filters:

```js
// Low pass envelope
.lpattack(sec)      // attack time
.lpdecay(sec)       // decay time
.lpsustain(level)   // sustain level (0-1)
.lprelease(sec)     // release time
.lpenv(amt)         // envelope depth (how much it affects cutoff, can be negative)

// High pass envelope — same pattern
.hpattack(sec).hpdecay(sec).hpsustain(level).hprelease(sec).hpenv(amt)

// Band pass envelope — same pattern
.bpattack(sec).bpdecay(sec).bpsustain(level).bprelease(sec).bpenv(amt)
```

### Volume & Dynamics

```js
.gain(vol)          // volume (0-1+)
.compressor("threshold:ratio:knee:attack:release")
// Example: .compressor("-20:4:10:0.01:0.1")
// threshold in dB, ratio (e.g. 4 = 4:1), knee in dB, attack/release in seconds
```

### Space Effects

```js
.room(amt)          // reverb wet amount (0-1)
.size(amt)          // reverb room size (0-1, larger = longer tail)
.delay(amt)         // delay wet amount (0-1)
.delaytime(sec)     // delay time in seconds
.delayfeedback(fb)  // delay feedback (0-1, higher = more repeats)
.pan(pos)           // stereo position (0=left, 0.5=center, 1=right)
.orbit(n)           // route to separate effect bus (integer)
```

### Pitch & Speed

```js
.speed(rate)        // sample playback speed (2 = octave up, 0.5 = octave down)
.detune(amt)        // detune in semitones (for oscillators)
```

### Distortion & Lo-fi

```js
.distort(amt)       // waveshaping distortion (0-1)
.crush(bits)        // bitcrusher (1-16, lower = crunchier)
.coarse(n)          // sample rate reduction (higher = more aliasing)
```

### Modulation Effects

```js
.vowel(v)           // vowel formant filter ("a", "e", "i", "o", "u")
.phaser(depth)      // phaser effect depth
.tremolo(speed)     // tremolo rate (amplitude modulation)
.tremolodepth(amt)  // tremolo depth (0-1)
.tremoloskew(amt)   // tremolo waveform shape
```

## Pattern Modifiers

### Time

```js
.fast(n)            // speed up pattern n times
.slow(n)            // slow down pattern n times
.late(sec)          // delay events in time (good for swing/humanize)
.early(sec)         // advance events in time
```

### Transformation

```js
.rev()              // reverse pattern order
.iter(n)            // rotate pattern by 1 step each cycle, over n cycles
.palindrome()       // play pattern forward then backward
.ply(n)             // repeat each event n times within its time slot
.off(time, fn)      // layer a copy of the pattern, offset in time, with fn applied
.chunk(n, fn)       // apply fn to one nth of the pattern, cycling through chunks
```

### Conditional

```js
.every(n, fn)       // apply fn every n cycles
.sometimes(fn)      // apply fn ~50% of the time
.rarely(fn)         // apply fn ~25%
.often(fn)          // apply fn ~75%
.almostAlways(fn)   // apply fn ~90%
.almostNever(fn)    // apply fn ~10%
.sometimesBy(p, fn) // apply fn with exact probability p (0-1)
.when(pat, fn)      // apply fn when boolean pattern is true
```

### Destructive

```js
.degrade()          // randomly remove ~50% of events
.degradeBy(amt)     // remove events with probability amt (0-1)
.mask(pat)          // keep events only where pat has events
.struct(pat)        // impose rhythmic structure from pat onto this pattern
```

### Stereo

```js
.jux(fn)            // apply fn to right channel, keep left unchanged
.pan(pos)           // stereo position (0-1)
```

### Choice & Probability

```js
.wchoose([a, 0.7], [b, 0.3])     // weighted random choice
.chooseCycles(pat1, pat2, pat3)   // randomly pick one pattern each cycle
```

## Sample Operations

```js
.cut(group)         // monophonic cut group — new note in group silences previous
.n(index)           // select sample index (alternative to :index notation)
.begin(pos)         // start playback position (0-1)
.end(pos)           // end playback position (0-1)
```

## Granular / Slice Operations

```js
.chop(n)            // chop sample into n granules, play in sequence
.striate(n)         // chop + interleave across time
.slice(n, pat)      // slice into n parts, reorder by index pattern
.splice(n, pat)     // like slice but adjusts speed to maintain pitch
.loopAt(n)          // time-stretch sample to fit n cycles
```

## Continuous Patterns (Modulation)

```js
sine                // sine wave 0-1
cosine              // cosine wave 0-1
saw                 // sawtooth ramp 0-1
tri                 // triangle wave 0-1
square              // square wave 0-1
rand                // uniform random 0-1
irand(n)            // random integer 0 to n-1
perlin              // smooth random (Perlin noise)

// Mapping to ranges
sine.range(200, 4000)          // linear: 200→4000→200
sine.rangex(200, 4000)         // exponential: better for frequencies
sine.range(200, 4000).slow(8)  // sweep over 8 cycles
```

**When to use `.rangex()` vs `.range()`:** Use `.rangex()` for frequency parameters (`.lpf()`, `.hpf()`, `.bpf()`) since human hearing is logarithmic. Use `.range()` for linear parameters (`.gain()`, `.pan()`, `.room()`).

## Tempo

```js
.cpm(n)     // cycles per minute. BPM = cpm × 4, so .cpm(bpm/4)
setcps(n)   // cycles per second (global)
```

## Scales & Notes

```js
note("0 2 4 6").scale("C:minor")     // scale degrees
note("c3 eb3 g3 bb3")               // note names with octave
// Chords — always spell out notes manually
note("<[c3,eb3,g3,bb3] [f3,ab3,c4,eb4]>")
```

**WARNING: Do NOT use `.voicings("lefthand")`.** It causes runtime errors. Always spell out chord notes as `[root,third,fifth,seventh]`.

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

## Polymeter

```js
// Patterns of different lengths create polyrhythms
stack(
  s("bd sd").fast(3),    // 3 repetitions per cycle
  s("hh hh hh").fast(4)  // 4 repetitions — creates phase shifting
)
```

## Available Samples (Dirt Samples)

### Drum Machines
- **808**: `808bd`, `808sd`, `808cy`, `808oh`, `808ch`, `808mt`, `808ht`, `808lt`
- **909**: `909`
- **Other**: `electro1`, `drumtraks`, `linnhats`, `tech`

### Breaks
- `amencutup` — Amen break, pre-sliced
- `breaks125`, `breaks152`, `breaks157`, `breaks165`

### Acoustic Drums
- `bd`, `sd`, `hh`, `oh`, `cp`, `rim`, `cb`, `lt`, `mt`, `ht`, `ride`, `crash`, `shaker`, `tambourine`

### Percussion
- `tabla`, `tabla2`, `conga`, `bongo`, `can`, `coins`, `metal`, `tink`, `tok`

### Bass
- `bass`, `bass0`–`bass3`, `moog`, `jvbass`, `jungbass`

### Synths & Keys
- `juno`, `arpy`, `pluck`, `pad`, `padlong`, `piano`

### Atmospheric
- `feelfx`, `breath`, `fire`, `wind`, `birds`, `space`, `noise`, `noise2`, `glitch`, `glitch2`, `crackle`

### Vocals & Special
- `rave`, `speech`, `miniyeah`, `toys`, `hoover`, `industrial`, `gabba`, `reverbkick`

### Custom Samples
```js
samples('github:user/repo')  // load community sample packs
```

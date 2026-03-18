# Strudel API Reference

Complete syntax reference for the Strudel live coding language.

## Table of Contents
- [Mini-Notation](#mini-notation)
- [Sound Sources](#sound-sources)
- [Synth Oscillators](#synth-oscillators)
- [FM Synthesis](#fm-synthesis)
- [Noise Sources](#noise-sources)
- [Wavetable Synthesis](#wavetable-synthesis)
- [ADSR Envelope](#adsr-envelope)
- [Effects Chain](#effects-chain)
- [Pattern Modifiers](#pattern-modifiers)
- [Probability & Choice](#probability--choice)
- [Sample Operations](#sample-operations)
- [Granular / Slice Operations](#granular--slice-operations)
- [Continuous Patterns](#continuous-patterns)
- [Tempo](#tempo)
- [Scales & Notes](#scales--notes)
- [Combining Patterns](#combining-patterns)
- [Polymeter](#polymeter)
- [Sample Bank Reference](#sample-bank-reference)

---

## Mini-Notation
```
s("bd sd hh sd")     // sequence
s("bd*4")            // repeat 4x
s("[bd sd] hh")      // subdivide into equal time
s("<bd sd>")         // alternate each cycle
s("bd ~ hh ~")      // ~ = rest
s("bd(3,8)")         // euclidean rhythm (3 hits in 8 steps)
s("bd?")             // 50% probability
s("bd@3 sd")         // bd takes 3/4, sd takes 1/4
s("bd,hh")           // play simultaneously (comma = stack in mini-notation)
```

## Sound Sources
```js
s("bd sd hh cp")                  // samples (Dirt Samples bank)
s("bd:2")                         // sample variation by index
note("c3 e3 g3").sound("pluck")   // note + instrument
note("c3 e3 g3").s("sawtooth")    // synth oscillator
```

## Synth Oscillators
- `"sine"` — pure tone, sub bass, FM carrier
- `"triangle"` — mellow, pads, muted leads
- `"sawtooth"` — bright, rich harmonics, leads and bass
- `"square"` — hollow, retro, chiptune and stabs
- `"saw2"` — slightly different saw shape
- `"sine2"` — slightly different sine shape

## FM Synthesis
```js
note("c3").s("sine").fm(4)          // FM index (modulation depth)
  .fmh(3)                           // FM harmonicity ratio (modulator freq = carrier × ratio)
  .fmattack(0.01)                   // FM envelope attack
  .fmdecay(0.5)                     // FM envelope decay
  .fmsustain(0.2)                   // FM envelope sustain
  .fmenv(4)                         // FM envelope amount
// Use FM for: bells (fmh:3-7), metallic (fmh:1.4), bass (fmh:1-2), electric piano (fmh:5-7)
```

**FM recipes by sound:**
| Sound | fm | fmh | Notes |
|-------|-----|------|-------|
| Bell | 4-8 | 3, 5, 7 | High harmonicity, long decay |
| Metallic hit | 3-6 | 1.4, 2.7 | Non-integer ratio = inharmonic |
| Electric piano | 2-4 | 5-7 | Moderate FM, fast decay |
| FM bass | 1-3 | 1-2 | Low ratio, short decay |
| Gong/cymbal | 5-10 | 1.1-1.5 | Nearly-integer ratios |

## Noise Sources
```js
s("white")                // white noise — hiss, hi-hats, risers
s("pink")                 // pink noise — warmer, natural
s("brown")                // brown noise — deep rumble
s("crackle")              // crackle texture
note("c3").s("sawtooth").noise(0.3)  // mix noise into oscillator
```

## Wavetable Synthesis
```js
note("c3").sound("wt_piano")    // AKWF wavetable — 1000+ waveforms
note("c3").sound("wt_flute")    // prefix wt_ + name
note("c3").sound("wt_cello")    // great for evolving timbres
```

## ADSR Envelope
```js
.attack(sec)       // attack time
.decay(sec)        // decay time
.sustain(level)    // sustain level (0-1)
.release(sec)      // release time
```

## Effects Chain

### Filters
```js
.lpf(freq)          // low pass filter (Hz)
.hpf(freq)          // high pass filter (Hz)
.bpf(freq)          // band pass filter (Hz)
.resonance(q)       // filter resonance (0-40)
```

### Filter Envelopes
Shape filter cutoff over each note's lifetime:
```js
.lpattack(sec)      // LP envelope attack
.lpdecay(sec)       // LP envelope decay
.lpsustain(level)   // LP envelope sustain
.lprelease(sec)     // LP envelope release
.lpenv(amt)         // LP envelope depth (how much envelope affects cutoff)
// Same pattern for hp: .hpattack(), .hpdecay(), .hpsustain(), .hprelease(), .hpenv()
// Same pattern for bp: .bpattack(), .bpdecay(), .bpsustain(), .bprelease(), .bpenv()
```

### Volume & Dynamics
```js
.gain(vol)          // volume (0-1+)
.compressor("threshold:ratio:knee:attack:release")  // dynamics compression
```

### Space
```js
.room(amt)          // reverb amount (0-1)
.size(amt)          // reverb size (0-1)
.delay(amt)         // delay wet (0-1)
.delaytime(sec)     // delay time in seconds
.delayfeedback(fb)  // delay feedback (0-1)
.pan(pos)           // stereo position (0=left, 1=right)
.orbit(n)           // route to effect bus (for separate reverb/delay per group)
```

### Pitch & Speed
```js
.speed(rate)        // playback speed (affects pitch for samples)
.detune(amt)        // detune in semitones (for oscillators)
```

### Distortion & Lo-fi
```js
.distort(amt)       // distortion (0-1)
.crush(bits)        // bitcrusher (1-16, lower = crunchier)
.coarse(n)          // sample rate reduction (higher = grittier)
```

### Modulation Effects
```js
.vowel(v)           // vowel filter ("a", "e", "i", "o", "u")
.phaser(depth)      // phaser effect
.tremolo(speed)     // tremolo rate
.tremolodepth(amt)  // tremolo depth (0-1)
```

## Pattern Modifiers

### Time & Transformation
```js
.fast(n)            // speed up pattern n times
.slow(n)            // slow down pattern n times
.rev()              // reverse pattern
.every(n, fn)       // apply fn every n cycles
.sometimes(fn)      // apply fn ~50% of the time
.rarely(fn)         // apply fn ~25% of the time
.often(fn)          // apply fn ~75% of the time
.almostAlways(fn)   // apply fn ~90% of the time
.almostNever(fn)    // apply fn ~10% of the time
.sometimesBy(p, fn) // apply fn with probability p (0-1)
.jux(fn)            // apply fn to right channel only
.degrade()          // randomly remove events
.degradeBy(amt)     // remove events with probability amt
.late(sec)          // delay events (swing/humanize)
.early(sec)         // advance events
```

### Advanced Pattern Ops
```js
.iter(n)            // shift pattern by 1 step each cycle, over n cycles
.palindrome()       // play forward then backward
.ply(n)             // multiply each event n times within its time
.off(time, fn)      // layer a transformed copy offset in time
.when(pat, fn)      // apply fn when boolean pattern is true
.mask(pat)          // silence events where pat is silent
.struct(pat)        // impose rhythmic structure from pat
.chunk(n, fn)       // apply fn to one nth of the pattern, cycling through
.chooseCycles(...pats) // randomly pick a pattern each cycle
```

## Probability & Choice
```js
.sometimes(fn)           // ~50%
.often(fn)               // ~75%
.rarely(fn)              // ~25%
.almostAlways(fn)        // ~90%
.almostNever(fn)         // ~10%
.sometimesBy(0.3, fn)    // exactly 30%
.wchoose([a, 0.7], [b, 0.3])  // weighted choice
.chooseCycles(pat1, pat2, pat3) // random pattern per cycle
```

## Sample Operations
```js
.cut(group)         // monophonic cut group — new note cuts previous in same group
.n(index)           // sample index (alternative to :index in mini-notation)
.begin(pos)         // start playback at position (0-1)
.end(pos)           // end playback at position (0-1)
```

## Granular / Slice Operations
```js
.chop(n)            // chop sample into n granules, play in order
.striate(n)         // chop + spread across stereo
.slice(n, pat)      // slice sample into n parts, play by index pattern
.splice(n, pat)     // like slice but adjusts speed to fit
.loopAt(n)          // time-stretch sample to fit n cycles
```

## Continuous Patterns
```js
sine                // sine wave 0-1
cosine              // cosine wave 0-1
saw                 // sawtooth 0-1
tri                 // triangle wave 0-1
square              // square wave 0-1
rand                // random 0-1
irand(n)            // random integer 0 to n-1
perlin              // smooth random (Perlin noise)

// Set range:
sine.range(200, 4000).slow(8)   // linear sweep 200→4000 over 8 cycles
sine.rangex(200, 4000).slow(8)  // exponential sweep (better for frequencies)
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
note("c3 eb3 g3 bb3")               // note names
// Chords — spell out notes manually (DO NOT use .voicings())
note("<[c3,eb3,g3,bb3] [f3,ab3,c4,eb4] [bb2,d3,f3,ab3] [eb3,g3,bb3,d4]>")
```

**WARNING: Do NOT use `.voicings("lefthand")` with chord symbols like `"Cm7"`.** It causes a runtime error and produces silence. Always spell out chord notes manually as `[root,third,fifth,seventh]`.

## Combining Patterns
```js
stack(              // layer patterns simultaneously
  s("bd*4"),
  s("~ cp ~ cp"),
  s("hh*8")
)

cat(                // concatenate patterns sequentially
  s("bd*4"),
  s("hh*8")
)

// Named patterns with $: prefix
$: kick = s("bd*4")
$: snare = s("~ cp ~ cp")
```

## Polymeter
```js
// Different length patterns running simultaneously
stack(
  s("bd sd").fast(3),   // 3 cycles
  s("hh hh hh").fast(4) // 4 cycles — creates shifting polyrhythm
)
```

---

## Sample Bank Reference

### Drum Machines
- **808**: `808bd`, `808sd`, `808cy`, `808oh`, `808hc`, `808mt`, `808ht`, `808lt`, `808lc`, `808mc`
- **909**: `909`
- **Other machines**: `electro1`, `drumtraks`, `linnhats`, `tech`

### Breaks
- `amencutup` — classic Amen break, pre-sliced
- `breaks125`, `breaks152`, `breaks157`, `breaks165` — breakbeats at various BPMs

### Acoustic Drums
- `bd` — kick (10+ variations)
- `sd` — snare
- `hh` — closed hi-hat (13 variants), `ho` — open hi-hat
- `cp` — clap, `rm` — rimshot, `rs` — rimshot alt
- `lt`, `mt`, `ht` — toms (low/mid/high, 16 variants each)
- `cr` — crash cymbal (6 variants), `hc` — closed hi-hat alt
- NOTE: `oh`, `rim`, `ride`, `crash`, `tambourine`, `shaker` are NOT in the default bank. Use `808oh`/`ho` for open hat, `rm` for rimshot, `cr` for crash, `tink` for tambourine-like, `s("hh*16").hpf(8000)` for shaker shimmer.

### Percussion
- `tabla`, `tabla2` — Indian tabla
- `hand` — hand drums (17 variants, use for conga/bongo)
- `can`, `coins`, `metal`, `tink`, `tok` — found sounds/metallic
- `perc` — misc percussion (6 variants), `clak`, `click`, `stomp`

### Bass
- `bass`, `bass0`, `bass1`, `bass2`, `bass3` — various bass samples
- `moog` — Moog bass
- `jvbass` — JV bass
- `jungbass` — jungle bass

### Synths & Keys
- `juno` — Juno synth
- `arpy` — arpeggio synth
- `pluck` — plucked strings
- `pad`, `padlong` — pad sounds
- `casio` — Casio keyboard sounds

### Atmospheric & FX
- `feelfx` — textural effects
- `breath` — breath sounds
- `fire`, `wind`, `birds` — nature
- `space` — space atmospheres
- `noise`, `noise2` — noise textures
- `glitch`, `glitch2` — digital glitch

### Vocals & Special
- `rave` — rave stabs/vocals
- `speech` — speech fragments
- `miniyeah` — vocal hits
- `toys` — toy sounds
- `hoover` — rave hoover
- `industrial` — industrial sounds
- `gabba` — gabba kicks
- `reverbkick` — reverbed kicks
- `cb` — cowbell

### Custom Sample Loading
```js
samples('github:user/repo')  // load community sample packs from GitHub
```

# Groove & Rhythm Reference

Beat anatomy, swing, ghost notes, kick-snare selection, syncopation, and micro-arrangement strategies.

## Table of Contents
- [Beat Anatomy by Genre](#beat-anatomy-by-genre)
- [Swing & Timing](#swing--timing)
- [Ghost Notes & Velocity Layers](#ghost-notes--velocity-layers)
- [Kick & Snare Selection](#kick--snare-selection)
- [Syncopation Strategies](#syncopation-strategies)
- [Micro-Arrangement](#micro-arrangement)

---

## Beat Anatomy by Genre

### House — The Bounce

The offbeat hat IS house music. Four-on-the-floor kick + offbeat open hat = instant bounce.

```js
// Core house groove
s("bd ~ ~ ~ bd ~ ~ ~ bd ~ ~ ~ bd ~ ~ ~")  // 4otf kick
s("~ ~ 808oh ~ ~ ~ 808oh ~ ~ ~ 808oh ~ ~ ~ 808oh ~")  // offbeat open hat = bounce
s("~ ~ ~ ~ cp ~ ~ ~ ~ ~ ~ ~ cp ~ ~ ~")    // clap on 2 and 4
s("hh*8").gain("0.5 0.3 0.5 0.3 0.5 0.3 0.5 0.3") // 8th hats, accented
```

Philosophy: Steady, hypnotic, the groove invites movement. The kick is a metronome. The hat pattern creates the swing.

### Techno — The Hypnosis

Relentless forward motion. Straight 16ths on hats, kick every beat, no swing.

```js
// Core techno groove
s("bd*4")                           // mechanical kick
s("~ cp ~ cp")                      // clap on 2 and 4
s("hh*16").gain(0.4)                // 16th hats, even velocity = hypnotic
s("[~ perc] [perc ~] [~ perc] ~")   // sparse metallic percussion
```

Philosophy: Mathematical precision. Variations come from subtraction (`.degradeBy()`) and texture, not swing. The grid IS the feel.

### DnB — The Dialogue

Kick and snare have a conversation. Kick syncopated, snare on beats 2 and 4, tempo creates urgency.

```js
// Core DnB groove (at 174 BPM)
s("bd ~ ~ ~ ~ ~ bd ~ ~ ~ ~ ~ ~ ~ ~ ~")  // syncopated kick
s("~ ~ ~ ~ sd ~ ~ ~ ~ ~ ~ ~ sd ~ ~ ~")  // snare 2 and 4
s("hh*4").gain(0.45)                       // sparse hats, don't overcrowd
```

Philosophy: The kick-snare interplay drives everything. Bass follows kick rhythmically. Breaks and fills punctuate every 8-16 bars.

### Boom Bap — The Head Nod

Lazy, behind-the-beat feel. Kick on 1 and 3-and, snare slightly late on 2 and 4. Dusty.

```js
// Core boom bap groove (at 90 BPM)
s("bd ~ ~ ~ ~ ~ ~ bd:4 ~ ~ bd ~ ~ ~ ~ ~") // kick with ghost
s("~ ~ ~ ~ sd:1 ~ ~ ~ ~ ~ ~ ~ sd:1 ~ ~ ~") // snare on 2 and 4
  .late(0.025)                                // LATE snare = boom bap feel
s("hh*8").gain("0.5 0.25 0.4 0.25 0.5 0.25 0.4 0.25")
```

Philosophy: Imperfect is the point. Quantization kills the feel. Every hit should feel like a human played it slightly behind.

### Trap — The Drop

Sparse kicks, crispy rolling hats with triplet subdivisions, 808 bass as a melodic instrument.

```js
// Core trap groove (at 140 BPM)
s("bd ~ ~ ~ ~ ~ ~ ~ ~ ~ bd ~ ~ ~ ~ ~")    // sparse kick
s("~ ~ ~ ~ cp ~ ~ ~ ~ ~ ~ ~ cp ~ ~ ~")    // clap 2 and 4
s("hh*4 hh*8 hh*4 hh*16")                   // hat rolls build
  .gain("0.5 0.35 0.5 0.4")
```

Philosophy: The 808 bass IS the kick. Hats tell the rhythmic story. Space between kicks creates anticipation. Triplet hat rolls are the signature.

### Jazz — The Conversation

Ride cymbal leads. Kick and snare "comp" — they comment on the melody, not drive the beat.

```js
// Core jazz groove (at 120 BPM)
s("hh27*4").gain("0.5 0.35 0.5 0.35")       // ride-like cymbal = pulse
s("~ ~ hh ~ ~ ~ hh ~").gain(0.25)           // ghost hats
s("bd ~ ~ ~ ~ bd ~ ~ ~ ~ ~ ~ bd ~ ~ ~")    // kick comps
s("~ ~ ~ ~ ~ ~ sd:1 ~ ~ ~ ~ ~ ~ ~ ~ sd:1") // sparse snare
  .gain(0.5)
```

Philosophy: The drums LISTEN. They respond to what the bass and chords are doing. Less is more. Brushes, not sticks.

### Trance — The Build

Relentless forward momentum. Offbeat bass drives between kicks, energy builds over 32 bars.

```js
// Core trance groove (at 140 BPM)
s("bd*4")                              // 4otf kick, punchy
s("~ [cp sd:3] ~ [cp sd:3]")          // layered clap+snare on 2 and 4
s("hh*16").gain("0.4 0.2 0.3 0.2 0.4 0.2 0.3 0.2 0.4 0.2 0.3 0.2 0.4 0.2 0.3 0.2")  // 16th hats with velocity
note("~ a1 ~ a1 ~ a1 ~ a1").s("sawtooth")  // offbeat bass — between kicks
```

Philosophy: Relentless forward momentum. Energy builds over 16-32 bars through additive layers and filter sweeps. The offbeat bass creates the characteristic trance drive. The trance gate (`.struct("1 0 1 0 1 0 1 0")`) on pads is signature.

### Dubstep — The Drop

Half-time feel at double BPM. Snare on beat 3 only, sparse kicks, heavy bass.

```js
// Core dubstep groove (at 140 BPM, feels like 70)
s("bd ~ ~ ~ ~ bd ~ ~ ~ ~ ~ ~ ~ ~ ~ ~")   // sparse kick, hits 1 and 2.5
s("~ ~ ~ ~ ~ ~ ~ ~ sd:4 ~ ~ ~ ~ ~ ~ ~")  // snare on beat 3 ONLY
s("~ ~ hh ~ ~ ~ hh ~ ~ ~ hh ~ ~ ~ ~ ~")  // minimal hats
```

Philosophy: Contrast between sparse verse and heavy drop. The half-time snare creates weight. Bass design IS the music — wobble, growl, or sub. Space between hits makes each one count.

### UK Garage — The Shuffle

The 2-step kick that skips beats creates the bounce. Shuffled hats with `.late()`, warm bass interlock.

```js
// Core UK garage groove (at 132 BPM)
s("bd ~ ~ ~ ~ bd:1 ~ ~ ~ ~ bd ~ bd ~ ~ ~")  // 2-step: skips beat 2
s("~ ~ ~ ~ cp ~ ~ ~ ~ ~ ~ ~ cp ~ ~ ~")       // clap 2 and 4
s("hh*8").late(0.015)                           // shuffled hats — the garage feel
  .gain("0.5 0.3 0.45 0.25 0.5 0.3 0.45 0.25")
```

Philosophy: The kick-bass interlock creates the "bounce" — what's NOT played matters as much as what is. The shuffle on hats (NOT on everything) is what makes it garage. Ghost snare taps at low velocity add groove without density.

### Synthwave — The Grid

Mechanical precision. Straight 8th or 16th kick, gated snare, robotic.

```js
// Core synthwave groove (at 108 BPM)
s("bd*4")                              // straight kick, mechanical
s("~ sd:3 ~ sd:3").room(0.3).size(0.25).decay(0.08)  // gated snare — 80s signature
s("hh*8").gain("0.35 0.2 0.35 0.2 0.35 0.2 0.35 0.2") // minimal 8th hats
```

Philosophy: Rigid, robotic, the grid IS the aesthetic. No swing, no humanization. The snare's gated reverb (short room, fast decay) is the 80s signature. Interest comes from arpeggiated sequences and pad movement, not drum complexity.

### Breakbeat — The Chop

Broken kick pattern, NOT four-on-the-floor. Syncopated with rock energy, dynamic hats.

```js
// Core breakbeat groove (at 130 BPM)
s("bd ~ ~ bd:3 ~ bd ~ ~ bd ~ ~ ~ bd:3 ~ bd ~")  // broken pattern, unpredictable
s("~ ~ ~ ~ sd:4 ~ ~ ~ ~ ~ ~ ~ sd:4 ~ ~ sd:4")   // punchy snare with extra hit
s("hh*16").gain("0.5 0.2 0.35 0.2 0.5 0.2 0.35 0.2 0.5 0.2 0.35 0.2 0.5 0.2 0.35 0.2")
  .hpf(5000)
```

Philosophy: Energy through unpredictability. The broken kick pattern IS the genre — if the kick is four-on-the-floor, it's not breakbeat. Snare needs room and crack. Use `amencutup` samples and `.chop()` for authentic chopped breaks.

---

## Swing & Timing

Swing is the single biggest differentiator between genres. It's the difference between "correct" and "feels right."

### `.late()` Values by Genre

| Genre | Swing Amount | `.late()` Value | Feel |
|-------|-------------|-----------------|------|
| House | Light | `0.01-0.015` | Gentle bounce, relaxed |
| Deep house | Medium | `0.015-0.02` | Lazy, soulful |
| Boom bap | Heavy | `0.02-0.03` | Behind the beat, head-nod |
| Jazz | Medium-heavy | `0.015-0.025` | Swung, conversational |
| Lo-fi | Medium | `0.015-0.02` | Relaxed, imperfect |
| UK garage | Light | `0.01-0.015` | Skippy, shuffled |
| Techno | None | `0` | Straight, mechanical, precise |
| Trap | None | `0` | Grid-locked, clinical |
| DnB | None | `0` | Tight, urgent |
| Trance | None | `0` | Forward momentum |
| Dubstep | None | `0` | Heavy, precise |
| Synthwave | None | `0` | Mechanical, robotic |
| Breakbeat | Very light | `0.01` | Slight human feel |
| Industrial | None | `0` | Brutal precision |

### Where to Apply Swing

Don't swing everything — that sounds drunk, not groovy:

```js
// Good: swing only on the snare and hats
s("bd*4"),                          // kick: ON the grid
s("~ sd ~ sd").late(0.02),          // snare: behind the beat
s("hh*8").late(0.012),              // hats: slightly behind
note("e1").s("sawtooth")            // bass: ON the grid with kick
```

### Humanization vs Swing

They're different things:
- **Swing** = consistent lateness (`.late(0.02)`) — a deliberate feel
- **Humanization** = random timing variation (`.late(rand.range(0, 0.01))`) — imperfection

Use both for organic genres (jazz, boom bap). Use neither for mechanical genres (techno, trance).

---

## Ghost Notes & Velocity Layers

Ghost notes are quiet hits between main beats. They fill rhythmic space without adding loudness.

### What Ghost Notes Do

- Add **groove** without adding **density**
- Make patterns feel **human** and **played**
- Create **forward motion** between main accents

### Ghost Note Density by Genre

| Genre | Ghost Density | Where |
|-------|--------------|-------|
| Jazz | High | Snare ghosts between ride hits |
| Boom bap | Medium | Kick ghosts, hat velocity variation |
| House | Low-medium | Hat accents, perc fills |
| Funk | High | Snare ghosts everywhere |
| Techno | None-low | Perc layers at low gain instead |
| Trap | Low | Hat velocity ramps |

### Implementation

```js
// Snare with ghost notes
s("~ [sd:3 sd:3] ~ sd:3")       // main hits
  .gain("~ [0.2 0.25] ~ 0.85")  // ghosts quiet, main loud

// Hat velocity pattern (ghost = low gain)
s("hh*16").gain("0.6 0.15 0.3 0.15 0.6 0.15 0.3 0.15 0.6 0.15 0.3 0.15 0.6 0.15 0.3 0.15")
// accent ghost medium ghost — creates groove from dynamics alone

// Kick with ghost
s("bd ~ ~ bd:4 ~ bd ~ ~")       // main + ghost kick
  .gain("1.0 ~ ~ 0.3 ~ 0.9 ~ ~")
```

---

## Kick & Snare Selection

The kick-snare pairing defines the genre more than any other choice.

### Kick Selection

| Genre | Sample | Character | Notes |
|-------|--------|-----------|-------|
| Techno | `bd:3`, `bd:5` | Punchy, mid-focused | Short tail, `.lpf(200)` for sub-only variant |
| House | `bd:1`, `bd:0` | Round, warm | Medium decay, classic 4otf |
| Trap | `808bd` | Deep, long tail | THE trap instrument. Often pitched: `808bd.note("e1")` |
| Boom bap | `bd:0`, `bd:4` | Dusty, thumpy | `.crush(12)` for grit |
| DnB | `bd:5` | Tight, short | Needs to fit between fast snares |
| Jazz | `bd:0` | Soft, natural | Low gain, sparse placement |
| Industrial | `bd:3` + `.distort(0.4)` | Distorted, aggressive | Punch through the mix |

### Snare/Clap Selection

| Genre | Sample | Character | Notes |
|-------|--------|-----------|-------|
| Techno | `cp` | Sharp clap | Dry, punchy, no reverb |
| House | `cp`, `sd:3` | Snappy clap | Light room reverb |
| Trap | `cp:4`, `sd:5` | Crispy | Layered clap, bright |
| Boom bap | `sd:1`, `sd:5` | Thick, cracking | Late timing, medium room |
| DnB | `sd:4` | Tight, bright | Cuts through fast tempo |
| Jazz | `sd:1` | Brushed feel | Quiet, ghost-heavy |

### The Kick-Bass Dialogue

Kick and bass must not fight for the same moment:

```js
// Bad: kick and bass hit at the same time, same freq = mud
s("bd*4"),
note("e1*4").s("sawtooth")

// Good: bass plays BETWEEN kicks
s("bd ~ ~ ~ bd ~ ~ ~ bd ~ ~ ~ bd ~ ~ ~"),
note("~ e1 ~ e1 ~ e1 ~ e1").s("sawtooth")

// Alternative: bass ducks on kick hits (sidechain)
note("e1*4").s("sawtooth").gain(sine.range(0.3, 0.8).fast(4))
```

---

## Syncopation Strategies

### When to Break 4-on-the-Floor

| Genre | Kick Pattern | Why |
|-------|-------------|-----|
| House | Stay 4otf | The steady pulse IS the genre |
| Techno | Mostly 4otf, occasional drops | Tension from absence |
| DnB | Syncopated always | Kick-snare dialogue needs rhythmic interest |
| Boom bap | Syncopated always | Head-nod feel comes from unexpected kicks |
| Trap | Very sparse, syncopated | 808 carries low end; kick is accent only |
| Jazz | Fully free | Kick "comps" — responds to melody |

### Accent Patterns

```js
// 4otf with accent on 1 (standard)
s("bd*4").gain("1.0 0.7 0.8 0.7")

// Offbeat accent (house feel)
s("bd*4").gain("0.8 1.0 0.8 1.0")

// Displaced accent (DnB/breakbeat)
s("bd ~ bd ~ ~ bd ~ ~").gain("1.0 ~ 0.7 ~ ~ 1.0 ~ ~")
```

---

## Micro-Arrangement

Static loops sound like demos. Real tracks evolve. See [arrangement.md](arrangement.md) for the full evolution toolkit, transition recipes, and build/drop patterns.

Key principle: use `.every()` at 2-3 different phrase lengths per track to create the feeling of structure within a loop.

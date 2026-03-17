# Production Craft Reference

How to think like a producer — frequency allocation, gain hierarchy, space, density, palette coherence, and creative constraints.

## Table of Contents
- [Frequency Spectrum Allocation](#frequency-spectrum-allocation)
- [Layer Architecture & Gain Hierarchy](#layer-architecture--gain-hierarchy)
- [Space & Reverb Strategy](#space--reverb-strategy)
- [Density & Complexity Rules](#density--complexity-rules)
- [Sound Palette Coherence](#sound-palette-coherence)
- [Creative Constraints](#creative-constraints)

---

## Frequency Spectrum Allocation

Every element needs its own frequency home. Overlap = mud.

### Frequency Bands

| Band | Range | Role | Typical Instruments |
|------|-------|------|-------------------|
| Sub | 30-80 Hz | Felt, not heard | Sub bass (sine), 808 tails |
| Low | 60-150 Hz | Punch, weight | Kick drum fundamental |
| Low-mid | 150-400 Hz | Body, warmth | Bass harmonics, low synths |
| Mid | 400 Hz-2 kHz | Clarity, presence | Leads, vocals, chords |
| Upper-mid | 2-6 kHz | Definition, bite | Snare crack, synth attack |
| High | 6-12 kHz | Sizzle, shimmer | Hi-hats, cymbal body |
| Air | 12-20 kHz | Sparkle, space | Hat transients, room tone |

### EQ Strategy by Role

```
Kick:     .lpf(200) for sub-only OR full-range with .hpf(30)
Bass:     .hpf(30).lpf(300) for sub bass / .lpf(800) for mid bass
Pads:     .hpf(300).lpf(5000) — stay out of kick and hat territory
Leads:    .hpf(400) — above bass, below hats
Hats:     .hpf(6000) for sizzle / .hpf(3000) for body
Snare:    .hpf(200) — keep the crack, lose the mud
Perc:     .hpf(1000) — metallic upper-register textures
```

### Genre-Specific EQ Focus

- **Techno**: Kick dominates sub (60-100Hz). Bass stays mid (200-600Hz). Everything else carves around.
- **Trap**: 808 owns everything below 200Hz. Kick is mid-punch (80-150Hz). Hats ultra-bright (8kHz+).
- **House**: Kick and bass share low end — bass slightly higher (100-300Hz). Warm mids for chords.
- **Ambient**: No sub competition. Pads spread wide (200Hz-5kHz). Air and space matter most.
- **DnB**: Sub bass (40-80Hz) + snare presence (2-5kHz) are the two anchors. Everything else fits around.
- **Boom bap**: Kick low (60-100Hz), snare mid (200Hz-3kHz), everything filtered `.lpf(3000)` for dusty feel.

### Muddiness Prevention Checklist

1. Only ONE element below 100Hz at a time (kick OR bass, not both sustaining)
2. `.hpf(200)` on everything that isn't kick or bass
3. If it sounds muddy, cut low-mids first (`.hpf(300)` on pads/chords)
4. Reverb on bass = instant mud. Keep bass dry or very short room.
5. More layers ≠ more full. Often removing a layer clears the mix more than EQ.

---

## Layer Architecture & Gain Hierarchy

### Layer Count by Genre

| Category | Layers | Genres | Philosophy |
|----------|--------|--------|------------|
| Minimal | 2-3 | Minimal techno, ambient drone | Every sound matters. Space IS the music. |
| Standard | 4-5 | House, techno, boom bap, lo-fi | Core groove + one melodic element + texture |
| Full | 6-7 | DnB, trance, jazz, trap | Multiple rhythmic + melodic + harmonic layers |
| Dense | 7-8 | Neurofunk, progressive, fusion | Maximum — only if every layer has its own space |

### Gain Hierarchy

The loudest element defines the genre feel. Everything else is relative.

| Role | Gain Range | Notes |
|------|-----------|-------|
| Kick | 0.9-1.2 | Loudest in dance music. Foundation. |
| Snare/Clap | 0.7-1.0 | Second loudest. Drives the backbeat. |
| Bass | 0.6-0.9 | Sub feels loud even at lower gain. Don't over-push. |
| Hi-hats | 0.3-0.6 | Background rhythm. Too loud = fatiguing. |
| Lead/melody | 0.4-0.7 | Should sit "in" the mix, not on top. |
| Chords/pads | 0.2-0.4 | Harmonic bed. Felt, not focused on. |
| Texture/FX | 0.05-0.15 | Barely audible. Adds depth subconsciously. |
| Crackle/noise | 0.02-0.06 | If you notice it, it's too loud. |

### Strudel Gain Stacking

```js
// Good: clear hierarchy
stack(
  s("bd*4").gain(1.0),                    // kick: anchor
  s("~ sd ~ sd").gain(0.85),              // snare: strong
  note("e1 e1 e2 e1").s("sawtooth").gain(0.7), // bass: supporting
  s("hh*8").gain(0.4),                    // hats: background
  note("<[c3,e3,g3]>").s("triangle").gain(0.25), // pad: bed
  s("crackle*4").gain(0.04)              // texture: subliminal
)
```

---

## Space & Reverb Strategy

### When to Use Reverb vs Delay

| Want | Use | Why |
|------|-----|-----|
| Distance/depth | `.room()` + `.size()` | Pushes sound back in the mix |
| Rhythmic echo | `.delay()` + `.delaytime()` | Adds rhythm without smearing |
| Width/spread | `.pan(rand)` or `.jux(rev)` | Stereo interest |
| Atmosphere | Both, but reverb dominant | Creates a "space" to exist in |

### Per-Instrument Reverb Guide

| Element | Room | Size | Why |
|---------|------|------|-----|
| Kick | 0 | — | NEVER reverb the kick. Kills punch and muddies sub. |
| Snare | 0.2-0.5 | 0.3-0.6 | Some space, not washy. Genre-dependent. |
| Bass | 0-0.1 | — | Dry or barely wet. Reverb + bass = mud. |
| Hats | 0.1-0.2 | 0.3 | Tiny bit of room. Don't wash out. |
| Pads | 0.5-0.9 | 0.7-0.95 | Big space. Pads ARE atmosphere. |
| Lead | 0.2-0.4 | 0.4-0.6 | Moderate. Keep definition. |
| FX/texture | 0.6-0.9 | 0.8-0.95 | Wet. These should feel distant. |

### Genre Reverb Philosophy

- **Techno**: Almost entirely dry. Reverb only on incidental percussion. Space comes from delay.
- **House**: Moderate reverb on claps/chords. Kick and bass bone dry.
- **Ambient**: Everything wet. Long tails. Reverb IS the instrument.
- **DnB**: Snare gets some room. Bass and kick dry. Pads medium-wet.
- **Trap**: Very dry overall. 808 completely dry. Occasional delay on melodies.
- **Dub**: Heavy delay (not reverb) on snare and vocals. Spring reverb on percussion.
- **Lo-fi**: Medium room on everything for "recorded in a bedroom" feel. Nothing too big.
- **Jazz**: Natural room sound on everything. Like a small club. `.room(0.3).size(0.4)`.

### Orbit for Effect Buses

Use `.orbit()` to separate effect chains:
```js
// Drums on dry bus, pads on wet bus
s("bd*4").orbit(0),  // orbit 0: no reverb
note("<[c3,e3,g3]>").s("triangle").room(0.8).orbit(1)  // orbit 1: wet
```

---

## Density & Complexity Rules

### The Density Spectrum

```
Sparse ←————————————————————————→ Dense
  |                                  |
  Ambient     House    DnB     Neurofunk
  Minimal     Boom bap  Techno    Trance
  Dub         Lo-fi    Trap      Fusion
```

### Rules of Thumb

1. **If everything is loud, nothing is loud.** One element must dominate.
2. **Complexity budget**: you get ~3 "interesting" elements. The rest should be simple/repetitive.
3. **Rhythmic complexity OR harmonic complexity, rarely both.** DnB = complex rhythm + simple harmony. Jazz = complex harmony + simple rhythm.
4. **`.degradeBy()` is your best friend.** Start dense, thin with probability:
   ```js
   s("hh*16").degradeBy(0.3)  // removes 30% of hits randomly
   ```
5. **Empty beats are musical.** A rest on beat 3 can be more impactful than a hit.
6. **Subtract before adding.** If something feels missing, try removing a layer first.

### When to Add vs Remove

| Symptom | Fix |
|---------|-----|
| "Sounds thin" | Check gain hierarchy before adding layers. Often a gain boost fixes it. |
| "Sounds muddy" | Remove a mid-range layer OR `.hpf()` on pads/chords. |
| "Sounds boring" | Add ONE moving element (filter sweep, `.every()` variation). |
| "Sounds chaotic" | Remove the newest layer. Simplify drum pattern. |
| "Needs more energy" | Increase hat density OR add percussion, not more bass. |

---

## Sound Palette Coherence

### Why Palette Matters

A track should sound like it comes from one world. Mixing acoustic jazz samples with harsh digital synthesis creates cognitive dissonance (unless that's the point — vaporwave, etc).

### Palette Families

| Family | Oscillators | Samples | Effects | Genres |
|--------|------------|---------|---------|--------|
| Synthetic/Clean | sine, triangle, square | 909, 808 | minimal FX | Techno, house, trance |
| Synthetic/Harsh | sawtooth, square | 909, noise | `.distort()`, `.crush()` | Industrial, neurofunk |
| Organic/Warm | triangle, sine | acoustic bd/sd, piano | `.room()`, tape delay | Jazz, lo-fi, boom bap |
| Organic/Raw | sawtooth | breakbeats, vinyl | `.crush()`, `.lpf()` | Jungle, phonk, trip-hop |
| Ethereal | sine, triangle | pad samples | heavy reverb/delay | Ambient, dream pop |
| Hybrid | mix allowed | mix allowed | genre-dependent | IDM, experimental |

### Sample Selection by Genre

| Genre | Kick | Snare | Hats | Why |
|-------|------|-------|------|-----|
| Techno | `bd:3` or `bd:5` | `cp` | `hh` | Clean, punchy, synthetic |
| House | `bd:1` | `cp`, `sd:3` | `hh`, `oh` | Warm, classic |
| Trap | `808bd` | `cp:4` | `hh*16` (varied `.gain()`) | Deep 808, crispy hats |
| Boom bap | `bd:0`, `bd:4` | `sd:1`, `sd:5` | `hh` | Dusty, punchy |
| DnB | `bd:5` | `sd:4` | `hh*4` | Tight, fast |
| Jazz | `bd:0` | `sd:1` (brushes feel) | `ride` or `hh` | Natural, room sound |
| Ambient | rarely used | rarely used | rarely used | Texture over rhythm |

---

## Creative Constraints

### Silence as a Tool

The most powerful sound in music is silence. Use it intentionally:

```js
// Rest on beat 3 — creates tension
s("bd ~ ~ sd")  // not bd hh bd sd

// Dropout every 4 bars
s("bd*4").every(4, x => x.mask("1 1 0 1"))

// Sparse kick = more impact per hit
s("bd ~ ~ ~ bd ~ ~ ~")  // vs bd*8
```

### What NOT to Play

- Don't fill every beat. Leave rhythmic holes.
- Don't layer sounds in the same frequency range "for fullness" — it's just mud.
- Don't add reverb to make something "better" — dry is a valid choice.
- Don't add a melody just because there isn't one. Techno thrives without melody.
- Don't play every chord in a progression — imply harmony with bass + one note.

### Restraint by Genre

| Genre | Restraint Philosophy |
|-------|---------------------|
| Techno | The groove IS the music. Don't add melody unless asked. |
| Ambient | Let sounds breathe. Long notes, lots of space. |
| Minimal | If you can remove it and the track still works, remove it. |
| Boom bap | The loop IS the song. Don't over-arrange. |
| Dub | Space between hits is where the echo lives. |

### The "One Change" Rule

When iterating, change ONE thing at a time. If the user says "darker":
1. Try lowering the filter first
2. If that's not enough, THEN change the scale
3. If still not enough, THEN add more reverb

Don't do all three at once — you'll overshoot and lose what was working.

---

## Creative Decisions

### The Signature Element

Every track needs ONE unexpected thing — the element that makes it *this* track, not *a* track. Add it AFTER the core groove works.

Sources of signature:
- **Unusual sample**: a `chin` or `metal` hit where you'd expect `perc`
- **Unexpected rhythm**: a euclidean pattern in an otherwise straight genre
- **Distinctive processing**: heavy `.chop()` on one element, extreme `.resonance()`, `.jux(rev)` on hats
- **Rule-breaking note**: one chromatic note in a diatonic melody, one chord outside the key

The signature element should be subtle enough that removing it makes the track feel generic, but not so loud that it dominates.

### When to Break Rules

Breaking rules works when you break ONE and honor all others:
- Swing in techno → works if everything else screams techno (straight hats, 4otf, dark)
- Melody in minimal → works if it's one sparse line over a stripped groove
- 808 in house → works if the groove is still four-on-the-floor with offbeat hats

Breaking two rules at once usually means you've changed genre.

### Interest Through Contrast

The ear notices CHANGE, not state. Use `.every()` to create contrast:
- Quiet makes loud louder — drop gain before a build
- Dry makes wet wetter — strip reverb before a wash
- Simple makes complex impressive — sparse verse, dense chorus
- Absence makes presence felt — remove the kick for 2 bars, its return hits harder

```js
// Contrast: filter closes then opens dramatically
note("e1").s("sawtooth")
  .lpf(sine.range(300, 800).slow(4))  // baseline movement
  .every(8, x => x.lpf(sine.rangex(200, 6000).slow(2)))  // dramatic sweep every 8
```

### The "Remove One Layer" Test

Before finalizing, mute each layer one at a time. Ask: "does the track feel different without this?" If removing a layer doesn't change the feel, cut it. Every layer must earn its place.

Signs a layer should go:
- You can't hear it clearly in the mix
- It duplicates the frequency range of another layer
- It was added "for fullness" rather than for a specific musical reason
- The track feels cleaner without it

# Music Theory Reference

Scales, chords, progressions, and equipment reference for music production.

## Table of Contents
- [Scales by Mood](#scales-by-mood)
- [Common Keys by Genre](#common-keys-by-genre)
- [Chord Construction](#chord-construction)
- [Chord Progressions by Genre](#chord-progressions-by-genre)
- [Equipment Reference](#equipment-reference)

---

## Scales by Mood

| Mood | Scales |
|------|--------|
| Happy/Bright | major, lydian, pentatonic |
| Sad/Dark | minor, aeolian, phrygian |
| Jazzy | dorian, mixolydian, bebop |
| Dreamy | lydian, wholeTone |
| Tense | phrygian, locrian, harmonicMinor |
| Exotic | hungarianMinor, japanese |
| Bluesy | blues, minorPentatonic, mixolydian |

## Common Keys by Genre

- **Techno/House**: Am, Cm, Dm, Fm
- **Lo-fi**: Eb, Db, Gb, Ab (flat keys feel warm)
- **Jazz**: Bb, Eb, F, Ab (horn-friendly)
- **DnB**: Em, Am, Dm (dark minor)
- **Trap**: Fm, Cm, Bbm (dark, cinematic)
- **Synthwave**: Am, Em, Cm (80s minor keys)
- **Trance**: Am, Cm, Dm (euphoric minor keys, some major for uplifting)

## Chord Construction

| Type | Formula | Example |
|------|---------|---------|
| Major | 1 3 5 | C E G |
| Minor | 1 b3 5 | C Eb G |
| 7th | 1 3 5 b7 | C E G Bb |
| Maj7 | 1 3 5 7 | C E G B |
| Min7 | 1 b3 5 b7 | C Eb G Bb |
| Sus2 | 1 2 5 | C D G |
| Sus4 | 1 4 5 | C F G |
| Dim | 1 b3 b5 | C Eb Gb |
| Aug | 1 3 #5 | C E G# |
| 9th | 1 3 5 b7 9 | C E G Bb D |
| Add9 | 1 3 5 9 | C E G D |

## Chord Progressions by Genre

### Pop/Rock
- I-V-vi-IV (C G Am F)
- vi-IV-I-V (Am F C G)

### Jazz
- ii-V-I (Dm7 G7 Cmaj7)
- I-vi-ii-V turnaround (Cmaj7 Am7 Dm7 G7)
- iii-vi-ii-V (Em7 Am7 Dm7 G7)

### Lo-fi Hip Hop
- ii7-V7-Imaj7 (Dm7 G7 Cmaj7)
- Imaj7-vi7-ii7-V7 (Cmaj7 Am7 Dm7 G7)
- im7-iv7-VII7-IIImaj7 (Cm7 Fm7 Bb7 Ebmaj7)

### House
- im-iv-VII-III (Am Dm G C)
- im-VI-VII-III (Am F G C)

### Techno
- Single chord drones or two-chord oscillation
- im-bVII (Am G) or im-iv (Am Dm)

### Ambient
- Open voicings, sus chords, free modal movement
- Imaj7-IVmaj7, Isus2-Vsus4

### Trap
- im-bVI-bVII (Fm Db Eb)
- im-iv-bVI-bVII (Fm Bbm Db Eb)

### Synthwave
- im-bVII-bVI-bVII (Am G F G)
- im-iv-bVI-bVII (Am Dm F G)

### Trance
- im-bVII-bVI-V (Am G F E) — classic uplifting progression
- im-iv-bVI-bVII (Am Dm F G)

---

## Equipment Reference

Common hardware references producers make, and what they mean sonically:

| Equipment | What It Is | Sonic Character |
|-----------|-----------|-----------------|
| **TR-808** | Roland drum machine | Deep kick, snappy snare, metallic hats, cowbell |
| **TR-909** | Roland drum machine | Punchier kick, open hats, classic house/techno |
| **TB-303** | Roland bass synth | Squelchy acid bass, resonant filter sweeps |
| **Juno-106** | Roland polysynth | Warm pads, chorus, creamy leads |
| **Minimoog** | Moog bass synth | Fat bass, rich harmonics, warm |
| **DX7** | Yamaha FM synth | Bell-like tones, electric piano, metallic |
| **SP-1200** | E-mu sampler | Gritty 12-bit sampling, crunchy drums |
| **MPC** | Akai sampler | Punchy, tight drums, boom bap staple |
| **SH-101** | Roland monosynth | Acid bass, simple leads, sequences |
| **Prophet-5** | Sequential synth | Rich pads, strings, poly sounds |

---

## Tension & Release

### Harmonic Motion Framework

| Motion | Chords | Feel | Use When |
|--------|--------|------|----------|
| V → I | G → C | Resolution, arrival | Endings, drops, moments of relief |
| ii → V | Dm → G | Buildup, expectation | Pre-chorus, pre-drop, approaching resolution |
| iv → I | Fm → C | Plagal, gentle close | Softer endings, "amen" cadence |
| I → I (drone) | C → C | Meditative, static | Ambient, minimal techno, drone |
| bVI → bVII → I | Ab → Bb → C | Epic, cinematic lift | Trance lifts, film score moments |
| i → bVII | Am → G | Unresolved, floating | Dark techno, trip-hop — tension without release |
| i → i (minor drone) | Am → Am | Dark, hypnotic | Techno, industrial — the groove IS the progression |

### Harmonic Motion by Genre

- **Techno**: Static. 1-2 chords max, often just a drone. Harmonic interest comes from filter movement, not chord changes.
- **House**: Moderate. 4-chord loops cycling every 4 bars. Changes feel like breathing.
- **Jazz**: Rapid. Chord changes every 1-2 beats. Harmony IS the music.
- **Ambient**: Glacial. Chords change every 4-8 bars or not at all. Sustained tension.
- **Trap**: Minimal. Dark minor loops, often 2-3 chords. Unresolved = menacing.
- **DnB**: Moderate. 2-4 chord loops. Bass follows root movement.
- **Trance**: Structured. Clear tension-release arcs over 16-32 bars. V → I at the drop.

### Voicing Strategy

| Voicing | Interval Spread | Character | Best For |
|---------|----------------|-----------|----------|
| Close | Notes within one octave | Modern, punchy, dense | House chords, stabs, trap |
| Open | Notes spread across 2+ octaves | Spacious, warm, cinematic | Ambient pads, film, trance |
| Rootless | Omit the root (bass plays it) | Jazzy, airy, sophisticated | Jazz, lo-fi, neo-soul |
| Shell | Root + 3rd + 7th only | Clean, sparse, clear | Minimal, house, jazz comping |

```js
// Close voicing: all notes in one octave
note("<[c3,e3,g3,b3]>")

// Open voicing: spread across octaves
note("<[c2,g3,e4,b4]>")

// Rootless: bass handles the root
note("c2").s("sine"),                    // bass plays root
note("<[e3,g3,b3,d4]>").s("triangle")   // chord omits C

// Shell voicing: root + 3rd + 7th
note("<[c3,e3,b3]>").s("triangle")
```

# Genre Reference

Sub-styles, BPM ranges, and characteristics for all supported genres.

## Table of Contents
- [House](#house)
- [Techno](#techno)
- [DnB](#dnb)
- [Hip Hop](#hip-hop)
- [Jazz](#jazz)
- [Additional Genres](#additional-genres)
- [Genre Identity](#genre-identity)

---

## House
- **Deep house** (120-124 BPM): Soulful, jazzy chords, warm pads, subtle bass. More `.room()`, dorian/mixolydian.
- **Tech house** (124-128 BPM): Minimal + groovy, percussive loops, crisp hats, rolling bass. Less harmony, more rhythm.
- **Progressive house** (126-132 BPM): Building layers, long filter sweeps, evolving arps. Use `.slow()` modulation.
- **Acid house** (124-130 BPM): 303 bass lines, squelchy filter, raw energy. See acid template.

## Techno

- **Berlin techno** (128-136 BPM): Raw, dark, industrial. Distorted kicks, sparse, `.crush()`, phrygian.
- **Detroit techno** (125-135 BPM): Futuristic, soulful. Lush pads, strings, more melodic. Major/dorian.
- **Minimal techno** (125-132 BPM): Very few elements, micro-variations, subtle. 2-3 layers max, lots of `.degradeBy()`.
- **Industrial techno** (130-145 BPM): Harsh, noisy. `.distort()`, `.crush()`, noise layers, metallic percussion.

### Techno Subgenre Sonic Palettes

| Subgenre | Kick | Bass | Texture | Effects | Scale |
|----------|------|------|---------|---------|-------|
| **Dark techno** | Punchy `bd:3`, mid-gain | Filtered saw `.lpf(400)` | Industrial perc, metallic hits | Dry, minimal reverb | Phrygian, harmonic minor |
| **Deep techno** | Soft `bd:1`, round | Sine sub, minimal harmonics | Lush pad washes, warm | `.room(0.4)`, long delay | Minor, dorian |
| **Hard techno** | `bd:5` + `.distort(0.3)` | Distorted saw, aggressive | Noise bursts, `white` hits | `.crush()`, `.distort()` | Chromatic, phrygian |
| **Dub techno** | Muted `bd:0` | Sine sub, simple | Chord stabs with heavy delay | `.delay(0.7).delayfeedback(0.6)` | Minor, suspended |
| **Acid techno** | Hard `bd:3` | 303 saw + resonant filter | Filter sweeps ARE the texture | `.resonance(25)`, `.lpf(sine)` | Minor, pentatonic |

## DnB
- **Liquid DnB** (172-176 BPM): Smooth, melodic, soulful. Jazz chords, warm pads, rolling bass. Dorian/major.
- **Neurofunk** (174-178 BPM): Clinical, glitchy bass design. Complex Reese bass, sparse, dark. `.chop()`, `.striate()`.
- **Jungle** (160-170 BPM): Amen breaks, ragga influences, chopped breaks. Use `amencutup` samples.
- **Jump-up** (172-176 BPM): Punchy, simple, dancefloor. Strong snares, wobbly bass.

## Hip Hop
- **Boom bap** (85-95 BPM): Classic kicks/snares, vinyl crackle, jazz samples. `.crush(12)`, piano chords.
- **Trap** (130-170 BPM): 808 bass, rolling hi-hat patterns (`hh*16` with accents), dark minor keys.
- **Drill** (138-145 BPM): Dark, sliding 808s, minor keys, sparse melodies. `.speed()` slides on bass.
- **Phonk** (130-140 BPM): Memphis-style, chopped vocals, cowbells, lo-fi. Heavy `.crush()`, `cb` samples.

### Hip Hop Sonic Palettes

| Subgenre | Kick/808 | Snare | Hats | Texture | Vibe |
|----------|----------|-------|------|---------|------|
| **Boom bap** | `bd:0` dusty, short | `sd:1` late, cracking | `hh*8` lo-fi velocity | Vinyl crackle, piano | Jazz chords, `.crush(12)` |
| **Trap** | `808bd` long tail, pitched | `cp:4` crispy, layered | `hh*16` rolling, triplet fills | Dark pads, sparse bells | 808 IS the bass. Hats tell the story. |
| **Drill** | `808bd` + `.speed()` slides | `cp` dry, sharp | `hh*8` tight | Eerie piano, minor melody | Sliding 808, menacing, UK or Chicago |
| **Lo-fi** | `bd:4` soft, muted | `sd:3` brushed feel | `hh` sparse | Crackle, tape hiss, piano | `.crush(10).lpf(3000)`, warm imperfection |

## Jazz
- **Bebop** (180-280 BPM): Fast chord changes, complex lines, ii-V-I. Walking bass, ride cymbal.
- **Modal** (100-140 BPM): One scale for extended periods, open improvisation. Dorian/mixolydian.
- **Smooth jazz** (90-120 BPM): Accessible, polished. Electric piano, gentle bass, brushed drums.
- **Fusion** (100-160 BPM): Rock/funk elements, odd meters, distorted keys.

## Additional Genres
- **Synthwave / Retrowave** (80-118 BPM): 80s nostalgia, arpeggiated synths, gated reverb, saw pads. Am/Em, minor keys.
- **Vaporwave** (60-90 BPM): Slowed/pitched samples, heavy reverb, chopped. `.slow(2)`, `.crush(10)`, `.room(0.9)`.
- **IDM / Glitch** (100-160 BPM): Complex rhythms, experimental. Euclidean, `.jux()`, `.iter()`, probability.
- **Downtempo / Trip-hop** (70-100 BPM): Chill, moody, cinematic. Trip-hop = vinyl drums + deep bass + pads.
- **UK Garage / 2-step** (130-140 BPM): Shuffled beats, skippy hats, pitched vocals, warm bass. Swing with `.late()`.
- **Trance** (128-150 BPM): Uplifting arps, long buildups, euphoric. Major keys, supersaw pads, `.off()` for arps.
- **Dubstep** (138-142 BPM, half-time feel): Heavy bass drops, wobble bass = `.lpf(sine.range(200,2000).fast(4))`.

---

## Genre Identity

Non-negotiable rules that define each genre. If these aren't met, it's not that genre.

### House
- **Must have**: 4-on-the-floor kick, offbeat open hat or hi-hat
- **Must NOT**: Syncopated kick pattern, no swing at all, blast beats
- **The test**: Could you dance to this at a beach bar? If yes, it's house.

### Techno
- **Must have**: 4-on-the-floor kick, 16th hi-hats or equivalent, relentless forward motion
- **Must NOT**: Swing/shuffle, major-key chords, jazzy harmony, acoustic samples
- **The test**: Could this play for 6 hours in a dark room? If yes, it's techno.

### DnB
- **Must have**: Syncopated kick-snare dialogue, 170-180 BPM, snare on beats 2 and 4
- **Must NOT**: 4-on-the-floor kick, tempo below 165, swing
- **The test**: Does the kick-snare pattern create urgency and forward drive? If yes, it's DnB.

### Trap
- **Must have**: Sparse kick, rolling hi-hat patterns with triplet fills, 808 bass as melodic instrument
- **Must NOT**: 4-on-the-floor kick, offbeat open hats (that's house), acoustic drum sounds
- **The test**: Is the 808 doing the work of both kick AND bass? If yes, it's trap.

### Lo-fi Hip Hop
- **Must have**: Behind-the-beat snare (`.late()`), dusty texture (`.crush()` or noise layer), jazzy chords
- **Must NOT**: Clean/pristine sound, 4-on-the-floor, aggressive bass, high energy
- **The test**: Could you study to this? If yes, it's lo-fi.

### Jazz
- **Must have**: Ride cymbal as pulse, sparse comping drums, chord extensions (7ths, 9ths), walking or modal bass
- **Must NOT**: 4-on-the-floor kick, straight 16th hats, electronic percussion, heavy compression
- **The test**: Do the drums *listen* to the harmony? If yes, it's jazz.

### Acid
- **Must have**: Resonant filter sweep (`.resonance(20+)`), saw or square bass with moving `.lpf()`, 4-on-the-floor
- **Must NOT**: Static filter, clean bass without resonance, no filter movement
- **The test**: Is the filter THE instrument? If yes, it's acid.

### Ambient
- **Must have**: Long reverb tails (`.room(0.8+)`), slow evolution (`.slow(4+)`), space between elements
- **Must NOT**: Steady kick pattern, driving rhythm, dense percussion, short/dry sounds
- **The test**: Does it create a space you could exist inside? If yes, it's ambient.

### Dub
- **Must have**: One-drop kick pattern, heavy delay on snare/perc (`.delay(0.5+)`), deep sub bass, space
- **Must NOT**: 4-on-the-floor kick, dry snare, busy hi-hats, bright/clean aesthetic
- **The test**: Can you hear the echo of the space between hits? If yes, it's dub.

### Generative/Experimental
- **Must have**: Probability (`.degradeBy()`, `.sometimes()`), evolving parameters, surprise
- **Must NOT**: Entirely static loops, predictable structure, conventional genre adherence
- **The test**: Does it sound different each time it cycles? If yes, it's generative.

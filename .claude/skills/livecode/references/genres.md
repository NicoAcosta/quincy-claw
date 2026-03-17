# Genre Reference

Sub-styles, BPM ranges, and characteristics for all supported genres.

## Table of Contents
- [House](#house)
- [Techno](#techno)
- [DnB](#dnb)
- [Hip Hop](#hip-hop)
- [Jazz](#jazz)
- [Trance](#trance)
- [Dubstep / Bass Music](#dubstep--bass-music)
- [UK Garage / 2-step](#uk-garage--2-step)
- [Synthwave / Retrowave](#synthwave--retrowave)
- [Breakbeat](#breakbeat)
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

## Trance

- **Uplifting trance** (138-142 BPM): Euphoric builds, supersaw pads, major-key lifts (bVI-bVII-I). Long breakdowns into massive drops.
- **Progressive trance** (128-134 BPM): Subtler builds, deeper grooves, less euphoric peaks. Rolling basslines, layered arps, gradual filter sweeps.
- **Psytrance** (140-150 BPM): Driving 16th bass, squelchy acid-like leads, triplet patterns, dark/twisted energy. `.fast()` patterns, resonant sweeps.
- **Vocal trance** (136-142 BPM): Pad-heavy, emotional, built around vocal phrases. Open voicings, major/minor contrast.

### Trance Sonic Palettes

| Subgenre | Kick | Bass | Pads/Leads | Effects | Scale |
|----------|------|------|-----------|---------|-------|
| **Uplifting** | Punchy `bd`, mid-tight | Offbeat saw, `.lpf(500)` | Supersaw pad, arpeggiated lead | `.room(0.6)`, delay on lead | Minor → major lift |
| **Progressive** | Soft `bd:1`, round | Rolling saw, gentle filter | Layered triangle pads | Long `.delay()`, moderate room | Minor, dorian |
| **Psytrance** | Hard `bd:3`, short | 16th saw, acid filter | Squelchy leads, `.resonance(20+)` | Dry, minimal reverb | Phrygian, harmonic minor |
| **Vocal** | Standard `bd`, clean | Simple offbeat | Wide supersaw, open voicings | Wet reverb, long tails | Minor, aeolian |

Key characteristics:
- Euphoric builds: energy arcs over 16-32 bars using additive layers + filter sweeps
- Arp layering: spell out ascending/descending note sequences with `.delay()` for thickness
- `.slow()` modulation: pad filters should move over 16+ bars for trance-scale evolution
- Offbeat bass: bass hits BETWEEN kicks, not with them — creates forward drive
- Gated pads: `.struct("1 0 1 0 1 0 1 0")` on pads for the classic trance gate effect

## Dubstep / Bass Music

- **Classic dubstep** (138-142 BPM, half-time): Deep sub bass, sparse drums, emphasis on space and weight. Snare on beat 3 only.
- **Brostep** (140-150 BPM): Aggressive wobble bass, complex LFO shapes, heavy drops. More distortion, more energy.
- **Riddim** (140-150 BPM): Minimal, repetitive wobble patterns. Simple bass design looped with precision. Less is more.
- **Future bass** (140-160 BPM): Bright supersaw chords, sidechained, uplifting. Chord-driven rather than bass-driven.

### Dubstep Sonic Palettes

| Subgenre | Kick | Snare | Bass | Effects | Scale |
|----------|------|-------|------|---------|-------|
| **Classic** | `bd` deep, sparse | `sd:4` on beat 3 only | Sine sub + wobble saw | `.room(0.4)`, dark | Minor, phrygian |
| **Brostep** | `bd:3` punchy | `sd:5` aggressive | Distorted saw wobble | `.distort()`, `.crush()` | Phrygian, chromatic |
| **Riddim** | `bd` clean | `sd:4` tight | Simple saw wobble, looped | Dry, minimal FX | Minor, pentatonic |
| **Future bass** | `bd:1` soft | `cp` light | Supersaw chords, sidechained | Heavy reverb, bright | Major, lydian |

Key characteristics:
- Half-time feel: at 140 BPM, snare on beat 3 creates a 70 BPM groove feel
- Wobble bass recipe: `.lpf(sine.range(200,2000).fast(4))` — change `.fast()` speed for different wobble rates
- Sparse arrangement: verse sections are VERY minimal, drops are heavy — contrast is everything
- Sub layer: always pair wobble saw with a clean sine sub for weight

## UK Garage / 2-step

- **Classic 2-step** (128-135 BPM): The signature syncopated kick, shuffled hats, warm rolling bass, soulful chords. The bounce comes from what's NOT played.
- **Speed garage** (130-140 BPM): Darker, heavier, more bass-driven. Thick rolling basslines, less chord work, more warehouse energy.
- **Bassline** (135-142 BPM): Evolved from speed garage. Prominent wobbling bassline, bigger drops, more aggressive.

### UK Garage Sonic Palettes

| Subgenre | Kick | Hats | Bass | Chords | Feel |
|----------|------|------|------|--------|------|
| **2-step** | Syncopated, skips beat 2 | Shuffled with `.late(0.015)` | Warm saw, rolling | Min7/Maj7 stabs, soulful | Skippy, bouncy |
| **Speed garage** | Heavier, more 4otf | Tight, less shuffle | Thick saw, rolling hard | Minimal, darker | Dark, driving |
| **Bassline** | Punchy, syncopated | Rolling 16ths | Wobble saw, prominent | Sparse stabs | Heavy, aggressive |

Key characteristics:
- The 2-step kick: skips beat 2, hits on 1, 2.5, 3.5 — `s("bd ~ ~ ~ ~ bd:1 ~ ~ ~ ~ bd ~ bd ~ ~ ~")`
- `.late(0.015)` on hats for the garage shuffle — NOT swing on everything, just hats and ghost snares
- Warm bass with glide: saw bass with `.lpf(700)`, notes that slide between each other
- Soulful chords: min7 and maj7 stabs with `.room(0.4)` — the chords breathe

## Synthwave / Retrowave

- **Outrun** (100-118 BPM): Fast, driving, neon-lit highway aesthetic. Arpeggiated sequences, punchy drums, cinematic energy.
- **Darksynth** (100-130 BPM): Aggressive, horror-influenced. Distorted leads, heavy bass, industrial edge. More `.distort()`, phrygian.
- **Dreamwave** (80-100 BPM): Slower, ethereal, nostalgic. Lush pads, gentle arps, more reverb. Warm and dreamy.

### Synthwave Sonic Palettes

| Subgenre | Kick | Snare | Synths | Bass | Feel |
|----------|------|-------|--------|------|------|
| **Outrun** | `bd` straight | `sd:3` gated room | Arpeggiated square/saw | Square, punchy | Driving, neon |
| **Darksynth** | `bd:3` heavy | `sd:4` + `.distort()` | Distorted saw leads | Saw, aggressive | Dark, cinematic |
| **Dreamwave** | `bd:1` soft | `sd:1` gentle | Lush triangle pads | Sine, warm | Ethereal, warm |

Key characteristics:
- Arpeggiated sequences: spell out the arp notes explicitly `note("a3 c4 e4 a4 e4 c4 a3 e3")` with delay for thickness
- Square-wave bass: `.sound("square").lpf(400)` — the retro bass sound
- Gated reverb snare: `.room(0.3).size(0.25).decay(0.08)` — short burst, 80s signature
- Minor keys: Am, Em, Dm — almost always minor. The 80s power progression: i-bVI-bIII-bVII (Am F C G)
- Mechanical precision: straight timing, no swing. The grid IS the aesthetic.

## Breakbeat

- **Big beat** (110-140 BPM): Rock-influenced, heavy drums, distorted bass, arena energy. Think Chemical Brothers, Prodigy.
- **Breaks** (120-140 BPM): Chopped breakbeats, DJ-oriented, funky energy. Less rock, more dance.
- **Nu-skool breaks** (130-140 BPM): Modernized breaks, tighter production, sometimes darker. Bass music influence.

### Breakbeat Sonic Palettes

| Subgenre | Kick | Snare | Bass | Energy | Feel |
|----------|------|-------|------|--------|------|
| **Big beat** | `bd` + `bd:3` alternating | `sd:4` punchy, room | Distorted saw | High, driving | Rock meets electronic |
| **Breaks** | Broken pattern, syncopated | `sd` with snap | Rolling saw | Medium-high | Funky, DJ-friendly |
| **Nu-skool** | Tight, syncopated | `sd:4` tight | Sub + mid saw | Medium | Dark, modern |

Key characteristics:
- Broken kick: NOT four-on-the-floor — syncopated, unpredictable kick patterns define the genre
- Use `amencutup` samples and `.chop()`, `.slice()` for authentic chopped break sounds
- Punchy snare with room: `.room(0.35).size(0.4)` — the snare needs space and crack
- Distorted bass: `.distort(0.15)` on sawtooth for aggressive mid-range energy
- Rock energy through electronic means: the drums tell the story

## Additional Genres
- **Vaporwave** (60-90 BPM): Slowed/pitched samples, heavy reverb, chopped. `.slow(2)`, `.crush(10)`, `.room(0.9)`.
- **IDM / Glitch** (100-160 BPM): Complex rhythms, experimental. Euclidean, `.jux()`, `.iter()`, probability.
- **Downtempo / Trip-hop** (70-100 BPM): Chill, moody, cinematic. Trip-hop = vinyl drums + deep bass + pads.

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

### Trance
- **Must have**: Building arps/pads, tension-release energy arc, offbeat bass, forward momentum
- **Must NOT**: Static energy, dark industrial aesthetic, sparse arrangement throughout
- **The test**: Does the energy build toward something euphoric? If yes, it's trance.

### Dubstep
- **Must have**: Half-time drum feel (snare on 3), prominent bass design (wobble/sub), contrast between sparse and heavy
- **Must NOT**: Four-on-the-floor kick, constant energy, bright/uplifting aesthetic
- **The test**: Does the bass hit you in the chest while the drums feel half-speed? If yes, it's dubstep.

### UK Garage
- **Must have**: Syncopated kick that skips beats, shuffled hats (`.late()`), warm rolling bass, soulful chords
- **Must NOT**: Four-on-the-floor kick, straight timing on hats, aggressive bass design
- **The test**: Does the kick pattern make you want to skank? If yes, it's garage.

### Synthwave
- **Must have**: Arpeggiated synth sequence, retro oscillators (square/saw), mechanical precision, minor keys
- **Must NOT**: Modern production tricks, acoustic sounds, swing/shuffle, organic feel
- **The test**: Does it sound like driving through a neon-lit city in 1985? If yes, it's synthwave.

### Breakbeat
- **Must have**: Broken beat pattern (NOT 4otf), punchy energy, syncopated kick, rock-influenced drive
- **Must NOT**: Straight four-on-the-floor kick, minimal aesthetic, sparse arrangement
- **The test**: Is the kick pattern unpredictable and driving? If yes, it's breakbeat.

### Generative/Experimental
- **Must have**: Probability (`.degradeBy()`, `.sometimes()`), evolving parameters, surprise
- **Must NOT**: Entirely static loops, predictable structure, conventional genre adherence
- **The test**: Does it sound different each time it cycles? If yes, it's generative.

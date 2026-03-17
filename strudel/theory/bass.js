// Bass Line Reference for Strudel

// === Walking Bass (Jazz) ===
// Scale-tone movement with chromatic approach notes
// note("c2 d2 eb2 f2  g2 f2 eb2 d2  c2 bb1 a1 ab1  g1 a1 b1 c2")
// Approach: target chord tone on beat 1, walk scale to next chord tone
// Use .sound("triangle").lpf(800) for upright bass tone

// === Sub Bass (DnB / Trap / Dubstep) ===
// Root-octave focus, simple, powerful
// note("e1 ~ ~ e1 ~ e1 [~ e1] ~").sound("sine").lpf(150)
// 808-style: note("f1 ~ ~ ~ ~ ~ [f1 ab1] ~").sound("sine").decay(0.8).distort(0.2)
// Slides: use adjacent notes for portamento feel

// === Acid Bass (303) ===
// 16th note patterns with accent and filter
// note("a1 a1 [a1 c2] a1 e2 a1 [g1 a1] a1")
//   .sound("sawtooth").lpf(sine.range(200, 4000).slow(4)).resonance(25)
// Key: high resonance + sweeping filter = acid sound

// === Funk / House Bass ===
// Syncopated, rhythmic, octave jumps
// note("a1 ~ [a1 c2] ~ a1 ~ [e2 a1] ~")
//   .sound("sawtooth").lpf(600).decay(0.2)
// Use rests and offbeats for groove

// === Dub Bass ===
// Deep, round, sparse, heavy
// note("g1 [g1 ~] [g1 bb1] ~").sound("sine").lpf(300).decay(0.5)
// Keep it simple, let the space breathe

// === Drone Bass (Ambient / Experimental) ===
// Single note or slow movement
// note("c1").sound("sawtooth").lpf(sine.range(100, 500).slow(20)).gain(0.3)

// === Bass Sound Design ===
// Sub: .sound("sine").lpf(200) — pure sub, no harmonics
// Round: .sound("triangle").lpf(600) — mellow, warm
// Gritty: .sound("sawtooth").lpf(1000).distort(0.1) — aggressive
// Square: .sound("square").lpf(800) — hollow, retro
// Layered: stack sub sine + mid sawtooth for full spectrum

// === Bass Movement Patterns ===
// Root only: simple, powerful (dub, trap, minimal)
// Root-fifth: traditional, stable (rock, reggae)
// Root-fifth-octave: energetic (funk, house)
// Scale walk: melodic, jazzy (jazz, soul)
// Chromatic approach: tension/resolution (jazz, neo-soul)
// Arpeggiated: flowing (ambient, progressive)

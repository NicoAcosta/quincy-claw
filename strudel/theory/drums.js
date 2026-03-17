// Drum Pattern Reference for Strudel
// Patterns notated for 1 bar of 4/4 (16 subdivisions)

// === Four-on-the-floor (House / Techno) ===
// s("bd*4, ~ cp ~ cp, hh*8")
// s("bd*4, ~ cp ~ cp, [~ hh]*4, hh*16")  // with offbeat + 16th hats

// === Breakbeat (DnB / Jungle) ===
// s("bd ~ ~ ~ bd ~ [~ bd] ~ bd ~ ~ [bd ~] ~ ~ bd ~")
// s("~ ~ ~ ~ sd ~ ~ ~ ~ ~ ~ ~ sd ~ ~ [~ sd]")

// === Boom Bap (Hip Hop) ===
// s("bd ~ ~ ~ ~ ~ bd ~ bd ~ ~ ~ ~ ~ [~ bd] ~")
// s("~ ~ ~ ~ sd ~ ~ ~ ~ ~ ~ ~ sd ~ ~ ~")

// === Trap ===
// s("bd ~ ~ ~ ~ ~ ~ ~ bd ~ ~ ~ ~ ~ ~ ~")  // sparse kick
// s("~ ~ ~ ~ cp ~ ~ ~ ~ ~ ~ ~ cp ~ ~ ~")  // half-time clap
// s("hh*8 hh*16 hh*8 [hh*16 hh*32]")      // rolling hats

// === One Drop (Reggae / Dub) ===
// s("~ ~ ~ ~ bd ~ ~ ~")
// s("~ ~ ~ ~ ~ ~ ~ ~ sd ~ ~ ~ ~ ~ ~ ~")  // snare on 3

// === Jazz Swing ===
// s("[ride ~ ride] [ride ~ ride] [ride ~ ride] [ride ~ ride]")
// s("~ hh ~ hh")  // foot hat on 2 and 4
// Ghost notes: s("~ sd:3 [sd:3 ~] ~").gain(0.25)

// === Bossa Nova ===
// s("bd ~ ~ bd ~ ~ bd ~ bd ~ bd ~ ~ bd ~ ~")
// s("[rim ~ rim] [~ rim ~] [rim ~ rim] [~ rim ~]")

// === Euclidean Rhythms (Generative) ===
// s("bd(3,8)")    — 3 kicks over 8 steps (tresillo)
// s("sd(5,8)")    — 5 hits over 8 (cinquillo)
// s("hh(7,12)")   — 7 hats over 12
// s("cp(3,8,2)")  — 3 claps over 8, rotated by 2

// === Adding Swing/Groove ===
// .late(0.02)     — slight delay for laid-back feel
// .gain(rand.range(0.3, 0.7)) — velocity humanization
// .late(rand.range(0, 0.01))  — timing humanization

// === Available Samples ===
// Kicks: bd, bd:1-9 (variations)
// Snares: sd, sd:1-9, rim
// Claps: cp
// Hi-hats: hh (closed), oh (open)
// Toms: lt (low), mt (mid), ht (high)
// Cymbals: ride, crash
// Percussion: shaker, tambourine, cowbell (cb), conga, bongo
// Electronic: 808bd, 808sd, 808:oh
// Metal: metal, chin

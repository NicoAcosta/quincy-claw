// Jazz — 120 BPM swing, walking bass, ii-V-I, ride cymbal
// Key: Bb major (default)

stack(
  // Ride cymbal — swing pattern
  s("[ride ~ ride] [ride ~ ride] [ride ~ ride] [ride ~ ride]")
    .gain(0.55)
    .speed(1.2),

  // Hi-hat — on 2 and 4 (like foot)
  s("~ hh ~ hh")
    .gain(0.4),

  // Kick — sparse, comping
  s("bd ~ ~ ~ ~ bd ~ ~ bd ~ ~ ~ ~ ~ bd ~")
    .gain(0.5)
    .sometimes(x => x.degrade()),

  // Brush snare — ghost notes
  s("~ sd:3 [sd:3 ~] ~ ~ sd:3 ~ [~ sd:3] ~ sd:3 ~ [sd:3 ~] ~ sd:3 ~ ~")
    .gain(0.25),

  // Walking bass — ii-V-I-vi in Bb
  note("c2 d2 eb2 f2  f2 e2 eb2 d2  bb1 c2 d2 f2  g2 f2 eb2 d2")
    .sound("triangle")
    .lpf(800)
    .gain(0.65)
    .decay(0.3),

  // Chord voicings — Cm7 F7 Bbmaj7 Gm7
  note("<[c3,eb3,g3,bb3] [f3,a3,c4,eb4] [bb2,d3,f3,a3] [g3,bb3,d4,f4]>")
    .sound("triangle")
    .lpf(2500)
    .room(0.4)
    .gain(0.25)
    .slow(2),

  // Piano melody — bebop fragments
  note("~ bb4 a4 g4 ~ f4 ~ ~ d4 eb4 f4 ~ ~ g4 a4 bb4")
    .sound("triangle")
    .lpf(3000)
    .room(0.35)
    .gain(0.2)
    .sometimes(x => x.degrade())
).cpm(120/4)

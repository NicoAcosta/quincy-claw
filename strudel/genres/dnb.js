// Drum & Bass — 170-180 BPM, breakbeats, sub bass, syncopation
// Key: E minor (default)

stack(
  // Breakbeat kick — syncopated
  s("bd ~ ~ ~ bd ~ [~ bd] ~ bd ~ ~ [bd ~] ~ ~ bd ~")
    .gain(1.1),

  // Snare — classic DnB placement
  s("~ ~ ~ ~ sd ~ ~ ~ ~ ~ ~ ~ sd ~ ~ [~ sd]")
    .gain(0.95),

  // Hi-hats — fast and detailed
  s("hh*16")
    .gain(sine.range(0.3, 0.7).fast(2))
    .sometimes(x => x.speed(1.5)),

  // Ghost snares
  s("~ sd:3 ~ ~ ~ sd:3 ~ sd:3 ~ ~ sd:3 ~ ~ ~ sd:3 ~")
    .gain(0.3),

  // Sub bass — deep, rolling
  note("e1 ~ ~ e1 ~ e1 [~ e1] ~ e1 ~ ~ [e1 g1] ~ ~ e1 ~")
    .sound("sine")
    .gain(1.0)
    .lpf(150)
    .decay(0.3),

  // Reese bass — mid-range grit
  note("<e2 [e2 g2] e2 [d2 e2]>")
    .sound("sawtooth")
    .lpf(sine.range(300, 2000).slow(8))
    .resonance(10)
    .gain(0.4),

  // Pad stabs — sparse
  note("<[e3,g3,b3] ~ [a3,c4,e4] ~>")
    .sound("square")
    .lpf(3000)
    .room(0.5)
    .gain(0.2)
    .decay(0.15)
    .slow(2)
).cpm(174/4)

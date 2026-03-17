// Drum & Bass — 170-180 BPM, breakbeats, sub bass, syncopation
// Key: E minor (default)

stack(
  // Breakbeat kick — syncopated
  s("bd ~ ~ ~ bd ~ [~ bd] ~ bd ~ ~ [bd ~] ~ ~ bd ~")
    .gain(1.1),

  // Snare — classic DnB placement
  s("~ ~ ~ ~ sd ~ ~ ~ ~ ~ ~ ~ sd ~ ~ [~ sd]")
    .gain(0.95).hpf(200),

  // Hi-hats — fast and detailed
  s("hh*16")
    .gain(sine.range(0.25, 0.55).fast(2)).hpf(6000)
    .sometimes(x => x.speed(1.5))
    .every(8, x => x.fast(2)),

  // Ghost snares
  s("~ sd:3 ~ ~ ~ sd:3 ~ sd:3 ~ ~ sd:3 ~ ~ ~ sd:3 ~")
    .gain(0.25).hpf(300),

  // Sub bass — deep, rolling
  note("e1 ~ ~ e1 ~ e1 [~ e1] ~ e1 ~ ~ [e1 g1] ~ ~ e1 ~")
    .sound("sine")
    .gain(1.0)
    .lpf(150)
    .decay(0.3),

  // Reese bass — mid-range grit, filter sweep over 16 bars
  note("<e2 [e2 g2] e2 [d2 e2]>")
    .sound("sawtooth")
    .lpf(sine.rangex(300, 2000).slow(8))
    .hpf(100)
    .resonance(10)
    .gain(0.35)
    .every(16, x => x.lpf(sine.rangex(200, 4000).slow(4))),

  // Pad stabs — sparse, with snare fill every 4
  note("<[e3,g3,b3] ~ [a3,c4,e4] ~>")
    .sound("square")
    .lpf(3000)
    .hpf(300)
    .room(0.5)
    .gain(0.18)
    .decay(0.15)
    .slow(2)
).cpm(174/4)

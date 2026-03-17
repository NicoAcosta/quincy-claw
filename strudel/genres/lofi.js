// Lo-fi Hip Hop — 75-90 BPM, dusty drums, jazzy chords, vinyl crackle
// Key: Eb major (default)

stack(
  // Dusty kick — boom bap style
  s("bd ~ ~ ~ ~ ~ bd ~ bd ~ ~ ~ ~ ~ [~ bd] ~")
    .gain(0.95)
    .lpf(800),

  // Snare — lazy, slightly behind the beat
  s("~ ~ ~ ~ sd ~ ~ ~ ~ ~ ~ ~ sd ~ ~ ~")
    .gain(0.8)
    .late(0.02)
    .room(0.3)
    .hpf(200),

  // Hi-hats — loose, humanized
  s("hh*8")
    .gain(rand.range(0.3, 0.6))
    .late(rand.range(0, 0.015))
    .hpf(4000),

  // Vinyl crackle / noise texture
  s("hh:6*32")
    .gain(0.05)
    .speed(0.3)
    .hpf(4000),

  // Jazzy chords — minor 7ths, major 7ths
  note("<[eb3,g3,bb3,d4] [ab3,c4,eb4,g4] [f3,ab3,c4,eb4] [bb2,d3,f3,ab3]>")
    .sound("triangle")
    .lpf(1800)
    .hpf(250)
    .room(0.5)
    .gain(0.28)
    .slow(2)
    .every(8, x => x.room(sine.range(0.3, 0.7).slow(4))),

  // Bass — mellow, round
  note("<eb2 ab2 f2 bb1>")
    .sound("sine")
    .gain(0.7)
    .lpf(400)
    .slow(2)
    .decay(0.4),

  // Melody — pentatonic fragments, sparse, with degradation
  note("eb4 ~ g4 ~ ~ bb4 ~ ~ ab4 ~ ~ ~ g4 ~ eb4 ~")
    .sound("triangle")
    .lpf(2500)
    .hpf(400)
    .room(0.6)
    .gain(0.18)
    .delay(0.3)
    .delaytime(0.375)
    .sometimes(x => x.degrade())
    .every(4, x => x.rev())
).cpm(82/4)

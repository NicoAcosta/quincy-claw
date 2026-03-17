// Trap — 140 BPM (half-time feel at 70), 808 bass, hi-hat rolls, sparse kicks
// Key: F minor (default)

stack(
  // Kick — sparse, heavy
  s("bd ~ ~ ~ ~ ~ ~ ~ bd ~ ~ ~ ~ ~ ~ ~")
    .gain(1.3),

  // Snare/Clap on 3 (half-time feel)
  s("~ ~ ~ ~ cp ~ ~ ~ ~ ~ ~ ~ cp ~ ~ ~")
    .gain(1.0),

  // Hi-hats — rolling, with triplet fills
  s("hh*8 hh*16 hh*8 [hh*16 hh*32]")
    .gain(sine.range(0.3, 0.7).fast(4)),

  // Open hat — accent
  s("~ ~ ~ ~ ~ ~ oh ~ ~ ~ ~ ~ ~ oh ~ ~")
    .gain(0.5),

  // 808 bass — long sustain, slides
  note("f1 ~ ~ ~ ~ ~ [f1 ab1] ~ f1 ~ ~ ~ ~ ~ [eb1 f1] ~")
    .sound("sine")
    .gain(1.1)
    .lpf(200)
    .decay(0.8)
    .distort(0.2),

  // Dark pad — atmospheric
  note("<[f3,ab3,c4] [db3,f3,ab3] [eb3,gb3,bb3] [c3,eb3,ab3]>")
    .sound("sawtooth")
    .lpf(1200)
    .room(0.7)
    .gain(0.15)
    .slow(4),

  // Bell melody — sparse, eerie
  note("~ ~ f5 ~ ~ ab5 ~ ~ ~ c5 ~ ~ ~ ~ eb5 ~")
    .sound("sine")
    .room(0.6)
    .gain(0.2)
    .delay(0.4)
    .delaytime(0.25)
    .sometimes(x => x.degrade())
).cpm(140/4)

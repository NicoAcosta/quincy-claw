// Dub — 70-85 BPM, heavy bass, tape echo, space, dropouts
// Key: G minor (default)

stack(
  // Kick — one drop style
  s("~ ~ ~ ~ bd ~ ~ ~ ~ ~ ~ ~ bd ~ ~ ~")
    .gain(1.1),

  // Snare — rimshot with heavy delay
  s("~ ~ ~ ~ ~ ~ ~ ~ sd ~ ~ ~ ~ ~ ~ ~")
    .gain(0.8)
    .delay(0.65)
    .delaytime(0.375)
    .room(0.6),

  // Hi-hats — offbeat skank
  s("[~ hh]*4")
    .gain(0.5)
    .sometimes(x => x.degrade()),

  // Bass — deep, round, heavy
  note("<g1 [g1 ~] [g1 bb1] ~ g1 ~ [d1 g1] ~>")
    .sound("sine")
    .gain(1.0)
    .lpf(300)
    .decay(0.5),

  // Melodica/Keys — sparse, with heavy echo
  note("~ ~ g4 ~ ~ ~ bb4 ~  ~ ~ d4 ~ ~ ~ ~ ~")
    .sound("triangle")
    .lpf(2000)
    .room(0.7)
    .delay(0.7)
    .delaytime(0.375)
    .gain(0.25)
    .sometimes(x => x.degrade()),

  // Guitar skank — choppy
  note("<[g3,bb3,d4] ~ ~ ~ [g3,bb3,d4] ~ ~ ~>")
    .sound("square")
    .lpf(1500)
    .gain(0.15)
    .decay(0.05)
    .room(0.3),

  // Dub siren — occasional
  note("~ ~ ~ ~ ~ ~ ~ ~  g5 ~ ~ ~ ~ ~ ~ ~")
    .sound("sine")
    .room(0.8)
    .delay(0.6)
    .delaytime(0.25)
    .gain(0.15)
    .speed(sine.range(0.8, 1.2).slow(4))
    .degradeBy(0.7)
).cpm(75/4)

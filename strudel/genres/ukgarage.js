// UK Garage / 2-step — 128-138 BPM, syncopated kick, shuffled hats, warm bass
// Key: C minor (default)

stack(
  // Kick — 2-step pattern: skips beat 2, syncopated
  s("bd ~ ~ ~ ~ bd:1 ~ ~ ~ ~ bd ~ bd ~ ~ ~").gain(1.05),

  // Snare/clap on 2 and 4
  s("~ ~ ~ ~ cp ~ ~ ~ ~ ~ ~ ~ cp ~ ~ ~").gain(0.8).hpf(300)
    .room(0.25),

  // Shuffled hats — .late() for the garage shuffle
  s("hh*8").gain("0.5 0.3 0.45 0.25 0.5 0.3 0.45 0.25")
    .hpf(5000)
    .late(0.015),

  // Open hat — subtle, offbeat
  s("~ ~ ~ oh ~ ~ ~ ~").gain(0.3).hpf(4000)
    .late(0.012),

  // Warm rolling bass — saw with glide feel
  note("c2 ~ [c2 eb2] ~ c2 ~ [g1 c2] ~")
    .sound("sawtooth")
    .lpf(700)
    .gain(0.85)
    .decay(0.18),

  // Chord stabs — soulful, warm
  note("<[c3,eb3,g3,bb3] ~ [f3,ab3,c4,eb4] ~ [g3,bb3,d4,f4] ~ [eb3,g3,bb3,d4] ~>")
    .sound("triangle")
    .lpf(2500)
    .hpf(300)
    .gain(0.3)
    .room(0.4)
    .decay(0.12)
    .every(4, x => x.room(sine.range(0.2, 0.6).slow(2))),

  // Ghost snare taps — low velocity for groove
  s("~ sd:3 ~ ~ ~ sd:3 ~ sd:3").gain(0.18).hpf(400)
    .late(0.01)
).cpm(132/4)

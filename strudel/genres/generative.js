// Generative/Experimental — evolving patterns, euclidean rhythms, probability
// Key: Various / atonal (default)

stack(
  // Euclidean kick — 3 hits over 8
  s("bd(3,8)").gain(0.9),

  // Euclidean snare — 5 hits over 12
  s("sd(5,12)").gain(0.55).room(0.4).hpf(200),

  // Euclidean hats — 7 over 16, rotating
  s("hh(7,16,2)").gain(0.4).hpf(6000)
    .every(4, x => x.iter(8)),

  // Probabilistic percussion
  s("cp(3,8)")
    .gain(0.35)
    .hpf(1000)
    .degradeBy(0.4)
    .room(0.5)
    .every(8, x => x.fast(2)),

  // Evolving bass — slow random walk
  note("c2 eb2 g2 bb1 d2 f2 ab1 b1")
    .sound("sawtooth")
    .lpf(perlin.rangex(200, 2000).slow(12))
    .resonance(15)
    .gain(0.55)
    .every(3, x => x.rev())
    .every(5, x => x.fast(2)),

  // Melodic fragments — pentatonic with probability
  note("c4 eb4 f4 g4 bb4 c5 bb4 g4")
    .sound("triangle")
    .hpf(400)
    .room(0.8)
    .gain(0.2)
    .delay(0.5)
    .delaytime(rand.range(0.1, 0.5))
    .degradeBy(0.5)
    .every(4, x => x.rev())
    .jux(x => x.rev().slow(2)),

  // Texture — granular
  s("chin(5,8)")
    .speed(rand.range(0.5, 2))
    .gain(0.15)
    .hpf(1000)
    .room(0.7)
    .pan(rand)
    .every(8, x => x.chop(4)),

  // Drone
  note("c2")
    .sound("sawtooth")
    .lpf(sine.rangex(100, 500).slow(20))
    .gain(0.12)
    .room(0.9)
    .size(0.95)
).cpm(90/4)

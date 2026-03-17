// Acid — 125-135 BPM, TB-303 bass, resonant filter, squelchy
// Key: A minor (default)

stack(
  // Kick — four on the floor, punchy
  s("bd*4").gain(1.15),

  // Clap on 2 and 4
  s("~ cp ~ cp").gain(0.85).hpf(400),

  // Hi-hats — 16ths, double-time every 8
  s("hh*16").gain(0.45).hpf(6000)
    .every(8, x => x.fast(2)),

  // Open hat — offbeat
  s("~ oh ~ oh").gain(0.35).hpf(3000),

  // Acid bass — 303-style with filter sweep, dramatic sweep every 16
  note("a1 a1 [a1 c2] a1 e2 a1 [g1 a1] a1  a1 [a1 a1] c2 a1 [e2 d2] a1 a1 [a1 g1]")
    .sound("sawtooth")
    .lpf(sine.rangex(200, 4000).slow(4))
    .resonance(25)
    .gain(0.75)
    .decay(0.15)
    .distort(0.15)
    .every(16, x => x.lpf(sine.rangex(150, 8000).slow(2))),

  // Secondary acid line — higher, more squelchy
  note("~ a2 ~ [c3 ~] ~ a2 ~ e2  ~ [a2 g2] ~ c3 ~ ~ a2 ~")
    .sound("square")
    .lpf(cosine.rangex(300, 5000).slow(6))
    .hpf(150)
    .resonance(30)
    .gain(0.25)
    .decay(0.1)
    .every(4, x => x.rev()),

  // Sparse percussion
  s("~ ~ [rim ~] ~ ~ ~ ~ [rim ~]  ~ ~ ~ [rim ~] ~ ~ [rim ~] ~")
    .gain(0.35)
    .hpf(1000)
    .room(0.3)
).cpm(132/4)

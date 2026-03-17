// House — 118-130 BPM, groovy, soulful, offbeat hats, chord stabs
// Key: A minor (default)

stack(
  // Kick — four on the floor
  s("bd*4").gain(1.1),

  // Clap on 2 and 4
  s("~ cp ~ cp").gain(0.85).hpf(400)
    .room(0.2),

  // Hi-hats — offbeat emphasis
  s("[~ hh]*4").gain(0.6).hpf(4000),

  // Open hat — offbeats
  s("~ [~ oh] ~ [~ oh]").gain(0.4).hpf(3000),

  // Shimmer hats — 16ths adding groove
  s("hh*16").hpf(8000).gain(sine.range(0.15, 0.35).slow(2))
    .every(8, x => x.degradeBy(0.4)),

  // Bass — funky, syncopated
  note("a1 ~ [a1 c2] ~ a1 ~ [e2 a1] ~")
    .sound("sawtooth")
    .lpf(600)
    .gain(0.9)
    .decay(0.2),

  // Chord stabs — classic house, vary every 4
  note("<[a3,c4,e4] ~ [d3,f3,a3] ~ [g3,b3,d4] ~ [c3,e3,g3] ~>")
    .sound("square")
    .lpf(2000)
    .hpf(300)
    .gain(0.35)
    .room(0.4)
    .decay(0.1)
    .every(4, x => x.room(sine.range(0.2, 0.7).slow(2))),

  // Organ pad
  note("<[a3,c4,e4,g4] [d3,f3,a3,c4] [g3,b3,d4,f4] [c3,e3,g3,b3]>")
    .sound("triangle")
    .lpf(1500)
    .hpf(300)
    .room(0.6)
    .gain(0.18)
    .slow(2)
).cpm(124/4)

// House — 118-130 BPM, groovy, soulful, offbeat hats, chord stabs
// Key: A minor (default)

stack(
  // Kick — four on the floor with slight shuffle
  s("bd*4").gain(1.1),

  // Clap on 2 and 4
  s("~ cp ~ cp").gain(0.85),

  // Hi-hats — offbeat emphasis
  s("[~ hh]*4").gain(0.7),

  // Open hat — offbeats
  s("~ [~ oh] ~ [~ oh]").gain(0.45),

  // Shaker — 16ths adding groove
  s("shaker*16").gain(sine.range(0.15, 0.4).slow(2)),

  // Bass — funky, syncopated
  note("a1 ~ [a1 c2] ~ a1 ~ [e2 a1] ~")
    .sound("sawtooth")
    .lpf(600)
    .gain(0.9)
    .decay(0.2),

  // Chord stabs — classic house
  note("<[a3,c4,e4] ~ [d3,f3,a3] ~ [g3,b3,d4] ~ [c3,e3,g3] ~>")
    .sound("square")
    .lpf(2000)
    .gain(0.35)
    .room(0.4)
    .decay(0.1),

  // Organ pad
  note("<[a3,c4,e4,g4] [d3,f3,a3,c4] [g3,b3,d4,f4] [c3,e3,g3,b3]>")
    .sound("triangle")
    .lpf(1500)
    .room(0.6)
    .gain(0.2)
    .slow(2)
).cpm(124/4)

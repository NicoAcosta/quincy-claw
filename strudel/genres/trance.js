// Trance — 136-145 BPM, euphoric, building arps, supersaw pads, long energy arcs
// Key: A minor (default)

stack(
  // Kick — four on the floor, punchy
  s("bd*4").gain(1.1),

  // Clap + snare layered on 2 and 4
  s("~ [cp sd:3] ~ [cp sd:3]").gain(0.85).hpf(400)
    .room(0.3).size(0.4),

  // Offbeat bass — hits between kicks for forward drive
  note("~ a1 ~ a1 ~ a1 ~ a1")
    .sound("sawtooth")
    .lpf(500)
    .gain(0.85)
    .decay(0.12),

  // Supersaw pad — wide, evolving, 16-bar filter sweep
  note("<[a3,c4,e4,g4] [a3,c4,e4,g4] [f3,a3,c4,e4] [f3,a3,c4,e4] [g3,b3,d4,f4] [g3,b3,d4,f4] [e3,g3,b3,d4] [e3,g3,b3,d4]>")
    .sound("sawtooth")
    .lpf(sine.rangex(600, 4000).slow(16))
    .hpf(300)
    .room(0.7)
    .size(0.85)
    .gain(0.25)
    .slow(2),

  // Arpeggiated lead — trance arp sequence
  note("a4 c5 e5 a5 e5 c5 a4 e4")
    .sound("triangle")
    .lpf(sine.rangex(1000, 6000).slow(8))
    .hpf(400)
    .gain(0.3)
    .room(0.5).size(0.6)
    .delay(0.3).delaytime(0.214).delayfeedback(0.3),

  // Hi-hats — 16ths with velocity variation
  s("hh*16").gain(sine.range(0.2, 0.45).slow(2))
    .hpf(6000),

  // Building energy — open hat on offbeats
  s("~ oh ~ oh").gain(0.35).hpf(4000)
    .every(8, x => x.gain(0.5))
).cpm(140/4)

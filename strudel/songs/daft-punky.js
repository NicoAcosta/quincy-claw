// Daft Punky — French house, filtered disco, funky octave bass
// 123 BPM, A minor
// Inspired by Discovery-era Daft Punk

stack(
  // Kick — punchy four on the floor
  s("bd*4").gain(1.15),

  // Clap — snappy on 2 and 4
  s("~ cp ~ cp").gain(0.8).room(0.2),

  // Hi-hats — tight 16ths with offbeat accent
  s("hh*16").gain("0.4 0.6 0.8 0.6").hpf(6000),

  // Open hat — offbeat groove
  s("~ oh ~ oh").gain(0.4).decay(0.1).hpf(5000),

  // Disco bass — funky octave-jumping
  note("a1 a1 [a2 a1] ~ a1 [~ a2] a1 ~")
    .sound("sawtooth")
    .lpf(900)
    .resonance(8)
    .decay(0.15).sustain(0)
    .gain(0.9),

  // Filtered disco chords — the Daft Punk signature
  note("<[a3,c4,e4] [a3,c4,e4] [d3,f3,a3] [d3,f3,a3] [g3,b3,d4] [g3,b3,d4] [e3,g3,b3] [e3,g3,b3]>")
    .sound("sawtooth")
    .lpf(sine.rangex(400, 6000).slow(8))
    .resonance(12)
    .gain(sine.range(0.15, 0.45).fast(4))
    .room(0.3),

  // Funky rhythm guitar stabs
  note("[a4,c5,e5] ~ [~ [a4,c5,e5]] ~ [d4,f4,a4] ~ [~ [d4,f4,a4]] ~")
    .sound("square")
    .lpf(sine.rangex(800, 3000).slow(4))
    .gain(0.2)
    .decay(0.08).sustain(0),

  // Vinyl crackle texture
  s("crackle*4").gain(0.03).hpf(3000).pan(rand)
).cpm(123/4)

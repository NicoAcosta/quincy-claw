// Techno — 125-140 BPM, 4/4, industrial, repetitive, filter sweeps
// Key: C minor (default)

stack(
  // Kick — four on the floor
  s("bd*4").gain(1.2),

  // Clap/Snare on 2 and 4
  s("~ cp ~ cp").gain(0.9),

  // Closed hi-hats — 16ths with velocity variation
  s("hh*16").gain(sine.range(0.4, 0.8).slow(4)),

  // Open hat offbeat
  s("~ oh ~ oh").gain(0.5),

  // Ride — sparse
  s("~ ~ ride ~").gain(0.3).sometimes(x => x.degrade()),

  // Bass — dark, pulsing
  note("<c2 c2 eb2 c2>")
    .sound("sawtooth")
    .lpf(sine.range(200, 1200).slow(8))
    .resonance(15)
    .gain(0.8)
    .decay(0.15),

  // Pad — atmospheric
  note("<[c3,eb3,g3] [c3,eb3,bb3] [c3,f3,ab3] [c3,eb3,g3]>")
    .sound("sawtooth")
    .lpf(800)
    .room(0.8)
    .size(0.9)
    .gain(0.25)
    .slow(2),

  // Perc — industrial hits
  s("~ metal ~ metal:3").gain(0.3).speed(1.5)
    .room(0.5).sometimes(x => x.degrade())
).cpm(130/4)

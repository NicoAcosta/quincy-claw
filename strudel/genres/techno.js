// Techno — 125-140 BPM, 4/4, industrial, repetitive, filter sweeps
// Key: C minor (default)

stack(
  // Kick — four on the floor
  s("bd*4").gain(1.2),

  // Clap/Snare on 2 and 4
  s("~ cp ~ cp").gain(0.9).hpf(400),

  // Closed hi-hats — 16ths with velocity variation
  s("hh*16").gain(sine.range(0.3, 0.6).slow(4)).hpf(6000)
    .every(8, x => x.fast(2)),

  // Open hat offbeat
  s("~ oh ~ oh").gain(0.45).hpf(4000),

  // Ride — sparse
  s("~ ~ ride ~").gain(0.25).hpf(3000)
    .sometimes(x => x.degrade()),

  // Bass — dark, pulsing
  note("<c2 c2 eb2 c2>")
    .sound("sawtooth")
    .lpf(sine.rangex(200, 1200).slow(8))
    .resonance(15)
    .gain(0.8)
    .decay(0.15)
    .every(16, x => x.lpf(sine.rangex(200, 3000).slow(4))),

  // Pad — atmospheric, evolving filter
  note("<[c3,eb3,g3] [c3,eb3,bb3] [c3,f3,ab3] [c3,eb3,g3]>")
    .sound("sawtooth")
    .lpf(sine.rangex(400, 1200).slow(16))
    .hpf(300)
    .room(0.8)
    .size(0.9)
    .gain(0.2)
    .slow(2),

  // Perc — industrial hits
  s("~ metal ~ metal:3").gain(0.25).speed(1.5)
    .hpf(1000).room(0.5)
    .every(4, x => x.sometimes(y => y.degrade()))
).cpm(130/4)

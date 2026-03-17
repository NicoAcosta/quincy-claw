// Dubstep — 140 BPM (half-time feel = 70 BPM groove), heavy bass, sparse drums
// Key: F minor (default)

stack(
  // Kick — half-time, hits on 1 and occasionally 2.5
  s("bd ~ ~ ~ ~ bd ~ ~ ~ ~ ~ ~ ~ ~ ~ ~").gain(1.1),

  // Snare — beat 3 only (half-time signature)
  s("~ ~ ~ ~ ~ ~ ~ ~ sd:4 ~ ~ ~ ~ ~ ~ ~").gain(0.95).hpf(200)
    .room(0.3).size(0.5),

  // Sparse hats — minimal, dark
  s("~ ~ hh ~ ~ ~ hh ~ ~ ~ hh ~ ~ ~ ~ ~").gain(0.35).hpf(6000),

  // Wobble bass — LFO on filter, the dubstep signature
  note("f1 f1 f1 f1")
    .sound("sawtooth")
    .lpf(sine.range(200, 2000).fast(4))
    .resonance(18)
    .gain(0.9)
    .decay(0.3)
    .every(4, x => x.lpf(sine.range(200, 3000).fast(8))),

  // Sub bass — sine underneath for weight
  note("f1 ~ ~ ~ f1 ~ ~ ~")
    .sound("sine")
    .lpf(100)
    .gain(0.7),

  // Dark pad — sparse, atmospheric
  note("<[f3,ab3,c4] [f3,ab3,c4] [db3,f3,ab3] [eb3,gb3,bb3]>")
    .sound("sawtooth")
    .lpf(800)
    .hpf(300)
    .room(0.6)
    .size(0.8)
    .gain(0.15)
    .slow(2),

  // Minimal perc — metallic hits
  s("~ ~ ~ metal:3 ~ ~ ~ ~").gain(0.2).hpf(2000)
    .room(0.4)
    .sometimes(x => x.degrade())
).cpm(140/4)

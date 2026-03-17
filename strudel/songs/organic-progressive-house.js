// Organic Progressive House — 122 BPM, D minor
// Warm pads, earthy percussion, slow filter builds, hypnotic groove

stack(
  // Kick — soft, deep, four on the floor
  s("bd*4").gain(0.95).lpf(400),

  // Soft rimshot on 2 and 4
  s("~ rim ~ rim").gain(0.5).room(0.3),

  // Hi-hats — shaker-like texture with high-pass
  s("hh*16").gain(sine.range(0.08, 0.25).slow(4)).hpf(8000),

  // Congas — syncopated, earthy
  s("[~ conga] [conga ~ conga] [~ conga] conga")
    .gain(0.45).room(0.25).pan(sine.range(0.3, 0.7).slow(3)),

  // Open hat — sparse offbeats
  s("~ [~ oh] ~ ~").gain(0.3).hpf(7000).decay(0.15),

  // Sub bass — deep sine, root-fifth movement
  note("d1 ~ ~ d1 ~ ~ a0 ~")
    .sound("sine")
    .lpf(200)
    .gain(0.9)
    .decay(0.3),

  // Mid bass — warm saw, filtered
  note("d2 ~ [d2 f2] ~ d2 ~ [a1 d2] ~")
    .sound("sawtooth")
    .lpf(sine.range(300, 900).slow(16))
    .gain(0.5)
    .decay(0.2),

  // Warm pad — slow evolving chords, Dm > Am > Bbmaj7 > Gm
  note("<[d3,f3,a3,c4] [a2,c3,e3,g3] [bb2,d3,f3,a3] [g2,bb2,d3,f3]>")
    .sound("triangle")
    .lpf(sine.range(800, 2500).slow(32))
    .room(0.7).size(0.8)
    .gain(0.22)
    .slow(2),

  // Pluck melody — pentatonic, sparse, delayed
  note("d4 ~ a4 ~ ~ f4 ~ e4")
    .sound("triangle")
    .lpf(3000)
    .gain(0.18)
    .decay(0.4)
    .delay(0.4).delaytime(0.375).delayfeedback(0.45)
    .room(0.5)
    .degradeBy(0.3)
).cpm(122/4)

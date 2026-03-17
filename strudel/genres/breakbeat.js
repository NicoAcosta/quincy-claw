// Breakbeat — 120-140 BPM, broken kick patterns, punchy energy, rock drive
// Key: E minor (default)

stack(
  // Kick — broken pattern, NOT four-on-the-floor
  s("bd ~ ~ bd:3 ~ bd ~ ~ bd ~ ~ ~ bd:3 ~ bd ~").gain(1.1),

  // Snare — punchy, with room
  s("~ ~ ~ ~ sd:4 ~ ~ ~ ~ ~ ~ ~ sd:4 ~ ~ sd:4").gain(0.9).hpf(200)
    .room(0.35).size(0.4),

  // 16th hats — dynamic, driving
  s("hh*16").gain("0.5 0.2 0.35 0.2 0.5 0.2 0.35 0.2 0.5 0.2 0.35 0.2 0.5 0.2 0.35 0.2")
    .hpf(5000)
    .every(8, x => x.degradeBy(0.3)),

  // Open hat accents
  s("~ ~ ~ ~ ~ ~ oh ~ ~ ~ ~ ~ ~ ~ oh ~").gain(0.35).hpf(4000),

  // Distorted bass — aggressive, mid-heavy
  note("e1 ~ e1 [e1 g1] ~ e1 ~ [b0 e1]")
    .sound("sawtooth")
    .lpf(900)
    .distort(0.15)
    .gain(0.85)
    .decay(0.2),

  // Short stab chords — punchy, rhythmic
  note("<[e3,g3,b3] ~ ~ [a3,c4,e4] ~ ~ [d3,f3,a3] ~ ~ [b2,d3,f3] ~ ~ ~ ~ ~ ~>")
    .sound("square")
    .lpf(2000)
    .hpf(300)
    .gain(0.3)
    .decay(0.08)
    .room(0.2)
).cpm(130/4)

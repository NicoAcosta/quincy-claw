// Ambient — 60-100 BPM, pads, long reverbs, generative, sparse
// Key: D major / modal (default)

stack(
  // Evolving pad — slow chord movement with opening filter
  note("<[d3,fs3,a3] [a2,cs3,e3,a3] [b2,d3,fs3] [g2,b2,d3,g3]>")
    .sound("sawtooth")
    .lpf(sine.rangex(400, 1800).slow(16))
    .hpf(200)
    .room(0.95)
    .size(0.99)
    .gain(0.2)
    .slow(4)
    .delay(0.5)
    .delaytime(0.375)
    .every(16, x => x.lpf(sine.rangex(300, 3000).slow(8))),

  // High shimmer — sparse melodic fragments
  note("d5 ~ ~ fs5 ~ a5 ~ ~ ~ e5 ~ ~ d5 ~ ~ ~")
    .sound("triangle")
    .hpf(2000)
    .room(0.9)
    .size(0.95)
    .gain(0.12)
    .delay(0.7)
    .delaytime(0.5)
    .sometimes(x => x.degrade())
    .every(8, x => x.rev()),

  // Sub bass — barely there
  note("<d1 a0 b0 g0>")
    .sound("sine")
    .gain(0.4)
    .slow(4)
    .lpf(200),

  // Texture — granular feel, evolving
  s("~ ~ [chin:2 ~] ~ ~ ~ [~ chin:4] ~")
    .gain(0.15)
    .hpf(1000)
    .room(0.9)
    .speed(rand.range(0.5, 1.5))
    .slow(2)
    .every(4, x => x.pan(rand)),

  // Subtle percussion — very sparse
  s("~ ~ ~ ~ bd ~ ~ ~")
    .gain(0.3)
    .room(0.8)
    .lpf(400)
    .slow(2)
).cpm(70/4)

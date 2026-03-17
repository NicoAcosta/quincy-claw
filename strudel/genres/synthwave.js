// Synthwave / Retrowave — 100-118 BPM, 80s nostalgia, arps, gated snare, retro pads
// Key: A minor (default)

stack(
  // Kick — straight, mechanical
  s("bd*4").gain(1.0),

  // Gated snare — short room for 80s feel
  s("~ sd:3 ~ sd:3").gain(0.9).hpf(200)
    .room(0.3).size(0.25).decay(0.08),

  // Minimal hats — 8ths, restrained
  s("hh*8").gain("0.35 0.2 0.35 0.2 0.35 0.2 0.35 0.2")
    .hpf(6000),

  // Arpeggiated sequence — the synthwave signature
  note("a3 c4 e4 a4 e4 c4 a3 e3")
    .sound("square")
    .lpf(sine.rangex(800, 3000).slow(8))
    .hpf(400)
    .gain(0.35)
    .delay(0.25).delaytime(60/108 * 0.5).delayfeedback(0.35)
    .off(1/8, x => x.gain(0.18).note(x => x + 12)),

  // Saw pad — warm, wide, cinematic
  note("<[a3,c4,e4] [a3,c4,e4] [f3,a3,c4] [f3,a3,c4] [c3,e3,g3] [c3,e3,g3] [g3,b3,d4] [g3,b3,d4]>")
    .sound("sawtooth")
    .lpf(sine.rangex(600, 2000).slow(16))
    .hpf(300)
    .room(0.6)
    .size(0.7)
    .gain(0.22)
    .slow(2),

  // Square bass — retro, punchy
  note("a1 ~ a1 ~ a1 ~ [e1 a1] ~")
    .sound("square")
    .lpf(400)
    .gain(0.8)
    .decay(0.15)
).cpm(108/4)

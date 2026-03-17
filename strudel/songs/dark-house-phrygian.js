// Dark House — A Phrygian, 124 BPM
// Deep & minimal drums, dark filtered saw bass, cavernous space
// Exotic tension from the A→Bb half-step, warehouse reverb on clap and perc

stack(
  // Kick — four on the floor, dry, anchor
  s("bd*4").gain(1.0),

  // Clap — on 2 and 4, pushed back in the warehouse
  s("~ cp ~ cp").gain(0.7)
    .room(0.6).size(0.8).delay(0.3).delaytime(0.375).delayfeedback(0.3),

  // Hats — sparse offbeats, whisper-quiet
  s("[~ hh]*4").gain(0.35).hpf(6000)
    .room(0.3).size(0.5),

  // Rimshot — distant, echoing metallic hit
  s("~ ~ [~ rim] ~").gain(0.2)
    .room(0.8).size(0.9).delay(0.5).delaytime(0.25).delayfeedback(0.4)
    .hpf(1500),

  // Bass — dark filtered saw, A phrygian
  note("a1 ~ [a1 bb1] ~ a1 ~ [e1 a1] ~")
    .sound("sawtooth")
    .lpf(sine.range(300, 800).slow(8))
    .gain(0.75)
    .decay(0.15)
    .hpf(30),

  // Sub — sine underneath for weight
  note("a0 ~ ~ ~ a0 ~ ~ ~")
    .sound("sine")
    .lpf(120)
    .gain(0.6),

  // Pad — phrygian tension, cavernous
  note("<[a2,c3,e3] [bb2,d3,f3]>")
    .sound("triangle")
    .lpf(sine.range(800, 2500).slow(16))
    .room(0.9).size(0.95)
    .gain(0.2)
    .attack(1).release(3)
    .slow(2)
).cpm(124/4)

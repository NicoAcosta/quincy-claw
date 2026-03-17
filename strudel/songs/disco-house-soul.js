// Disco House Soul — soulful disco house, lush strings, filtered chords, funky bass
// 122 BPM, F minor
// 15 layers: full disco production with call-and-response melody

stack(
  // Kick — four on the floor
  s("bd*4").gain(1.1),

  // Clap on 2 and 4
  s("~ cp ~ cp").gain(0.8).room(0.3),

  // Closed hats — offbeat with swing
  s("[~ hh]*4").gain(0.6).late(0.02),

  // Open hat — disco offbeats
  s("~ [~ oh] ~ [~ oh]").gain(0.4).late(0.02).decay(0.12),

  // 16th hat shimmer
  s("hh*16").gain(sine.range(0.06, 0.2).slow(4)).hpf(8000).late(0.01),

  // Tambourine — 8th notes for disco sparkle
  s("hh*8").gain(0.18).hpf(6000).pan(0.3),

  // Bass — disco octave-jumping funk
  note("f2 f2 [f2 f3] ~ ab2 [~ ab3] [bb2 c3] ~")
    .sound("sawtooth")
    .lpf(900)
    .resonance(10)
    .gain(0.85)
    .decay(0.12),

  // Sub bass layer
  note("f1 ~ f1 ~ ab1 ~ bb1 ~")
    .sound("sine")
    .gain(0.6)
    .lpf(200),

  // Disco chords — filtered saw, pumping gain
  note("<[f3,ab3,c4,eb4] [f3,ab3,c4,eb4] [bb2,db3,f3,ab3] [bb2,db3,f3,ab3] [db3,f3,ab3,c4] [db3,f3,ab3,c4] [c3,eb3,g3,bb3] [c3,eb3,g3,bb3]>")
    .sound("sawtooth")
    .lpf(sine.rangex(400, 5000).slow(8))
    .resonance(12)
    .gain(sine.range(0.1, 0.4).fast(4))
    .room(0.3),

  // Rhythm guitar stabs — syncopated
  note("[f4,ab4,c5] ~ [~ [f4,ab4,c5]] ~ [bb3,db4,f4] ~ [~ [bb3,db4,f4]] ~")
    .sound("square")
    .lpf(sine.rangex(800, 3000).slow(4))
    .gain(0.2)
    .decay(0.06),

  // String pad — lush disco wash
  note("<[f3,ab3,c4,eb4] [bb3,db4,f4,ab4] [db3,f3,ab3,c4] [c3,eb3,g3,bb3]>")
    .sound("triangle")
    .lpf(3000)
    .room(0.8)
    .gain(0.18)
    .slow(2)
    .attack(0.15)
    .decay(0.5),

  // High strings — octave up for shimmer
  note("<[f4,ab4,c5] [bb4,db5,f5] [db4,f4,ab4] [c4,eb4,g4]>")
    .sound("triangle")
    .lpf(4000)
    .room(0.6)
    .gain(0.1)
    .slow(2)
    .attack(0.2),

  // Melody — soulful pentatonic with call-and-response
  note("f4 ab4 c5 ~ bb4 ab4 f4 ~  eb4 f4 ab4 ~ c5 bb4 ab4 f4")
    .sound("sine")
    .lpf(3500)
    .gain(0.22)
    .room(0.5)
    .delay(0.25)
    .delaytime(60/122 * 0.5)
    .late(rand.range(0, 0.008)),

  // Counter melody — descending fills
  note("~ ~ ~ c5  ~ ~ bb4 ~  ~ ~ ~ ab4  ~ f4 ~ ~")
    .sound("triangle")
    .lpf(2800)
    .gain(0.15)
    .room(0.4)
    .delay(0.3)
    .delaytime(60/122 * 0.25)
).cpm(122/4)

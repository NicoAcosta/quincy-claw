// Disco House Deluxe — massive 31-layer disco house orchestra
// 122 BPM, F minor
// Full production: 8 drums, 3 bass, 4 chords, 4 strings, 4 brass, 5 melodies, 3 textures

stack(
  // === DRUMS (8 layers) ===
  // Kick — four on the floor
  s("bd*4").gain(1.1),
  // Ghost kick — subtle offbeat
  s("~ bd ~ bd").gain(0.3).hpf(100),
  // Clap on 2 and 4
  s("~ cp ~ cp").gain(0.75).room(0.3),
  // Snare ghost notes
  s("~ ~ [~ cp] ~  ~ ~ ~ [~ cp]").gain(0.25).hpf(2000),
  // Closed hats — offbeat with swing
  s("[~ hh]*4").gain(0.55).late(0.02),
  // Open hat — disco offbeats
  s("~ [~ oh] ~ [~ oh]").gain(0.35).late(0.02).decay(0.12),
  // 16th hat shimmer
  s("hh*16").gain(sine.range(0.04, 0.16).slow(4)).hpf(8000).late(0.01),
  // Tambourine — 8th notes disco sparkle
  s("hh*8").gain(0.14).hpf(6000).pan(0.3),

  // === BASS (3 layers) ===
  // Disco bass — octave-jumping funk
  note("f2 f2 [f2 f3] ~ ab2 [~ ab3] [bb2 c3] ~")
    .sound("sawtooth").lpf(900).resonance(10).gain(0.8).decay(0.12),
  // Sub bass — deep sine foundation
  note("f1 ~ f1 ~ ab1 ~ bb1 ~")
    .sound("sine").gain(0.55).lpf(200),
  // Mid bass — square for grit
  note("f2 ~ [~ f2] ~ ab2 ~ bb2 ~")
    .sound("square").lpf(500).gain(0.2).decay(0.1),

  // === CHORDS (4 layers) ===
  // Disco chords — filtered saw, pumping gain
  note("<[f3,ab3,c4,eb4] [f3,ab3,c4,eb4] [bb2,db3,f3,ab3] [bb2,db3,f3,ab3] [db3,f3,ab3,c4] [db3,f3,ab3,c4] [c3,eb3,g3,bb3] [c3,eb3,g3,bb3]>")
    .sound("sawtooth").lpf(sine.rangex(400, 5000).slow(8)).resonance(12)
    .gain(sine.range(0.08, 0.35).fast(4)).room(0.3),
  // Rhythm stabs — syncopated square
  note("[f4,ab4,c5] ~ [~ [f4,ab4,c5]] ~ [bb3,db4,f4] ~ [~ [bb3,db4,f4]] ~")
    .sound("square").lpf(sine.rangex(800, 3000).slow(4)).gain(0.18).decay(0.06),
  // Piano-like comping — triangle staccato
  note("<[f3,ab3,c4] ~ [f3,ab3,c4] ~  [bb2,db3,f3] ~ [bb2,db3,f3] ~  [db3,f3,ab3] ~ [db3,f3,ab3] ~  [c3,eb3,g3] ~ [c3,eb3,g3] ~>")
    .sound("triangle").lpf(2000).gain(0.15).decay(0.08).room(0.2),
  // Wide detune chords — lush saw pad
  note("<[f3,ab3,c4,eb4] [bb3,db4,f4,ab4] [db3,f3,ab3,c4] [c3,eb3,g3,bb3]>")
    .sound("sawtooth").lpf(1800).gain(0.1).room(0.6).slow(2).detune(8),

  // === STRINGS (4 layers) ===
  // Low strings pad
  note("<[f3,ab3,c4,eb4] [bb3,db4,f4,ab4] [db3,f3,ab3,c4] [c3,eb3,g3,bb3]>")
    .sound("triangle").lpf(3000).room(0.8).gain(0.15).slow(2).attack(0.15).decay(0.5),
  // High strings — shimmer
  note("<[f4,ab4,c5] [bb4,db5,f5] [db4,f4,ab4] [c4,eb4,g4]>")
    .sound("triangle").lpf(4000).room(0.6).gain(0.08).slow(2).attack(0.2),
  // Cello — low sustained
  note("<f2 bb2 db3 c3>")
    .sound("triangle").lpf(800).room(0.5).gain(0.12).slow(4).attack(0.3).decay(0.8),
  // Violins tremolo — fast shimmer
  note("<[f5,ab5] [bb5,db6] [db5,f5] [c5,eb5]>")
    .sound("sine").lpf(5000).gain(0.06).slow(2).room(0.7)
    .gain(sine.range(0.03, 0.08).fast(8)),

  // === BRASS (4 layers) ===
  // Sax lead — melodic
  note("~ f4 ~ ab4  c5 bb4 ~ ab4  ~ f4 ~ eb4  f4 ~ ~ ~")
    .sound("sawtooth").lpf(sine.range(1500, 4500).slow(4)).resonance(6)
    .gain(0.25).room(0.4).delay(0.2).delaytime(60/122*0.5).attack(0.03).decay(0.2),
  // Brass stabs — punchy offbeats
  note("~ [f4,ab4,c5] ~ ~  ~ [bb3,db4,f4] ~ ~  ~ [db4,f4,ab4] ~ ~  ~ [c4,eb4,g4] ~ ~")
    .sound("sawtooth").lpf(2500).resonance(8).gain(0.2).decay(0.05).room(0.3),
  // Trombone — low brass fills
  note("~ ~ f3 ~  ~ ~ bb2 ~  ~ ~ db3 ~  ~ ~ c3 ~")
    .sound("sawtooth").lpf(1200).resonance(5).gain(0.18).decay(0.15).attack(0.04).room(0.3),
  // Trumpet — high staccato accents
  note("~ ~ ~ [~ c5]  ~ ~ ~ [~ bb4]  ~ ~ ~ [~ ab4]  ~ ~ ~ [~ f4]")
    .sound("sawtooth").lpf(3500).resonance(4).gain(0.15).decay(0.06).room(0.2),

  // === MELODIES (5 layers) ===
  // Main melody — soulful pentatonic
  note("f4 ab4 c5 ~ bb4 ab4 f4 ~  eb4 f4 ab4 ~ c5 bb4 ab4 f4")
    .sound("sine").lpf(3500).gain(0.18).room(0.5).delay(0.25).delaytime(60/122*0.5)
    .late(rand.range(0, 0.008)),
  // Counter melody — descending fills
  note("~ ~ ~ c5  ~ ~ bb4 ~  ~ ~ ~ ab4  ~ f4 ~ ~")
    .sound("triangle").lpf(2800).gain(0.1).room(0.4).delay(0.3).delaytime(60/122*0.25),
  // High arp — sparkling top
  note("c5 f5 ab5 c6  bb4 eb5 f5 bb5  ab4 db5 f5 ab5  g4 c5 eb5 g5")
    .sound("sine").lpf(6000).gain(0.07).room(0.6).delay(0.35).delaytime(60/122*0.25).pan(0.7),
  // Answering phrase — call and response
  note("~ ~ ~ ~  ~ ~ ~ ~  c5 bb4 ab4 f4  eb4 f4 ~ ~")
    .sound("triangle").lpf(3000).gain(0.12).room(0.5).delay(0.2).delaytime(60/122*0.5),
  // Whistle melody — high sine octave up
  note("~ ~ f5 ~  ~ ab5 ~ ~  c6 ~ bb5 ~  ~ ab5 f5 ~")
    .sound("sine").lpf(8000).gain(0.06).room(0.7).delay(0.3).delaytime(60/122*0.75).pan(0.6),

  // === TEXTURE (3 layers) ===
  // Filter sweep noise — risers
  note("c4").sound("sawtooth").lpf(sine.rangex(100, 8000).slow(16))
    .gain(0.04).room(0.5).hpf(200),
  // Pitched perc — marimba-like
  note("f5 ~ ab5 ~  ~ c6 ~ ~  bb5 ~ ~ f5  ~ ~ ab5 ~")
    .sound("sine").lpf(4000).gain(0.08).decay(0.04).room(0.3).pan(0.4),
  // Wah effect — filtered pulse
  note("[f4,ab4] ~ [bb3,db4] ~  [db4,f4] ~ [c4,eb4] ~")
    .sound("square").lpf(sine.rangex(300, 3000).fast(2)).resonance(15)
    .gain(0.08).decay(0.1).slow(2)
).cpm(122/4)

/**
 * Spike 1.2: Can node-web-audio-api play sound to speakers?
 */
import { AudioContext } from 'node-web-audio-api';

console.log('=== Spike 1.2: node-web-audio-api Playback ===\n');

const ctx = new AudioContext();
console.log(`AudioContext created: sampleRate=${ctx.sampleRate}, state=${ctx.state}`);

// Play a simple sine wave for 1 second
const osc = ctx.createOscillator();
const gain = ctx.createGain();

osc.type = 'sine';
osc.frequency.value = 440; // A4
gain.gain.value = 0.3;

osc.connect(gain);
gain.connect(ctx.destination);

console.log('Playing 440Hz sine wave for 1 second...');
osc.start();
osc.stop(ctx.currentTime + 1);

// Wait for playback to finish, then clean up
setTimeout(() => {
  console.log('  ✓ PASS - Audio played (check speakers)\n');

  // Test 2: Play a short melody
  console.log('Playing short melody (C-E-G-C)...');
  const notes = [261.63, 329.63, 392.00, 523.25]; // C4, E4, G4, C5
  const noteDuration = 0.3;

  notes.forEach((freq, i) => {
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = 'triangle';
    o.frequency.value = freq;
    g.gain.value = 0.2;
    o.connect(g);
    g.connect(ctx.destination);
    o.start(ctx.currentTime + i * noteDuration);
    o.stop(ctx.currentTime + (i + 1) * noteDuration);
  });

  setTimeout(() => {
    console.log('  ✓ PASS - Melody played\n');
    console.log('=== Spike 1.2 Complete ===');
    ctx.close();
  }, notes.length * noteDuration * 1000 + 200);
}, 1200);

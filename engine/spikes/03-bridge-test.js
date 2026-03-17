/**
 * Spike 1.3: Bridge Strudel patterns to node-web-audio-api audio output.
 *
 * Approach A: Polyfill browser globals, then use superdough's built-in synths.
 */
import * as nodeWebAudio from 'node-web-audio-api';

// ─── Step 1: Polyfill browser globals before importing Strudel ───
globalThis.AudioContext = nodeWebAudio.AudioContext;
globalThis.OfflineAudioContext = nodeWebAudio.OfflineAudioContext;
globalThis.GainNode = nodeWebAudio.GainNode;
globalThis.OscillatorNode = nodeWebAudio.OscillatorNode;
globalThis.DelayNode = nodeWebAudio.DelayNode;
globalThis.AudioWorkletNode = nodeWebAudio.AudioWorkletNode;
globalThis.BiquadFilterNode = nodeWebAudio.BiquadFilterNode;
globalThis.DynamicsCompressorNode = nodeWebAudio.DynamicsCompressorNode;
globalThis.StereoPannerNode = nodeWebAudio.StereoPannerNode;
globalThis.ChannelMergerNode = nodeWebAudio.ChannelMergerNode;
globalThis.ChannelSplitterNode = nodeWebAudio.ChannelSplitterNode;
globalThis.AnalyserNode = nodeWebAudio.AnalyserNode;
globalThis.ConvolverNode = nodeWebAudio.ConvolverNode;
globalThis.AudioBuffer = nodeWebAudio.AudioBuffer;

// Minimal window/document stubs so superdough doesn't crash
const eventTarget = new EventTarget();
globalThis.window = globalThis;
globalThis.addEventListener = eventTarget.addEventListener.bind(eventTarget);
globalThis.removeEventListener = eventTarget.removeEventListener.bind(eventTarget);
globalThis.dispatchEvent = eventTarget.dispatchEvent.bind(eventTarget);
globalThis.postMessage = (data) => {
  globalThis.dispatchEvent(new MessageEvent('message', { data }));
};
globalThis.CustomEvent = class CustomEvent extends Event {
  constructor(type, params = {}) {
    super(type);
    this.detail = params.detail || null;
  }
};
globalThis.MessageEvent = class MessageEvent extends Event {
  constructor(type, init = {}) {
    super(type);
    this.data = init.data || null;
  }
};
globalThis.document = {
  addEventListener: () => {},
  removeEventListener: () => {},
  createElement: () => ({ getContext: () => ({}) }),
  dispatchEvent: () => {},
};

console.log('=== Spike 1.3: Strudel→Audio Bridge ===\n');

// ─── Step 2: Import Strudel after polyfills ───
const { mini } = await import('@strudel/mini');
await import('@strudel/tonal');
const superdough = await import('superdough');
const { webaudioOutput, webaudioOutputTrigger } = await import('@strudel/webaudio');

console.log('All modules loaded');
console.log('superdough exports:', Object.keys(superdough).slice(0, 20).join(', '));

// ─── Step 3: Initialize audio ───
const ac = superdough.getAudioContext();
console.log(`AudioContext: sampleRate=${ac.sampleRate}, state=${ac.state}`);

// Register built-in synth sounds
superdough.registerSynthSounds();
console.log('Synth sounds registered');

// Initialize audio without worklets (worklets need special handling in Node)
try {
  // Override the window check in initAudio by temporarily setting window
  await superdough.initAudio({ disableWorklets: true });
  console.log('initAudio done (worklets disabled)');
} catch (err) {
  console.log('initAudio skipped:', err.message);
}

// ─── Step 4: Try to play a note using superdough directly ───
console.log('\nTest 1: Direct superdough call (sine wave)...');
try {
  const t = ac.currentTime + 0.1;
  superdough.superdough(
    { s: 'sine', note: 60, gain: 0.5, duration: 0.5, attack: 0.01, release: 0.1 },
    t,
    0.5,
    1
  );
  console.log('  superdough() called — listening for audio...');
} catch (err) {
  console.error('  ✗ Error:', err.message);
}

// ─── Step 5: Try pattern-driven playback ───
setTimeout(() => {
  console.log('\nTest 2: Pattern-driven playback...');
  try {
    const pattern = mini('c4 e4 g4 c5').note();
    const events = pattern.queryArc(0, 1);
    const cps = 1; // cycles per second
    const now = ac.currentTime + 0.1;

    for (const hap of events) {
      const onset = now + Number(hap.whole.begin) / cps;
      const duration = Number(hap.duration) / cps;
      const value = { ...hap.value, s: 'triangle', gain: 0.4, duration };

      try {
        superdough.superdough(value, onset, duration, cps);
        console.log(`  Scheduled: note=${value.note} at t=${onset.toFixed(3)}`);
      } catch (err) {
        console.error(`  ✗ Event error:`, err.message);
      }
    }
  } catch (err) {
    console.error('  ✗ Pattern error:', err.message);
  }
}, 1000);

// ─── Step 6: Give time for audio to play, then exit ───
setTimeout(() => {
  console.log('\n=== Spike 1.3 Complete ===');
  console.log('(Did you hear sine waves + a triangle melody?)');
  ac.close();
  process.exit(0);
}, 4000);

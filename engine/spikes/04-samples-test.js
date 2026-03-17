/**
 * Spike 1.4: Can we load and play samples (bd, sd, hh, cp) in Node.js?
 *
 * Strudel loads samples from GitHub via fetch → decodeAudioData.
 * Node.js 22 has native fetch; node-web-audio-api has decodeAudioData.
 */
import * as nodeWebAudio from 'node-web-audio-api';

// ─── Polyfills ───
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

console.log('=== Spike 1.4: Sample Loading & Playback ===\n');

// ─── Import Strudel ───
const { mini } = await import('@strudel/mini');
await import('@strudel/tonal');
const superdough = await import('superdough');

console.log('Modules loaded');

// ─── Init audio ───
const ac = superdough.getAudioContext();
superdough.registerSynthSounds();
await superdough.initAudio({ disableWorklets: true });
console.log(`AudioContext: sampleRate=${ac.sampleRate}\n`);

// ─── Load default Strudel samples (dirt-samples from GitHub) ───
console.log('Loading samples from github:tidalcycles/dirt-samples...');
try {
  await superdough.samples('github:tidalcycles/dirt-samples');
  console.log('  ✓ Samples loaded\n');
} catch (err) {
  console.error('  ✗ Failed to load samples:', err.message);
  console.log('\n  Trying manual sample registration...');

  // Fallback: register specific samples manually
  const baseUrl = 'https://raw.githubusercontent.com/tidalcycles/dirt-samples/master/';
  const sampleMap = {
    bd: [`${baseUrl}bd/BT0A0A7.wav`],
    sd: [`${baseUrl}sd/ST0T0S3.wav`],
    hh: [`${baseUrl}hh/000_hh3closedhh.wav`],
    cp: [`${baseUrl}cp/HANDCLP0.wav`],
  };

  for (const [name, urls] of Object.entries(sampleMap)) {
    superdough.registerSound(
      name,
      (t, value, onended) => superdough.onTriggerSample(t, value, onended, urls),
      { type: 'sample', samples: urls }
    );
  }
  console.log('  ✓ Manual samples registered\n');
}

// ─── Play a drum pattern ───
console.log('Playing drum pattern: s("bd sd hh cp")...');
try {
  const pattern = mini('bd sd hh cp');
  const events = pattern.queryArc(0, 1);
  const cps = 0.5; // slower to hear each hit
  const now = ac.currentTime + 0.5;

  for (const hap of events) {
    const onset = now + Number(hap.whole.begin) / cps;
    const duration = Number(hap.duration) / cps;
    const value = { s: hap.value, gain: 0.8, duration, n: 0 };

    try {
      superdough.superdough(value, onset, duration, cps);
      console.log(`  Scheduled: s=${hap.value} at t=${onset.toFixed(3)}`);
    } catch (err) {
      console.error(`  ✗ Error scheduling ${hap.value}:`, err.message);
    }
  }
} catch (err) {
  console.error('  ✗ Pattern error:', err.message);
}

// Wait for playback
setTimeout(() => {
  console.log('\n=== Spike 1.4 Complete ===');
  console.log('(Did you hear bd, sd, hh, cp drum hits?)');
  ac.close();
  process.exit(0);
}, 6000);

/**
 * Spike 1.5: Can we tap superdough's audio output with an AnalyserNode?
 *
 * superdough routes all audio through: destinationGain -> ac.destination
 * We intercept by proxying ac.destination so the chain becomes:
 *   destinationGain -> analyserNode -> realDestination
 */
import * as nodeWebAudio from 'node-web-audio-api';

// ─── Polyfills (same as 04) ───
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

console.log('=== Spike 1.5: AnalyserNode Tap ===\n');

// ─── Strategy: Patch AudioContext so .destination returns a proxy ───
// superdough's initializeAudioOutput() does:
//   destinationGain.connect(audioContext.destination)
// We replace .destination with an AnalyserNode that forwards to the real destination.

const OriginalAudioContext = globalThis.AudioContext;
let analyser = null;

globalThis.AudioContext = class PatchedAudioContext extends OriginalAudioContext {
  constructor(...args) {
    super(...args);
    const realDestination = super.destination;

    // Create analyser and connect it to the real destination
    analyser = new nodeWebAudio.AnalyserNode(this, {
      fftSize: 2048,
      smoothingTimeConstant: 0.8,
    });
    analyser.connect(realDestination);

    // Create a Proxy around the analyser that delegates destination-specific
    // properties (maxChannelCount, channelCount) to the real destination
    const destinationProxy = new Proxy(analyser, {
      get(target, prop, receiver) {
        // Properties that must come from the real AudioDestinationNode
        if (prop === 'maxChannelCount') {
          return realDestination.maxChannelCount;
        }
        if (prop === 'channelCount') {
          return realDestination.channelCount;
        }
        // Methods need proper binding
        const val = Reflect.get(target, prop, receiver);
        if (typeof val === 'function') {
          return val.bind(target);
        }
        return val;
      },
      set(target, prop, value) {
        if (prop === 'channelCount') {
          realDestination.channelCount = value;
          return true;
        }
        target[prop] = value;
        return true;
      },
    });

    // Override .destination to return the proxy
    Object.defineProperty(this, 'destination', {
      get() {
        return destinationProxy;
      },
      configurable: true,
    });

    console.log('  [patch] AudioContext created, destination proxied through AnalyserNode');
  }
};

// ─── Import Strudel ───
const { mini } = await import('@strudel/mini');
await import('@strudel/tonal');
const superdough = await import('superdough');

console.log('Modules loaded');

// ─── Init audio ───
const ac = superdough.getAudioContext();
superdough.registerSynthSounds();
await superdough.initAudio({ disableWorklets: true });
console.log(`AudioContext: sampleRate=${ac.sampleRate}`);

// ─── Load samples ───
console.log('Loading samples...');
await superdough.samples('github:tidalcycles/dirt-samples');
console.log('  Samples loaded\n');

// ─── Play a drum pattern ───
console.log('Playing: s("bd sd hh cp")');
const pattern = mini('bd sd hh cp');
const events = pattern.queryArc(0, 1);
const cps = 0.5;
const now = ac.currentTime + 0.5;

for (const hap of events) {
  const onset = now + Number(hap.whole.begin) / cps;
  const duration = Number(hap.duration) / cps;
  const value = { s: hap.value, gain: 0.8, duration, n: 0 };
  superdough.superdough(value, onset, duration, cps);
  console.log(`  Scheduled: s=${hap.value} at t=${onset.toFixed(3)}`);
}

// ─── Read frequency data every 100ms ───
console.log('\nReading frequency data from AnalyserNode...\n');

const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);
let sampleCount = 0;
let nonZeroSeen = false;

const interval = setInterval(() => {
  analyser.getByteFrequencyData(dataArray);

  // Sum first 64 bins to check for signal
  const sum = dataArray.slice(0, 64).reduce((a, b) => a + b, 0);
  const max = Math.max(...dataArray.slice(0, 64));
  const nonZero = sum > 0;

  if (nonZero) nonZeroSeen = true;

  console.log(
    `  [${sampleCount}] sum=${sum} max=${max} ${nonZero ? 'SIGNAL' : 'silent'} ` +
    `first8=[${Array.from(dataArray.slice(0, 8)).join(',')}]`
  );

  sampleCount++;
  if (sampleCount >= 30) {
    clearInterval(interval);
    console.log('\n=== Results ===');
    console.log(`Non-zero frequency data seen: ${nonZeroSeen ? 'YES' : 'NO'}`);
    if (nonZeroSeen) {
      console.log('AnalyserNode destination proxy WORKS!');
    } else {
      console.log('AnalyserNode destination proxy FAILED - data is all zeros');
    }
    console.log('\n=== Spike 1.5 Complete ===');
    ac.close();
    process.exit(0);
  }
}, 100);

// Safety timeout
setTimeout(() => {
  clearInterval(interval);
  console.log('\nTimeout reached');
  ac.close();
  process.exit(1);
}, 10000);

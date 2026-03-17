/**
 * Browser API polyfills for running Strudel/superdough in Node.js.
 * Must be imported BEFORE any Strudel modules.
 */
import * as nodeWebAudio from 'node-web-audio-api';

// AnalyserNode tap: proxy AudioContext.destination through an AnalyserNode
// so we can read frequency data for waveform visualization.
export let masterAnalyser = null;

const OriginalAudioContext = nodeWebAudio.AudioContext;
class PatchedAudioContext extends OriginalAudioContext {
  constructor(...args) {
    super(...args);
    const realDestination = super.destination;

    masterAnalyser = new nodeWebAudio.AnalyserNode(this, {
      fftSize: 256,
      smoothingTimeConstant: 0.8,
    });
    masterAnalyser.connect(realDestination);

    const destinationProxy = new Proxy(masterAnalyser, {
      get(target, prop, receiver) {
        if (prop === 'maxChannelCount') return realDestination.maxChannelCount;
        if (prop === 'channelCount') return realDestination.channelCount;
        const val = Reflect.get(target, prop, receiver);
        if (typeof val === 'function') return val.bind(target);
        return val;
      },
      set(target, prop, value) {
        if (prop === 'channelCount') { realDestination.channelCount = value; return true; }
        target[prop] = value;
        return true;
      },
    });

    Object.defineProperty(this, 'destination', {
      get() { return destinationProxy; },
      configurable: true,
    });
  }
}

// Web Audio API classes
globalThis.AudioContext = PatchedAudioContext;
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

// Window/document stubs
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

/**
 * Browser API polyfills for running Strudel/superdough in Node.js.
 * Must be imported BEFORE any Strudel modules.
 */
import * as nodeWebAudio from 'node-web-audio-api';

// Web Audio API classes
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

/**
 * LiveCode Engine Core
 *
 * Manages Strudel pattern evaluation, audio scheduling, and playback lifecycle.
 * Uses superdough for audio synthesis and @strudel/core's Cyclist for scheduling.
 */
import './polyfills.js';

import { evalScope } from '@strudel/core';
import { transpiler } from '@strudel/transpiler';
import {
  getAudioContext,
  initAudio,
  registerSynthSounds,
  samples,
  panic,
} from 'superdough';
import { webaudioRepl } from '@strudel/webaudio';

let repl = null;
let currentCode = null;
let state = 'stopped'; // 'stopped' | 'playing' | 'loading'
let initPromise = null;

/**
 * Initialize the audio engine. Call once before play/swap.
 */
export async function init() {
  if (initPromise) return initPromise;

  initPromise = (async () => {
    const ac = getAudioContext();
    registerSynthSounds();
    await initAudio({ disableWorklets: true });

    // Register Strudel DSL functions (s, note, sound, etc.) on globalThis
    // so that repl.evaluate() can use them in code strings
    await evalScope(
      import('@strudel/core'),
      import('@strudel/mini'),
      import('@strudel/tonal'),
      import('@strudel/webaudio'),
      import('superdough'),
    );

    // Load default dirt-samples
    state = 'loading';
    await samples('github:tidalcycles/dirt-samples');
    state = 'stopped';

    // Create the webaudio repl with the mini notation transpiler
    repl = webaudioRepl({
      transpiler,
      onError: (err) => {
        console.error('[engine] scheduler error:', err.message);
      },
    });

    return { sampleRate: ac.sampleRate };
  })();

  return initPromise;
}

/**
 * Evaluate Strudel code and start playback.
 */
export async function play(code) {
  await init();

  await repl.evaluate(code);
  // repl.evaluate catches errors internally and sets state.evalError
  if (repl.state.evalError) {
    return { ok: false, error: repl.state.evalError.message };
  }
  currentCode = code;
  state = 'playing';
  return { ok: true, state };
}

/**
 * Hot-swap to new code without stopping the scheduler.
 * The Cyclist scheduler continues running — we just replace the pattern.
 */
export async function swap(code) {
  if (state !== 'playing') {
    return play(code);
  }

  await init();

  await repl.evaluate(code);
  if (repl.state.evalError) {
    return { ok: false, error: repl.state.evalError.message };
  }
  currentCode = code;
  return { ok: true, state };
}

/**
 * Stop playback.
 */
export function stop() {
  if (repl) {
    repl.stop();
    panic(); // mute any lingering audio
  }
  state = 'stopped';
  return { ok: true, state };
}

/**
 * Get current engine status.
 */
export function status() {
  return {
    state,
    code: currentCode,
    cps: repl?.scheduler?.cps ?? null,
  };
}

/**
 * LiveCode Engine Core
 *
 * Manages Strudel pattern evaluation, audio scheduling, and playback lifecycle.
 * Uses superdough for audio synthesis and @strudel/core's Cyclist for scheduling.
 */
import './polyfills.js';

import { performance, PerformanceObserver } from 'node:perf_hooks';
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
let currentLabel = null;
let playStartTime = null;
let state = 'stopped'; // 'stopped' | 'playing' | 'loading'
let initPromise = null;
const engineStartTime = Date.now();

// --- GC pause monitoring ---
const gcStats = { count: 0, totalMs: 0, maxMs: 0, warnings: 0 };
const GC_WARN_THRESHOLD_MS = 10;

try {
  const obs = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      const durationMs = entry.duration;
      gcStats.count++;
      gcStats.totalMs += durationMs;
      if (durationMs > gcStats.maxMs) gcStats.maxMs = durationMs;
      if (durationMs > GC_WARN_THRESHOLD_MS) {
        gcStats.warnings++;
        console.warn(`[engine] GC pause ${durationMs.toFixed(1)}ms (${entry.detail?.kind ?? entry.name})`);
      }
    }
  });
  obs.observe({ entryTypes: ['gc'] });
} catch {
  // --expose-gc / gc perf entries not available — silent fallback
}

// --- Audio context watchdog ---
let watchdogInterval = null;
let lastAudioTime = 0;
let lastWallTime = 0;
let audioStalls = 0;

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

    // Start audio context watchdog
    lastAudioTime = ac.currentTime;
    lastWallTime = performance.now();
    watchdogInterval = setInterval(() => {
      const now = performance.now();
      const audioNow = ac.currentTime;
      const wallDelta = (now - lastWallTime) / 1000;
      const audioDelta = audioNow - lastAudioTime;
      if (state === 'playing' && wallDelta > 0.5 && audioDelta < wallDelta * 0.5) {
        audioStalls++;
        console.error(`[engine] audio stall detected: audio advanced ${audioDelta.toFixed(3)}s in ${wallDelta.toFixed(3)}s wall-clock`);
      }
      lastAudioTime = audioNow;
      lastWallTime = now;
    }, 1000);

    return { sampleRate: ac.sampleRate };
  })();

  return initPromise;
}

/**
 * Evaluate Strudel code and start playback.
 */
export async function play(code, label) {
  await init();

  const t0 = performance.now();
  await repl.evaluate(code);
  const evalMs = performance.now() - t0;
  if (evalMs > 50) {
    console.warn(`[engine] slow evaluate: ${evalMs.toFixed(1)}ms (play)`);
  }
  // repl.evaluate catches errors internally and sets state.evalError
  if (repl.state.evalError) {
    return { ok: false, error: repl.state.evalError.message };
  }
  currentCode = code;
  currentLabel = label || null;
  playStartTime = Date.now();
  state = 'playing';
  return { ok: true, state };
}

/**
 * Hot-swap to new code without stopping the scheduler.
 * The Cyclist scheduler continues running — we just replace the pattern.
 */
export async function swap(code, label) {
  if (state !== 'playing') {
    return play(code, label);
  }

  await init();

  const t0 = performance.now();
  await repl.evaluate(code);
  const evalMs = performance.now() - t0;
  if (evalMs > 50) {
    console.warn(`[engine] slow evaluate: ${evalMs.toFixed(1)}ms (swap)`);
  }
  if (repl.state.evalError) {
    return { ok: false, error: repl.state.evalError.message };
  }
  currentCode = code;
  currentLabel = label || null;
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
  playStartTime = null;
  return { ok: true, state };
}

/**
 * Get current engine status.
 */
export function status() {
  return {
    state,
    code: currentCode,
    label: currentLabel,
    cps: repl?.scheduler?.cps ?? null,
    playingSince: playStartTime ?? null,
  };
}

import { masterAnalyser } from './polyfills.js';
export function getAnalyser() { return masterAnalyser; }

/**
 * Health diagnostics for audio engine monitoring.
 */
export function getHealthStats() {
  const mem = process.memoryUsage();
  let ac = null;
  try { ac = getAudioContext(); } catch {}

  return {
    uptime: Date.now() - engineStartTime,
    memory: {
      rss: mem.rss,
      heapUsed: mem.heapUsed,
      heapTotal: mem.heapTotal,
      external: mem.external,
      arrayBuffers: mem.arrayBuffers,
    },
    audio: {
      state: ac?.state ?? 'unavailable',
      currentTime: ac?.currentTime ?? null,
      sampleRate: ac?.sampleRate ?? null,
      stalls: audioStalls,
    },
    gc: { ...gcStats },
  };
}

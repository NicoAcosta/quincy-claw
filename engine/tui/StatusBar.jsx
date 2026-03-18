import React from 'react';
import { Box, Text } from 'ink';
import { useEngine, useHealth } from './useEngine.js';

function formatElapsed(since) {
  if (!since) return '';
  const secs = Math.floor((Date.now() - since) / 1000);
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

function formatMB(bytes) {
  return `${(bytes / 1048576).toFixed(0)}M`;
}

export function StatusBar() {
  const { state, cps, label, code, playingSince } = useEngine();
  const health = useHealth();
  const playing = state === 'playing';
  const icon = playing ? '♫' : '⏹';
  const elapsed = formatElapsed(playingSince);
  const bpm = cps ? Math.round(cps * 60 * 4) : '';
  const desc = label || (code ? code.slice(0, 40) : '');
  const parts = [icon, elapsed, bpm && `${bpm} BPM`, desc].filter(Boolean).join(' · ');

  // Health indicators (compact)
  let healthText = '';
  if (health) {
    const mem = formatMB(health.memory.heapUsed);
    const gcW = health.gc.warnings;
    const stalls = health.audio.stalls;
    healthText = `heap:${mem}`;
    if (gcW > 0) healthText += ` gc⚠${gcW}`;
    if (stalls > 0) healthText += ` stall⚠${stalls}`;
  }

  return (
    <Box justifyContent="space-between">
      <Text color={playing ? 'green' : 'gray'} dimColor={!playing}>{parts}</Text>
      {healthText ? <Text color={health?.gc.warnings > 0 || health?.audio.stalls > 0 ? 'yellow' : 'gray'} dimColor>{healthText}</Text> : null}
    </Box>
  );
}

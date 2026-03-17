import React from 'react';
import { Box, Text } from 'ink';
import { useEngine } from './useEngine.js';

function formatElapsed(since) {
  if (!since) return '';
  const secs = Math.floor((Date.now() - since) / 1000);
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

export function StatusBar() {
  const { state, cps, label, code, playingSince } = useEngine();
  const playing = state === 'playing';
  const icon = playing ? '♫' : '⏹';
  const elapsed = formatElapsed(playingSince);
  const bpm = cps ? Math.round(cps * 60 * 4) : '';
  const desc = label || (code ? code.slice(0, 40) : '');
  const parts = [icon, elapsed, bpm && `${bpm} BPM`, desc].filter(Boolean).join(' · ');

  return (
    <Box>
      <Text color={playing ? 'green' : 'gray'} dimColor={!playing}>{parts}</Text>
    </Box>
  );
}

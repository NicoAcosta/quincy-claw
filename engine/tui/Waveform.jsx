import React from 'react';
import { Box, Text } from 'ink';
import { useWaveform } from './useWaveform.js';

const BLOCKS = ' ▁▂▃▄▅▆▇█';

export function Waveform() {
  const width = process.stdout.columns || 80;
  const line = useWaveform(width);

  const mirrored = [...line].map(ch => {
    const i = BLOCKS.indexOf(ch);
    return BLOCKS[Math.max(0, 8 - i)] || ' ';
  }).join('');

  return (
    <Box flexDirection="column" height={2}>
      <Text color="cyan">{line}</Text>
      <Text color="blue">{mirrored}</Text>
    </Box>
  );
}

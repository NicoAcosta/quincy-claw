import React from 'react';
import { Box, Text } from 'ink';
import { useWaveform } from './useWaveform.js';

const BLOCKS = '▁▂▃▄▅▆▇█';

export function Waveform() {
  const width = process.stdout.columns || 80;
  const line = useWaveform(width);

  // Mirror: index i on line 1 maps to BLOCKS[7 - i] on line 2
  const mirrored = [...line].map(ch => {
    const i = BLOCKS.indexOf(ch);
    if (i < 0) return BLOCKS[0];
    return BLOCKS[7 - i];
  }).join('');

  return (
    <Box flexDirection="column" height={2}>
      <Text color="cyan">{line}</Text>
      <Text color="blue">{mirrored}</Text>
    </Box>
  );
}

import React from 'react';
import { Box, Text } from 'ink';
import { Waveform } from './Waveform.jsx';
import { StatusBar } from './StatusBar.jsx';

export function App({ port }) {
  return (
    <Box flexDirection="column" height={process.stdout.rows || 24}>
      <Waveform />
      <StatusBar />
      <Box flexDirection="column" flexGrow={1} borderStyle="single" borderTop borderBottom={false} borderLeft={false} borderRight={false}>
        <Text color="gray">Welcome to LiveCode TUI. Describe what you want to hear.</Text>
      </Box>
      <Box>
        <Text color="gray">&gt; </Text>
        <Text dimColor>type here...</Text>
      </Box>
    </Box>
  );
}

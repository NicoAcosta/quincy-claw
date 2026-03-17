import React from 'react';
import { Box, Text } from 'ink';

export function App({ port }) {
  return (
    <Box flexDirection="column">
      <Text>LiveCode TUI loading... (engine on port {port})</Text>
    </Box>
  );
}

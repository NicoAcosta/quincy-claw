import React from 'react';
import { Box, Text } from 'ink';

export function ChatMessage({ role, text, streaming }) {
  const prefix = role === 'user' ? 'you' : role === 'claude' ? 'claudio' : '';
  const color = role === 'user' ? 'yellow' : role === 'system' ? 'gray' : 'white';

  // Detect and style code blocks
  const parts = [];
  const lines = (text || '').split('\n');
  let inCode = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith('```')) {
      inCode = !inCode;
      continue;
    }
    parts.push({ text: line, isCode: inCode });
  }

  return (
    <Box flexDirection="column" marginBottom={role !== 'tool' ? 1 : 0}>
      {prefix && <Text color={color} bold>{prefix}:</Text>}
      {parts.map((part, i) => (
        <Text key={i} color={part.isCode ? 'green' : color} dimColor={part.isCode}>
          {prefix ? '  ' : ''}{part.text}
        </Text>
      ))}
      {streaming && <Text color="gray" dimColor>▍</Text>}
    </Box>
  );
}

export function ToolStatus({ name, input }) {
  // Render tool use as friendly status
  let label = 'Working...';
  if (name === 'Bash' && input) {
    if (input.includes('/play')) label = '▶ Playing pattern...';
    else if (input.includes('/swap')) label = '↻ Swapping pattern...';
    else if (input.includes('/stop')) label = '⏹ Stopping...';
    else label = `⚙ Running command...`;
  }
  return (
    <Text color="gray" dimColor>  {label}</Text>
  );
}

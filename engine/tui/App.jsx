import React, { useState, useCallback } from 'react';
import { Box, Text, useInput, useApp } from 'ink';
import { Waveform } from './Waveform.jsx';
import { StatusBar } from './StatusBar.jsx';
import { InputBar } from './InputBar.jsx';
import { stop, play, status as engineStatus } from '../core.js';

export function App({ port }) {
  const { exit } = useApp();
  const [messages, setMessages] = useState([
    { role: 'system', text: 'Welcome to LiveCode TUI. Describe what you want to hear.' },
  ]);

  const handleSubmit = useCallback((text) => {
    setMessages(prev => [...prev, { role: 'user', text }]);
    // TODO: send to Claude subprocess (Task 7+8)
  }, []);

  useInput((input, key) => {
    // Escape → stop playback
    if (key.escape) {
      stop();
      return;
    }

    // Ctrl+L → clear chat
    if (input === 'l' && key.ctrl) {
      setMessages([{ role: 'system', text: 'Chat cleared.' }]);
      return;
    }
  });

  return (
    <Box flexDirection="column" height={process.stdout.rows || 24}>
      <Waveform />
      <StatusBar />
      <Box
        flexDirection="column"
        flexGrow={1}
        borderStyle="single"
        borderTop
        borderBottom={false}
        borderLeft={false}
        borderRight={false}
        paddingLeft={1}
      >
        {messages.map((msg, i) => (
          <Text key={`msg-${i}`} color={msg.role === 'user' ? 'yellow' : msg.role === 'system' ? 'gray' : 'white'}>
            {msg.role === 'user' ? `you: ${msg.text}` : msg.role === 'system' ? msg.text : `claude: ${msg.text}`}
          </Text>
        ))}
      </Box>
      <InputBar onSubmit={handleSubmit} />
    </Box>
  );
}

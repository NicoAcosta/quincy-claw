import React from 'react';
import { Box, Text } from 'ink';
import { ChatMessage, ToolStatus } from './ChatMessage.jsx';

export function ChatPanel({ messages, streamingText, streamingTool, thinking }) {
  // Calculate how many messages to show based on available space
  // Show all messages, letting Ink handle overflow
  return (
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
        <ChatMessage key={`msg-${i}`} role={msg.role} text={msg.text} />
      ))}

      {thinking && streamingText === null && (
        <Text color="gray" dimColor>claudio is thinking...</Text>
      )}

      {streamingTool && (
        <ToolStatus name={streamingTool.name} input={streamingTool.input} />
      )}

      {streamingText !== null && (
        <ChatMessage role="claude" text={streamingText} streaming />
      )}
    </Box>
  );
}

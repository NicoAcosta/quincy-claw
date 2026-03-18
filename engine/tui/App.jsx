import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Box, useInput, useApp } from 'ink';
import { Waveform } from './Waveform.jsx';
import { StatusBar } from './StatusBar.jsx';
import { ChatPanel } from './ChatPanel.jsx';
import { InputBar } from './InputBar.jsx';
import { createClaude } from './claude.js';
import { stop, play, status as engineStatus } from '../core.js';
import { setClaudeInstance } from './state.js';

export function App({ port }) {
  const { exit } = useApp();
  const [messages, setMessages] = useState([
    { role: 'system', text: 'Quincy Claw — six ways to make music:\n\n  /play        — Describe what you want, I\'ll play it. Fast and direct.\n  /studio      — Build a track together, layer by layer. You make the decisions.\n  /vibe        — Describe a feeling or scene, I\'ll translate it to sound.\n  /play-flow   — One-shot evolving track. Full arrangement with builds and drops.\n  /studio-flow — Build the palette together, then I\'ll arrange a full track.\n  /vibe-flow   — Describe the mood, then drift through an evolving journey.\n\nOr just tell me what you want to hear.' },
  ]);
  const [streamingText, setStreamingText] = useState(null);
  const [streamingTool, setStreamingTool] = useState(null);
  const [thinking, setThinking] = useState(false);
  const [claudeError, setClaudeError] = useState(null);
  const claudeRef = useRef(null);
  const toolInputRef = useRef('');

  // Initialize Claude subprocess manager
  useEffect(() => {
    const claude = createClaude(
      (msg) => {
        switch (msg.type) {
          case 'text_start':
            setThinking(false);
            setStreamingText('');
            break;
          case 'text':
            setStreamingText(prev => (prev ?? '') + msg.content);
            break;
          case 'tool_start':
            setStreamingTool({ name: msg.name, input: '' });
            toolInputRef.current = '';
            break;
          case 'tool_input':
            toolInputRef.current += msg.content;
            setStreamingTool(prev => prev ? { ...prev, input: toolInputRef.current } : null);
            break;
          case 'done':
            // Commit the streamed text as a final message
            setStreamingText(prev => {
              if (prev !== null && prev.trim()) {
                setMessages(msgs => [...msgs, { role: 'claude', text: prev.trim() }]);
              }
              return null;
            });
            setStreamingTool(null);
            setThinking(false);
            break;
        }
      },
      (error) => {
        setClaudeError(error);
        setThinking(false);
        setStreamingText(null);
        setStreamingTool(null);
        setMessages(prev => [...prev, { role: 'system', text: error }]);
      }
    );
    claudeRef.current = claude;
    setClaudeInstance(claude);

    // Surface prompt warnings
    const warnings = claude.getWarnings();
    if (warnings.length > 0) {
      setMessages(prev => [...prev, { role: 'system', text: `Warning: ${warnings.join('; ')}` }]);
    }

    return () => claude.kill();
  }, []);

  const handleSubmit = useCallback((text) => {
    setMessages(prev => [...prev, { role: 'user', text }]);
    setThinking(true);
    setClaudeError(null);
    claudeRef.current?.send(text);
  }, []);

  useInput((input, key) => {
    // Escape → stop playback
    if (key.escape) {
      stop();
      return;
    }

    // Ctrl+L → clear chat and kill any active Claude response
    if (input === 'l' && key.ctrl) {
      if (claudeRef.current?.isActive()) {
        claudeRef.current.kill();
        claudeRef.current.restart();
      }
      setMessages([{ role: 'system', text: 'Chat cleared.' }]);
      setStreamingText(null);
      setStreamingTool(null);
      setThinking(false);
      return;
    }

    // Ctrl+R → restart Claude
    if (input === 'r' && key.ctrl) {
      claudeRef.current?.restart();
      setClaudeError(null);
      setMessages(prev => [...prev, { role: 'system', text: 'Claude reconnected.' }]);
      return;
    }

    // Ctrl+Space → toggle play/stop
    if (input === ' ' && key.ctrl) {
      const { state, code } = engineStatus();
      if (state === 'playing') {
        stop();
      } else if (code) {
        play(code);
      }
      return;
    }
  });

  return (
    <Box flexDirection="column" height={process.stdout.rows || 24}>
      <Waveform />
      <StatusBar />
      <ChatPanel
        messages={messages}
        streamingText={streamingText}
        streamingTool={streamingTool}
        thinking={thinking}
      />
      <InputBar onSubmit={handleSubmit} />
    </Box>
  );
}

import React, { useState, useCallback, useRef } from 'react';
import { Box, Text, useInput } from 'ink';
import TextInput from 'ink-text-input';

const MAX_HISTORY = 20;

export function InputBar({ onSubmit, disabled }) {
  const [value, setValue] = useState('');
  const [historyIndex, setHistoryIndex] = useState(-1);
  const historyRef = useRef([]);
  const savedRef = useRef('');

  const handleSubmit = useCallback((text) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    // Add to history ring buffer
    const history = historyRef.current;
    // Don't duplicate if same as last entry
    if (history[0] !== trimmed) {
      history.unshift(trimmed);
      if (history.length > MAX_HISTORY) history.pop();
    }

    setHistoryIndex(-1);
    setValue('');
    onSubmit?.(trimmed);
  }, [onSubmit]);

  useInput((input, key) => {
    if (disabled) return;

    const history = historyRef.current;

    if (key.upArrow && history.length > 0) {
      if (historyIndex === -1) {
        savedRef.current = value;
      }
      const next = Math.min(historyIndex + 1, history.length - 1);
      setHistoryIndex(next);
      setValue(history[next]);
    }

    if (key.downArrow) {
      if (historyIndex > 0) {
        const next = historyIndex - 1;
        setHistoryIndex(next);
        setValue(historyRef.current[next]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setValue(savedRef.current);
      }
    }
  });

  return (
    <Box>
      <Text color="gray">&gt; </Text>
      <TextInput
        value={value}
        onChange={setValue}
        onSubmit={handleSubmit}
        placeholder="type here..."
        focus={!disabled}
      />
    </Box>
  );
}

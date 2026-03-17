import { useState, useEffect } from 'react';
import { status } from '../core.js';

export function useEngine(intervalMs = 1000) {
  const [engine, setEngine] = useState(status());
  useEffect(() => {
    const id = setInterval(() => setEngine(status()), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);
  return engine;
}

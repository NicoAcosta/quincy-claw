import { useState, useEffect } from 'react';
import { status } from '../core.js';
import { getHealthStats } from '../core.js';

export function useEngine(intervalMs = 1000) {
  const [engine, setEngine] = useState(status());
  useEffect(() => {
    const id = setInterval(() => setEngine(status()), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);
  return engine;
}

export function useHealth(intervalMs = 2000) {
  const [health, setHealth] = useState(null);
  useEffect(() => {
    setHealth(getHealthStats());
    const id = setInterval(() => setHealth(getHealthStats()), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);
  return health;
}

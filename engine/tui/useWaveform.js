import { useState, useEffect, useRef } from 'react';
import { getAnalyser } from '../core.js';

const BLOCKS = ' ▁▂▃▄▅▆▇█';

export function useWaveform(width, fps = 15) {
  const [line, setLine] = useState('');
  const bufRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const analyser = getAnalyser();
      if (!analyser || analyser.frequencyBinCount === 0) {
        // Idle breathing animation
        const t = Date.now() / 1000;
        const chars = Array.from({ length: width }, (_, i) => {
          const v = 0.15 + 0.1 * Math.sin(t * 0.8 + i * 0.15);
          return BLOCKS[Math.round(v * 8)];
        });
        setLine(chars.join(''));
        return;
      }
      if (!bufRef.current || bufRef.current.length !== analyser.frequencyBinCount) {
        bufRef.current = new Uint8Array(analyser.frequencyBinCount);
      }
      analyser.getByteFrequencyData(bufRef.current);
      const buf = bufRef.current;

      // Check if there's any signal
      let hasSignal = false;
      for (let i = 0; i < buf.length; i++) {
        if (buf[i] > 0) { hasSignal = true; break; }
      }

      if (!hasSignal) {
        // Idle breathing when no audio
        const t = Date.now() / 1000;
        const chars = Array.from({ length: width }, (_, i) => {
          const v = 0.15 + 0.1 * Math.sin(t * 0.8 + i * 0.15);
          return BLOCKS[Math.round(v * 8)];
        });
        setLine(chars.join(''));
        return;
      }

      const binWidth = buf.length / width;
      const chars = Array.from({ length: width }, (_, i) => {
        const start = Math.floor(i * binWidth);
        const end = Math.floor((i + 1) * binWidth);
        let sum = 0;
        for (let j = start; j < end; j++) sum += buf[j];
        const avg = sum / (end - start) / 255;
        return BLOCKS[Math.round(avg * 8)];
      });
      setLine(chars.join(''));
    }, Math.round(1000 / fps));
    return () => clearInterval(interval);
  }, [width, fps]);

  return line;
}

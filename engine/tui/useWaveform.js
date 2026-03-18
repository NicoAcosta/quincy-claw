import { useState, useEffect, useRef } from 'react';
import { getAnalyser } from '../core.js';

function breathingBins(width) {
  const t = Date.now() / 1000;
  return Array.from({ length: width }, (_, i) => {
    const x = i / width;
    // Center-weighted amplitude envelope
    const center = 1 - Math.abs(x - 0.5) * 1.2;
    // Layer 3 sine waves at different frequencies/phases
    const wave1 = Math.sin(t * 0.6 + i * 0.12);
    const wave2 = Math.sin(t * 1.1 + i * 0.08 + 1.5);
    const wave3 = Math.sin(t * 0.3 + i * 0.2 + 3.0);
    const combined = (wave1 * 0.5 + wave2 * 0.3 + wave3 * 0.2);
    return Math.max(0.03, (0.08 + 0.1 * combined) * Math.max(0.3, center));
  });
}

export function useWaveform(width, fps = 24) {
  const [data, setData] = useState({ bins: [], peaks: [], hasSignal: false });
  const bufRef = useRef(null);
  const smoothRef = useRef(null);
  const peakRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const analyser = getAnalyser();

      // Initialize smooth/peak arrays if needed
      if (!smoothRef.current || smoothRef.current.length !== width) {
        smoothRef.current = new Array(width).fill(0);
      }
      if (!peakRef.current || peakRef.current.length !== width) {
        peakRef.current = new Array(width).fill(0);
      }

      let targetBins;
      let hasSignal = false;

      if (!analyser || analyser.frequencyBinCount === 0) {
        targetBins = breathingBins(width);
      } else {
        if (!bufRef.current || bufRef.current.length !== analyser.frequencyBinCount) {
          bufRef.current = new Uint8Array(analyser.frequencyBinCount);
        }
        analyser.getByteFrequencyData(bufRef.current);
        const buf = bufRef.current;

        for (let i = 0; i < buf.length; i++) {
          if (buf[i] > 0) { hasSignal = true; break; }
        }

        if (!hasSignal) {
          targetBins = breathingBins(width);
        } else {
          const binWidth = buf.length / width;
          targetBins = Array.from({ length: width }, (_, i) => {
            const start = Math.floor(i * binWidth);
            const end = Math.floor((i + 1) * binWidth);
            let sum = 0;
            for (let j = start; j < end; j++) sum += buf[j];
            return sum / (end - start) / 255;
          });
        }
      }

      // Smooth decay: lerp toward target
      const smooth = smoothRef.current;
      const peaks = peakRef.current;
      for (let i = 0; i < width; i++) {
        const target = targetBins[i] || 0;
        // Rise fast (0.45), fall smoothly (0.12)
        const alpha = target > smooth[i] ? 0.45 : 0.12;
        smooth[i] += (target - smooth[i]) * alpha;
        // Peak hold with slow decay
        peaks[i] = Math.max(peaks[i] * 0.97, smooth[i]);
      }

      setData({
        bins: smooth.slice(),
        peaks: peaks.slice(),
        hasSignal,
      });
    }, Math.round(1000 / fps));
    return () => clearInterval(interval);
  }, [width, fps]);

  return data;
}

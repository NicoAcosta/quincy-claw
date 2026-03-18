import React from 'react';
import { Box, Text } from 'ink';
import chalk from 'chalk';
import { useWaveform } from './useWaveform.js';

const MAIN_ROWS = 6;
const MIRROR_ROWS = 2;
const MAIN_SUB_ROWS = MAIN_ROWS * 2;
const MIRROR_SUB_ROWS = MIRROR_ROWS * 2;

function hslToRgb(h, s, l) {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = l - c / 2;
  let r, g, b;
  if (h < 60) { r = c; g = x; b = 0; }
  else if (h < 120) { r = x; g = c; b = 0; }
  else if (h < 180) { r = 0; g = c; b = x; }
  else if (h < 240) { r = 0; g = x; b = c; }
  else if (h < 300) { r = x; g = 0; b = c; }
  else { r = c; g = 0; b = x; }
  return [
    Math.round((r + m) * 255),
    Math.round((g + m) * 255),
    Math.round((b + m) * 255),
  ];
}

function halfBlock(subBottom, subTop, barHeight) {
  if (barHeight > subTop) return '█';
  if (barHeight > subBottom) return '▄';
  return ' ';
}

function renderRow(bins, peaks, row, totalSubRows, hueOffset, dimFactor, showPeaks) {
  const subBottom = (totalSubRows / 2 - 1 - row) * 2;
  const subTop = subBottom + 1;
  const heightRatio = (subBottom + 1) / totalSubRows;
  const hue = (heightRatio * 270 + hueOffset) % 360;

  return bins.map((bin, col) => {
    const barHeight = Math.round(bin * totalSubRows);

    // Peak indicator: thin mark above the bar
    if (showPeaks && peaks) {
      const peakHeight = Math.round(peaks[col] * totalSubRows);
      if (peakHeight > barHeight + 1 && peakHeight > subBottom && peakHeight <= subTop + 1) {
        const gap = peakHeight - barHeight;
        const fade = Math.min(1, gap / 3);
        const [r, g, b] = hslToRgb(hue, 0.6, (0.4 + 0.4 * fade) * dimFactor);
        return chalk.rgb(r, g, b)('▔');
      }
    }

    const char = halfBlock(subBottom, subTop, barHeight);
    if (char === ' ') return ' ';

    const [r, g, b] = hslToRgb(hue, 0.85, 0.55 * dimFactor);
    return chalk.rgb(r, g, b)(char);
  }).join('');
}

export function Waveform() {
  const width = process.stdout.columns || 80;
  const { bins, peaks, hasSignal } = useWaveform(width);

  if (bins.length === 0) {
    return <Box flexDirection="column" height={MAIN_ROWS + MIRROR_ROWS} />;
  }

  const hueOffset = (Date.now() / 1000) * 20; // 20°/sec rainbow rotation

  const mainRows = Array.from({ length: MAIN_ROWS }, (_, r) => {
    const line = renderRow(bins, peaks, r, MAIN_SUB_ROWS, hueOffset, 1.0, hasSignal);
    return <Text key={r}>{line}</Text>;
  });

  const mirrorBins = bins.map(b => b * 0.35);
  const mirrorHueOffset = (360 - hueOffset) % 360;
  const mirrorRows = Array.from({ length: MIRROR_ROWS }, (_, r) => {
    const mirrorRow = MIRROR_ROWS - 1 - r;
    const line = renderRow(mirrorBins, null, mirrorRow, MIRROR_SUB_ROWS, mirrorHueOffset, 0.45, false);
    return <Text key={`m${r}`}>{line}</Text>;
  });

  return (
    <Box flexDirection="column" height={MAIN_ROWS + MIRROR_ROWS}>
      {mainRows}
      {mirrorRows}
    </Box>
  );
}

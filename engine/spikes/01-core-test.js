/**
 * Spike 1.1: Can Strudel core parse patterns and generate events in Node.js?
 */
import { mini } from '@strudel/mini';
import '@strudel/tonal';

console.log('=== Spike 1.1: Strudel Core in Node.js ===\n');

// Test 1: Basic mini notation parsing
try {
  const pattern = mini('c3 e3 g3 c4');
  const events = pattern.queryArc(0, 1);
  console.log('Test 1 - Basic notes:');
  console.log(`  Events: ${events.length}`);
  for (const e of events) {
    console.log(`  [${Number(e.whole.begin).toFixed(2)}-${Number(e.whole.end).toFixed(2)}] value=${JSON.stringify(e.value)}`);
  }
  console.log('  ✓ PASS\n');
} catch (err) {
  console.error('  ✗ FAIL:', err.message, '\n');
}

// Test 2: Drum pattern with s()
try {
  const pattern = mini('bd sd hh cp');
  const events = pattern.queryArc(0, 1);
  console.log('Test 2 - Drum sounds:');
  console.log(`  Events: ${events.length}`);
  for (const e of events) {
    console.log(`  [${Number(e.whole.begin).toFixed(2)}-${Number(e.whole.end).toFixed(2)}] value=${JSON.stringify(e.value)}`);
  }
  console.log('  ✓ PASS\n');
} catch (err) {
  console.error('  ✗ FAIL:', err.message, '\n');
}

// Test 3: More complex pattern with stacking
try {
  const pattern = mini('[bd sd, hh*4]');
  const events = pattern.queryArc(0, 1);
  console.log('Test 3 - Stacked pattern:');
  console.log(`  Events: ${events.length}`);
  for (const e of events) {
    console.log(`  [${Number(e.whole.begin).toFixed(2)}-${Number(e.whole.end).toFixed(2)}] value=${JSON.stringify(e.value)}`);
  }
  console.log('  ✓ PASS\n');
} catch (err) {
  console.error('  ✗ FAIL:', err.message, '\n');
}

// Test 4: note() via tonal
try {
  const pattern = mini('c3 e3 g3 c4').note();
  const events = pattern.queryArc(0, 1);
  console.log('Test 4 - note() via tonal:');
  console.log(`  Events: ${events.length}`);
  for (const e of events) {
    console.log(`  [${Number(e.whole.begin).toFixed(2)}-${Number(e.whole.end).toFixed(2)}] value=${JSON.stringify(e.value)}`);
  }
  console.log('  ✓ PASS\n');
} catch (err) {
  console.error('  ✗ FAIL:', err.message, '\n');
}

console.log('=== Spike 1.1 Complete ===');

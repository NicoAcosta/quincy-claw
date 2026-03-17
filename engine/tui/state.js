// Shared state between tui.js entry point and App.jsx.
// Avoids circular dependency.
let claudeInstance = null;

export function setClaudeInstance(instance) {
  claudeInstance = instance;
}

export function getClaudeInstance() {
  return claudeInstance;
}

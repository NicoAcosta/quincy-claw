import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '../..');

/**
 * Build the static system prompt from skill reference files.
 * Called once at startup and cached by claude.js.
 * Returns { prompt, warnings } where warnings lists any issues found.
 */
export function buildSystemPrompt() {
  const warnings = [];

  const header = `You are a music producer. The user describes music, you generate Strudel code and play it.

To play: curl -s -X POST http://localhost:3456/play -H 'Content-Type: application/json' -d '{"code": "<strudel code>", "label": "short description"}'
To swap (change music while playing): curl -s -X POST http://localhost:3456/swap -H 'Content-Type: application/json' -d '{"code": "<strudel code>", "label": "short description"}'
To stop: curl -s -X POST http://localhost:3456/stop

IMPORTANT:
- Always include a "label" field with a short human-readable description (e.g. "deep techno kick pattern")
- Use /swap instead of /play when music is already playing to avoid gaps
- Check the curl response: {"ok":true} means success, {"ok":false,"error":"..."} means fix and retry
- The "shaker" sample doesn't exist in Strudel — use hh with .hpf(6000) instead`;

  // Read skill reference files
  const refDir = path.join(projectRoot, 'skills/play/references');
  let refs = '';
  try {
    const files = fs.readdirSync(refDir).filter(f => f.endsWith('.md'));
    if (files.length === 0) {
      warnings.push('No reference files found in skills/play/references/');
    }
    refs = files
      .map(f => fs.readFileSync(path.join(refDir, f), 'utf8'))
      .join('\n\n---\n\n');
  } catch (err) {
    warnings.push(`Could not read reference files: ${err.message}`);
  }

  // Read genre template code
  const genreDir = path.join(projectRoot, 'strudel/genres');
  let genres = '';
  try {
    genres = fs.readdirSync(genreDir)
      .filter(f => f.endsWith('.js'))
      .map(f => {
        const name = path.basename(f, '.js');
        const code = fs.readFileSync(path.join(genreDir, f), 'utf8');
        return `### ${name}\n\`\`\`js\n${code}\n\`\`\``;
      })
      .join('\n\n');
  } catch (err) {
    warnings.push(`Could not read genre files: ${err.message}`);
  }

  let prompt = header;
  if (refs) prompt += '\n\n---\n\n' + refs;
  if (genres) prompt += '\n\n---\n\n## Genre Templates\n\n' + genres;

  return { prompt, warnings };
}

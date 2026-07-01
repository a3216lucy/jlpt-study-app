/**
 * Generate VOICEVOX audio files for all vocab-review-n3.json entries.
 * Run: node scripts/generate-vocab-audio.mjs [--speaker=30] [--force]
 *
 * Default speaker: 30 (No.7 / アナウンス)
 * Output: src/assets/audio/vocab/{entry.id}.wav
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dir = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dir, '..');

const args = Object.fromEntries(
  process.argv.slice(2)
    .filter(a => a.startsWith('--'))
    .map(a => a.slice(2).split('='))
);

const SPEAKER_ID = Number(args.speaker ?? 30);
const FORCE      = 'force' in args;
const BASE_URL   = 'http://localhost:50021';
const OUTPUT_DIR = resolve(ROOT, 'src/assets/audio/vocab');
const VOCAB_PATH = resolve(ROOT, 'src/assets/data/vocab-review-n3.json');

// Derive the best TTS text from an entry
function ttsText(entry) {
  let text = entry.reading;
  // Reading contains latin (e.g. "（英）humor") → use the word field instead
  if (/[a-zA-Z]/.test(text)) return entry.word;
  // Strip parenthetical kanji hints like （欠伸）（様々）
  text = text.replace(/（[^）]*）/g, '').trim();
  return text || entry.word;
}

async function audioQuery(text) {
  const res = await fetch(
    `${BASE_URL}/audio_query?text=${encodeURIComponent(text)}&speaker=${SPEAKER_ID}`,
    { method: 'POST' }
  );
  if (!res.ok) throw new Error(`audio_query ${res.status}: ${await res.text()}`);
  return res.json();
}

async function synthesis(query) {
  const res = await fetch(
    `${BASE_URL}/synthesis?speaker=${SPEAKER_ID}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(query),
    }
  );
  if (!res.ok) throw new Error(`synthesis ${res.status}: ${await res.text()}`);
  return Buffer.from(await res.arrayBuffer());
}

async function main() {
  const data = JSON.parse(readFileSync(VOCAB_PATH, 'utf8'));
  const entries = data.groups.flatMap(g => g.entries);

  mkdirSync(OUTPUT_DIR, { recursive: true });

  console.log(`Speaker: ${SPEAKER_ID}  Force: ${FORCE}`);
  console.log(`Output:  ${OUTPUT_DIR}\n`);

  let generated = 0, skipped = 0, failed = 0;

  for (const entry of entries) {
    const outPath = resolve(OUTPUT_DIR, `${entry.id}.wav`);

    if (!FORCE && existsSync(outPath)) {
      console.log(`  SKIP  ${entry.id}`);
      skipped++;
      continue;
    }

    const text = ttsText(entry);
    process.stdout.write(`  GEN   ${entry.id.padEnd(20)} "${text}" … `);

    try {
      const query = await audioQuery(text);
      const wav   = await synthesis(query);
      writeFileSync(outPath, wav);
      console.log(`✓ ${(wav.length / 1024).toFixed(0)} KB`);
      generated++;
    } catch (e) {
      console.log(`✗ ${e.message}`);
      failed++;
    }
  }

  console.log(`\nDone — generated: ${generated}, skipped: ${skipped}, failed: ${failed}`);
}

main().catch(e => { console.error(e); process.exit(1); });

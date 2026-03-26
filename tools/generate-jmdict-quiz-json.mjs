import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

const args = parseArgs(process.argv.slice(2));

if (!args.input || !args.output) {
  printUsage();
  process.exit(1);
}

const inputPath = resolve(args.input);
const outputPath = resolve(args.output);
const assignmentsPath = args.assignments ? resolve(args.assignments) : null;
const targetLevel = args.level ?? null;
const limit = args.limit ? Number(args.limit) : Number.POSITIVE_INFINITY;

const xml = await readFile(inputPath, 'utf8');
const assignments = assignmentsPath ? await loadAssignments(assignmentsPath) : new Map();
const entries = extractEntries(xml, assignments, targetLevel, limit);

await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, JSON.stringify(entries, null, 2) + '\n', 'utf8');

console.log(`Generated ${entries.length} vocab entries -> ${outputPath}`);

function parseArgs(argv) {
  const parsed = {};

  for (let i = 0; i < argv.length; i += 1) {
    const key = argv[i];
    const value = argv[i + 1];

    if (!key.startsWith('--')) {
      continue;
    }

    parsed[key.slice(2)] = value;
    i += 1;
  }

  return parsed;
}

function printUsage() {
  console.log(`Usage:
  npm run build:jmdict -- \\
    --input downloads/JMdict_e.xml \\
    --assignments data/jlpt-assignments.tsv \\
    --level N5 \\
    --output src/assets/data/n5.json \\
    [--limit 300]

Assignments TSV format:
  term<TAB>level
Example:
  食べる\tN5
  学校\tN5
`);
}

async function loadAssignments(filePath) {
  const text = await readFile(filePath, 'utf8');
  const map = new Map();

  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) {
      continue;
    }

    const [term, level] = line.split('\t');
    if (!term || !level) {
      continue;
    }

    map.set(term, level.trim().toUpperCase());
  }

  return map;
}

function extractEntries(xml, assignments, targetLevel, limit) {
  const matches = xml.match(/<entry>[\s\S]*?<\/entry>/g) ?? [];
  const items = [];

  for (const entryXml of matches) {
    if (items.length >= limit) {
      break;
    }

    const sequence = extractFirst(entryXml, 'ent_seq');
    const keb = extractAll(entryXml, 'keb');
    const reb = extractAll(entryXml, 'reb');
    const gloss = extractGlosses(entryXml);
    const pos = extractPos(entryXml);

    const kanji = decodeXml(keb[0] ?? reb[0] ?? '');
    const furigana = decodeXml(reb[0] ?? keb[0] ?? '');
    const meaning = decodeXml(gloss[0] ?? '');

    if (!sequence || !kanji || !meaning) {
      continue;
    }

    const termKey = kanji;
    const level = assignments.get(termKey) ?? assignments.get(furigana);

    if (targetLevel && level !== targetLevel.toUpperCase()) {
      continue;
    }

    if (assignments.size > 0 && !level) {
      continue;
    }

    items.push({
      id: `jmdict-${sequence}`,
      kanji,
      furigana,
      meaning,
      level: (level ?? targetLevel ?? 'N5').toUpperCase(),
      type: mapWordType(pos),
      sentences: [],
    });
  }

  return items;
}

function extractAll(xml, tag) {
  const regex = new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`, 'g');
  return Array.from(xml.matchAll(regex), (match) => match[1].trim());
}

function extractFirst(xml, tag) {
  return extractAll(xml, tag)[0] ?? '';
}

function extractGlosses(xml) {
  const senseBlocks = xml.match(/<sense>[\s\S]*?<\/sense>/g) ?? [];
  const glosses = [];

  for (const sense of senseBlocks) {
    for (const match of sense.matchAll(/<gloss(?: [^>]*)?>([\s\S]*?)<\/gloss>/g)) {
      glosses.push(match[1].trim());
    }
  }

  return glosses;
}

function extractPos(xml) {
  return Array.from(xml.matchAll(/<pos>&([^;]+);<\/pos>/g), (match) => match[1]);
}

function mapWordType(posValues) {
  const joined = posValues.join(' ');

  if (joined.includes('noun')) return 'noun';
  if (joined.includes('verb')) return 'verb';
  if (joined.includes('adj')) return 'adjective';
  if (joined.includes('adv')) return 'adverb';
  if (joined.includes('exp')) return 'expression';
  return 'other';
}

function decodeXml(value) {
  return value
    .replaceAll('&amp;', '&')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&quot;', '"')
    .replaceAll('&apos;', "'");
}

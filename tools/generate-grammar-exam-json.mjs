import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

const args = parseArgs(process.argv.slice(2));

if (!args.input || !args.output) {
  printUsage();
  process.exit(1);
}

const inputPath = resolve(args.input);
const outputPath = resolve(args.output);
const raw = await readFile(inputPath, 'utf8');
const patterns = JSON.parse(raw);

if (!Array.isArray(patterns) || patterns.length === 0) {
  throw new Error('Input must be a non-empty array of grammar patterns.');
}

const level = args.level ?? patterns[0]?.level;
if (!level) {
  throw new Error('Unable to determine JLPT level. Pass --level explicitly.');
}

const prompt = args.prompt ?? '請選出最適合填入空格的文型。';
const title = args.title ?? `${level} 句型填空`;
const description =
  args.description ?? `根據文法整理資料自動產生的 ${level} 句型填空四選一題組。`;
const setId = args.id ?? `grammar-${level.toLowerCase()}-sentence-fill`;
const exam = buildExamSet(patterns, {
  id: setId,
  title,
  description,
  level,
  prompt,
});

await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, JSON.stringify(exam, null, 2) + '\n', 'utf8');

console.log(`Generated ${exam.questions.length} grammar questions -> ${outputPath}`);

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
  npm run build:grammar-exam -- \\
    --input src/assets/data/grammar-n3-day25-particles.json \\
    --output src/assets/exams/grammar/n3-day25-particles-sentence-fill.json \\
    [--id grammar-n3-day25-particles] \\
    [--level N3] \\
    [--title "N3 助詞句型填空"] \\
    [--description "Day25 助詞整理後的句型題組"]
`);
}

function buildExamSet(patterns, meta) {
  const questionSeed = createQuestionSeed(patterns);
  const questions = [];

  for (const pattern of patterns) {
    const examples = Array.isArray(pattern.examples) ? pattern.examples : [];

    for (const example of examples) {
      const question = buildQuestion(pattern, example, questionSeed, questions.length + 1, meta.prompt);

      if (question) {
        questions.push(question);
      }
    }
  }

  return {
    id: meta.id,
    title: meta.title,
    description: meta.description,
    level: meta.level,
    category: 'grammar',
    type: 'sentence-fill',
    questions,
  };
}

function createQuestionSeed(patterns) {
  return patterns.map((pattern) => ({
    id: pattern.id,
    level: pattern.level,
    pattern: pattern.pattern,
    headword: pattern.headword ?? extractDefaultAnswer(pattern),
    tags: Array.isArray(pattern.tags) ? pattern.tags : [],
    category: Array.isArray(pattern.category) ? pattern.category : [],
  }));
}

function buildQuestion(pattern, example, pool, index, prompt) {
  const answer = normalizeText(example.answer ?? inferAnswer(pattern, example));
  const questionText = normalizeText(example.blank ?? inferBlank(pattern, example, answer));

  if (!answer || !questionText || !questionText.includes('＿＿')) {
    return null;
  }

  const wrongOptions = collectWrongOptions(example, pattern, pool, answer).slice(0, 3);
  if (wrongOptions.length < 3) {
    return null;
  }

  const baseId = `${pattern.level.toLowerCase()}-fill-${String(index).padStart(3, '0')}`;
  const correctOption = {
    id: `${baseId}-correct`,
    text: answer,
    isCorrect: true,
  };

  const options = shuffle([
    correctOption,
    ...wrongOptions.map((text, wrongIndex) => ({
      id: `${baseId}-wrong-${wrongIndex + 1}`,
      text,
      isCorrect: false,
    })),
  ]);

  const explanation = buildExplanation(pattern, example, answer);
  const tags = buildTags(pattern);

  return {
    id: baseId,
    level: pattern.level,
    category: 'grammar',
    type: 'sentence-fill',
    prompt,
    questionText,
    questionTranslation: normalizeText(example.zh) || undefined,
    options,
    correctAnswer: correctOption.id,
    explanation,
    tags,
  };
}

function collectWrongOptions(example, pattern, pool, answer) {
  const seen = new Set([answer]);
  const wrong = [];

  const explicitDistractors = Array.isArray(example.distractors) ? example.distractors : [];
  for (const candidate of explicitDistractors) {
    const text = normalizeText(candidate);
    if (!text || seen.has(text)) continue;
    seen.add(text);
    wrong.push(text);
  }

  for (const candidate of selectPoolDistractors(pattern, pool)) {
    if (wrong.length >= 3) break;
    const text = normalizeText(candidate);
    if (!text || seen.has(text)) continue;
    seen.add(text);
    wrong.push(text);
  }

  return wrong;
}

function selectPoolDistractors(pattern, pool) {
  const currentCategory = new Set(Array.isArray(pattern.category) ? pattern.category : []);
  const sameCategory = [];
  const fallback = [];

  for (const candidate of pool) {
    if (candidate.id === pattern.id) continue;
    const candidateText = normalizeText(candidate.headword ?? candidate.pattern);
    if (!candidateText) continue;

    const sharesCategory = candidate.category.some((item) => currentCategory.has(item));
    if (sharesCategory) {
      sameCategory.push(candidateText);
    } else {
      fallback.push(candidateText);
    }
  }

  return [...shuffle(sameCategory), ...shuffle(fallback)];
}

function inferAnswer(pattern, example) {
  const answer = extractAnswerFromBlank(example.blank, example.jp);
  if (answer) return answer;
  return extractDefaultAnswer(pattern);
}

function inferBlank(pattern, example, answer) {
  if (!example.jp || !answer) {
    return '';
  }

  if (example.jp.includes(answer)) {
    return example.jp.replace(answer, '＿＿＿');
  }

  const defaultAnswer = extractDefaultAnswer(pattern);
  if (defaultAnswer && example.jp.includes(defaultAnswer)) {
    return example.jp.replace(defaultAnswer, '＿＿＿');
  }

  return '';
}

function extractAnswerFromBlank(blank, original) {
  if (!blank || !original || !blank.includes('＿＿')) {
    return '';
  }

  const [beforeBlank, afterBlank] = blank.split(/＿＿＿|＿＿/);
  const startIndex = original.indexOf(beforeBlank);
  if (startIndex === -1) return '';

  const from = startIndex + beforeBlank.length;
  if (!afterBlank) {
    return original.slice(from).trim();
  }

  const to = original.indexOf(afterBlank, from);
  if (to === -1) return '';

  return original.slice(from, to).trim();
}

function extractDefaultAnswer(pattern) {
  const base = normalizeText(pattern.headword ?? pattern.pattern ?? '');
  return base.replace(/^〜+/, '').trim();
}

function buildExplanation(pattern, example, answer) {
  if (normalizeText(example.explanation)) {
    return example.explanation.trim();
  }

  const meaningText = Array.isArray(pattern.meanings)
    ? pattern.meanings.map((item) => item.label).filter(Boolean).join('、')
    : normalizeText(pattern.meaning);
  const noteText = Array.isArray(pattern.notes)
    ? pattern.notes.filter(Boolean).join(' ')
    : normalizeText(pattern.notes);
  const usageLabel =
    findUsageLabel(pattern, example.usageId) ||
    (meaningText ? `此題考「${answer}」的用法，表示${meaningText}。` : `此題應填入「${answer}」。`);

  return [usageLabel, noteText].filter(Boolean).join(' ');
}

function findUsageLabel(pattern, usageId) {
  if (!usageId || !Array.isArray(pattern.usages)) return '';
  const usage = pattern.usages.find((item) => item.id === usageId);
  if (!usage) return '';

  if (usage.label) {
    return usage.label.trim();
  }

  const meaning = Array.isArray(pattern.meanings)
    ? pattern.meanings.find((item) => item.id === usage.meaningId)
    : null;

  if (meaning?.label) {
    return `此題考「${pattern.headword ?? extractDefaultAnswer(pattern)}」表示「${meaning.label}」的用法。`;
  }

  return '';
}

function buildTags(pattern) {
  const tags = new Set(Array.isArray(pattern.tags) ? pattern.tags : []);
  tags.add(`grammar-${String(pattern.level).toLowerCase()}`);
  return [...tags];
}

function normalizeText(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function shuffle(arr) {
  const copy = [...arr];

  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
}

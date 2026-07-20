// One-time migration: add structured `problemNumber` / `problemLabel` fields to
// past-exam question JSON, derived from the existing "【問題N ラベル】" prefix
// embedded in each question's `prompt` string.
//
// Usage: node tools/tag-exam-subtypes.mjs
import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIR = resolve(fileURLToPath(import.meta.url), '../../src/assets/exams/past');

// 詞彙科目：來源 prompt 用詞不一（読み方/漢字/書き方/類義語/使い方…），一律改標成設計稿的顯示用詞
const VOCAB_LABELS = {
  1: '漢字読み',
  2: '表記',
  3: '文脈規定',
  4: '言い換え',
  5: '用法',
};

// 文法科目：來源 prompt 大致已是這些詞，這裡當作 canonical 覆蓋（含補上缺漏的情況）
const GRAMMAR_LABELS = {
  1: '文法形式',
  2: '文の組み立て',
  3: '文章の文法',
};

const BRACKET_RE = /^【問題(\d+)\s*([^\d\s】]*)】/;

function tagByCanonicalMap(file, category, labelMap, fallbackNumber) {
  return async () => {
    const path = resolve(DIR, file);
    const data = JSON.parse(await readFile(path, 'utf8'));

    for (const q of data.questions) {
      const m = q.prompt.match(BRACKET_RE);
      const number = m ? Number(m[1]) : fallbackNumber;
      q.problemNumber = number;
      q.problemLabel = labelMap[number] ?? (m?.[2] || '綜合');
    }

    await writeFile(path, JSON.stringify(data, null, 2) + '\n', 'utf8');
    console.log(`${file}: tagged ${data.questions.length} questions (${category})`);
  };
}

// 読解科目：來源 prompt 的子分類文字已經就是想要的顯示文字，直接原樣採用，不覆蓋
function tagFromPromptVerbatim(file) {
  return async () => {
    const path = resolve(DIR, file);
    const data = JSON.parse(await readFile(path, 'utf8'));

    for (const q of data.questions) {
      const m = q.prompt.match(BRACKET_RE);
      if (!m) {
        throw new Error(`${file} / ${q.id}: prompt 沒有「【問題N ラベル】」前綴，無法自動標記，需人工處理`);
      }
      q.problemNumber = Number(m[1]);
      q.problemLabel = m[2];
    }

    await writeFile(path, JSON.stringify(data, null, 2) + '\n', 'utf8');
    console.log(`${file}: tagged ${data.questions.length} questions (reading)`);
  };
}

const tasks = [
  // vocab（4 檔，全部有規律方括號）
  tagByCanonicalMap('n3-2021-07-vocab.json', 'vocabulary', VOCAB_LABELS),
  tagByCanonicalMap('n3-2021-12-vocab.json', 'vocabulary', VOCAB_LABELS),
  tagByCanonicalMap('n3-2022-07-vocab.json', 'vocabulary', VOCAB_LABELS),
  tagByCanonicalMap('n3-2022-12-vocab.json', 'vocabulary', VOCAB_LABELS),
  // grammar（2020-12 完全沒有方括號，全部歸為問題1；其餘 4 檔規律，2021-07 的問題1 缺 label 文字但用 canonical map 補上）
  tagByCanonicalMap('n3-2020-12-grammar.json', 'grammar', GRAMMAR_LABELS, 1),
  tagByCanonicalMap('n3-2021-07-grammar.json', 'grammar', GRAMMAR_LABELS),
  tagByCanonicalMap('n3-2021-12-grammar.json', 'grammar', GRAMMAR_LABELS),
  tagByCanonicalMap('n3-2022-07-grammar.json', 'grammar', GRAMMAR_LABELS),
  tagByCanonicalMap('n3-2022-12-grammar.json', 'grammar', GRAMMAR_LABELS),
  // reading（3 檔，全部規律，直接採用原文標籤）
  tagFromPromptVerbatim('n3-2021-07-reading.json'),
  tagFromPromptVerbatim('n3-2021-12-reading.json'),
  tagFromPromptVerbatim('n3-2022-07-reading.json'),
];

for (const task of tasks) {
  await task();
}

console.log('Done.');

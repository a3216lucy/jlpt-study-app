/** 解析中的單一選項說明（`○1 文字：說明`／`×2 文字：說明`） */
export interface ParsedExplanationOption {
  /** 選項編號（1–4） */
  n: number;
  /** 是否為正解 */
  correct: boolean;
  /** 選項文字 */
  text: string;
  /** 該選項的說明（含義、為什麼對／錯） */
  note: string;
  /** 接續：前面接什麼、後面怎麼接（文法題才有，沒有為空字串） */
  connect: string;
  /** 限制／語感：書面或口語、搭配限制、易混淆處（文法題才有） */
  limit: string;
  /** 本題：為什麼這題必須用它／為什麼放進這個句子不行（文法題才有） */
  why: string;
}

/** 拆解後的題目解析 */
export interface ParsedExplanation {
  /** 是否符合結構化格式；否則只有 `raw` 有意義，畫面直接顯示整段文字 */
  structured: boolean;
  /** 💡 重點 */
  tip: string;
  /** 排序題的正確順序 */
  order: string;
  /** 各選項解析 */
  options: ParsedExplanationOption[];
  /** 聽解的聽力原文 */
  script: string;
  /** 読解、文章文法、聽解的全文中譯 */
  passageTranslation: string;
  /** 原始字串 */
  raw: string;
}

const OPTION_LINE = /^([○×])\s*([1-4])\s+(.*)$/;
/** 選項下的用法子行：`  接續：…`／`  限制：…`／`  本題：…` */
const DETAIL_LINE = /^(接續|限制|本題)：(.*)$/;

/**
 * 把題庫 `explanation` 拆成區塊。
 * 格式（N2 全部題庫）：
 * ```
 * 💡 重點
 * 正確順序：a → b → c
 * 【選項解析】
 * ○2 選項文字：說明
 * ×1 選項文字：說明
 * 【全文中譯】
 * 中譯…
 * ```
 * 沒有任何區塊標記的舊格式（部分 N3）回傳 `structured: false`。
 */
export function parseExplanation(raw: string): ParsedExplanation {
  const result: ParsedExplanation = {
    structured: false,
    tip: '',
    order: '',
    options: [],
    script: '',
    passageTranslation: '',
    raw,
  };
  if (!raw) return result;

  const tipLines: string[] = [];
  const translationLines: string[] = [];
  const scriptLines: string[] = [];
  let mode: 'tip' | 'options' | 'translation' | 'script' | 'none' = 'none';

  for (const line of raw.split('\n')) {
    const trimmed = line.trim();
    if (trimmed.startsWith('💡')) {
      mode = 'tip';
      tipLines.push(trimmed.replace(/^💡\s*/, ''));
      continue;
    }
    if (trimmed.startsWith('正確順序：')) {
      result.order = trimmed.replace(/^正確順序：\s*/, '');
      mode = 'none';
      continue;
    }
    if (trimmed.startsWith('【選項解析】')) {
      mode = 'options';
      continue;
    }
    if (trimmed.startsWith('【聽力原文】')) {
      mode = 'script';
      continue;
    }
    if (trimmed.startsWith('【全文中譯】')) {
      mode = 'translation';
      const rest = trimmed.replace(/^【全文中譯】\s*/, '');
      if (rest) translationLines.push(rest);
      continue;
    }

    if (mode === 'options') {
      const m = OPTION_LINE.exec(trimmed);
      if (m) {
        const body = m[3];
        const sep = body.indexOf('：');
        result.options.push({
          n: Number(m[2]),
          correct: m[1] === '○',
          text: sep >= 0 ? body.slice(0, sep).trim() : body.trim(),
          note: sep >= 0 ? body.slice(sep + 1).trim() : '',
          connect: '',
          limit: '',
          why: '',
        });
      } else if (trimmed && result.options.length > 0) {
        const last = result.options[result.options.length - 1];
        const d = DETAIL_LINE.exec(trimmed);
        if (d) {
          if (d[1] === '接續') last.connect = d[2].trim();
          else if (d[1] === '限制') last.limit = d[2].trim();
          else last.why = d[2].trim();
        } else {
          // 說明太長被換行：接在上一個選項後面
          last.note += ` ${trimmed}`;
        }
      }
    } else if (mode === 'script') {
      scriptLines.push(line);
    } else if (mode === 'translation') {
      translationLines.push(line);
    } else if (mode === 'tip' && trimmed) {
      tipLines.push(trimmed);
    }
  }

  result.tip = tipLines.join('\n').trim();
  result.script = scriptLines.join('\n').trim();
  result.passageTranslation = translationLines.join('\n').trim();
  result.structured =
    result.options.length > 0 || result.tip.length > 0 || result.passageTranslation.length > 0 || result.script.length > 0;
  return result;
}

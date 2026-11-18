// Cores
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
// Components
import { SentencePatternPracticeComponent } from '../sentence-pattern-practice/sentence-pattern-practice.component';
// Utils
// Store
import { SentenceReviewStore } from '../../sentence-review.store';

/** 把 notes 拆成「重點／辨別／考題句／其他」行 */
export interface NoteLine {
  label: string;
  text: string;
}

/** 易混比較的一組：標題＋「詞＝意思」列 */
export interface CompareItem {
  head: string;
  rows: { term: string; meaning: string }[];
  plain: string;
}

/** ①②③ 各自一行、「真題：」另起一行，長段落才讀得下去 */
function breakLines(text: string): string {
  return splitOutsideQuotes(breakLinesBase(text));
}

/** 「。」後換行，但在「」『』（）裡面的不拆 */
function splitOutsideQuotes(text: string): string {
  let depth = 0;
  let out = '';
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if ('「『（('.includes(ch)) depth++;
    if ('」』）)'.includes(ch)) depth = Math.max(0, depth - 1);
    out += ch;
    if (ch === '。' && depth === 0 && i + 1 < text.length && text[i + 1] !== '\n' && !'」』）)'.includes(text[i + 1])) {
      out += '\n';
    }
  }
  return out.replace(/\n\s+/g, '\n').trim();
}

function breakLinesBase(text: string): string {
  // 長句裡的「；」（並列的比較項目）也各自一行
  const comparison = /[＝=][^；;]*[；;][^；;]*[＝=]/.test(text);
  const split = text.length > 36 || comparison ? text.replace(/\s*[；;]\s*(?=\S)/g, '\n') : text;
  return split
    .replace(/\s*[；;]\s*(?=[①-⑩])/g, '\n')
    .replace(/(?<=[^\n\s])\s*(?=[①-⑩])/g, '\n')
    .replace(/(?<=[。）)])\s*(?=近義詞?比較：|近義詞?：|類義：|同義詞?：|反義詞?：|對義：|真題：|例：|注意：|辨別：|比較：|對比：|與[^：\n]{1,16}(?:比較|對比)：|慣用[^：\n]{0,4}：|常用[^：\n]{0,6}：|固定搭配：)/g, '\n')
    .trim();
}

const PAREN_READING = /([一-鿿々〆ヶ]+)（([ぁ-ゖァ-ヺー・]+)）/g;

/** 意思欄：一行或多行（兩種用法時分行，有「詞＝意思」時對齊） */
export interface MeaningView {
  rows: { term: string; text: string }[];
  /** true＝每行都是「詞＝意思」 */
  paired: boolean;
}

/** 接續：前接（一行一種）＋ 後面固定的部分；多段組合時改成直式 */
export interface FormationView {
  left: string[];
  /** 句型本體（有多種寫法時一行一種） */
  right: string[];
  /** 三段以上的組合（「A ＋ B ＋ C」）：第一段之後各段一行 */
  chain: string[];
}

/** 依「、」切開，但括號裡的「、」不切 */
function splitByComma(text: string): string[] {
  const out: string[] = [];
  let depth = 0;
  let cur = '';
  for (const ch of text) {
    if (ch === '（' || ch === '(' || ch === '「') depth++;
    if (ch === '）' || ch === ')' || ch === '」') depth = Math.max(0, depth - 1);
    if (ch === '、' && depth === 0) {
      out.push(cur.trim());
      cur = '';
    } else cur += ch;
  }
  out.push(cur.trim());
  return out.filter(Boolean);
}

/** 依「＋」切開，但括號裡的「＋」不切 */
function splitPlus(text: string): string[] {
  const out: string[] = [];
  let depth = 0;
  let cur = '';
  for (const ch of text) {
    if (ch === '（' || ch === '(') depth++;
    if (ch === '）' || ch === ')') depth = Math.max(0, depth - 1);
    if ((ch === '＋' || ch === '+') && depth === 0) {
      out.push(cur.trim());
      cur = '';
    } else cur += ch;
  }
  out.push(cur.trim());
  return out.filter(Boolean);
}

/** 依「／」切開，但括號裡的「／」不切 */
function splitTop(text: string): string[] {
  const out: string[] = [];
  let depth = 0;
  let cur = '';
  for (const ch of text) {
    if (ch === '（' || ch === '(') depth++;
    if (ch === '）' || ch === ')') depth = Math.max(0, depth - 1);
    if (ch === '／' && depth === 0) {
      out.push(cur.trim());
      cur = '';
    } else cur += ch;
  }
  out.push(cur.trim());
  return out.filter(Boolean);
}

const LABELS = ['重點', '辨別', '考題句'];
/** 比較句的標記：「比較：」「與「うちに」比較：」「對比：」 */
/** 強調句：「強調：…」「強調「一石二鳥」的…」 */
const EMPHASIS_MARK = /^強調[：:]?/;
const COMPARE_MARK = /^(?:與[^：\n]{1,16}|近義詞?)?(?:比較|對比)：/;
/** 慣用詞組的標記（行首或行中） */
const IDIOM_MARK = /(慣用表現|慣用|常用固定搭配|固定搭配|常用搭配|常見搭配|搭配|固定格式|常用)：/;
/** 近義／反義 */
const SYN_MARK = /^(近義詞|近義|類義|同義詞|同義)：/;
const ANT_MARK = /^(反義詞|反義|對義|相反)：/;

@Component({
  selector: 'app-sentence-pattern-grid',
  templateUrl: './sentence-pattern-grid.component.html',
  standalone: true,
  imports: [SentencePatternPracticeComponent],
  host: {
    class: 'flex flex-1 flex-col [&_rt]:text-[0.5em] [&_rt]:font-normal [&_rt]:text-text-muted [&_ruby]:[ruby-align:center]',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SentencePatternGridComponent {
  // Dependencies
  // --------------------------------------------------------------------
  readonly store = inject(SentenceReviewStore);

  // State
  // --------------------------------------------------------------------
  /** 搜尋時一律展開，其餘用使用者展開的狀態 */
  readonly compare = computed<CompareItem[]>(() => {
    if (this.store.isSearching()) return [];
    return (this.store.selectedGroup()?.compare ?? []).map((line) => {
      const i = line.indexOf('：');
      const head = i >= 0 ? line.slice(0, i) : '';
      const rest = i >= 0 ? line.slice(i + 1) : line;
      const parts = rest.split('，').map((x) => x.trim()).filter(Boolean);
      const eq = parts.filter((x) => x.includes('＝'));
      // 格式二：「A／B／C：意思甲／意思乙／意思丙」（一一對應）
      const terms = head.split('／').map((x) => x.trim());
      const meanings = rest.split('／').map((x) => x.trim());
      if (head && terms.length > 1 && terms.length === meanings.length) {
        return { head: '', rows: terms.map((t, k) => ({ term: t, meaning: meanings[k] })), plain: '' };
      }
      // 格式三：「前者…，後者…」「詞＝意思」混合；非列點的句子接在前一列後面，開頭的當總說
      if (head) {
        const names = head.split('／').map((x) => x.trim());
        const nameOf = (key: string): string => {
          if (key === '前者') return names[0];
          if (key === '中者') return names[1] ?? key;
          if (key === '後者') return names[names.length - 1];
          if (key === '後兩者') return names.slice(1).join('／');
          if (key === '前兩者') return names.slice(0, 2).join('／');
          return key;
        };
        const rows: { term: string; meaning: string }[] = [];
        const summary: string[] = [];
        for (const part of parts) {
          const m = /^(前者|中者|後者|後兩者|前兩者)[＝是：]?(.*)$/.exec(part);
          if (m) {
            rows.push({ term: nameOf(m[1]), meaning: m[2].trim() });
          } else if (part.includes('＝')) {
            const j = part.indexOf('＝');
            rows.push({ term: part.slice(0, j).trim(), meaning: part.slice(j + 1).trim() });
          } else if (rows.length) {
            rows[rows.length - 1].meaning += '，' + part;
          } else {
            summary.push(part);
          }
        }
        if (rows.length > 0) return { head, rows, plain: summary.join('，') };
      }
      // 其他：標題粗體，說明放下一行
      return { head, rows: [], plain: head ? rest : line };
    });
  });

  // Public Handlers
  // --------------------------------------------------------------------
  isOpen(id: string): boolean {
    return this.store.isSearching() || this.store.openIds().has(id);
  }

  toggle(id: string): void {
    this.store.togglePattern(id);
  }

  /** 「A／B ＋ 句型」拆成：前接（一行一種）＋ 句型；「A ＋ B ＋ C」拆成直式 */
  formationView(formation: string): FormationView {
    const f = (formation ?? '').trim();
    const segs = splitPlus(f);
    if (segs.length < 2) return { left: [f], right: [], chain: [] };
    if (segs.length === 2) {
      const left = splitTop(segs[0]);
      const right = splitTop(segs[1]);
      // 前接寫得很長（括號說明多）時，橫排會把「＋ 句型」擠成一個字寬 → 改直式
      const visible = (t: string): number => t.replace(/（[ぁ-ゖァ-ヺー・]+）/g, '').length;
      if (left.some((l) => visible(l) > 14)) return { left, right: [], chain: right };
      return { left, right, chain: [] };
    }
    return { left: splitTop(segs[0]), right: [], chain: segs.slice(1) };
  }

  /** 區塊文字拆成行；多行時每行加列點（編號行、以「！」結尾的標題行不加） */
  blockLines(label: string, text: string): { text: string; bullet: boolean; indent: boolean }[] {
    let lines = (text ?? '').split('\n').map((l) => l.trim()).filter(Boolean);
    // 慣用：一行列了好幾個短詞組（用「、」分開）→ 一個詞組一行
    if (label === '慣用' && lines.length === 1) {
      const parts = splitByComma(lines[0]);
      if (parts.length > 1 && parts.every((x) => x.length <= 16)) lines = parts;
    }
    const multi = lines.length > 1;
    return lines.map((l) => {
      const numbered = /^[①-⑩]/.test(l);
      const heading = /[！!：:]$/.test(l);
      return { text: l, bullet: multi && !numbered && !heading, indent: multi && numbered };
    });
  }

  /** 後接：「後面：…」「限制：…」各一行 */
  afterLines(after: string | undefined): { label: string; text: string }[] {
    return (after ?? '')
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean)
      .map((l) => {
        const i = l.indexOf('：');
        return i > 0 && i <= 3 ? { label: l.slice(0, i), text: l.slice(i + 1).trim() } : { label: '', text: l };
      });
  }

  /** 「漢字（かな）」→ 漢字上方標讀音（`[innerHTML]` 用） */
  ruby(text: string): string {
    const escaped = (text ?? '').replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c] ?? c);
    return escaped.replace(PAREN_READING, (all, kanji: string, kana: string) =>
      // 語法術語（動詞、名詞、…形）後面的（な）（だ）（よう）是「可省略的部分」，不是讀音
      /(詞|形)$/.test(kanji) ? all : `<ruby>${kanji}<rt>${kana}</rt></ruby>`,
    );
  }

  /** 標題含「vs」時拆成多行 */
  titleParts(pattern: string): string[] {
    const vs = pattern.split(/\s*\bvs\b\s*/i).map((x) => x.trim()).filter(Boolean);
    if (vs.length > 1) return vs;
    // 沒有 vs、寫法太長且有多種寫法（／）時，一種一行
    const alts = splitTop(pattern);
    return pattern.length > 22 && alts.length >= 3 ? alts : [pattern];
  }

  /** 標題的分隔：vs 才顯示黃色標籤 */
  hasVs(pattern: string): boolean {
    return /\bvs\b/i.test(pattern);
  }

  meaningView(meaning: string): MeaningView {
    const segs = (meaning ?? '').split(/[；;]/).map((x) => x.trim()).filter(Boolean);
    if (segs.length <= 1) return { rows: [{ term: '', text: meaning }], paired: false };
    const paired = segs.every((x) => /[＝=]/.test(x));
    return {
      paired,
      rows: segs.map((x) => {
        if (!paired) return { term: '', text: x };
        const j = x.search(/[＝=]/);
        return { term: x.slice(0, j).trim(), text: x.slice(j + 1).trim() };
      }),
    };
  }

  noteLines(notes: string): NoteLine[] {
    const out: NoteLine[] = [];
    let plain: string[] = [];
    let block: { label: string; lines: string[]; raw: number; warn: boolean } | null = null;
    const closeBlock = (): void => {
      if (block) out.push({ label: block.label, text: block.lines.join('\n') });
      block = null;
    };
    const flush = (): void => {
      if (plain.length) out.push({ label: '', text: plain.join('\n') });
      plain = [];
      closeBlock();
    };
    // 先攤平成 {子行, 原始行號}，才能往後看一行
    const items: { t: string; raw: number; label?: string }[] = [];
    (notes ?? '').split('\n').forEach((raw, rawIdx) => {
      const line = raw.trim();
      if (!line) return;
      const label = LABELS.find((l) => line.startsWith(l + '：'));
      if (label) {
        items.push({ t: breakLines(line.slice(label.length + 1).trim()), raw: rawIdx, label });
        return;
      }
      for (const sub of breakLines(line).split('\n')) {
        if (sub.trim()) items.push({ t: sub.trim(), raw: rawIdx });
      }
    });
    items.forEach((it, i) => {
      const t = it.t;
      if (it.label) {
        flush();
        out.push({ label: it.label, text: t });
        return;
      }
      const idiom = IDIOM_MARK.exec(t);
      const compare = COMPARE_MARK.exec(t);
      if (t.startsWith('⚠')) {
        flush();
        const body = t.replace(/^⚠\s*/, '');
        const label = /差別|比較|易混|混淆/.test(body) ? '易混' : '注意';
        block = { label, lines: [body], raw: it.raw, warn: true };
      } else if (idiom && idiom.index === 0) {
        flush();
        block = { label: '慣用', lines: [t.slice(idiom[0].length).trim()], raw: it.raw, warn: false };
      } else if (SYN_MARK.test(t)) {
        flush();
        block = { label: '近義', lines: [t.replace(SYN_MARK, '').trim()], raw: it.raw, warn: false };
      } else if (ANT_MARK.test(t)) {
        flush();
        block = { label: '反義', lines: [t.replace(ANT_MARK, '').trim()], raw: it.raw, warn: false };
      } else if (EMPHASIS_MARK.test(t)) {
        flush();
        block = { label: '強調', lines: [t.replace(EMPHASIS_MARK, '').trim()], raw: it.raw, warn: false };
      } else if (compare && compare.index === 0) {
        flush();
        const body = t.replace(/比較：/, '：').replace(/^：/, '').trim();
        block = { label: '比較', lines: body.split(/\s*\bvs\b\s*/i).filter(Boolean), raw: it.raw, warn: false };
      } else if (/^(真題|例)：/.test(t)) {
        flush();
        out.push({ label: t.startsWith('真題') ? '考題句' : '例句', text: t.replace(/^(真題|例)：/, '').trim() });
        return;
      } else if (block && (block.warn ? true : block.raw === it.raw)) {
        block.lines.push(t);
      } else {
        closeBlock();
        plain.push(t);
        return;
      }
      // ⚠ 區塊：句子結束（「。」）且下一行不是 ①②③ 的延續，就收尾
      if (block && block.warn) {
        const cur = block.lines[block.lines.length - 1];
        const next = items[i + 1]?.t ?? '';
        if (/[。]$/.test(cur) && !/^[①-⑩]/.test(next)) closeBlock();
      }
    });
    flush();
    return out;
  }




}

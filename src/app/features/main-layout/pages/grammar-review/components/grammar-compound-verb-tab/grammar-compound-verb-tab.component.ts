// Cores
import { ChangeDetectionStrategy, Component, ElementRef, computed, inject } from '@angular/core';
// Angular
// Store
import type { CompoundVerbPattern } from '../../grammar-review.model';
import { GrammarReviewStore } from '../../grammar-review.store';
// Utils
import { createFurigana, parenToRuby } from '../../furigana.util';
// Data
import { COMPOUND_VERB_FURIGANA } from './compound-verb-furigana.data';

/** 說明區塊：小標題、動詞清單（詞＋中文）、虛線提醒框、一般文字 */
export type NoteBlock =
  | { kind: 'heading'; text: string }
  | { kind: 'chips'; items: { word: string; gloss: string }[] }
  | { kind: 'callout'; label: string; lines: string[] }
  | { kind: 'text'; text: string };

/** 每個句型的核心字：例句裡含這些字的詞會加粗上色 */
const HIGHLIGHT: Record<string, string[]> = {
  dasu: ['出'],
  komu: ['込'],
  'agaru-ageru': ['上'],
  au: ['合'],
  nuku: ['抜'],
  tsuzukeru: ['続'],
  hajimeru: ['始'],
  kiru: ['切'],
  naosu: ['直'],
  kakeru: ['かけ'],
  kaeru: ['返'],
  tsukeru: ['つけ'],
  owaru: ['終'],
};

/** 考古題考過、必須會的複合動詞（畫面用紅色粗體標出） */
export const TESTED_COMPOUND_VERBS = new Set([
  '乗り継ぐ', '取り上げる', '取り替える', '取り消す', '地味すぎる', '多すぎる', '大きすぎる', '寄りかかる', '小さすぎる', '少なすぎる',
  '思いつく', '打ち明ける', '打ち消す', '持ち上げる', '振り向く', '早すぎる', '派手すぎる', '申し込む', '落ち着く', '裏づける', '触れ合う',
  '近づける', '追い抜く', '追い越す', '通り過ぎる', '遅すぎる', '飛びつく', '飛び出す', '駆け込む', '押し込む',
]);

/** 沒有手動指定核心字的句型：從句型標題推出（漢字取第一個字，純假名去掉語尾） */
function deriveHighlight(pattern: string): string[] {
  return pattern
    .replace(/（[^）]*）/g, '')
    .replace(/〜/g, '')
    .split('／')
    .map((alt) => alt.trim())
    .filter(Boolean)
    .map((alt) => {
      const kanji = /[\u4e00-\u9fff]/.exec(alt);
      return kanji ? kanji[0] : alt.length > 1 ? alt.slice(0, -1) : alt;
    });
}

const CALLOUT = /^(注意|辨別|重要|核心語感|常用固定搭配|重點|對比|語感重點)[：:](.*)$/;
const ITEM = /([^、・（）　：→]+?)（([^）]+)）/g;

const toRuby = createFurigana(COMPOUND_VERB_FURIGANA);

/** 把 notes 字串整理成區塊 */
export function parseNoteBlocks(notes: string): NoteBlock[] {
  const blocks: NoteBlock[] = [];
  let callout: Extract<NoteBlock, { kind: 'callout' }> | null = null;

  const pushItems = (text: string): boolean => {
    const items = Array.from(text.matchAll(ITEM), (m) => ({ word: m[1].trim(), gloss: m[2].trim() }));
    if (items.length === 0) return false;
    const rest = text.replace(ITEM, '').replace(/[、・\s　]/g, '');
    if (rest.length > 2) return false;
    blocks.push({ kind: 'chips', items });
    return true;
  };

  for (const raw of notes.split('\n')) {
    const line = raw.trim();
    if (!line) {
      callout = null;
      continue;
    }
    const c = CALLOUT.exec(line);
    if (c) {
      callout = { kind: 'callout', label: c[1], lines: c[2].split('；').map((x) => x.trim()).filter(Boolean) };
      blocks.push(callout);
      // 「對比：」後面接多行時，下面幾行一起放進同一個提醒框
      if (c[2].trim()) callout = null;
      continue;
    }
    if (callout) {
      callout.lines.push(line);
      continue;
    }
    if (/^[①②③④]/.test(line)) {
      const idx = line.indexOf('：');
      if (idx > 0) {
        blocks.push({ kind: 'heading', text: line.slice(0, idx) });
        const rest = line.slice(idx + 1).trim();
        if (rest && !pushItems(rest)) blocks.push({ kind: 'text', text: rest });
      } else {
        blocks.push({ kind: 'heading', text: line });
      }
      continue;
    }
    if (/[：:]$/.test(line)) {
      blocks.push({ kind: 'heading', text: line.replace(/[：:]$/, '') });
      continue;
    }
    if (line.startsWith('例：') || line.includes('→') || !pushItems(line)) {
      blocks.push({ kind: 'text', text: line });
    }
  }
  return blocks;
}

@Component({
  selector: 'app-grammar-compound-verb-tab',
  templateUrl: './grammar-compound-verb-tab.component.html',
  standalone: true,
  host: {
    class:
      'flex flex-col gap-4 [&_rt]:text-[0.5em] [&_rt]:font-normal [&_rt]:text-text-muted [&_ruby]:[ruby-align:center]',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GrammarCompoundVerbTabComponent {
  // Dependencies
  // --------------------------------------------------------------------
  readonly store = inject(GrammarReviewStore);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  // State
  // --------------------------------------------------------------------
  /** 畫面用的句型資料（說明已整理成區塊） */
  readonly cards = computed(() =>
    this.store.filteredCompoundVerbPatterns().map((p: CompoundVerbPattern) => ({
      id: p.id,
      pattern: p.pattern,
      short: p.pattern.replace(/（[^）]*）/g, ''),
      formation: p.formation,
      meaning: p.meaning,
      blocks: parseNoteBlocks(p.notes ?? ''),
      examples: p.examples,
      highlight: HIGHLIGHT[p.id] ?? deriveHighlight(p.pattern),
    })),
  );

  // Public Handlers
  // --------------------------------------------------------------------
  /** 是否為考過、必須會的詞 */
  isTested(word: string): boolean {
    return TESTED_COMPOUND_VERBS.has(word);
  }

  ruby(text: string, highlight: readonly string[] = []): string {
    return toRuby(text, highlight);
  }

  /** 標題與接續裡的「漢字（かな）」改成上方小字 */
  paren(text: string): string {
    return parenToRuby(text);
  }

  /** 目錄：展開該句型並捲過去 */
  scrollTo(id: string): void {
    const el = document.getElementById(`cv-${id}`);
    if (el instanceof HTMLDetailsElement) el.open = true;
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  /** 下拉選單：跳到選到的句型，選完把選單放回提示文字 */
  jumpTo(event: Event): void {
    const select = event.target as HTMLSelectElement;
    if (select.value) this.scrollTo(select.value);
    select.value = '';
  }

  setAllOpen(open: boolean): void {
    this.host.nativeElement.querySelectorAll('details').forEach((d) => (d.open = open));
  }
}

// Cores
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
// Shared
import { WordRubyPipe, wordToRuby } from '@shared/pipes/word-ruby.pipe';
// Store
import type { AffixGroup } from '../../grammar-review.model';
import { GrammarReviewStore } from '../../grammar-review.store';
// Data
import { AFFIX_GROUPS } from './grammar-affix.data';

@Component({
  selector: 'app-grammar-affix-tab',
  templateUrl: './grammar-affix-tab.component.html',
  standalone: true,
  imports: [WordRubyPipe],
  host: {
    class:
      'flex flex-col gap-6 [&_rt]:text-[0.5em] [&_rt]:font-normal [&_rt]:text-text-muted [&_ruby]:[ruby-align:center]',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GrammarAffixTabComponent {
  // Dependencies
  // --------------------------------------------------------------------
  readonly store = inject(GrammarReviewStore);

  // State
  // --------------------------------------------------------------------
  /** 只看考過的詞 */
  readonly onlyTested = signal(false);

  /** 依搜尋與「只看考過」篩選後的分組 */
  readonly groups = computed<AffixGroup[]>(() => {
    const q = this.store.searchQuery().trim().toLowerCase();
    const only = this.onlyTested();
    return AFFIX_GROUPS.map((g) => ({
      ...g,
      items: g.items
        .map((item) => {
          const matchItem =
            !q || item.mark.toLowerCase().includes(q) || item.reading.includes(q) || item.meaning.includes(q);
          const words = item.words.filter(
            (w) =>
              (!only || w.hot) &&
              (matchItem || w.word.includes(q) || w.reading.includes(q) || w.gloss.includes(q)),
          );
          return { ...item, words, keep: (matchItem || words.length > 0) && (!only || words.length > 0) };
        })
        .filter((i) => i.keep),
    })).filter((g) => g.items.length > 0);
  });

  readonly prefixGroups = computed(() => this.groups().filter((g) => g.kind === 'prefix'));
  readonly suffixGroups = computed(() => this.groups().filter((g) => g.kind === 'suffix'));

  /** 搜尋或只看考過時，分組一律展開 */
  readonly openAll = computed(() => this.onlyTested() || this.store.searchQuery().trim().length > 0);

  readonly options = AFFIX_GROUPS.map((g, i) => ({ id: `affix-g${i}`, label: `${g.kind === 'prefix' ? '接頭詞' : '接尾詞'}・${g.label}` }));

  // Public Handlers
  // --------------------------------------------------------------------
  /** 「不〜」＋「ふ」→ 漢字上方標讀音；「〜士・〜師」「〜手」等多個寫法各自標 */
  markHtml(mark: string, reading: string): string {
    const parts = mark.split(/[／・]/);
    const seps = mark.match(/[／・]/g) ?? [];
    const readings = reading.split('／');
    return parts
      .map((part, i) => {
        const lead = part.startsWith('〜') ? '〜' : '';
        const trail = part.endsWith('〜') ? '〜' : '';
        const body = part.replace(/〜/g, '');
        const rd = parts.length === 1 ? reading : readings.length === 1 ? readings[0] : readings[i];
        return lead + wordToRuby(body, rd) + trail + (seps[i] ?? '');
      })
      .join('');
  }

  groupId(label: string, kind: string): string {
    return `affix-g${AFFIX_GROUPS.findIndex((g) => g.label === label && g.kind === kind)}`;
  }

  jumpTo(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const el = document.getElementById(select.value);
    if (el instanceof HTMLDetailsElement) el.open = true;
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    select.value = '';
  }

}

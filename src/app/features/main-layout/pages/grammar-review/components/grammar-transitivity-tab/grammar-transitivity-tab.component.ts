// Cores
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
// Store
import type { TransitivityPair } from '../../grammar-review.model';
import { GrammarReviewStore } from '../../grammar-review.store';

@Component({
  selector: 'app-grammar-transitivity-tab',
  templateUrl: './grammar-transitivity-tab.component.html',
  standalone: true,
  host: { class: 'flex flex-col gap-8 [&_rt]:text-[0.5em] [&_rt]:font-normal [&_rt]:text-text-muted' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GrammarTransitivityTabComponent {
  // Dependencies
  // --------------------------------------------------------------------
  readonly store = inject(GrammarReviewStore);

  // Computed
  // --------------------------------------------------------------------
  /** 対応表依語尾類型分組（保留資料順序） */
  readonly pairGroups = computed(() => {
    const only = this.onlyHot();
    const groups = new Map<string, TransitivityPair[]>();
    for (const row of this.store.filteredTransitivityPairs()) {
      if (only && !row.hot) continue;
      groups.set(row.family, [...(groups.get(row.family) ?? []), row]);
    }
    return Array.from(groups, ([family, rows], i) => ({ family, rows, id: `tf-${i}` }));
  });

  /** 只看常考（考古題考過的動詞） */
  readonly onlyHot = signal(false);

  /** 搜尋或只看常考時，分組一律展開 */
  readonly openAll = computed(() => this.onlyHot() || this.store.searchQuery().trim().length > 0);

  readonly totalShown = computed(() => this.pairGroups().reduce((n, g) => n + g.rows.length, 0));

  // Public Handlers
  // --------------------------------------------------------------------
  /** 下拉選單：跳到該分組並展開 */
  jumpTo(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const el = document.getElementById(select.value);
    if (el instanceof HTMLDetailsElement) el.open = true;
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    select.value = '';
  }

  // --------------------------------------------------------------------
  /** 只替漢字標讀音：詞尾與讀音相同的假名（送り仮名）不重複標注，例如 開く／あく → 開(あ)く */
  rubyParts(word: string, kana: string): { base: string; reading: string; tail: string } {
    let n = 0;
    while (n < word.length - 1 && n < kana.length - 1 && word[word.length - 1 - n] === kana[kana.length - 1 - n]) n++;
    return {
      base: word.slice(0, word.length - n),
      reading: kana.slice(0, kana.length - n),
      tail: word.slice(word.length - n),
    };
  }
}

// Cores
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
// Store
import type { OnomatopoeiaGroup } from '../../grammar-review.model';
import { GrammarReviewStore } from '../../grammar-review.store';
// Data
import { ONOMATOPOEIA_GROUPS } from './grammar-onomatopoeia.data';

@Component({
  selector: 'app-grammar-onomatopoeia-tab',
  templateUrl: './grammar-onomatopoeia-tab.component.html',
  standalone: true,
  host: {
    class:
      'flex flex-col gap-4 [&_rt]:text-[0.5em] [&_rt]:font-normal [&_rt]:text-text-muted [&_ruby]:[ruby-align:center]',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GrammarOnomatopoeiaTabComponent {
  // Dependencies
  // --------------------------------------------------------------------
  readonly store = inject(GrammarReviewStore);

  // State
  // --------------------------------------------------------------------
  /** 只看常考 */
  readonly onlyHot = signal(false);

  readonly options = ONOMATOPOEIA_GROUPS.map((g, i) => ({ id: `ono-g${i}`, label: g.label }));

  /** 依搜尋與「只看常考」篩選後的分類 */
  readonly groups = computed<(OnomatopoeiaGroup & { id: string })[]>(() => {
    const q = this.store.searchQuery().trim();
    const only = this.onlyHot();
    return ONOMATOPOEIA_GROUPS.map((g, i) => ({
      ...g,
      id: `ono-g${i}`,
      clusters: g.clusters
        .map((c) => ({
          ...c,
          entries: c.entries.filter(
            (e) => (!only || e.hot) && (!q || e.word.includes(q) || e.meaning.includes(q) || e.note.includes(q)),
          ),
        }))
        .filter((c) => c.entries.length > 0),
    })).filter((g) => g.clusters.length > 0);
  });

  /** 搜尋或只看常考時，分類一律展開 */
  readonly openAll = computed(() => this.onlyHot() || this.store.searchQuery().trim().length > 0);

  // Public Handlers
  // --------------------------------------------------------------------
  jumpTo(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const el = document.getElementById(select.value);
    if (el instanceof HTMLDetailsElement) el.open = true;
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    select.value = '';
  }
}

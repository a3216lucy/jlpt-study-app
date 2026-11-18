// Cores
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
// Store
import { SentenceReviewStore } from '../../sentence-review.store';

const DOT_COLOR_CLASS: Record<string, string> = {
  indigo: 'bg-indigo-400',
  teal: 'bg-teal-400',
  amber: 'bg-amber-400',
  violet: 'bg-violet-400',
  sky: 'bg-sky-400',
  rose: 'bg-rose-400',
  emerald: 'bg-emerald-400',
  orange: 'bg-orange-400',
  red: 'bg-red-400',
  cyan: 'bg-cyan-400',
  lime: 'bg-lime-400',
  slate: 'bg-slate-400',
  purple: 'bg-purple-400',
  fuchsia: 'bg-fuchsia-400',
  pink: 'bg-pink-400',
};

@Component({
  selector: 'app-sentence-category-sidebar',
  templateUrl: './sentence-category-sidebar.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SentenceCategorySidebarComponent {
  // Dependencies
  // --------------------------------------------------------------------
  readonly store = inject(SentenceReviewStore);

  /** 所有分類加起來的句型數（「全部」旁邊的數字） */
  readonly totalCount = computed(() => this.store.displayGroups().reduce((n, g) => n + g.patterns.length, 0));

  // Public Handlers
  // --------------------------------------------------------------------
  onSelect(event: Event): void {
    this.store.selectGroup((event.target as HTMLSelectElement).value);
  }

  dotClass(color: string): string {
    return DOT_COLOR_CLASS[color] ?? 'bg-slate-400';
  }
}

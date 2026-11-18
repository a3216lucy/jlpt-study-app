// Cores
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
// Store
import { QuizStore } from '../../quiz.store';
// Models
import { VOCAB_ADVERB_SUBTYPES, VOCAB_FILTER_CATEGORIES, VOCAB_LEVELS } from '../../quiz.model';
import type { VocabLevelFilter } from '../../quiz.model';

@Component({
  selector: 'app-vocab-filters',
  templateUrl: './vocab-filters.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VocabFiltersComponent {
  // Dependencies
  // --------------------------------------------------------------------
  readonly store = inject(QuizStore);

  // Constants
  // --------------------------------------------------------------------
  readonly filterCategories = VOCAB_FILTER_CATEGORIES;
  readonly adverbSubtypes = VOCAB_ADVERB_SUBTYPES;
  // Public Handlers
  // --------------------------------------------------------------------
  onLevel(event: Event): void {
    this.store.selectLevelFilter((event.target as HTMLSelectElement).value as VocabLevelFilter);
  }

  onTag(event: Event): void {
    this.store.selectTagFilter((event.target as HTMLSelectElement).value as 'all' | 'frequent' | 'personal-review');
  }

  onCategory(event: Event): void {
    const v = (event.target as HTMLSelectElement).value;
    this.store.selectCategory(v || null);
  }

  onSubtype(event: Event): void {
    const v = (event.target as HTMLSelectElement).value;
    this.store.selectSubtype(v || null);
  }

  readonly levelOptions: { value: VocabLevelFilter; label: string }[] = [
    ...VOCAB_LEVELS.map((lv) => ({ value: lv, label: lv })),
    { value: 'all', label: '全部' },
  ];
}

// Cores
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
// Store
import { QuizStore } from '../../quiz.store';
// Models
import { VOCAB_FILTER_CATEGORIES, VOCAB_LEVELS } from '../../quiz.model';
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
  readonly levelOptions: { value: VocabLevelFilter; label: string }[] = [
    ...VOCAB_LEVELS.map((lv) => ({ value: lv, label: lv })),
    { value: 'all', label: '全部' },
  ];
}

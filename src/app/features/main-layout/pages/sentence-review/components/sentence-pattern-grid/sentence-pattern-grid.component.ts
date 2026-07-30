// Cores
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
// Store
import { SentenceReviewStore } from '../../sentence-review.store';

@Component({
  selector: 'app-sentence-pattern-grid',
  templateUrl: './sentence-pattern-grid.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SentencePatternGridComponent {
  // Dependencies
  // --------------------------------------------------------------------
  readonly store = inject(SentenceReviewStore);
}

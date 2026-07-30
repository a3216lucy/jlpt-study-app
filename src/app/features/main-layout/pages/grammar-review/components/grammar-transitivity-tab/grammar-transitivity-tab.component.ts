// Cores
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
// Store
import { GrammarReviewStore } from '../../grammar-review.store';

@Component({
  selector: 'app-grammar-transitivity-tab',
  templateUrl: './grammar-transitivity-tab.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GrammarTransitivityTabComponent {
  // Dependencies
  // --------------------------------------------------------------------
  readonly store = inject(GrammarReviewStore);
}

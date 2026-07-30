// Cores
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
// Angular
import { RouterLink } from '@angular/router';
// Store
import { SentenceReviewStore } from './sentence-review.store';
import type { JlptLevel } from './sentence-review.model';
// Components
import { SentenceCategorySidebarComponent } from './components/sentence-category-sidebar/sentence-category-sidebar.component';
import { SentencePatternGridComponent } from './components/sentence-pattern-grid/sentence-pattern-grid.component';

@Component({
  selector: 'app-sentence-review',
  templateUrl: './sentence-review.page.html',
  standalone: true,
  imports: [RouterLink, SentenceCategorySidebarComponent, SentencePatternGridComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SentenceReviewStore],
})
export class SentenceReviewPage implements OnInit {
  // Dependencies
  // --------------------------------------------------------------------
  readonly store = inject(SentenceReviewStore);

  // Constants
  // --------------------------------------------------------------------
  readonly levels: JlptLevel[] = ['N1', 'N2', 'N3', 'N4', 'N5'];

  // Lifecycle
  // --------------------------------------------------------------------
  ngOnInit() {
    this.store.init();
  }
}

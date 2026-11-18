// Cores
import { ChangeDetectionStrategy, Component, signal, OnInit, inject } from '@angular/core';
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

  /** 手機版搜尋框是否展開（平板以上一律顯示） */
  readonly searchOpen = signal(false);

  openSearch(input: HTMLInputElement): void {
    this.searchOpen.set(true);
    setTimeout(() => input.focus());
  }

  closeSearch(): void {
    this.store.setSearchQuery('');
    this.searchOpen.set(false);
  }

  // Lifecycle
  // --------------------------------------------------------------------
  ngOnInit() {
    this.store.init();
  }
}

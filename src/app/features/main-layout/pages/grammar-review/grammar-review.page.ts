// Cores
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
// Store
import { GrammarReviewStore } from './grammar-review.store';
// Components
import { GrammarConjugationTabComponent } from './components/grammar-conjugation-tab/grammar-conjugation-tab.component';
import { GrammarKeigoTabComponent } from './components/grammar-keigo-tab/grammar-keigo-tab.component';
import { GrammarTransitivityTabComponent } from './components/grammar-transitivity-tab/grammar-transitivity-tab.component';
import { GrammarRulesTabComponent } from './components/grammar-rules-tab/grammar-rules-tab.component';
import { GrammarCompoundVerbTabComponent } from './components/grammar-compound-verb-tab/grammar-compound-verb-tab.component';

const SEARCH_PLACEHOLDER: Record<string, string> = {
  conjugation: '搜尋動詞或活用形…',
  keigo: '搜尋敬語動詞…',
  transitivity: '搜尋…',
  rules: '搜尋活用形…',
  'compound-verb': '搜尋複合動詞分類…',
};

@Component({
  selector: 'app-grammar-review',
  templateUrl: './grammar-review.page.html',
  standalone: true,
  imports: [
    GrammarConjugationTabComponent,
    GrammarKeigoTabComponent,
    GrammarTransitivityTabComponent,
    GrammarRulesTabComponent,
    GrammarCompoundVerbTabComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [GrammarReviewStore],
})
export class GrammarReviewPage implements OnInit {
  // Dependencies
  // --------------------------------------------------------------------
  readonly store = inject(GrammarReviewStore);

  // Lifecycle
  // --------------------------------------------------------------------
  ngOnInit() {
    this.store.init();
  }

  // Public Handlers
  // --------------------------------------------------------------------
  searchPlaceholder(): string {
    return SEARCH_PLACEHOLDER[this.store.activeTab()] ?? '搜尋…';
  }
}

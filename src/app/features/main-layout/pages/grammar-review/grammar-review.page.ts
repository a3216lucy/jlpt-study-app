// Cores
import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
// Store
import { GrammarReviewStore } from './grammar-review.store';
import type { ReviewTab } from './grammar-review.model';
// Components
import { GrammarConjugationTabComponent } from './components/grammar-conjugation-tab/grammar-conjugation-tab.component';
import { GrammarKeigoTabComponent } from './components/grammar-keigo-tab/grammar-keigo-tab.component';
import { GrammarTransitivityTabComponent } from './components/grammar-transitivity-tab/grammar-transitivity-tab.component';
import { GrammarOnomatopoeiaTabComponent } from './components/grammar-onomatopoeia-tab/grammar-onomatopoeia-tab.component';
import { GrammarAffixTabComponent } from './components/grammar-affix-tab/grammar-affix-tab.component';
import { GrammarNotesTabComponent } from './components/grammar-notes-tab/grammar-notes-tab.component';
import { STYLE_SECTIONS } from './components/grammar-notes-tab/style.data';
import { CONJUNCTION_SECTIONS } from './components/grammar-notes-tab/conjunction.data';
import { PARTICLE_SECTIONS } from './components/grammar-notes-tab/particle.data';
import { SORT_SECTIONS } from './components/grammar-notes-tab/sort.data';
import { GIVE_SECTIONS } from './components/grammar-notes-tab/give.data';
import { GrammarCompoundVerbTabComponent } from './components/grammar-compound-verb-tab/grammar-compound-verb-tab.component';

const SEARCH_PLACEHOLDER: Record<string, string> = {
  conjugation: '搜尋動詞、活用形或音便…',
  style: '',
  give: '',
  conjunction: '',
  particle: '',
  sort: '',
  keigo: '搜尋敬語動詞…',
  transitivity: '搜尋…',
  'compound-verb': '搜尋複合動詞分類…',
  affix: '搜尋接頭・接尾詞或例詞…',
  onomatopoeia: '搜尋擬聲擬態語…',
};

@Component({
  selector: 'app-grammar-review',
  templateUrl: './grammar-review.page.html',
  standalone: true,
  imports: [
    GrammarConjugationTabComponent,
    GrammarKeigoTabComponent,
    GrammarTransitivityTabComponent,
    GrammarCompoundVerbTabComponent,
    GrammarAffixTabComponent,
    GrammarOnomatopoeiaTabComponent,
    GrammarNotesTabComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [GrammarReviewStore],
})
export class GrammarReviewPage implements OnInit {
  // Dependencies
  // --------------------------------------------------------------------
  readonly store = inject(GrammarReviewStore);

  // Constants
  // --------------------------------------------------------------------
  /** 手機版搜尋框是否展開（平板以上一律顯示） */
  readonly searchOpen = signal(false);

  openSearch(input: HTMLInputElement): void {
    this.searchOpen.set(true);
    setTimeout(() => input.focus());
  }

  closeSearch(): void {
    this.store.setSearch('');
    this.searchOpen.set(false);
  }

  readonly styleSections = STYLE_SECTIONS;
  readonly giveSections = GIVE_SECTIONS;
  readonly sortSections = SORT_SECTIONS;
  readonly particleSections = PARTICLE_SECTIONS;
  readonly conjunctionSections = CONJUNCTION_SECTIONS;

  readonly tabOptions: { value: ReviewTab; label: string }[] = [
    { value: 'conjugation', label: '動詞活用與規則' },
    { value: 'style', label: '文體' },
    { value: 'keigo', label: '敬語與謙讓語' },
    { value: 'give', label: '授受動詞' },
    { value: 'transitivity', label: '自他動詞' },
    { value: 'compound-verb', label: '複合動詞' },
    { value: 'onomatopoeia', label: '擬聲擬態語' },
    { value: 'affix', label: '接頭・接尾' },
    { value: 'particle', label: '助詞' },
    { value: 'conjunction', label: '接續詞' },
    { value: 'sort', label: '排序題' },
  ];

  // Lifecycle
  // --------------------------------------------------------------------
  ngOnInit() {
    this.store.init();
  }

  // Public Handlers
  // --------------------------------------------------------------------
  onTabSelect(event: Event): void {
    this.store.switchTab((event.target as HTMLSelectElement).value as ReviewTab);
  }

  searchPlaceholder(): string {
    return SEARCH_PLACEHOLDER[this.store.activeTab()] ?? '搜尋…';
  }
}

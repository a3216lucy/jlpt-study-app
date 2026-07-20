// Cores
import { Injectable, computed, inject, signal } from '@angular/core';
// Angular
import { HttpClient } from '@angular/common/http';
// Models
import type {
  AllFormsCategory,
  QuickReferenceRow,
  ReviewTab,
  SpecialVerbRow,
  TransitivityData,
  TransitivityPair,
  VerbConjugationData,
} from './grammar-review.model';

export type { ReviewTab };

@Injectable()
export class GrammarReviewStore {
  // Dependencies
  // --------------------------------------------------------------------
  private http = inject(HttpClient);

  // Signals
  // --------------------------------------------------------------------
  readonly activeTab = signal<ReviewTab>('conjugation');
  readonly searchQuery = signal('');

  readonly verbData = signal<VerbConjugationData | null>(null);
  readonly verbLoading = signal(false);

  readonly transitivityData = signal<TransitivityData | null>(null);
  readonly transitivityLoading = signal(false);

  // Computed
  // --------------------------------------------------------------------
  readonly isSearching = computed(() => this.searchQuery().trim().length > 0);

  readonly filteredQuickReference = computed<QuickReferenceRow[]>(() => {
    const q = this.searchQuery().trim().toLowerCase();
    const rows = this.verbData()?.quickReference ?? [];
    if (!q) return rows;
    return rows.filter(
      (r) =>
        r.formLabel.toLowerCase().includes(q) ||
        r.groupI.includes(q) ||
        r.groupII.includes(q) ||
        r.groupIII.includes(q),
    );
  });

  readonly filteredSpecialVerbTable = computed<SpecialVerbRow[]>(() => {
    const q = this.searchQuery().trim().toLowerCase();
    const rows = this.verbData()?.specialVerbTable ?? [];
    if (!q) return rows;
    return rows.filter(
      (r) =>
        r.plain.toLowerCase().includes(q) ||
        r.meaning.includes(q) ||
        r.sonkei.includes(q) ||
        r.kenjou.includes(q),
    );
  });

  readonly filteredTransitivityPairs = computed<TransitivityPair[]>(() => {
    const q = this.searchQuery().trim().toLowerCase();
    const rows = this.transitivityData()?.pairs ?? [];
    if (!q) return rows;
    return rows.filter(
      (r) => r.jidoushi.toLowerCase().includes(q) || r.tadoushi.toLowerCase().includes(q) || r.meaning.includes(q),
    );
  });

  readonly filteredAllForms = computed<AllFormsCategory[]>(() => {
    const q = this.searchQuery().trim().toLowerCase();
    const categories = this.verbData()?.allForms ?? [];
    if (!q) return categories;
    return categories
      .map((c) => ({
        ...c,
        rows: c.rows.filter(
          (r) =>
            r.formLabel.includes(q) ||
            r.groupI.toLowerCase().includes(q) ||
            r.groupII.toLowerCase().includes(q) ||
            r.groupIII.toLowerCase().includes(q),
        ),
      }))
      .filter((c) => c.rows.length > 0);
  });

  // Lifecycle
  // --------------------------------------------------------------------
  init(): void {
    this.loadVerbData();
  }

  // Public Handlers
  // --------------------------------------------------------------------
  switchTab(tab: ReviewTab): void {
    this.activeTab.set(tab);
    this.searchQuery.set('');
    if (tab === 'transitivity' && !this.transitivityData() && !this.transitivityLoading()) {
      this.loadTransitivityData();
    }
  }

  setSearch(q: string): void {
    this.searchQuery.set(q);
  }

  // Private
  // --------------------------------------------------------------------
  private loadVerbData(): void {
    this.verbLoading.set(true);
    this.http.get<VerbConjugationData>('assets/data/verb-conjugation.json').subscribe((data) => {
      this.verbData.set(data);
      this.verbLoading.set(false);
    });
  }

  private loadTransitivityData(): void {
    this.transitivityLoading.set(true);
    this.http.get<TransitivityData>('assets/data/verb-transitivity.json').subscribe((data) => {
      this.transitivityData.set(data);
      this.transitivityLoading.set(false);
    });
  }
}

// Cores
import { computed, inject } from '@angular/core';
// NgRx Signals
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
// Angular
import { HttpClient } from '@angular/common/http';
// Models
import type {
  AllFormsCategory,
  CompoundVerbPattern,
  CompoundVerbRuleData,
  QuickReferenceRow,
  ReviewTab,
  SpecialVerbRow,
  TransitivityData,
  TransitivityPair,
  VerbConjugationData,
} from './grammar-review.model';

export type { ReviewTab };

interface GrammarReviewState {
  activeTab: ReviewTab;
  searchQuery: string;
  verbData: VerbConjugationData | null;
  verbLoading: boolean;
  transitivityData: TransitivityData | null;
  transitivityLoading: boolean;
  compoundVerbData: CompoundVerbRuleData | null;
  compoundVerbLoading: boolean;
}

const initialState: GrammarReviewState = {
  activeTab: 'conjugation',
  searchQuery: '',
  verbData: null,
  verbLoading: false,
  transitivityData: null,
  transitivityLoading: false,
  compoundVerbData: null,
  compoundVerbLoading: false,
};

export const GrammarReviewStore = signalStore(
  withState(initialState),
  withComputed((store) => ({
    isSearching: computed(() => store.searchQuery().trim().length > 0),
  })),
  withComputed((store) => ({
    filteredQuickReference: computed<QuickReferenceRow[]>(() => {
      const q = store.searchQuery().trim().toLowerCase();
      const rows = store.verbData()?.quickReference ?? [];
      if (!q) return rows;
      return rows.filter(
        (r) =>
          r.formLabel.toLowerCase().includes(q) ||
          r.groupI.includes(q) ||
          r.groupII.includes(q) ||
          r.groupIII.includes(q),
      );
    }),
    filteredSpecialVerbTable: computed<SpecialVerbRow[]>(() => {
      const q = store.searchQuery().trim().toLowerCase();
      const rows = store.verbData()?.specialVerbTable ?? [];
      if (!q) return rows;
      return rows.filter(
        (r) =>
          r.plain.toLowerCase().includes(q) ||
          r.meaning.includes(q) ||
          r.sonkei.includes(q) ||
          r.kenjou.includes(q),
      );
    }),
    filteredTransitivityPairs: computed<TransitivityPair[]>(() => {
      const q = store.searchQuery().trim().toLowerCase();
      const rows = store.transitivityData()?.pairs ?? [];
      if (!q) return rows;
      return rows.filter(
        (r) => r.jidoushi.toLowerCase().includes(q) || r.tadoushi.toLowerCase().includes(q) || r.meaning.includes(q),
      );
    }),
    filteredAllForms: computed<AllFormsCategory[]>(() => {
      const q = store.searchQuery().trim().toLowerCase();
      const categories = store.verbData()?.allForms ?? [];
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
    }),
    filteredCompoundVerbPatterns: computed<CompoundVerbPattern[]>(() => {
      const q = store.searchQuery().trim().toLowerCase();
      const patterns = store.compoundVerbData()?.groups[0]?.patterns ?? [];
      if (!q) return patterns;
      return patterns.filter(
        (p) =>
          p.pattern.includes(q) ||
          p.meaning.includes(q) ||
          p.notes.includes(q) ||
          p.examples.some((e) => e.jp.includes(q) || e.zh.includes(q)),
      );
    }),
  })),
  withMethods((store, http = inject(HttpClient)) => {
    const loadVerbData = (): void => {
      patchState(store, { verbLoading: true });
      http.get<VerbConjugationData>('assets/data/verb-conjugation.json').subscribe((data) => {
        patchState(store, { verbData: data, verbLoading: false });
      });
    };

    const loadTransitivityData = (): void => {
      patchState(store, { transitivityLoading: true });
      http.get<TransitivityData>('assets/data/verb-transitivity.json').subscribe((data) => {
        patchState(store, { transitivityData: data, transitivityLoading: false });
      });
    };

    const loadCompoundVerbData = (): void => {
      patchState(store, { compoundVerbLoading: true });
      http.get<CompoundVerbRuleData>('assets/data/grammar-n3-review.json').subscribe((data) => {
        const cvGroup = data.groups.find((g) => g.id === 'compound-verbs');
        patchState(store, {
          compoundVerbData: { title: data.title, groups: cvGroup ? [cvGroup] : [] },
          compoundVerbLoading: false,
        });
      });
    };

    return {
      // Lifecycle
      // --------------------------------------------------------------------
      init(): void {
        loadVerbData();
      },

      // Public Handlers
      // --------------------------------------------------------------------
      switchTab(tab: ReviewTab): void {
        patchState(store, { activeTab: tab, searchQuery: '' });
        if (tab === 'transitivity' && !store.transitivityData() && !store.transitivityLoading()) {
          loadTransitivityData();
        }
        if (tab === 'compound-verb' && !store.compoundVerbData() && !store.compoundVerbLoading()) {
          loadCompoundVerbData();
        }
      },

      setSearch(q: string): void {
        patchState(store, { searchQuery: q });
      },
    };
  }),
);

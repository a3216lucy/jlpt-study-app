// Cores
import { computed, inject } from '@angular/core';
// NgRx Signals
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
// Angular
import { HttpClient } from '@angular/common/http';
// Angular Fire
import { Auth } from '@angular/fire/auth';
// Shared
import { BookmarkService } from '@core/services/bookmark.service';
// Models
import {
  LEVEL_DATA_MAP,
  type JlptLevel,
  type SentencePatternGroup,
  type SentencePattern,
  type SentenceReviewData,
  type SentenceReviewTab,
} from './sentence-review.model';

const BOOKMARK_KEY = 'sentencePatterns';

interface SentenceReviewState {
  selectedLevel: JlptLevel;
  activeTab: SentenceReviewTab;
  reviewData: SentenceReviewData | null;
  loading: boolean;
  selectedGroupId: string | null;
  bookmarkedIds: Set<string>;
  searchQuery: string;
}

const initialState: SentenceReviewState = {
  selectedLevel: 'N3',
  activeTab: 'common',
  reviewData: null,
  loading: false,
  selectedGroupId: null,
  bookmarkedIds: new Set(),
  searchQuery: '',
};

export const SentenceReviewStore = signalStore(
  withState(initialState),
  withComputed((store) => ({
    hasData: computed(() => !!LEVEL_DATA_MAP[store.selectedLevel()]),
    commonGroups: computed<SentencePatternGroup[]>(() =>
      (store.reviewData()?.groups ?? []).filter((g) => !g.id.startsWith('exam-') && g.id !== 'compound-verbs'),
    ),
    examGroups: computed<SentencePatternGroup[]>(() =>
      (store.reviewData()?.groups ?? []).filter((g) => g.id.startsWith('exam-')),
    ),
    isSearching: computed(() => store.searchQuery().trim().length > 0),
    bookmarkedCount: computed(() => store.bookmarkedIds().size),
  })),
  withComputed((store) => ({
    displayGroups: computed(() => (store.activeTab() === 'common' ? store.commonGroups() : store.examGroups())),
  })),
  withComputed((store) => ({
    selectedGroup: computed<SentencePatternGroup | null>(() => {
      const groups = store.displayGroups();
      const id = store.selectedGroupId();
      return groups.find((g) => g.id === id) ?? groups[0] ?? null;
    }),
    /** 有搜尋字串時跨目前頁籤（常用/考題）所有分類搜尋，而非只搜當前選取的分類 */
    searchResults: computed<SentencePattern[]>(() => {
      const query = store.searchQuery().trim().toLowerCase();
      if (!query) return [];
      return store
        .displayGroups()
        .flatMap((g) => g.patterns)
        .filter((p) =>
          [p.pattern, p.meaning, p.formation, p.notes].some((field) => field?.toLowerCase().includes(query)),
        );
    }),
    totalPatternCount: computed(() => store.displayGroups().reduce((sum, g) => sum + g.patterns.length, 0)),
  })),
  withComputed((store) => ({
    displayPatterns: computed<SentencePattern[]>(() => store.selectedGroup()?.patterns ?? []),
  })),
  withComputed((store) => ({
    visiblePatterns: computed<SentencePattern[]>(() =>
      store.isSearching() ? store.searchResults() : store.displayPatterns(),
    ),
  })),
  withMethods((store, http = inject(HttpClient), auth = inject(Auth), bookmarkService = inject(BookmarkService)) => {
    const loadLevel = (level: JlptLevel): void => {
      const path = LEVEL_DATA_MAP[level];
      if (!path) return;

      patchState(store, { loading: true, reviewData: null });
      http.get<SentenceReviewData>(path).subscribe((data) => {
        patchState(store, {
          reviewData: data,
          selectedGroupId: data.groups.find((g) => !g.id.startsWith('exam-'))?.id ?? null,
          loading: false,
        });
      });
    };

    const loadBookmarks = async (): Promise<void> => {
      const uid = auth.currentUser?.uid;
      if (!uid) return;

      try {
        const ids = await bookmarkService.getBookmarks(uid, BOOKMARK_KEY);
        patchState(store, { bookmarkedIds: new Set(ids) });
      } catch (e) {
        console.error('load bookmarks failed', e);
      }
    };

    return {
      // Lifecycle
      // --------------------------------------------------------------------
      init(): void {
        loadLevel('N3');
        loadBookmarks();
      },

      // Public Handlers
      // --------------------------------------------------------------------
      selectLevel(level: JlptLevel): void {
        patchState(store, { selectedLevel: level, selectedGroupId: null });
        if (LEVEL_DATA_MAP[level]) {
          loadLevel(level);
        } else {
          patchState(store, { reviewData: null });
        }
      },

      switchTab(tab: SentenceReviewTab): void {
        patchState(store, { activeTab: tab, selectedGroupId: null });
      },

      selectGroup(id: string): void {
        patchState(store, { selectedGroupId: id });
      },

      setSearchQuery(query: string): void {
        patchState(store, { searchQuery: query });
      },

      isBookmarked(patternId: string): boolean {
        return store.bookmarkedIds().has(patternId);
      },

      async toggleBookmark(patternId: string): Promise<void> {
        const uid = auth.currentUser?.uid;
        if (!uid) return;

        const current = new Set(store.bookmarkedIds());
        if (current.has(patternId)) {
          current.delete(patternId);
        } else {
          current.add(patternId);
        }
        patchState(store, { bookmarkedIds: current });

        try {
          await bookmarkService.setBookmarks(uid, BOOKMARK_KEY, Array.from(current));
        } catch (e) {
          console.error('save bookmark failed', e);
        }
      },
    };
  }),
);

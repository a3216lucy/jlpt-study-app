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
import { TargetLevelService } from '@core/services/target-level.service';
// Models
import {
  LEVEL_DATA_MAP,
  type JlptLevel,
  type SentencePatternGroup,
  type SentencePattern,
  type SentenceReviewData,
  type PatternPracticeMap,
  PRACTICE_DATA_MAP,
} from './sentence-review.model';

const BOOKMARK_KEY = 'sentencePatterns';
/** 「全部」分類（不分功能類別，所有句型一起列） */
export const ALL_GROUPS_ID = '__all__';

interface SentenceReviewState {
  selectedLevel: JlptLevel;
  practice: PatternPracticeMap | null;
  reviewData: SentenceReviewData | null;
  loading: boolean;
  selectedGroupId: string | null;
  bookmarkedIds: Set<string>;
  searchQuery: string;
  /** 只看考古題考過的句型 */
  onlyHot: boolean;
  /** 只看收藏（不熟）的句型 */
  onlyBookmarked: boolean;
  /** 展開中的句型卡片 */
  openIds: Set<string>;
}

const initialState: SentenceReviewState = {
  selectedLevel: 'N3',
  practice: null,
  reviewData: null,
  loading: false,
  selectedGroupId: null,
  bookmarkedIds: new Set(),
  searchQuery: '',
  onlyHot: false,
  onlyBookmarked: false,
  openIds: new Set(),
};

/** 套用「只看常考」「只看收藏」篩選 */
function applyFilters(
  patterns: SentencePattern[],
  onlyHot: boolean,
  onlyBookmarked: boolean,
  bookmarked: Set<string>,
): SentencePattern[] {
  return patterns.filter((p) => (!onlyHot || p.hot) && (!onlyBookmarked || bookmarked.has(p.id)));
}

export const SentenceReviewStore = signalStore(
  withState(initialState),
  withComputed((store) => ({
    hasData: computed(() => !!LEVEL_DATA_MAP[store.selectedLevel()]),
    displayGroups: computed<SentencePatternGroup[]>(() =>
      (store.reviewData()?.groups ?? []).filter((g) => g.id !== 'compound-verbs'),
    ),
    isSearching: computed(() => store.searchQuery().trim().length > 0),
    bookmarkedCount: computed(() => store.bookmarkedIds().size),
  })),
  withComputed((store) => ({
    isAllSelected: computed(() => store.selectedGroupId() === ALL_GROUPS_ID),
    selectedGroup: computed<SentencePatternGroup | null>(() => {
      const groups = store.displayGroups();
      const id = store.selectedGroupId();
      if (id === ALL_GROUPS_ID) return null;
      return groups.find((g) => g.id === id) ?? groups[0] ?? null;
    }),
    /** 有搜尋字串時跨目前頁籤（常用/考題）所有分類搜尋，而非只搜當前選取的分類 */
    searchResults: computed<SentencePattern[]>(() => {
      const query = store.searchQuery().trim().toLowerCase();
      if (!query) return [];
      return applyFilters(
        store.displayGroups().flatMap((g) => g.patterns),
        store.onlyHot(),
        store.onlyBookmarked(),
        store.bookmarkedIds(),
      ).filter((p) => [p.pattern, p.meaning, p.formation, p.notes].some((field) => field?.toLowerCase().includes(query)));
    }),
    totalPatternCount: computed(() =>
      store
        .displayGroups()
        .reduce(
          (sum, g) => sum + applyFilters(g.patterns, store.onlyHot(), store.onlyBookmarked(), store.bookmarkedIds()).length,
          0,
        ),
    ),
  })),
  withComputed((store) => ({
    displayPatterns: computed<SentencePattern[]>(() =>
      applyFilters(
        store.isAllSelected() ? store.displayGroups().flatMap((g) => g.patterns) : (store.selectedGroup()?.patterns ?? []),
        store.onlyHot(),
        store.onlyBookmarked(),
        store.bookmarkedIds(),
      ),
    ),
  })),
  withComputed((store) => ({
    visiblePatterns: computed<SentencePattern[]>(() =>
      store.isSearching() ? store.searchResults() : store.displayPatterns(),
    ),
  })),
  withComputed((store) => ({
    allOpen: computed(() => {
      const ids = store.visiblePatterns().map((p) => p.id);
      return ids.length > 0 && ids.every((id) => store.openIds().has(id));
    }),
  })),
  withMethods((store, http = inject(HttpClient), auth = inject(Auth), bookmarkService = inject(BookmarkService), targetLevel = inject(TargetLevelService)) => {
    let levelApplied = false;
    const loadLevel = (level: JlptLevel): void => {
      const path = LEVEL_DATA_MAP[level];
      if (!path) return;

      patchState(store, { loading: true, reviewData: null });
      http.get<SentenceReviewData>(path).subscribe((data) => {
        patchState(store, {
          reviewData: data,
          selectedGroupId: data.groups.find((g) => g.id !== 'compound-verbs')?.id ?? null,
          practice: null,
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
        // 第一次進頁面：級別預設依個人設定的應考目標（沒有該級別資料就維持預設）
        void (async () => {
          if (!levelApplied) {
            levelApplied = true;
            const target = (await targetLevel.load()) as JlptLevel;
            if (LEVEL_DATA_MAP[target]) patchState(store, { selectedLevel: target });
          }
          loadLevel(store.selectedLevel());
          loadBookmarks();
        })();
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

      /** 第一次展開練習時才載入該級別的練習題 */
      loadPractice(): void {
        const path = PRACTICE_DATA_MAP[store.selectedLevel()];
        if (!path || store.practice()) return;
        http.get<PatternPracticeMap>(path).subscribe((data) => patchState(store, { practice: data }));
      },

      selectGroup(id: string): void {
        patchState(store, { selectedGroupId: id });
      },

      togglePattern(id: string): void {
        const next = new Set(store.openIds());
        if (next.has(id)) next.delete(id);
        else next.add(id);
        patchState(store, { openIds: next });
      },

      /** 全部展開／收合目前顯示的句型 */
      toggleAllOpen(): void {
        const ids = store.visiblePatterns().map((p) => p.id);
        const allOpen = ids.length > 0 && ids.every((id) => store.openIds().has(id));
        patchState(store, { openIds: allOpen ? new Set() : new Set(ids) });
      },

      setOnlyHot(value: boolean): void {
        patchState(store, { onlyHot: value });
      },

      setOnlyBookmarked(value: boolean): void {
        patchState(store, { onlyBookmarked: value });
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

// Cores
import { computed, inject } from '@angular/core';
// NgRx Signals
import { patchState, signalStoreFeature, withComputed, withMethods, withState } from '@ngrx/signals';
// Angular
import { HttpClient } from '@angular/common/http';
// Models
import { VOCAB_FILTER_CATEGORIES, vocabEntryLevel } from '../quiz.model';
import type { VocabEntry, VocabLevelFilter, VocabReviewData, VocabTagFilter } from '../quiz.model';

const WRONG_WORDS_KEY = 'jlpt-app:wrong-words';
const MARKED_WORDS_KEY = 'jlpt-app:marked-words';

/** 原本就依詞性命名的群組，跟詞性篩選重複，不在「單字分類」篩選列另外列出；personal-review 在常考標記列單獨顯示 */
const BASE_GROUP_IDS = new Set(['verbs', 'adverbs', 'nouns', 'expressions', 'personal-review', 'compoundVerbs']);

interface VocabDataState {
  data: VocabReviewData | null;
  loading: boolean;
  selectedCategoryId: string | null;
  /** 級別篩選；預設 N3，切到 N2 才看得到 N2 考古題單字 */
  levelFilter: VocabLevelFilter;
  tagFilter: VocabTagFilter;
  selectedGroupId: string | null;
  expandedIds: Set<string>;
  /** localStorage fallback when no plan */
  wrongWordIds: Set<string>;
  /** localStorage，跨 session 保留 */
  markedWordIds: Set<string>;
}

const initialState: VocabDataState = {
  data: null,
  loading: false,
  selectedCategoryId: null,
  levelFilter: 'N3',
  tagFilter: 'all',
  selectedGroupId: null,
  expandedIds: new Set(),
  wrongWordIds: new Set(),
  markedWordIds: new Set(),
};

/** 單詞頁：資料載入、單詞列表篩選、錯題/標記單字管理（自成一體，不依賴其他切片） */
export function vocabDataFeature() {
  return signalStoreFeature(
    withState(initialState),
    withComputed((store) => ({
      groups: computed(() => store.data()?.groups ?? []),
    })),
    withComputed((store) => ({
      allEntries: computed(() => store.groups().flatMap((g) => g.entries)),
      /** 只列出詞性以外的「額外收藏」群組（個人複習整理／複合動詞…），避免跟詞性篩選重複 */
      extraGroups: computed(() => store.groups().filter((g) => !BASE_GROUP_IDS.has(g.id))),
    })),
    withComputed((store) => ({
      /** 依目前級別篩選後的 entry 判斷函式（列表篩選與各標記計數共用） */
      matchesLevel: computed(() => {
        const level = store.levelFilter();
        return (e: VocabEntry) => level === 'all' || vocabEntryLevel(e) === level;
      }),
    })),
    withComputed((store) => ({
      personalReviewCount: computed(
        () =>
          store
            .groups()
            .find((g) => g.id === 'personal-review')
            ?.entries.filter(store.matchesLevel()).length ?? 0,
      ),
      filteredEntries: computed<VocabEntry[]>(() => {
        const categoryId = store.selectedCategoryId();
        const category = categoryId ? VOCAB_FILTER_CATEGORIES.find((c) => c.id === categoryId) : null;
        const tagFilter = store.tagFilter();
        const groupId = store.selectedGroupId();

        let source: VocabEntry[];
        if (tagFilter === 'personal-review') {
          const prGroup = store.groups().find((g) => g.id === 'personal-review');
          source = prGroup ? prGroup.entries : [];
        } else {
          const group = groupId ? store.groups().find((g) => g.id === groupId) : null;
          source = group ? group.entries : store.allEntries();
        }

        const matchesLevel = store.matchesLevel();
        return source.filter((e) => {
          if (!matchesLevel(e)) return false;
          if (category && !category.pos.includes(e.pos)) return false;
          if (tagFilter === 'frequent' && !e.frequentlyTested) return false;
          return true;
        });
      }),
      frequentlyTestedCount: computed(
        () => store.allEntries().filter((e) => e.frequentlyTested && store.matchesLevel()(e)).length,
      ),
      wrongWords: computed(() => {
        const ids = store.wrongWordIds();
        return store.allEntries().filter((e) => ids.has(e.id));
      }),
      markedWords: computed(() => {
        const ids = store.markedWordIds();
        return store.allEntries().filter((e) => ids.has(e.id));
      }),
    })),
    withComputed((store) => ({
      totalVisible: computed(() => store.filteredEntries().length),
    })),
    withMethods((store, http = inject(HttpClient)) => {
      const saveWrongWords = (ids: Set<string>): void => {
        if (typeof localStorage === 'undefined') return;
        localStorage.setItem(WRONG_WORDS_KEY, JSON.stringify([...ids]));
      };

      const saveMarkedWords = (ids: Set<string>): void => {
        if (typeof localStorage === 'undefined') return;
        localStorage.setItem(MARKED_WORDS_KEY, JSON.stringify([...ids]));
      };

      return {
        // List mode
        // --------------------------------------------------------------------
        selectCategory(id: string | null): void {
          patchState(store, { selectedCategoryId: id });
        },

        selectLevelFilter(level: VocabLevelFilter): void {
          patchState(store, { levelFilter: level });
        },

        selectTagFilter(filter: VocabTagFilter): void {
          patchState(store, { tagFilter: filter });
        },

        selectGroup(id: string | null): void {
          patchState(store, { selectedGroupId: id });
        },

        toggleExpand(id: string): void {
          const s = new Set(store.expandedIds());
          s.has(id) ? s.delete(id) : s.add(id);
          patchState(store, { expandedIds: s });
        },

        isExpanded(id: string): boolean {
          return store.expandedIds().has(id);
        },

        // Marked words
        // --------------------------------------------------------------------
        toggleMarkedWord(wordId: string): void {
          const s = new Set(store.markedWordIds());
          s.has(wordId) ? s.delete(wordId) : s.add(wordId);
          patchState(store, { markedWordIds: s });
          saveMarkedWords(s);
        },

        isWordMarked(wordId: string): boolean {
          return store.markedWordIds().has(wordId);
        },

        clearMarkedWords(): void {
          patchState(store, { markedWordIds: new Set() });
          if (typeof localStorage !== 'undefined') {
            localStorage.removeItem(MARKED_WORDS_KEY);
          }
        },

        // Wrong words
        // --------------------------------------------------------------------
        /** 答錯時記錄該單字，供「錯題複習」使用；quiz-session 切片答錯時呼叫 */
        markWordWrong(wordId: string): void {
          const s = new Set(store.wrongWordIds());
          s.add(wordId);
          patchState(store, { wrongWordIds: s });
          saveWrongWords(s);
        },

        clearWrongWords(): void {
          patchState(store, { wrongWordIds: new Set() });
          if (typeof localStorage !== 'undefined') {
            localStorage.removeItem(WRONG_WORDS_KEY);
          }
        },

        // Lifecycle（由 quiz.store.ts 的 init() 呼叫）
        // --------------------------------------------------------------------
        async loadVocabData(): Promise<void> {
          return new Promise<void>((resolve) => {
            http.get<VocabReviewData>('assets/data/vocab-review-n3.json').subscribe({
              next: (data) => {
                patchState(store, { data });
                resolve();
              },
              error: () => resolve(),
            });
          });
        },

        loadWrongMarkedWords(): void {
          if (typeof localStorage === 'undefined') return;
          const wrongRaw = localStorage.getItem(WRONG_WORDS_KEY);
          if (wrongRaw) {
            try {
              patchState(store, { wrongWordIds: new Set(JSON.parse(wrongRaw) as string[]) });
            } catch {}
          }
          const markedRaw = localStorage.getItem(MARKED_WORDS_KEY);
          if (markedRaw) {
            try {
              patchState(store, { markedWordIds: new Set(JSON.parse(markedRaw) as string[]) });
            } catch {}
          }
        },
      };
    }),
  );
}

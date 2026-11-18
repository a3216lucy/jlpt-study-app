// Cores
import { inject } from '@angular/core';
// NgRx Signals
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import type { SignalStoreFeature } from '@ngrx/signals';
// Shared
import { TargetLevelService } from '@core/services/target-level.service';
// Models
import { VOCAB_LEVELS } from './quiz.model';
import type { PageMode, VocabLevel } from './quiz.model';
// Store slices
import { vocabDataFeature } from './store/vocab-data.feature';
import { studyPlanFeature } from './store/study-plan.feature';
import { flashcardFeature } from './store/flashcard.feature';
import { quizSessionFeature } from './store/quiz-session.feature';

/**
 * @ngrx/signals 的 `signalStore()` 在 3+ 個 feature、且後面的 feature 需要同時依賴
 * 根層 state 與前面 feature 輸出時，TypeScript 的 overload/泛型推導會失敗（已用最小
 * 案例重現，回報為函式庫本身的型別推導限制，不是本專案程式碼寫錯）。
 * 用「明確指定每個 feature 的輸出型別泛型參數」繞過推導，取代讓 TypeScript 自動推導。
 */
type FeatureOutput<F> = F extends SignalStoreFeature<any, infer O> ? O : never;

interface RootState {
  pageMode: PageMode;
  quizNewlyMasteredCount: number;
}

const initialState: RootState = {
  pageMode: 'list',
  quizNewlyMasteredCount: 0,
};

export const QuizStore = signalStore<
  { state: RootState; props: {}; methods: {} },
  FeatureOutput<ReturnType<typeof vocabDataFeature>>,
  FeatureOutput<ReturnType<typeof studyPlanFeature>>,
  FeatureOutput<ReturnType<typeof flashcardFeature>>,
  FeatureOutput<ReturnType<typeof quizSessionFeature>>,
  { state: {}; props: {}; methods: { init: () => Promise<void> } }
>(
  withState(initialState),
  vocabDataFeature(),
  studyPlanFeature(),
  flashcardFeature(),
  quizSessionFeature(),
  withMethods((store, targetLevel = inject(TargetLevelService)) => {
    let levelApplied = false;
    return {
    // Lifecycle
    // --------------------------------------------------------------------
    async init(): Promise<void> {
      // 第一次進頁面：級別篩選、建立計畫的級別預設依個人設定的應考目標
      if (!levelApplied) {
        levelApplied = true;
        const target = (await targetLevel.load()) as VocabLevel;
        if (VOCAB_LEVELS.includes(target)) {
          store.selectLevelFilter(target);
          store.selectCreatePlanLevel(target);
        }
      }
      store.loadWrongMarkedWords();
      patchState(store, { loading: true });
      try {
        await store.loadVocabData();
        await store.loadPlansAndRecords();
      } finally {
        patchState(store, { loading: false });
      }
    },
    };
  }),
);

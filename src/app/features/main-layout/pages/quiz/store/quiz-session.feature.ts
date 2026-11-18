// Cores
import { Signal, computed } from '@angular/core';
// NgRx Signals
import { patchState, signalStoreFeature, type, withComputed, withMethods, withState } from '@ngrx/signals';
// Models
import type {
  PageMode,
  VocabEntry,
  VocabQuizOption,
  VocabQuizQuestion,
  VocabQuizResult,
  VocabQuizType,
  VocabQuizTypeSetting,
} from '../quiz.model';

interface QuizSessionState {
  quizQuestions: VocabQuizQuestion[];
  quizIndex: number;
  quizSelectedId: string | null;
  quizAnswered: boolean;
  quizResults: VocabQuizResult[];
  quizStartedAt: number | null;
  quizFinishedAt: number | null;
  /** 題型設定（混合或固定一種） */
  quizTypeSetting: VocabQuizTypeSetting;
  /** 每回題數（0＝全部） */
  quizCountSetting: number;
}

const initialState: QuizSessionState = {
  quizQuestions: [],
  quizIndex: 0,
  quizSelectedId: null,
  quizAnswered: false,
  quizResults: [],
  quizStartedAt: null,
  quizFinishedAt: null,
  quizTypeSetting: 'mixed',
  quizCountSetting: 10,
};

/** 單詞頁：單字測驗（4-choice）session（依賴 vocab-data 的 allEntries/filteredEntries/wrongWords/markedWords/markWordWrong、study-plan 的 todayQueue/updateSRS，以及根層的 pageMode/quizNewlyMasteredCount） */
export function quizSessionFeature() {
  return signalStoreFeature(
    type<{
      state: { pageMode: PageMode; quizNewlyMasteredCount: number };
      props: {
        allEntries: Signal<VocabEntry[]>;
        filteredEntries: Signal<VocabEntry[]>;
        wrongWords: Signal<VocabEntry[]>;
        markedWords: Signal<VocabEntry[]>;
        todayQueue: Signal<VocabEntry[]>;
      };
      methods: {
        markWordWrong: (wordId: string) => void;
        updateSRS: (wordId: string, known: boolean) => void;
      };
    }>(),
    withState(initialState),
    withComputed((store) => ({
      currentQuestion: computed(() => store.quizQuestions()[store.quizIndex()] ?? null),
      quizProgress: computed(() => Math.round((store.quizIndex() / (store.quizQuestions().length || 1)) * 100)),
      quizIsLast: computed(() => store.quizIndex() === store.quizQuestions().length - 1),
      quizScore: computed(() => store.quizResults().filter((r) => r.isCorrect).length),
      quizShowResult: computed(
        () => store.quizIndex() >= store.quizQuestions().length && store.quizQuestions().length > 0,
      ),
      quizElapsedLabel: computed(() => {
        const start = store.quizStartedAt();
        const end = store.quizFinishedAt();
        if (!start || !end) return '00:00';
        const totalSeconds = Math.max(0, Math.round((end - start) / 1000));
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
      }),
      quizFinishedDateLabel: computed(() => {
        const end = store.quizFinishedAt();
        if (!end) return '';
        const d = new Date(end);
        return `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}`;
      }),
    })),
    withMethods((store) => {
      const hasKanji = (w: string): boolean => /[一-鿿々]/.test(w);
      const shuffle = <T,>(arr: T[]): T[] => [...arr].sort(() => Math.random() - 0.5);

      /** 這個單字能出哪些題型（讀音題只有「有漢字且讀音不同」的字才出） */
      const eligibleTypes = (entry: VocabEntry): VocabQuizType[] => {
        const types: VocabQuizType[] = ['word-meaning', 'meaning-word'];
        if (entry.reading && entry.reading !== entry.word && hasKanji(entry.word)) types.push('word-reading');
        return types;
      };

      const generateQuestions = (pool: VocabEntry[], count: number): VocabQuizQuestion[] => {
        const all = store.allEntries();
        const selected = shuffle(pool).slice(0, count > 0 ? Math.min(count, pool.length) : pool.length);
        const setting = store.quizTypeSetting();

        return selected.map((entry) => {
          const eligible = eligibleTypes(entry);
          const type: VocabQuizType =
            setting === 'mixed'
              ? eligible[Math.floor(Math.random() * eligible.length)]
              : eligible.includes(setting)
                ? setting
                : 'word-meaning';
          const others = all.filter((e) => e.id !== entry.id);
          let correct: VocabQuizOption;
          let wrong: VocabQuizOption[];

          if (type === 'meaning-word') {
            correct = { id: `${entry.id}:c`, text: entry.word, reading: entry.reading, isCorrect: true };
            wrong = shuffle(others.filter((e) => e.word !== entry.word && e.meaning !== entry.meaning))
              .slice(0, 3)
              .map((d, i) => ({ id: `${entry.id}:w${i}`, text: d.word, reading: d.reading, isCorrect: false }));
          } else if (type === 'word-reading') {
            correct = { id: `${entry.id}:c`, text: entry.reading, isCorrect: true };
            // 干擾選項：讀音長度相近的其他單字讀音
            const seen = new Set([entry.reading]);
            const sorted = shuffle(others)
              .filter((e) => e.reading && e.reading !== entry.word)
              .sort((a, b) => Math.abs(a.reading.length - entry.reading.length) - Math.abs(b.reading.length - entry.reading.length));
            wrong = [];
            for (const d of sorted) {
              if (seen.has(d.reading)) continue;
              seen.add(d.reading);
              wrong.push({ id: `${entry.id}:w${wrong.length}`, text: d.reading, isCorrect: false });
              if (wrong.length === 3) break;
            }
          } else {
            correct = { id: `${entry.id}:c`, text: entry.meaning, isCorrect: true };
            wrong = shuffle(others.filter((e) => e.meaning !== entry.meaning))
              .slice(0, 3)
              .map((d, i) => ({ id: `${entry.id}:w${i}`, text: d.meaning, isCorrect: false }));
          }

          return { id: `q:${entry.id}`, type, entry, options: shuffle([correct, ...wrong]) };
        });
      };

      const syncQuizAnsweredState = (index: number): void => {
        const question = store.quizQuestions()[index];
        if (!question) return;
        const result = store.quizResults().find((r) => r.questionId === question.id);
        if (result) {
          patchState(store, { quizAnswered: true, quizSelectedId: result.selectedOptionId });
        } else {
          patchState(store, { quizAnswered: false, quizSelectedId: null });
        }
      };

      let quizPool: VocabEntry[] = [];
      let quizCount = 10;

      return {
        startQuiz(opts: { wrongOnly?: boolean; markedOnly?: boolean; todayOnly?: boolean; count?: number } = {}): void {
          const count = opts.count ?? store.quizCountSetting();
          let pool: VocabEntry[];

          if (opts.wrongOnly) {
            pool = store.wrongWords();
          } else if (opts.markedOnly) {
            pool = store.markedWords();
          } else if (opts.todayOnly) {
            pool = store.todayQueue();
          } else {
            pool = store.filteredEntries();
          }

          quizPool = pool;
          quizCount = count;
          const qs = generateQuestions(pool, count);
          patchState(store, {
            quizQuestions: qs,
            quizIndex: 0,
            quizSelectedId: null,
            quizAnswered: false,
            quizResults: [],
            quizNewlyMasteredCount: 0,
            quizStartedAt: Date.now(),
            quizFinishedAt: null,
            pageMode: 'quiz',
          });
        },

        setQuizType(type: VocabQuizTypeSetting): void {
          patchState(store, { quizTypeSetting: type });
        },

        setQuizCount(count: number): void {
          patchState(store, { quizCountSetting: count });
        },

        /** 用同一批詞庫重新出一輪新題目 */
        restartQuiz(): void {
          const qs = generateQuestions(quizPool, quizCount);
          patchState(store, {
            quizQuestions: qs,
            quizIndex: 0,
            quizSelectedId: null,
            quizAnswered: false,
            quizResults: [],
            quizNewlyMasteredCount: 0,
            quizStartedAt: Date.now(),
            quizFinishedAt: null,
            pageMode: 'quiz',
          });
        },

        selectQuizOption(option: VocabQuizOption): void {
          if (store.quizAnswered()) return;
          patchState(store, { quizSelectedId: option.id, quizAnswered: true });

          const question = store.currentQuestion()!;
          patchState(store, {
            quizResults: [
              ...store.quizResults(),
              {
                questionId: question.id,
                selectedOptionId: option.id,
                isCorrect: option.isCorrect,
                entry: question.entry,
              },
            ],
          });

          store.updateSRS(question.entry.id, option.isCorrect);

          if (!option.isCorrect) {
            store.markWordWrong(question.entry.id);
          }
        },

        nextQuestion(): void {
          const newIndex = store.quizIndex() + 1;
          patchState(store, { quizIndex: newIndex });
          if (newIndex < store.quizQuestions().length) {
            syncQuizAnsweredState(newIndex);
          } else if (!store.quizFinishedAt()) {
            patchState(store, { quizFinishedAt: Date.now() });
          }
        },

        prevQuizQuestion(): void {
          if (store.quizIndex() === 0) return;
          const newIndex = store.quizIndex() - 1;
          patchState(store, { quizIndex: newIndex });
          syncQuizAnsweredState(newIndex);
        },

        retryWrongFromQuiz(): void {
          const wrongEntries = store
            .quizResults()
            .filter((r) => !r.isCorrect)
            .map((r) => r.entry);
          if (wrongEntries.length === 0) return;
          quizPool = wrongEntries;
          quizCount = wrongEntries.length;
          const qs = generateQuestions(wrongEntries, wrongEntries.length);
          patchState(store, {
            quizQuestions: qs,
            quizIndex: 0,
            quizSelectedId: null,
            quizAnswered: false,
            quizResults: [],
            quizNewlyMasteredCount: 0,
            quizStartedAt: Date.now(),
            quizFinishedAt: null,
            pageMode: 'quiz',
          });
        },

        exitQuiz(): void {
          patchState(store, { quizQuestions: [], quizResults: [], pageMode: 'list' });
        },
      };
    }),
  );
}

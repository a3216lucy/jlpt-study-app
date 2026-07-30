// Cores
import { computed, inject } from '@angular/core';
// NgRx Signals
import { patchState, signalStore, withComputed, withMethods, withProps, withState } from '@ngrx/signals';
// Shared
import { ExamOption, ExamQuestion, ExamQuestionType } from '@core/models/exam-question.model';
import { JlptLevel } from '@core/models/vocab.model';
import { ExamService, ExamSetGroupItem } from '@core/services/exam.service';
// Models
import type { ExamResult, ExamGroupChoice } from './large-quiz.model';

export type AnswerStatus = 'answered' | 'current' | 'unanswered';

interface LargeQuizState {
  selectedExamGroup: string;
  selectedLevel: JlptLevel;
  examTitle: string;
  examDescription: string;
  questions: ExamQuestion[];
  currentIndex: number;
  results: (ExamResult | undefined)[];
  selectedOptionId: string | null;
  loading: boolean;
  started: boolean;
  showResult: boolean;
  loadError: string | null;
}

function toExamGroupChoice(item: ExamSetGroupItem): ExamGroupChoice {
  return {
    id: item.id,
    category: 'grammar',
    type: item.type as ExamQuestionType,
    label: item.label,
    description: item.description,
  };
}

function buildExamGroups(examService: ExamService): readonly ExamGroupChoice[] {
  return examService.listExamGroups('grammar', 'sentence-fill').map(toExamGroupChoice);
}

function shuffle<T>(items: T[]): T[] {
  const cloned = [...items];
  for (let i = cloned.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cloned[i], cloned[j]] = [cloned[j], cloned[i]];
  }
  return cloned;
}

function randomizeQuestions(questions: ExamQuestion[], count = 10): ExamQuestion[] {
  const shuffled = shuffle(questions.map((q) => ({ ...q, options: shuffle([...q.options]) })));
  return shuffled.slice(0, count);
}

export const LargeQuizStore = signalStore(
  withState((): LargeQuizState => {
    const examGroups = buildExamGroups(inject(ExamService));
    return {
      selectedExamGroup: examGroups[0]?.id ?? 'standard-sentence-fill',
      selectedLevel: 'N5',
      examTitle: 'N5 句型填空',
      examDescription: '以句子填空四選一為主的句型測驗題組。',
      questions: [],
      currentIndex: 0,
      results: [],
      selectedOptionId: null,
      loading: false,
      started: false,
      showResult: false,
      loadError: null,
    };
  }),
  withProps(() => ({
    examGroups: buildExamGroups(inject(ExamService)),
  })),
  withComputed((store) => ({
    currentQuestion: computed(() => store.questions()[store.currentIndex()]),
    progress: computed(() =>
      store.questions().length > 0
        ? Math.round(((store.currentIndex() + 1) / store.questions().length) * 100)
        : 0,
    ),
    isLast: computed(() => store.currentIndex() === store.questions().length - 1),
    answeredCount: computed(() => store.results().filter(Boolean).length),
    score: computed(() => store.results().filter((r) => r?.isCorrect).length),
  })),
  withMethods((store, examService = inject(ExamService)) => {
    let startTime = 0;

    const currentExamGroup = (): ExamGroupChoice =>
      store.examGroups.find((g) => g.id === store.selectedExamGroup()) ?? store.examGroups[0];

    const syncSelectionPreview = (): void => {
      const selectedItem = examService.findExamSetForGroup(store.selectedExamGroup(), store.selectedLevel());
      const group = currentExamGroup();
      patchState(store, {
        examTitle: selectedItem?.title ?? `${store.selectedLevel()} ${group?.label ?? '句型測驗'}`,
        examDescription: selectedItem?.description ?? group?.description ?? '',
      });
    };

    const commitCurrentAnswer = (): void => {
      const question = store.currentQuestion();
      const optionId = store.selectedOptionId();
      if (!question || !optionId) return;
      const option = question.options.find((o) => o.id === optionId);
      if (!option) return;

      const idx = store.currentIndex();
      patchState(store, (s) => {
        const next = [...s.results];
        next[idx] = {
          questionId: question.id,
          selectedOptionId: option.id,
          isCorrect: option.isCorrect,
          timeSpentMs: Date.now() - startTime,
        };
        return { results: next };
      });
    };

    const wrongQuestions = (): ExamQuestion[] =>
      store
        .results()
        .map((result, index) => ({ result, question: store.questions()[index] }))
        .filter((x): x is { result: ExamResult; question: ExamQuestion } => !!x.result && !x.result.isCorrect)
        .map(({ question }) => question);

    return {
      // Lifecycle
      // --------------------------------------------------------------------
      init(): void {
        syncSelectionPreview();
      },

      // Public Handlers — setup
      // --------------------------------------------------------------------
      isLevelAvailable(level: JlptLevel): boolean {
        return examService.hasExamSetForGroup(store.selectedExamGroup(), level);
      },

      selectLevel(level: JlptLevel): void {
        if (!examService.hasExamSetForGroup(store.selectedExamGroup(), level)) return;
        patchState(store, { selectedLevel: level });
        syncSelectionPreview();
      },

      selectExamGroup(examGroupId: string): void {
        const selected = store.examGroups.find((item) => item.id === examGroupId);
        if (!selected) return;
        patchState(store, { selectedExamGroup: selected.id });
        if (!examService.hasExamSetForGroup(selected.id, store.selectedLevel())) {
          const fallback = examService.getAvailableLevelsForGroup(selected.id)[0];
          if (fallback) patchState(store, { selectedLevel: fallback });
        }
        syncSelectionPreview();
      },

      startQuiz(): void {
        const group = currentExamGroup();
        if (!group || !examService.hasExamSetForGroup(group.id, store.selectedLevel())) {
          patchState(store, { loadError: `${store.selectedLevel()} 的句型測驗題組尚未準備完成。` });
          return;
        }
        patchState(store, { loadError: null, loading: true });
        examService.getExamSetForGroup(group.id, store.selectedLevel()).subscribe({
          next: (examSet) => {
            patchState(store, {
              examTitle: examSet.title,
              examDescription: examSet.description,
              questions: randomizeQuestions(examSet.questions),
              currentIndex: 0,
              results: [],
              selectedOptionId: null,
              loading: false,
              started: true,
              showResult: false,
            });
            startTime = Date.now();
          },
          error: () => {
            patchState(store, {
              loading: false,
              loadError: `無法載入 ${store.selectedLevel()} 句型測驗，請確認對應的題組 JSON 是否存在。`,
            });
          },
        });
      },

      // Public Handlers — 作答中
      // --------------------------------------------------------------------
      selectOption(option: ExamOption): void {
        patchState(store, { selectedOptionId: option.id });
      },

      next(): void {
        commitCurrentAnswer();
        if (store.currentIndex() < store.questions().length - 1) {
          const nextIndex = store.currentIndex() + 1;
          patchState(store, {
            currentIndex: nextIndex,
            selectedOptionId: store.results()[nextIndex]?.selectedOptionId ?? null,
          });
        } else {
          patchState(store, { showResult: true });
        }
      },

      prev(): void {
        commitCurrentAnswer();
        if (store.currentIndex() > 0) {
          const prevIndex = store.currentIndex() - 1;
          patchState(store, {
            currentIndex: prevIndex,
            selectedOptionId: store.results()[prevIndex]?.selectedOptionId ?? null,
          });
        }
      },

      goTo(index: number): void {
        if (index < 0 || index >= store.questions().length) return;
        commitCurrentAnswer();
        patchState(store, { currentIndex: index, selectedOptionId: store.results()[index]?.selectedOptionId ?? null });
      },

      submitNow(): void {
        commitCurrentAnswer();
        patchState(store, { showResult: true });
      },

      answerStatus(index: number): AnswerStatus {
        if (index === store.currentIndex() && !store.showResult()) return 'current';
        return store.results()[index] ? 'answered' : 'unanswered';
      },

      // Public Handlers — 結果頁
      // --------------------------------------------------------------------
      restart(): void {
        patchState(store, {
          started: false,
          showResult: false,
          questions: [],
          results: [],
          currentIndex: 0,
          selectedOptionId: null,
          loadError: null,
        });
      },

      retryWrongQuestions(): void {
        const wrong = wrongQuestions();
        if (wrong.length === 0) return;
        patchState(store, {
          questions: wrong,
          currentIndex: 0,
          results: [],
          selectedOptionId: null,
          started: true,
          showResult: false,
          loadError: null,
        });
        startTime = Date.now();
      },
    };
  }),
);

// Cores
import { computed, inject } from '@angular/core';
// NgRx Signals
import { patchState, signalStore, withComputed, withMethods, withProps, withState } from '@ngrx/signals';
// Angular
import { HttpClient } from '@angular/common/http';
// Angular Fire
import { Auth } from '@angular/fire/auth';
// RxJS
import { firstValueFrom } from 'rxjs';
// Shared
import type { ExamOption, ExamQuestion } from '@core/models/exam-question.model';
import { PAST_EXAM_CATALOG, type PastExamEntry, type PastExamSection } from '@core/config/past-exam-catalog';
import type { JlptLevel } from '@core/models/vocab.model';
import { LearningRecordService } from '@core/services/learning-record.service';
import { ExamHistoryService } from '@core/services/exam-history.service';
import type { ExamHistoryEntry } from '@core/models/exam-history.model';
// Models
import type { ExamSectionScore, PastExamResult } from './past-exam.model';

interface FlatItem {
  section: PastExamSection;
  question: ExamQuestion;
}

type Phase = 'overview' | 'taking' | 'result';

interface PastExamState {
  phase: Phase;
  selectedLevel: JlptLevel;
  selectedExam: PastExamEntry | null;
  reviewMode: boolean;
  flatItems: FlatItem[];
  currentIndex: number;
  results: (PastExamResult | undefined)[];
  selectedOptionId: string | null;
  markedQuestionIds: Set<string>;
  loading: boolean;
  loadError: string | null;
  examSummaries: Map<string, number | null>;
  summariesLoading: boolean;
}

const initialState: PastExamState = {
  phase: 'overview',
  selectedLevel: 'N3',
  selectedExam: null,
  reviewMode: false,
  flatItems: [],
  currentIndex: 0,
  results: [],
  selectedOptionId: null,
  markedQuestionIds: new Set(),
  loading: false,
  loadError: null,
  examSummaries: new Map(),
  summariesLoading: false,
};

export const PastExamStore = signalStore(
  withState(initialState),
  withProps(() => ({
    catalog: PAST_EXAM_CATALOG,
  })),
  withComputed((store) => ({
    filteredCatalog: computed(() => store.catalog.filter((e) => e.level === store.selectedLevel())),
    currentItem: computed(() => store.flatItems()[store.currentIndex()] ?? null),
    isLast: computed(() => store.currentIndex() === store.flatItems().length - 1),
    progress: computed(() =>
      store.flatItems().length > 0 ? Math.round(((store.currentIndex() + 1) / store.flatItems().length) * 100) : 0,
    ),
    answeredCount: computed(() => store.results().filter(Boolean).length),
    score: computed(() => store.results().filter((r) => r?.isCorrect).length),
    wrongItems: computed(() =>
      store
        .flatItems()
        .map((item, i) => ({ item, result: store.results()[i] }))
        .filter((x): x is { item: FlatItem; result: PastExamResult } => !!x.result && !x.result.isCorrect),
    ),
  })),
  withComputed((store) => ({
    currentSection: computed(() => store.currentItem()?.section ?? null),
    currentQuestion: computed(() => store.currentItem()?.question ?? null),
    totalPercent: computed(() =>
      store.flatItems().length > 0 ? Math.round((store.score() / store.flatItems().length) * 100) : 0,
    ),
    sectionScores: computed<ExamSectionScore[]>(() => {
      const exam = store.selectedExam();
      if (!exam) return [];
      return exam.sections.map((section) => {
        const indices = store
          .flatItems()
          .map((item, i) => (item.section.id === section.id ? i : -1))
          .filter((i) => i >= 0);
        const answered = indices.map((i) => store.results()[i]).filter((r): r is PastExamResult => !!r);
        return { section, score: answered.filter((r) => r.isCorrect).length, total: indices.length };
      });
    }),
  })),
  withComputed((store) => ({
    currentProblemNumber: computed(() => store.currentQuestion()?.problemNumber ?? null),
    /** 目前科目下的問題子分類（同一 section 內按 problemNumber 分組，僅供顯示目前所在位置，不可點擊跳題） */
    currentSectionProblemGroups: computed(() => {
      const section = store.currentSection();
      if (!section) return [];
      const seen = new Map<number, string>();
      for (const item of store.flatItems()) {
        if (item.section.id !== section.id) continue;
        const num = item.question.problemNumber;
        if (num != null && !seen.has(num)) seen.set(num, item.question.problemLabel ?? `問題${num}`);
      }
      return Array.from(seen.entries())
        .sort((a, b) => a[0] - b[0])
        .map(([number, label]) => ({ number, label }));
    }),
  })),
  withMethods(
    (
      store,
      http = inject(HttpClient),
      auth = inject(Auth),
      learningRecord = inject(LearningRecordService),
      examHistoryService = inject(ExamHistoryService),
    ) => {
      const commitCurrentAnswer = (): void => {
        const question = store.currentQuestion();
        const optionId = store.selectedOptionId();
        if (!question || !optionId) return;
        const option = question.options.find((o) => o.id === optionId);
        if (!option) return;

        const idx = store.currentIndex();
        patchState(store, (s) => {
          const next = [...s.results];
          next[idx] = { questionId: question.id, selectedOptionId: option.id, isCorrect: option.isCorrect };
          return { results: next };
        });
      };

      const saveResults = async (): Promise<void> => {
        const exam = store.selectedExam();
        if (!exam) return;

        for (const { section, score, total } of store.sectionScores()) {
          if (total === 0) continue;
          const wrongIds = store
            .flatItems()
            .map((item, i) => ({ item, result: store.results()[i] }))
            .filter(({ item, result }) => item.section.id === section.id && result && !result.isCorrect)
            .map(({ item }) => item.question.id);

          try {
            await learningRecord.saveExamResult({
              examId: exam.id,
              sectionId: section.id,
              score,
              total,
              wrongQuestionIds: wrongIds,
            });
          } catch (e) {
            console.error('save exam result failed', e);
          }
        }
      };

      const runFullExam = async (exam: PastExamEntry): Promise<void> => {
        patchState(store, { selectedExam: exam, reviewMode: false, loading: true, loadError: null });

        try {
          const sectionQuestions = await Promise.all(
            exam.sections.map((section) => firstValueFrom(http.get<{ questions: ExamQuestion[] }>(section.path))),
          );
          const items: FlatItem[] = [];
          exam.sections.forEach((section, i) => {
            sectionQuestions[i].questions.forEach((question) => items.push({ section, question }));
          });
          patchState(store, {
            flatItems: items,
            currentIndex: 0,
            results: [],
            selectedOptionId: null,
            markedQuestionIds: new Set(),
            phase: 'taking',
          });
        } catch {
          patchState(store, { loadError: '無法載入題目，請確認資料檔案是否存在。' });
        } finally {
          patchState(store, { loading: false });
        }
      };

      const loadSummaries = async (): Promise<void> => {
        const uid = auth.currentUser?.uid;
        if (!uid) return;

        patchState(store, { summariesLoading: true });
        try {
          const history = await examHistoryService.getRecent(uid, 200);
          const latestBySection = new Map<string, ExamHistoryEntry>();
          for (const entry of history) {
            const key = `${entry.examId}::${entry.sectionId}`;
            if (!latestBySection.has(key)) latestBySection.set(key, entry);
          }

          const summaries = new Map<string, number | null>();
          for (const exam of store.catalog) {
            const sectionResults = exam.sections.map((s) => latestBySection.get(`${exam.id}::${s.id}`));
            if (sectionResults.every((r): r is ExamHistoryEntry => !!r)) {
              const totalScore = sectionResults.reduce((sum, r) => sum + r!.score, 0);
              const totalCount = sectionResults.reduce((sum, r) => sum + r!.total, 0);
              summaries.set(exam.id, totalCount > 0 ? Math.round((totalScore / totalCount) * 100) : null);
            } else {
              summaries.set(exam.id, null);
            }
          }
          patchState(store, { examSummaries: summaries });
        } catch (e) {
          console.error('load exam summaries failed', e);
        } finally {
          patchState(store, { summariesLoading: false });
        }
      };

      return {
        // Lifecycle
        // --------------------------------------------------------------------
        async init(): Promise<void> {
          await loadSummaries();
        },

        // Public Handlers — overview
        // --------------------------------------------------------------------
        selectLevel(level: JlptLevel): void {
          patchState(store, { selectedLevel: level });
        },

        async startFullExam(exam: PastExamEntry): Promise<void> {
          await runFullExam(exam);
        },

        async startWrongReview(exam: PastExamEntry): Promise<void> {
          const uid = auth.currentUser?.uid;
          if (!uid) return;

          patchState(store, { selectedExam: exam, reviewMode: true, loading: true, loadError: null });

          try {
            const history = await examHistoryService.getRecent(uid, 200);
            const latestBySection = new Map<string, ExamHistoryEntry>();
            for (const entry of history) {
              if (entry.examId !== exam.id) continue;
              if (!latestBySection.has(entry.sectionId)) latestBySection.set(entry.sectionId, entry);
            }

            const wrongIdsBySection = new Map<string, Set<string>>();
            for (const section of exam.sections) {
              const entry = latestBySection.get(section.id);
              if (entry) wrongIdsBySection.set(section.id, new Set(entry.wrongQuestionIds));
            }

            const hasWrong = Array.from(wrongIdsBySection.values()).some((s) => s.size > 0);
            if (!hasWrong) {
              patchState(store, { loadError: '目前沒有錯題可以複習，請先完成一次模擬測驗。', loading: false });
              return;
            }

            const sectionQuestions = await Promise.all(
              exam.sections.map((section) =>
                firstValueFrom(http.get<{ questions: ExamQuestion[] }>(section.path)),
              ),
            );
            const items: FlatItem[] = [];
            exam.sections.forEach((section, i) => {
              const wrongIds = wrongIdsBySection.get(section.id);
              if (!wrongIds || wrongIds.size === 0) return;
              sectionQuestions[i].questions
                .filter((q) => wrongIds.has(q.id))
                .forEach((question) => items.push({ section, question }));
            });

            patchState(store, {
              flatItems: items,
              currentIndex: 0,
              results: [],
              selectedOptionId: null,
              markedQuestionIds: new Set(),
              phase: 'taking',
            });
          } catch {
            patchState(store, { loadError: '無法載入錯題，請稍後再試。' });
          } finally {
            patchState(store, { loading: false });
          }
        },

        backToOverview(): void {
          patchState(store, {
            phase: 'overview',
            selectedExam: null,
            flatItems: [],
            results: [],
            currentIndex: 0,
            selectedOptionId: null,
            markedQuestionIds: new Set(),
            reviewMode: false,
          });
          loadSummaries();
        },

        // Public Handlers — 作答中
        // --------------------------------------------------------------------
        selectOption(option: ExamOption): void {
          patchState(store, { selectedOptionId: option.id });
        },

        next(): void {
          commitCurrentAnswer();
          if (store.currentIndex() < store.flatItems().length - 1) {
            const nextIndex = store.currentIndex() + 1;
            patchState(store, {
              currentIndex: nextIndex,
              selectedOptionId: store.results()[nextIndex]?.selectedOptionId ?? null,
            });
          } else {
            patchState(store, { phase: 'result' });
            if (!store.reviewMode()) {
              saveResults();
            }
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

        /** 提早交卷：不管目前在第幾題，直接結算 */
        submitNow(): void {
          commitCurrentAnswer();
          patchState(store, { phase: 'result' });
          if (!store.reviewMode()) {
            saveResults();
          }
        },

        toggleMarkQuestion(questionId: string): void {
          const current = new Set(store.markedQuestionIds());
          if (current.has(questionId)) {
            current.delete(questionId);
          } else {
            current.add(questionId);
          }
          patchState(store, { markedQuestionIds: current });
        },

        isMarked(questionId: string): boolean {
          return store.markedQuestionIds().has(questionId);
        },

        // Public Handlers — 結果頁
        // --------------------------------------------------------------------
        restartSameExam(): void {
          const exam = store.selectedExam();
          if (exam) runFullExam(exam);
        },
      };
    },
  ),
);

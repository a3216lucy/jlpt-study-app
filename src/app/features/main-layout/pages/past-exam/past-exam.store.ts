// Cores
import { Injectable, computed, inject, signal } from '@angular/core';
// Angular
import { HttpClient } from '@angular/common/http';
// Angular Fire
import { Auth } from '@angular/fire/auth';
// RxJS
import { firstValueFrom } from 'rxjs';
// Shared
import type { ExamOption, ExamQuestion } from '@shared/models/exam-question.model';
import { PAST_EXAM_CATALOG, type PastExamEntry, type PastExamSection } from '@shared/config/past-exam-catalog';
import type { JlptLevel } from '@shared/models/vocab.model';
import { LearningRecordService } from '@shared/services/learning-record.service';
import { ExamHistoryService } from '@shared/services/exam-history.service';
import type { ExamHistoryEntry } from '@shared/models/exam-history.model';
// Models
import type { ExamSectionScore, PastExamResult } from './past-exam.model';

interface FlatItem {
  section: PastExamSection;
  question: ExamQuestion;
}

type Phase = 'overview' | 'taking' | 'result';

@Injectable()
export class PastExamStore {
  // Dependencies
  // --------------------------------------------------------------------
  private http = inject(HttpClient);
  private auth = inject(Auth);
  private learningRecord = inject(LearningRecordService);
  private examHistoryService = inject(ExamHistoryService);

  // Signals
  // --------------------------------------------------------------------
  readonly catalog = PAST_EXAM_CATALOG;

  readonly phase = signal<Phase>('overview');
  readonly selectedLevel = signal<JlptLevel>('N3');
  readonly selectedExam = signal<PastExamEntry | null>(null);
  readonly reviewMode = signal(false);

  readonly flatItems = signal<FlatItem[]>([]);
  readonly currentIndex = signal(0);
  readonly results = signal<(PastExamResult | undefined)[]>([]);
  readonly selectedOptionId = signal<string | null>(null);
  readonly markedQuestionIds = signal<Set<string>>(new Set());

  readonly loading = signal(false);
  readonly loadError = signal<string | null>(null);

  readonly examSummaries = signal<Map<string, number | null>>(new Map());
  readonly summariesLoading = signal(false);

  // Computed
  // --------------------------------------------------------------------
  readonly filteredCatalog = computed(() => this.catalog.filter((e) => e.level === this.selectedLevel()));

  readonly currentItem = computed(() => this.flatItems()[this.currentIndex()] ?? null);
  readonly currentSection = computed(() => this.currentItem()?.section ?? null);
  readonly currentQuestion = computed(() => this.currentItem()?.question ?? null);
  readonly isLast = computed(() => this.currentIndex() === this.flatItems().length - 1);

  readonly progress = computed(() =>
    this.flatItems().length > 0 ? Math.round(((this.currentIndex() + 1) / this.flatItems().length) * 100) : 0,
  );
  readonly answeredCount = computed(() => this.results().filter(Boolean).length);

  readonly score = computed(() => this.results().filter((r) => r?.isCorrect).length);
  readonly totalPercent = computed(() =>
    this.flatItems().length > 0 ? Math.round((this.score() / this.flatItems().length) * 100) : 0,
  );

  readonly sectionScores = computed<ExamSectionScore[]>(() => {
    const exam = this.selectedExam();
    if (!exam) return [];
    return exam.sections.map((section) => {
      const indices = this.flatItems()
        .map((item, i) => (item.section.id === section.id ? i : -1))
        .filter((i) => i >= 0);
      const answered = indices.map((i) => this.results()[i]).filter((r): r is PastExamResult => !!r);
      return { section, score: answered.filter((r) => r.isCorrect).length, total: indices.length };
    });
  });

  readonly wrongItems = computed(() =>
    this.flatItems()
      .map((item, i) => ({ item, result: this.results()[i] }))
      .filter((x): x is { item: FlatItem; result: PastExamResult } => !!x.result && !x.result.isCorrect),
  );

  /** 目前科目下的問題子分類（同一 section 內按 problemNumber 分組，僅供顯示目前所在位置，不可點擊跳題） */
  readonly currentSectionProblemGroups = computed(() => {
    const section = this.currentSection();
    if (!section) return [];
    const seen = new Map<number, string>();
    for (const item of this.flatItems()) {
      if (item.section.id !== section.id) continue;
      const num = item.question.problemNumber;
      if (num != null && !seen.has(num)) seen.set(num, item.question.problemLabel ?? `問題${num}`);
    }
    return Array.from(seen.entries())
      .sort((a, b) => a[0] - b[0])
      .map(([number, label]) => ({ number, label }));
  });

  readonly currentProblemNumber = computed(() => this.currentQuestion()?.problemNumber ?? null);

  // Lifecycle
  // --------------------------------------------------------------------
  async init(): Promise<void> {
    await this.loadSummaries();
  }

  // Public Handlers — overview
  // --------------------------------------------------------------------
  selectLevel(level: JlptLevel): void {
    this.selectedLevel.set(level);
  }

  async startFullExam(exam: PastExamEntry): Promise<void> {
    this.selectedExam.set(exam);
    this.reviewMode.set(false);
    this.loading.set(true);
    this.loadError.set(null);

    try {
      const sectionQuestions = await Promise.all(
        exam.sections.map((section) =>
          firstValueFrom(this.http.get<{ questions: ExamQuestion[] }>(section.path)),
        ),
      );
      const items: FlatItem[] = [];
      exam.sections.forEach((section, i) => {
        sectionQuestions[i].questions.forEach((question) => items.push({ section, question }));
      });
      this.flatItems.set(items);
      this.currentIndex.set(0);
      this.results.set([]);
      this.selectedOptionId.set(null);
      this.markedQuestionIds.set(new Set());
      this.phase.set('taking');
    } catch {
      this.loadError.set('無法載入題目，請確認資料檔案是否存在。');
    } finally {
      this.loading.set(false);
    }
  }

  async startWrongReview(exam: PastExamEntry): Promise<void> {
    const uid = this.auth.currentUser?.uid;
    if (!uid) return;

    this.selectedExam.set(exam);
    this.reviewMode.set(true);
    this.loading.set(true);
    this.loadError.set(null);

    try {
      const history = await this.examHistoryService.getRecent(uid, 200);
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
        this.loadError.set('目前沒有錯題可以複習，請先完成一次模擬測驗。');
        this.loading.set(false);
        return;
      }

      const sectionQuestions = await Promise.all(
        exam.sections.map((section) =>
          firstValueFrom(this.http.get<{ questions: ExamQuestion[] }>(section.path)),
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

      this.flatItems.set(items);
      this.currentIndex.set(0);
      this.results.set([]);
      this.selectedOptionId.set(null);
      this.markedQuestionIds.set(new Set());
      this.phase.set('taking');
    } catch {
      this.loadError.set('無法載入錯題，請稍後再試。');
    } finally {
      this.loading.set(false);
    }
  }

  backToOverview(): void {
    this.phase.set('overview');
    this.selectedExam.set(null);
    this.flatItems.set([]);
    this.results.set([]);
    this.currentIndex.set(0);
    this.selectedOptionId.set(null);
    this.markedQuestionIds.set(new Set());
    this.reviewMode.set(false);
    this.loadSummaries();
  }

  // Public Handlers — 作答中
  // --------------------------------------------------------------------
  selectOption(option: ExamOption): void {
    this.selectedOptionId.set(option.id);
  }

  next(): void {
    this.commitCurrentAnswer();
    if (this.currentIndex() < this.flatItems().length - 1) {
      this.currentIndex.update((i) => i + 1);
      this.selectedOptionId.set(this.results()[this.currentIndex()]?.selectedOptionId ?? null);
    } else {
      this.phase.set('result');
      if (!this.reviewMode()) {
        this.saveResults();
      }
    }
  }

  prev(): void {
    this.commitCurrentAnswer();
    if (this.currentIndex() > 0) {
      this.currentIndex.update((i) => i - 1);
      this.selectedOptionId.set(this.results()[this.currentIndex()]?.selectedOptionId ?? null);
    }
  }

  /** 提早交卷：不管目前在第幾題，直接結算 */
  submitNow(): void {
    this.commitCurrentAnswer();
    this.phase.set('result');
    if (!this.reviewMode()) {
      this.saveResults();
    }
  }

  toggleMarkQuestion(questionId: string): void {
    const current = new Set(this.markedQuestionIds());
    if (current.has(questionId)) {
      current.delete(questionId);
    } else {
      current.add(questionId);
    }
    this.markedQuestionIds.set(current);
  }

  isMarked(questionId: string): boolean {
    return this.markedQuestionIds().has(questionId);
  }

  // Public Handlers — 結果頁
  // --------------------------------------------------------------------
  restartSameExam(): void {
    const exam = this.selectedExam();
    if (exam) this.startFullExam(exam);
  }

  // Private
  // --------------------------------------------------------------------
  private commitCurrentAnswer(): void {
    const question = this.currentQuestion();
    const optionId = this.selectedOptionId();
    if (!question || !optionId) return;
    const option = question.options.find((o) => o.id === optionId);
    if (!option) return;

    const idx = this.currentIndex();
    this.results.update((arr) => {
      const next = [...arr];
      next[idx] = { questionId: question.id, selectedOptionId: option.id, isCorrect: option.isCorrect };
      return next;
    });
  }

  private async saveResults(): Promise<void> {
    const exam = this.selectedExam();
    if (!exam) return;

    for (const { section, score, total } of this.sectionScores()) {
      if (total === 0) continue;
      const wrongIds = this.flatItems()
        .map((item, i) => ({ item, result: this.results()[i] }))
        .filter(({ item, result }) => item.section.id === section.id && result && !result.isCorrect)
        .map(({ item }) => item.question.id);

      try {
        await this.learningRecord.saveExamResult({
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
  }

  private async loadSummaries(): Promise<void> {
    const uid = this.auth.currentUser?.uid;
    if (!uid) return;

    this.summariesLoading.set(true);
    try {
      const history = await this.examHistoryService.getRecent(uid, 200);
      const latestBySection = new Map<string, ExamHistoryEntry>();
      for (const entry of history) {
        const key = `${entry.examId}::${entry.sectionId}`;
        if (!latestBySection.has(key)) latestBySection.set(key, entry);
      }

      const summaries = new Map<string, number | null>();
      for (const exam of this.catalog) {
        const sectionResults = exam.sections.map((s) => latestBySection.get(`${exam.id}::${s.id}`));
        if (sectionResults.every((r): r is ExamHistoryEntry => !!r)) {
          const totalScore = sectionResults.reduce((sum, r) => sum + r!.score, 0);
          const totalCount = sectionResults.reduce((sum, r) => sum + r!.total, 0);
          summaries.set(exam.id, totalCount > 0 ? Math.round((totalScore / totalCount) * 100) : null);
        } else {
          summaries.set(exam.id, null);
        }
      }
      this.examSummaries.set(summaries);
    } catch (e) {
      console.error('load exam summaries failed', e);
    } finally {
      this.summariesLoading.set(false);
    }
  }
}

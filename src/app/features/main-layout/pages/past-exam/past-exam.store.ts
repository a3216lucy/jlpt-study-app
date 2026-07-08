// Cores
import { Injectable, computed, inject, signal } from '@angular/core';
// Angular
import { HttpClient } from '@angular/common/http';
// Shared
import { ExamOption, ExamQuestion, ExamSet } from '@shared/models/exam-question.model';
import { PAST_EXAM_CATALOG, PastExamEntry, PastExamSection } from '@shared/config/past-exam-catalog';
import { LearningRecordService } from '@shared/services/learning-record.service';
// Models
import type { PastExamResult } from './past-exam.model';

@Injectable()
export class PastExamStore {
  // Dependencies
  // --------------------------------------------------------------------
  private http = inject(HttpClient);
  private learningRecord = inject(LearningRecordService);

  // Signals
  // --------------------------------------------------------------------
  readonly catalog = PAST_EXAM_CATALOG;

  readonly selectedExam = signal<PastExamEntry | null>(this.catalog[0] ?? null);
  readonly selectedSection = signal<PastExamSection | null>(this.catalog[0]?.sections[0] ?? null);
  readonly questions = signal<ExamQuestion[]>([]);
  readonly currentIndex = signal(0);
  readonly results = signal<PastExamResult[]>([]);
  readonly selectedOptionId = signal<string | null>(null);
  readonly answered = signal(false);
  readonly loading = signal(false);
  readonly loadError = signal<string | null>(null);
  readonly started = signal(false);

  readonly currentQuestion = computed(() => this.questions()[this.currentIndex()]);
  readonly isLast = computed(() => this.currentIndex() === this.questions().length - 1);
  readonly showResult = computed(
    () => this.started() && this.currentIndex() >= this.questions().length,
  );
  readonly progress = computed(() =>
    Math.round(((this.currentIndex() + (this.answered() ? 1 : 0)) / (this.questions().length || 1)) * 100),
  );
  readonly score = computed(() => this.results().filter((r) => r.isCorrect).length);

  // pastExamPage
  // --------------------------------------------------------------------
  selectExam(exam: PastExamEntry) {
    this.selectedExam.set(exam);
    this.selectedSection.set(exam.sections[0] ?? null);
  }

  selectSection(section: PastExamSection) {
    this.selectedSection.set(section);
  }

  startExam() {
    const section = this.selectedSection();
    if (!section) return;

    this.loading.set(true);
    this.loadError.set(null);

    this.http.get<ExamSet>(section.path).subscribe({
      next: (examSet) => {
        this.questions.set(examSet.questions);
        this.currentIndex.set(0);
        this.results.set([]);
        this.selectedOptionId.set(null);
        this.answered.set(false);
        this.loading.set(false);
        this.started.set(true);
      },
      error: () => {
        this.loading.set(false);
        this.loadError.set('無法載入題目，請確認資料檔案是否存在。');
      },
    });
  }

  selectOption(option: ExamOption) {
    if (this.answered()) return;
    this.selectedOptionId.set(option.id);
    this.answered.set(true);
    this.results.update((r) => [
      ...r,
      {
        questionId: this.currentQuestion().id,
        selectedOptionId: option.id,
        isCorrect: option.isCorrect,
      },
    ]);
  }

  next() {
    if (!this.isLast()) {
      this.currentIndex.update((i) => i + 1);
      this.selectedOptionId.set(null);
      this.answered.set(false);
    } else {
      this.currentIndex.update((i) => i + 1);
      this.saveResult();
    }
  }

  restart() {
    this.started.set(false);
    this.questions.set([]);
    this.results.set([]);
    this.currentIndex.set(0);
    this.selectedOptionId.set(null);
    this.answered.set(false);
    this.loadError.set(null);
  }

  retryWrong() {
    const wrongQuestions = this.results()
      .map((r, i) => ({ r, q: this.questions()[i] }))
      .filter(({ r }) => !r.isCorrect)
      .map(({ q }) => q);

    if (wrongQuestions.length === 0) return;
    this.questions.set(wrongQuestions);
    this.currentIndex.set(0);
    this.results.set([]);
    this.selectedOptionId.set(null);
    this.answered.set(false);
    this.started.set(true);
  }

  private saveResult(): void {
    const exam = this.selectedExam();
    const section = this.selectedSection();
    const results = this.results();
    if (!exam || !section) return;

    this.learningRecord.saveExamResult({
      examId: exam.id,
      sectionId: section.id,
      score: results.filter((r) => r.isCorrect).length,
      total: results.length,
      wrongQuestionIds: results.filter((r) => !r.isCorrect).map((r) => r.questionId),
    }).catch(console.error);
  }
}

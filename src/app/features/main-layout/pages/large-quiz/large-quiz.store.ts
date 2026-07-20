// Cores
import { Injectable, computed, inject, signal } from '@angular/core';
// Shared
import { ExamOption, ExamQuestion, ExamQuestionType } from '@shared/models/exam-question.model';
import { JlptLevel } from '@shared/models/vocab.model';
import { ExamService, ExamSetGroupItem } from '@shared/services/exam.service';
// Models
import type { ExamResult, ExamGroupChoice } from './large-quiz.model';

export type AnswerStatus = 'answered' | 'current' | 'unanswered';

@Injectable()
export class LargeQuizStore {
  // Dependencies
  // --------------------------------------------------------------------
  private examService = inject(ExamService);

  // Signals
  // --------------------------------------------------------------------
  readonly examGroups: readonly ExamGroupChoice[] = this.examService
    .listExamGroups('grammar', 'sentence-fill')
    .map((item) => this.toExamGroupChoice(item));

  readonly selectedExamGroup = signal<string>(this.examGroups[0]?.id ?? 'standard-sentence-fill');
  readonly selectedLevel = signal<JlptLevel>('N5');
  readonly examTitle = signal('N5 句型填空');
  readonly examDescription = signal('以句子填空四選一為主的句型測驗題組。');
  readonly questions = signal<ExamQuestion[]>([]);
  readonly currentIndex = signal(0);
  readonly results = signal<(ExamResult | undefined)[]>([]);
  readonly selectedOptionId = signal<string | null>(null);
  readonly loading = signal(false);
  readonly started = signal(false);
  readonly showResult = signal(false);
  readonly loadError = signal<string | null>(null);

  // Computed
  // --------------------------------------------------------------------
  readonly currentQuestion = computed(() => this.questions()[this.currentIndex()]);
  readonly progress = computed(() =>
    this.questions().length > 0 ? Math.round(((this.currentIndex() + 1) / this.questions().length) * 100) : 0,
  );
  readonly isLast = computed(() => this.currentIndex() === this.questions().length - 1);
  readonly answeredCount = computed(() => this.results().filter(Boolean).length);
  readonly score = computed(() => this.results().filter((r) => r?.isCorrect).length);

  private startTime = 0;

  constructor() {
    this.syncSelectionPreview();
  }

  // Public Handlers — setup
  // --------------------------------------------------------------------
  isLevelAvailable(level: JlptLevel): boolean {
    return this.examService.hasExamSetForGroup(this.selectedExamGroup(), level);
  }

  selectLevel(level: JlptLevel) {
    if (!this.isLevelAvailable(level)) return;
    this.selectedLevel.set(level);
    this.syncSelectionPreview();
  }

  selectExamGroup(examGroupId: string) {
    const selected = this.examGroups.find((item) => item.id === examGroupId);
    if (!selected) return;
    this.selectedExamGroup.set(selected.id);
    if (!this.isLevelAvailable(this.selectedLevel())) {
      const fallback = this.examService.getAvailableLevelsForGroup(selected.id)[0];
      if (fallback) this.selectedLevel.set(fallback);
    }
    this.syncSelectionPreview();
  }

  startQuiz() {
    const group = this.currentExamGroup();
    if (!group || !this.examService.hasExamSetForGroup(group.id, this.selectedLevel())) {
      this.loadError.set(`${this.selectedLevel()} 的句型測驗題組尚未準備完成。`);
      return;
    }
    this.loadError.set(null);
    this.loading.set(true);
    this.examService.getExamSetForGroup(group.id, this.selectedLevel()).subscribe({
      next: (examSet) => {
        this.examTitle.set(examSet.title);
        this.examDescription.set(examSet.description);
        this.questions.set(this.randomizeQuestions(examSet.questions));
        this.currentIndex.set(0);
        this.results.set([]);
        this.selectedOptionId.set(null);
        this.loading.set(false);
        this.started.set(true);
        this.showResult.set(false);
        this.startTime = Date.now();
      },
      error: () => {
        this.loading.set(false);
        this.loadError.set(`無法載入 ${this.selectedLevel()} 句型測驗，請確認對應的題組 JSON 是否存在。`);
      },
    });
  }

  // Public Handlers — 作答中
  // --------------------------------------------------------------------
  selectOption(option: ExamOption) {
    this.selectedOptionId.set(option.id);
  }

  next() {
    this.commitCurrentAnswer();
    if (this.currentIndex() < this.questions().length - 1) {
      this.currentIndex.update((i) => i + 1);
      this.selectedOptionId.set(this.results()[this.currentIndex()]?.selectedOptionId ?? null);
    } else {
      this.showResult.set(true);
    }
  }

  prev() {
    this.commitCurrentAnswer();
    if (this.currentIndex() > 0) {
      this.currentIndex.update((i) => i - 1);
      this.selectedOptionId.set(this.results()[this.currentIndex()]?.selectedOptionId ?? null);
    }
  }

  goTo(index: number) {
    if (index < 0 || index >= this.questions().length) return;
    this.commitCurrentAnswer();
    this.currentIndex.set(index);
    this.selectedOptionId.set(this.results()[index]?.selectedOptionId ?? null);
  }

  submitNow() {
    this.commitCurrentAnswer();
    this.showResult.set(true);
  }

  answerStatus(index: number): AnswerStatus {
    if (index === this.currentIndex() && !this.showResult()) return 'current';
    return this.results()[index] ? 'answered' : 'unanswered';
  }

  // Public Handlers — 結果頁
  // --------------------------------------------------------------------
  restart() {
    this.started.set(false);
    this.showResult.set(false);
    this.questions.set([]);
    this.results.set([]);
    this.currentIndex.set(0);
    this.selectedOptionId.set(null);
    this.loadError.set(null);
  }

  retryWrongQuestions() {
    const wrong = this.wrongQuestions();
    if (wrong.length === 0) return;
    this.questions.set(wrong);
    this.currentIndex.set(0);
    this.results.set([]);
    this.selectedOptionId.set(null);
    this.started.set(true);
    this.showResult.set(false);
    this.loadError.set(null);
    this.startTime = Date.now();
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
      next[idx] = {
        questionId: question.id,
        selectedOptionId: option.id,
        isCorrect: option.isCorrect,
        timeSpentMs: Date.now() - this.startTime,
      };
      return next;
    });
  }

  private wrongQuestions(): ExamQuestion[] {
    return this.results()
      .map((result, index) => ({ result, question: this.questions()[index] }))
      .filter((x): x is { result: ExamResult; question: ExamQuestion } => !!x.result && !x.result.isCorrect)
      .map(({ question }) => question);
  }

  private currentExamGroup(): ExamGroupChoice {
    return this.examGroups.find((g) => g.id === this.selectedExamGroup()) ?? this.examGroups[0];
  }

  private toExamGroupChoice(item: ExamSetGroupItem): ExamGroupChoice {
    return {
      id: item.id,
      category: 'grammar',
      type: item.type as ExamQuestionType,
      label: item.label,
      description: item.description,
    };
  }

  private syncSelectionPreview() {
    const selectedItem = this.examService.findExamSetForGroup(this.selectedExamGroup(), this.selectedLevel());
    const group = this.currentExamGroup();
    this.examTitle.set(selectedItem?.title ?? `${this.selectedLevel()} ${group?.label ?? '句型測驗'}`);
    this.examDescription.set(selectedItem?.description ?? group?.description ?? '');
  }

  private randomizeQuestions(questions: ExamQuestion[], count = 10): ExamQuestion[] {
    const shuffled = this.shuffle(
      questions.map((q) => ({ ...q, options: this.shuffle([...q.options]) })),
    );
    return shuffled.slice(0, count);
  }

  private shuffle<T>(items: T[]): T[] {
    const cloned = [...items];
    for (let i = cloned.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cloned[i], cloned[j]] = [cloned[j], cloned[i]];
    }
    return cloned;
  }
}

// Cores
import { Injectable, computed, inject, signal } from '@angular/core';
// Shared
import { ExamOption, ExamQuestion, ExamQuestionType } from '@shared/models/exam-question.model';
import { JlptLevel } from '@shared/models/vocab.model';
import { ExamService, ExamSetGroupItem } from '@shared/services/exam.service';
// Models
import type { ExamResult, ExamGroupChoice } from './large-quiz.model';

@Injectable()
export class LargeQuizStore {
  private readonly wrongQuestionStorageKey = 'jlpt-app:sentence-wrong-questions';
  private examService = inject(ExamService);

  readonly examGroups: readonly ExamGroupChoice[] = this.examService
    .listExamGroups('grammar', 'sentence-fill')
    .map((item) => this.toExamGroupChoice(item));

  readonly selectedExamGroup = signal<string>(this.examGroups[0]?.id ?? 'standard-sentence-fill');
  readonly selectedLevel = signal<JlptLevel>('N5');
  readonly examTitle = signal('N5 句型填空');
  readonly examDescription = signal('以句子填空四選一為主的句型測驗題組。');
  readonly questions = signal<ExamQuestion[]>([]);
  readonly currentIndex = signal(0);
  readonly results = signal<ExamResult[]>([]);
  readonly selectedOptionId = signal<string | null>(null);
  readonly answered = signal(false);
  readonly loading = signal(false);
  readonly started = signal(false);
  readonly loadError = signal<string | null>(null);

  readonly currentQuestion = computed(() => this.questions()[this.currentIndex()]);
  readonly progress = computed(() =>
    Math.round((this.currentIndex() / (this.questions().length || 1)) * 100),
  );
  readonly isLast = computed(() => this.currentIndex() === this.questions().length - 1);
  readonly score = computed(() => this.results().filter((r) => r.isCorrect).length);
  readonly showResult = computed(() => this.started() && this.currentIndex() >= this.questions().length);

  private startTime = 0;

  constructor() {
    this.syncSelectionPreview();
  }

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
        this.answered.set(false);
        this.loading.set(false);
        this.started.set(true);
        this.startTime = Date.now();
      },
      error: () => {
        this.loading.set(false);
        this.loadError.set(`無法載入 ${this.selectedLevel()} 句型測驗，請確認對應的題組 JSON 是否存在。`);
      },
    });
  }

  selectOption(option: ExamOption) {
    if (this.answered()) return;
    this.selectedOptionId.set(option.id);
    this.answered.set(true);
    this.results.update((results) => [
      ...results,
      {
        questionId: this.currentQuestion().id,
        selectedOptionId: option.id,
        isCorrect: option.isCorrect,
        timeSpentMs: Date.now() - this.startTime,
      },
    ]);
    this.persistWrongQuestions();
  }

  next() {
    if (!this.isLast()) {
      this.currentIndex.update((i) => i + 1);
      this.selectedOptionId.set(null);
      this.answered.set(false);
      this.startTime = Date.now();
      return;
    }
    this.currentIndex.update((i) => i + 1);
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

  retryWrongQuestions() {
    const wrong = this.wrongQuestions();
    if (wrong.length === 0) return;
    this.questions.set(wrong);
    this.currentIndex.set(0);
    this.results.set([]);
    this.selectedOptionId.set(null);
    this.answered.set(false);
    this.started.set(true);
    this.loadError.set(null);
    this.startTime = Date.now();
  }

  exportWrongQuestions() {
    const payload = this.buildWrongQuestionExportPayload();
    if (payload.length === 0) return;
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `wrong-questions-sentence-${this.selectedLevel().toLowerCase()}-${this.selectedExamGroup()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }

  private wrongQuestions(): ExamQuestion[] {
    return this.results()
      .map((result, index) => ({ result, question: this.questions()[index] }))
      .filter(({ result }) => !result.isCorrect)
      .map(({ question }) => question);
  }

  private buildWrongQuestionExportPayload() {
    return this.results()
      .map((result, index) => ({ result, question: this.questions()[index] }))
      .filter(({ result }) => !result.isCorrect)
      .map(({ result, question }) => ({
        questionId: question.id,
        level: question.level,
        category: question.category,
        type: question.type,
        prompt: question.prompt,
        questionText: question.questionText ?? null,
        questionTranslation: question.questionTranslation ?? null,
        explanation: question.explanation,
        selectedOption: question.options.find((o) => o.id === result.selectedOptionId)?.text ?? null,
        correctOption: question.options.find((o) => o.isCorrect)?.text ?? null,
        tags: question.tags ?? [],
      }));
  }

  private persistWrongQuestions() {
    if (typeof localStorage === 'undefined') return;
    localStorage.setItem(
      this.wrongQuestionStorageKey,
      JSON.stringify({
        level: this.selectedLevel(),
        type: this.selectedExamGroup(),
        items: this.buildWrongQuestionExportPayload(),
        updatedAt: new Date().toISOString(),
      }),
    );
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

import { Injectable, computed, inject, signal } from '@angular/core';
import { QuizMode, QuizOption, QuizQuestion, QuizResult } from '@features/models/quiz.model';
import { JlptLevel } from '@features/models/vocab.model';
import { QuizService } from '@features/services/quiz.service';
import { VocabService } from '@features/services/vocab.service';

@Injectable()
export class QuizStore {
  private readonly wrongQuestionStorageKey = 'jlpt-app:vocab-wrong-questions';
  private vocabService = inject(VocabService);
  private quizService = inject(QuizService);

  readonly selectedLevel = signal<JlptLevel>('N5');
  readonly selectedMode = signal<QuizMode>('vocab-meaning');
  readonly questions = signal<QuizQuestion[]>([]);
  readonly currentIndex = signal(0);
  readonly results = signal<QuizResult[]>([]);
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
  readonly isSentenceFillMode = computed(() => this.currentQuestion()?.mode === 'sentence-fill');

  private startTime = 0;

  isLevelAvailable(level: JlptLevel): boolean {
    return this.vocabService.hasLevelData(level);
  }

  startQuiz() {
    if (!this.isLevelAvailable(this.selectedLevel())) {
      this.loadError.set(
        `${this.selectedLevel()} 題庫尚未準備完成，目前可使用 ${this.vocabService.availableLevels.join(', ')}。`,
      );
      return;
    }

    this.loadError.set(null);
    this.loading.set(true);
    this.vocabService.getWords(this.selectedLevel()).subscribe({
      next: (words) => {
        const qs = this.quizService.generate(words, this.selectedMode(), 10);
        this.questions.set(qs);
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
        this.loadError.set(
          `無法載入 ${this.selectedLevel()} 題庫，請確認 assets/data/${this.selectedLevel().toLowerCase()}.json 是否存在。`,
        );
      },
    });
  }

  selectOption(option: QuizOption) {
    if (this.answered()) return;
    this.selectedOptionId.set(option.id);
    this.answered.set(true);
    this.results.update((r) => [
      ...r,
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
    } else {
      this.currentIndex.update((i) => i + 1);
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

  wrongQuestionCount(): number {
    return this.wrongQuestions().length;
  }

  exportWrongQuestions() {
    const payload = this.buildWrongQuestionExportPayload();
    if (payload.length === 0) return;
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `wrong-questions-vocab-${this.selectedLevel().toLowerCase()}-${this.selectedMode()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }

  private wrongQuestions(): QuizQuestion[] {
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
        mode: question.mode,
        prompt: question.prompt,
        questionText: question.questionText ?? null,
        questionTranslation: question.questionTranslation ?? null,
        furigana: question.furigana ?? null,
        explanation: question.explanation,
        selectedOption: question.options.find((o) => o.id === result.selectedOptionId)?.text ?? null,
        correctOption: question.options.find((o) => o.isCorrect)?.text ?? null,
      }));
  }

  private persistWrongQuestions() {
    if (typeof localStorage === 'undefined') return;
    localStorage.setItem(
      this.wrongQuestionStorageKey,
      JSON.stringify({
        level: this.selectedLevel(),
        mode: this.selectedMode(),
        items: this.buildWrongQuestionExportPayload(),
        updatedAt: new Date().toISOString(),
      }),
    );
  }
}

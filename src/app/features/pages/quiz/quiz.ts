import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { QuizMode, QuizOption, QuizQuestion, QuizResult } from '@features/models/quiz.model';
import { JlptLevel } from '@features/models/vocab.model';
import { QuizService } from '@features/services/quiz.service';
import { VocabService } from '@features/services/vocab.service';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ProgressBarModule } from 'primeng/progressbar';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.html',
  styleUrls: ['./quiz.scss'],
  standalone: true,
  imports: [CommonModule, ButtonModule, CardModule, BadgeModule, ProgressBarModule],
})
export class QuizComponent {
  private readonly wrongQuestionStorageKey = 'jlpt-app:vocab-wrong-questions';
  private vocabService = inject(VocabService);
  private quizService = inject(QuizService);

  selectedLevel = signal<JlptLevel>('N5');
  selectedMode = signal<QuizMode>('vocab-meaning');
  questions = signal<QuizQuestion[]>([]);
  currentIndex = signal(0);
  results = signal<QuizResult[]>([]);
  selectedOptionId = signal<string | null>(null);
  answered = signal(false);
  loading = signal(false);
  started = signal(false);
  loadError = signal<string | null>(null);

  currentQuestion = computed(() => this.questions()[this.currentIndex()]);
  progress = computed(() =>
    Math.round((this.currentIndex() / (this.questions().length || 1)) * 100),
  );
  isLast = computed(() => this.currentIndex() === this.questions().length - 1);
  score = computed(() => this.results().filter((r) => r.isCorrect).length);
  showResult = computed(() => this.started() && this.currentIndex() >= this.questions().length);
  isSentenceFillMode = computed(() => this.currentQuestion()?.mode === 'sentence-fill');

  readonly levels: JlptLevel[] = ['N5', 'N4', 'N3', 'N2', 'N1', 'GEN'];
  readonly modes: { value: QuizMode; label: string; desc: string }[] = [
    { value: 'vocab-meaning', label: '看單字選意思', desc: '看日文單字，選出最符合的中文意思。' },
    { value: 'sentence-fill', label: '句中單字填空', desc: '閱讀例句，選出最適合填入空格的單字。' },
  ];
  readonly Math = Math;
  private startTime = 0;

  startQuiz() {
    if (!this.isLevelAvailable(this.selectedLevel())) {
      this.loadError.set(`${this.selectedLevel()} 題庫尚未準備完成，目前可使用 ${this.vocabService.availableLevels.join(', ')}。`);
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
        this.loadError.set(`無法載入 ${this.selectedLevel()} 題庫，請確認 assets/data/${this.selectedLevel().toLowerCase()}.json 是否存在。`);
      },
    });
  }

  selectOption(option: QuizOption) {
    if (this.answered()) return;
    this.selectedOptionId.set(option.id);
    this.answered.set(true);

    const result: QuizResult = {
      questionId: this.currentQuestion().id,
      selectedOptionId: option.id,
      isCorrect: option.isCorrect,
      timeSpentMs: Date.now() - this.startTime,
    };
    this.results.update((r) => [...r, result]);
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

  quitQuiz() {
    this.restart();
  }

  isLevelAvailable(level: JlptLevel): boolean {
    return this.vocabService.hasLevelData(level);
  }

  levelDescription(level: JlptLevel): string {
    switch (level) {
      case 'N5':
        return '入門基礎';
      case 'N4':
        return '初級進階';
      case 'N3':
        return '中級過渡';
      case 'N2':
        return '進階實戰';
      case 'N1':
        return '高階挑戰';
      case 'GEN':
        return '日常詞彙綜合';
    }
  }

  levelAvailabilityLabel(level: JlptLevel): string {
    return this.isLevelAvailable(level) ? this.levelDescription(level) : '題庫準備中';
  }

  modeLabel(mode: QuizMode): string {
    return this.modes.find((item) => item.value === mode)?.label ?? '';
  }

  playAudio() {
    const audio = this.currentQuestion()?.audio;
    if (!audio) return;
    new Audio(`assets/audio/${audio}`).play();
  }

  questionHint(): string {
    return this.isSentenceFillMode()
      ? '請從四個選項中找出最適合放進句子的單字'
      : '請選出最符合這個單字的中文意思';
  }

  optionCardClass(option: QuizOption): string {
    if (!this.answered()) {
      return 'border-slate-200 bg-white text-slate-700 hover:-translate-y-0.5 hover:border-indigo-400 hover:bg-indigo-50 hover:shadow-[0_12px_24px_rgba(99,102,241,0.12)]';
    }

    if (option.isCorrect) {
      return 'border-green-500 bg-green-50 text-green-800';
    }

    if (option.id === this.selectedOptionId()) {
      return 'border-red-400 bg-red-50 text-red-700';
    }

    return 'border-slate-200 bg-white text-slate-400';
  }

  optionPrefixClass(option: QuizOption): string {
    if (!this.answered()) {
      return 'bg-slate-100 text-slate-600';
    }

    if (option.isCorrect) {
      return 'bg-green-100 text-green-800';
    }

    if (option.id === this.selectedOptionId()) {
      return 'bg-red-100 text-red-700';
    }

    return 'bg-slate-100 text-slate-400';
  }

  exportWrongQuestions() {
    const payload = this.buildWrongQuestionExportPayload();

    if (payload.length === 0) {
      return;
    }

    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: 'application/json;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `wrong-questions-vocab-${this.selectedLevel().toLowerCase()}-${this.selectedMode()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }

  retryWrongQuestions() {
    const wrongQuestions = this.wrongQuestions();
    if (wrongQuestions.length === 0) {
      return;
    }

    this.questions.set(wrongQuestions);
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
        selectedOption:
          question.options.find((option) => option.id === result.selectedOptionId)?.text ?? null,
        correctOption: question.options.find((option) => option.isCorrect)?.text ?? null,
      }));
  }

  private persistWrongQuestions() {
    if (typeof localStorage === 'undefined') {
      return;
    }

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

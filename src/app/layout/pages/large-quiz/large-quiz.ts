import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { ExamOption, ExamQuestion, ExamQuestionType } from '@features/models/exam-question.model';
import { JlptLevel } from '@features/models/vocab.model';
import { ExamService, ExamSetGroupItem } from '@features/services/exam.service';
import { ButtonModule } from 'primeng/button';
import { ProgressBarModule } from 'primeng/progressbar';

interface ExamResult {
  questionId: string;
  selectedOptionId: string;
  isCorrect: boolean;
  timeSpentMs: number;
}

interface ExamGroupChoice {
  id: string;
  category: 'grammar';
  type: ExamQuestionType;
  label: string;
  description: string;
}

@Component({
  selector: 'app-large-quiz',
  templateUrl: './large-quiz.html',
  styleUrls: ['./large-quiz.scss'],
  standalone: true,
  imports: [CommonModule, ButtonModule, ProgressBarModule],
})
export class LargeQuizComponent {
  private readonly wrongQuestionStorageKey = 'jlpt-app:sentence-wrong-questions';
  private examService = inject(ExamService);

  readonly examGroups: readonly ExamGroupChoice[] = this.examService
    .listExamGroups('grammar', 'sentence-fill')
    .map((item) => this.toExamGroupChoice(item));

  selectedExamGroup = signal<ExamGroupChoice['id']>(this.examGroups[0]?.id ?? 'standard-sentence-fill');
  selectedLevel = signal<JlptLevel>('N5');
  examTitle = signal('N5 句型填空');
  examDescription = signal('以句子填空四選一為主的句型測驗題組。');
  questions = signal<ExamQuestion[]>([]);
  currentIndex = signal(0);
  results = signal<ExamResult[]>([]);
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
  score = computed(() => this.results().filter((result) => result.isCorrect).length);
  showResult = computed(() => this.started() && this.currentIndex() >= this.questions().length);

  readonly levels: JlptLevel[] = ['N5', 'N4', 'N3', 'N2', 'N1'];
  readonly Math = Math;
  private startTime = 0;

  constructor() {
    this.syncSelectionPreview();
  }

  startQuiz() {
    const selectedGroup = this.currentExamGroup();
    if (!selectedGroup || !this.examService.hasExamSetForGroup(selectedGroup.id, this.selectedLevel())) {
      this.loadError.set(`${this.selectedLevel()} 的句型測驗題組尚未準備完成。`);
      return;
    }

    this.loadError.set(null);
    this.loading.set(true);

    this.examService
      .getExamSetForGroup(selectedGroup.id, this.selectedLevel())
      .subscribe({
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
          this.loadError.set(
            `無法載入 ${this.selectedLevel()} 句型測驗，請確認對應的題組 JSON 是否存在。`,
          );
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
      this.currentIndex.update((index) => index + 1);
      this.selectedOptionId.set(null);
      this.answered.set(false);
      this.startTime = Date.now();
      return;
    }

    this.currentIndex.update((index) => index + 1);
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
    return this.examService.hasExamSetForGroup(this.selectedExamGroup(), level);
  }

  selectLevel(level: JlptLevel) {
    if (!this.isLevelAvailable(level)) {
      return;
    }

    this.selectedLevel.set(level);
    this.syncSelectionPreview();
  }

  selectExamGroup(examGroupId: string) {
    const selected = this.examGroups.find((item) => item.id === examGroupId);
    if (!selected) {
      return;
    }

    this.selectedExamGroup.set(selected.id);

    if (!this.isLevelAvailable(this.selectedLevel())) {
      const fallbackLevel = this.examService.getAvailableLevelsForGroup(selected.id)[0];
      if (fallbackLevel) {
        this.selectedLevel.set(fallbackLevel);
      }
    }

    this.syncSelectionPreview();
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
        return '綜合練習';
      default:
        return '綜合練習';
    }
  }

  optionCardClass(option: ExamOption): string {
    if (!this.answered()) {
      return 'border-slate-200 bg-white text-slate-700 hover:-translate-y-0.5 hover:border-amber-400 hover:bg-amber-50 hover:shadow-[0_12px_24px_rgba(245,158,11,0.12)]';
    }

    if (option.isCorrect) {
      return 'border-green-500 bg-green-50 text-green-800';
    }

    if (option.id === this.selectedOptionId()) {
      return 'border-red-400 bg-red-50 text-red-700';
    }

    return 'border-slate-200 bg-white text-slate-400';
  }

  optionPrefixClass(option: ExamOption): string {
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
    link.download = `wrong-questions-sentence-${this.selectedLevel().toLowerCase()}-${this.selectedExamGroup()}.json`;
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
        selectedOption:
          question.options.find((option) => option.id === result.selectedOptionId)?.text ?? null,
        correctOption: question.options.find((option) => option.isCorrect)?.text ?? null,
        tags: question.tags ?? [],
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
        type: this.selectedExamGroup(),
        items: this.buildWrongQuestionExportPayload(),
        updatedAt: new Date().toISOString(),
      }),
    );
  }

  private currentExamGroup(): ExamGroupChoice {
    return this.examGroups.find((group) => group.id === this.selectedExamGroup()) ?? this.examGroups[0];
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
    const selectedItem = this.examService.findExamSetForGroup(
      this.selectedExamGroup(),
      this.selectedLevel(),
    );
    const selectedGroup = this.currentExamGroup();

    this.examTitle.set(selectedItem?.title ?? `${this.selectedLevel()} ${selectedGroup?.label ?? '句型測驗'}`);
    this.examDescription.set(selectedItem?.description ?? selectedGroup?.description ?? '');
  }

  private randomizeQuestions(questions: ExamQuestion[]): ExamQuestion[] {
    return this.shuffle(
      questions.map((question) => ({
        ...question,
        options: this.shuffle([...question.options]),
      })),
    );
  }

  private shuffle<T>(items: T[]): T[] {
    const cloned = [...items];
    for (let index = cloned.length - 1; index > 0; index -= 1) {
      const randomIndex = Math.floor(Math.random() * (index + 1));
      [cloned[index], cloned[randomIndex]] = [cloned[randomIndex], cloned[index]];
    }
    return cloned;
  }
}

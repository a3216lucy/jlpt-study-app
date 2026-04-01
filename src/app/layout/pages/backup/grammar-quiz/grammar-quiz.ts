import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import {
  GrammarQuizMode,
  GrammarQuizOption,
  GrammarQuizQuestion,
  GrammarQuizResult,
} from '@features/models/grammar-pattern.model';
import { JlptLevel } from '@features/models/vocab.model';
import { GrammarQuizService } from '@features/services/grammar-quiz.service';
import { GrammarService } from '@features/services/grammar.service';
import { ButtonModule } from 'primeng/button';
import { ProgressBarModule } from 'primeng/progressbar';

@Component({
  selector: 'app-grammar-quiz',
  templateUrl: './grammar-quiz.html',
  styleUrls: ['./grammar-quiz.scss'],
  standalone: true,
  imports: [CommonModule, ButtonModule, ProgressBarModule],
})
export class GrammarQuizComponent {
  private grammarService = inject(GrammarService);
  private grammarQuizService = inject(GrammarQuizService);

  selectedLevel = signal<JlptLevel>('N5');
  selectedMode = signal<GrammarQuizMode>('mixed');
  questions = signal<GrammarQuizQuestion[]>([]);
  currentIndex = signal(0);
  results = signal<GrammarQuizResult[]>([]);
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
  isFillMode = computed(() => this.currentQuestion()?.mode === 'sentence-fill');

  readonly levels: JlptLevel[] = ['N5', 'N4', 'N3', 'N2', 'N1'];
  readonly modes: { value: GrammarQuizMode; label: string; desc: string }[] = [
    { value: 'mixed',          label: '混合模式', desc: '選義＋填空各半' },
    { value: 'meaning-choice', label: '選義模式', desc: '看文型選中文意思' },
    { value: 'sentence-fill',  label: '填空模式', desc: '句中填入正確文型' },
  ];
  readonly Math = Math;
  private startTime = 0;

  startQuiz() {
    if (!this.grammarService.hasLevelData(this.selectedLevel())) {
      this.loadError.set(`${this.selectedLevel()} 文型題庫尚未準備完成。`);
      return;
    }
    this.loadError.set(null);
    this.loading.set(true);
    this.grammarService.getPatterns(this.selectedLevel()).subscribe({
      next: (patterns) => {
        const qs = this.grammarQuizService.generate(patterns, this.selectedMode(), 10);
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
          `無法載入 ${this.selectedLevel()} 文型題庫，請確認 assets/data/grammar-${this.selectedLevel().toLowerCase()}.json 是否存在。`
        );
      },
    });
  }

  selectOption(option: GrammarQuizOption) {
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
    this.loadError.set(null);
  }

  isLevelAvailable(level: JlptLevel): boolean {
    return this.grammarService.hasLevelData(level);
  }

  levelDescription(level: JlptLevel): string {
    const map: Record<JlptLevel, string> = {
      N5: '入門基礎', N4: '初級進階', N3: '中級過渡',
      N2: '進階實戰', N1: '高階挑戰', GEN: '綜合',
    };
    return map[level];
  }

  modeLabel(mode: GrammarQuizMode): string {
    return this.modes.find(m => m.value === mode)?.label ?? '';
  }

  questionTypeLabel(): string {
    return this.isFillMode() ? '句子填空' : '選擇意思';
  }

  optionCardClass(option: GrammarQuizOption): string {
    if (!this.answered()) {
      return 'border-slate-200 bg-white text-slate-700 hover:-translate-y-0.5 hover:border-violet-400 hover:bg-violet-50 hover:shadow-[0_12px_24px_rgba(139,92,246,0.12)]';
    }
    if (option.isCorrect) return 'border-green-500 bg-green-50 text-green-800';
    if (option.id === this.selectedOptionId()) return 'border-red-400 bg-red-50 text-red-700';
    return 'border-slate-200 bg-white text-slate-400';
  }

  optionPrefixClass(option: GrammarQuizOption): string {
    if (!this.answered()) return 'bg-slate-100 text-slate-600';
    if (option.isCorrect) return 'bg-green-100 text-green-800';
    if (option.id === this.selectedOptionId()) return 'bg-red-100 text-red-700';
    return 'bg-slate-100 text-slate-400';
  }

  /** 將 ＿＿＿ 分割為前後兩段，供 template 分別 highlight */
  splitSentence(sentence: string): { before: string; after: string } {
    const idx = sentence.indexOf('＿＿＿');
    if (idx === -1) return { before: sentence, after: '' };
    return {
      before: sentence.slice(0, idx),
      after: sentence.slice(idx + 3),
    };
  }
}

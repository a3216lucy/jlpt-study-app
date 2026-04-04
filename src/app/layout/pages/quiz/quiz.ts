import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { QuizOption } from '@features/models/quiz.model';
import { JlptLevel } from '@features/models/vocab.model';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ProgressBarModule } from 'primeng/progressbar';
import { QuizStore } from './quiz.store';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.html',
  styleUrls: ['./quiz.scss'],
  standalone: true,
  imports: [CommonModule, ButtonModule, CardModule, BadgeModule, ProgressBarModule],
  providers: [QuizStore],
})
export class QuizComponent {
  readonly store = inject(QuizStore);

  readonly levels: JlptLevel[] = ['N5', 'N4', 'N3', 'N2', 'N1', 'GEN'];
  readonly modes = [
    { value: 'vocab-meaning' as const, label: '看單字選意思', desc: '看日文單字，選出最符合的中文意思。' },
    { value: 'sentence-fill' as const, label: '句中單字填空', desc: '閱讀例句，選出最適合填入空格的單字。' },
  ];
  readonly Math = Math;

  levelDescription(level: JlptLevel): string {
    const map: Record<JlptLevel, string> = {
      N5: '入門基礎', N4: '初級進階', N3: '中級過渡',
      N2: '進階實戰', N1: '高階挑戰', GEN: '日常詞彙綜合',
    };
    return map[level] ?? '綜合練習';
  }

  levelAvailabilityLabel(level: JlptLevel): string {
    return this.store.isLevelAvailable(level) ? this.levelDescription(level) : '題庫準備中';
  }

  modeLabel(mode: string): string {
    return this.modes.find((m) => m.value === mode)?.label ?? '';
  }

  questionHint(): string {
    return this.store.isSentenceFillMode()
      ? '請從四個選項中找出最適合放進句子的單字'
      : '請選出最符合這個單字的中文意思';
  }

  playAudio() {
    const text = this.store.currentQuestion()?.furigana;
    if (!text || !('speechSynthesis' in window)) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ja-JP';
    utterance.rate = 0.85;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }

  optionCardClass(option: QuizOption): string {
    if (!this.store.answered()) {
      return 'border-slate-200 bg-white text-slate-700 hover:-translate-y-0.5 hover:border-indigo-400 hover:bg-indigo-50 hover:shadow-[0_12px_24px_rgba(99,102,241,0.12)]';
    }
    if (option.isCorrect) return 'border-green-500 bg-green-50 text-green-800';
    if (option.id === this.store.selectedOptionId()) return 'border-red-400 bg-red-50 text-red-700';
    return 'border-slate-200 bg-white text-slate-400';
  }

  optionPrefixClass(option: QuizOption): string {
    if (!this.store.answered()) return 'bg-slate-100 text-slate-600';
    if (option.isCorrect) return 'bg-green-100 text-green-800';
    if (option.id === this.store.selectedOptionId()) return 'bg-red-100 text-red-700';
    return 'bg-slate-100 text-slate-400';
  }
}

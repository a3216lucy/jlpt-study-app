// Cores
import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, computed, effect, inject, signal, viewChild } from '@angular/core';
// Shared
import type { ExamOption } from '@core/models/exam-question.model';
// Store
import { PastExamStore } from '../../past-exam.store';
// Utils
import { ParenFuriganaPipe } from '../../furigana-paren.pipe';
import { blankNumber, clozeHtml, splitClozePassage } from '../../cloze-passage.util';
import { splitPassage } from '../../passage.util';
import { parseSortStem, stemWithoutAnswer } from '../../sort-pad.util';
// Components
import { PastExamExplanationComponent } from '../past-exam-explanation/past-exam-explanation.component';
import { PastExamSortPadComponent } from '../past-exam-sort-pad/past-exam-sort-pad.component';

/** 一題的呈現：題幹、選項、（公布後）對錯回饋＋中文翻譯＋解析；讀解題左右分割 */
@Component({
  selector: 'app-past-exam-question',
  templateUrl: './past-exam-question.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet, ParenFuriganaPipe, PastExamExplanationComponent, PastExamSortPadComponent],
  host: { class: 'flex flex-col gap-4 sm:gap-5 lg:gap-6', '(document:keydown.escape)': 'closeImage()' },
})
export class PastExamQuestionComponent {
  // Dependencies
  // --------------------------------------------------------------------
  readonly store = inject(PastExamStore);

  // State
  // --------------------------------------------------------------------
  readonly question = computed(() => this.store.currentQuestion());

  /** 読解題目的 prompt 內嵌了「本文」；沒有本文就回傳 null（不顯示本文面板） */
  readonly passage = computed(() => {
    const q = this.question();
    return q ? splitPassage(q.prompt) : null;
  });

  /** 文章の文法：整篇文章一次列出（目前這題的空格強調），切題只換下面的選項；沒有原文就回傳 null */
  readonly cloze = computed(() => {
    const q = this.question();
    if (!q || q.problemLabel !== '文章の文法') return null;
    const split = splitClozePassage(q.prompt);
    if (!split) return null;
    return { intro: split.intro, html: clozeHtml(split.passage, blankNumber(q.questionText ?? '')) };
  });

  /** 題目附圖的放大檢視：目前放大的圖與倍率（1＝符合螢幕寬度） */
  readonly zoomedImage = signal<string | null>(null);
  readonly zoomLevel = signal(1);

  private readonly clozeBox = viewChild<ElementRef<HTMLElement>>('clozeBox');

  /** 聽解：音檔另外播放，這裡只有答題卡（選項內容作答後才公布） */
  readonly isListening = computed(() => this.question()?.category === 'listening');

  /** 練習作答後、或唯讀回顧時，選項不可再點 */
  readonly locked = computed(() => this.store.mode() === 'review' || (this.store.mode() === 'practice' && this.store.revealed()));

  /** 排序題（有 4 個空格與★）：顯示試排區；其他題維持純文字題幹 */
  readonly isSort = computed(() => {
    const q = this.question();
    return !!q && parseSortStem(q.questionText ?? '') !== null;
  });

  /** 作答前的題幹：去掉第二行起的「正しい語順」答案與選項列，公布後才連同答案顯示 */
  readonly stemText = computed(() => {
    const q = this.question();
    if (!q) return '';
    const text = q.questionText || q.prompt;
    return this.store.revealed() ? text : stemWithoutAnswer(text);
  });

  readonly isCorrect = computed(() => {
    const q = this.question();
    return !!q && this.store.selectedOptionId() === q.correctAnswer;
  });

  readonly correctNumber = computed(() => {
    const q = this.question();
    return q ? q.options.findIndex((o) => o.isCorrect) + 1 : 0;
  });

  constructor() {
    // 切題時把文章捲到目前的空格附近
    effect(() => {
      this.cloze();
      queueMicrotask(() => {
        const box = this.clozeBox()?.nativeElement;
        const mark = box?.querySelector<HTMLElement>('mark');
        if (box && mark) box.scrollTo({ top: Math.max(0, mark.offsetTop - 72), behavior: 'smooth' });
      });
    });
  }

  // Public Handlers
  // --------------------------------------------------------------------
  openImage(src: string): void {
    this.zoomLevel.set(1);
    this.zoomedImage.set(src);
  }

  closeImage(): void {
    this.zoomedImage.set(null);
  }

  /** 點圖：符合寬度 ↔ 放大 2.5 倍（放大後可捲動） */
  toggleZoom(): void {
    this.zoomLevel.update((v) => (v === 1 ? 2.5 : 1));
  }

  optionCardClass(option: ExamOption): string {
    const selected = this.store.selectedOptionId() === option.id;
    if (this.store.revealed()) {
      if (option.isCorrect) return 'border-[#5E9C86] bg-matcha-soft text-ink';
      if (selected) return 'border-accent bg-accent-soft text-ink';
      return 'border-border bg-surface text-text-muted';
    }
    return selected
      ? 'border-accent bg-accent-soft text-ink'
      : 'border-border bg-surface text-ink hover:border-accent/40 hover:bg-accent-soft/30';
  }

  optionPrefixClass(option: ExamOption): string {
    const selected = this.store.selectedOptionId() === option.id;
    if (this.store.revealed()) {
      if (option.isCorrect) return 'bg-[#2F6F5A] text-white';
      if (selected) return 'bg-accent text-white';
      return 'bg-bg text-text-muted';
    }
    return selected ? 'bg-accent text-white' : 'bg-bg text-text-secondary';
  }
}

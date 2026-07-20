// Cores
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
// Shared
import type { ExamOption } from '@shared/models/exam-question.model';
import type { PastExamEntry, PastExamSection } from '@shared/config/past-exam-catalog';
import type { JlptLevel } from '@shared/models/vocab.model';
// Store
import { PastExamStore } from './past-exam.store';

const CATEGORY_LABEL: Record<string, string> = {
  grammar: '文法',
  vocabulary: '語彙',
  reading: '読解',
};

const CATEGORY_ICON: Record<string, string> = {
  grammar: 'fa-pen',
  vocabulary: 'fa-book',
  reading: 'fa-file-lines',
};

const PASSAGE_DIVIDER = '─────';

@Component({
  selector: 'app-past-exam',
  templateUrl: './past-exam.page.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [PastExamStore],
})
export class PastExamPage implements OnInit {
  // Dependencies
  // --------------------------------------------------------------------
  readonly store = inject(PastExamStore);

  // Constants
  // --------------------------------------------------------------------
  readonly levels: JlptLevel[] = ['N1', 'N2', 'N3', 'N4', 'N5'];

  // Lifecycle
  // --------------------------------------------------------------------
  ngOnInit() {
    this.store.init();
  }

  // Public Handlers
  // --------------------------------------------------------------------
  categoryLabel(section: PastExamSection): string {
    return CATEGORY_LABEL[section.category] ?? section.category;
  }

  categoryIcon(section: PastExamSection): string {
    return CATEGORY_ICON[section.category] ?? 'fa-file';
  }

  examTotalQuestions(exam: PastExamEntry): number {
    return exam.sections.reduce((sum, s) => sum + s.questionCount, 0);
  }

  /** 読解題目的 prompt 內嵌了「本文」，用 ───── 分隔線切開；沒有分隔線就回傳 null（不顯示本文面板） */
  splitPassage(prompt: string): { intro: string; passage: string } | null {
    const idx = prompt.indexOf(PASSAGE_DIVIDER);
    if (idx === -1) return null;
    return {
      intro: prompt.slice(0, idx).trim(),
      passage: prompt.slice(idx + PASSAGE_DIVIDER.length).trim(),
    };
  }

  optionCardClass(option: ExamOption): string {
    return this.store.selectedOptionId() === option.id
      ? 'border-accent bg-accent-soft text-ink'
      : 'border-border bg-surface text-ink hover:border-accent/40 hover:bg-accent-soft/30';
  }

  optionPrefixClass(option: ExamOption): string {
    return this.store.selectedOptionId() === option.id
      ? 'bg-accent text-white'
      : 'bg-bg text-text-secondary';
  }

  scorePercent(score: number, total: number): number {
    return total > 0 ? Math.round((score / total) * 100) : 0;
  }

  scoreColorClass(percent: number): string {
    return percent >= 80 ? 'text-matcha' : percent >= 60 ? 'text-[#B08514]' : 'text-accent';
  }

  scoreBarClass(percent: number): string {
    return percent >= 80 ? 'bg-matcha' : percent >= 60 ? 'bg-sun-yellow' : 'bg-accent';
  }
}

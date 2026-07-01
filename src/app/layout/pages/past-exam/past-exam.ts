import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ProgressBarModule } from 'primeng/progressbar';
import { ExamOption } from '@features/models/exam-question.model';
import { PastExamEntry, PastExamSection } from '@app/config/past-exam-catalog';
import { PastExamStore } from './past-exam.store';

@Component({
  selector: 'app-past-exam',
  templateUrl: './past-exam.html',
  standalone: true,
  imports: [CommonModule, ButtonModule, ProgressBarModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [PastExamStore],
})
export class PastExamComponent {
  readonly store = inject(PastExamStore);
  readonly Math = Math;

  formatMonth(month: number): string {
    return `${month}月`;
  }

  categoryLabel(section: PastExamSection): string {
    const map: Record<string, string> = {
      grammar: '文法',
      vocabulary: '語彙',
      reading: '読解',
    };
    return map[section.category] ?? section.category;
  }

  categoryColor(section: PastExamSection): string {
    const map: Record<string, string> = {
      grammar: 'bg-violet-100 text-violet-700',
      vocabulary: 'bg-teal-100 text-teal-700',
      reading: 'bg-sky-100 text-sky-700',
    };
    return map[section.category] ?? 'bg-slate-100 text-slate-700';
  }

  optionCardClass(option: ExamOption): string {
    if (!this.store.answered()) {
      return 'border-slate-200 bg-white text-slate-700 hover:-translate-y-0.5 hover:border-violet-400 hover:bg-violet-50 hover:shadow-[0_12px_24px_rgba(139,92,246,0.12)]';
    }
    if (option.isCorrect) return 'border-green-500 bg-green-50 text-green-800';
    if (option.id === this.store.selectedOptionId()) return 'border-red-400 bg-red-50 text-red-700';
    return 'border-slate-200 bg-white text-slate-400';
  }

  optionPrefixClass(option: ExamOption): string {
    if (!this.store.answered()) return 'bg-slate-100 text-slate-600';
    if (option.isCorrect) return 'bg-green-100 text-green-800';
    if (option.id === this.store.selectedOptionId()) return 'bg-red-100 text-red-700';
    return 'bg-slate-100 text-slate-400';
  }

  trackByExam(_: number, exam: PastExamEntry) {
    return exam.id;
  }

  trackBySection(_: number, section: PastExamSection) {
    return section.id;
  }

  correctOption(question: ReturnType<typeof this.store.questions>[number]): ExamOption | undefined {
    return question.options.find((o) => o.isCorrect);
  }

  selectedOptionForResult(
    question: ReturnType<typeof this.store.questions>[number],
    selectedId: string,
  ): ExamOption | undefined {
    return question.options.find((o) => o.id === selectedId);
  }
}

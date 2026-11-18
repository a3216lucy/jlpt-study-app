// Cores
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
// Shared
import type { PastExamSection } from '@core/config/past-exam-catalog';
// Store
import { PastExamStore } from '../../past-exam.store';
// Components
import { PastExamDialogComponent } from '../past-exam-dialog/past-exam-dialog.component';
import { PastExamNavigatorComponent } from '../past-exam-navigator/past-exam-navigator.component';
import { PastExamQuestionComponent } from '../past-exam-question/past-exam-question.component';
import { PastExamTimerComponent } from '../past-exam-timer/past-exam-timer.component';

const CATEGORY_LABEL: Record<string, string> = {
  grammar: '文法',
  vocabulary: '語彙',
  reading: '読解',
  listening: '聴解',
};

@Component({
  selector: 'app-past-exam-taking',
  templateUrl: './past-exam-taking.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PastExamDialogComponent, PastExamNavigatorComponent, PastExamQuestionComponent, PastExamTimerComponent],
})
export class PastExamTakingComponent {
  // Dependencies
  // --------------------------------------------------------------------
  readonly store = inject(PastExamStore);

  // Public Handlers
  // --------------------------------------------------------------------
  categoryLabel(section: PastExamSection): string {
    return CATEGORY_LABEL[section.category] ?? section.category;
  }

  /** 下拉選單：跳到該大題在目前階段的第一題 */
  jumpToProblem(event: Event): void {
    const number = Number((event.target as HTMLSelectElement).value);
    const section = this.store.currentSection();
    const target = this.store
      .stageIndices()
      .find((i) => {
        const item = this.store.flatItems()[i];
        return item.section.id === section?.id && item.question.problemNumber === number;
      });
    if (target != null) this.store.goTo(target);
  }
}

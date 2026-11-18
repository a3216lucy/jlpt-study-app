// Cores
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
// Store
import { PastExamStore } from '../../past-exam.store';

/** 題號格：實際演練用來回頭檢查（已答／未答／標記／目前） */
@Component({
  selector: 'app-past-exam-navigator',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex flex-col gap-2 rounded-lg border border-border bg-surface p-3.5 sm:p-4">
      <div class="flex items-center justify-between text-xs text-text-muted">
        <span class="font-bold text-ink">題號</span>
        <span>已答 {{ store.stageAnsweredCount() }} / {{ store.stageIndices().length }}</span>
      </div>
      <div class="grid grid-cols-8 gap-1.5 sm:grid-cols-10 lg:grid-cols-12">
        @for (cell of store.navigatorCells(); track cell.index) {
          <button
            type="button"
            (click)="store.goTo(cell.index)"
            [attr.aria-label]="'第 ' + cell.number + ' 題' + (cell.marked ? '（已標記）' : '')"
            [class]="
              'relative flex h-8 items-center justify-center rounded-md text-xs font-bold transition ' +
              (cell.current
                ? 'bg-accent text-white'
                : cell.answered
                  ? 'bg-matcha-soft text-[#2F6F5A]'
                  : 'border border-border bg-bg text-text-secondary hover:border-accent/40')
            "
          >
            {{ cell.number }}
            @if (cell.marked) {
              <i class="fa-solid fa-bookmark absolute -right-0.5 -top-1 text-[10px] text-accent"></i>
            }
          </button>
        }
      </div>
    </div>
  `,
})
export class PastExamNavigatorComponent {
  readonly store = inject(PastExamStore);
}

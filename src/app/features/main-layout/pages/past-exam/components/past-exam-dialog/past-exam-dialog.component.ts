// Cores
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

/** 考古題頁共用彈窗（手機從底部滑出、桌面置中） */
@Component({
  selector: 'app-past-exam-dialog',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="fixed inset-0 z-50 flex items-end justify-center bg-ink/40 sm:items-center sm:p-4"
      (click)="dismissible() && dismiss.emit()"
    >
      <div
        role="dialog"
        aria-modal="true"
        class="max-h-[90vh] w-full overflow-y-auto rounded-t-2xl bg-surface p-5 shadow-xl sm:max-w-lg sm:rounded-2xl sm:p-6"
        (click)="$event.stopPropagation()"
      >
        <ng-content />
      </div>
    </div>
  `,
})
export class PastExamDialogComponent {
  /** 點背景是否可關閉 */
  readonly dismissible = input(true);
  /** 使用者要求關閉 */
  readonly dismiss = output<void>();
}

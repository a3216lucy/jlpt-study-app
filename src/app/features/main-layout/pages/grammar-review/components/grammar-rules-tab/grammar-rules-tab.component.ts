// Cores
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
// Store
import { GrammarReviewStore } from '../../grammar-review.store';

@Component({
  selector: 'app-grammar-rules-tab',
  templateUrl: './grammar-rules-tab.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GrammarRulesTabComponent {
  // Dependencies
  // --------------------------------------------------------------------
  readonly store = inject(GrammarReviewStore);

  // Public Handlers
  // --------------------------------------------------------------------
  /** allForms 表格儲存格內容格式為「規則\n例字」，拆成兩行分別渲染 */
  splitCell(value: string): { rule: string; example: string } {
    const idx = value.indexOf('\n');
    if (idx === -1) return { rule: '', example: value };
    return { rule: value.slice(0, idx), example: value.slice(idx + 1) };
  }
}

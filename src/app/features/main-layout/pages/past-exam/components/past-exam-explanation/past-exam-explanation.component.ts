// Cores
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
// Utils
import { parseExplanation } from '../../explanation.util';
import { ParenFuriganaPipe } from '../../furigana-paren.pipe';

/** 題目解析：💡 重點、（排序題）正確順序、各選項解析、（読解）全文中譯 */
@Component({
  selector: 'app-past-exam-explanation',
  templateUrl: './past-exam-explanation.component.html',
  standalone: true,
  imports: [ParenFuriganaPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PastExamExplanationComponent {
  /** 題庫的 explanation 字串 */
  readonly explanation = input.required<string>();
  /** 是否顯示全文中譯（実演結果等不需要時可關閉） */
  readonly showTranslation = input(true);

  readonly parsed = computed(() => parseExplanation(this.explanation()));

  /** 重點依句號換行（「。」後面還有內容、且不是緊接右括號或引號時才換） */
  readonly tipText = computed(() => this.parsed().tip.replace(/。(?![」』）)\s]|$)/g, '。\n'));

  /** 重點已經寫了「順序：…→…」時，不再重複顯示「正確順序」那一行 */
  readonly showOrder = computed(() => {
    const p = this.parsed();
    return !!p.order && !(/順序[:：]/.test(p.tip) && p.tip.includes('→'));
  });

  /** 該選項有沒有接續／限制／本題可展開 */
  hasDetail(o: { connect: string; limit: string; why: string }): boolean {
    return !!(o.connect || o.limit || o.why);
  }
}

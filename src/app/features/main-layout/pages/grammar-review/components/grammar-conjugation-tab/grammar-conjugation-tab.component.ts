// Cores
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
// Shared
import { WordRubyPipe } from '@shared/pipes/word-ruby.pipe';
// Store
import { GrammarReviewStore } from '../../grammar-review.store';

interface VerbClassCard {
  badge: string;
  badgeClass: string;
  title: string;
  description: string;
  examples: string;
}

const VERB_CLASS_CARDS: VerbClassCard[] = [
  {
    badge: 'I 群',
    badgeClass: 'bg-accent text-white',
    title: '五段動詞',
    description: '語尾為 u 段音（く・ぐ・す・つ・ぬ・ぶ・む・る）',
    examples: '書く・話す・待つ・飲む',
  },
  {
    badge: 'II 群',
    badgeClass: 'bg-matcha text-white',
    title: '一段動詞',
    description: 'る 前為 i/e 段音，去る＋活用',
    examples: '食べる・見る・起きる',
  },
  {
    badge: 'III 群',
    badgeClass: 'bg-sun-yellow text-ink',
    title: '不規則動詞',
    description: 'サ変・力変，需個別記憶',
    examples: 'する・来る',
  },
];

@Component({
  selector: 'app-grammar-conjugation-tab',
  templateUrl: './grammar-conjugation-tab.component.html',
  standalone: true,
  imports: [WordRubyPipe],
  host: { class: 'flex flex-col gap-8 [&_rt]:text-[0.5em] [&_rt]:font-normal [&_rt]:text-text-muted' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GrammarConjugationTabComponent {
  // Dependencies
  // --------------------------------------------------------------------
  readonly store = inject(GrammarReviewStore);

  // Constants
  // --------------------------------------------------------------------
  readonly verbClassCards = VERB_CLASS_CARDS;

  // Public Handlers
  // --------------------------------------------------------------------
  /** allForms 表格儲存格內容格式為「規則\n例字」，拆成兩行分別渲染 */
  splitCell(value: string): { rule: string; example: string } {
    const idx = value.indexOf('\n');
    if (idx === -1) return { rule: '', example: value };
    return { rule: value.slice(0, idx), example: value.slice(idx + 1) };
  }

  /** 下拉選單：跳到該區塊（收合的區塊一併展開） */
  jumpTo(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const el = document.getElementById(select.value);
    if (el instanceof HTMLDetailsElement) el.open = true;
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    select.value = '';
  }
}

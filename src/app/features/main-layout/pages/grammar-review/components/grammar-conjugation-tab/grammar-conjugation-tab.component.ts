// Cores
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GrammarConjugationTabComponent {
  // Dependencies
  // --------------------------------------------------------------------
  readonly store = inject(GrammarReviewStore);

  // Constants
  // --------------------------------------------------------------------
  readonly verbClassCards = VERB_CLASS_CARDS;
}

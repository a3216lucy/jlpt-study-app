// Cores
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
// Store
import { GrammarReviewStore } from './grammar-review.store';
import type { KeigoCategoryCard, KeigoFormationGroup } from './grammar-review.model';

interface VerbClassCard {
  badge: string;
  badgeClass: string;
  title: string;
  description: string;
  examples: string;
}

const VERB_CLASS_CARDS: VerbClassCard[] = [
  { badge: 'I 群', badgeClass: 'bg-accent text-white', title: '五段動詞', description: '語尾為 u 段音（く・ぐ・す・つ・ぬ・ぶ・む・る）', examples: '書く・話す・待つ・飲む' },
  { badge: 'II 群', badgeClass: 'bg-matcha text-white', title: '一段動詞', description: 'る 前為 i/e 段音，去る＋活用', examples: '食べる・見る・起きる' },
  { badge: 'III 群', badgeClass: 'bg-sun-yellow text-ink', title: '不規則動詞', description: 'サ変・力変，需個別記憶', examples: 'する・来る' },
];

const KEIGO_CATEGORY_CARDS: (KeigoCategoryCard & { badgeClass: string })[] = [
  { label: '尊敬語', badgeClass: 'bg-accent text-white', description: '抬高對方（動作者）的行為，表示尊敬', example: '先生が話される／いらっしゃる' },
  { label: '謙讓語', badgeClass: 'bg-matcha text-white', description: '壓低自己一方的行為，間接抬高對方', example: '私が伺う／申し上げる' },
  { label: '丁寧語', badgeClass: 'bg-sun-yellow text-ink', description: '用です・ます讓語氣禮貌，對聽者客氣', example: '行きます／本です' },
];

const KEIGO_FORMATION_GROUPS: (KeigoFormationGroup & { badgeClass: string })[] = [
  {
    label: '尊敬語',
    badgeClass: 'bg-accent text-white',
    rules: [
      { rule: 'お＋ます形＋になる', example: '例：お読みになる' },
      { rule: '～れる・られる', example: '例：話される・来られる' },
      { rule: '特別動詞', example: '例：いらっしゃる 等' },
    ],
  },
  {
    label: '謙讓語',
    badgeClass: 'bg-matcha text-white',
    rules: [
      { rule: 'お＋ます形＋する', example: '例：お持ちする' },
      { rule: 'ご＋漢語＋する', example: '例：ご案内する' },
      { rule: '特別動詞', example: '例：伺う・申す 等' },
    ],
  },
];

const KEIGO_TIP = '注意：有特殊動詞時優先用特殊形（例：食べる→召し上がる），不要再套「お～になる」造成雙重敬語。';

const SEARCH_PLACEHOLDER: Record<string, string> = {
  conjugation: '搜尋動詞或活用形…',
  keigo: '搜尋敬語動詞…',
  transitivity: '搜尋…',
  rules: '搜尋活用形…',
};

@Component({
  selector: 'app-grammar-review',
  templateUrl: './grammar-review.page.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [GrammarReviewStore],
})
export class GrammarReviewPage implements OnInit {
  // Dependencies
  // --------------------------------------------------------------------
  readonly store = inject(GrammarReviewStore);

  // Constants
  // --------------------------------------------------------------------
  readonly verbClassCards = VERB_CLASS_CARDS;
  readonly keigoCategoryCards = KEIGO_CATEGORY_CARDS;
  readonly keigoFormationGroups = KEIGO_FORMATION_GROUPS;
  readonly keigoTip = KEIGO_TIP;

  // Lifecycle
  // --------------------------------------------------------------------
  ngOnInit() {
    this.store.init();
  }

  // Public Handlers
  // --------------------------------------------------------------------
  searchPlaceholder(): string {
    return SEARCH_PLACEHOLDER[this.store.activeTab()] ?? '搜尋…';
  }

  /** allForms 表格儲存格內容格式為「規則\n例字」，拆成兩行分別渲染 */
  splitCell(value: string): { rule: string; example: string } {
    const idx = value.indexOf('\n');
    if (idx === -1) return { rule: '', example: value };
    return { rule: value.slice(0, idx), example: value.slice(idx + 1) };
  }
}

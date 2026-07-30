// Cores
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
// Store
import type { KeigoCategoryCard, KeigoFormationGroup } from '../../grammar-review.model';
import { GrammarReviewStore } from '../../grammar-review.store';

const KEIGO_CATEGORY_CARDS: (KeigoCategoryCard & { badgeClass: string })[] = [
  {
    label: '尊敬語',
    badgeClass: 'bg-accent text-white',
    description: '抬高對方（動作者）的行為，表示尊敬',
    example: '先生が話される／いらっしゃる',
  },
  {
    label: '謙讓語',
    badgeClass: 'bg-matcha text-white',
    description: '壓低自己一方的行為，間接抬高對方',
    example: '私が伺う／申し上げる',
  },
  {
    label: '丁寧語',
    badgeClass: 'bg-sun-yellow text-ink',
    description: '用です・ます讓語氣禮貌，對聽者客氣',
    example: '行きます／本です',
  },
];

const KEIGO_FORMATION_GROUPS: (KeigoFormationGroup & { badgeClass: string })[] = [
  {
    label: '尊敬語',
    badgeClass: 'bg-accent text-white',
    rules: [
      { rule: 'お＋ます形＋になる', example: '例：お読みになる' },
      { rule: '～れる・られる', example: '例：話される・来られる' },
      { rule: '特別動詞', example: '例：いらっしゃる 等' },
      { rule: 'て形＋ください→お/ご＋ます形/漢語＋ください', example: '例：お待ちください・ご確認ください' },
      { rule: 'てくださる→お/ご＋ます形/漢語＋くださる', example: '例：お越しくださる' },
    ],
  },
  {
    label: '謙讓語',
    badgeClass: 'bg-matcha text-white',
    rules: [
      { rule: 'お＋ます形＋する', example: '例：お持ちする' },
      { rule: 'ご＋漢語＋する', example: '例：ご案内する' },
      { rule: '特別動詞', example: '例：伺う・申す 等' },
      { rule: 'ていただく→お/ご＋ます形/漢語＋いただく', example: '例：お待ちいただく・ご了承いただく' },
      { rule: 'お/ご＋ます形/漢語＋申し上げる', example: '例：お礼申し上げる（傳達、依頼、祝賀、謝罪等）' },
    ],
  },
];

const KEIGO_TIP =
  '注意：有特殊動詞時優先用特殊形（例：食べる→召し上がる），不要再套「お～になる」造成雙重敬語。';

@Component({
  selector: 'app-grammar-keigo-tab',
  templateUrl: './grammar-keigo-tab.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GrammarKeigoTabComponent {
  // Dependencies
  // --------------------------------------------------------------------
  readonly store = inject(GrammarReviewStore);

  // Constants
  // --------------------------------------------------------------------
  readonly keigoCategoryCards = KEIGO_CATEGORY_CARDS;
  readonly keigoFormationGroups = KEIGO_FORMATION_GROUPS;
  readonly keigoTip = KEIGO_TIP;
}

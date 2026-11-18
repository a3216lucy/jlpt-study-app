// Cores
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
// Store
import type { KeigoCategoryCard, KeigoFormationGroup } from '../../grammar-review.model';
import { GrammarReviewStore } from '../../grammar-review.store';
// Pipes
import { WordRubyPipe } from '@shared/pipes/word-ruby.pipe';
import { FuriganaPipe } from './furigana.pipe';
// Data
import {
  KEIGO_FORM_CARDS,
  KEIGO_GIVE_RECEIVE_ROWS,
  KEIGO_GIVE_RECEIVE_TIP,
  KEIGO_HUMBLE_ROWS,
  KEIGO_MISTAKES,
  KEIGO_POLITE_CARDS,
  KEIGO_QUICK_ROWS,
  KEIGO_SASETE_CARD,
  KEIGO_STEPS,
} from './grammar-keigo.data';

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
  imports: [FuriganaPipe, WordRubyPipe],
  host: { class: 'flex flex-col gap-10 sm:gap-12 [&_rt]:text-[0.5em] [&_rt]:font-normal [&_rt]:text-text-muted [&_ruby]:[ruby-align:center]' },
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
  readonly steps = KEIGO_STEPS;
  readonly quickRows = KEIGO_QUICK_ROWS;
  readonly humbleRows = KEIGO_HUMBLE_ROWS;
  readonly giveReceiveRows = KEIGO_GIVE_RECEIVE_ROWS;
  readonly giveReceiveTip = KEIGO_GIVE_RECEIVE_TIP;
  readonly formCards = KEIGO_FORM_CARDS;
  readonly politeCards = KEIGO_POLITE_CARDS;
  readonly saseteCard = KEIGO_SASETE_CARD;
  readonly mistakes = KEIGO_MISTAKES;

  /** 頁內目錄（快速跳到想複習的段落） */
  readonly sections = [
    { id: 'keigo-steps', no: '1', label: '怎麼判斷' },
    { id: 'keigo-special', no: '2', label: '特殊動詞' },
    { id: 'keigo-humble', no: '3', label: '謙讓語Ⅰ・Ⅱ（補充）' },
    { id: 'keigo-give', no: '4', label: '授受' },
    { id: 'keigo-forms', no: '5', label: 'お／ご〜（補充）' },
    { id: 'keigo-polite', no: '6', label: '丁寧・丁重（補充）' },
    { id: 'keigo-sasete', no: '7', label: 'させていただく（補充）' },
    { id: 'keigo-mistakes', no: '8', label: '常見錯誤' },
  ];

  // Public Handlers
  // --------------------------------------------------------------------
  jumpTo(event: Event): void {
    const select = event.target as HTMLSelectElement;
    if (select.value) this.scrollTo(select.value);
    select.value = '';
  }

  scrollTo(id: string): void {
    const el = document.getElementById(id);
    if (el instanceof HTMLDetailsElement) el.open = true;
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

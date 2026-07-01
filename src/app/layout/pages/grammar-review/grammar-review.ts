import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GrammarReviewStore, GrammarGroup, JlptLevel, ReviewTab, VerbFormTable } from './grammar-review.store';

const BADGE_MAP: Record<string, string> = {
  indigo: 'bg-indigo-100 text-indigo-700 border-indigo-200',
  teal: 'bg-teal-100 text-teal-700 border-teal-200',
  amber: 'bg-amber-100 text-amber-700 border-amber-200',
  violet: 'bg-violet-100 text-violet-700 border-violet-200',
  sky: 'bg-sky-100 text-sky-700 border-sky-200',
  rose: 'bg-rose-100 text-rose-700 border-rose-200',
  emerald: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  orange: 'bg-orange-100 text-orange-700 border-orange-200',
  red: 'bg-red-100 text-red-700 border-red-200',
  cyan: 'bg-cyan-100 text-cyan-700 border-cyan-200',
  lime: 'bg-lime-100 text-lime-700 border-lime-200',
  slate: 'bg-slate-100 text-slate-700 border-slate-200',
  purple: 'bg-purple-100 text-purple-700 border-purple-200',
  fuchsia: 'bg-fuchsia-100 text-fuchsia-700 border-fuchsia-200',
  pink: 'bg-pink-100 text-pink-700 border-pink-200',
};

const PATTERN_CARD_MAP: Record<string, string> = {
  indigo: 'border-indigo-200 bg-indigo-50/60',
  teal: 'border-teal-200 bg-teal-50/60',
  amber: 'border-orange-300 bg-orange-50/60',
  violet: 'border-violet-200 bg-violet-50/60',
  sky: 'border-sky-200 bg-sky-50/60',
  rose: 'border-rose-200 bg-rose-50/60',
  emerald: 'border-emerald-200 bg-emerald-50/60',
  orange: 'border-orange-200 bg-orange-50/60',
  red: 'border-red-200 bg-red-50/60',
  cyan: 'border-cyan-200 bg-cyan-50/60',
  lime: 'border-lime-200 bg-lime-50/60',
  slate: 'border-slate-200 bg-slate-50/60',
  purple: 'border-purple-200 bg-purple-50/60',
  fuchsia: 'border-fuchsia-200 bg-fuchsia-50/60',
  pink: 'border-pink-200 bg-pink-50/60',
};

const EXAMPLE_CARD_MAP: Record<string, string> = {
  indigo: 'border-indigo-400 bg-indigo-50',
  teal: 'border-teal-400 bg-teal-50',
  amber: 'border-amber-400 bg-amber-50',
  violet: 'border-violet-400 bg-violet-50',
  sky: 'border-sky-400 bg-sky-50',
  rose: 'border-rose-400 bg-rose-50',
  emerald: 'border-emerald-400 bg-emerald-50',
  orange: 'border-orange-400 bg-orange-50',
  red: 'border-red-400 bg-red-50',
  cyan: 'border-cyan-400 bg-cyan-50',
  lime: 'border-lime-400 bg-lime-50',
  slate: 'border-slate-400 bg-slate-50',
  purple: 'border-purple-400 bg-purple-50',
  fuchsia: 'border-fuchsia-400 bg-fuchsia-50',
  pink: 'border-pink-400 bg-pink-50',
};

// ── Verb table color maps ───────────────────────────────────────────────────
const VERB_ROW_BG: Record<string, string> = {
  blue:    'bg-blue-50/60',
  emerald: 'bg-emerald-50/60',
  violet:  'bg-violet-50/60',
  rose:    'bg-rose-50/60',
};

const VERB_GROUP_TEXT: Record<string, string> = {
  blue:    'text-blue-700',
  emerald: 'text-emerald-700',
  violet:  'text-violet-700',
  rose:    'text-rose-600',
};

const VERB_ROW_BORDER: Record<string, string> = {
  blue:    'border-blue-100',
  emerald: 'border-emerald-100',
  violet:  'border-violet-100',
  rose:    'border-rose-100',
};

const VERB_EXAMPLE_CHIP: Record<string, string> = {
  blue:    'bg-blue-100 text-blue-800',
  emerald: 'bg-emerald-100 text-emerald-800',
  violet:  'bg-violet-100 text-violet-800',
  rose:    'bg-rose-100 text-rose-700',
};

const ONBIN_CHIP_MAP: Record<string, string> = {
  orange: 'bg-orange-100 text-orange-800 border-orange-300',
  amber:  'bg-amber-100  text-amber-800  border-amber-300',
  cyan:   'bg-cyan-100   text-cyan-800   border-cyan-300',
  slate:  'bg-slate-100  text-slate-700  border-slate-300',
  rose:   'bg-rose-100   text-rose-800   border-rose-300',
};

const ONBIN_ROW_BG: Record<string, string> = {
  orange: 'bg-orange-50/50',
  amber:  'bg-amber-50/50',
  cyan:   'bg-cyan-50/50',
  slate:  'bg-slate-50/50',
  rose:   'bg-rose-50/50',
};

const POLITE_HEADER_MAP: Record<string, string> = {
  blue:    'bg-blue-600 text-white',
  amber:   'bg-amber-500 text-white',
  emerald: 'bg-emerald-600 text-white',
};

const POLITE_ROW_ODD_MAP: Record<string, string> = {
  blue:    'bg-blue-50/60',
  amber:   'bg-amber-50/60',
  emerald: 'bg-emerald-50/60',
};

@Component({
  selector: 'app-grammar-review',
  templateUrl: './grammar-review.html',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [GrammarReviewStore],
})
export class GrammarReviewComponent implements OnInit {
  readonly store = inject(GrammarReviewStore);

  readonly levels: JlptLevel[] = ['N5', 'N4', 'N3', 'N2', 'N1'];

  readonly verbFormChips = [
    { id: 'masuForm',      label: 'ます形' },
    { id: 'jishoForm',     label: '辞書形' },
    { id: 'masu-jisho',    label: 'ます→辞書' },
    { id: 'masu-te',       label: 'ます→て' },
    { id: 'jisho-te',      label: '辞書→て' },
    { id: 'nai',           label: 'ない形' },
    { id: 'kanou',         label: '可能形' },
    { id: 'ikou',          label: '意向形' },
    { id: 'shieki',        label: '使役形' },
    { id: 'ukemi',         label: '受身形' },
    { id: 'shiekiUkemi',   label: '使役受身' },
    { id: 'meirei',        label: '命令形' },
    { id: 'kinshi',        label: '禁止形' },
    { id: 'politeVsPlain', label: '敬体↔普通形' },
    { id: 'sonkeigo',      label: '尊敬・謙譲' },
  ];

  ngOnInit() {
    this.store.init();
  }

  isGroupExpanded(id: string): boolean {
    return this.store.expandedGroups().has(id);
  }

  isPatternExpanded(id: string): boolean {
    return this.store.expandedPatterns().has(id);
  }

  badgeClass(color: string): string {
    return BADGE_MAP[color] ?? BADGE_MAP['slate'];
  }

  patternCardClass(color: string): string {
    return PATTERN_CARD_MAP[color] ?? PATTERN_CARD_MAP['slate'];
  }

  exampleCardClass(color: string): string {
    return EXAMPLE_CARD_MAP[color] ?? EXAMPLE_CARD_MAP['slate'];
  }

  splitNotes(notes: string): string[] {
    return notes.split(/(?=[①②③④⑤⑥⑦⑧⑨])/).filter((s) => s.trim());
  }

  parseFormation(formation: string): { forms: string[]; suffixes: string[] } | null {
    const idx = formation.indexOf(' ＋ ');
    if (idx === -1) return null;
    return {
      forms: formation.slice(0, idx).split('・'),
      suffixes: formation.slice(idx + 3).split('／'),
    };
  }

  // ── Verb table helpers ───────────────────────────────────────────────────
  verbRowBg(color: string): string {
    return VERB_ROW_BG[color] ?? VERB_ROW_BG['blue'];
  }

  verbGroupText(color: string): string {
    return VERB_GROUP_TEXT[color] ?? VERB_GROUP_TEXT['blue'];
  }

  verbRowBorder(color: string): string {
    return VERB_ROW_BORDER[color] ?? VERB_ROW_BORDER['blue'];
  }

  verbExampleChip(color: string): string {
    return VERB_EXAMPLE_CHIP[color] ?? VERB_EXAMPLE_CHIP['blue'];
  }

  onbinChipClass(color: string): string {
    return ONBIN_CHIP_MAP[color] ?? ONBIN_CHIP_MAP['slate'];
  }

  onbinRowBg(color: string): string {
    return ONBIN_ROW_BG[color] ?? ONBIN_ROW_BG['slate'];
  }

  politeHeaderClass(color: string): string {
    return POLITE_HEADER_MAP[color] ?? POLITE_HEADER_MAP['blue'];
  }

  politeRowOddClass(color: string): string {
    return POLITE_ROW_ODD_MAP[color] ?? POLITE_ROW_ODD_MAP['blue'];
  }

  splitRuleLines(rule: string): string[] {
    return rule.split('\n');
  }

  verbGroupLabel(group: string): string {
    if (group === '全類別' || group === 'II例外') return group;
    return group + '類';
  }

  hasSubRows(form: VerbFormTable): boolean {
    return form.rows.some(r => !!r.subRows);
  }
}

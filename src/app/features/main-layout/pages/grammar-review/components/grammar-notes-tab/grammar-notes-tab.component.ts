// Cores
import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
// Models
import type { NoteSection } from '../../grammar-review.model';

@Component({
  selector: 'app-grammar-notes-tab',
  templateUrl: './grammar-notes-tab.component.html',
  standalone: true,
  host: {
    class: 'flex flex-col gap-4 [&_rt]:text-[0.5em] [&_rt]:font-normal [&_rt]:text-text-muted [&_ruby]:[ruby-align:center]',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GrammarNotesTabComponent {
  // Inputs
  // --------------------------------------------------------------------
  readonly sections = input.required<NoteSection[]>();

  // State
  // --------------------------------------------------------------------
  /** 目前展開的段落（預設第一個） */
  private readonly opened = signal<Set<string> | null>(null);

  readonly openIds = computed(() => this.opened() ?? new Set([this.sections()[0]?.id]));

  /** 各「切換表格」目前選的分頁（key＝段落 id） */
  readonly tabSel = signal<Partial<Record<string, number>>>({});

  // Public Handlers
  // --------------------------------------------------------------------
  jumpTo(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const id = select.value;
    this.setOpen(id, true);
    setTimeout(() => document.getElementById('ns-' + id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
    select.value = '';
  }

  onToggle(id: string, event: Event): void {
    this.setOpen(id, (event.target as HTMLDetailsElement).open);
  }

  selectTab(id: string, i: number): void {
    this.tabSel.update((m) => ({ ...m, [id]: i }));
  }

  setAllOpen(open: boolean): void {
    this.opened.set(open ? new Set(this.sections().map((s) => s.id)) : new Set());
  }

  // Private Helpers
  // --------------------------------------------------------------------
  private setOpen(id: string, open: boolean): void {
    const next = new Set(this.openIds());
    if (open) next.add(id);
    else next.delete(id);
    this.opened.set(next);
  }
}

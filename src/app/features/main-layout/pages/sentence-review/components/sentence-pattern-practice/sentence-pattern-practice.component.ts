// Cores
import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
// Store
import { SentenceReviewStore } from '../../sentence-review.store';

@Component({
  selector: 'app-sentence-pattern-practice',
  templateUrl: './sentence-pattern-practice.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SentencePatternPracticeComponent {
  // Dependencies
  // --------------------------------------------------------------------
  readonly store = inject(SentenceReviewStore);

  // Inputs
  // --------------------------------------------------------------------
  readonly patternId = input.required<string>();

  // State
  // --------------------------------------------------------------------
  /** 是否已展開練習 */
  readonly started = signal(false);
  readonly index = signal(0);
  /** 目前題選了第幾個選項（null＝尚未作答） */
  readonly picked = signal<number | null>(null);

  readonly questions = computed(() => this.store.practice()?.[this.patternId()] ?? []);
  readonly current = computed(() => this.questions()[this.index()] ?? null);
  readonly loaded = computed(() => this.store.practice() !== null);

  // Public Handlers
  // --------------------------------------------------------------------
  start(): void {
    this.store.loadPractice();
    this.started.set(true);
  }

  pick(i: number): void {
    if (this.picked() === null) this.picked.set(i);
  }

  next(): void {
    this.picked.set(null);
    this.index.update((i) => (i + 1) % Math.max(this.questions().length, 1));
  }

  optionClass(i: number): string {
    const base = 'flex w-full items-start gap-2 rounded-md border px-3 py-2 text-left text-sm transition ';
    const picked = this.picked();
    const answer = this.current()?.answer;
    if (picked === null) return base + 'border-border bg-surface text-ink hover:border-accent/50';
    if (i === answer) return base + 'border-[#2F6F5A] bg-matcha-soft font-bold text-[#2F6F5A]';
    if (i === picked) return base + 'border-accent bg-accent-soft text-accent';
    return base + 'border-border bg-surface text-text-muted';
  }
}

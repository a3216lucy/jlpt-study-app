// Cores
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
// Angular
import { RouterLink } from '@angular/router';
// Store
import { SentenceReviewStore } from './sentence-review.store';
import type { JlptLevel } from './sentence-review.model';

const DOT_COLOR_CLASS: Record<string, string> = {
  indigo: 'bg-indigo-400',
  teal: 'bg-teal-400',
  amber: 'bg-amber-400',
  violet: 'bg-violet-400',
  sky: 'bg-sky-400',
  rose: 'bg-rose-400',
  emerald: 'bg-emerald-400',
  orange: 'bg-orange-400',
  red: 'bg-red-400',
  cyan: 'bg-cyan-400',
  lime: 'bg-lime-400',
  slate: 'bg-slate-400',
  purple: 'bg-purple-400',
  fuchsia: 'bg-fuchsia-400',
  pink: 'bg-pink-400',
};

@Component({
  selector: 'app-sentence-review',
  templateUrl: './sentence-review.page.html',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SentenceReviewStore],
})
export class SentenceReviewPage implements OnInit {
  // Dependencies
  // --------------------------------------------------------------------
  readonly store = inject(SentenceReviewStore);

  // Constants
  // --------------------------------------------------------------------
  readonly levels: JlptLevel[] = ['N1', 'N2', 'N3', 'N4', 'N5'];

  // Lifecycle
  // --------------------------------------------------------------------
  ngOnInit() {
    this.store.init();
  }

  // Public Handlers
  // --------------------------------------------------------------------
  dotClass(color: string): string {
    return DOT_COLOR_CLASS[color] ?? 'bg-slate-400';
  }
}

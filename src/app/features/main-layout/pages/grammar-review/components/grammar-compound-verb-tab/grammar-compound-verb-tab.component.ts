// Cores
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
// Angular
import { RouterLink } from '@angular/router';
// Store
import { GrammarReviewStore } from '../../grammar-review.store';

@Component({
  selector: 'app-grammar-compound-verb-tab',
  templateUrl: './grammar-compound-verb-tab.component.html',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GrammarCompoundVerbTabComponent {
  // Dependencies
  // --------------------------------------------------------------------
  readonly store = inject(GrammarReviewStore);

  // Public Handlers
  // --------------------------------------------------------------------
  /** 把 notes 字串按行拆開，標記 注意/辨別/重要 開頭的行為 callout */
  parseNotes(notes: string): { text: string; isCallout: boolean }[] {
    return notes.split('\n').map((line) => ({
      text: line,
      isCallout: /^(注意|辨別|重要|核心語感|常用固定搭配|重點|對比|語感重點)[：:]/.test(line),
    }));
  }
}

// Cores
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
// Store
import { QuizStore } from '../../quiz.store';
import { VocabAudioService } from '../../vocab-audio.service';
// Utils
import { posLabel, stageInfo } from '../../quiz-display.util';
// Models
import type { VocabEntry } from '../../quiz.model';

@Component({
  selector: 'app-vocab-entry-list',
  templateUrl: './vocab-entry-list.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VocabEntryListComponent {
  // Dependencies
  // --------------------------------------------------------------------
  readonly store = inject(QuizStore);
  private readonly audio = inject(VocabAudioService);

  // Public Handlers
  // --------------------------------------------------------------------
  posLabel(pos: string): string {
    return posLabel(pos);
  }

  stageInfo(entry: VocabEntry) {
    return stageInfo(entry, this.store.srsRecords());
  }

  speakEntry(entry: VocabEntry): void {
    this.audio.speak(entry);
  }
}

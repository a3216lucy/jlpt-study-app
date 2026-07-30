// Cores
import { ChangeDetectionStrategy, Component, HostListener, OnInit, inject } from '@angular/core';
// Store
import { QuizStore } from '../../quiz.store';
import { VocabAudioService } from '../../vocab-audio.service';
// Utils
import { posLabel } from '../../quiz-display.util';
// Models
import type { VocabEntry } from '../../quiz.model';

@Component({
  selector: 'app-vocab-flashcard',
  templateUrl: './vocab-flashcard.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VocabFlashcardComponent implements OnInit {
  // Dependencies
  // --------------------------------------------------------------------
  readonly store = inject(QuizStore);
  private readonly audio = inject(VocabAudioService);

  // Lifecycle
  // --------------------------------------------------------------------
  ngOnInit(): void {
    this._speakCurrentCard();
  }

  // Public Handlers — keyboard
  // --------------------------------------------------------------------
  @HostListener('window:keydown', ['$event'])
  onKey(e: KeyboardEvent) {
    if (e.key === ' ') {
      e.preventDefault();
      this.flipCard();
    }
    if (e.key === 'k' && this.store.flipped()) this.markKnown();
    if (e.key === 'x' && this.store.flipped()) this.store.markUnknown();
  }

  // Public Handlers
  // --------------------------------------------------------------------
  flipCard(): void {
    this.store.flipCard();
    if (this.store.flipped()) this._speakCurrentCard();
  }

  markKnown(): void {
    this.store.markKnown();
    this._speakCurrentCard();
  }

  posLabel(pos: string): string {
    return posLabel(pos);
  }

  speakEntry(entry: VocabEntry): void {
    this.audio.speak(entry);
  }

  // Private
  // --------------------------------------------------------------------
  private _speakCurrentCard(): void {
    const card = this.store.currentCard();
    if (card) this.speakEntry(card);
  }
}

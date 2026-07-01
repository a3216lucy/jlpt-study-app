import { ChangeDetectionStrategy, Component, HostListener, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VocabGroup, VocabEntry, VocabReviewStore } from './vocab-review.store';

const COLOR_MAP: Record<string, { badge: string; card: string; ring: string }> = {
  teal:   { badge: 'bg-teal-100 text-teal-700',   card: 'border-teal-200 bg-teal-50/40',   ring: 'ring-teal-400' },
  violet: { badge: 'bg-violet-100 text-violet-700', card: 'border-violet-200 bg-violet-50/40', ring: 'ring-violet-400' },
  amber:  { badge: 'bg-amber-100 text-amber-700',  card: 'border-amber-200 bg-amber-50/40',  ring: 'ring-amber-400' },
  rose:   { badge: 'bg-rose-100 text-rose-700',    card: 'border-rose-200 bg-rose-50/40',    ring: 'ring-rose-400' },
  sky:    { badge: 'bg-sky-100 text-sky-700',      card: 'border-sky-200 bg-sky-50/40',      ring: 'ring-sky-400' },
};

const JA_VOICE_PRIORITY = [
  'O-Ren', 'Kyoko', 'Otoya',
  'Google 日本語', 'Google Japanese',
  'Microsoft Haruka', 'Microsoft Ayumi',
];

@Component({
  selector: 'app-vocab-review',
  templateUrl: './vocab-review.html',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [VocabReviewStore],
})
export class VocabReviewComponent implements OnInit, OnDestroy {
  readonly store = inject(VocabReviewStore);

  private _jaVoice: SpeechSynthesisVoice | null = null;
  private _voicesChangedHandler = () => this._pickVoice();
  private _currentAudio: HTMLAudioElement | null = null;

  ngOnInit() {
    this.store.init();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this._pickVoice();
      window.speechSynthesis.addEventListener('voiceschanged', this._voicesChangedHandler);
    }
  }

  ngOnDestroy() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.removeEventListener('voiceschanged', this._voicesChangedHandler);
      window.speechSynthesis.cancel();
    }
    this._currentAudio?.pause();
  }

  private _pickVoice() {
    const voices = window.speechSynthesis.getVoices();
    const ja = voices.filter(v => v.lang.startsWith('ja'));
    for (const name of JA_VOICE_PRIORITY) {
      const match = ja.find(v => v.name.includes(name));
      if (match) { this._jaVoice = match; return; }
    }
    this._jaVoice = ja[0] ?? null;
  }

  // ── Keyboard shortcuts ───────────────────────────────────────────────

  @HostListener('window:keydown', ['$event'])
  onKey(e: KeyboardEvent) {
    if (this.store.mode() !== 'flashcard') return;
    if (e.key === 'ArrowRight' || e.key === 'l') this.nextCard();
    if (e.key === 'ArrowLeft'  || e.key === 'h') this.prevCard();
    if (e.key === ' ') { e.preventDefault(); this.flipCard(); }
    if (e.key === 'k' && this.store.flipped()) this.markKnown();
    if (e.key === 'r') this.speakCurrent();
  }

  // ── Flashcard actions ────────────────────────────────────────────────

  startFlashcard(shuffle: boolean) {
    this.store.startFlashcard(shuffle);
    this.speakCurrent();
  }

  flipCard() {
    this.store.flipCard();
    if (!this.store.flipped()) return;
    this.speakCurrent();
  }

  nextCard() {
    this.store.nextCard();
    this.speakCurrent();
  }

  prevCard() {
    this.store.prevCard();
    this.speakCurrent();
  }

  markKnown() {
    this.store.markKnown();
    this.speakCurrent();
  }

  speakCurrent() {
    const card = this.store.currentCard();
    if (card) this.speakEntry(card);
  }

  // Try WAV file first; fall back to browser TTS
  speakEntry(entry: VocabEntry) {
    this._currentAudio?.pause();
    const audio = new Audio(`assets/audio/vocab/${entry.id}.wav`);
    this._currentAudio = audio;
    audio.onerror = () => this._speakTTS(entry.reading);
    audio.play().catch(() => this._speakTTS(entry.reading));
  }

  // Called from template for the 🔊 button (can receive a plain reading string too)
  speak(reading: string) {
    const card = this.store.currentCard();
    // If the reading matches the current card, prefer the audio file
    if (card && card.reading === reading) {
      this.speakEntry(card);
    } else {
      this._speakTTS(reading);
    }
  }

  private _speakTTS(text: string) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    // Clean up text for TTS (strip parenthetical hints)
    const clean = text.replace(/（[^）]*）/g, '').replace(/[a-zA-Z()\s]/g, '').trim() || text;
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(clean);
    utt.lang = 'ja-JP';
    utt.rate = 0.82;
    if (this._jaVoice) utt.voice = this._jaVoice;
    window.speechSynthesis.speak(utt);
  }

  // ── Browse helpers ───────────────────────────────────────────────────

  badgeClass(group: VocabGroup): string {
    return (COLOR_MAP[group.color] ?? COLOR_MAP['sky']).badge;
  }

  cardClass(group: VocabGroup): string {
    return (COLOR_MAP[group.color] ?? COLOR_MAP['sky']).card;
  }
}

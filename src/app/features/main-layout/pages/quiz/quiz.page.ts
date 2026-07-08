// Cores
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  HostListener,
  OnInit,
  inject,
} from '@angular/core';
// Angular
import { CommonModule } from '@angular/common';
// PrimeNG
import { ButtonModule } from 'primeng/button';
import { ProgressBarModule } from 'primeng/progressbar';
// Shared
import { StudyPlanService } from '@shared/services/study-plan.service';
import { VocabSrsService } from '@shared/services/vocab-srs.service';
// Store + Model
import { QuizStore } from './quiz.store';
import type { VocabEntry, VocabGroup, VocabQuizOption } from './quiz.model';

const COLOR_MAP: Record<string, { badge: string; card: string }> = {
  teal:   { badge: 'bg-teal-100 text-teal-700',    card: 'border-teal-200 bg-teal-50/50' },
  violet: { badge: 'bg-violet-100 text-violet-700', card: 'border-violet-200 bg-violet-50/50' },
  amber:  { badge: 'bg-amber-100 text-amber-700',   card: 'border-amber-200 bg-amber-50/50' },
  rose:   { badge: 'bg-rose-100 text-rose-700',     card: 'border-rose-200 bg-rose-50/50' },
  sky:    { badge: 'bg-sky-100 text-sky-700',       card: 'border-sky-200 bg-sky-50/50' },
  indigo: { badge: 'bg-indigo-100 text-indigo-700', card: 'border-indigo-200 bg-indigo-50/50' },
};

const JA_VOICE_PRIORITY = [
  'O-Ren', 'Kyoko', 'Otoya',
  'Google 日本語', 'Google Japanese',
  'Microsoft Haruka', 'Microsoft Ayumi',
];

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.page.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ButtonModule, ProgressBarModule],
  providers: [QuizStore],
})
export class QuizPage implements OnInit {
  // Dependencies
  // --------------------------------------------------------------------
  readonly store = inject(QuizStore);
  readonly Math = Math;

  private readonly destroyRef = inject(DestroyRef);
  private _jaVoice: SpeechSynthesisVoice | null = null;
  private _voicesChangedHandler = () => this._pickVoice();
  private _currentAudio: HTMLAudioElement | null = null;

  // State & Form
  // --------------------------------------------------------------------
  readonly goalOptions = [5, 10, 15, 20];
  readonly levelOptions = ['N3'];  // 擴充時在此加入

  // Lifecycle
  // --------------------------------------------------------------------
  ngOnInit() {
    this.store.init();

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this._pickVoice();
      window.speechSynthesis.addEventListener('voiceschanged', this._voicesChangedHandler);
      this.destroyRef.onDestroy(() => {
        window.speechSynthesis.removeEventListener('voiceschanged', this._voicesChangedHandler);
        window.speechSynthesis.cancel();
        this._currentAudio?.pause();
      });
    }
  }

  // Public Handlers — keyboard
  // --------------------------------------------------------------------
  @HostListener('window:keydown', ['$event'])
  onKey(e: KeyboardEvent) {
    if (this.store.pageMode() !== 'flashcard') return;
    if (e.key === 'ArrowRight' || e.key === 'l') this.nextCard();
    if (e.key === 'ArrowLeft'  || e.key === 'h') this.prevCard();
    if (e.key === ' ') { e.preventDefault(); this.flipCard(); }
    if (e.key === 'k' && this.store.flipped()) this.markKnown();
    if (e.key === 'x' && this.store.flipped()) this.store.markUnknown();
  }

  // Public Handlers — flashcard
  // --------------------------------------------------------------------
  startFlashcard(opts: { wrongOnly?: boolean; todayOnly?: boolean } = {}) {
    this.store.startFlashcard(opts);
    this._speakCurrentCard();
  }

  flipCard() {
    this.store.flipCard();
    if (this.store.flipped()) this._speakCurrentCard();
  }

  nextCard() {
    this.store.nextCard();
    this._speakCurrentCard();
  }

  prevCard() {
    this.store.prevCard();
    this._speakCurrentCard();
  }

  markKnown() {
    this.store.markKnown();
    this._speakCurrentCard();
  }

  // Public Handlers — option styles
  // --------------------------------------------------------------------
  optionCardClass(option: VocabQuizOption): string {
    if (!this.store.quizAnswered()) {
      return 'border-slate-200 bg-white text-slate-700 hover:-translate-y-0.5 hover:border-indigo-400 hover:bg-indigo-50 hover:shadow-[0_12px_24px_rgba(99,102,241,0.12)]';
    }
    if (option.isCorrect) return 'border-green-500 bg-green-50 text-green-800';
    if (option.id === this.store.quizSelectedId()) return 'border-red-400 bg-red-50 text-red-700';
    return 'border-slate-200 bg-white text-slate-400';
  }

  optionPrefixClass(option: VocabQuizOption): string {
    if (!this.store.quizAnswered()) return 'bg-slate-100 text-slate-600';
    if (option.isCorrect) return 'bg-green-100 text-green-800';
    if (option.id === this.store.quizSelectedId()) return 'bg-red-100 text-red-700';
    return 'bg-slate-100 text-slate-400';
  }

  badgeClass(group: VocabGroup): string {
    return (COLOR_MAP[group.color] ?? COLOR_MAP['sky']).badge;
  }

  cardClass(group: VocabGroup): string {
    return (COLOR_MAP[group.color] ?? COLOR_MAP['sky']).card;
  }

  // Public Handlers — audio
  // --------------------------------------------------------------------
  speakEntry(entry: VocabEntry) {
    this._currentAudio?.pause();
    const audio = new Audio(`assets/audio/vocab/${entry.id}.wav`);
    this._currentAudio = audio;
    audio.onerror = () => this._speakTTS(entry.reading);
    audio.play().catch(() => this._speakTTS(entry.reading));
  }

  // Private
  // --------------------------------------------------------------------
  private _speakCurrentCard() {
    const card = this.store.currentCard();
    if (card) this.speakEntry(card);
  }

  private _pickVoice() {
    const voices = window.speechSynthesis.getVoices();
    const ja = voices.filter((v) => v.lang.startsWith('ja'));
    for (const name of JA_VOICE_PRIORITY) {
      const match = ja.find((v) => v.name.includes(name));
      if (match) { this._jaVoice = match; return; }
    }
    this._jaVoice = ja[0] ?? null;
  }

  private _speakTTS(text: string) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    const clean = text.replace(/（[^）]*）/g, '').replace(/[a-zA-Z()\s]/g, '').trim() || text;
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(clean);
    utt.lang = 'ja-JP';
    utt.rate = 0.82;
    if (this._jaVoice) utt.voice = this._jaVoice;
    window.speechSynthesis.speak(utt);
  }
}

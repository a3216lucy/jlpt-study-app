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
import { ActivatedRoute } from '@angular/router';
// Store + Model
import { QuizStore } from './quiz.store';
import { POS_DISPLAY_LABEL, VOCAB_FILTER_CATEGORIES } from './quiz.model';
import type { VocabEntry, VocabQuizOption, VocabQuizResult } from './quiz.model';

const JA_VOICE_PRIORITY = [
  'O-Ren', 'Kyoko', 'Otoya',
  'Google 日本語', 'Google Japanese',
  'Microsoft Haruka', 'Microsoft Ayumi',
];

const STAGE_STYLE = {
  new: { label: '未開始', bg: 'bg-[#F1EAE0]', text: 'text-text-secondary' },
  learning: { label: '複習中', bg: 'bg-[#FFF3D6]', text: 'text-[#B08514]' },
  learned: { label: '已掌握', bg: 'bg-matcha-soft', text: 'text-matcha' },
} as const;

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.page.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  providers: [QuizStore],
})
export class QuizPage implements OnInit {
  // Dependencies
  // --------------------------------------------------------------------
  readonly store = inject(QuizStore);
  readonly Math = Math;

  private readonly destroyRef = inject(DestroyRef);
  private readonly route = inject(ActivatedRoute);
  private _jaVoice: SpeechSynthesisVoice | null = null;
  private _voicesChangedHandler = () => this._pickVoice();
  private _currentAudio: HTMLAudioElement | null = null;

  // State & Form
  // --------------------------------------------------------------------
  readonly goalOptions = [5, 10, 15, 20];
  readonly levelOptions = ['N3'];  // 擴充時在此加入
  readonly filterCategories = VOCAB_FILTER_CATEGORIES;

  // Lifecycle
  // --------------------------------------------------------------------
  ngOnInit() {
    this.store.init().then(() => {
      if (this.route.snapshot.queryParamMap.get('start') === 'today' && this.store.hasActivePlan()) {
        this.startFlashcard({ todayOnly: true });
      }
    });

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
    if (e.key === ' ') { e.preventDefault(); this.flipCard(); }
    if (e.key === 'k' && this.store.flipped()) this.markKnown();
    if (e.key === 'x' && this.store.flipped()) this.store.markUnknown();
  }

  // Public Handlers — flashcard
  // --------------------------------------------------------------------
  startFlashcard(opts: { wrongOnly?: boolean; markedOnly?: boolean; todayOnly?: boolean } = {}) {
    this.store.startFlashcard(opts);
    this._speakCurrentCard();
  }

  flipCard() {
    this.store.flipCard();
    if (this.store.flipped()) this._speakCurrentCard();
  }

  markKnown() {
    this.store.markKnown();
    this._speakCurrentCard();
  }

  // Public Handlers — display helpers
  // --------------------------------------------------------------------
  posLabel(pos: string): string {
    return POS_DISPLAY_LABEL[pos] ?? pos;
  }

  stageInfo(entry: VocabEntry) {
    const rec = this.store.srsRecords().get(entry.id);
    if (!rec) return STAGE_STYLE.new;
    return rec.stage === 'learned' ? STAGE_STYLE.learned : STAGE_STYLE.learning;
  }

  optionLetter(index: number): string {
    return String.fromCharCode(65 + index);
  }

  selectedOptionText(result: VocabQuizResult): string {
    const question = this.store.quizQuestions().find((q) => q.id === result.questionId);
    return question?.options.find((o) => o.id === result.selectedOptionId)?.text ?? '—';
  }

  markedQuestionsInQuiz() {
    return this.store.quizQuestions().filter((q) => this.store.isWordMarked(q.entry.id));
  }

  // Public Handlers — option styles
  // --------------------------------------------------------------------
  optionCardClass(option: VocabQuizOption): string {
    if (!this.store.quizAnswered()) {
      return 'border-border bg-surface text-ink hover:-translate-y-0.5 hover:border-accent hover:bg-accent-soft/40';
    }
    if (option.isCorrect) return 'border-accent bg-accent-soft text-ink';
    if (option.id === this.store.quizSelectedId()) {
      return 'border-border bg-bg text-text-muted line-through opacity-70';
    }
    return 'border-border bg-surface text-text-muted opacity-60';
  }

  optionBadgeClass(option: VocabQuizOption): string {
    if (this.store.quizAnswered() && option.isCorrect) return 'bg-accent text-white';
    return 'bg-bg text-text-secondary';
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

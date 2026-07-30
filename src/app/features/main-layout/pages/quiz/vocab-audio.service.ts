// Cores
import { DestroyRef, Injectable, inject } from '@angular/core';
// Models
import type { VocabEntry } from './quiz.model';

const JA_VOICE_PRIORITY = [
  'O-Ren', 'Kyoko', 'Otoya',
  'Google 日本語', 'Google Japanese',
  'Microsoft Haruka', 'Microsoft Ayumi',
];

/** 單字發音（優先播放預錄音檔，失敗則 fallback 到瀏覽器 TTS），page-scoped，隨頁面銷毀自動清理 */
@Injectable()
export class VocabAudioService {
  // Dependencies
  // --------------------------------------------------------------------
  private readonly destroyRef = inject(DestroyRef);

  // State
  // --------------------------------------------------------------------
  private _jaVoice: SpeechSynthesisVoice | null = null;
  private _voicesChangedHandler = () => this._pickVoice();
  private _currentAudio: HTMLAudioElement | null = null;

  constructor() {
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

  // Public Handlers
  // --------------------------------------------------------------------
  speak(entry: VocabEntry): void {
    this._currentAudio?.pause();
    const audio = new Audio(`assets/audio/vocab/${entry.id}.wav`);
    this._currentAudio = audio;
    audio.onerror = () => this._speakTTS(entry.reading);
    audio.play().catch(() => this._speakTTS(entry.reading));
  }

  // Private
  // --------------------------------------------------------------------
  private _pickVoice(): void {
    const voices = window.speechSynthesis.getVoices();
    const ja = voices.filter((v) => v.lang.startsWith('ja'));
    for (const name of JA_VOICE_PRIORITY) {
      const match = ja.find((v) => v.name.includes(name));
      if (match) {
        this._jaVoice = match;
        return;
      }
    }
    this._jaVoice = ja[0] ?? null;
  }

  private _speakTTS(text: string): void {
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

// Cores
import { Injectable, inject, signal } from '@angular/core';
// Angular Fire
import { Auth } from '@angular/fire/auth';
// Services
import { AuthService } from '@core/services/auth.service';
import { ProfileService } from './profile.service';
// Models
import type { ExamHistoryEntry, StudyPlanStats, VocabStats } from './profile.model';

@Injectable()
export class ProfileStore {
  // Dependencies
  // --------------------------------------------------------------------
  private readonly auth = inject(Auth);
  private readonly authService = inject(AuthService);
  private readonly profileService = inject(ProfileService);

  // Signals
  // --------------------------------------------------------------------
  readonly loading = signal(true);
  readonly examHistory = signal<ExamHistoryEntry[]>([]);
  readonly vocabStats = signal<VocabStats>({ totalSessions: 0, knownWords: 0 });
  readonly studyPlanStats = signal<StudyPlanStats[]>([]);
  readonly currentUser = this.authService.currentUser;

  // profilePage
  // --------------------------------------------------------------------
  async init(): Promise<void> {
    const uid = this.auth.currentUser?.uid;
    if (!uid) {
      this.loading.set(false);
      return;
    }

    try {
      const [examHistory, vocabStats, studyPlanStats] = await Promise.all([
        this.profileService.getExamHistory(uid),
        this.profileService.getVocabStats(uid),
        this.profileService.getStudyPlanStats(uid),
      ]);
      this.examHistory.set(examHistory);
      this.vocabStats.set(vocabStats);
      this.studyPlanStats.set(studyPlanStats);
    } catch (e) {
      console.error('profile load failed', e);
    } finally {
      this.loading.set(false);
    }
  }

  async logout(): Promise<void> {
    await this.authService.logout();
  }
}

// Cores
import { Injectable, computed, inject, signal } from '@angular/core';
// Angular Fire
import { Auth } from '@angular/fire/auth';
// Services
import { AuthService } from '@core/services/auth.service';
import { UserSettingsService } from '@shared/services/user-settings.service';
import { DEFAULT_TARGET_LEVEL, daysUntil, NEXT_JLPT_EXAM_DATE } from '@shared/config/jlpt-schedule';
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
  private readonly userSettingsService = inject(UserSettingsService);

  // Signals
  // --------------------------------------------------------------------
  readonly loading = signal(true);
  readonly examHistory = signal<ExamHistoryEntry[]>([]);
  readonly vocabStats = signal<VocabStats>({ totalSessions: 0, knownWords: 0 });
  readonly studyPlanStats = signal<StudyPlanStats[]>([]);
  readonly currentUser = this.authService.currentUser;

  // Signals — 應試目標
  // --------------------------------------------------------------------
  readonly targetLevel = signal(DEFAULT_TARGET_LEVEL);
  readonly examDate = signal(NEXT_JLPT_EXAM_DATE);
  readonly editingGoal = signal(false);
  readonly draftLevel = signal(DEFAULT_TARGET_LEVEL);
  readonly draftExamDate = signal(NEXT_JLPT_EXAM_DATE);
  readonly savingGoal = signal(false);

  readonly daysUntilGoalExam = computed(() => daysUntil(this.examDate()));

  // profilePage
  // --------------------------------------------------------------------
  async init(): Promise<void> {
    const uid = this.auth.currentUser?.uid;
    if (!uid) {
      this.loading.set(false);
      return;
    }

    try {
      const [examHistory, vocabStats, studyPlanStats, settings] = await Promise.all([
        this.profileService.getExamHistory(uid),
        this.profileService.getVocabStats(uid),
        this.profileService.getStudyPlanStats(uid),
        this.userSettingsService.get(uid),
      ]);
      this.examHistory.set(examHistory);
      this.vocabStats.set(vocabStats);
      this.studyPlanStats.set(studyPlanStats);
      if (settings) {
        this.targetLevel.set(settings.targetLevel);
        this.examDate.set(settings.examDate);
      }
    } catch (e) {
      console.error('profile load failed', e);
    } finally {
      this.loading.set(false);
    }
  }

  async logout(): Promise<void> {
    await this.authService.logout();
  }

  // 應試目標
  // --------------------------------------------------------------------
  startEditGoal(): void {
    this.draftLevel.set(this.targetLevel());
    this.draftExamDate.set(this.examDate());
    this.editingGoal.set(true);
  }

  cancelEditGoal(): void {
    this.editingGoal.set(false);
  }

  async saveGoal(): Promise<void> {
    const uid = this.auth.currentUser?.uid;
    if (!uid) return;

    this.savingGoal.set(true);
    try {
      const settings = { targetLevel: this.draftLevel(), examDate: this.draftExamDate() };
      await this.userSettingsService.set(uid, settings);
      this.targetLevel.set(settings.targetLevel);
      this.examDate.set(settings.examDate);
      this.editingGoal.set(false);
    } catch (e) {
      console.error('save goal failed', e);
    } finally {
      this.savingGoal.set(false);
    }
  }
}

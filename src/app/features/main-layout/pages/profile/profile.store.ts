// Cores
import { computed, inject } from '@angular/core';
// NgRx Signals
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
// Angular Fire
import { Auth } from '@angular/fire/auth';
// Services
import { AuthService } from '@core/services/auth.service';
import { UserSettingsService } from '@core/services/user-settings.service';
import { DEFAULT_TARGET_LEVEL, daysUntil, NEXT_JLPT_EXAM_DATE } from '@core/config/jlpt-schedule';
import { ProfileService } from './profile.service';
// Models
import type { ExamHistoryEntry, StudyPlanStats, VocabStats } from './profile.model';

interface ProfileState {
  loading: boolean;
  examHistory: ExamHistoryEntry[];
  vocabStats: VocabStats;
  studyPlanStats: StudyPlanStats[];
  // 應試目標
  targetLevel: string;
  examDate: string;
  editingGoal: boolean;
  draftLevel: string;
  draftExamDate: string;
  savingGoal: boolean;
}

const initialState: ProfileState = {
  loading: true,
  examHistory: [],
  vocabStats: { totalSessions: 0, knownWords: 0 },
  studyPlanStats: [],
  targetLevel: DEFAULT_TARGET_LEVEL,
  examDate: NEXT_JLPT_EXAM_DATE,
  editingGoal: false,
  draftLevel: DEFAULT_TARGET_LEVEL,
  draftExamDate: NEXT_JLPT_EXAM_DATE,
  savingGoal: false,
};

export const ProfileStore = signalStore(
  withState(initialState),
  withComputed((store, authService = inject(AuthService)) => ({
    currentUser: authService.currentUser,
    daysUntilGoalExam: computed(() => daysUntil(store.examDate())),
  })),
  withMethods(
    (
      store,
      auth = inject(Auth),
      authService = inject(AuthService),
      profileService = inject(ProfileService),
      userSettingsService = inject(UserSettingsService),
    ) => ({
      // profilePage
      // --------------------------------------------------------------------
      async init(): Promise<void> {
        const uid = auth.currentUser?.uid;
        if (!uid) {
          patchState(store, { loading: false });
          return;
        }

        try {
          const [examHistory, vocabStats, studyPlanStats, settings] = await Promise.all([
            profileService.getExamHistory(uid),
            profileService.getVocabStats(uid),
            profileService.getStudyPlanStats(uid),
            userSettingsService.get(uid),
          ]);
          patchState(store, { examHistory, vocabStats, studyPlanStats });
          if (settings) {
            patchState(store, { targetLevel: settings.targetLevel, examDate: settings.examDate });
          }
        } catch (e) {
          console.error('profile load failed', e);
        } finally {
          patchState(store, { loading: false });
        }
      },

      async logout(): Promise<void> {
        await authService.logout();
      },

      // 應試目標
      // --------------------------------------------------------------------
      startEditGoal(): void {
        patchState(store, {
          draftLevel: store.targetLevel(),
          draftExamDate: store.examDate(),
          editingGoal: true,
        });
      },

      cancelEditGoal(): void {
        patchState(store, { editingGoal: false });
      },

      setDraftLevel(level: string): void {
        patchState(store, { draftLevel: level });
      },

      setDraftExamDate(date: string): void {
        patchState(store, { draftExamDate: date });
      },

      async saveGoal(): Promise<void> {
        const uid = auth.currentUser?.uid;
        if (!uid) return;

        patchState(store, { savingGoal: true });
        try {
          const settings = { targetLevel: store.draftLevel(), examDate: store.draftExamDate() };
          await userSettingsService.set(uid, settings);
          patchState(store, {
            targetLevel: settings.targetLevel,
            examDate: settings.examDate,
            editingGoal: false,
          });
        } catch (e) {
          console.error('save goal failed', e);
        } finally {
          patchState(store, { savingGoal: false });
        }
      },
    }),
  ),
);

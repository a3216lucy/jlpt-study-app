// Cores
import { computed, inject } from '@angular/core';
// NgRx Signals
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
// Angular Fire
import { Auth } from '@angular/fire/auth';
// Shared
import { AuthService } from '@core/services/auth.service';
import { ExamHistoryService } from '@core/services/exam-history.service';
import { StudyPlanStatsService } from '@core/services/study-plan-stats.service';
import { UserSettingsService } from '@core/services/user-settings.service';
import { DEFAULT_TARGET_LEVEL, daysUntil, NEXT_JLPT_EXAM_DATE } from '@core/config/jlpt-schedule';
import type { StudyPlanStats } from '@core/models/study-plan.model';
import type { ExamHistoryEntry } from '@core/models/exam-history.model';
import type { UserSettings } from '@core/models/user-settings.model';
// Models
import type { QuickEntry, TodayTask } from './home.model';

/** 首頁「快速入口」卡片，靜態設定、不隨狀態變化，不放進 store state */
export const QUICK_ENTRIES: QuickEntry[] = [
  {
    id: 'wrong-review',
    icon: 'fa-rotate-left',
    iconColor: 'text-accent',
    iconBg: 'bg-accent-soft',
    label: '錯題複習',
    routerLink: null,
    comingSoon: true,
  },
  {
    id: 'flashcard',
    icon: 'fa-layer-group',
    iconColor: 'text-[#4E8A76]',
    iconBg: 'bg-matcha-soft',
    label: '卡牌背誦',
    routerLink: '/vocab',
    comingSoon: false,
  },
  {
    id: 'grammar-points',
    icon: 'fa-book-open',
    iconColor: 'text-[#B08514]',
    iconBg: 'bg-[#FFF3D6]',
    label: '文法重點',
    routerLink: '/grammar-review',
    comingSoon: false,
  },
];

interface HomeState {
  loading: boolean;
  allStats: StudyPlanStats[];
  recentScores: ExamHistoryEntry[];
  userSettings: UserSettings | null;
}

const initialState: HomeState = {
  loading: true,
  allStats: [],
  recentScores: [],
  userSettings: null,
};

export const HomeStore = signalStore(
  withState(initialState),
  withComputed((store, authService = inject(AuthService)) => {
    const currentUser = authService.currentUser;
    const greetingName = computed(() => currentUser()?.displayName?.split(' ')[0] ?? '同學');
    const targetLevel = computed(() => store.userSettings()?.targetLevel ?? DEFAULT_TARGET_LEVEL);
    const examDate = computed(() => store.userSettings()?.examDate ?? NEXT_JLPT_EXAM_DATE);
    const examDateLabel = computed(() => {
      const [, month, day] = examDate().split('-');
      return `${Number(month)}/${Number(day)}`;
    });
    const daysUntilExam = computed(() => daysUntil(examDate()));

    const activeStats = computed<StudyPlanStats | null>(() => {
      const stats = store.allStats();
      return stats.find((s) => s.plan.status === 'active') ?? stats[0] ?? null;
    });

    const hasActivePlan = computed(() => activeStats() !== null);
    const planLevel = computed(() => activeStats()?.plan.level ?? 'N3');
    const totalWords = computed(() => activeStats()?.plan.totalWords ?? 0);
    const learnedCount = computed(() => activeStats()?.learnedCount ?? 0);
    const learningCount = computed(() => activeStats()?.learningCount ?? 0);
    const newCount = computed(() => activeStats()?.newCount ?? 0);
    const dueToday = computed(() => activeStats()?.dueToday ?? 0);
    const newToday = computed(() => activeStats()?.newToday ?? 0);
    const progressedCount = computed(() => learnedCount() + learningCount());

    const todayTasks = computed<TodayTask[]>(() => [
      {
        id: 'new-words',
        icon: 'fa-book-open',
        iconColor: 'text-matcha',
        label: `背誦新單字 ${newToday()} 個`,
        chipLabel: '單詞計畫',
        chipColor: 'matcha',
        routerLink: '/vocab',
        done: hasActivePlan() && newToday() === 0,
      },
      {
        id: 'due-review',
        icon: 'fa-rotate-left',
        iconColor: 'text-accent',
        label: `複習到期單字 ${dueToday()} 個`,
        chipLabel: '今日待複習',
        chipColor: 'accent',
        routerLink: '/vocab',
        done: hasActivePlan() && dueToday() === 0,
      },
      {
        id: 'grammar-quiz',
        icon: 'fa-pen',
        iconColor: 'text-[#B08514]',
        label: `${planLevel()} 文法測驗一回`,
        chipLabel: '句型測驗',
        chipColor: 'amber',
        routerLink: '/large-quiz',
        done: false,
      },
    ]);

    const completedTaskCount = computed(() => todayTasks().filter((t) => t.done).length);

    return {
      currentUser,
      greetingName,
      targetLevel,
      examDate,
      examDateLabel,
      daysUntilExam,
      activeStats,
      hasActivePlan,
      planLevel,
      totalWords,
      learnedCount,
      learningCount,
      newCount,
      dueToday,
      newToday,
      progressedCount,
      todayTasks,
      completedTaskCount,
    };
  }),
  withMethods(
    (
      store,
      auth = inject(Auth),
      examHistoryService = inject(ExamHistoryService),
      studyPlanStatsService = inject(StudyPlanStatsService),
      userSettingsService = inject(UserSettingsService),
    ) => ({
      async init(): Promise<void> {
        const uid = auth.currentUser?.uid;
        if (!uid) {
          patchState(store, { loading: false });
          return;
        }

        patchState(store, { loading: true });
        try {
          const [stats, scores, settings] = await Promise.all([
            studyPlanStatsService.getStats(uid),
            examHistoryService.getRecent(uid, 3),
            userSettingsService.get(uid),
          ]);
          patchState(store, { allStats: stats, recentScores: scores, userSettings: settings });
        } catch (e) {
          console.error('home load failed', e);
        } finally {
          patchState(store, { loading: false });
        }
      },
    }),
  ),
);

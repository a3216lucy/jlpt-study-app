// Cores
import { Injectable, computed, inject, signal } from '@angular/core';
// Angular Fire
import { Auth } from '@angular/fire/auth';
// Shared
import { AuthService } from '@core/services/auth.service';
import { ExamHistoryService } from '@shared/services/exam-history.service';
import { StudyPlanStatsService } from '@shared/services/study-plan-stats.service';
import { daysUntilNextExam, NEXT_JLPT_EXAM_DATE } from '@shared/config/jlpt-schedule';
import type { StudyPlanStats } from '@shared/models/study-plan.model';
import type { ExamHistoryEntry } from '@shared/models/exam-history.model';
// Models
import type { QuickEntry, TodayTask } from './home.model';

@Injectable()
export class HomeStore {
  // Dependencies
  // --------------------------------------------------------------------
  private readonly auth = inject(Auth);
  private readonly authService = inject(AuthService);
  private readonly examHistoryService = inject(ExamHistoryService);
  private readonly studyPlanStatsService = inject(StudyPlanStatsService);

  // Signals
  // --------------------------------------------------------------------
  readonly loading = signal(true);
  readonly currentUser = this.authService.currentUser;
  readonly allStats = signal<StudyPlanStats[]>([]);
  readonly recentScores = signal<ExamHistoryEntry[]>([]);

  // Computed — greeting / countdown
  // --------------------------------------------------------------------
  readonly greetingName = computed(() => this.currentUser()?.displayName?.split(' ')[0] ?? '同學');
  readonly examDateLabel = computed(() => {
    const [, month, day] = NEXT_JLPT_EXAM_DATE.split('-');
    return `${Number(month)}/${Number(day)}`;
  });
  readonly daysUntilExam = computed(() => daysUntilNextExam());

  // Computed — active plan stats
  // --------------------------------------------------------------------
  readonly activeStats = computed<StudyPlanStats | null>(() => {
    const stats = this.allStats();
    return stats.find((s) => s.plan.status === 'active') ?? stats[0] ?? null;
  });

  readonly hasActivePlan = computed(() => this.activeStats() !== null);
  readonly planLevel = computed(() => this.activeStats()?.plan.level ?? 'N3');
  readonly totalWords = computed(() => this.activeStats()?.plan.totalWords ?? 0);
  readonly learnedCount = computed(() => this.activeStats()?.learnedCount ?? 0);
  readonly learningCount = computed(() => this.activeStats()?.learningCount ?? 0);
  readonly newCount = computed(() => this.activeStats()?.newCount ?? 0);
  readonly dueToday = computed(() => this.activeStats()?.dueToday ?? 0);
  readonly newToday = computed(() => this.activeStats()?.newToday ?? 0);
  readonly progressedCount = computed(() => this.learnedCount() + this.learningCount());

  // Computed — 今日學習計畫
  // --------------------------------------------------------------------
  readonly todayTasks = computed<TodayTask[]>(() => [
    {
      id: 'new-words',
      icon: 'fa-book-open',
      iconColor: 'text-matcha',
      label: `背誦新單字 ${this.newToday()} 個`,
      chipLabel: '單詞計畫',
      chipColor: 'matcha',
      routerLink: '/vocab',
      done: this.hasActivePlan() && this.newToday() === 0,
    },
    {
      id: 'due-review',
      icon: 'fa-rotate-left',
      iconColor: 'text-accent',
      label: `複習到期單字 ${this.dueToday()} 個`,
      chipLabel: '今日待複習',
      chipColor: 'accent',
      routerLink: '/vocab',
      done: this.hasActivePlan() && this.dueToday() === 0,
    },
    {
      id: 'grammar-quiz',
      icon: 'fa-pen',
      iconColor: 'text-[#B08514]',
      label: `${this.planLevel()} 文法測驗一回`,
      chipLabel: '句型測驗',
      chipColor: 'amber',
      routerLink: '/large-quiz',
      done: false,
    },
  ]);

  readonly completedTaskCount = computed(() => this.todayTasks().filter((t) => t.done).length);

  // Computed — 快速入口
  // --------------------------------------------------------------------
  readonly quickEntries: QuickEntry[] = [
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

  // Lifecycle
  // --------------------------------------------------------------------
  async init(): Promise<void> {
    const uid = this.auth.currentUser?.uid;
    if (!uid) {
      this.loading.set(false);
      return;
    }

    this.loading.set(true);
    try {
      const [stats, scores] = await Promise.all([
        this.studyPlanStatsService.getStats(uid),
        this.examHistoryService.getRecent(uid, 3),
      ]);
      this.allStats.set(stats);
      this.recentScores.set(scores);
    } catch (e) {
      console.error('home load failed', e);
    } finally {
      this.loading.set(false);
    }
  }
}

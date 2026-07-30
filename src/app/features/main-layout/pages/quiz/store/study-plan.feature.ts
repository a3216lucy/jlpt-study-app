// Cores
import { Signal, computed, inject } from '@angular/core';
// NgRx Signals
import { patchState, signalStoreFeature, type, withComputed, withMethods, withState } from '@ngrx/signals';
// Angular Fire
import { Auth } from '@angular/fire/auth';
// Shared
import { StudyPlanService } from '@core/services/study-plan.service';
import { VocabSrsService } from '@core/services/vocab-srs.service';
// Models
import type { StudyPlan, VocabSRSRecord } from '@core/models/study-plan.model';
import { vocabEntryLevel } from '../quiz.model';
import type { VocabEntry } from '../quiz.model';

function todayStr(): string {
  return new Date().toISOString().slice(0, 10);
}

interface StudyPlanState {
  plans: StudyPlan[];
  activePlanId: string | null;
  srsRecords: Map<string, VocabSRSRecord>;
  showCreatePlan: boolean;
  createPlanLevel: string;
  createPlanDaily: number;
  createPlanLoading: boolean;
  createPlanError: string | null;
}

const initialState: StudyPlanState = {
  plans: [],
  activePlanId: null,
  srsRecords: new Map(),
  showCreatePlan: false,
  createPlanLevel: 'N3',
  createPlanDaily: 10,
  createPlanLoading: false,
  createPlanError: null,
};

/** 單詞頁：學習計畫 CRUD + SRS 複習排程（依賴 vocab-data 切片的 allEntries） */
export function studyPlanFeature() {
  return signalStoreFeature(
    type<{
      state: { quizNewlyMasteredCount: number };
      props: { allEntries: Signal<VocabEntry[]> };
      methods: {};
    }>(),
    withState(initialState),
    withComputed((store) => ({
      activePlan: computed<StudyPlan | null>(
        () => store.plans().find((p) => p.id === store.activePlanId()) ?? store.plans()[0] ?? null,
      ),
      learnedRecordsCount: computed(
        () => [...store.srsRecords().values()].filter((r) => r.stage === 'learned').length,
      ),
      learningRecordsCount: computed(
        () => [...store.srsRecords().values()].filter((r) => r.stage !== 'learned').length,
      ),
    })),
    withComputed((store) => ({
      /** 目前計畫級別的單字（計畫只排同級別的字，N3 計畫不會混進 N2 考古題單字） */
      planEntries: computed<VocabEntry[]>(() => {
        const plan = store.activePlan();
        if (!plan) return [];
        return store.allEntries().filter((e) => vocabEntryLevel(e) === plan.level);
      }),
    })),
    withComputed((store) => ({
      hasActivePlan: computed(() => store.activePlan() !== null),
      dueEntries: computed<VocabEntry[]>(() => {
        const records = store.srsRecords();
        const today = todayStr();
        return store.planEntries().filter((e) => {
          const rec = records.get(e.id);
          return rec && rec.dueDate <= today;
        });
      }),
      newEntries: computed<VocabEntry[]>(() => {
        const records = store.srsRecords();
        const plan = store.activePlan();
        if (!plan) return [];
        const unseen = store.planEntries().filter((e) => !records.has(e.id));

        const today = todayStr();
        const newToday = [...records.values()].filter((r) => r.lastReviewed === today && r.reps === 1).length;

        const remaining = Math.max(plan.dailyNewWords - newToday, 0);
        return unseen.slice(0, remaining);
      }),
    })),
    withComputed((store) => ({
      todayQueue: computed<VocabEntry[]>(() => {
        const due = store.dueEntries();
        const fresh = store.newEntries();
        const seen = new Set(due.map((e) => e.id));
        return [...due, ...fresh.filter((e) => !seen.has(e.id))];
      }),
    })),
    withComputed((store) => ({
      todayStats: computed(() => ({
        due: store.dueEntries().length,
        newWords: store.newEntries().length,
        total: store.todayQueue().length,
      })),
    })),
    withMethods(
      (
        store,
        auth = inject(Auth),
        planService = inject(StudyPlanService),
        srsService = inject(VocabSrsService),
      ) => {
        const reloadRecords = async (): Promise<void> => {
          const uid = auth.currentUser?.uid;
          const planId = store.activePlanId();
          if (!uid || !planId) return;
          const records = await srsService.getRecords(uid, planId);
          patchState(store, { srsRecords: records });
        };

        return {
          // Plan creation form
          // --------------------------------------------------------------------
          setShowCreatePlan(show: boolean): void {
            patchState(store, { showCreatePlan: show });
          },

          selectCreatePlanLevel(level: string): void {
            patchState(store, { createPlanLevel: level });
          },

          setCreatePlanDaily(n: number): void {
            patchState(store, { createPlanDaily: n });
          },

          // Plan management
          // --------------------------------------------------------------------
          selectPlan(planId: string): void {
            patchState(store, { activePlanId: planId });
            reloadRecords();
          },

          async createPlan(): Promise<void> {
            const uid = auth.currentUser?.uid;
            if (!uid) {
              patchState(store, { createPlanError: '尚未登入，請重新整理後再試。' });
              return;
            }
            const totalWords = store.allEntries().length;
            if (totalWords === 0) {
              patchState(store, { createPlanError: '詞庫尚未載入，請稍後再試。' });
              return;
            }

            patchState(store, { createPlanLoading: true, createPlanError: null });
            try {
              const plan = await planService.createPlan(uid, {
                level: store.createPlanLevel(),
                dailyNewWords: store.createPlanDaily(),
                totalWords,
              });
              patchState(store, {
                plans: [...store.plans(), plan],
                activePlanId: plan.id,
                showCreatePlan: false,
              });
              await reloadRecords();
            } catch (e) {
              console.error('createPlan failed', e);
              patchState(store, { createPlanError: '建立失敗，請確認網路連線後再試。' });
            } finally {
              patchState(store, { createPlanLoading: false });
            }
          },

          async pausePlan(): Promise<void> {
            const uid = auth.currentUser?.uid;
            const plan = store.activePlan();
            if (!uid || !plan) return;
            await planService.setPlanStatus(uid, plan.id, 'paused');
            patchState(store, {
              plans: store.plans().map((p) => (p.id === plan.id ? { ...p, status: 'paused' as const } : p)),
            });
          },

          // SRS（flashcard/quiz-session 切片會呼叫這個）
          // --------------------------------------------------------------------
          updateSRS(wordId: string, known: boolean): void {
            const uid = auth.currentUser?.uid;
            const plan = store.activePlan();
            if (!uid || !plan) return;

            const existing = store.srsRecords().get(wordId) ?? null;
            srsService
              .updateRecord(uid, wordId, plan.id, plan.level, known, existing)
              .then((updated) => {
                patchState(store, { srsRecords: new Map(store.srsRecords()).set(wordId, updated) });
                if (updated.stage === 'learned' && existing?.stage !== 'learned') {
                  patchState(store, { quizNewlyMasteredCount: store.quizNewlyMasteredCount() + 1 });
                }
              })
              .catch(console.error);
          },

          // Lifecycle（由 quiz.store.ts 的 init() 呼叫）
          // --------------------------------------------------------------------
          async loadPlansAndRecords(): Promise<void> {
            const uid = auth.currentUser?.uid;
            if (!uid) return;
            const plans = await planService.getPlans(uid);
            patchState(store, { plans });
            if (plans.length > 0) {
              const first = plans.find((p) => p.status === 'active') ?? plans[0];
              patchState(store, { activePlanId: first.id });
              await reloadRecords();
            }
          },
        };
      },
    ),
  );
}

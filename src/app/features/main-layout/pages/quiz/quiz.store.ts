// Cores
import { Injectable, computed, inject, signal } from '@angular/core';
// Angular
import { HttpClient } from '@angular/common/http';
// Shared
import { Auth } from '@angular/fire/auth';
import { StudyPlanService } from '@shared/services/study-plan.service';
import { VocabSrsService } from '@shared/services/vocab-srs.service';
// Models
import type { StudyPlan, VocabSRSRecord } from '@shared/models/study-plan.model';
import type {
  PageMode,
  VocabEntry,
  VocabGroup,
  VocabQuizOption,
  VocabQuizQuestion,
  VocabQuizResult,
  VocabReviewData,
} from './quiz.model';

const WRONG_WORDS_KEY = 'jlpt-app:wrong-words';

function todayStr(): string {
  return new Date().toISOString().slice(0, 10);
}

@Injectable()
export class QuizStore {
  // Dependencies
  // --------------------------------------------------------------------
  private readonly http = inject(HttpClient);
  private readonly auth = inject(Auth);
  private readonly planService = inject(StudyPlanService);
  private readonly srsService = inject(VocabSrsService);

  // Data
  // --------------------------------------------------------------------
  readonly data = signal<VocabReviewData | null>(null);
  readonly loading = signal(false);

  // Study plans + SRS
  // --------------------------------------------------------------------
  readonly plans = signal<StudyPlan[]>([]);
  readonly activePlanId = signal<string | null>(null);
  readonly srsRecords = signal<Map<string, VocabSRSRecord>>(new Map());

  // Page mode
  // --------------------------------------------------------------------
  readonly pageMode = signal<PageMode>('list');

  // List filters
  // --------------------------------------------------------------------
  readonly selectedGroupId = signal<string | null>(null);
  readonly expandedIds = signal<Set<string>>(new Set());

  // Flashcard
  // --------------------------------------------------------------------
  private readonly _flashcardQueue = signal<VocabEntry[]>([]);
  readonly flashcardIndex = signal(0);
  readonly flipped = signal(false);
  readonly knownIds = signal<Set<string>>(new Set());
  readonly unknownIds = signal<Set<string>>(new Set());

  // Quiz (4-choice)
  // --------------------------------------------------------------------
  readonly quizQuestions = signal<VocabQuizQuestion[]>([]);
  readonly quizIndex = signal(0);
  readonly quizSelectedId = signal<string | null>(null);
  readonly quizAnswered = signal(false);
  readonly quizResults = signal<VocabQuizResult[]>([]);

  // Plan creation form
  // --------------------------------------------------------------------
  readonly showCreatePlan = signal(false);
  readonly createPlanLevel = signal('N3');
  readonly createPlanDaily = signal(10);
  readonly createPlanLoading = signal(false);
  readonly createPlanError = signal<string | null>(null);

  // Wrong words (localStorage fallback when no plan)
  // --------------------------------------------------------------------
  readonly wrongWordIds = signal<Set<string>>(new Set());

  // Computed — base data
  // --------------------------------------------------------------------
  readonly groups = computed(() => this.data()?.groups ?? []);
  readonly allEntries = computed(() => this.groups().flatMap((g) => g.entries));

  readonly filteredGroups = computed<VocabGroup[]>(() => {
    const groupId = this.selectedGroupId();
    return this.groups().filter((g) => !groupId || g.id === groupId);
  });

  readonly filteredEntries = computed(() => this.filteredGroups().flatMap((g) => g.entries));
  readonly totalVisible = computed(() => this.filteredEntries().length);

  // Computed — active plan
  // --------------------------------------------------------------------
  readonly activePlan = computed<StudyPlan | null>(
    () => this.plans().find((p) => p.id === this.activePlanId()) ?? this.plans()[0] ?? null,
  );

  readonly hasActivePlan = computed(() => this.activePlan() !== null);

  // Computed — today's task (SRS-aware)
  // --------------------------------------------------------------------
  readonly dueEntries = computed<VocabEntry[]>(() => {
    const records = this.srsRecords();
    const today = todayStr();
    return this.allEntries().filter((e) => {
      const rec = records.get(e.id);
      return rec && rec.dueDate <= today;
    });
  });

  readonly newEntries = computed<VocabEntry[]>(() => {
    const records = this.srsRecords();
    const plan = this.activePlan();
    if (!plan) return [];
    const all = this.allEntries();
    const unseen = all.filter((e) => !records.has(e.id));

    // How many new words were introduced today already
    const today = todayStr();
    const newToday = [...records.values()].filter(
      (r) => r.lastReviewed === today && r.reps === 1,
    ).length;

    const remaining = Math.max(plan.dailyNewWords - newToday, 0);
    return unseen.slice(0, remaining);
  });

  readonly todayQueue = computed<VocabEntry[]>(() => {
    const due = this.dueEntries();
    const fresh = this.newEntries();
    // due first, then new; deduplicate by id
    const seen = new Set(due.map((e) => e.id));
    const combined = [...due, ...fresh.filter((e) => !seen.has(e.id))];
    return combined;
  });

  readonly todayStats = computed(() => ({
    due: this.dueEntries().length,
    newWords: this.newEntries().length,
    total: this.todayQueue().length,
  }));

  // Computed — wrong words
  // --------------------------------------------------------------------
  readonly wrongWords = computed(() => {
    const ids = this.wrongWordIds();
    return this.allEntries().filter((e) => ids.has(e.id));
  });

  // Computed — flashcard
  // --------------------------------------------------------------------
  readonly flashcardQueue = this._flashcardQueue.asReadonly();
  readonly currentCard = computed(() => this._flashcardQueue()[this.flashcardIndex()] ?? null);
  readonly flashcardIsLast = computed(
    () => this.flashcardIndex() >= this._flashcardQueue().length - 1,
  );
  readonly flashcardProgress = computed(() => ({
    index: this.flashcardIndex() + 1,
    total: this._flashcardQueue().length,
    known: this.knownIds().size,
  }));

  // Computed — quiz
  // --------------------------------------------------------------------
  readonly currentQuestion = computed(() => this.quizQuestions()[this.quizIndex()] ?? null);
  readonly quizProgress = computed(() =>
    Math.round((this.quizIndex() / (this.quizQuestions().length || 1)) * 100),
  );
  readonly quizIsLast = computed(() => this.quizIndex() === this.quizQuestions().length - 1);
  readonly quizScore = computed(() => this.quizResults().filter((r) => r.isCorrect).length);
  readonly quizShowResult = computed(
    () => this.quizIndex() >= this.quizQuestions().length && this.quizQuestions().length > 0,
  );

  // Lifecycle
  // --------------------------------------------------------------------
  async init() {
    this._loadWrongWords();
    this.loading.set(true);
    try {
      await this._loadVocabData();
      await this._loadPlansAndRecords();
    } finally {
      this.loading.set(false);
    }
  }

  // List mode
  // --------------------------------------------------------------------
  selectGroup(id: string | null) {
    this.selectedGroupId.set(id);
  }

  toggleExpand(id: string) {
    const s = new Set(this.expandedIds());
    s.has(id) ? s.delete(id) : s.add(id);
    this.expandedIds.set(s);
  }

  isExpanded(id: string): boolean {
    return this.expandedIds().has(id);
  }

  // Plan management
  // --------------------------------------------------------------------
  selectPlan(planId: string) {
    this.activePlanId.set(planId);
    this._reloadRecords();
  }

  async createPlan() {
    const uid = this.auth.currentUser?.uid;
    if (!uid) {
      this.createPlanError.set('尚未登入，請重新整理後再試。');
      return;
    }
    const totalWords = this.allEntries().length;
    if (totalWords === 0) {
      this.createPlanError.set('詞庫尚未載入，請稍後再試。');
      return;
    }

    this.createPlanLoading.set(true);
    this.createPlanError.set(null);
    try {
      const plan = await this.planService.createPlan(uid, {
        level: this.createPlanLevel(),
        dailyNewWords: this.createPlanDaily(),
        totalWords,
      });
      this.plans.update((p) => [...p, plan]);
      this.activePlanId.set(plan.id);
      this.showCreatePlan.set(false);
      await this._reloadRecords();
    } catch (e) {
      console.error('createPlan failed', e);
      this.createPlanError.set('建立失敗，請確認網路連線後再試。');
    } finally {
      this.createPlanLoading.set(false);
    }
  }

  async pausePlan() {
    const uid = this.auth.currentUser?.uid;
    const plan = this.activePlan();
    if (!uid || !plan) return;
    await this.planService.setPlanStatus(uid, plan.id, 'paused');
    this.plans.update((ps) => ps.map((p) => (p.id === plan.id ? { ...p, status: 'paused' } : p)));
  }

  // Flashcard
  // --------------------------------------------------------------------
  startFlashcard(opts: { wrongOnly?: boolean; todayOnly?: boolean; all?: boolean } = {}) {
    let pool: VocabEntry[];

    if (opts.wrongOnly) {
      pool = this.wrongWords();
    } else if (opts.todayOnly) {
      pool = this.todayQueue();
    } else {
      pool = [...this.filteredEntries()].sort(() => Math.random() - 0.5);
    }

    this._flashcardQueue.set(pool);
    this.flashcardIndex.set(0);
    this.flipped.set(false);
    this.knownIds.set(new Set());
    this.unknownIds.set(new Set());
    this.pageMode.set('flashcard');
  }

  flipCard() {
    this.flipped.update((v) => !v);
  }

  nextCard() {
    this.flipped.set(false);
    if (!this.flashcardIsLast()) {
      this.flashcardIndex.update((i) => i + 1);
    }
  }

  prevCard() {
    this.flipped.set(false);
    this.flashcardIndex.update((i) => Math.max(i - 1, 0));
  }

  markKnown() {
    const card = this.currentCard();
    if (!card) return;
    const s = new Set(this.knownIds());
    s.add(card.id);
    this.knownIds.set(s);
    this._updateSRS(card.id, true);
    this.nextCard();
  }

  markUnknown() {
    const card = this.currentCard();
    if (!card) return;
    const s = new Set(this.unknownIds());
    s.add(card.id);
    this.unknownIds.set(s);
    this._updateSRS(card.id, false);
    this.nextCard();
  }

  isKnown(id: string): boolean {
    return this.knownIds().has(id);
  }

  exitFlashcard() {
    this.pageMode.set('list');
  }

  // Quiz (4-choice)
  // --------------------------------------------------------------------
  startQuiz(opts: { wrongOnly?: boolean; todayOnly?: boolean; count?: number } = {}) {
    const count = opts.count ?? 10;
    let pool: VocabEntry[];

    if (opts.wrongOnly) {
      pool = this.wrongWords();
    } else if (opts.todayOnly) {
      pool = this.todayQueue();
    } else {
      pool = this.filteredEntries();
    }

    const qs = this._generateQuestions(pool, count);
    this.quizQuestions.set(qs);
    this.quizIndex.set(0);
    this.quizSelectedId.set(null);
    this.quizAnswered.set(false);
    this.quizResults.set([]);
    this.pageMode.set('quiz');
  }

  selectQuizOption(option: VocabQuizOption) {
    if (this.quizAnswered()) return;
    this.quizSelectedId.set(option.id);
    this.quizAnswered.set(true);

    const question = this.currentQuestion()!;
    this.quizResults.update((r) => [
      ...r,
      {
        questionId: question.id,
        selectedOptionId: option.id,
        isCorrect: option.isCorrect,
        entry: question.entry,
      },
    ]);

    this._updateSRS(question.entry.id, option.isCorrect);

    if (!option.isCorrect) {
      const s = new Set(this.wrongWordIds());
      s.add(question.entry.id);
      this.wrongWordIds.set(s);
      this._saveWrongWords(s);
    }
  }

  nextQuestion() {
    if (!this.quizIsLast()) {
      this.quizIndex.update((i) => i + 1);
      this.quizSelectedId.set(null);
      this.quizAnswered.set(false);
    } else {
      this.quizIndex.update((i) => i + 1);
    }
  }

  retryWrongFromQuiz() {
    const wrongEntries = this.quizResults()
      .filter((r) => !r.isCorrect)
      .map((r) => r.entry);
    if (wrongEntries.length === 0) return;
    const qs = this._generateQuestions(wrongEntries, wrongEntries.length);
    this.quizQuestions.set(qs);
    this.quizIndex.set(0);
    this.quizSelectedId.set(null);
    this.quizAnswered.set(false);
    this.quizResults.set([]);
    this.pageMode.set('quiz');
  }

  exitQuiz() {
    this.quizQuestions.set([]);
    this.quizResults.set([]);
    this.pageMode.set('list');
  }

  // Wrong words
  // --------------------------------------------------------------------
  clearWrongWords() {
    this.wrongWordIds.set(new Set());
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(WRONG_WORDS_KEY);
    }
  }

  // Private helpers
  // --------------------------------------------------------------------
  private async _loadVocabData() {
    return new Promise<void>((resolve) => {
      this.http.get<VocabReviewData>('assets/data/vocab-review-n3.json').subscribe({
        next: (data) => { this.data.set(data); resolve(); },
        error: () => resolve(),
      });
    });
  }

  private async _loadPlansAndRecords() {
    const uid = this.auth.currentUser?.uid;
    if (!uid) return;
    const plans = await this.planService.getPlans(uid);
    this.plans.set(plans);
    if (plans.length > 0) {
      const first = plans.find((p) => p.status === 'active') ?? plans[0];
      this.activePlanId.set(first.id);
      await this._reloadRecords();
    }
  }

  private async _reloadRecords() {
    const uid = this.auth.currentUser?.uid;
    const planId = this.activePlanId();
    if (!uid || !planId) return;
    const records = await this.srsService.getRecords(uid, planId);
    this.srsRecords.set(records);
  }

  private _updateSRS(wordId: string, known: boolean) {
    const uid = this.auth.currentUser?.uid;
    const plan = this.activePlan();
    if (!uid || !plan) return;

    const existing = this.srsRecords().get(wordId) ?? null;
    this.srsService
      .updateRecord(uid, wordId, plan.id, plan.level, known, existing)
      .then((updated) => {
        this.srsRecords.update((m) => new Map(m).set(wordId, updated));
      })
      .catch(console.error);
  }

  private _generateQuestions(pool: VocabEntry[], count: number): VocabQuizQuestion[] {
    const all = this.allEntries();
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, Math.min(count, shuffled.length));

    return selected.map((entry) => {
      const distractors = all
        .filter((e) => e.id !== entry.id && e.meaning !== entry.meaning)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);

      const opts: VocabQuizOption[] = [
        { id: `${entry.id}:c`, text: entry.meaning, isCorrect: true },
        ...distractors.map((d, i) => ({
          id: `${entry.id}:w${i}`,
          text: d.meaning,
          isCorrect: false,
        })),
      ].sort(() => Math.random() - 0.5);

      return { id: `q:${entry.id}`, entry, options: opts };
    });
  }

  private _loadWrongWords() {
    if (typeof localStorage === 'undefined') return;
    const raw = localStorage.getItem(WRONG_WORDS_KEY);
    if (raw) {
      try {
        this.wrongWordIds.set(new Set(JSON.parse(raw) as string[]));
      } catch {}
    }
  }

  private _saveWrongWords(ids: Set<string>) {
    if (typeof localStorage === 'undefined') return;
    localStorage.setItem(WRONG_WORDS_KEY, JSON.stringify([...ids]));
  }
}

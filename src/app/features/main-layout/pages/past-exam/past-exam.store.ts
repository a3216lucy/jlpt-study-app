// Cores
import { computed, inject } from '@angular/core';
// NgRx Signals
import { patchState, signalStore, withComputed, withHooks, withMethods, withProps, withState } from '@ngrx/signals';
// Angular
import { HttpClient } from '@angular/common/http';
// Angular Fire
import { Auth } from '@angular/fire/auth';
// RxJS
import { firstValueFrom } from 'rxjs';
// Shared
import type { ExamCategory, ExamOption, ExamQuestion } from '@core/models/exam-question.model';
import type { ExamAttempt, ExamAttemptMode, ExamScope } from '@core/models/exam-attempt.model';
import { PAST_EXAM_CATALOG, type PastExamEntry, type PastExamSection } from '@core/config/past-exam-catalog';
import { getExamStages, remainingSeconds } from '@core/config/exam-timing';
import type { JlptLevel } from '@core/models/vocab.model';
import { LearningRecordService } from '@core/services/learning-record.service';
import { ExamHistoryService } from '@core/services/exam-history.service';
import { ExamAttemptService } from '@core/services/exam-attempt.service';
import { BookmarkService } from '@core/services/bookmark.service';
import { TargetLevelService } from '@core/services/target-level.service';
import type { ExamHistoryEntry } from '@core/models/exam-history.model';
// Models
import type { ExamSectionScore, NotebookEntry, NotebookItem, StartDialogGroup } from './past-exam.model';
// Utils
import {
  NOTEBOOK_EXAM_ID,
  nextAttemptNo,
  questionStats,
  scopeKey,
  scoreAnswers,
  selectScopeQuestions,
  unmasteredQuestionIds,
  type SectionQuestions,
} from './attempt.util';
import { buildReviewLists } from './review-lists.util';

interface FlatItem {
  section: PastExamSection;
  question: ExamQuestion;
}

/** 畫面階段：主畫面／作答中／結果／唯讀回顧 */
type Phase = 'overview' | 'taking' | 'result' | 'review' | 'notebook';
/** 作答模式；`review` 為唯讀回顧歷次作答 */
type ExamMode = ExamAttemptMode | 'review';
type ReviewFilter = 'all' | 'wrong' | 'marked';
type ReviewTab = 'questions' | 'vocab' | 'grammar';
type NotebookTab = 'wrong' | 'vocab' | 'grammar' | 'marked';
type NotebookSort = 'count' | 'recent';

interface PastExamState {
  phase: Phase;
  mode: ExamMode;
  selectedLevel: JlptLevel;
  selectedExam: PastExamEntry | null;
  flatItems: FlatItem[];
  currentIndex: number;
  /** 題目 id → 選項 id */
  answers: Record<string, string>;
  markedQuestionIds: Set<string>;
  /** 目前這次作答（練習在第一次作答前 id 為空字串，尚未寫入 Firestore） */
  attempt: ExamAttempt | null;
  /** 使用者所有作答紀錄（新到舊） */
  attempts: ExamAttempt[];
  /** 「開始作答」對話框目前針對的考卷 */
  startDialogExam: PastExamEntry | null;
  /** 對話框內可選的大題範圍（讀完題目檔才有） */
  startDialogGroups: StartDialogGroup[];
  // 實際演練計時
  stageIndex: number;
  stageDeadlineMs: number | null;
  remainingSec: number;
  /** 前面階段已用掉的秒數 */
  elapsedBeforeStageSec: number;
  /** 兩段之間的休息畫面（等使用者按下開始才起算下一段） */
  stageBreak: boolean;
  timedOut: boolean;
  confirmSubmit: boolean;
  confirmLeave: boolean;
  // 回顧
  reviewFilter: ReviewFilter;
  reviewTab: ReviewTab;
  // 錯題本（跨回次、唯讀）
  notebookItems: NotebookItem[];
  notebookIncludeMock: boolean;
  notebookLevel: JlptLevel | 'all';
  notebookCategory: ExamCategory | 'all';
  notebookExamId: string | 'all';
  notebookTab: NotebookTab;
  notebookSort: NotebookSort;
  notebookLimit: number;
  /** 已標記「已學會」的單字（word）與文法（`point|tip`），存在 bookmarks，跟著帳號 */
  notebookLearnedVocab: Set<string>;
  notebookLearnedGrammar: Set<string>;
  notebookShowLearned: boolean;
  loading: boolean;
  loadError: string | null;
  /** 舊版 examHistory 的上次成績（只當 fallback） */
  examSummaries: Map<string, number | null>;
  summariesLoading: boolean;
}

/** 「已學會」標記存在 users/{uid}/bookmarks 底下的 key */
const LEARNED_VOCAB_KEY = 'examNotebookLearnedVocab';
const LEARNED_GRAMMAR_KEY = 'examNotebookLearnedGrammar';

/** 錯題本一次顯示的題數（可再載入更多） */
const NOTEBOOK_PAGE = 30;

const initialState: PastExamState = {
  phase: 'overview',
  mode: 'practice',
  selectedLevel: 'N3',
  selectedExam: null,
  flatItems: [],
  currentIndex: 0,
  answers: {},
  markedQuestionIds: new Set(),
  attempt: null,
  attempts: [],
  startDialogExam: null,
  startDialogGroups: [],
  stageIndex: 0,
  stageDeadlineMs: null,
  remainingSec: 0,
  elapsedBeforeStageSec: 0,
  stageBreak: false,
  timedOut: false,
  confirmSubmit: false,
  confirmLeave: false,
  reviewFilter: 'wrong',
  reviewTab: 'questions',
  notebookItems: [],
  notebookIncludeMock: false,
  notebookLevel: 'all',
  notebookCategory: 'all',
  notebookExamId: 'all',
  notebookTab: 'wrong',
  notebookSort: 'count',
  notebookLimit: NOTEBOOK_PAGE,
  notebookLearnedVocab: new Set(),
  notebookLearnedGrammar: new Set(),
  notebookShowLearned: false,
  loading: false,
  loadError: null,
  examSummaries: new Map(),
  summariesLoading: false,
};

/** 練習進度存檔的防抖毫秒數 */
const SAVE_DEBOUNCE_MS = 600;

export const PastExamStore = signalStore(
  withState(initialState),
  withProps(() => ({
    catalog: PAST_EXAM_CATALOG,
  })),
  withComputed((store) => ({
    filteredCatalog: computed(() => store.catalog.filter((e) => e.level === store.selectedLevel())),
    stages: computed(() => {
      const exam = store.selectedExam();
      return exam ? getExamStages(exam.level, exam.sections.map((sec) => sec.category)) : [];
    }),
    /** 依考卷分組的作答紀錄（新到舊） */
    attemptsByExam: computed(() => {
      const map = new Map<string, ExamAttempt[]>();
      for (const a of store.attempts()) {
        const list = map.get(a.examId) ?? [];
        list.push(a);
        map.set(a.examId, list);
      }
      return map;
    }),
    /** 每份考卷最近一次完成的正確率（主畫面徽章） */
    latestPercent: computed(() => {
      const map = new Map<string, number>();
      for (const a of store.attempts()) {
        if (a.status !== 'completed' || a.total === 0 || map.has(a.examId)) continue;
        map.set(a.examId, Math.round((a.score / a.total) * 100));
      }
      return map;
    }),
    startDialogUnmasteredCount: computed(() => {
      const exam = store.startDialogExam();
      return exam ? unmasteredQuestionIds(store.attempts(), exam.id).size : 0;
    }),
    answeredTotal: computed(() => store.flatItems().filter((it) => !!store.answers()[it.question.id]).length),
    score: computed(
      () => store.flatItems().filter((it) => store.answers()[it.question.id] === it.question.correctAnswer).length,
    ),
    wrongItems: computed(() =>
      store
        .flatItems()
        .filter((it) => store.answers()[it.question.id] !== it.question.correctAnswer)
        .map((item) => ({ item, pickedOptionId: store.answers()[item.question.id] ?? null })),
    ),
  })),
  withComputed((store) => ({
    currentStage: computed(() => (store.mode() === 'mock' ? (store.stages()[store.stageIndex()] ?? null) : null)),
    unansweredTotal: computed(() => store.flatItems().length - store.answeredTotal()),
    totalPercent: computed(() =>
      store.flatItems().length > 0 ? Math.round((store.score() / store.flatItems().length) * 100) : 0,
    ),
    /** 各科目表現：依這次作答實際包含的科目分組（錯題本練習會跨多份考卷） */
    sectionScores: computed<ExamSectionScore[]>(() => {
      const order: PastExamSection[] = [];
      const grouped = new Map<string, FlatItem[]>();
      for (const it of store.flatItems()) {
        const list = grouped.get(it.section.id);
        if (list) list.push(it);
        else {
          grouped.set(it.section.id, [it]);
          order.push(it.section);
        }
      }
      return order.map((section) => {
        const items = grouped.get(section.id)!;
        const score = items.filter((it) => store.answers()[it.question.id] === it.question.correctAnswer).length;
        const exam = store.catalog.find((e) => e.sections.some((s) => s.id === section.id));
        return { section, score, total: items.length, examLabel: exam?.examLabel ?? '' };
      });
    }),
    /** 「這次作答」包含的題目依目前模式的可見範圍（實演只能在目前階段內移動） */
    stageIndices: computed(() => {
      const stage = store.mode() === 'mock' ? (store.stages()[store.stageIndex()] ?? null) : null;
      const out: number[] = [];
      store.flatItems().forEach((it, i) => {
        if (!stage || stage.categories.includes(it.section.category)) out.push(i);
      });
      return out;
    }),
    reviewItems: computed(() => {
      const marked = store.markedQuestionIds();
      const wrongIds = new Set(store.wrongItems().map((w) => w.item.question.id));
      return store.flatItems().filter((it) => {
        switch (store.reviewFilter()) {
          case 'wrong':
            return wrongIds.has(it.question.id);
          case 'marked':
            return marked.has(it.question.id);
          default:
            return true;
        }
      });
    }),
    reviewLists: computed(() => buildReviewLists(store.wrongItems().map((w) => w.item.question))),
  })),
  withComputed((store) => ({
    currentItem: computed<FlatItem | null>(() => store.flatItems()[store.currentIndex()] ?? null),
    positionInStage: computed(() => store.stageIndices().indexOf(store.currentIndex())),
    stageAnsweredCount: computed(
      () => store.stageIndices().filter((i) => !!store.answers()[store.flatItems()[i].question.id]).length,
    ),
  })),
  withComputed((store) => ({
    currentSection: computed(() => store.currentItem()?.section ?? null),
    /** 這次作答是否從錯題本開始（題目來自多份考卷） */
    isNotebookAttempt: computed(() => store.attempt()?.examId === NOTEBOOK_EXAM_ID),
    /** 標題用的考卷名稱 */
    examTitle: computed(() =>
      store.attempt()?.examId === NOTEBOOK_EXAM_ID ? '錯題本練習' : (store.selectedExam()?.examLabel ?? ''),
    ),
    /** 目前這題所屬的考卷名稱（錯題本練習時標在題目上方） */
    currentExamLabel: computed(() => {
      const section = store.currentItem()?.section;
      return section ? (store.catalog.find((e) => e.sections.some((s) => s.id === section.id))?.examLabel ?? '') : '';
    }),
    currentQuestion: computed(() => store.currentItem()?.question ?? null),
    isLast: computed(() => store.positionInStage() === store.stageIndices().length - 1),
    progress: computed(() =>
      store.stageIndices().length > 0
        ? Math.round(((store.positionInStage() + 1) / store.stageIndices().length) * 100)
        : 0,
    ),
  })),
  withComputed((store) => ({
    selectedOptionId: computed(() => {
      const q = store.currentQuestion();
      return q ? (store.answers()[q.id] ?? null) : null;
    }),
    currentProblemNumber: computed(() => store.currentQuestion()?.problemNumber ?? null),
    /** 目前科目下的問題子分類（同一 section 內按 problemNumber 分組，僅供顯示目前所在位置，不可點擊跳題） */
    currentSectionProblemGroups: computed(() => {
      const section = store.currentSection();
      if (!section) return [];
      const seen = new Map<number, string>();
      for (const item of store.flatItems()) {
        if (item.section.id !== section.id) continue;
        const num = item.question.problemNumber;
        if (num != null && !seen.has(num)) seen.set(num, item.question.problemLabel ?? `問題${num}`);
      }
      return Array.from(seen.entries())
        .sort((a, b) => a[0] - b[0])
        .map(([number, label]) => ({ number, label }));
    }),
    /** 題號格：目前階段內每題的狀態 */
    navigatorCells: computed(() =>
      store.stageIndices().map((index, n) => {
        const q = store.flatItems()[index].question;
        return {
          index,
          number: n + 1,
          answered: !!store.answers()[q.id],
          marked: store.markedQuestionIds().has(q.id),
          current: index === store.currentIndex(),
        };
      }),
    ),
  })),
  withComputed((store) => ({
    /** 目前這題是否已公布對錯與解析：練習＝選完後、回顧＝一律、實演＝不公布 */
    revealed: computed(() => {
      if (store.mode() === 'review') return true;
      if (store.mode() === 'practice') return store.selectedOptionId() !== null;
      return false;
    }),
  })),
  // 錯題本（跨回次、唯讀）。signalStore 最多收 15 個功能區塊，所以全部放在同一個 withComputed 裡，用區域變數串起依賴
  withComputed((store) => {
    const notebookStats = computed(() => questionStats(store.attempts(), store.notebookIncludeMock()));

    const examLabelOfQuestion = (q: ExamQuestion): string => {
      const exam = store.catalog.find((e) => q.id.startsWith(`${e.id}-`));
      return exam ? `${exam.examLabel}・` : '';
    };

    /** 已載入題目內容且有狀態的錯題本題目（尚未套用篩選） */
    const notebookEntries = computed<NotebookEntry[]>(() => {
      const stats = notebookStats();
      const out: NotebookEntry[] = [];
      for (const item of store.notebookItems()) {
        const stat = stats.get(item.question.id);
        if (stat && (stat.latestWrong || stat.marked)) out.push({ ...item, stat });
      }
      return out;
    });

    const matches = (e: NotebookEntry): boolean =>
      (store.notebookLevel() === 'all' || e.exam.level === store.notebookLevel()) &&
      (store.notebookCategory() === 'all' || e.section.category === store.notebookCategory()) &&
      (store.notebookExamId() === 'all' || e.exam.id === store.notebookExamId());

    const notebookFiltered = computed(() => notebookEntries().filter(matches));

    return {
      notebookStats,
      notebookEntries,
      /** 主畫面入口徽章：只算練習 */
      notebookSummary: computed(() => {
        let unmastered = 0;
        let marked = 0;
        for (const s of questionStats(store.attempts(), false).values()) {
          if (s.latestWrong) unmastered++;
          if (s.marked) marked++;
        }
        return { unmastered, marked };
      }),
      notebookFiltered,
      /** 目前有題目的級別（供篩選選單，不受目前篩選影響） */
      notebookLevels: computed(() => Array.from(new Set(notebookEntries().map((e) => e.exam.level))).sort()),
      /** 目前級別下有題目的考卷 */
      notebookExams: computed(() => {
        const seen = new Map<string, string>();
        for (const e of notebookEntries()) {
          if (store.notebookLevel() !== 'all' && e.exam.level !== store.notebookLevel()) continue;
          seen.set(e.exam.id, e.exam.examLabel);
        }
        return Array.from(seen.entries())
          .map(([id, label]) => ({ id, label }))
          .sort((x, y) => x.label.localeCompare(y.label, 'zh-Hant'));
      }),
      /** 還沒掌握的題；錯最多次或最近錯的排前面 */
      notebookWrong: computed(() =>
        notebookFiltered()
          .filter((e) => e.stat.latestWrong)
          .sort((x, y) =>
            store.notebookSort() === 'recent'
              ? y.stat.lastWrongMs - x.stat.lastWrongMs
              : y.stat.wrongCount - x.stat.wrongCount || y.stat.lastWrongMs - x.stat.lastWrongMs,
          ),
      ),
      notebookMarked: computed(() =>
        notebookFiltered()
          .filter((e) => e.stat.marked)
          .sort((x, y) => x.exam.examLabel.localeCompare(y.exam.examLabel, 'zh-Hant') || x.question.id.localeCompare(y.question.id)),
      ),
      /** 單字／文法清單：跨回次累計錯誤次數、來源附考卷名稱 */
      notebookLists: computed(() => {
        const wrong = notebookFiltered().filter((e) => e.stat.latestWrong);
        const countById = new Map(wrong.map((e) => [e.question.id, e.stat.wrongCount]));
        const lists = buildReviewLists(
          wrong.map((e) => e.question),
          (q) => countById.get(q.id) ?? 1,
          examLabelOfQuestion,
        );
        if (store.notebookShowLearned()) return lists;
        return {
          vocab: lists.vocab.filter((v) => !store.notebookLearnedVocab().has(v.word)),
          grammar: lists.grammar.filter((g) => !store.notebookLearnedGrammar().has(`${g.point}|${g.tip}`)),
        };
      }),
    };
  }),
  withProps(() => ({
    /** 計時、防抖等非狀態的控制代碼（不放進 state，避免觸發重算） */
    handles: {
      tick: null as ReturnType<typeof setInterval> | null,
      save: null as ReturnType<typeof setTimeout> | null,
      creating: null as Promise<string> | null,
      questionCache: new Map<string, ExamQuestion[]>(),
    },
  })),
  withMethods(
    (
      store,
      http = inject(HttpClient),
      auth = inject(Auth),
      learningRecord = inject(LearningRecordService),
      examHistoryService = inject(ExamHistoryService),
      attemptService = inject(ExamAttemptService),
      bookmarks = inject(BookmarkService),
      targetLevel = inject(TargetLevelService),
    ) => {
      // 內部工具
      // ------------------------------------------------------------------
      const uid = (): string | null => auth.currentUser?.uid ?? null;

      const loadSectionQuestions = async (exam: PastExamEntry): Promise<SectionQuestions[]> => {
        return Promise.all(
          exam.sections.map(async (section) => {
            let questions = store.handles.questionCache.get(section.path);
            if (!questions) {
              questions = (await firstValueFrom(http.get<{ questions: ExamQuestion[] }>(section.path))).questions;
              store.handles.questionCache.set(section.path, questions);
            }
            return { sectionId: section.id, questions };
          }),
        );
      };

      const toFlatItems = (exam: PastExamEntry, scoped: { sectionId: string; question: ExamQuestion }[]): FlatItem[] =>
        scoped.map(({ sectionId, question }) => ({
          section: exam.sections.find((s) => s.id === sectionId)!,
          question,
        }));

      const stopTimer = (): void => {
        if (store.handles.tick) clearInterval(store.handles.tick);
        store.handles.tick = null;
      };

      const clearSaveTimer = (): void => {
        if (store.handles.save) clearTimeout(store.handles.save);
        store.handles.save = null;
      };

      /** 把舊版 examHistory（每科一筆）也寫一份，首頁、個人中心、連續天數不用改 */
      const saveLegacyHistory = async (mode: ExamAttemptMode): Promise<void> => {
        for (const { section, score, total } of store.sectionScores()) {
          const exam = store.catalog.find((e) => e.sections.some((s) => s.id === section.id));
          if (!exam) continue;
          const wrongIds = store
            .wrongItems()
            .filter((w) => w.item.section.id === section.id)
            .map((w) => w.item.question.id);
          try {
            await learningRecord.saveExamResult({ examId: exam.id, sectionId: section.id, score, total, wrongQuestionIds: wrongIds, mode });
          } catch (e) {
            console.error('save exam result failed', e);
          }
        }
      };

      /** 依題目 id 找出所屬考卷、載入題庫，回傳依 id 順序排好的題目（錯題本練習的題目可跨多份考卷） */
      const resolveItems = async (ids: readonly string[]): Promise<FlatItem[]> => {
        const exams = store.catalog.filter((e) => ids.some((id) => id.startsWith(`${e.id}-`)));
        const byId = new Map<string, FlatItem>();
        for (const exam of exams) {
          const sections = await loadSectionQuestions(exam);
          for (const { sectionId, questions } of sections) {
            const section = exam.sections.find((s) => s.id === sectionId)!;
            for (const question of questions) byId.set(question.id, { section, question });
          }
        }
        return ids.map((id) => byId.get(id)).filter((x): x is FlatItem => !!x);
      };

      const loadLearned = async (): Promise<void> => {
        const userId = uid();
        if (!userId) return;
        try {
          const [vocab, grammar] = await Promise.all([
            bookmarks.getBookmarks(userId, LEARNED_VOCAB_KEY),
            bookmarks.getBookmarks(userId, LEARNED_GRAMMAR_KEY),
          ]);
          patchState(store, { notebookLearnedVocab: new Set(vocab), notebookLearnedGrammar: new Set(grammar) });
        } catch (e) {
          console.error('load learned marks failed', e);
        }
      };

      const toggleIn = (set: Set<string>, value: string): Set<string> => {
        const next = new Set(set);
        if (next.has(value)) next.delete(value);
        else next.add(value);
        return next;
      };

      const refreshAttempts = async (): Promise<void> => {
        const id = uid();
        if (!id) return;
        try {
          patchState(store, { attempts: await attemptService.listAll(id) });
        } catch (e) {
          console.error('load exam attempts failed', e);
        }
      };

      let levelApplied = false;

      const loadSummaries = async (): Promise<void> => {
        const id = uid();
        if (!id) return;
        patchState(store, { summariesLoading: true });
        try {
          const history = await examHistoryService.getRecent(id, 200);
          const latestBySection = new Map<string, ExamHistoryEntry>();
          for (const entry of history) {
            const key = `${entry.examId}::${entry.sectionId}`;
            if (!latestBySection.has(key)) latestBySection.set(key, entry);
          }
          const summaries = new Map<string, number | null>();
          for (const exam of store.catalog) {
            const rs = exam.sections.map((s) => latestBySection.get(`${exam.id}::${s.id}`));
            if (rs.every((r): r is ExamHistoryEntry => !!r)) {
              const totalScore = rs.reduce((sum, r) => sum + r.score, 0);
              const totalCount = rs.reduce((sum, r) => sum + r.total, 0);
              summaries.set(exam.id, totalCount > 0 ? Math.round((totalScore / totalCount) * 100) : null);
            } else {
              summaries.set(exam.id, null);
            }
          }
          patchState(store, { examSummaries: summaries });
        } catch (e) {
          console.error('load exam summaries failed', e);
        } finally {
          patchState(store, { summariesLoading: false });
        }
      };

      /** 練習：第一次作答時才建立 Firestore 文件，避免留下空紀錄；同時多次呼叫只會建一次 */
      const ensureAttemptCreated = async (): Promise<string | null> => {
        const attempt = store.attempt();
        const userId = uid();
        if (!attempt || !userId) return null;
        if (attempt.id) return attempt.id;
        if (!store.handles.creating) {
          store.handles.creating = attemptService
            .create(userId, {
              examId: attempt.examId,
              mode: 'practice',
              scopeKey: attempt.scopeKey,
              attemptNo: attempt.attemptNo,
              questionIds: attempt.questionIds,
            })
            .then((newId) => {
              patchState(store, (s) => ({ attempt: s.attempt ? { ...s.attempt, id: newId } : s.attempt }));
              return newId;
            })
            .finally(() => {
              store.handles.creating = null;
            });
        }
        return store.handles.creating;
      };

      const saveProgressNow = async (): Promise<void> => {
        clearSaveTimer();
        const attempt = store.attempt();
        const userId = uid();
        if (!attempt || !userId || store.mode() !== 'practice' || attempt.status === 'completed') return;
        if (Object.keys(store.answers()).length === 0 && !attempt.id) return;
        try {
          const id = await ensureAttemptCreated();
          if (!id) return;
          await attemptService.saveProgress(userId, id, {
            answers: store.answers(),
            markedIds: Array.from(store.markedQuestionIds()),
            currentIndex: store.currentIndex(),
          });
        } catch (e) {
          console.error('save attempt progress failed', e);
        }
      };

      const scheduleSave = (): void => {
        clearSaveTimer();
        store.handles.save = setTimeout(() => void saveProgressNow(), SAVE_DEBOUNCE_MS);
      };

      const resetToOverview = (): void => {
        stopTimer();
        clearSaveTimer();
        patchState(store, {
          phase: 'overview',
          mode: 'practice',
          selectedExam: null,
          flatItems: [],
          currentIndex: 0,
          answers: {},
          markedQuestionIds: new Set(),
          attempt: null,
          stageIndex: 0,
          stageDeadlineMs: null,
          remainingSec: 0,
          elapsedBeforeStageSec: 0,
          stageBreak: false,
          timedOut: false,
          confirmSubmit: false,
          confirmLeave: false,
        });
        void loadSummaries();
        void refreshAttempts();
      };

      // 實際演練：計時與階段
      // ------------------------------------------------------------------
      const finishMock = async (timedOut: boolean): Promise<void> => {
        stopTimer();
        const exam = store.selectedExam();
        const stage = store.currentStage();
        const stageSpent = stage ? Math.max(0, stage.minutes * 60 - store.remainingSec()) : 0;
        const elapsedSec = store.elapsedBeforeStageSec() + stageSpent;
        const questions = store.flatItems().map((it) => it.question);
        const result = scoreAnswers(questions, store.answers());
        const userId = uid();
        const base = {
          examId: exam?.id ?? '',
          mode: 'mock' as const,
          scopeKey: 'all',
          attemptNo: exam ? nextAttemptNo(store.attempts(), exam.id, 'mock') : 1,
          questionIds: questions.map((q) => q.id),
          answers: store.answers(),
          markedIds: Array.from(store.markedQuestionIds()),
          score: result.score,
          wrongQuestionIds: result.wrongQuestionIds,
          mock: { stageIndex: store.stageIndex(), elapsedSec, timedOut },
        };
        patchState(store, {
          phase: 'result',
          timedOut,
          confirmSubmit: false,
          stageBreak: false,
          attempt: {
            ...base,
            id: '',
            status: 'completed',
            currentIndex: 0,
            startedAt: null,
            updatedAt: null,
            completedAt: null,
            total: questions.length,
          },
        });
        if (!userId || !exam) return;
        try {
          const id = await attemptService.create(userId, { ...base, completed: true });
          patchState(store, (s) => ({ attempt: s.attempt ? { ...s.attempt, id } : s.attempt }));
        } catch (e) {
          console.error('save mock attempt failed', e);
        }
        await saveLegacyHistory('mock');
        void refreshAttempts();
      };

      const startStageTimer = (minutes: number): void => {
        stopTimer();
        const deadline = Date.now() + minutes * 60_000;
        patchState(store, { stageDeadlineMs: deadline, remainingSec: minutes * 60 });
        store.handles.tick = setInterval(() => {
          const left = remainingSeconds(deadline, Date.now());
          patchState(store, { remainingSec: left });
          if (left <= 0) void onTimeUp();
        }, 1000);
      };

      const submitStage = async (timedOut: boolean): Promise<void> => {
        stopTimer();
        const stages = store.stages();
        const stage = store.currentStage();
        if (stage && store.stageIndex() < stages.length - 1) {
          const spent = Math.max(0, stage.minutes * 60 - store.remainingSec());
          patchState(store, {
            stageBreak: true,
            confirmSubmit: false,
            timedOut,
            elapsedBeforeStageSec: store.elapsedBeforeStageSec() + spent,
          });
          return;
        }
        await finishMock(timedOut);
      };

      const onTimeUp = async (): Promise<void> => {
        await submitStage(true);
      };

      // 練習：完成
      // ------------------------------------------------------------------
      const finishPractice = async (): Promise<void> => {
        clearSaveTimer();
        const attempt = store.attempt();
        const userId = uid();
        const questions = store.flatItems().map((it) => it.question);
        const result = scoreAnswers(questions, store.answers());
        patchState(store, {
          phase: 'result',
          confirmSubmit: false,
          attempt: attempt ? { ...attempt, status: 'completed', score: result.score, wrongQuestionIds: result.wrongQuestionIds } : attempt,
        });
        if (!attempt || !userId) return;
        try {
          const id = await ensureAttemptCreated();
          if (id) {
            await attemptService.complete(userId, id, {
              answers: store.answers(),
              markedIds: Array.from(store.markedQuestionIds()),
              currentIndex: store.currentIndex(),
              score: result.score,
              wrongQuestionIds: result.wrongQuestionIds,
            });
          }
        } catch (e) {
          console.error('complete practice attempt failed', e);
        }
        await saveLegacyHistory('practice');
        void refreshAttempts();
      };

      /** 開啟「開始作答」對話框，並讀取各大題（問題N）的題數供選擇 */
      const openStartDialog = async (exam: PastExamEntry): Promise<void> => {
          patchState(store, { startDialogExam: exam, startDialogGroups: [], loadError: null });
          try {
            const sections = await loadSectionQuestions(exam);
            const groups: StartDialogGroup[] = [];
            for (const { sectionId, questions } of sections) {
              const byNumber = new Map<number, StartDialogGroup>();
              for (const q of questions) {
                if (q.problemNumber == null) continue;
                const g = byNumber.get(q.problemNumber);
                if (g) g.count++;
                else byNumber.set(q.problemNumber, { sectionId, number: q.problemNumber, label: q.problemLabel ?? '', count: 1 });
              }
              groups.push(...Array.from(byNumber.values()).sort((a, b) => a.number - b.number));
            }
            // 對話框可能已被關掉或換成別份考卷
            if (store.startDialogExam()?.id === exam.id) patchState(store, { startDialogGroups: groups });
          } catch {
            /* 讀不到大題就只提供整回／科目範圍 */
          }
        };

      /** 載入錯題本需要的題目內容：只讀「有還沒掌握的題或標記題」的那幾回，且用快取 */
      const loadNotebookItems = async (): Promise<void> => {
        const stats = store.notebookStats();
        const wanted = new Set(Array.from(stats.entries()).filter(([, s]) => s.latestWrong || s.marked).map(([id]) => id));
        const exams = store.catalog.filter((e) => Array.from(wanted).some((id) => id.startsWith(`${e.id}-`)));
        patchState(store, { loading: true, loadError: null });
        try {
          const items: NotebookItem[] = [];
          for (const exam of exams) {
            const sections = await loadSectionQuestions(exam);
            for (const { sectionId, questions } of sections) {
              const section = exam.sections.find((s) => s.id === sectionId)!;
              for (const question of questions) if (wanted.has(question.id)) items.push({ exam, section, question });
            }
          }
          patchState(store, { notebookItems: items });
        } catch {
          patchState(store, { loadError: '無法載入錯題本的題目，請稍後再試。' });
        } finally {
          patchState(store, { loading: false });
        }
      };

      /** 開啟跨回次錯題本（先更新作答紀錄，再載入相關題目與「已學會」標記） */
      const openNotebook = async (): Promise<void> => {
          patchState(store, {
            phase: 'notebook',
            notebookTab: 'wrong',
            notebookLimit: NOTEBOOK_PAGE,
            notebookLevel: 'all',
            notebookCategory: 'all',
            notebookExamId: 'all',
          });
          await refreshAttempts();
          await Promise.all([loadNotebookItems(), loadLearned()]);
        };

      return {
        // Lifecycle
        // --------------------------------------------------------------------
        async init(): Promise<void> {
          // 第一次進頁面：級別預設依個人設定的應考目標（目錄裡沒有該級別就維持預設）
          if (!levelApplied) {
            levelApplied = true;
            const target = (await targetLevel.load()) as JlptLevel;
            if (store.catalog.some((e) => e.level === target)) patchState(store, { selectedLevel: target });
          }
          await Promise.all([loadSummaries(), refreshAttempts()]);
        },

        /** store 銷毀時清掉計時與防抖 */
        dispose(): void {
          stopTimer();
          clearSaveTimer();
        },

        // Public Handlers — 主畫面
        // --------------------------------------------------------------------
        selectLevel(level: JlptLevel): void {
          patchState(store, { selectedLevel: level });
        },

        openStartDialog,

        closeStartDialog(): void {
          patchState(store, { startDialogExam: null });
        },

        /** 開始練習模式（可選範圍） */
        async startPractice(exam: PastExamEntry, scope: ExamScope): Promise<void> {
          patchState(store, { startDialogExam: null, selectedExam: exam, loading: true, loadError: null });
          try {
            const sections = await loadSectionQuestions(exam);
            const unmastered = unmasteredQuestionIds(store.attempts(), exam.id);
            const scoped = selectScopeQuestions(sections, scope, unmastered);
            if (scoped.length === 0) {
              patchState(store, { loadError: '這個範圍目前沒有題目。', selectedExam: null });
              return;
            }
            const items = toFlatItems(exam, scoped);
            patchState(store, {
              mode: 'practice',
              flatItems: items,
              currentIndex: 0,
              answers: {},
              markedQuestionIds: new Set(),
              attempt: {
                id: '',
                examId: exam.id,
                mode: 'practice',
                scopeKey: scopeKey(scope),
                attemptNo: nextAttemptNo(store.attempts(), exam.id, 'practice'),
                status: 'in-progress',
                questionIds: items.map((it) => it.question.id),
                answers: {},
                markedIds: [],
                currentIndex: 0,
                startedAt: null,
                updatedAt: null,
                completedAt: null,
                score: 0,
                total: items.length,
                wrongQuestionIds: [],
                mock: null,
              },
              phase: 'taking',
            });
          } catch {
            patchState(store, { loadError: '無法載入題目，請確認資料檔案是否存在。', selectedExam: null });
          } finally {
            patchState(store, { loading: false });
          }
        },

        /** 續做進行中的練習（含從錯題本開始的練習） */
        async resumeAttempt(attempt: ExamAttempt): Promise<void> {
          const exam = store.catalog.find((e) => e.id === attempt.examId) ?? null;
          patchState(store, { selectedExam: exam, loading: true, loadError: null });
          try {
            const items = await resolveItems(attempt.questionIds);
            patchState(store, {
              mode: 'practice',
              flatItems: items,
              currentIndex: Math.min(attempt.currentIndex, Math.max(0, items.length - 1)),
              answers: { ...attempt.answers },
              markedQuestionIds: new Set(attempt.markedIds),
              attempt,
              phase: 'taking',
            });
          } catch {
            patchState(store, { loadError: '無法載入題目，請稍後再試。', selectedExam: null });
          } finally {
            patchState(store, { loading: false });
          }
        },

        /** 開始實際演練（整回、官方計時） */
        async startMock(exam: PastExamEntry): Promise<void> {
          patchState(store, { startDialogExam: null, selectedExam: exam, loading: true, loadError: null });
          try {
            const sections = await loadSectionQuestions(exam);
            const items = toFlatItems(exam, selectScopeQuestions(sections, { type: 'all' }));
            const stages = getExamStages(
              exam.level,
              exam.sections.map((sec) => sec.category),
            );
            patchState(store, {
              mode: 'mock',
              flatItems: items,
              currentIndex: 0,
              answers: {},
              markedQuestionIds: new Set(),
              attempt: null,
              stageIndex: 0,
              elapsedBeforeStageSec: 0,
              stageBreak: false,
              timedOut: false,
              phase: 'taking',
            });
            // 第一個階段的第一題
            const first = items.findIndex((it) => stages[0].categories.includes(it.section.category));
            patchState(store, { currentIndex: Math.max(0, first) });
            startStageTimer(stages[0].minutes);
          } catch {
            patchState(store, { loadError: '無法載入題目，請確認資料檔案是否存在。', selectedExam: null });
          } finally {
            patchState(store, { loading: false });
          }
        },

        /** 兩段計時之間，按下開始才起算下一段 */
        beginNextStage(): void {
          const next = store.stageIndex() + 1;
          const stage = store.stages()[next];
          if (!stage) return;
          const first = store.flatItems().findIndex((it) => stage.categories.includes(it.section.category));
          patchState(store, { stageIndex: next, currentIndex: Math.max(0, first), stageBreak: false, timedOut: false });
          startStageTimer(stage.minutes);
        },

        /** 唯讀回顧某次作答（含從錯題本開始的練習） */
        async openReview(attempt: ExamAttempt): Promise<void> {
          const exam = store.catalog.find((e) => e.id === attempt.examId) ?? null;
          patchState(store, { selectedExam: exam, loading: true, loadError: null });
          try {
            const items = await resolveItems(attempt.questionIds);
            patchState(store, {
              mode: 'review',
              flatItems: items,
              currentIndex: 0,
              answers: { ...attempt.answers },
              markedQuestionIds: new Set(attempt.markedIds),
              attempt,
              reviewTab: 'questions',
              reviewFilter: attempt.wrongQuestionIds.length > 0 ? 'wrong' : 'all',
              phase: 'review',
            });
          } catch {
            patchState(store, { loadError: '無法載入題目，請稍後再試。', selectedExam: null });
          } finally {
            patchState(store, { loading: false });
          }
        },

        setReviewFilter(filter: ReviewFilter): void {
          patchState(store, { reviewFilter: filter });
        },

        setReviewTab(tab: ReviewTab): void {
          patchState(store, { reviewTab: tab });
        },

        backToOverview(): void {
          resetToOverview();
        },

        /** 從結果／回顧返回：錯題本練習回到錯題本，其餘回主畫面 */
        backFromAttempt(): void {
          const fromNotebook = store.attempt()?.examId === NOTEBOOK_EXAM_ID;
          resetToOverview();
          if (fromNotebook) void openNotebook();
        },

        // Public Handlers — 錯題本
        // --------------------------------------------------------------------
        openNotebook,

        setNotebookTab(tab: NotebookTab): void {
          patchState(store, { notebookTab: tab, notebookLimit: NOTEBOOK_PAGE });
        },

        setNotebookSort(sort: NotebookSort): void {
          patchState(store, { notebookSort: sort, notebookLimit: NOTEBOOK_PAGE });
        },

        setNotebookLevel(level: JlptLevel | 'all'): void {
          patchState(store, { notebookLevel: level, notebookExamId: 'all', notebookLimit: NOTEBOOK_PAGE });
        },

        setNotebookCategory(category: ExamCategory | 'all'): void {
          patchState(store, { notebookCategory: category, notebookLimit: NOTEBOOK_PAGE });
        },

        setNotebookExam(examId: string | 'all'): void {
          patchState(store, { notebookExamId: examId, notebookLimit: NOTEBOOK_PAGE });
        },

        /** 切換「含實際演練」會改變哪些題算錯題，可能需要多載入幾回題目 */
        async setNotebookIncludeMock(include: boolean): Promise<void> {
          patchState(store, { notebookIncludeMock: include, notebookLimit: NOTEBOOK_PAGE });
          await loadNotebookItems();
        },

        showMoreNotebook(): void {
          patchState(store, { notebookLimit: store.notebookLimit() + NOTEBOOK_PAGE });
        },

        setNotebookShowLearned(show: boolean): void {
          patchState(store, { notebookShowLearned: show });
        },

        /** 單字「已學會」切換並存到雲端 */
        async toggleLearnedVocab(word: string): Promise<void> {
          const next = toggleIn(store.notebookLearnedVocab(), word);
          patchState(store, { notebookLearnedVocab: next });
          const userId = uid();
          if (!userId) return;
          try {
            await bookmarks.setBookmarks(userId, LEARNED_VOCAB_KEY, Array.from(next));
          } catch (e) {
            console.error('save learned vocab failed', e);
          }
        },

        /** 文法「已學會」切換並存到雲端；key 為 `文法型|重點` */
        async toggleLearnedGrammar(key: string): Promise<void> {
          const next = toggleIn(store.notebookLearnedGrammar(), key);
          patchState(store, { notebookLearnedGrammar: next });
          const userId = uid();
          if (!userId) return;
          try {
            await bookmarks.setBookmarks(userId, LEARNED_GRAMMAR_KEY, Array.from(next));
          } catch (e) {
            console.error('save learned grammar failed', e);
          }
        },

        /**
         * 從錯題本直接練習：取目前篩選與排序下的前 N 題（或全部），題目可跨多份考卷。
         * `source`：`wrong`＝還沒掌握的題、`marked`＝標記的題
         */
        startNotebookPractice(source: 'wrong' | 'marked', limit: number | null): void {
          const list = source === 'wrong' ? store.notebookWrong() : store.notebookMarked();
          const picked = limit ? list.slice(0, limit) : list;
          if (picked.length === 0) {
            patchState(store, { loadError: '這個範圍目前沒有題目。' });
            return;
          }
          patchState(store, {
            loadError: null,
            selectedExam: null,
            mode: 'practice',
            flatItems: picked.map((e) => ({ section: e.section, question: e.question })),
            currentIndex: 0,
            answers: {},
            markedQuestionIds: new Set(),
            attempt: {
              id: '',
              examId: NOTEBOOK_EXAM_ID,
              mode: 'practice',
              scopeKey: 'notebook',
              attemptNo: nextAttemptNo(store.attempts(), NOTEBOOK_EXAM_ID, 'practice'),
              status: 'in-progress',
              questionIds: picked.map((e) => e.question.id),
              answers: {},
              markedIds: [],
              currentIndex: 0,
              startedAt: null,
              updatedAt: null,
              completedAt: null,
              score: 0,
              total: picked.length,
              wrongQuestionIds: [],
              mock: null,
            },
            phase: 'taking',
          });
        },

        // Public Handlers — 作答中
        // --------------------------------------------------------------------
        selectOption(option: ExamOption): void {
          const q = store.currentQuestion();
          if (!q || store.mode() === 'review') return;
          // 練習：作答後鎖定，確保第一次作答是真實成績
          if (store.mode() === 'practice' && store.answers()[q.id]) return;
          patchState(store, (s) => ({ answers: { ...s.answers, [q.id]: option.id } }));
          if (store.mode() === 'practice') scheduleSave();
        },

        goTo(index: number): void {
          if (!store.stageIndices().includes(index)) return;
          patchState(store, { currentIndex: index });
          if (store.mode() === 'practice') scheduleSave();
        },

        next(): void {
          const pos = store.positionInStage();
          if (pos < store.stageIndices().length - 1) {
            patchState(store, { currentIndex: store.stageIndices()[pos + 1] });
            if (store.mode() === 'practice') scheduleSave();
          }
        },

        prev(): void {
          const pos = store.positionInStage();
          if (pos > 0) {
            patchState(store, { currentIndex: store.stageIndices()[pos - 1] });
            if (store.mode() === 'practice') scheduleSave();
          }
        },

        toggleMarkQuestion(questionId: string): void {
          const current = new Set(store.markedQuestionIds());
          if (current.has(questionId)) {
            current.delete(questionId);
          } else {
            current.add(questionId);
          }
          patchState(store, { markedQuestionIds: current });
          if (store.mode() === 'practice') scheduleSave();
        },

        isMarked(questionId: string): boolean {
          return store.markedQuestionIds().has(questionId);
        },

        /** 按「完成／交卷」：有未作答的題目先跳確認，否則直接交 */
        requestSubmit(): void {
          const unanswered = store.mode() === 'mock' ? store.stageIndices().length - store.stageAnsweredCount() : store.unansweredTotal();
          if (unanswered > 0) {
            patchState(store, { confirmSubmit: true });
          } else {
            void (store.mode() === 'mock' ? submitStage(false) : finishPractice());
          }
        },

        cancelSubmit(): void {
          patchState(store, { confirmSubmit: false });
        },

        async confirmSubmitNow(): Promise<void> {
          patchState(store, { confirmSubmit: false });
          await (store.mode() === 'mock' ? submitStage(false) : finishPractice());
        },

        /** 離開：練習自動存進度（可續做）；實演需確認，離開視為放棄；回顧直接離開 */
        async requestLeave(): Promise<void> {
          if (store.mode() === 'mock') {
            patchState(store, { confirmLeave: true });
            return;
          }
          if (store.mode() === 'practice') await saveProgressNow();
          const fromNotebook = store.attempt()?.examId === NOTEBOOK_EXAM_ID;
          resetToOverview();
          if (fromNotebook) void openNotebook();
        },

        cancelLeave(): void {
          patchState(store, { confirmLeave: false });
        },

        leaveMockConfirmed(): void {
          resetToOverview();
        },

        // Public Handlers — 結果頁
        // --------------------------------------------------------------------
        /** 結果頁「再練一次／重新測驗」：回主畫面並開啟選擇對話框 */
        retrySameExam(): void {
          const exam = store.selectedExam();
          const fromNotebook = store.attempt()?.examId === NOTEBOOK_EXAM_ID;
          resetToOverview();
          if (fromNotebook) void openNotebook();
          else if (exam) void openStartDialog(exam);
        },
      };
    },
  ),
  withHooks({
    onDestroy(store) {
      store.dispose();
    },
  }),
);

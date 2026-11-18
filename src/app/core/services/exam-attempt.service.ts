// Cores
import { EnvironmentInjector, Injectable, inject, runInInjectionContext } from '@angular/core';
// Angular Fire
import {
  Firestore,
  addDoc,
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from '@angular/fire/firestore';
// Shared
import type { ExamAttempt, ExamAttemptMockInfo, ExamAttemptMode } from '@core/models/exam-attempt.model';

/** 建立新作答時需要的資料 */
export interface CreateAttemptInput {
  /** 考卷 id */
  examId: string;
  /** 作答模式 */
  mode: ExamAttemptMode;
  /** 範圍標記 */
  scopeKey: string;
  /** 第幾次 */
  attemptNo: number;
  /** 本次題目 id（依序） */
  questionIds: string[];
  /** 是否直接以完成狀態建立（實際演練交卷時才存） */
  completed?: boolean;
  /** 已作答內容 */
  answers?: Record<string, string>;
  /** 標記題 */
  markedIds?: string[];
  /** 完成時才有的成績 */
  score?: number;
  /** 完成時才有的錯題 */
  wrongQuestionIds?: string[];
  /** 實際演練資訊 */
  mock?: ExamAttemptMockInfo | null;
}

/** 進行中的進度更新 */
export interface AttemptProgressPatch {
  /** 已作答內容 */
  answers: Record<string, string>;
  /** 標記題 */
  markedIds: string[];
  /** 目前題目索引 */
  currentIndex: number;
}

/** 完成時的更新 */
export interface AttemptCompletePatch extends AttemptProgressPatch {
  /** 答對題數 */
  score: number;
  /** 答錯／未作答的題目 id */
  wrongQuestionIds: string[];
}

@Injectable({ providedIn: 'root' })
export class ExamAttemptService {
  // Dependencies
  // --------------------------------------------------------------------
  private firestore = inject(Firestore);
  private injector = inject(EnvironmentInjector);

  private col(uid: string): string {
    return `users/${uid}/examAttempts`;
  }

  // general
  // --------------------------------------------------------------------
  /** 列出使用者所有作答（只用單欄位排序，不需複合索引；依考卷分組在前端做） */
  async listAll(uid: string, count = 300): Promise<ExamAttempt[]> {
    const snap = await runInInjectionContext(this.injector, () =>
      getDocs(query(collection(this.firestore, this.col(uid)), orderBy('startedAt', 'desc'), limit(count))),
    );
    return snap.docs.map((d) => ({ ...(d.data() as Omit<ExamAttempt, 'id'>), id: d.id }));
  }

  /** 建立一筆作答，回傳 document id */
  async create(uid: string, input: CreateAttemptInput): Promise<string> {
    const completed = input.completed === true;
    const ref = await runInInjectionContext(this.injector, () =>
      addDoc(collection(this.firestore, this.col(uid)), {
        examId: input.examId,
        mode: input.mode,
        scopeKey: input.scopeKey,
        attemptNo: input.attemptNo,
        status: completed ? 'completed' : 'in-progress',
        questionIds: input.questionIds,
        answers: input.answers ?? {},
        markedIds: input.markedIds ?? [],
        currentIndex: 0,
        startedAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        completedAt: completed ? serverTimestamp() : null,
        score: input.score ?? 0,
        total: input.questionIds.length,
        wrongQuestionIds: input.wrongQuestionIds ?? [],
        mock: input.mock ?? null,
      }),
    );
    return ref.id;
  }

  /** 儲存進行中的進度（練習中途離開可續做） */
  async saveProgress(uid: string, attemptId: string, patch: AttemptProgressPatch): Promise<void> {
    await runInInjectionContext(this.injector, () =>
      updateDoc(doc(this.firestore, this.col(uid), attemptId), { ...patch, updatedAt: serverTimestamp() }),
    );
  }

  /** 標記完成並寫入成績 */
  async complete(uid: string, attemptId: string, patch: AttemptCompletePatch): Promise<void> {
    await runInInjectionContext(this.injector, () =>
      updateDoc(doc(this.firestore, this.col(uid), attemptId), {
        ...patch,
        status: 'completed',
        updatedAt: serverTimestamp(),
        completedAt: serverTimestamp(),
      }),
    );
  }
}

import { EnvironmentInjector, Injectable, inject, runInInjectionContext } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import {
  Firestore,
  collection,
  addDoc,
  doc,
  setDoc,
  increment,
  serverTimestamp,
} from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class LearningRecordService {
  private firestore = inject(Firestore);
  private auth = inject(Auth);
  private injector = inject(EnvironmentInjector);

  private get uid(): string | null {
    return this.auth.currentUser?.uid ?? null;
  }

  async saveExamResult(data: {
    examId: string;
    sectionId: string;
    score: number;
    total: number;
    wrongQuestionIds: string[];
  }): Promise<void> {
    const uid = this.uid;
    if (!uid) return;
    await runInInjectionContext(this.injector, () =>
      addDoc(collection(this.firestore, `users/${uid}/examHistory`), {
        ...data,
        completedAt: serverTimestamp(),
      })
    );
  }

  async saveVocabSession(data: {
    groupId: string | null;
    total: number;
    knownCount: number;
    knownIds: string[];
  }): Promise<void> {
    const uid = this.uid;
    if (!uid) return;

    await runInInjectionContext(this.injector, () =>
      addDoc(collection(this.firestore, `users/${uid}/vocabSessions`), {
        groupId: data.groupId,
        total: data.total,
        knownCount: data.knownCount,
        completedAt: serverTimestamp(),
      })
    );

    for (const wordId of data.knownIds) {
      await runInInjectionContext(this.injector, () =>
        setDoc(
          doc(this.firestore, `users/${uid}/vocabRecords/${wordId}`),
          { lastSeen: serverTimestamp(), knownCount: increment(1) },
          { merge: true },
        )
      );
    }
  }
}

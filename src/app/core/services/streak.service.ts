// Cores
import { EnvironmentInjector, Injectable, inject, runInInjectionContext } from '@angular/core';
// Angular Fire
import { Firestore, Timestamp, collection, getDocs } from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class StreakService {
  // Dependencies
  // --------------------------------------------------------------------
  private firestore = inject(Firestore);
  private injector = inject(EnvironmentInjector);

  // general
  // --------------------------------------------------------------------
  /**
   * 估算連續學習天數：合併 vocabRecords.lastReviewed 與 examHistory.completedAt
   * 兩種活動日期，從今天往回數連續有活動的天數。非精確的每日登入追蹤。
   */
  async getStreak(uid: string): Promise<number> {
    const [recordsSnap, historySnap] = await Promise.all([
      runInInjectionContext(this.injector, () =>
        getDocs(collection(this.firestore, `users/${uid}/vocabRecords`)),
      ),
      runInInjectionContext(this.injector, () =>
        getDocs(collection(this.firestore, `users/${uid}/examHistory`)),
      ),
    ]);

    const activeDates = new Set<string>();

    recordsSnap.docs.forEach((d) => {
      const lastReviewed = d.data()['lastReviewed'] as string | undefined;
      if (lastReviewed) activeDates.add(lastReviewed);
    });

    historySnap.docs.forEach((d) => {
      const completedAt = d.data()['completedAt'] as Timestamp | undefined;
      if (completedAt) activeDates.add(completedAt.toDate().toISOString().slice(0, 10));
    });

    let streak = 0;
    const cursor = new Date();
    cursor.setHours(0, 0, 0, 0);

    while (activeDates.has(cursor.toISOString().slice(0, 10))) {
      streak++;
      cursor.setDate(cursor.getDate() - 1);
    }

    return streak;
  }
}

// Cores
import { EnvironmentInjector, Injectable, inject, runInInjectionContext } from '@angular/core';
// Angular Fire
import { Firestore, doc, getDoc, setDoc } from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class BookmarkService {
  // Dependencies
  // --------------------------------------------------------------------
  private firestore = inject(Firestore);
  private injector = inject(EnvironmentInjector);

  // general
  // --------------------------------------------------------------------
  /** 讀取 users/{uid}/bookmarks/{key} 文件的 ids 陣列，沒有就回傳空陣列 */
  async getBookmarks(uid: string, key: string): Promise<string[]> {
    const ref = doc(this.firestore, `users/${uid}/bookmarks/${key}`);
    const snap = await runInInjectionContext(this.injector, () => getDoc(ref));
    return snap.exists() ? ((snap.data()['ids'] as string[]) ?? []) : [];
  }

  async setBookmarks(uid: string, key: string, ids: string[]): Promise<void> {
    const ref = doc(this.firestore, `users/${uid}/bookmarks/${key}`);
    await runInInjectionContext(this.injector, () => setDoc(ref, { ids }));
  }
}

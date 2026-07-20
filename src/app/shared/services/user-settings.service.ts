// Cores
import { EnvironmentInjector, Injectable, inject, runInInjectionContext } from '@angular/core';
// Angular Fire
import { Firestore, doc, getDoc, setDoc } from '@angular/fire/firestore';
// Models
import type { UserSettings } from '@shared/models/user-settings.model';

@Injectable({ providedIn: 'root' })
export class UserSettingsService {
  // Dependencies
  // --------------------------------------------------------------------
  private firestore = inject(Firestore);
  private injector = inject(EnvironmentInjector);

  // general
  // --------------------------------------------------------------------
  async get(uid: string): Promise<UserSettings | null> {
    const ref = doc(this.firestore, `users/${uid}/settings/general`);
    const snap = await runInInjectionContext(this.injector, () => getDoc(ref));
    return snap.exists() ? (snap.data() as UserSettings) : null;
  }

  async set(uid: string, settings: UserSettings): Promise<void> {
    const ref = doc(this.firestore, `users/${uid}/settings/general`);
    await runInInjectionContext(this.injector, () => setDoc(ref, settings));
  }
}

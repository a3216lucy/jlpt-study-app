// Cores
import { Injectable, computed, inject } from '@angular/core';
// Angular Fire
import { Auth, GoogleAuthProvider, signInWithPopup, signOut, user } from '@angular/fire/auth';
// Angular
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // Dependencies
  // --------------------------------------------------------------------
  private auth = inject(Auth);

  // Signals
  // --------------------------------------------------------------------
  readonly currentUser = toSignal(user(this.auth), { initialValue: null });
  readonly isLoggedIn = computed(() => !!this.currentUser());

  // Public Handlers
  // --------------------------------------------------------------------
  async loginWithGoogle(): Promise<void> {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(this.auth, provider);
  }

  async logout(): Promise<void> {
    await signOut(this.auth);
  }
}

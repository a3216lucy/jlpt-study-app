// Cores
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
// Angular
import { Router } from '@angular/router';
// Services
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPage {
  // Dependencies
  // --------------------------------------------------------------------
  private auth = inject(AuthService);
  private router = inject(Router);

  // Signals
  // --------------------------------------------------------------------
  readonly loading = signal(false);
  readonly error = signal('');

  // Public Handlers
  // --------------------------------------------------------------------
  async loginWithGoogle() {
    this.loading.set(true);
    this.error.set('');
    try {
      await this.auth.loginWithGoogle();
      this.router.navigate(['/']);
    } catch {
      this.error.set('登入失敗，請再試一次');
    } finally {
      this.loading.set(false);
    }
  }
}

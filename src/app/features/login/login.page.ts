// Cores
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
// Angular
import { Router } from '@angular/router';
// Services
import { AuthService } from '@core/services/auth.service';

interface LevelChip {
  label: string;
  bg: string;
  text: string;
}

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

  // Constants
  // --------------------------------------------------------------------
  readonly levels: LevelChip[] = [
    { label: 'N5', bg: '#E3F1EA', text: '#4F9B7E' },
    { label: 'N4', bg: '#FBEAD9', text: '#C08A4E' },
    { label: 'N3', bg: '#FCF3D2', text: '#B99A3B' },
    { label: 'N2', bg: '#FCE3E8', text: '#D97690' },
    { label: 'N1', bg: '#E7E2F4', text: '#8D7FC7' },
  ];

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

  loginWithApple() {
    this.error.set('Apple 登入即將推出，敬請期待');
  }

  loginWithLine() {
    this.error.set('LINE 登入即將推出，敬請期待');
  }
}

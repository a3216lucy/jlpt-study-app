import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  readonly loading = signal(false);
  readonly error = signal('');

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

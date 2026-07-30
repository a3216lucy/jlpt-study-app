// Cores
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
// Angular
import { Router } from '@angular/router';
// Store
import { ProfileStore } from '../../profile.store';

@Component({
  selector: 'app-profile-account-card',
  templateUrl: './profile-account-card.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileAccountCardComponent {
  // Dependencies
  // --------------------------------------------------------------------
  readonly store = inject(ProfileStore);
  private readonly router = inject(Router);

  // Public Handlers
  // --------------------------------------------------------------------
  async logout(): Promise<void> {
    await this.store.logout();
    this.router.navigate(['/login']);
  }
}

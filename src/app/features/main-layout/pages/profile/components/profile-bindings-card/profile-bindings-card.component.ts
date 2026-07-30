// Cores
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
// Store
import { ProfileStore } from '../../profile.store';

type ThirdPartyProvider = 'LINE' | 'Apple';

@Component({
  selector: 'app-profile-bindings-card',
  templateUrl: './profile-bindings-card.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileBindingsCardComponent {
  // Dependencies
  // --------------------------------------------------------------------
  readonly store = inject(ProfileStore);

  // Signals
  // --------------------------------------------------------------------
  readonly bindMessage = signal('');

  // Public Handlers
  // --------------------------------------------------------------------
  bindComingSoon(provider: ThirdPartyProvider): void {
    this.bindMessage.set(`${provider} 綁定即將推出，敬請期待`);
  }
}

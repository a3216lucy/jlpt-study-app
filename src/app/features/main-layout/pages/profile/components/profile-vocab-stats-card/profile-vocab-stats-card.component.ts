// Cores
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
// Store
import { ProfileStore } from '../../profile.store';

@Component({
  selector: 'app-profile-vocab-stats-card',
  templateUrl: './profile-vocab-stats-card.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileVocabStatsCardComponent {
  // Dependencies
  // --------------------------------------------------------------------
  readonly store = inject(ProfileStore);
}

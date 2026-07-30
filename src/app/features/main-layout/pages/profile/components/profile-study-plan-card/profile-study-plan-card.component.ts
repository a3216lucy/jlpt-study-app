// Cores
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
// Store
import { ProfileStore } from '../../profile.store';

@Component({
  selector: 'app-profile-study-plan-card',
  templateUrl: './profile-study-plan-card.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileStudyPlanCardComponent {
  // Dependencies
  // --------------------------------------------------------------------
  readonly store = inject(ProfileStore);
}

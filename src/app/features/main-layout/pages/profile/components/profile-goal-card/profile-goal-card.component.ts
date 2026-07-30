// Cores
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
// Store
import { ProfileStore } from '../../profile.store';

@Component({
  selector: 'app-profile-goal-card',
  templateUrl: './profile-goal-card.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileGoalCardComponent {
  // Dependencies
  // --------------------------------------------------------------------
  readonly store = inject(ProfileStore);

  // Constants
  // --------------------------------------------------------------------
  readonly levelOptions = ['N1', 'N2', 'N3', 'N4', 'N5'];

  // Public Handlers
  // --------------------------------------------------------------------
  onExamDateChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    if (value) this.store.setDraftExamDate(value);
  }

  formatDateStr(dateStr: string): string {
    return dateStr.replaceAll('-', '/');
  }
}

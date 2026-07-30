// Cores
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
// Store
import { HomeStore } from '../../home.store';

@Component({
  selector: 'app-home-mastery',
  templateUrl: './home-mastery.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeMasteryComponent {
  // Dependencies
  // --------------------------------------------------------------------
  readonly store = inject(HomeStore);
}

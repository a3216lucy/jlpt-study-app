// Cores
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
// Store
import { HomeStore } from '../../home.store';

@Component({
  selector: 'app-home-scores',
  templateUrl: './home-scores.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeScoresComponent {
  // Dependencies
  // --------------------------------------------------------------------
  readonly store = inject(HomeStore);

  // Public Handlers
  // --------------------------------------------------------------------
  scorePercent(score: number, total: number): number {
    return total > 0 ? Math.round((score / total) * 100) : 0;
  }

  scoreColorClass(percent: number): string {
    return percent >= 80 ? 'text-matcha' : 'text-accent';
  }
}

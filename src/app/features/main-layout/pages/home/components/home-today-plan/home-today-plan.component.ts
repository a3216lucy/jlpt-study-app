// Cores
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
// Angular
import { Router, RouterLink } from '@angular/router';
// Store
import { HomeStore } from '../../home.store';

const CHIP_CLASS: Record<'matcha' | 'accent' | 'amber', { bg: string; text: string }> = {
  matcha: { bg: 'bg-matcha-soft', text: 'text-matcha' },
  accent: { bg: 'bg-accent-soft', text: 'text-accent' },
  amber: { bg: 'bg-[#FFF3D6]', text: 'text-[#B08514]' },
};

@Component({
  selector: 'app-home-today-plan',
  templateUrl: './home-today-plan.component.html',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeTodayPlanComponent {
  // Dependencies
  // --------------------------------------------------------------------
  readonly store = inject(HomeStore);
  private readonly router = inject(Router);

  // Public Handlers
  // --------------------------------------------------------------------
  startTodayStudy(): void {
    this.router.navigate(['/vocab'], { queryParams: { start: 'today' } });
  }

  chipBgClass(color: 'matcha' | 'accent' | 'amber'): string {
    return CHIP_CLASS[color].bg;
  }

  chipTextClass(color: 'matcha' | 'accent' | 'amber'): string {
    return CHIP_CLASS[color].text;
  }
}

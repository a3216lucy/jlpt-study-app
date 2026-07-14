// Cores
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
// Angular
import { Router, RouterLink } from '@angular/router';
// Store
import { HomeStore } from './home.store';

const CHIP_CLASS: Record<'matcha' | 'accent' | 'amber', { bg: string; text: string }> = {
  matcha: { bg: 'bg-matcha-soft', text: 'text-matcha' },
  accent: { bg: 'bg-accent-soft', text: 'text-accent' },
  amber: { bg: 'bg-[#FFF3D6]', text: 'text-[#B08514]' },
};

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [HomeStore],
})
export class HomePage implements OnInit {
  // Dependencies
  // --------------------------------------------------------------------
  readonly store = inject(HomeStore);
  private readonly router = inject(Router);

  // Lifecycle
  // --------------------------------------------------------------------
  ngOnInit() {
    this.store.init();
  }

  // Public Handlers
  // --------------------------------------------------------------------
  startTodayStudy() {
    this.router.navigate(['/vocab'], { queryParams: { start: 'today' } });
  }

  chipBgClass(color: 'matcha' | 'accent' | 'amber'): string {
    return CHIP_CLASS[color].bg;
  }

  chipTextClass(color: 'matcha' | 'accent' | 'amber'): string {
    return CHIP_CLASS[color].text;
  }

  scorePercent(score: number, total: number): number {
    return total > 0 ? Math.round((score / total) * 100) : 0;
  }

  scoreColorClass(percent: number): string {
    return percent >= 80 ? 'text-matcha' : 'text-accent';
  }
}

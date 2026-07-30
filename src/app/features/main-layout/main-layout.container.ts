// Cores
import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
// Angular
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
// Services
import { AuthService } from '@core/services/auth.service';
import { StreakService } from '@core/services/streak.service';

interface NavItem {
  label: string;
  routerLink: string;
  icon: string;
  exact: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { label: '首頁', routerLink: '/', icon: 'fa-house', exact: true },
  { label: '單詞', routerLink: '/vocab', icon: 'fa-language', exact: false },
  { label: '句型', routerLink: '/sentence-patterns', icon: 'fa-quote-right', exact: false },
  { label: '文法', routerLink: '/grammar-review', icon: 'fa-wand-magic-sparkles', exact: false },
  { label: '考古題', routerLink: '/past-exam', icon: 'fa-file-lines', exact: false },
  { label: '個人中心', routerLink: '/profile', icon: 'fa-user', exact: false },
];

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './main-layout.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayoutContainer {
  // Dependencies
  // --------------------------------------------------------------------
  readonly auth = inject(AuthService);
  private readonly streakService = inject(StreakService);

  // Signals
  // --------------------------------------------------------------------
  readonly streak = signal<number | null>(null);

  private readonly _loadStreak = effect(() => {
    const uid = this.auth.currentUser()?.uid;
    if (!uid) {
      this.streak.set(null);
      return;
    }
    this.streakService.getStreak(uid).then((n) => this.streak.set(n));
  });

  // Constants
  // --------------------------------------------------------------------
  readonly navItems = NAV_ITEMS;
}

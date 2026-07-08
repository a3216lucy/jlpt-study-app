// Cores
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
// Angular
import { Router } from '@angular/router';
// Angular Fire
import type { Timestamp } from '@angular/fire/firestore';
// Store
import { ProfileStore } from './profile.store';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ProfileStore, ProfileService],
})
export class ProfilePage implements OnInit {
  // Dependencies
  // --------------------------------------------------------------------
  readonly store = inject(ProfileStore);
  private router = inject(Router);

  // Lifecycle
  // --------------------------------------------------------------------
  ngOnInit() {
    this.store.init();
  }

  // Public Handlers
  // --------------------------------------------------------------------
  async logout() {
    await this.store.logout();
    this.router.navigate(['/login']);
  }

  formatDate(ts: Timestamp | null | undefined): string {
    if (!ts) return '—';
    return ts.toDate().toLocaleDateString('zh-TW', { year: 'numeric', month: '2-digit', day: '2-digit' });
  }

  scorePercent(score: number, total: number): number {
    return total > 0 ? Math.round((score / total) * 100) : 0;
  }

  scoreColor(percent: number): string {
    if (percent >= 80) return 'text-emerald-600';
    if (percent >= 60) return 'text-amber-600';
    return 'text-rose-600';
  }
}

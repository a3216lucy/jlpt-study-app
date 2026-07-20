// Cores
import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
// Angular
import { Router } from '@angular/router';
// Angular Fire
import type { Timestamp } from '@angular/fire/firestore';
// Store
import { ProfileStore } from './profile.store';
import { ProfileService } from './profile.service';

type ThirdPartyProvider = 'LINE' | 'Apple';

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

  // Constants
  // --------------------------------------------------------------------
  readonly levelOptions = ['N1', 'N2', 'N3', 'N4', 'N5'];

  // Signals
  // --------------------------------------------------------------------
  readonly bindMessage = signal('');

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

  bindComingSoon(provider: ThirdPartyProvider) {
    this.bindMessage.set(`${provider} 綁定即將推出，敬請期待`);
  }

  onExamDateChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    if (value) this.store.draftExamDate.set(value);
  }

  formatDate(ts: Timestamp | null | undefined): string {
    if (!ts) return '—';
    return ts.toDate().toLocaleDateString('zh-TW', { year: 'numeric', month: '2-digit', day: '2-digit' });
  }

  formatDateStr(dateStr: string): string {
    return dateStr.replaceAll('-', '/');
  }

  scorePercent(score: number, total: number): number {
    return total > 0 ? Math.round((score / total) * 100) : 0;
  }

  scoreColorClass(percent: number): string {
    return percent >= 80 ? 'text-matcha' : 'text-accent';
  }
}

// Cores
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
// Angular Fire
import type { Timestamp } from '@angular/fire/firestore';
// Store
import { ProfileStore } from '../../profile.store';

@Component({
  selector: 'app-profile-exam-history-card',
  templateUrl: './profile-exam-history-card.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileExamHistoryCardComponent {
  // Dependencies
  // --------------------------------------------------------------------
  readonly store = inject(ProfileStore);

  // Public Handlers
  // --------------------------------------------------------------------
  formatDate(ts: Timestamp | null | undefined): string {
    if (!ts) return '—';
    return ts.toDate().toLocaleDateString('zh-TW', { year: 'numeric', month: '2-digit', day: '2-digit' });
  }

  scorePercent(score: number, total: number): number {
    return total > 0 ? Math.round((score / total) * 100) : 0;
  }

  scoreColorClass(percent: number): string {
    return percent >= 80 ? 'text-matcha' : 'text-accent';
  }
}

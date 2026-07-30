// Cores
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
// Store
import { ProfileStore } from './profile.store';
import { ProfileService } from './profile.service';
// Components
import { ProfileAccountCardComponent } from './components/profile-account-card/profile-account-card.component';
import { ProfileGoalCardComponent } from './components/profile-goal-card/profile-goal-card.component';
import { ProfileBindingsCardComponent } from './components/profile-bindings-card/profile-bindings-card.component';
import { ProfileStudyPlanCardComponent } from './components/profile-study-plan-card/profile-study-plan-card.component';
import { ProfileVocabStatsCardComponent } from './components/profile-vocab-stats-card/profile-vocab-stats-card.component';
import { ProfileExamHistoryCardComponent } from './components/profile-exam-history-card/profile-exam-history-card.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ProfileAccountCardComponent,
    ProfileGoalCardComponent,
    ProfileBindingsCardComponent,
    ProfileStudyPlanCardComponent,
    ProfileVocabStatsCardComponent,
    ProfileExamHistoryCardComponent,
  ],
  providers: [ProfileStore, ProfileService],
})
export class ProfilePage implements OnInit {
  // Dependencies
  // --------------------------------------------------------------------
  readonly store = inject(ProfileStore);

  // Lifecycle
  // --------------------------------------------------------------------
  ngOnInit() {
    this.store.init();
  }
}

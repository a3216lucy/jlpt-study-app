// Cores
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
// Store
import { HomeStore } from './home.store';
// Components
import { HomeTodayPlanComponent } from './components/home-today-plan/home-today-plan.component';
import { HomeMasteryComponent } from './components/home-mastery/home-mastery.component';
import { HomeScoresComponent } from './components/home-scores/home-scores.component';
import { HomeQuickEntriesComponent } from './components/home-quick-entries/home-quick-entries.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  standalone: true,
  imports: [HomeTodayPlanComponent, HomeMasteryComponent, HomeScoresComponent, HomeQuickEntriesComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [HomeStore],
})
export class HomePage implements OnInit {
  // Dependencies
  // --------------------------------------------------------------------
  readonly store = inject(HomeStore);

  // Lifecycle
  // --------------------------------------------------------------------
  ngOnInit() {
    this.store.init();
  }
}

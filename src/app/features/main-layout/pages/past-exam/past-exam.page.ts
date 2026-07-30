// Cores
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
// Store
import { PastExamStore } from './past-exam.store';
// Components
import { PastExamOverviewComponent } from './components/past-exam-overview/past-exam-overview.component';
import { PastExamTakingComponent } from './components/past-exam-taking/past-exam-taking.component';
import { PastExamResultComponent } from './components/past-exam-result/past-exam-result.component';

@Component({
  selector: 'app-past-exam',
  templateUrl: './past-exam.page.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PastExamOverviewComponent, PastExamTakingComponent, PastExamResultComponent],
  providers: [PastExamStore],
})
export class PastExamPage implements OnInit {
  // Dependencies
  // --------------------------------------------------------------------
  readonly store = inject(PastExamStore);

  // Lifecycle
  // --------------------------------------------------------------------
  ngOnInit() {
    this.store.init();
  }
}

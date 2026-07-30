// Cores
import { ChangeDetectionStrategy, Component } from '@angular/core';
// Angular
import { RouterLink } from '@angular/router';
// Store
import { QUICK_ENTRIES } from '../../home.store';

@Component({
  selector: 'app-home-quick-entries',
  templateUrl: './home-quick-entries.component.html',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeQuickEntriesComponent {
  // Constants
  // --------------------------------------------------------------------
  readonly quickEntries = QUICK_ENTRIES;
}

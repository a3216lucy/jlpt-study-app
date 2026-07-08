// Cores
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
// Angular
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
// Services
import { AuthService } from '@core/services/auth.service';

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
}

import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

import { CustomMenuService } from '../services';
import { CurrentUser } from '../components/current-user/current-user';

@Component({
  selector: 'admin-dashboard',
  imports: [RouterOutlet, CurrentUser, RouterLink],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.scss',
})
export class AdminDashboard {
  public customMenuService = inject(CustomMenuService);
  public isMenuOpen = signal(true);

  openCloseMenu() {
    this.isMenuOpen.set(!this.isMenuOpen());
  }
}

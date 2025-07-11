import { computed, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';

import { AuthService } from '../../api';

export interface SubMenuItem {
  label: string;
  baseUrl: string;
  subroutes: string[];
  isActive?: boolean;
}

export interface MenuItem {
  label: string;
  icon: string;
  id: string; // colapseName
  isActive: boolean;
  submenu: SubMenuItem[];
}

@Injectable({
  providedIn: 'root',
})
export class CustomMenuService {
  private router = inject(Router);
  private authService = inject(AuthService);
  public openMenuIndex = signal<number | null>(null);
  public lastMenuItemActiveId = signal<string>('collapseBusiness');
  private isMobile = signal<boolean>(false);
  private breakpointObserver = inject(BreakpointObserver);

  private fullMenu = signal<MenuItem[]>([
    {
      label: 'We Chess',
      icon: 'fas fa-user-tie me-2',
      id: 'collapseBusiness',
      isActive: false,
      submenu: [
        {
          label: 'Players',
          baseUrl: '/admin/list-players',
          subroutes: ['list-players', 'detail-player'],
        },
      ],
    },
    {
      label: 'Administration',
      icon: 'fas fa-user-tie me-2',
      id: 'collapseAdministration',
      isActive: false,
      submenu: [
        {
          label: 'Users',
          baseUrl: '/admin/list-users',
          subroutes: ['list-users', 'detail-user'],
        },
      ],
    },
  ]);

  private webSiteMenuItem = signal<MenuItem>({
    label: 'Website',
    icon: 'fas fa-globe me-2',
    id: 'collapseWebsite',
    isActive: false,
    submenu: [
      {
        label: 'Home',
        baseUrl: '',
        subroutes: ['/'],
      },
    ],
  });

  public menu = computed(() => {
    const items = [...this.fullMenu()];
    if (this.isMobile()) {
      items.push(this.webSiteMenuItem());
    }

    const isTeacher = this.authService.isTeacher;
    const isAdmin = this.authService.isAdmin; // Access computed signal for reactivity

    return this.fullMenu().filter((menuItem) => {
      if (!isTeacher) return false;

      if (menuItem.id === 'collapseAdministration') {
        return isAdmin;
      }

      return true;
    });
  });

  constructor() {
    this.breakpointObserver
      .observe(['(max-width: 767px)'])
      .subscribe((result) => {
        this.isMobile.set(result.matches);
      });
  }

  toggleMenuParent(id: string): void {
    const menuToUpdate = this.fullMenu().map((menuItem) => {
      if (menuItem.id === id) {
        // This is the clicked menu item, toggle its active state
        return { ...menuItem, isActive: !menuItem.isActive };
      } else {
        // This is not the clicked menu item, ensure it's inactive
        return { ...menuItem, isActive: false };
      }
    });

    if (id == this.webSiteMenuItem().id) {
      this.webSiteMenuItem.set({
        ...this.webSiteMenuItem(),
        isActive: !this.webSiteMenuItem().isActive,
      });
    } else {
      this.webSiteMenuItem.set({
        ...this.webSiteMenuItem(),
        isActive: false,
      });
    }

    this.fullMenu.set(menuToUpdate);

    // Find if any menu is active after the update
    const activeMenu = menuToUpdate.find((menu) => menu.isActive);

    if (activeMenu) {
      this.lastMenuItemActiveId.set(activeMenu.id);
    } else if (this.webSiteMenuItem().isActive) {
      this.lastMenuItemActiveId.set(this.webSiteMenuItem().id);
    } else {
      // No menu is active
      this.lastMenuItemActiveId.set('');
    }
  }

  navigateToRoute(route: string): void {
    this.router.navigateByUrl(`/${route}`);
  }
}

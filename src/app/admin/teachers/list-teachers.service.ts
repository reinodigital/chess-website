import { inject, Injectable, signal } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { SecurityRoles } from '../../enums';

@Injectable({
  providedIn: 'root',
})
export class ListTeachersService {
  private readonly fb = inject(FormBuilder);

  // PAGINATION
  public total = signal<number>(0);
  public lastPageTeachersList = signal<number>(1);

  // FILTERS
  public filtersOpen = signal<boolean>(false);
  public filters = signal<any>({
    role: SecurityRoles.TEACHER,
  });
  public isActiveFilters = signal<boolean>(false);
  public searchForm = signal<FormGroup>(
    this.fb.group({
      name: ['', []],
      username: ['', []],
      country: ['', []],
      isActive: ['', []],
    })
  );

  public getClassForUserRole(role: string): string {
    let roleClass = '';

    switch (role) {
      case SecurityRoles.ADMIN:
        roleClass = 'badge bg-label-primary';
        break;
      case SecurityRoles.PLAYER:
        roleClass = 'badge bg-label-success';
        break;
      case SecurityRoles.TEACHER:
        roleClass = 'badge bg-label-light';
        break;
      case SecurityRoles.SUPER_ADMIN:
        roleClass = 'badge bg-label-danger';
        break;

      default:
        break;
    }

    return roleClass;
  }

  openCloseBoxFilter(): void {
    this.filtersOpen.update((statusFilter) => !statusFilter);
  }

  triggerFormSubmit(): void {
    this.filters.update((filters) => ({
      ...filters,
      ...this.searchForm().value,
    }));

    // Set page to 1 to allow pagination by filters
    this.lastPageTeachersList.set(1);
    this.isActiveFilters.set(true);
  }

  restartFilters(): void {
    // Set page to 1 to allow pagination by filters
    this.lastPageTeachersList.set(1);
    this.isActiveFilters.set(false);
    this.filters.set({
      role: SecurityRoles.TEACHER,
    });
    this.searchForm().reset();
  }
}

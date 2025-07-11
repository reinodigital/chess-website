import { inject, Injectable, signal } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ListBotsService {
  private readonly fb = inject(FormBuilder);

  // PAGINATION
  public total = signal<number>(0);
  public lastPage = signal<number>(1);

  // FILTERS
  public filtersOpen = signal<boolean>(false);
  public filters = signal<any>({});
  public isActiveFilters = signal<boolean>(false);
  public searchForm = signal<FormGroup>(
    this.fb.group({
      name: ['', []],
      difficulty: ['', []],
    })
  );

  openCloseBoxFilter(): void {
    this.filtersOpen.update((statusFilter) => !statusFilter);
  }

  triggerFormSubmit(): void {
    this.filters.update((filters) => ({
      ...filters,
      ...this.searchForm().value,
    }));

    // Set page to 1 to allow pagination by filters
    this.lastPage.set(1);
    this.isActiveFilters.set(true);
  }

  restartFilters(): void {
    // Set page to 1 to allow pagination by filters
    this.lastPage.set(1);
    this.isActiveFilters.set(false);
    this.filters.set({});
    this.searchForm().reset();
  }
}

import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { AuthService } from '../../../api/auth.service';
import { ListTeachersService } from '../list-teachers.service';
import { Pagination } from '../../../shared/components/pagination/pagination';

import { IAuth } from '../../../interfaces';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'list-teachers',
  standalone: true,
  imports: [CommonModule, RouterLink, Pagination, ReactiveFormsModule],
  templateUrl: './list-teachers.html',
  styleUrl: './list-teachers.scss',
})
export default class ListTeachers {
  private readonly authService = inject(AuthService);
  private readonly listTeachersService = inject(ListTeachersService);

  // USERS
  public users = signal<IAuth[]>([]);

  // PAGINATION
  public limit: number = 4;
  public currentPage = computed<number>(() =>
    this.listTeachersService.lastPageTeachersList()
  );
  public total = computed<number>(() => this.listTeachersService.total());
  public isLoading = signal<boolean>(true);

  // FILTERS
  public filtersOpen = computed<boolean>(() =>
    this.listTeachersService.filtersOpen()
  );
  public filters = computed<any>(() => this.listTeachersService.filters());
  public isActiveFilters = computed<boolean>(() =>
    this.listTeachersService.isActiveFilters()
  );
  public searchForm = computed(() => this.listTeachersService.searchForm());

  ngOnInit(): void {
    this.fetchAllTeachers();
  }

  fetchAllTeachers(): void {
    this.authService
      .fetchAll(this.limit, this.currentPage(), this.filters())
      .subscribe((resp) => {
        if (resp && resp.total >= 0) {
          this.listTeachersService.total.set(resp.total);
          this.users.set(resp.users);
        }
        this.isLoading.set(false);
      });
  }

  // BOX FILTERS
  openCloseFilters(): void {
    this.listTeachersService.openCloseBoxFilter();
  }

  searchFormSubmit(): void {
    this.listTeachersService.triggerFormSubmit();
    this.fetchAllTeachers();
  }

  restartFilters(): void {
    // Set page to 1 to allow pagination by filters
    this.listTeachersService.restartFilters();
    this.fetchAllTeachers();
  }

  // DETECT PAGE
  detectChangePage(page: number) {
    this.isLoading.set(true);
    this.listTeachersService.lastPageTeachersList.set(page);

    this.fetchAllTeachers();
  }
}

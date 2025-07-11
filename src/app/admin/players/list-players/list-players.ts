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
import { ListPlayersService } from '../list-players.service';
import { Pagination } from '../../../shared/components/pagination/pagination';

import { IAuth } from '../../../interfaces';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'list-players',
  standalone: true,
  imports: [CommonModule, RouterLink, Pagination, ReactiveFormsModule],
  templateUrl: './list-players.html',
  styleUrl: './list-players.scss',
})
export default class ListPlayers {
  private readonly authService = inject(AuthService);
  private readonly listPlayersService = inject(ListPlayersService);

  // USERS
  public users = signal<IAuth[]>([]);

  // PAGINATION
  public limit: number = 4;
  public currentPage = computed<number>(() =>
    this.listPlayersService.lastPagePlayersList()
  );
  public total = computed<number>(() => this.listPlayersService.total());
  public isLoading = signal<boolean>(true);

  // FILTERS
  public filtersOpen = computed<boolean>(() =>
    this.listPlayersService.filtersOpen()
  );
  public filters = computed<any>(() => this.listPlayersService.filters());
  public isActiveFilters = computed<boolean>(() =>
    this.listPlayersService.isActiveFilters()
  );
  public searchForm = computed(() => this.listPlayersService.searchForm());

  ngOnInit(): void {
    this.fetchAllPlayers();
  }

  fetchAllPlayers(): void {
    this.authService
      .fetchAll(this.limit, this.currentPage(), this.filters())
      .subscribe((resp) => {
        if (resp && resp.total >= 0) {
          this.listPlayersService.total.set(resp.total);
          this.users.set(resp.users);
        }
        this.isLoading.set(false);
      });
  }

  // BOX FILTERS
  openCloseFilters(): void {
    this.listPlayersService.openCloseBoxFilter();
  }

  searchFormSubmit(): void {
    this.listPlayersService.triggerFormSubmit();
    this.fetchAllPlayers();
  }

  restartFilters(): void {
    // Set page to 1 to allow pagination by filters
    this.listPlayersService.restartFilters();
    this.fetchAllPlayers();
  }

  // DETECT PAGE
  detectChangePage(page: number) {
    this.isLoading.set(true);
    this.listPlayersService.lastPagePlayersList.set(page);

    this.fetchAllPlayers();
  }
}

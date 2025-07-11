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

import { BotService } from '../../../api';
import { ListBotsService } from '../list-bots.service';
import { Pagination } from '../../../shared/components/pagination/pagination';

import { IBot } from '../../../interfaces';
import { BotDifficulty } from '../../../enums';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'list-bots',
  standalone: true,
  imports: [CommonModule, RouterLink, Pagination, ReactiveFormsModule],
  templateUrl: './list-bots.html',
  styleUrl: './list-bots.scss',
})
export default class ListBots {
  private readonly botService = inject(BotService);
  private readonly listBotsService = inject(ListBotsService);

  // BOTS
  public bots = signal<IBot[]>([]);
  public botDifficulties = Object.values(BotDifficulty);

  // PAGINATION
  public limit: number = 4;
  public currentPage = computed<number>(() => this.listBotsService.lastPage());
  public total = computed<number>(() => this.listBotsService.total());
  public isLoading = signal<boolean>(true);

  // FILTERS
  public filtersOpen = computed<boolean>(() =>
    this.listBotsService.filtersOpen()
  );
  public filters = computed<any>(() => this.listBotsService.filters());
  public isActiveFilters = computed<boolean>(() =>
    this.listBotsService.isActiveFilters()
  );
  public searchForm = computed(() => this.listBotsService.searchForm());

  ngOnInit(): void {
    this.fetchAllPlayers();
  }

  fetchAllPlayers(): void {
    this.botService
      .fetchAll(this.limit, this.currentPage(), this.filters())
      .subscribe((resp) => {
        if (resp && resp.total >= 0) {
          this.listBotsService.total.set(resp.total);
          this.bots.set(resp.bots);
        }
        this.isLoading.set(false);
      });
  }

  // BOX FILTERS
  openCloseFilters(): void {
    this.listBotsService.openCloseBoxFilter();
  }

  searchFormSubmit(): void {
    this.listBotsService.triggerFormSubmit();
    this.fetchAllPlayers();
  }

  restartFilters(): void {
    // Set page to 1 to allow pagination by filters
    this.listBotsService.restartFilters();
    this.fetchAllPlayers();
  }

  // DETECT PAGE
  detectChangePage(page: number) {
    this.isLoading.set(true);
    this.listBotsService.lastPage.set(page);

    this.fetchAllPlayers();
  }
}

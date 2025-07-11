import {
  ChangeDetectionStrategy,
  Component,
  input,
  linkedSignal,
  OnChanges,
  OnInit,
  output,
  signal,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'pagination',
  templateUrl: './pagination.html',
  styleUrls: ['./pagination.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class Pagination implements OnInit, OnChanges {
  public total = input<number>(0);
  public factor = input<number>(10);
  public initialPage = input<number>(1);

  public pageEmitter = output<number>();

  public pages = signal<number>(0);
  public arrPages = signal<number[]>([]);
  public activePage = linkedSignal(() => this.initialPage());

  ngOnInit(): void {
    this.calculatePagination();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['total'] && !changes['total'].firstChange) {
      this.calculatePagination();
    }
  }

  public calculatePagination(): void {
    const totalPages = Math.ceil(this.total() / this.factor());
    this.pages.set(totalPages);

    this.activePage.set(this.initialPage());
    this.updateDisplayedPages();
  }

  public updateDisplayedPages(): void {
    const totalPages = this.pages();
    const currentPage = this.activePage();
    const visiblePages: number[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        visiblePages.push(i);
      }
    } else {
      visiblePages.push(1);

      if (currentPage > 3) visiblePages.push(-1); // "..."

      for (
        let i = Math.max(2, currentPage - 2);
        i <= Math.min(totalPages - 1, currentPage + 2);
        i++
      ) {
        visiblePages.push(i);
      }

      if (currentPage < totalPages - 2) visiblePages.push(-1); // "..."

      visiblePages.push(totalPages);
    }

    this.arrPages.set(visiblePages);
  }

  public changePage(i: number): void {
    if (i === -1 || this.activePage() === i) return;

    this.activePage.set(i);
    this.pageEmitter.emit(i); // ✅ emit page number
    this.updateDisplayedPages();
  }
}

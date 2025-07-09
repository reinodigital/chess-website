import { Component, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

import { SeoService } from '../../shared/services';

@Component({
  selector: 'home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly seoService = inject(SeoService);

  ngOnInit(): void {
    this.seoService.setMetadataToHomeView(this.title, this.meta);
  }
}

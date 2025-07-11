import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CommonAdminService } from '../../services';
import { BotService } from '../../../api';

import { IBot } from '../../../interfaces';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'detail-bot',
  imports: [CommonModule],
  templateUrl: './detail-bot.html',
  styleUrl: './detail-bot.scss',
})
export default class DetailBot {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly botService = inject(BotService);
  private readonly commonAdminService = inject(CommonAdminService);

  // DATA BOT
  public botId!: number;
  public bot = signal<IBot | null>(null);

  constructor() {
    this.botId = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.fetchBotById();
  }

  private fetchBotById(): void {
    this.botService.fetchOne(this.botId).subscribe((resp) => {
      if (resp && resp.id) {
        this.bot.set(resp);
      }
    });
  }

  comeBackToList(): void {
    this.commonAdminService.comeBackToList('/admin/list-bots');
  }
}

import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AuthService } from '../../../api/auth.service';
import { IAuth } from '../../../interfaces';
import { CommonAdminService } from '../../services';

@Component({
  selector: 'detail-player',
  imports: [CommonModule],
  templateUrl: './detail-player.html',
  styleUrl: './detail-player.scss',
})
export default class DetailPlayer {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly authService = inject(AuthService);
  private readonly commonAdminService = inject(CommonAdminService);

  // DATA PLAYER
  public playerId!: number;
  public player = signal<IAuth | null>(null);

  constructor() {
    this.playerId = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.fetchPlayerById();
  }

  private fetchPlayerById(): void {
    this.authService.fetchOne(this.playerId).subscribe((resp) => {
      if (resp && resp.uid) {
        this.player.set(resp);
      }
    });
  }

  comeBackToList(): void {
    this.commonAdminService.comeBackToList('/admin/list-players');
  }
}

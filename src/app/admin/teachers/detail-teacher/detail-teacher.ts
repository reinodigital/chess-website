import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AuthService } from '../../../api/auth.service';
import { CommonAdminService } from '../../services';

import { IAuth } from '../../../interfaces';

@Component({
  selector: 'detail-teacher',
  imports: [CommonModule],
  templateUrl: './detail-teacher.html',
  styleUrl: './detail-teacher.scss',
})
export default class DetailTeacher {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly authService = inject(AuthService);
  private readonly commonAdminService = inject(CommonAdminService);

  // DATA TEACHER
  public teacherId!: number;
  public teacher = signal<IAuth | null>(null);

  constructor() {
    this.teacherId = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.fetchTeacherById();
  }

  private fetchTeacherById(): void {
    this.authService.fetchOne(this.teacherId).subscribe((resp) => {
      if (resp && resp.uid) {
        this.teacher.set(resp);
      }
    });
  }

  comeBackToList(): void {
    this.commonAdminService.comeBackToList('/admin/list-teachers');
  }
}

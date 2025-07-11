import {
  ChangeDetectionStrategy,
  Component,
  inject,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../api';

import { IAuth, IAuthToUpdate } from '../../interfaces';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { CustomToastService } from '../../shared/services/custom-toast.service';
import { TypeMessageToast } from '../../enums';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'profile',
  templateUrl: './profile.html',
  styleUrls: ['./profile.scss'],
  imports: [RouterLink, ReactiveFormsModule],
})
export default class Profile {
  private authService = inject(AuthService);
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);
  private customToastService = inject(CustomToastService);

  // USER DATA
  public currentUser = signal<IAuth | null>(null);

  // PAYMENT DATA
  public maintenances = signal<any[]>([]);
  public totalMaintenances = signal<number>(0);

  // PILLS
  public arrPills: string[] = ['My profile'];
  public currentPillSelected = signal<number>(0);
  public idPillArr: string[] = ['pills-profile-tab'];

  //CHANGE PASSWORD
  private fb = inject(FormBuilder);
  protected formChangePassword = signal<FormGroup>(
    this.fb.group(
      {
        newPassword: ['', [Validators.required, Validators.minLength(6)]],
        confirmNewPassword: [
          '',
          [Validators.required, Validators.minLength(6)],
        ],
      },
      {
        validators: [this.passwordsMatchValidator],
      }
    )
  );

  protected hiddenNewPassword = signal<boolean>(true);
  protected hiddenConfirmNewPassword = signal<boolean>(true);

  constructor() {
    // Get current User data
    this.currentUser.set(this.authService.userProps);
  }

  // CLICK over one specific pill
  clickOverPill(): void {
    if (this.isBrowser) {
      const idPill = this.idPillArr[this.currentPillSelected()];
      const btnPill: HTMLElement = document.querySelector(`#${idPill}`)!;
      btnPill.click();
    }
  }

  selectPill(i: number): void {
    if (i === this.currentPillSelected()) return;
    this.currentPillSelected.set(i);
    this.clickOverPill();
  }

  logout(): void {
    this.authService.logout().subscribe((resp) => {
      resp && resp.ok ? this.router.navigateByUrl('/login') : ''; // TODO: missing message toast
    });
  }

  isInvalidField(field: string): boolean {
    return (
      this.formChangePassword()!.controls[field].touched &&
      this.formChangePassword()!.controls[field].invalid
    );
  }

  formErrors(field: string) {
    return this.formChangePassword().get(field)?.errors;
  }

  passwordsMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('newPassword')?.value;
    const confirm = group.get('confirmNewPassword')?.value;
    return password === confirm ? null : { passwordsMismatch: true };
  }

  onSubmit() {
    if (this.formChangePassword().valid) {
      const user = this.currentUser()!;

      const data: IAuthToUpdate = {
        name: user.name,
        username: user.username ?? '',
        password: this.formChangePassword().get('newPassword')?.value,
      };

      this.authService.update(user.uid, data).subscribe((resp) => {
        if (resp && resp.msg) {
          this.formChangePassword().reset();
          this.customToastService.add({
            message: resp.msg,
            type: TypeMessageToast.SUCCESS,
            duration: 3000,
          });
        } else {
          this.customToastService.add({
            message: resp.message,
            type: TypeMessageToast.ERROR,
            duration: 10000,
          });
        }
      });
    } else {
      this.formChangePassword().markAllAsTouched();
    }
  }

  toggleVisibilityNewPassword() {
    this.hiddenNewPassword.update((value) => !value);
  }

  toggleVisibilityConfirmNewPassword() {
    this.hiddenConfirmNewPassword.update((value) => !value);
  }
}

import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { AuthService } from '../../api';
import { CustomToastService } from '../../shared/services/custom-toast.service';
import { SeoService } from '../../shared/services';

import { Footer } from '../../shared/footer/footer';

import { TypeMessageToast } from '../../enums';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
  imports: [ReactiveFormsModule, Footer],
  standalone: true,
})
export default class LoginComponent implements OnInit {
  private title = inject(Title);
  private meta = inject(Meta);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);
  private seoService = inject(SeoService);
  private customToastService = inject(CustomToastService);

  // FORM
  public passwordType = signal<string>('password');
  public loginForm = signal<FormGroup>(
    this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })
  );

  ngOnInit(): void {
    this.seoService.setMetadataToLoginPage(this.title, this.meta);
  }

  isInvalidField(field: string) {
    return (
      this.loginForm().controls[field].touched &&
      this.loginForm().controls[field].invalid
    );
  }

  formErrors(field: string) {
    return this.loginForm().get(field)?.errors;
  }

  displayPassword(): void {
    this.passwordType() === 'password'
      ? this.passwordType.set('text')
      : this.passwordType.set('password');
  }

  login(): void {
    if (this.loginForm().valid) {
      this.authService.login(this.loginForm().value).subscribe((resp) => {
        if (resp && resp.uid) {
          this.customToastService.add({
            message: `Welcome to We Chess System ${resp.name}`,
            type: TypeMessageToast.SUCCESS,
            duration: 5000,
          });
          this.router.navigateByUrl('/admin/list-players');
        } else {
          this.customToastService.add({
            message: resp.message,
            type: TypeMessageToast.ERROR,
            duration: 10000,
          });
        }
      });
    } else {
      this.loginForm().markAllAsTouched();
    }
  }
}

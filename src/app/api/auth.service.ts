import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of, tap } from 'rxjs';

import { environment } from '../../environments/environment';
import { TokenService } from './token.service';

import { LS, SecurityRoles } from '../enums';
import {
  IAuth,
  IAuthToLogin,
  IAuthToRegister,
  IAuthToUpdate,
} from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly router = inject(Router);
  private readonly http = inject(HttpClient);
  private readonly _baseUrl = environment.baseUrl;
  private readonly tokenService = inject(TokenService);

  public _user = signal<IAuth | null>(null);

  get userProps() {
    return this._user();
  }

  get isAdmin() {
    if (!this._user()) return false;

    return (
      this._user()!.roles.includes(SecurityRoles.ADMIN) ||
      this._user()!.roles.includes(SecurityRoles.SUPER_ADMIN)
    );
  }

  get isSuperAdmin() {
    if (!this._user()) return false;

    return this._user()!.roles.includes(SecurityRoles.SUPER_ADMIN);
  }

  login(dataToLogin: IAuthToLogin): Observable<IAuth | any> {
    const url = `${this._baseUrl}/auth/login`;

    return this.http.post<IAuth>(url, dataToLogin).pipe(
      tap((resp) => {
        if (resp.uid && this.tokenService.isBrowser) {
          localStorage.setItem(LS.LS_TOKEN_SYSTEM, resp.token!);
        }
      }),
      map((resp) => resp),
      catchError((err) => of(err.error))
    );
  }

  // SIGN UP
  register(dataToRegister: IAuthToRegister): Observable<IAuth | any> {
    const url = `${this._baseUrl}/auth/register`;

    return this.http
      .post<IAuth>(url, dataToRegister, {
        headers: this.tokenService.getToken,
      })
      .pipe(
        map((resp) => resp),
        catchError((err) => of(err.error))
      );
  }

  // RENEW
  revalidateToken(): Observable<boolean> {
    const url = `${this._baseUrl}/auth/renew`;

    return this.http
      .get<IAuth>(url, { headers: this.tokenService.getToken })
      .pipe(
        map((resp) => {
          if (resp.uid && this.tokenService.isBrowser) {
            localStorage.setItem(LS.LS_TOKEN_SYSTEM, resp.token!);

            const { name, uid, ...restUser } = resp!;
            this._user.set({
              uid,
              name,
              ...restUser,
            });
          }

          return true;
        }),
        catchError((err) => of(false))
      );
  }

  // FETCH ONE
  fetchOne(uid: number): Observable<IAuth> {
    const url = `${this._baseUrl}/auth/${uid}`;

    return this.http
      .get<IAuth>(url, { headers: this.tokenService.getToken })
      .pipe(
        map((resp) => resp),
        catchError((err) => of(err.error))
      );
  }

  // UPDATE
  update(uid: number, data: IAuthToUpdate): Observable<IAuth | any> {
    const url = `${this._baseUrl}/auth/${uid}`;

    return this.http
      .patch<IAuth>(url, data, { headers: this.tokenService.getToken })
      .pipe(
        map((resp) => resp),
        catchError((err) => of(err.error))
      );
  }

  // LOGOUT
  logout(): Observable<any> {
    const url = `${this._baseUrl}/auth/logout`;

    return this.http
      .get<any>(url, { headers: this.tokenService.getToken })
      .pipe(
        tap((resp) => {
          if (resp.ok && this.tokenService.isBrowser) {
            localStorage.removeItem(LS.LS_TOKEN_SYSTEM);
            this._user.set(null);
            this.router.navigateByUrl('/login');
          }
        }),
        map((resp) => resp),
        catchError((err) => of(err.error))
      );
  }

  // FETCH ALL
  // fetchAllByAdmin(
  //   limit: number,
  //   offset: number,
  //   filters: any
  // ): Observable<IAuthAndCount> {
  //   const url = `${this._baseUrl}/auth`;

  //   let params = new HttpParams().set('limit', limit).set('offset', offset);

  //   Object.keys(filters).forEach((key) => {
  //     // Append filters to query params
  //     if (filters[key]) {
  //       params = params.set(key, filters[key]);
  //     }
  //   });

  //   return this.http
  //     .get<IAuthAndCount>(url, { headers: this.tokenService.getToken, params })
  //     .pipe(
  //       map((resp) => resp),
  //       catchError((err) => of(err.error))
  //     );
  // }

  fetchAllTeachers(): Observable<IAuth[]> {
    const url = `${this._baseUrl}/auth/all-teachers`;

    return this.http
      .get<IAuth[]>(url, { headers: this.tokenService.getToken })
      .pipe(
        map((resp) => resp),
        catchError((err) => of(err.error))
      );
  }
}

import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';

import { environment } from '../../environments/environment';
import { TokenService } from './token.service';

import { IBot, IBotCountAndList, IBotDataCreate } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class BotService {
  private readonly http = inject(HttpClient);
  private readonly _baseUrl = `${environment.baseUrl}/bot`;

  private readonly tokenService = inject(TokenService);

  createOne(data: IBotDataCreate): Observable<IBot> {
    const url = `${this._baseUrl}/create-one`;

    return this.http
      .post<IBot>(url, data, {
        headers: this.tokenService.getToken,
        withCredentials: true,
      })
      .pipe(
        map((resp) => resp),
        catchError((err) => of(err.error))
      );
  }

  fetchAll(
    limit: number,
    page: number,
    filters: any
  ): Observable<IBotCountAndList> {
    const url = `${this._baseUrl}`;

    let params = new HttpParams().set('limit', limit).set('page', page);

    Object.keys(filters).forEach((key) => {
      // Append filters to query params
      if (filters[key]) {
        params = params.set(key, filters[key]);
      }
    });

    return this.http
      .get<IBotCountAndList>(url, {
        headers: this.tokenService.getToken,
        params,
        withCredentials: true,
      })
      .pipe(
        map((resp) => resp),
        catchError((err) => of(err.error))
      );
  }

  fetchOne(id: number): Observable<IBot> {
    const url = `${this._baseUrl}/${id}`;

    return this.http
      .get<IBot>(url, { headers: this.tokenService.getToken })
      .pipe(
        map((resp) => resp),
        catchError((err) => of(err.error))
      );
  }

  updateOne(botId: number, data: IBotDataCreate): Observable<IBot> {
    const url = `${this._baseUrl}/update-one/${botId}`;

    return this.http
      .patch<IBot>(url, data, {
        headers: this.tokenService.getToken,
        withCredentials: true,
      })
      .pipe(
        map((resp) => resp),
        catchError((err) => of(err.error))
      );
  }
}

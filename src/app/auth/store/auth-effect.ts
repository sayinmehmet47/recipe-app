import { LoginStart, AuthActions, LOGIN } from './auth.actions';
import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as fromAuthAction from './auth.actions';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

import { Router } from '@angular/router';
import { of } from 'rxjs';

export interface AuthResponse {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable()
export class AuthEffects {
  authLogin = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAuthAction.LOGIN_START),
      switchMap((authData: LoginStart) =>
        this.httpClient
          .post<AuthResponse>(
            'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' +
              environment.apiUrl,
            {
              email: authData.payload.email,
              password: authData.payload.password,
              returnSecureToken: true,
            }
          )
          .pipe(
            map((resData) => {
              const expirationDate = new Date(
                new Date().getTime() + +resData.expiresIn * 1000
              );

              return new fromAuthAction.Login({
                email: resData.email,
                userId: resData.localId,
                expirationDate: expirationDate,
                token: resData.idToken,
              });
            }),
            catchError((errorRes) => {
              let errorMessage = 'An unknown error occurred!';

              if (!errorRes.error || !errorRes.error.error) {
                return of(new fromAuthAction.LoginFail(errorMessage));
              }

              switch (errorRes.error.error.message) {
                case 'EMAIL_EXISTS':
                  errorMessage = 'This email exists already!';
                  break;
                case 'EMAIL_NOT_FOUND':
                  errorMessage = 'This email does not exist!';
                  break;
                case 'INVALID_EMAIL':
                  errorMessage = 'This email is invalid';
                  break;
                case 'INVALID_PASSWORD':
                  errorMessage = 'This password is not correct!';
                  break;
                case 'INVALID_LOGIN_CREDENTIALS':
                  errorMessage = 'Invalid login credentials';
                  break;
              }
              return of(new fromAuthAction.LoginFail(errorMessage));
            })
          )
      )
    )
  );

  authSuccess = createEffect(
    () => () =>
      this.actions$.pipe(
        ofType(fromAuthAction.LOGIN),
        tap(() => {
          this.router.navigate(['/recipes']);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private httpClient: HttpClient,
    private router: Router
  ) {}
}

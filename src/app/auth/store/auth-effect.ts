import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as fromAuthAction from './auth.actions';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { User } from '../auth.user.model';
import { AuthService } from '../../services/auth.service';

export interface AuthResponse {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

const handleAuthentication = (response: AuthResponse): Action => {
  console.log(response);
  const expiresInMills = +response.expiresIn * 1000;
  const expirationDate = new Date(new Date().getTime() + expiresInMills);
  const user = new User(
    response.email,
    response.localId,
    response.idToken,
    expirationDate
  );
  localStorage.setItem('user', JSON.stringify(user));
  return fromAuthAction.authenticateSuccess({
    email: response.email,
    userId: response.localId,
    expirationDate: expirationDate,
    token: response.idToken,
    redirect: true,
  });
};

const handleError = (errorResponse: HttpErrorResponse): Observable<Action> => {
  let errorMessage = 'An Unknown error occurred!';
  if (!errorResponse.error || !errorResponse.error.error) {
    return of(fromAuthAction.authenticateFail({ errorMessage }));
  }
  switch (errorResponse.error.error.message) {
    case 'EMAIL_EXISTS':
      errorMessage = 'The email address is already in use by another account.';
      break;
    case 'OPERATION_NOT_ALLOWED':
      errorMessage = 'Password sign-in is disabled for this project.';
      break;
    case 'TOO_MANY_ATTEMPTS_TRY_LATER':
      errorMessage =
        'We have blocked all requests from this device due to ' +
        'unusual activity. Try again later.';
      break;
    case 'EMAIL_NOT_FOUND':
      errorMessage =
        'There is no user record corresponding to this identifier.' +
        ' The user may have been deleted.';
      break;
    case 'INVALID_PASSWORD':
      errorMessage =
        'The password is invalid or the user does not have a password.';
      break;
    case 'USER_DISABLED':
      errorMessage = 'The user account has been disabled by an administrator.';
      break;
  }
  return of(fromAuthAction.authenticateFail({ errorMessage }));
};

@Injectable()
export class AuthEffects {
  authLogin = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAuthAction.loginStart),
      switchMap((action) =>
        this.httpClient
          .post<AuthResponse>(
            'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' +
              environment.apiUrl,
            {
              email: action.email,
              password: action.password,
              returnSecureToken: true,
            }
          )
          .pipe(map(handleAuthentication), catchError(handleError))
      )
    )
  );

  authSignUp = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAuthAction.signupStart),
      switchMap((actionData) => {
        return this.httpClient
          .post<AuthResponse>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
              environment.apiUrl,
            {
              email: actionData.email,
              password: actionData.password,
              returnSecureToken: true,
            }
          )
          .pipe(
            tap(this.authService.setLogoutTimer.bind(this)),
            map(handleAuthentication),
            catchError(handleError)
          );
      })
    )
  );

  autoLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAuthAction.autoLogin),

      map(() => {
        const user = localStorage.getItem('user');
        if (!user) {
          // Return Dummy action
          return { type: 'DUMMY' };
        }

        const userData: {
          email: string;
          id: string;
          _token: string;
          _tokenExpirationDate: string;
        } = JSON.parse(user);

        if (userData._token) {
          const expirationDuration =
            new Date(userData._tokenExpirationDate).getTime() -
            new Date().getTime();
          this.authService.setLogoutTimer(expirationDuration);

          return fromAuthAction.authenticateSuccess({
            email: userData.email,
            userId: userData.id,
            token: userData._token,
            expirationDate: new Date(userData._tokenExpirationDate),
            redirect: true,
          });
        }

        return { type: 'DUMMY' };
      })
    )
  );

  authSuccess = createEffect(
    () => () =>
      this.actions$.pipe(
        ofType(fromAuthAction.authenticateSuccess),
        tap(() => {
          this.router.navigate(['/recipes']);
        })
      ),
    { dispatch: false }
  );
  authRedirect = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromAuthAction.authenticateSuccess),
        tap((action) => action.redirect && this.router.navigate(['/']))
      ),
    { dispatch: false }
  );

  authLogout = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromAuthAction.logout),
        tap(() => {
          this.authService.clearLogoutTimer();
          localStorage.removeItem('user');
          this.router.navigate(['/auth']);
        })
      ),
    { dispatch: false }
  );
  constructor(
    private actions$: Actions,
    private httpClient: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}
}

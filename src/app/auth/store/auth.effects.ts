import { Actions, ofType, createEffect } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { catchError, of, switchMap, map, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export interface AuthResponseData {
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
  authLogin = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.LOGIN_START),
        switchMap((authData: AuthActions.LoginStartAction) => {
          return this.http
            .post<AuthResponseData>(
              'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
                environment.firebaseAPIKey,
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
                return new AuthActions.LoginAction({
                    email: resData.email,
                    userId: resData.localId,
                    token: resData.idToken,
                    expirationDate: expirationDate})
                ;
              }),
              catchError((error) => {
                let errorMessage = 'An unknown error occurred!';
                if (!error.error || !error.error.error) {
                    return of(new AuthActions.LoginFailAction(errorMessage));
                  }
                  switch (error.error.error.message) {
                    case 'EMAIL_EXISTS':
                      errorMessage = 'This email exists already';
                      break;
                    case 'EMAIL_NOT_FOUND':
                      errorMessage = 'This email does not exist.';
                      break;
                    case 'INVALID_PASSWORD':
                      errorMessage = 'This password is not correct.';
                      break;
                  }
                  return of(new AuthActions.LoginFailAction(errorMessage));
              })
            );
        })
      )
  );

  authSuccess = createEffect(() => 
        this.actions$.pipe(
            ofType(AuthActions.LOGIN),
            tap(() => {
                this.router.navigate(['/']);
            })
        ),
        { dispatch: false }
  );

  constructor(private actions$: Actions, private http: HttpClient, private router: Router) {}
}

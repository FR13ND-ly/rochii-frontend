import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { userActions } from './user.actions';
import { map, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../core/data-access/auth.service';

@Injectable()
export class UserEffects {
  actions$ = inject(Actions);
  authService = inject(AuthService);
  router = inject(Router);

  login$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(userActions.login),
      switchMap((data: any): any => {
        return this.authService
          .authentification(data)
          .pipe(map((user: any) => userActions.loginSuccess(user)));
      })
    )
  );

  logout$ = createEffect(
    (): any =>
      this.actions$.pipe(
        ofType(userActions.logout),
        tap(() => this.authService.logout())
      ),
    { dispatch: false }
  );
}

import { HttpClient } from '@angular/common/http';
import { Injectable, afterNextRender, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { setLoading } from '../../store/loading/loading.actions';
import { catchError, interval, tap } from 'rxjs';
import { userActions } from '../../store/user/user.actions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private router = inject(Router);
  private store = inject(Store);
  snackbar = inject(MatSnackBar);

  http = inject(HttpClient);
  apiUrl = environment.apiUrl + 'administrator/';

  constructor() {
    afterNextRender(() => {
      let token = localStorage.getItem('token');
      if (!token) token = 'unauthentificated';
      this.authorization(token);
    });
  }

  authentification(data: any) {
    return this.http
      .post(`${this.apiUrl}authentification/`, data.loginCredentianls)
      .pipe(
        tap((user: any) => {
          if (!user.logged) return;
          localStorage.setItem('token', user.token);
          this.store.dispatch(userActions.loginSuccess({ user: { user } }));
          interval(0).subscribe(() => {
            this.store.dispatch(setLoading({ state: false }));
            this.router.navigate(['/admin/dashboard']);
          });
        }),
        catchError((): any => {
          this.store.dispatch(setLoading({ state: false }));
          this.snackbar.open('Username sau parolă greșită', '', {
            duration: 3000,
          });
        })
      );
  }

  authorization(token: any) {
    if (!token || token == 'unauthentificated') return;
    this.http.get(`${this.apiUrl}authorization/${token}/`).subscribe(
      (user: any) => {
        this.store.dispatch(userActions.loginSuccess({ user }));
      },
      () => localStorage.setItem('token', '')
    );
  }

  logout() {
    localStorage.setItem('token', '');
    this.router.navigate(['/']);
  }
}

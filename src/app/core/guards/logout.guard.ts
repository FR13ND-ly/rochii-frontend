import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectUser } from '../../store/user/user.reducer';
import { map } from 'rxjs';

export const logoutGuard: CanActivateFn = (route, state) => {
  let store = inject(Store);
  let router = inject(Router);

  let user$ = store.select(selectUser);

  user$.subscribe(console.log);
  return user$.pipe(
    map((res: any) => {
      if (!res?.user.logged) {
        return true;
      } else {
        router.navigate(['/admin/dashboard']);
        return false;
      }
    })
  );
};

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectUser } from '../../store/user/user.reducer';
import { map } from 'rxjs';

export const logoutGuard: CanActivateFn = (route, state) => {
  let store = inject(Store);
  let router = inject(Router);

  let authToken: any = localStorage.getItem('token');
  if (authToken && authToken != 'unauthorized') {
    router.navigate(['/admin/dashboard']);
    return false;
  } else {
    return true;
  }
  // let user$ = store.select(selectUser);
  // return user$.pipe(
  //   map((res: any) => {
  //     if (!res?.user.logged) {
  //       console.log('c');
  //       return true;
  //     } else {
  //       console.log('d');
  //       router.navigate(['/admin/dashboard']);
  //       return false;
  //     }
  //   })
  // );
};

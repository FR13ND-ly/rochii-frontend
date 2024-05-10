import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectUser } from '../../store/user/user.reducer';
import { setLoading } from '../../store/loading/loading.actions';
import { filter, map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  let store = inject(Store);
  let router = inject(Router);
  store.dispatch(setLoading({ state: true }));

  // let user$ = store.select(selectUser);
  console.log('a');
  let authToken: any = localStorage.getItem('token');
  console.log(authToken);
  if (!authToken || authToken == 'unauthorized') {
    router.navigate(['/admin/login']);
    return false;
  } else {
    return true;
  }
  // return user$.pipe(
  //   map((res: any) => {
  //     store.dispatch(setLoading({ state: false }));
  //     if (res?.user?.logged || res?.logged) {
  //       return true;
  //     } else {
  //       console.log('a');
  //       router.navigate(['/admin/login']);
  //       return false;
  //     }
  //   })
  // );
};

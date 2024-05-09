import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { PLATFORM_ID, inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  let platformId = inject(PLATFORM_ID);

  if (isPlatformBrowser(platformId)) {
    let authToken: any = localStorage.getItem('token');
    if (!authToken) authToken = 'unauthorized';
    req = req.clone({
      headers: req.headers.set('Admin-Authorization', authToken),
    });
  }
  return next(req);
};

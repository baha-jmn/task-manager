import { HttpInterceptorFn } from '@angular/common/http';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const clonedReq = req.clone({
    headers: req.headers.set('Content-Type', 'application/json')
  });
  return next(clonedReq);
};

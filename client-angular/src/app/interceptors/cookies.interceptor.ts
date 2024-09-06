import type {
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http'
import { Observable } from 'rxjs'

export const cookiesInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const authReq: HttpRequest<unknown> = req.clone({ withCredentials: true });

  return next(authReq);
};

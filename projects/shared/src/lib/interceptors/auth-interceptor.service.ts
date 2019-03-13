import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/internal/operators';
import { SessionService } from '../../public_api';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor(private sessionService: SessionService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('session');
    req = req.clone({
      setHeaders: {
        Authorization : `Bearer ${token}`
      }
    });
    return next.handle(req).pipe(catchError((error, caught) => {
      if (error.status === 401) {
        this.sessionService.closeSession();
        return of(error);
      }
      return caught;
    }));
  }
}


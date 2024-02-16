import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService {

  constructor() { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    const token = localStorage.getItem('customer_token');

    
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
          
        }
      });console.log(request.headers)
    }

    return next.handle(request);
  }
}

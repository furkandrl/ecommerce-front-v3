import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CheckoutRes } from '../interfaces/responses/checkout-res';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private http: HttpClient) { }

  getCheckoutForCustomer(): Observable<CheckoutRes> {
    return this.http.get<CheckoutRes>("http://localhost:8080/checkout");
  }
}

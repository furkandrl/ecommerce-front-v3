import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderListRes } from '../interfaces/responses/order-list-res';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  placeOrder(): Observable<any> {
    return this.http.post<any>("http://localhost:8080/order/place","");
  }

  getAllOrdersOfCustomer(): Observable<OrderListRes>{
    return this.http.get<OrderListRes>("http://localhost:8080/order");
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http:HttpClient) { }
  
  

  addProductToCart(productCode:string, qty:number): Observable<any> {
    console.log(productCode)
    return this.http.post<any>("http://localhost:8080/cart/add-product?productCode="+productCode+"&qty="+qty,{productCode,qty});
  }
}

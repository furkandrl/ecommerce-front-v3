import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject} from 'rxjs';
import { CartRes } from '../interfaces/responses/cart-res';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http:HttpClient) { }
  
  

  addProductToCart(productCode:string, qty:number): Observable<any> {
    return this.http.post<any>("http://localhost:8080/cart/add-product?productCode="+productCode+"&qty="+qty,{productCode,qty});
  }

  getCartForCustomer(): Observable<CartRes> {
    return this.http.get<CartRes>("http://localhost:8080/cart");
  }

  removeProductFromCart(productCode:string): Observable<any>{
    return this.http.post<any>("http://localhost:8080/cart/remove-product?productCode="+productCode,{productCode});
  }

  updateQuantityOfProduct(){

  }

}

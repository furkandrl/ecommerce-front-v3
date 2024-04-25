import { HttpClient } from '@angular/common/http';
import { Observable, Subject} from 'rxjs';
import { Injectable } from '@angular/core';
import { CustomerRegister } from '../interfaces/requests/customer-register';
import { CustomerLogin } from '../interfaces/requests/customer-login';
import { CustomerLoginRes } from '../interfaces/responses/customer-login-res';
import { CustomerRes } from '../interfaces/responses/customer-res';
import { Address } from '../interfaces/requests/address';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  showLogin: Subject<boolean> = new Subject<boolean>();

  isLogged: Subject<boolean> = new Subject<boolean>();

  constructor(private http: HttpClient) { }

  registerCustomer(customerRegister:CustomerRegister): Observable<CustomerLoginRes> {
    return this.http.post<CustomerLoginRes>("http://localhost:8080/register", customerRegister);
  }

  loginCustomer(customerLogin:CustomerLogin):Observable<CustomerLoginRes> {
    return this.http.post<CustomerLoginRes>("http://localhost:8080/authenticate", customerLogin);
  }

  getCustomerProfile(): Observable<CustomerRes> {
    return this.http.get<CustomerRes>("http://localhost:8080/my-account/profile");
  }

  addAddressToCustomer(addressReq:Address):Observable<any>{
    return this.http.post<any>("http://localhost:8080/my-account/create-address", addressReq);
  }
  

}

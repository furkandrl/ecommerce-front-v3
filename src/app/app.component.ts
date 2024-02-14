import { Component } from '@angular/core';
import { AccountService } from './services/account.service';
import { ProductService } from './services/product.service';
import { CustomerLogin } from './interfaces/requests/customer-login';
import { CustomerLoginRes } from './interfaces/responses/customer-login-res';
import { Router } from '@angular/router';
import { CustomerRegister } from './interfaces/requests/customer-register';
import { CustomerRes } from './interfaces/responses/customer-res';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ecommerce-front-v3';

  loggedCustomer:any = {};
/*
  loginObj:CustomerLogin={
    username:'',
    password:''
  };*/

  cartItems: any[]= [];

  loginObj:any={
    "username":"",
    "password":""
  }

  registerObj:any={
    "username":"",
    "firstName":"",
    "lastName":"",
    "password":""
  }
  
  loginModelClass = 'show';
  
  constructor(private accountService:AccountService, private productService:ProductService, 
    private router:Router){}

  onRegister(){
    this.accountService.registerCustomer(this.registerObj).subscribe((res:CustomerLoginRes) => {
      this.router.navigateByUrl('/')
    },
    (error:Error) => alert(error.message))
    
  }

  onLogin(){
    this.accountService.loginCustomer(this.loginObj).subscribe((res:CustomerLoginRes) => {
      if(res.jwtToken){
        localStorage.removeItem('customer_token')
        localStorage.setItem('customer_token', res.jwtToken)
        this.loggedCustomer=localStorage.getItem('customer_token')
        this.router.navigateByUrl('/')
      }
    },
    (error:Error) => alert(error.message))
  }

  removeItem(productCode:number){
  }


}

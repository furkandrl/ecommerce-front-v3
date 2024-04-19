import { Component } from '@angular/core';
import { AccountService } from './services/account.service';
import { ProductService } from './services/product.service';
import { CustomerLogin } from './interfaces/requests/customer-login';
import { CustomerLoginRes } from './interfaces/responses/customer-login-res';
import { Router } from '@angular/router';
import { CustomerRegister } from './interfaces/requests/customer-register';
import { CustomerRes } from './interfaces/responses/customer-res';
import { CartService } from './services/cart.service';
import { CartRes } from './interfaces/responses/cart-res';
import { EntryRes } from './interfaces/responses/entry-res';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ecommerce-front-v3';

  loggedCustomer:any = {};
  
  cartEntries: EntryRes[]= [];

  cartPrice: any;

  cartItemCount: any;

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


  isLogged:boolean=false;
  
  loginModelClass:string = '';
  
  constructor(private accountService:AccountService, private productService:ProductService, 
    private router:Router, private cartService: CartService){
      this.accountService.showLogin.subscribe((res: boolean)=>{
        if(res) {
           this.loginModelClass = 'show';
        }
    })
  }

  ngOnInit(): void {
    if(localStorage.getItem('customer_token')){
      this.isLogged=true;
    }
    this.getCartForCustomer();
  }


  onRegister(){
    this.accountService.registerCustomer(this.registerObj).subscribe((res:CustomerLoginRes) => {
      window.location.reload();
    },
    (error:Error) => alert(error.message))
    
  }

  onLogin(){
    this.accountService.loginCustomer(this.loginObj).subscribe((res:CustomerLoginRes) => {
      if(res.token){
        localStorage.removeItem('customer_token')
        localStorage.setItem('customer_token', res.token);
        this.accountService.isLogged.next(true);
        this.isLogged=true;
        this.loginModelClass = '';
        window.location.reload();
      }
      
    },
    (error:Error) => alert(error.message))
  }

  logout(){
    localStorage.removeItem('customer_token')
    alert('You logged out.');
    this.router.navigateByUrl('/');
    window.location.reload();
    
  }
  

  removeItem(productCode:string){
    this.cartService.removeProductFromCart(productCode).subscribe((res:any) => {
    })
    this.getCartForCustomer();
    
  }

  public getCartForCustomer(){
    this.cartService.getCartForCustomer().subscribe((res:CartRes) => {
      this.cartPrice = res.totalPriceOfProducts;
      this.cartItemCount =res.numberOfProducts;
      this.cartEntries=res.entries;
    })
  }


  reloadCurrentRoute() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: false }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

}

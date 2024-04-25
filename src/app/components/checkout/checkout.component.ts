import { Component } from '@angular/core';
import { EntryRes } from '../../interfaces/responses/entry-res';
import { CheckoutService } from '../../services/checkout.service';
import { CheckoutRes } from '../../interfaces/responses/checkout-res';
import { AddressRes } from '../../interfaces/responses/address-res';
import { OrderService } from '../../services/order.service';
import { Router } from '@angular/router';
import { AppComponent } from '../../app.component';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {

  cartEntries: EntryRes[]= [];

  cartPrice: any;

  cartItemCount: any;

  customerAddresses: AddressRes[]=[];

  addressObj:any={
    "code":"",
    "name":"",
    "address":""
  }

  constructor( private checkoutService: CheckoutService, private orderService: OrderService,
    private accountService: AccountService, private router:Router){
    
  }

  ngOnInit(){
    this.getCheckoutForCustomer();
  }

  getCheckoutForCustomer(){
    this.checkoutService.getCheckoutForCustomer().subscribe((res:CheckoutRes) =>{
      this.cartPrice = res.cart.totalPriceOfProducts;
      this.cartItemCount =res.cart.numberOfProducts;
      this.cartEntries=res.cart.entries;
      this.customerAddresses=res.addresses;
    })
  }

  placeOrder(){
    this.orderService.placeOrder().subscribe((res:CheckoutRes) =>{})
    alert("Your order successfully completed.")
    this.navigateAndReload("");
  }

  navigateAndReload(url: string): void {
    this.router.navigateByUrl(url).then(() => {
      window.location.reload();
    });
  }

  addAddress(){
    this.addressObj.code=this.addressObj.name+Math.floor(Math.random() * 999999);
    this.accountService.addAddressToCustomer(this.addressObj).subscribe((res:any) => {
    }//,
    //(error:Error) => alert(error.message)
  )
  window.location.reload();

  }
}

import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { EntryRes } from '../../interfaces/responses/entry-res';
import { CartRes } from '../../interfaces/responses/cart-res';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  cartEntries: EntryRes[]= [];

  cartPrice: any;

  cartItemCount: any;

  constructor(private cartService: CartService){
    
  }

  ngOnInit(){
    this.getCartForCustomer();
  }

  removeItem(productCode:string){
    this.cartService.removeProductFromCart(productCode).subscribe((res:any) => {
    })
    
  }

  getCartForCustomer(){
    this.cartService.getCartForCustomer().subscribe((res:CartRes) => {
      this.cartPrice = res.totalPriceOfProducts;
      this.cartItemCount =res.numberOfProducts;
      this.cartEntries=res.entries;
    })
  }



}

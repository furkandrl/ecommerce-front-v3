import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  constructor(private cartService: CartService){
    
  }

  removeItem(productCode:string){
    this.cartService.removeProductFromCart(productCode).subscribe((res:any) => {
    })
    
  }

}

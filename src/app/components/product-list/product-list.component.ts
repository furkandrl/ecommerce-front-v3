import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CategoryRes } from '../../interfaces/responses/category-res';
import { ProductListRes } from '../../interfaces/responses/product-list-res';
import { AccountService } from '../../services/account.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {

  constructor(private productService:ProductService, private accountService:AccountService, private cartService:CartService){

  }
  
  productsArray:any[] = [];
  selectedCategory:any={};

  ngOnInit(): void {
    this.getProductsByCateogry();
  }
  
  


  getProductsByCateogry() {
    this.productService.getAllProductsByCategory("cat1").subscribe((res: ProductListRes) =>{
      this.productsArray = res.products;
      this.selectedCategory=res.category.name;
    })
   
  }

  addToCart(productCode:string){
    if(localStorage.getItem('customer_token')==undefined){
      this.accountService.showLogin.next(true);
    }else{
      this.cartService.addProductToCart(productCode,1).subscribe((res:any) => {
    })
    alert("Product added to cart.");
  }
}

}

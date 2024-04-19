import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ProductListRes } from '../../interfaces/responses/product-list-res';
import { ProductRes } from '../../interfaces/responses/product-res';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '../../services/account.service';
import { AppComponent } from '../../app.component';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {

  similarProducts: ProductRes[]=[];
  product: any={};
  productCode :string='';
  selectedQty: number=1;
  rating:number=0;

  constructor(private productService: ProductService, private route: ActivatedRoute, private accountService:AccountService,
    private appComponent:AppComponent, private cartService:CartService){}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.productCode = params['productCode'];
      this.getProductByCode(this.productCode);
      this.getSimilarProducts(this.productCode)
    });
  }

  getProductByCode(productCode: string){
    this.productService.getProductByProductCode(productCode).subscribe((res:ProductRes) =>{
      this.product = res;
      console.log(res.avgRating);
      this.rating=res.avgRating;
    })
  }

  getSimilarProducts(productCode: string){
    this.productService.getSimilarProductsByProductCode(productCode).subscribe((res:ProductListRes) =>{
        this.similarProducts = res.products;
    })
  }

  addToCartMultiple(productCode:string, qty:number){
    if(localStorage.getItem('customer_token')==undefined){
      this.accountService.showLogin.next(true);
    }else{
      this.cartService.addProductToCart(productCode, qty).subscribe((res:any) => {
    })
    alert("Product added to cart.");
    this.appComponent.getCartForCustomer();
  }
  }

  addToCart(productCode:string){
    if(localStorage.getItem('customer_token')==undefined){
      this.accountService.showLogin.next(true);
    }else{
      this.cartService.addProductToCart(productCode,1).subscribe((res:any) => {
    })
    alert("Product added to cart.");
    this.appComponent.getCartForCustomer();
  }
  }

  incrementQuantity() {
      this.selectedQty++;
    
  }

  decrementQuantity() {
    if (this.selectedQty > 0) {
      this.selectedQty--;
    }
  }

  getStars(): boolean[] {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(i <= this.rating);
    }
    return stars;
  }

}

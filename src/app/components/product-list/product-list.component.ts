import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CategoryRes } from '../../interfaces/responses/category-res';
import { ProductListRes } from '../../interfaces/responses/product-list-res';
import { AccountService } from '../../services/account.service';
import { CartService } from '../../services/cart.service';
import { CategoryService } from '../../services/category.service';
import { AppComponent } from '../../app.component';
import { ProductRes } from '../../interfaces/responses/product-res';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {

  productsArray:any[] = [];
  categoriesArray:any[]=[];
  selectedCategory:string="cat1";
  recommendedProducts:ProductRes[]=[];
  showRecommended:boolean=false;

  constructor(private productService:ProductService, private accountService:AccountService, private cartService:CartService,
    private categoryService:CategoryService, private appComponent:AppComponent){
    
  }
  
  


  ngOnInit(): void {
    this.getAllCategories();
    this.getProductsByCateogry();
    this.getRecommendedProducts();
    
  }
  

  getProductsByCateogry() {
    this.productService.getAllProductsByCategory(this.selectedCategory).subscribe((res: ProductListRes) =>{
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
    this.appComponent.getCartForCustomer();
  }
}

  getAllCategories(){
    this.categoryService.getCategories().subscribe((res:CategoryRes[])=>{
      this.categoriesArray = res.map(entry => entry);
    })
  }

  selectCategory(categoryCode:string){
    this.selectedCategory=categoryCode;
    this.productService.getAllProductsByCategory(this.selectedCategory).subscribe((res: ProductListRes) =>{
      this.productsArray = res.products;
      this.selectedCategory=res.category.name;
    })
  }

  getRecommendedProducts(){
    this.productService.getRecommendedProducts().subscribe((res: ProductListRes) =>{
      this.recommendedProducts = res.products;
    })
  }
}





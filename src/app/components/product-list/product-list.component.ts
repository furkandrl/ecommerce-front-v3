import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CategoryRes } from '../../interfaces/responses/category-res';
import { ProductListRes } from '../../interfaces/responses/product-list-res';
import { AccountService } from '../../services/account.service';
import { CartService } from '../../services/cart.service';
import { CategoryService } from '../../services/category.service';
import { AppComponent } from '../../app.component';
import { ProductRes } from '../../interfaces/responses/product-res';
import { ProductPageRes } from '../../interfaces/responses/product-page-res';

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
  selectedPage:number=0;
  totalPages:number = 0;
  pageNumber:number = 1;

  constructor(private productService:ProductService, private accountService:AccountService, private cartService:CartService,
    private categoryService:CategoryService, private appComponent:AppComponent){
    
  }
  
  ngOnInit(): void {
    this.getAllCategories();
    this.getProductsByCateogry(this.selectedPage);
    this.getRecommendedProducts();
    
  }
  

  // getProductsByCateogry() {
  //   this.productService.getAllProductsByCategory(this.selectedCategory).subscribe((res: ProductListRes) =>{
  //     this.productsArray = res.products;
  //     this.selectedCategory=res.category.name;
  //   })
   
  // }

  getProductsByCateogry(page: number) {
    this.productService.getAllProductsByCategory(this.selectedCategory, page).subscribe((res: ProductPageRes) =>{
      this.productsArray = res.products.content;
      this.selectedCategory=res.category.name;
      this.pageNumber=page;
      this.totalPages=res.products.totalPages;
    })
   
  }

  onPageChanged(page: number){
    this.pageNumber=page;
    this.getProductsByCateogry(this.pageNumber);
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

  // selectCategory(categoryCode:string){
  //   this.selectedCategory=categoryCode;
  //   this.productService.getAllProductsByCategory(this.selectedCategory).subscribe((res: ProductListRes) =>{
  //     this.productsArray = res.products;
  //     this.selectedCategory=res.category.name;
  //   })
  // }

  selectCategory(categoryCode:string, page:number){
    this.selectedCategory=categoryCode;
    this.productService.getAllProductsByCategory(this.selectedCategory, page).subscribe((res: ProductPageRes) =>{
      this.productsArray = res.products.content;
      this.selectedCategory=res.category.name;
    })
  }

  getRecommendedProducts(){
    this.productService.getRecommendedProducts().subscribe((res: ProductListRes) =>{
      this.recommendedProducts = res.products;
    })
  }
}





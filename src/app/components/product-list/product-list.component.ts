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
  selectedCategory?: string | null = "cat1";
  selectedCatName?:string;
  recommendedProducts:ProductRes[]=[];
  showRecommended:boolean=false;
  selectedPage:number=0;//in backend, page count starts with 0
  totalPages:number = 1;
  pageNumber:number = this.selectedPage+1;
  visiblePageNumbers: number[] = [];

  constructor(private productService:ProductService, private accountService:AccountService, private cartService:CartService,
    private categoryService:CategoryService, private appComponent:AppComponent){
    
  }
  
  ngOnInit(): void {
    if(localStorage.getItem('selected_category')){
      this.selectedCategory=localStorage.getItem('selected_category');
    }
    this.getAllCategories();
    this.getProductsByCategory(this.selectedPage);
    this.getRecommendedProducts();
    

  }
  

  // getProductsByCateogry() {
  //   this.productService.getAllProductsByCategory(this.selectedCategory).subscribe((res: ProductListRes) =>{
  //     this.productsArray = res.products;
  //     this.selectedCategory=res.category.name;
  //   })
   
  // }

  getProductsByCategory(page: number) {
    this.productService.getAllProductsByCategory(this.selectedCategory!=null ? this.selectedCategory : "cat1", page).subscribe((res: ProductPageRes) =>{
      this.productsArray = res.products.content;
      //this.selectedCategory=res.category.code;
      this.selectedPage=page;
      this.totalPages=res.products.totalPages;
      this.selectedCatName=res.category.name;
      localStorage.removeItem('selected_category');
      localStorage.setItem('selected_category', res.category.code);
      this.updateVisiblePageNumbers();
    })
    
  }

  onPageChanged(page: number){
    this.selectedPage=page;
    this.getProductsByCategory(this.selectedPage);
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
    localStorage.setItem('selected_category', categoryCode);
    this.productService.getAllProductsByCategory(this.selectedCategory, page).subscribe((res: ProductPageRes) =>{
      this.productsArray = res.products.content;
      this.selectedCategory=res.category.code;
      this.selectedCatName=res.category.name;
      this.selectedPage=0;
      this.totalPages=res.products.totalPages;
      this.updateVisiblePageNumbers();
    })
  }

  getRecommendedProducts(){
    this.productService.getRecommendedProducts().subscribe((res: ProductListRes) =>{
      this.recommendedProducts = res.products;
    })
  }

  previousPage(): void {
    if (this.selectedPage > 0) {
      this.selectedPage--;
      this.getProductsByCategory(this.selectedPage);
    }
  }
  
  goToPage(page: number): void {
    if (page !== this.selectedPage) {
      this.selectedPage = page;
      this.getProductsByCategory(this.selectedPage);
    }
  }
  
  nextPage(): void {
    if (this.selectedPage < this.totalPages-1) {
      this.selectedPage++;
      this.getProductsByCategory(this.selectedPage);
    }
  }

  updateVisiblePageNumbers(): void {
    const maxVisiblePages = 5;
    const halfMaxVisiblePages = Math.floor(maxVisiblePages / 2);
    let startPage = Math.max(1, this.selectedPage+1 - halfMaxVisiblePages);
    const endPage = Math.min(this.totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage === this.totalPages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    this.visiblePageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
      this.visiblePageNumbers.push(i);
    }
  }

}


  
 




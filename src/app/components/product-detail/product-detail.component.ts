import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ProductListRes } from '../../interfaces/responses/product-list-res';
import { ProductRes } from '../../interfaces/responses/product-res';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {

  similarProducts: ProductRes[]=[];
  product: any={};
  productCode :string='';

  constructor(private productService: ProductService, private route: ActivatedRoute){}

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
    })
  }

  getSimilarProducts(productCode: string){
    this.productService.getSimilarProductsByProductCode(productCode).subscribe((res:ProductListRes) =>{
        this.similarProducts = res.products;
    })
  }

}

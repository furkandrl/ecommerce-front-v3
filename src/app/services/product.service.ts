import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject} from 'rxjs';
import { ProductListRes } from '../interfaces/responses/product-list-res';
import { ProductRes } from '../interfaces/responses/product-res';
import { ProductPageRes } from '../interfaces/responses/product-page-res';
import { SaveStarReq } from '../interfaces/requests/save-star-req';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  // getAllProductsByCategory(categoryCode:string): Observable<ProductListRes> {
  //   return this.http.get<ProductListRes>("http://localhost:8080/c/"+categoryCode);
  // }

  getAllProductsByCategory(categoryCode:string, page:number): Observable<ProductPageRes> {
    return this.http.get<ProductPageRes>("http://localhost:8080/c/"+categoryCode+"?page="+page);
  }

  getProductByProductCode(productCode:string): Observable<ProductRes> {
    return this.http.get<ProductRes>("http://localhost:8080/p/"+productCode);
  }

  getSimilarProductsByProductCode(productCode:string): Observable<ProductListRes> {
    return this.http.get<ProductListRes>("http://localhost:8080/p/similar/"+productCode);
  }

  getRecommendedProducts(): Observable<ProductListRes> {
    return this.http.get<ProductListRes>("http://localhost:8080/p/recommendations");
  }

  getFavoriteProducts(): Observable<ProductListRes> {
    return this.http.get<ProductListRes>("http://localhost:8080/p/favorites");
  }

  addToFavorites(productCode:string): Observable<ProductRes> {
    return this.http.post<ProductRes>("http://localhost:8080/p/add-to-fav/"+productCode, productCode);
  }

  saveCustomerGivenStar(saveStarReq: SaveStarReq): Observable<any> {
    return this.http.post<any>("http://localhost:8080/p/save-star", saveStarReq);
  }
}

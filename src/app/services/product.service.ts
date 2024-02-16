import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject} from 'rxjs';
import { ProductListRes } from '../interfaces/responses/product-list-res';
import { ProductRes } from '../interfaces/responses/product-res';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  headers = new HttpHeaders ({
    'Authorization': 'Bearer '+localStorage.getItem('customer_token')
  });

  constructor(private http: HttpClient) { }

  getAllProductsByCategory(categoryCode:string): Observable<ProductListRes> {
    return this.http.get<ProductListRes>("http://localhost:8080/c/"+categoryCode);
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
}

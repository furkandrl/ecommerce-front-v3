import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { CategoryRes } from '../interfaces/responses/category-res';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getCategories(): Observable<CategoryRes[]> {
    return this.http.get<CategoryRes[]>("http://localhost:8080/c/");
  }

  
}

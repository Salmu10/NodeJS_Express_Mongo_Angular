import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product, Filters } from '../models';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';

const URL = 'http://localhost:8080/api/products';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  
  constructor(private http: HttpClient,  private apiService: ApiService) { }

  get_products(filters: Filters): Observable<{products: Product[], product_count: number}>{
    let params = {};
    params = filters;
    return this.apiService.get('products', new HttpParams({fromObject:params}));
  }

  find_product_name(search: string): Observable<any> {
    console.log(search);
    return this.http.get<Product>(`${URL}/list-search/` + search).pipe(
      map((data) => {
        return data;
      })
    );
  }

  all_products(): Observable<Product[]> {
    return this.http.get<Product[]>(URL);
  }

  get_product(slug: String): Observable<Product> {
    return this.http.get<Product>(`${URL}/${slug}`);
  }

  get_products_from_category(slug: String, params: any): Observable<{products: Product[], product_count: number}> {
    return this.apiService.get_products('products/category/', slug, new HttpParams({fromObject:params}));
    // return this.http.get(`${URL}/category/${slug}`, { params }).pipe(catchError(this.formatErrors));
    // return this.http.get<Product>(`${URL}/category/${slug}`, {params});
  }

  create_product(product: Product): Observable<Product[]> {
    return this.http.post<Product[]>(URL, product);
  }

  update_product(product: Product, id: String): Observable<Product[]> {
    return this.http.put<Product[]>(`${URL}/${id}`, product);
  }

  delete_product(id: String): Observable<Product[]> {
    return this.http.delete<Product[]>(`${URL}/${id}`);
  }
  
  delete_all_products(): Observable<Product[]> {
    return this.http.delete<Product[]>(`${URL}`);
  }

}

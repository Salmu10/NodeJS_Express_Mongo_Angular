import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { ApiService } from './api.service';

const URL = 'http://localhost:8080/api/products';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  
  constructor(private http: HttpClient,  private apiService: ApiService) { }

  get_products(params: any): Observable<{products: Product[], product_count: number}>{
  // get_products(params: any): Observable<Product[]> {
    // new HttpParams({fromObject:params}));
    return this.apiService.get('products', new HttpParams({fromObject:params}));
  }

  all_products(): Observable<Product[]> {
    return this.http.get<Product[]>(URL);
  }

  get_product(slug: String): Observable<Product> {
    return this.http.get<Product>(`${URL}/${slug}`);
  }

  get_products_from_category(slug: String): Observable<Product> {
    return this.http.get<Product>(`${URL}/category/${slug}`);
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

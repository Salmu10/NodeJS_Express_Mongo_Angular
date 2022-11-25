import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';

const URL = 'http://localhost:8080/api/carousel/categories';

@Injectable({
  providedIn: 'root',
})

export class CarouselService {

  constructor(private http: HttpClient) { }

  getCarousel(): Observable<Category[]> {    
    return this.http.get<Category[]>(URL);
  }

}
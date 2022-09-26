import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Furniture } from '../models/furniture.model';

const URL = 'http://localhost:8080/api/furnitures';

@Injectable({
  providedIn: 'root'
})

export class FurnitureService {

  constructor(private http: HttpClient) { }

  all_furnitures(): Observable<Furniture[]> {
    return this.http.get<Furniture[]>(URL);
  }

  get_furniture(id: String): Observable<Furniture> {
    return this.http.get<Furniture>(`${URL}/${id}`);
  }

  create_furniture(furniture: Furniture): Observable<Furniture[]> {
    return this.http.post<Furniture[]>(URL, furniture);
  }

  update_furniture(furniture: Furniture, id: String): Observable<Furniture[]> {
    return this.http.put<Furniture[]>(`${URL}/${id}`, furniture);
  }

  delete_furniture(id: String): Observable<Furniture[]> {
    return this.http.delete<Furniture[]>(`${URL}/${id}`);
  }
  
  delete_all_furnitures(): Observable<Furniture[]> {
    return this.http.delete<Furniture[]>(`${URL}`);
  }

}

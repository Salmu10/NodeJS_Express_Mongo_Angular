import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable ,  throwError } from 'rxjs';

import { catchError } from 'rxjs/operators';

const URL = 'http://localhost:3000/api/';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  constructor(private http: HttpClient) {}

  private formatErrors(error: any) {
    return throwError(error.error);
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(`${URL}${path}`, { params }).pipe(catchError(this.formatErrors));
  }

  get_products(path: string, slug: String, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(`${URL}${path}${slug}`, { params }).pipe(catchError(this.formatErrors));
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this.http.post(`${URL}${path}`, body).pipe(catchError(this.formatErrors));
  }

}
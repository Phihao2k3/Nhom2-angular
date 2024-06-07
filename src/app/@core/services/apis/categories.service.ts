import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { API_BASE_URL, API_ENDPOINT } from '../../config/api-endpoint.config';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private http: HttpClient, private router: Router) {}
  getallCategories(): Observable<any> {
    return this.http.get(API_BASE_URL + API_ENDPOINT.categories.list, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
  createCaterogies
  (data): Observable<any> {
    return this.http.post<any>(
      API_BASE_URL + API_ENDPOINT.categories.create,
     data
    );
  }
  updateCaterogies
  (id: number, data): Observable<any> {
    return this.http.put<any>(
      API_BASE_URL + API_ENDPOINT.categories.update + id,
      data
    );
  }
  deleteCaterogies
  (id: Number): Observable<any> {
    return this.http.delete<any>(
      API_BASE_URL + API_ENDPOINT.categories.delete + id
    );
  }
  getCaterogies
  ById(id: number): Observable<any> {
    return this.http.get<any>(
      API_BASE_URL + API_ENDPOINT.categories.detail + id
    );
  }
}
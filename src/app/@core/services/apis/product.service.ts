import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { API_BASE_URL, API_ENDPOINT } from '../../config/api-endpoint.config';
import { IProduct } from 'app/@core/interfaces/product.interface';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient, private router: Router) {}
  getallProducts(): Observable<any> {
    return this.http.get(API_BASE_URL + API_ENDPOINT.product.list, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
  createProduct(product): Observable<any> {
    return this.http.post<any>(
      API_BASE_URL + API_ENDPOINT.product.create,
      product
    );
  }
  updateProduct(id: number, product): Observable<any> {
    return this.http.put<any>(
      API_BASE_URL + API_ENDPOINT.product.update + id,
      product
    );
  }
  deleteProduct(id: Number): Observable<any> {
    return this.http.delete<any>(
      API_BASE_URL + API_ENDPOINT.product.delete + id
    );
  }
  getProductById(id: number): Observable<any> {
    return this.http.get<any>(
      API_BASE_URL + API_ENDPOINT.product.detail + id
    );
  }
}

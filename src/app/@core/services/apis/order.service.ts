import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { API_BASE_URL, API_ENDPOINT } from '../../config/api-endpoint.config';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient, private router: Router) {}
  getallOrders(): Observable<any> {
    return this.http.get(API_BASE_URL + API_ENDPOINT.order.list, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
  createOrder(Order): Observable<any> {
    return this.http.post<any>(
      API_BASE_URL + API_ENDPOINT.order.create,
      Order
    );
  }
  updateOrder(id: number, Order): Observable<any> {
    return this.http.put<any>(
      API_BASE_URL + API_ENDPOINT.order.update + id,
      Order
    );
  }
  deleteOrder(id: Number): Observable<any> {
    return this.http.delete<any>(
      API_BASE_URL + API_ENDPOINT.order.delete + id
    );
  }
  getOrderById(id: number): Observable<any> {
    return this.http.get<any>(
      API_BASE_URL + API_ENDPOINT.order.detail + id
    );
  }
}
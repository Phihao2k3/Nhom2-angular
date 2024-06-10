import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { ApiService } from "../common";

import { API_BASE_URL, API_ENDPOINT } from '../../config/api-endpoint.config';

@Injectable({
  providedIn: 'root',
})
export class StoreInventoryService {
  constructor(private http: HttpClient, private router: Router) {}

  getallStoreInventory(): Observable<any> {
    return this.http.get(API_BASE_URL + API_ENDPOINT.storeinventory.list, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
  createStoreInventory(StoreInventory): Observable<any> {
    return this.http.post<any>(
      API_BASE_URL + API_ENDPOINT.storeinventory.create,
      StoreInventory
    );
  }
  updateStoreInventory(id: number, StoreInventory): Observable<any> {
    return this.http.put<any>(
      API_BASE_URL + API_ENDPOINT.storeinventory.update + id,
      StoreInventory
    );
  }
  deleteStoreInventory(id: Number): Observable<any> {
    return this.http.delete<any>(
      API_BASE_URL + API_ENDPOINT.storeinventory.delete + id
    );
  }
  getStoreInventoryById(id: number): Observable<any> {
    return this.http.get<any>(
      API_BASE_URL + API_ENDPOINT.storeinventory.detail + id
    );
  }
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { ApiService } from "../common";
import { API_ENDPOINT } from "../../config/api-endpoint.config";
import { API_BASE_URL } from '../../config/api-endpoint.config';

@Injectable({
  providedIn: 'root',
})
export class StoreService extends ApiService {

  constructor(
    private _http: HttpClient,
    private router: Router
  ) {
    super(_http);
  }

  getAllStore(): Observable<any> {
    return this._http.get(API_BASE_URL + API_ENDPOINT.stores.list, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }

  createStore(store): Observable<any> {
    return this._http.post<any>(
      API_BASE_URL + API_ENDPOINT.stores.create,
      store
    );
  }

  updateStore(id: number, store): Observable<any> {
    return this._http.put<any>(
      API_BASE_URL + API_ENDPOINT.stores.update + id,
      store
    );
  }

  deleteStore(id: Number): Observable<any> {
    return this._http.delete<any>(
      API_BASE_URL + API_ENDPOINT.stores.delete + id
    );
  }
  getStoreById(id: number): Observable<any> {
    return this._http.get<any>(
      API_BASE_URL + API_ENDPOINT.stores.detail + id
    );
  }
}

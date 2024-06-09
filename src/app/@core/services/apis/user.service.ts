import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { ApiService } from "../common";
import { UserProfile } from "../../model/user-info.model";
import { API_ENDPOINT } from "../../config/api-endpoint.config";
import { API_BASE_URL } from '../../config/api-endpoint.config';

@Injectable({
  providedIn: 'root',
})
export class UserService extends ApiService {

  constructor(
    private _http: HttpClient,
    private router: Router
  ) {
    super(_http);
  }

  updateProfile(): Observable<UserProfile[]> {
    return this.get(API_ENDPOINT.auth.updateProfile);
  }
  getAllUser(): Observable<any> {
    return this._http.get(API_BASE_URL + API_ENDPOINT.users.list, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }

  createUser(user): Observable<any> {
    return this._http.post<any>(
      API_BASE_URL + API_ENDPOINT.users.create,
      user
    );
  }

  updateUser(id: number, user): Observable<any> {
    return this._http.put<any>(
      API_BASE_URL + API_ENDPOINT.users.update + id,
      user
    );
  }

  deleteUser(id: Number): Observable<any> {
    return this._http.delete<any>(
      API_BASE_URL + API_ENDPOINT.users.delete + id
    );
  }
  getUserById(id: number): Observable<any> {
    return this._http.get<any>(
      API_BASE_URL + API_ENDPOINT.users.detail + id
    );
  }
}

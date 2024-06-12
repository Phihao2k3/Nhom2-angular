import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { API_BASE_URL, API_ENDPOINT } from '../../config/api-endpoint.config';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  constructor(private http: HttpClient, private router: Router) {}
  getallEmployees(): Observable<any> {
    return this.http.get(API_BASE_URL + API_ENDPOINT.employees.list, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
  createEmployees
  (data): Observable<any> {
    return this.http.post<any>(
      API_BASE_URL + API_ENDPOINT.employees.create,
     data
    );
  }
  updateEmployees
  (id, data): Observable<any> {
    return this.http.put<any>(
      API_BASE_URL + API_ENDPOINT.employees.update + id,
      data
    );
  }
  deleteEmployees
  (id: Number): Observable<any> {
    return this.http.delete<any>(
      API_BASE_URL + API_ENDPOINT.employees.delete + id
    );
  }
  getEmployees
  ById(id: number): Observable<any> {
    return this.http.get<any>(
      API_BASE_URL + API_ENDPOINT.employees.detail + id
    );
  }
}
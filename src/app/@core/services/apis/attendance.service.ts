import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { API_BASE_URL, API_ENDPOINT } from '../../config/api-endpoint.config';

@Injectable({
  providedIn: 'root',
})
export class AttendanceService {
  constructor(private http: HttpClient, private router: Router) {}
  getallAttendances(): Observable<any> {
    return this.http.get(API_BASE_URL + API_ENDPOINT.attendance.list, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
  createAttendance(Attendance): Observable<any> {
    return this.http.post<any>(API_BASE_URL + API_ENDPOINT.attendance.create, Attendance);
  }
  updateAttendance(id: number, Attendance): Observable<any> {
    return this.http.put<any>(
      API_BASE_URL + API_ENDPOINT.attendance.update + id,
      Attendance
    );
  }
  deleteAttendance(id: Number): Observable<any> {
    return this.http.delete<any>(API_BASE_URL + API_ENDPOINT.attendance.delete + id);
  }
  getAttendanceById(id: number): Observable<any> {
    return this.http.get<any>(API_BASE_URL + API_ENDPOINT.attendance.detail + id);
  }
  getallAttendanceDetail(): Observable<any> {
    return this.http.get(API_BASE_URL + API_ENDPOINT.attendance.detail, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
  checkatt(id: number): Observable<any> {
    return this.http.get<any>(
      // query params
      API_BASE_URL + API_ENDPOINT.attendance.check + '?id=' + id,
      {}
    );
  }
}

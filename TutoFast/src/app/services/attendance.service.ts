import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Attendance } from '../models/Attendance/attendance';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  constructor(private http: HttpClient) { }

  // Http Default Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  // API Erros Handling
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Default error handling
      console.error('An error occurred: ', error.error.message);
    } else {
      // Unsuccessful Response Code Error returned from Backend
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return Observable with Error Message to Client
    return throwError('Something happend with request, please try again later');
  }

  // List Attendance
  getList(request) {
    const endpoint = environment.apiUrl + '/attendances';
    const params = request;
    return this.http.get(endpoint, {params});
  }

  // Add Attendance
  createItem(session,item): Observable<Attendance> {
    return this.http.post<Attendance>(environment.apiUrl + '/sessions' + '/' + session + '/attendances',
      JSON.stringify(item), this.httpOptions)
      .pipe(
        catchError(this.handleError));
  }

  // Get Attendance By ID
  getItem(id): Observable<Attendance> {
    return this.http.get<Attendance>(environment.apiUrl + '/attendances' + '/' + id)
      .pipe(
        // retry(2),
        catchError(this.handleError));
  }

  // Update Attendance
  updateItem(session,id,item): Observable<Attendance> {
    return this.http.put<Attendance>( environment.apiUrl + '/sessions' + '/' + session + '/attendances' + '/' + id,
      JSON.stringify(item), this.httpOptions)
      .pipe(
        // retry(2),
        catchError(this.handleError));
  }

  // Delete Attendance
  deleteItem(id) {
    return this.http.delete<Attendance>(environment.apiUrl + '/attendances' + '/' + id, this.httpOptions)
      .pipe(
        // retry(2),
        catchError(this.handleError));
  }
}

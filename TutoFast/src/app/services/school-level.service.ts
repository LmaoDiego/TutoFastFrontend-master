import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SchoolLevel } from '../models/SchoolLevel/school-level';

@Injectable({
  providedIn: 'root'
})
export class SchoolLevelService {

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

  // List SchoolLevel
  getList(request) {
    const endpoint = environment.apiUrl + '/schoolLevels';
    const params = request;
    return this.http.get(endpoint, {params});
  }

  // Add SchoolLevel
  createItem(item): Observable<SchoolLevel> {
    return this.http.post<SchoolLevel>(environment.apiUrl + '/schoolLevels', JSON.stringify(item), this.httpOptions)
      .pipe(
        catchError(this.handleError));
  }

  // Get SchoolLevel By ID
  getItem(id): Observable<SchoolLevel> {
    return this.http.get<SchoolLevel>(environment.apiUrl + '/schoolLevels' + '/' + id)
      .pipe(
        // retry(2),
        catchError(this.handleError));
  }

  // Update SchoolLevel
  updateItem(id, item): Observable<SchoolLevel> {
    return this.http.put<SchoolLevel>( environment.apiUrl + '/schoolLevels' + '/' + id,
      JSON.stringify(item), this.httpOptions)
      .pipe(
        // retry(2),
        catchError(this.handleError));
  }

  // Delete SchoolLevel
  deleteItem(id) {
    return this.http.delete<SchoolLevel>(environment.apiUrl + '/schoolLevels' + '/' + id, this.httpOptions)
      .pipe(
        // retry(2),
        catchError(this.handleError));
  }
}

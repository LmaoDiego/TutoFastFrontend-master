import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { District } from '../models/District/district';

@Injectable({
  providedIn: 'root'
})
export class DistrictService {

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

  // List District
  getList(request) {
    const endpoint = environment.apiUrl + '/districts';
    const params = request;
    return this.http.get(endpoint, {params});
  }

  // Add District
  createItem(id, item): Observable<District> {
    return this.http.post<District>(environment.apiUrl + '/economicLevels' + '/' + id + '/districts', JSON.stringify(item), this.httpOptions)
      .pipe(
        catchError(this.handleError));
  }

  // Get District By ID
  getItem(id): Observable<District> {
    return this.http.get<District>(environment.apiUrl + '/districts' + '/' + id)
      .pipe(
        // retry(2),
        catchError(this.handleError));
  }

  // Update District
  updateItem(id, item): Observable<District> {
    return this.http.put<District>( environment.apiUrl + '/districts' + '/' + id,
      JSON.stringify(item), this.httpOptions)
      .pipe(
        // retry(2),
        catchError(this.handleError));
  }

  // Delete District
  deleteItem(id) {
    return this.http.delete<District>(environment.apiUrl + '/districts' + '/' + id, this.httpOptions)
      .pipe(
        // retry(2),
        catchError(this.handleError));
  }
}

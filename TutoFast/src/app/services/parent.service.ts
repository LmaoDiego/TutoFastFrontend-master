import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Teacher} from '../models/Teacher/teacher';
import {catchError} from 'rxjs/operators';
import {Parent} from '../models/Parent/parent';

@Injectable({
  providedIn: 'root'
})
export class ParentService {

  constructor(private http: HttpClient) { }

  // Http Default Options
  httpOptions = {
    headers: new HttpHeaders( {
      'Content-Type': 'application/json',
    })
  };

  // API Erros Handling
  handleError(error: HttpErrorResponse){
    if (error.error instanceof ErrorEvent){
      // Default error handling
      console.error('An error occurred: ', error.error.message);
    }
    else {
      // Unsuccessful Response Code Error returned from Backend
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return Observable with Error Message to Client
    return throwError('Something happend with request, please try again later');
  }

  // List Parent
  getList(request) {
    const endpoint = environment.apiUrl + '/parents';
    const params = request;
    return this.http.get(endpoint, {params});
  }

  // Add Parent
  createItem(district, photo, item): Observable<Parent> {
    return this.http.post<Parent>(environment.apiUrl + '/districts' + '/' + district + '/files' + '/' + photo +
                                                           '/parents',
      JSON.stringify(item), this.httpOptions)
      .pipe(
        catchError(this.handleError));
  }

  // Get Parent By ID
  getItem(id): Observable<Parent> {
    return this.http.get<Parent>(environment.apiUrl + '/parents' + '/' + id)
      .pipe(
        // retry(2),
        catchError(this.handleError));
  }

  // Update Parent
  updateItem(district, id, item): Observable<Parent> {
    return this.http.put<Parent>( environment.apiUrl + '/districts' + '/' + district + '/parents' + '/' + id,
      JSON.stringify(item), this.httpOptions)
      .pipe(
        // retry(2),
        catchError(this.handleError));
  }

  // Delete Parent
  deleteItem(id) {
    return this.http.delete<Parent>(environment.apiUrl + '/parents' + '/' + id, this.httpOptions)
      .pipe(
        // retry(2),
        catchError(this.handleError));
  }
}

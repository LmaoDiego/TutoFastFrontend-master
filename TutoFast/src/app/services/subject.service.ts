import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {environment} from '../../environments/environment';
import {catchError} from 'rxjs/operators';
import {Subject} from '../models/Subject/subject';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

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

  // List Subject
  getList(request) {
    const endpoint = environment.apiUrl + '/subjects';
    const params = request;
    return this.http.get(endpoint, {params});
  }

  // Add Subject
  createItem(item): Observable<Subject> {
    return this.http.post<Subject>(environment.apiUrl + '/subjects', JSON.stringify(item), this.httpOptions)
      .pipe(
        catchError(this.handleError));
  }

  // Get Subject By ID
  getItem(id): Observable<Subject> {
    return this.http.get<Subject>(environment.apiUrl + '/subjects' + '/' + id)
      .pipe(
        // retry(2),
        catchError(this.handleError));
  }

  // Update Subject
  updateItem(id, item): Observable<Subject> {
    return this.http.put<Subject>( environment.apiUrl + '/subjects' + '/' + id,
      JSON.stringify(item), this.httpOptions)
      .pipe(
        // retry(2),
        catchError(this.handleError));
  }

  // Delete Subject
  deleteItem(id) {
    return this.http.delete<Subject>(environment.apiUrl + '/subjects' + '/' + id, this.httpOptions)
      .pipe(
        // retry(2),
        catchError(this.handleError));
  }
}

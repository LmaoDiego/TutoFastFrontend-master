import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Session } from '../models/Session/session';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

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

  // List Session
  getList(request) {
    const endpoint = environment.apiUrl + '/sessions';
    const params = request;
    return this.http.get(endpoint, {params});
  }

  // Add Session
  createItem(teacher, student, subject,item): Observable<Session> {
    return this.http.post<Session>(environment.apiUrl + '/teachers' + '/' + teacher + '/students' + '/' + student +
      '/subjects' + '/' + subject + '/sessions',
      JSON.stringify(item), this.httpOptions)
      .pipe(
        catchError(this.handleError));
  }

  // Get Session By ID
  getItem(id): Observable<Session> {
    return this.http.get<Session>(environment.apiUrl + '/sessions' + '/' + id)
      .pipe(
        // retry(2),
        catchError(this.handleError));
  }

  // Update Session
  updateItem(teacher, student, subject,id,item): Observable<Session> {
    return this.http.put<Session>( environment.apiUrl + '/teachers' + '/' + teacher + '/students' + '/' + student +
      '/subjects' + '/' + subject + '/sessions' + '/' + id,
      JSON.stringify(item), this.httpOptions)
      .pipe(
        // retry(2),
        catchError(this.handleError));
  }

  // Delete Session
  deleteItem(id) {
    return this.http.delete<Session>(environment.apiUrl + '/sessions' + '/' + id, this.httpOptions)
      .pipe(
        // retry(2),
        catchError(this.handleError));
  }
}

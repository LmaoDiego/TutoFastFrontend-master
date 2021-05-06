import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Teacher } from '../models/Teacher/teacher';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

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

  // List Teacher
  getList(request) {
    const endpoint = environment.apiUrl + '/teachers';
    const params = request;
    return this.http.get(endpoint, {params});
  }

  // Add Teacher
  createItem(district, photo, item): Observable<Teacher> {
    return this.http.post<Teacher>(environment.apiUrl + '/districts' + '/' + district + '/files' + '/' + photo +
                                                            '/teachers',
      JSON.stringify(item), this.httpOptions)
      .pipe(
        catchError(this.handleError));
  }

  // Get Teacher By ID
  getItem(id): Observable<Teacher> {
    return this.http.get<Teacher>(environment.apiUrl + '/teachers' + '/' + id)
      .pipe(
        // retry(2),
        catchError(this.handleError));
  }

  // Update Teacher
  updateItem(district, id, item): Observable<Teacher> {
    return this.http.put<Teacher>( environment.apiUrl + '/districts' + '/' + district + '/teachers' + '/' + id,
      JSON.stringify(item), this.httpOptions)
      .pipe(
        // retry(2),
        catchError(this.handleError));
  }

  // Delete Teacher
  deleteItem(id) {
    return this.http.delete<Teacher>(environment.apiUrl + '/teachers' + '/' + id, this.httpOptions)
      .pipe(
        // retry(2),
        catchError(this.handleError));
  }
}

import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {SchoolLevel} from '../models/SchoolLevel/school-level';
import {catchError} from 'rxjs/operators';
import {SchoolGrade} from '../models/SchoolGrade/school-grade';

@Injectable({
  providedIn: 'root'
})
export class SchoolGradeService {

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

  // List SchoolGrade
  getList(request) {
    const endpoint = environment.apiUrl + '/schoolGrades';
    const params = request;
    return this.http.get(endpoint, {params});
  }

  // Add SchoolGrade
  createItem(item): Observable<SchoolGrade> {
    return this.http.post<SchoolGrade>(environment.apiUrl + '/schoolGrades', JSON.stringify(item), this.httpOptions)
      .pipe(
        catchError(this.handleError));
  }

  // Get SchoolGrade By ID
  getItem(id): Observable<SchoolGrade> {
    return this.http.get<SchoolGrade>(environment.apiUrl + '/schoolGrades' + '/' + id)
      .pipe(
        // retry(2),
        catchError(this.handleError));
  }

  // Update SchoolGrade
  updateItem(id, item): Observable<SchoolGrade> {
    return this.http.put<SchoolGrade>( environment.apiUrl + '/schoolGrades' + '/' + id,
      JSON.stringify(item), this.httpOptions)
      .pipe(
        // retry(2),
        catchError(this.handleError));
  }

  // Delete SchoolGrade
  deleteItem(id) {
    return this.http.delete<SchoolGrade>(environment.apiUrl + '/schoolGrades' + '/' + id, this.httpOptions)
      .pipe(
        // retry(2),
        catchError(this.handleError));
  }
}

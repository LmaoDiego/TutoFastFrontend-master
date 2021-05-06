import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {environment} from "../../environments/environment";
import {OutcomeReport} from "../models/OutcomeReport/outcome-report";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class OutcomeReportService {

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

  // List OutcomeReport
  getList(request) {
    const endpoint = environment.apiUrl + '/outcomeReports';
    const params = request;
    return this.http.get(endpoint, {params});
  }

  // Add OutcomeReport
  createItem(student, teacher, item): Observable<OutcomeReport> {
    return this.http.post<OutcomeReport>(environment.apiUrl + '/students' + '/' + student + '/teachers' + '/' + teacher + '/outcomeReports', JSON.stringify(item), this.httpOptions)
      .pipe(
        catchError(this.handleError));
  }

  // Get OutcomeReport By ID
  getItem(id): Observable<OutcomeReport> {
    return this.http.get<OutcomeReport>(environment.apiUrl + '/outcomeReports' + '/' + id)
      .pipe(
        // retry(2),
        catchError(this.handleError));
  }

  // Delete OutcomeReport
  deleteItem(id) {
    return this.http.delete<OutcomeReport>(environment.apiUrl + '/outcomeReports' + '/' + id, this.httpOptions)
      .pipe(
        // retry(2),
        catchError(this.handleError));
  }
}

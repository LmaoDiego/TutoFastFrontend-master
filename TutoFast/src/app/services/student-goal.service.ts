import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {environment} from "../../environments/environment";
import {StudentGoal} from "../models/StudentGoal/student-goal";
import {catchError} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class StudentGoalService {

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

  // List StudentGoal
  getList(request) {
    const endpoint = environment.apiUrl + '/studentGoals';
    const params = request;
    return this.http.get(endpoint, {params});
  }

  // Add StudentGoal
  createItem(outcomeReport,subject,session, item): Observable<StudentGoal> {
    return this.http.post<StudentGoal>(environment.apiUrl + '/outcomeReports' + '/' + outcomeReport + '/subjects' + '/' + subject + '/sessions' + '/' + session +'/studentGoals', JSON.stringify(item), this.httpOptions)
      .pipe(
        catchError(this.handleError));
  }

  // Get StudentGoal By ID
  getItem(id): Observable<StudentGoal> {
    return this.http.get<StudentGoal>(environment.apiUrl + '/studentGoals' + '/' + id)
      .pipe(
        // retry(2),
        catchError(this.handleError));
  }

  // Update StudentGoal
  updateItem(id, item): Observable<StudentGoal> {
    return this.http.put<StudentGoal>( environment.apiUrl + '/studentGoals' + '/' + id,
      JSON.stringify(item), this.httpOptions)
      .pipe(
        // retry(2),
        catchError(this.handleError));
  }

  // Delete StudentGoal
  deleteItem(id) {
    return this.http.delete<StudentGoal>(environment.apiUrl + '/studentGoals' + '/' + id, this.httpOptions)
      .pipe(
        // retry(2),
        catchError(this.handleError));
  }
}

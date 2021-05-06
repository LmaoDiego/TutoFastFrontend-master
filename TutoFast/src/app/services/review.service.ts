import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {environment} from "../../environments/environment";
import {Review} from "../models/Review/review";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

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

  // List Review
  getList(request) {
    const endpoint = environment.apiUrl + '/reviews';
    const params = request;
    return this.http.get(endpoint, {params});
  }

  // Add Review
  createItem(parent,teacher, item): Observable<Review> {
    return this.http.post<Review>(environment.apiUrl + '/parents' + '/' + parent + '/teachers' + '/' + teacher + '/reviews', JSON.stringify(item), this.httpOptions)
      .pipe(
        catchError(this.handleError));
  }

  // Get Review By ID
  getItem(id): Observable<Review> {
    return this.http.get<Review>(environment.apiUrl + '/reviews' + '/' + id)
      .pipe(
        // retry(2),
        catchError(this.handleError));
  }

  // Update Review
  updateItem(id, item): Observable<Review> {
    return this.http.put<Review>( environment.apiUrl + '/reviews' + '/' + id,
      JSON.stringify(item), this.httpOptions)
      .pipe(
        // retry(2),
        catchError(this.handleError));
  }

  // Delete Review
  deleteItem(id) {
    return this.http.delete<Review>(environment.apiUrl + '/reviews' + '/' + id, this.httpOptions)
      .pipe(
        // retry(2),
        catchError(this.handleError));
  }
}

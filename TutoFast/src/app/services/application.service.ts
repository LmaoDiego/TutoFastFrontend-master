import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {environment} from "../../environments/environment";
import {catchError} from "rxjs/operators";
import {Application} from "../models/Application/application";

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(private http:HttpClient) { }

  httpOptions={
    headers: new HttpHeaders({
      'Content-Type':'application/json'
    })
  }

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

  getList(request) {
    const endpoint = environment.apiUrl + '/applications';
    const params = request;
    return this.http.get(endpoint, {params});
  }

  createItem(teacherId,fileId, item): Observable<Application> {

    return this.http.post<Application>(environment.apiUrl + '/teachers/' + teacherId + 'files/'+fileId+'/applications', JSON.stringify(item), this.httpOptions)
      .pipe(
        catchError(this.handleError));
  }

  getItem(id): Observable<Application> {
    return this.http.get<Application>(environment.apiUrl + '/applications/' + id)
      .pipe(
        // retry(2),
        catchError(this.handleError));
  }

  updateItem(id, item): Observable<Application> {
    //No permite actualizar teacher ni file. Solo state y message
    return this.http.put<Application>( environment.apiUrl + '/applications/' + id,
      JSON.stringify(item), this.httpOptions)
      .pipe(
        // retry(2),
        catchError(this.handleError));
  }

  deleteItem(id) {
    return this.http.delete<Application>( environment.apiUrl + '/applications/' + id, this.httpOptions)
      .pipe(
        // retry(2),
        catchError(this.handleError));
  }

}

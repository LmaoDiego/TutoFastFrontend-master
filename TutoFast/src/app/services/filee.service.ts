import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {environment} from "../../environments/environment";
import {catchError} from "rxjs/operators";
import {Filee} from "../models/Filee/filee";

@Injectable({
  providedIn: 'root'
})
export class FileeService {

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

  // List EconomicLevel
  getList(request) {
    const endpoint = environment.apiUrl + '/files';
    const params = request;
    return this.http.get(endpoint, {params});
  }

  // Add EconomicLevel
  createItem(item): Observable<Filee> {
    //Item multipartFile
    return this.http.post<Filee>(environment.apiUrl + '/files', JSON.stringify(item), this.httpOptions)
      .pipe(
        catchError(this.handleError));
  }

  // Get EconomicLevel By ID
  getItem(id): Observable<Filee> {
    return this.http.get<Filee>(environment.apiUrl + '/files/' + id)
      .pipe(
        // retry(2),
        catchError(this.handleError));
  }

  downloadItem(id): Observable<Filee> {
    return this.http.get<Filee>(environment.apiUrl + '/files/' + id + '/download')
      .pipe(
        // retry(2),
        catchError(this.handleError));
  }



/*
  // Update EconomicLevel
  updateItem(id, item): Observable<EconomicLevel> {
    return this.http.put<EconomicLevel>( environment.apiUrl + '/economicLevels' + '/' + id,
      JSON.stringify(item), this.httpOptions)
      .pipe(
        // retry(2),
        catchError(this.handleError));
  }
*/
  // Delete EconomicLevel
  deleteItem(id) {
    return this.http.delete<Filee>(environment.apiUrl + '/files/' + id, this.httpOptions)
      .pipe(
        // retry(2),
        catchError(this.handleError));
  }
}

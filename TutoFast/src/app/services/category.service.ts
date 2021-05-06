import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Category } from '../models/Category/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

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

  // List Category
  getList(request) {
    const endpoint = environment.apiUrl + '/categories';
    const params = request;
    return this.http.get(endpoint, {params});
  }

  // Add Category
  createItem(item): Observable<Category> {
    return this.http.post<Category>(environment.apiUrl + '/categories', JSON.stringify(item), this.httpOptions)
      .pipe(
        catchError(this.handleError));
  }

  // Get Category By ID
  getItem(id): Observable<Category> {
    return this.http.get<Category>(environment.apiUrl + '/categories' + '/' + id)
      .pipe(
        // retry(2),
        catchError(this.handleError));
  }

  // Update Category
  updateItem(id, item): Observable<Category> {
    return this.http.put<Category>( environment.apiUrl + '/categories' + '/' + id,
      JSON.stringify(item), this.httpOptions)
      .pipe(
        // retry(2),
        catchError(this.handleError));
  }

  // Delete Category
  deleteItem(id) {
    return this.http.delete<Category>(environment.apiUrl + '/categories' + '/' + id, this.httpOptions)
      .pipe(
        // retry(2),
        catchError(this.handleError));
  }
}

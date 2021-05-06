import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Parent} from '../models/Parent/parent';
import {catchError} from 'rxjs/operators';
import {Student} from '../models/Student/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

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

  // List Student
  getList(request) {
    const endpoint = environment.apiUrl + '/students';
    const params = request;
    return this.http.get(endpoint, {params});
  }

  // Add Student
  createItem(district, photo, schoolLevel, schoolGrade, item): Observable<Student> {
    return this.http.post<Student>(environment.apiUrl + '/districts' + '/' + district + '/files' + '/' + photo +
                                                            '/schoolLevels' + '/' + schoolLevel + '/schoolGrades' + '/' + schoolGrade +
                                                            '/students',
      JSON.stringify(item), this.httpOptions)
      .pipe(
        catchError(this.handleError));
  }

  // Get Parent By ID
  getItem(id): Observable<Student> {
    return this.http.get<Student>(environment.apiUrl + '/students' + '/' + id)
      .pipe(
        // retry(2),
        catchError(this.handleError));
  }

  // Update Parent
  updateItem(district, schoolLevel, schoolGrade, id, item): Observable<Student> {
    return this.http.put<Student>( environment.apiUrl + '/districts' + '/' + district + '/schoolLevels' + '/' + schoolLevel +
                                                          '/schoolGrades' + '/' + schoolGrade + '/students' + '/' + id,
      JSON.stringify(item), this.httpOptions)
      .pipe(
        // retry(2),
        catchError(this.handleError));
  }

  // Delete Parent
  deleteItem(id) {
    return this.http.delete<Student>(environment.apiUrl + '/students' + '/' + id, this.httpOptions)
      .pipe(
        // retry(2),
        catchError(this.handleError));
  }
}

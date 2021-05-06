import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) { }

  // List Course
  getList(request) {
    const endpoint = environment.apiUrl + '/courses';
    const params = request;
    return this.http.get(endpoint, {params});
  }
}

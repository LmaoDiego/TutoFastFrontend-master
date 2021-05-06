import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  // List User
  getList(request) {
    const endpoint = environment.apiUrl + '/users';
    const params = request;
    return this.http.get(endpoint, {params});
  }
}

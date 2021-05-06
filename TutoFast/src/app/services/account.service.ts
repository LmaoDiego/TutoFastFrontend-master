import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  // List Account
  getList(request) {
    const endpoint = environment.apiUrl + '/accounts';
    const params = request;
    return this.http.get(endpoint, {params});
  }
}

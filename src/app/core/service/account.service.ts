import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import { environment } from '../../../environments/environment';

import { Account } from '../models/account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiUrl: string = environment.apiUrl;
   httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.getToken}`
    })
  };
  constructor(private http: HttpClient) { }


  public register(user: object) {
    return this.http.post('http://127.0.0.1:3000/api/account/register', user, {
      headers: new HttpHeaders({
           'Content-Type':  'application/json',
         })
    });
  }

  update(account: Account) {

    return this.http.post<any>(this.apiUrl + 'account/updateProfile', account, this.httpOptions);
  }

  updateOld(account: Account) {
    return this.http.post<any>(this.apiUrl + 'account/updateProfile', account, this.httpOptions);
  }

  getToken() {
    return JSON.parse(localStorage.getItem('token'));
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

}

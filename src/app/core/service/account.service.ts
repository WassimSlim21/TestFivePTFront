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

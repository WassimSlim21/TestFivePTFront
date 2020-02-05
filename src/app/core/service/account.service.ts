import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpRequest,
  HttpEvent
} from '@angular/common/http';
import { environment } from '../../../environments/environment';

import {Account} from '../models/account.module';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiUrl: string = environment.apiUrl;

  constructor(public http: HttpClient) { }

  update(account: Account) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      })
    };
    return this.http.post<any>(this.apiUrl + 'user/update', account, httpOptions);
  }


}

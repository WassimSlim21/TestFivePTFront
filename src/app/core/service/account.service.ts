import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import { environment } from '../../../environments/environment';

import {Account} from '../models/account.module';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiUrl: string = environment.apiUrl;
   httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTNiNDQxY2E0N2NjMTRlY2MwZTVmMGUiLCJ1c2VybmFtZSI6Indhc3NpbTU0NTQiLCJtYWlsIjoidGVzdEB0ZXN0LmNvbSIsInJvbGUiOiJhZG1pbiIsInBhc3N3b3JkIjoiJDJhJDEwJE51WWpCMU5EV3F1V3JoVFNuT0hIeXUvdzNsR0xDQW1Bb2lEcFBJUXdBLllUWk0xOVFZWWE2IiwiX192IjowLCJpYXQiOjE1ODA5NDI4MDYsImV4cCI6MTU4MTAyOTIwNn0.PAZ4Ty_7L4cuInAN-NJ0BO4pb_lfYGtKp79nIwntMFI`
    })
  };
  constructor(private http: HttpClient) { }


  update(account: Account) {

    return this.http.post<any>(this.apiUrl + 'user/update', account, this.httpOptions);
  }

  updateOld(account: Account) {
    return this.http.post<any>(this.apiUrl + 'user/update', account, this.httpOptions);
  }

}

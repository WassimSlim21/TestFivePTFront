import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import { environment } from '../../../environments/environment';

import { Account } from '../models/account';
import { JwtHelperService } from '@auth0/angular-jwt';

import { Observable } from 'rxjs';
const TOKEN_KEY = 'token';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  user: Account;
  users: any;
  jwtToken = null;
  private host = 'http://localhost:3000';

  private apiUrl: string = environment.apiUrl;
   httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token').split(' ')[1]
    })
  };
  constructor(private http: HttpClient, public jwtHelper: JwtHelperService) { }


  public register(user: object) {
    return this.http.post('http://127.0.0.1:3000/api/account/register', user, {
      headers: new HttpHeaders({
           'Content-Type':  'application/json',
         })
    });
  }

  update(account: object) {

    return this.http.put<any>('http://localhost:3000/api/account/update' , account);
  }



  getToken() {
    return localStorage.getItem('token').split(' ')[1];

  }

  getUser() {
    return JSON.parse(localStorage.getItem('user'));
  }




  setLoggedin() {
    localStorage.removeItem('loggedin');
    localStorage.setItem('loggedin', 'true');
}

setLoggedOut() {
   localStorage.removeItem('token');
   localStorage.removeItem('account')
   localStorage.removeItem('loggedin');
   localStorage.setItem('loggedin', 'false');
   localStorage.clear();
}

getLoggedin() {
    return localStorage.getItem('loggedin');
}

loadToken() {
    this.jwtToken = localStorage.getItem(TOKEN_KEY);
}

public isAuthenticated(): boolean {
  // const token = window.sessionStorage.getItem('token');
  const token = localStorage.getItem('token');
  return !this.jwtHelper.isTokenExpired(token);
}

getCurrentUser() {
    const token = localStorage.getItem(TOKEN_KEY);
    const jwtHelper = new JwtHelperService();
    return jwtHelper.decodeToken(token);
}

getUserAllData() {
  this.setLoggedin();
  const httpOptions = {
        headers: new HttpHeaders({
            'Content-Type':  'application/json',
            Authorization: 'Bearer ' + window.sessionStorage.getItem('token'),
        })};
  if (this.jwtToken == null) {
        this.loadToken();
    }
  this.users = this.getCurrentUser();
  console.log(this.users);
  return this.http.get(this.host + '/api/account/get/' + this.users._id ,  httpOptions);

}

sendCredential(userName: string, password: string): Observable<any> {
    const credentials = {userName, password};

    return this.http.post<any>('http://localhost:3000/api/account/login', credentials);
}




check() {
    console.log('check test :');
    return this.http.get('http://localhost:3000/check');
}

}

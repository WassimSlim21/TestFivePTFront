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

  constructor(private http: HttpClient, public jwtHelper: JwtHelperService) { }



  /* --------------------------------Authentification and Register Services ------------------ */


/* -------Create new account -------- */
  public register(user: object) {
    return this.http.post('http://127.0.0.1:3000/api/account/register', user, {
      headers: new HttpHeaders({
           'Content-Type':  'application/json',
         })
    });
  }
/* ------update account -------- */
  update(account: object) {

    return this.http.put<any>('http://localhost:3000/api/account/update' , account);
  }



  getToken() {
    return localStorage.getItem('token');

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
   localStorage.removeItem('account');
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



sendCredential(userName: string, password: string): Observable<any> {
    const credentials = {userName, password};

    return this.http.post<any>('http://localhost:3000/api/account/login', credentials);
}


getUserAllData(id : string) {
  return this.http.get<any>('http://localhost:3000/api/user/' + id );
}




}

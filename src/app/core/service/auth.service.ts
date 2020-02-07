import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
const TOKEN_KEY = 'token';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, public jwtHelper: JwtHelperService) { }

    user: Account;
    users: any;
    jwtToken = null;
    private host = 'http://localhost:3000';

    setLoggedin() {
        window.sessionStorage.removeItem('loggedin');
        window.sessionStorage.setItem('loggedin', 'true');
    }

    setLoggedOut() {
        window.sessionStorage.removeItem('loggedin');
        window.sessionStorage.setItem('loggedin', 'false');
        localStorage.clear();
    }

    getLoggedin() {
        return window.sessionStorage.getItem('loggedin');
    }

    loadToken() {
        this.jwtToken = window.sessionStorage.getItem(TOKEN_KEY);
    }

    public isAuthenticated(): boolean {
      const token = window.sessionStorage.getItem('token');
      return !this.jwtHelper.isTokenExpired(token);
    }

    getCurrentUser() {
        const token = window.sessionStorage.getItem(TOKEN_KEY);
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

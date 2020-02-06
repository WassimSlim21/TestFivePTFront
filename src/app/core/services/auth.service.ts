import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { JwtHelperService } from '@auth0/angular-jwt';
import 'rxjs/add/operator/map';
import {User} from '../models/user.model';
const TOKEN_KEY = 'AuthToken';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, public jwtHelper: JwtHelperService) { }

    user: User;
    users: any;
    jwtToken = null;
    private host: string = 'http://localhost:3000';

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
      const token = window.sessionStorage.getItem('AuthToken');
      return !this.jwtHelper.isTokenExpired(token);
    }

    getCurrentUser() {
        let token = window.sessionStorage.getItem(TOKEN_KEY);
        let jwtHelper = new JwtHelperService();
        return jwtHelper.decodeToken(token);
    }

    getUserAllData() {
      this.setLoggedin();
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Authorization': 'Bearer ' + window.sessionStorage.getItem('AuthToken'),
            })};
        if (this.jwtToken == null) {
            this.loadToken();
        }
        this.users = this.getCurrentUser();
        return this.http.get(this.host + '/user/email/' + this.users.sub ,  httpOptions);

    }

    sendCredential(username: string, password: string): Observable<any> {
        const credentials = {username: username, password: password};
        console.log('Connexion ::');
        return this.http.post<any>('http://localhost:3000/token/generate-token', credentials);
    }



   /* public requestPwd(email) {
      return this.http.get<boolean>('http://localhost:8088/pwd/email/'+email);
    }

    public verifyToken(token){
      return this.http.get<User>('http://localhost:8088/pwd/verifyToken/'+token);
    }

    public mailExist(email){
      return this.http.get<boolean>('http://localhost:8088/mailunique/'+email);
    }

    public resetPwd(token,pwd){
      let params : String[] = [token, pwd];
      return this.http.post<any>('http://localhost:8088/pwd/reset',params);
    }
*/
    check() {
        console.log('check test :');
        return this.http.get('http://localhost:3000/check');
    }
}

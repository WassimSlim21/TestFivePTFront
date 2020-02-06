import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  constructor(private httpClient: HttpClient) { }


public register(user: object) {
  return this.httpClient.post('http://127.0.0.1:3000/api/account/register', user, {
    headers: new HttpHeaders({
         'Content-Type':  'application/json',
       })
  });
}

}

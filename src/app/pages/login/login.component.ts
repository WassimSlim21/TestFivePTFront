import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../core/service/auth.service';
import {Router} from '@angular/router';
import {TokenStorage} from '../../core/service/token.storage';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private credential = {userName: '', password : ''};
  userName: string;
  password: string;
  account: any;
  constructor( private authService: AuthService, private router: Router, private token: TokenStorage)  { }

  ngOnInit() {
  }

  login(): void {

    this.authService.sendCredential(this.userName, this.password).subscribe(
      data => {
       // this.token.saveToken(data.token);
        localStorage.setItem('account', JSON.stringify(data.account));
        localStorage.setItem('token', JSON.stringify(data.token));
        if (data.account.role === 'admin' ) {
          this.router.navigate(['/']);
        } else {
          this.router.navigate(['/login']);
        }

      },
      error => {
        console.log(error);
      },



    );


  }



}

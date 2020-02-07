import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../core/services/auth.service";
import {Router} from "@angular/router";
import {TokenStorage} from "../../core/services/token.storage";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private credential = {'userName': '', 'password' : ''};
  userName: string;
  password: string;
  user: any;
  constructor( private authService: AuthService, private router: Router, private token: TokenStorage)  { }

  ngOnInit() {
  }

  login(): void {

    this.authService.sendCredential(this.userName, this.password).subscribe(
      data => {
        this.token.saveToken(data.token);
        console.log(data.token);
      },
      error => {
        console.log(error);
      },
      () => {
        this.authService.getUserAllData().subscribe(
          data => {
            this.user = data;
            console.log(this.user);
            localStorage.setItem("ROLE", this.user.role.role);
            localStorage.setItem("Id", this.user.id);
            localStorage.setItem("UserName", this.user.userName);
            localStorage.setItem("Email", this.user.email);
            if(this.user.role.role == "admin" ) {
              this.router.navigate(['/']);
            }else {
              this.router.navigate(['/login']);
            }
          }
        );
      }
    );

  }



}

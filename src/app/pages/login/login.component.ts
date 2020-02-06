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
  private credential = {'username': '', 'password' : ''};
  username: string;
  password: string;
  user: any;
  constructor( private authService: AuthService, private router: Router, private token: TokenStorage)  { }

  ngOnInit() {
  }

  login(): void {

    this.authService.sendCredential(this.username, this.password).subscribe(
      data => {
        this.token.saveToken(data.token);
      },
      error => {
        console.log(error);
      },
      () => {
        this.authService.getUserAllData().subscribe(
          data => {
            this.user = data;
            localStorage.setItem("ROLE", this.user.role.role);
            localStorage.setItem("Id", this.user.id);
            localStorage.setItem("Username", this.user.username);
            localStorage.setItem("Email", this.user.email);
            if(this.user.role.role == "ROLE_ADMIN" || this.user.role.role == "ROLE_RECRUTEUR" ) {
              this.router.navigate(['/pages/listeOffre']);
            }
            else if (this.user.role.role == "ROLE_CANDIDAT"){
              this.router.navigate(['/emploi']);
            }else {
              this.router.navigate(['/login']);
            }
          }
        );
      }
    );

  }



}

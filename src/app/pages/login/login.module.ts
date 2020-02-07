import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {LoginComponent} from './login.component';
import {LoginRoutingModule} from './login-routing.module';
import {FormsModule} from "@angular/forms";
import {AuthService} from "../../core/service/auth.service";
import {TokenStorage} from "../../core/service/token.storage";
import {JwtModule} from "@auth0/angular-jwt";
import {AuthGuard} from "./auth.guard";
import {RoleGuardService} from "./role-guard.service";


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: jwtTokenGetter
      }}),
  ],
  providers:[
    AuthService,
    TokenStorage,
    AuthGuard,
    RoleGuardService
  ]
})
export class LoginModule { }
export function jwtTokenGetter() {
  return  localStorage.getItem("access_token");
}

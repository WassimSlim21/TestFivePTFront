import { Injectable } from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot} from '@angular/router';
import * as JWT from 'jwt-decode';
import {AuthService} from '../../core/services/auth.service';

@Injectable()
export class RoleGuardService implements CanActivate {

  tokenPayload: PlayloadInterface;

  constructor(public auth: AuthService, public router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data.expectedRole;
    const token =window.sessionStorage.getItem('AuthToken');
    this.tokenPayload = JWT(token);
    if (!this.auth.isAuthenticated() || !expectedRole.includes(this.tokenPayload.scopes[0].authority)  ) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }

}

export interface PlayloadInterface {
  scopes: ScopesInterface[];
}

export interface ScopesInterface {
  authority: String;
}


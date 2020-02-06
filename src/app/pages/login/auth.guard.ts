import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) {}

    canActivate() {

      if (localStorage.getItem("ROLE") === 'ROLE_ADMIN' || localStorage.getItem("ROLE")=== 'ROLE_RECRUTEUR' || localStorage.getItem("ROLE") === 'ROLE_CANDIDAT') {
        return true;
      }else {
        this.router.navigate(['/login']);
        return false;

      }

    }
  }

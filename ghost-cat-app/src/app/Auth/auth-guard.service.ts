import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthorizationService } from './authorization.service';
@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public auth: AuthorizationService, public router: Router) { }
  canActivate(): boolean {
    if (!this.auth.isLoggedIn()) {
      //console.log("user is not logged in");
      this.router.navigate(['/login']);
      return false;
    }
    //console.log("user is logged in");
    return true;
  }
}
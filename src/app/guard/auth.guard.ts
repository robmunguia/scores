import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor (private authService: AuthenticationService, public router: Router ) { }

  canActivate() {
    if ( this.authService.isAuthenticated() ) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
  
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  email: string;
  password: string;

  constructor(public authService: AuthenticationService, public router: Router) { }

  ngOnInit() {
    this.authService.SignOut();
  }

  signIn() {
    this.authService.SignIn(this.email, this.password)
      .then(() => {
        this.router.navigate(['/']);
      }).catch(_error => {
        this.router.navigate(['/']);
    });
  }

}

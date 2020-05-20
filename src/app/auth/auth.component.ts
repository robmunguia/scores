import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  email: string;
  password: string;

  constructor(public authService: AuthenticationService) {}

  ngOnInit() {
    this.authService.userData
    .subscribe((resp: any) => {
      console.log(resp);
    });
  }

  signUp() {
    this.email = 'rmunguia@teammiklo.com';
    this.password = 'Rmun2030';
    this.authService.SignIn(this.email, this.password);
  }

  signIn() {
    this.authService.SignUp(this.email, this.password);
  }

  signOut() {
    this.authService.SignOut();
  }

}

import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { UserLogin } from '../models/user/userLogin.model';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  user: UserLogin = new UserLogin();

  constructor(public authService: AuthenticationService) { }

  ngOnInit(): void {
  }

  signIn() {
    this.authService.userLogin(this.user);
  }

}

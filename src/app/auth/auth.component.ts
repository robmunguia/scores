import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isRegister: boolean = false;

  constructor(public authService: AuthenticationService) { }

  ngOnInit() {
    this.authService.SignOut();
  }

}

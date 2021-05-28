import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  email: any;

  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    // this.authService.userData
    // .subscribe((user: any) => {
    //   if ( user ) {
    //     this.email = user.email;
    //   } else {
    //     this.email = '';
    //   }
    // });
  }

  singOut() {
    this.authService.SignOut();
    this.router.navigate(['/login']);
  }

}

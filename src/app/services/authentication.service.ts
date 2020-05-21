import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  userData: Observable<firebase.User>;
  isLogin: boolean = false;

  constructor(private angularFireAuth: AngularFireAuth) {
    this.loadStorage();
    this.userData = angularFireAuth.authState;
  }

  isAuthenticated(): boolean {
    return this.isLogin;
  }

  /* Sign up */
  SignUp(email: string, password: string) {
    return this.angularFireAuth.createUserWithEmailAndPassword(email, password)
    .then((user) => {
      return user;
    })
    .catch(error => {
      throw error
    });
  }

  /* Sign in */
  SignIn(email: string, password: string) {
    return this.angularFireAuth.signInWithEmailAndPassword(email, password)
    .then((data) => {
      this.isLogin = true;
      this.saveStorage( data.user.email );
      return data;
    })
    .catch(error => {
      throw error;
    });
  }

  /* Sign out */
  SignOut() {
    this.isLogin = false;
    localStorage.removeItem('email');
    this.angularFireAuth.signOut();
  }

  saveStorage( email: string ) {
    localStorage.setItem('email', email);
  }

  loadStorage() {
    if ( localStorage.getItem('email') ) {
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { UserRegister } from '../models/user/user.model';
import { UserLogin } from '../models/user/userLogin.model';
import { UserReponse } from '../models/user/userResponse.model';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  isLogin: boolean = false;
  url = environment.urlMiklo;

  constructor(private http: HttpClient, public router: Router) {
    this.loadStorage();
  }

  isAuthenticated(): boolean {
    return this.isLogin;
  }

  /* Sign up */
  userLogin(userLogin: UserLogin) {
      return this.http.get(`${this.url}SecureApp/LogInApp?user=${userLogin.user}&password=${userLogin.password}`)
      .toPromise()
      .then((response: any) => {
        if(response.Ok){
          this.saveStorage(response);
          this.isLogin = true;
          this.router.navigate(['/']);
        } else {
          console.log(response.Mensaje);
        }
      });
  }

  /* Sign in */
  userRegister(userRegister: UserRegister) {
    return this.http.post(`${this.url}SecureApp/RegistrarUsuarioApp`, userRegister);
  }

  /* Sign out */
  SignOut() {
    this.isLogin = false;
    localStorage.removeItem('user');
  }

  saveStorage( user: UserReponse ) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  loadStorage() {
    const user: UserReponse = JSON.parse(localStorage.getItem('user'));
    if ( localStorage.getItem('user') ) {
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }
  }

  validUserName(username: string) {
    this.http.get(`${this.url}SecureApp/ExisteUsuario?usuario=${username}`);
  }
  validPhoneNumber(phone: string) {
    this.http.get(`${this.url}SecureApp/ExisteTelefono?telefono=${phone}`);
  }

}

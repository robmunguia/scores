//SecureApp/LogInApp?usuario=pass&password=user
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/login/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
    
    userData: User;
    isLogin: boolean = false;
    url: string = environment.urlMiklo;
   
    constructor(private http: HttpClient) {
        this.loadStorage();
    }

    isAuthenticated(): boolean {
        return this.isLogin;
    }

    /* Sign up */
    SignUp(username: string, password: string) {
        console.log('user register');
    }

    /* Sign in */
    SignIn(username: string, password: string) {
        this.http.get(`${this.url}SecureApp/LogInApp?usuario=${username}&password=${password}`)
        .subscribe((resp: any) => {
            if (resp.Ok === 'Ok') {
                this.isLogin = true;
                this.saveStorage( username );
            }
        });
    }

    /* Sign out */
    SignOut() {
        localStorage.clear();
    }

    saveStorage( username: string ) {
        localStorage.setItem('email', username);
    }

    loadStorage() {
        if ( localStorage.getItem('email') ) {
            this.isLogin = true;
        } else {
            this.isLogin = false;
        }
    }
}

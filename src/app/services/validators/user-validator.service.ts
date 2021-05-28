import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ValidatorFn, AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class UserValidatorService {

  url = environment.urlMiklo;

  constructor(private http: HttpClient) { }

  patternValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }
      const regex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$');
      const valid = regex.test(control.value);
      return valid ? null : { invalidPassword: true };
    };
  }
  MatchPassword(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[confirmPassword];

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      if (confirmPasswordControl.errors && !confirmPasswordControl.errors.passwordMismatch) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
    }
  }
  validateUserName(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.http.get(`${this.url}SecureApp/UserExists?user=${control.value}`).pipe(
        map((res: any) => {
          return res.Exists ? { userNameNotAvailable: true } : null;
        })
      );
    };
  }
  validatePhone(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.http.get(`${this.url}SecureApp/PhoneExists?phone=${control.value}`).pipe(
        map((res: any) => {
          return res.Exists ? { phoneNotAvailable: true } : null;
        })
      );
    };
  }
  validateEmail(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.http.get(`${this.url}SecureApp/EmailExists?email=${control.value}`).pipe(
        map((res: any) => {
          return res.Exists ? { emailNotAvailable: true } : null;
        })
      );
    };
  }
}

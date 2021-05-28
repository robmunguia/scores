import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { UserValidatorService } from '../services/validators/user-validator.service';
import { UserRegister } from '../models/user/user.model';
import { UserReponse } from '../models/user/userResponse.model';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  user: UserRegister = new UserRegister();
  registerForm!: FormGroup;
  submitted: boolean = false;

  constructor(public authService: AuthenticationService,
    private fb: FormBuilder,
    private userValidator: UserValidatorService) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      User: ['', [Validators.required], [this.userValidator.validateUserName()]],
      Email: ['', [Validators.required, Validators.email], [this.userValidator.validateEmail()]],
      Phone: ['', Validators.required, [this.userValidator.validatePhone()]],
      Password: ['', Validators.required ],
      ConfirmaPassword: ['', [Validators.required]],
    },
    {
      validator: this.userValidator.MatchPassword('Password', 'ConfirmaPassword'),
    });
  }

  get registerFormControl() {
    return this.registerForm.controls;
  }

  register() {
    this.submitted = true;
    if (this.registerForm.valid) {
      this.user = this.registerForm.value;
      this.authService.userRegister( this.user)
      .subscribe((resp: UserReponse) => {
        this.submitted = false;
        this.registerForm.reset();
        if( resp.Ok ) {
          Swal.fire({
            title: 'Correcto!',
            text: `Se ha enviado un correo electrónico de validación a ${this.user.Email}, de no encontrar el correo favor de revisar su bandeja de spam.`,
            icon: 'success',
            confirmButtonText: 'Ok'
          });
        } else {
          Swal.fire({
            title: 'Error!',
            text: resp.Mensaje,
            icon: 'error',
            confirmButtonText: 'Ok'
          });
        }
      });
    }
  }

}

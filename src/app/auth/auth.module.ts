import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from  '@angular/forms';

import { AuthComponent } from './auth.component';
import { UserRegisterComponent } from './user-register.component';
import { UserLoginComponent } from './user-login.component';

@NgModule({
  declarations: [AuthComponent, UserRegisterComponent, UserLoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})

export class AuthModule { }

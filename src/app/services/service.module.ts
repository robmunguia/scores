import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './token.interceptor';

import { NCAABService } from './service.index';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    NCAABService
  ],
  declarations: []
})
export class ServiceModule { }

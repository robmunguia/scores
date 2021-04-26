import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if ( request.url.indexOf('api-basketball.p.rapidapi.com') > -1 ) {
        // if ( request.url.indexOf('basketball.api-sports.io') > -1 ) {
            const apiKey = 'e7651d92a8msh57c8c7cca018022p1a7ea3jsn8adf6b8eecdb';
            // const apiKey = '2cc9f2d072857426090b8039090e037b';
            request = request.clone({
                setHeaders: {
                    'x-rapidapi-key': apiKey,
                    'x-rapidapi-host': 'api-basketball.p.rapidapi.com'
                }
            });
        }
        return next.handle(request);
    }
}

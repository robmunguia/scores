import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if ( request.url.indexOf('https://api.sportsdata.io') > -1 ) {
            const apiKey = environment.apiKey;
            request = request.clone({
                setHeaders: {
                    'Ocp-Apim-Subscription-Key': apiKey
                }
            });
        }
        // else if ( request.url.indexOf('api.sportradar.us') > -1 ) {
        //     request = request.clone({
        //         setHeaders: {
        //             'Access-Control-Allow-Origin': 'http://localhost:4600'
        //         }
        //     });
        // }
        return next.handle(request);
    }
}

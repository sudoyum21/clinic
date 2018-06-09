import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
// import 'rxjs/add/observable/throw'
// import 'rxjs/add/operator/catch';


@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
    constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        console.log("intercepted request ... ");

        // Clone the request to add the new header.
        const authReq = req.clone({ headers: req.headers.set("headerName", "headerValue")
            ,url: `http://127.0.0.1:8080${req.url}` });

        // authReq.headers.delete('Access-Control-Allow-Origin')
        // authReq.headers.append('Access-Control-Allow-Origin','127.0.0.1:8080')
        // console.log(authReq.headers)
            // ,url: `127.0.0.1:5000/${req.url}` });

        console.log("Sending request with new header now ...");
    
        //send the newly created request
        return next.handle(authReq)
            // .catch((error, caught) => {
            //     //intercept the respons error and displace it to the console
            //     console.log("Error Occurred");
            //     console.log(error);
            //     //return the error to the method that called it
            //     return Observable.throw(error);
            // }) as any;
    }
}
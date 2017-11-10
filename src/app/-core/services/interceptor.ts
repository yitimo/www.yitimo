import { Injectable } from '@angular/core';
import { HttpResponse, HttpInterceptor as NgHttpInterceptor,
    HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
// rxjs操作符
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class HttpInterceptor implements NgHttpInterceptor {
    constructor() {
        //
    }
    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).map((event) => {
            if (event instanceof HttpResponse) {
                switch (event.status) {
                    case 200:
                    if (event.body['state']) {
                        let newEvent = event.clone({body: event.body['data']});
                        return newEvent;
                    } else {
                        throw event.body['msg'];
                    }
                    default:
                    throw `【${event.status}】【${event.statusText}】`;
                }
            }
            return event;
        });
    }
}

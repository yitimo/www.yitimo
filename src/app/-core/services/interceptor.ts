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
        let nReq = req.clone({
            headers: req.headers.set('Authorization', 'Basic ' + this.base64Encode('yitimo:iamyitimo'))
            .set('Content-Type', req.method.toUpperCase() === 'POST' ? 'application/x-www-form-urlencoded; charset=UTF-8' : 'application/json')
        });
        return next.handle(nReq).map((event) => {
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
    private base64Encode(source: string): string {
        let _keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
        let output = '';
        // tslint:disable-next-line:one-variable-per-declaration
        let chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        let i = 0;
        while (i < source.length) {
            chr1 = source.charCodeAt(i++);
            chr2 = source.charCodeAt(i++);
            chr3 = source.charCodeAt(i++);
            // tslint:disable-next-line:no-bitwise
            enc1 = chr1 >> 2;
            // tslint:disable-next-line:no-bitwise
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            // tslint:disable-next-line:no-bitwise
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            // tslint:disable-next-line:no-bitwise
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output +
            _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
            _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
        }
        return output;
    }
}

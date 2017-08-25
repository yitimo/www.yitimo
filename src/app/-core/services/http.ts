import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class Http {
    constructor(
        private ngHttp: HttpClient
    ) {}
    public Text(url: string) {
        return this.ngHttp.get(url, {responseType: 'text'}).toPromise().catch(this.reqErr);
    }
    public get(url: string): Promise<any> {
        return this.ngHttp.get(url)
        .toPromise()
        .catch(this.reqErr);
    }
    private reqErr(error: any) {
        if (error.status) {
            return Promise.reject(`【${error.status}】【${error.message}】`);
        } else {
            return Promise.reject(error);
        }
    }
}

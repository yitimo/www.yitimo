import { Injectable } from '@angular/core';
// import { Http, Headers, Jsonp } from '@angular/http';
// import 'rxjs/add/operator/toPromise';

// const appId = '1799973901';
// const appSecret = '758737a095f5e044a412efb8b8419bf5';
// const redirectUri = 'https://weibo.yitimo.com/#/weibo/redirect';

@Injectable()
export class WeiboService {
    private weibo;
    constructor() {
        this.weibo = window['WB2'] || false;
    }
    public checkLogin() {
        return this.weibo.checkLogin();
    }
    public Login(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.weibo.login((res) => {
                return resolve(res);
            }, (err) => {
                return reject(err);
            });
        });
    }
    public Logout(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.weibo.logout((res) => {
                return resolve(res);
            }, (err) => {
                return reject(err);
            });
        });
    }
}

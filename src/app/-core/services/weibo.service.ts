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
        this.weibo = window['WB2'] || window.frames['ytb-weibo']['WB2'] || {}; // window['WB2'] || false;
    }
    public checkLogin() {
        return this.weibo.checkLogin();
    }
    public Login(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.weibo.login((res) => {
                if (res && res.error) {
                    reject(res.error);
                } else {
                    resolve(res);
                }
            });
        });
    }
    public Logout(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.weibo.logout((res) => {
                if (res && res.error) {
                    reject(res.error);
                } else {
                    resolve(res);
                }
            });
        });
    }
    public HomeTimeLine(options?: TimeLineOptions) {
        return new Promise((resolve, reject) => {
            this.weibo.anyWhere((W) => {
                W.parseCMD('/statuses/home_timeline.json', (res) => {
                    if (res && res.error) {
                        reject(res.error);
                    } else {
                        resolve(res.statuses);
                    }
                }, options || {}, {
                    method: 'get'
                });
            });
        });
    }
    public PublicTimeLine(options?: TimeLineOptions) {
        return new Promise((resolve, reject) => {
            this.weibo.anyWhere((W) => {
                W.parseCMD('/statuses/public_timeline.json', (res) => {
                    if (res && res.error) {
                        reject(res.error);
                    } else {
                        resolve(res.statuses);
                    }
                }, options || {}, {
                    method: 'get'
                });
            });
        });
    }
    public UserId(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.weibo.anyWhere((W) => {
                W.parseCMD('/account/get_uid.json', (res) => {
                    if (res && res.error) {
                        reject(res.error);
                    } else {
                        resolve(res.uid);
                    }
                }, {}, {
                    method: 'get'
                });
            });
        });
    }
    public UserInfo(_uid: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.weibo.anyWhere((W) => {
                W.parseCMD('/users/show.json', (res) => {
                    if (res && res.error) {
                        reject(res.error);
                    } else {
                        resolve(res);
                    }
                }, {
                    uid: _uid
                }, {
                    method: 'get'
                });
            });
        });
    }
}

export interface TimeLineOptions {
    since_id?: number; // 返回id大于此id的微博(比这条微博新的)
    max_id?: number; // 返回id小于此id的微博(比这条微博旧的)
    count?: number; // 分页的每页条数
    page?: number; // 第几页
    feature?: number; // 过滤类型
    trim_user?: number; // 返回完整user字段或者仅userid
}

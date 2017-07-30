import { Injectable } from '@angular/core';
// const appId = '1799973901';
// const appSecret = '758737a095f5e044a412efb8b8419bf5';
// const redirectUri = 'https://weibo.yitimo.com/#/weibo/redirect';

@Injectable()
export class WeiboService {
    private weibo; // 微博对象
    private page: number; // 记录页码
    private list: any[]; // 微博数据
    private freshing: boolean; // 是否正在请求列表
    constructor() {
        this.weibo = window['WB2'] || false; // 初始化微博对象
        this.page = 1; // 当前页码
        this.list = []; // 微博列表初始化
    }
    public List() {
        return this.list;
    }
    public Freshing() {
        return this.freshing;
    }
    // 刷新数据，获取最新微博
    public Latest(): Promise<any[]> {
        this.freshing = true;
        this.page = 1;
        return this.homeTimeLine().then((res: any[]) => {
            this.list = res;
            this.freshing = false;
            return res;
        }).catch((err) => {
            this.freshing = false;
            console.log(err);
            return [];
        });
    }
    // 刷新数据，获取更旧的一批微博
    public Fetch(): Promise<any[]> {
        this.freshing = true;
        this.page++;
        return this.homeTimeLine().then((res: any[]) => {
            this.list = this.list.concat(res);
            this.freshing = false;
            return res;
        }).catch((err) => {
            this.freshing = false;
            console.log(err);
            return [];
        });
    }
    public loginWidget(login: Function, logout: Function) {
        this.weibo.anyWhere((W) => {
            W.widget.connectButton({
                id: 'wb_connect_btn',
                type: '5,1',
                callback : {
                    login: (o) => {	// 登录后的回调函数
                        login(o);
                    },
                    logout: () => {	// 退出后的回调函数
                        logout();
                    }
                }
            });
        });
    }
    private homeTimeLine(): Promise<any[]> {
        return new Promise((resolve, reject) => {
            if (!this.weibo) {
                reject('微博初始化失败');
            }
            this.weibo.anyWhere((W) => {
                W.parseCMD('/statuses/home_timeline.json', (res) => {
                    if (res && res.error) {
                        reject(res.error);
                    } else {
                        resolve(res.statuses);
                    }
                }, {
                    page: this.page
                }, {
                    method: 'get'
                });
            });
        });
    }
}

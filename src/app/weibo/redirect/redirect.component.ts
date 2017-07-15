import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WeiboService } from '../../-core';

@Component({
    template: `
        <h3>得到的code为： {{code}}</h3>
        <div (click)="Login()">执行登录</div>
        `
})
export class RedirectComponent implements OnInit {
    public code: string;
    public state: string;

    constructor(
        private weibo: WeiboService,
        private aRoute: ActivatedRoute
    ) {}

    public ngOnInit() {
        console.log(this.aRoute.snapshot);
        this.code = this.aRoute.snapshot.queryParams['code'] || '';
        this.state = this.aRoute.snapshot.queryParams['state'] || null;
    }

    public Login() {
        this.weibo.OAuth(this.code).then((res) => {
            console.log(res);
            if (res.access_token) {
                window.localStorage.setItem('AT', res.toString());
                console.log(res);
            } else {
                console.log(res);
            }
        });
    }
}

/**
 * {
 * "access_token":"2.00HWV_NEH8VoxBdefee24a29I4eKaC",
 * "remind_in":"157679999",
 * "expires_in":157679999,
 * "uid":"3861273083"
 * }
 */

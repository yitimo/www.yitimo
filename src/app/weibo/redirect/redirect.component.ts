import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/toPromise';

@Component({
    template: `
        <h3>得到的code为： {{code}}</h3>
        <div (click)="Login()">执行登录</div>
        `
})
export class RedirectComponent implements OnInit {
    public code: string;

    constructor(
        private http: Http,
        private aRoute: ActivatedRoute
    ) {}

    public ngOnInit() {
        console.log(this.aRoute.snapshot);
        this.code = this.aRoute.snapshot.queryParams['code'] || '388153816141b0e503541ddcaf6ff535';
    }

    public Login() {
        let header = new Headers({'Content-Type': 'text/plain'});
        this.http.post(`https://api.weibo.com/oauth2/access_token?client_id=${1799973901
        }&client_secret=${'758737a095f5e044a412efb8b8419bf5'
    }&grant_type=authorization_code&code=${this.code}&redirect_uri=${
        encodeURIComponent('http://weibo.yitimo.com/#/weibo/redirect')}`,
        {}, {headers: header})
        .toPromise()
        .then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
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

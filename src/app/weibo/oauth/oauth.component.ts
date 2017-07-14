import { Component, OnInit } from '@angular/core';

@Component({
    template: `
        <div (click)="OAuth()">发起授权</div>
        `
})
export class OAuthComponent implements OnInit {
    constructor() {
        //
    }

    public ngOnInit() {
        //
    }

    public OAuth() {
        window.location.href = `https://api.weibo.com/oauth2/authorize?client_id=${1799973901
            }&redirect_uri=${encodeURIComponent('http://weibo.yitimo.com/#/weibo/redirect')
        }&response_type=code`;
    }
}

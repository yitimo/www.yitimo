import { Component, OnInit } from '@angular/core';
import { WeiboService } from '../../-core';

@Component({
    template: `
        <div (click)="OAuth()">发起授权</div>
        `
})
export class OAuthComponent {
    constructor(
        private weibo: WeiboService
    ) {}

    public OAuth() {
        this.weibo.Login().then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        });
    }
}

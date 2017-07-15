import { Component, OnInit } from '@angular/core';
import { WeiboService } from '../-core';

@Component({
    selector: 'ytb-userbar',
    template: `
        <button md-button [mdMenuTriggerFor]="menu">
            <img class="ytb-head" src="{{user.head_img_url}}" />
            {{user.nick_name}}
        </button>
        <md-menu #menu="mdMenu" xPosition="before" yPosition="below">
            <button md-menu-item>个人中心</button>
            <button md-menu-item>切换用户</button>
            <button md-menu-item (click)="LoginCheck()">登录检查</button>
            <button md-menu-item>注销</button>
        </md-menu>
    `,
    styles: [`
        .ytb-head{
            height: 20px;width: 20px;border-radius: 100%;
            margin-bottom: 3px;
        }
    `]
})
export class UserBarComponent implements OnInit {
    public user;
    constructor(
        private weibo: WeiboService
    ) {}
    public ngOnInit() {
        //
        this.user = {
            head_img_url: '/assets/img/yitimo.jpg',
            nick_name: 'Yitimo'
        };
    }
    public LoginCheck() {
        this.weibo.ATCheck().then((res) => {
            console.log('登录有效，登录信息如下');
            console.log(res);
        }).catch(() => {
            console.log('登录失效');
        });
    }
}

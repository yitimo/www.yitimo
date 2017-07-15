import { Component, OnInit } from '@angular/core';

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
    constructor() {
        //
    }
    public ngOnInit() {
        //
        this.user = {
            head_img_url: '/assets/img/yitimo.jpg',
            nick_name: 'Yitimo'
        };
    }
}

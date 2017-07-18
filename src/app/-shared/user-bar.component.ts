import { Component, OnInit } from '@angular/core';
import { WeiboService } from '../-core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { DialogPopupComponent } from './popup/dialog.component';

@Component({
    selector: 'ytb-userbar',
    template: `
        <button md-button [mdMenuTriggerFor]="menu" *ngIf="user">
            <img class="ytb-head" src="{{user.profile_image_url}}" />
            {{user.name}}
        </button>
        <md-menu #menu="mdMenu" xPosition="before" yPosition="below">
            <button md-menu-item>个人中心</button>
            <button md-menu-item (click)="LoginCheck()">登录检查</button>
            <button md-menu-item (click)="LogOut()">注销</button>
        </md-menu>
    `,
    styles: [`
        .ytb-head{
            height: 36px;width: 36px;border-radius: 100%;
        }
    `]
})
export class UserBarComponent implements OnInit {
    public user;
    constructor(
        private weibo: WeiboService,
        public dialog: MdDialog
    ) {}
    public ngOnInit() {
        if (!this.getLocal()) {
            this.getInfoById().then((res) => {
                window.localStorage.setItem('UserInfo', JSON.stringify(res));
                this.user = res;
            }).catch((err) => {
                let dialogRef = this.dialog.open(DialogPopupComponent, {data: {
                    msg: err
                }});
            });
        }
    }
    public LoginCheck() {
        let check = this.weibo.checkLogin();
        if (check) {
            let dialogRef = this.dialog.open(DialogPopupComponent, {data: {msg: '登陆有效！'}});
        } else {
            let dialogRef = this.dialog.open(DialogPopupComponent, {data: {
                msg: '登陆失效！是否尝试登录？', ok: '登录', no: '不了'
            }});
            dialogRef.afterClosed().subscribe((result) => {
                if (result) {
                    this.weibo.Login();
                }
            });
        }
    }
    public LogOut() {
        this.weibo.Logout().then(() => {
            let dialogRef = this.dialog.open(DialogPopupComponent, {data: {msg: '注销完成。'}});
        }).catch((err) => {
            let dialogRef = this.dialog.open(DialogPopupComponent, {data: {msg: err}});
        });
    }
    private getLocal() {
        let userInfo = window.localStorage.getItem('UserInfo');
        if (userInfo) {
            this.user = JSON.parse(userInfo);
            return true;
        } else {
            return false;
        }
    }
    private getInfoById() {
        let uid = window.localStorage.getItem('UserId');
        if (uid) {
            return this.weibo.UserInfo(uid);
        } else {
            return this.weibo.UserId().then((res) => {
                return this.weibo.UserInfo(res);
            });
        }
    }
}

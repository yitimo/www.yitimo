import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { WeiboService } from '../-core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { DialogPopupComponent } from './popup/dialog.component';

@Component({
    selector: 'ytb-userbar',
    template: `
        <div id="wb_connect_btn"></div>
    `,
    styleUrls: [`
        #wb_connect_btn{
             position: absolute;
             right: 0;top: 0;bottom: 0;
             background: #ff95d6;
             line-height: 2.5;padding: 0 1em;
        }
    `],
    encapsulation: ViewEncapsulation.None
})
export class UserBarComponent implements AfterViewInit {
    public user;
    constructor(
        private weibo: WeiboService,
        public dialog: MdDialog
    ) {}
    public ngAfterViewInit() {
        this.weibo.weigiInit();
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

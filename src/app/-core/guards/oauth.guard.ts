import { WeiboService } from '../services/weibo.service';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class OAuthGuard implements CanActivate {
    constructor(
        private weibo: WeiboService,
        public dialog: MdDialog,
        private router: Router
    ) {}
    public canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Promise<boolean> | boolean {
        if (!this.weibo.checkLogin()) {
            // return this.weibo.Login().catch((err) => {
            //     this.router.navigate(['../noauth']);
            //     console.log('登录失败');
            //     return false;
            // });
            return true;
        } else {
            console.log('已登录');
            return true;
        }
    }
}

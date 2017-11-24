import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { MatDialog } from '@angular/material';
import { DialogPopupComponent } from '../../-shared';

@Injectable()
export class DisableGuard implements CanActivate {
    constructor(
        private dialog: MatDialog
    ) {}
    public canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        let dialog = this.dialog.open(DialogPopupComponent, {data: {title: '提示！', msg: '抱歉，微博能力暂时关闭'}});
        return false;
    }
}

import { Component, OnInit } from '@angular/core';
import { WeiboService } from '../weibo.service';
import { DialogPopupComponent } from '../../-shared';
import { MdDialog, MdDialogRef } from '@angular/material';

@Component({
  styleUrls: [ './statuses.component.css' ],
  templateUrl: './statuses.component.html'
})
export class StatusesComponent implements OnInit {
  constructor(
    public weibo: WeiboService,
    public dialog: MdDialog
  ) {}
  public ngOnInit() {
    this.weibo.loginWidget((res) => {
      console.log(res);
      this.weibo.Latest().catch((err) => {
        let dialogRef = this.dialog.open(DialogPopupComponent, {data: {msg: err}});
      });
    }, (res) => {
      let dialogRef = this.dialog.open(DialogPopupComponent, {data: {msg: '你已成功登出！'}});
    });
  }
}

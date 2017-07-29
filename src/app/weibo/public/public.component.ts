import { Component, OnInit } from '@angular/core';
import { PublicService } from './public.service';
import { DialogPopupComponent, ytmFly } from '../../-shared';
import { MdDialog, MdDialogRef } from '@angular/material';

@Component({
    templateUrl: './public.component.html',
    styleUrls: ['./public.component.css'],
    animations: [ytmFly]
})
export class PublicComponent implements OnInit {
  public topTip: boolean;
  public bottomTip: boolean;
  constructor(
    public _pub: PublicService,
    public dialog: MdDialog
  ) {}
  public ngOnInit() {
    this.topTip = false;
    this.bottomTip = false;
    this._pub.Latest().catch((err) => {
      let dialogRef = this.dialog.open(DialogPopupComponent, {data: {msg: err}});
    });
  }
  public pulling(e: {action: string, scroll: number}) {
    this.topTip = this.bottomTip = false;
  }
  public pulled(e) {
    if (e === 'up') {
      this.topTip = true;
    } else if (e === 'down') {
      this.bottomTip = true;
    }
  }
}
